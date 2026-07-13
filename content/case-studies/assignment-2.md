---
title: "Routing Smarter"
summary: "What query classification taught me about prompt design."
date: "May 30, 2026"
concepts:
  - Classification
  - Prompt engineering
---

Query classification is a fundamental building block of agentic workflows. Before an agent can respond intelligently, it often needs to decide: what kind of input is this, and where should it go? 

This case study looks at a system I built to understand classification and what I learned along the way. 

---

## What I was trying to build

My goal was to get hands-on experience with classification, which has [several use cases](https://www.anthropic.com/engineering/building-effective-agents) in agentic systems: 

- Routing easy questions to smaller, cheaper models and hard questions to larger ones
- Directing different query types (billing, technical, account) to specialized sub-agents
- Filtering out malicious or out-of-scope inputs before they enter the system

I decided to do this by building a workflow that could classify an incoming user query, route it to the appropriate downstream process, and format the response in a way that matched the nature of the question. 

---

## V1: Proving the concept

The first version was deliberately simple: classify user input as "happy" or "sad" and return the result. The goal wasn't to build something useful; it was to understand the basic mechanics of classification in an agentic flow.

The system prompt was easy to write by hand at this scale:

```
System prompt:
Classify the user's input as happy or sad. Only output one word.
```

It worked. Two categories, unambiguous inputs, predictable outputs. At this level of simplicity, handwriting the prompt is fine.

![V1 flow](/images/case-studies/A2-1.png)
![V1 flow conversation](/images/case-studies/A2-2.png)

---

## V2: Adding routing and output formatting

The second version introduced something more useful: routing. After classification, the flow needed to do different things depending on the result. I added an if-else component that directed the output to one of two response templates, one for "happy" and one for "sad," each formatted differently.

This is where classification starts to matter in real systems. Classification without downstream differentiation is just labeling. The value comes from what you do with the label.

![V2 flow](/images/case-studies/A2-3.png)
![V2 flow conversation](/images/case-studies/A2-4.png)

---

## V3: Where it got hard

The third version expanded to four question types: factual, analytical, comparison, and definition. Each type would be routed to a different downstream LLM call with a prompt template matched to that format.

Classifying into four categories instead of two exposed a problem I hadn't anticipated: my handwritten prompts weren't reliable enough.

The failure modes were consistent and frustrating:

- The LLM returned multiple category labels when it was uncertain
- Output format was unpredictable, making downstream parsing brittle
- Similar inputs produced different classifications across sessions

I spent time iterating manually on the prompt, adding rules, tweaking examples, testing edge cases. Each fix introduced a new gap. The prompt was getting longer and more fragile, and I was essentially doing the LLM's job for it.

---

## The insight: use the model to write the prompt

The breakthrough was switching to a technique called *meta-prompting*: instead of writing the system prompt by hand, I asked the LLM to generate one for me.

I described the task, gave examples of each category, and specified the output constraints I needed. The model produced a prompt that was more comprehensive than anything I'd written manually. It anticipated edge cases I hadn't considered, used consistent formatting that made parsing reliable, and included tie-breaking rules that eliminated the multiple-label problem.

![Meta-prompting session](/images/case-studies/A2-5.png)

The resulting prompt was notably better structured than my handwritten versions:

```
System prompt:

You are a query classifier. Your job is to read a user input and assign it
to exactly one of the following categories:

- `factual`: Questions asking for a specific fact, figure, or piece of
  information. Example: "What is the capital of France?" or "Who invented
  the telephone?"
- `analytical`: Questions asking how or why something works, happens, or
  exists. Example: "How does photosynthesis work?" or "Why do interest
  rates affect inflation?"
- `comparison`: Questions asking for similarities or differences between
  two or more things. Example: "What's the difference between TCP and UDP?"
  or "How does React compare to Vue?"
- `definition`: Requests to define, explain, or describe what something is.
  Example: "Define machine learning." or "Explain what a neural network is."

Rules:

- Respond with only the category label: `factual`, `analytical`,
  `comparison`, or `definition`.
- Do not include any explanation, punctuation, or additional text.
- If the input could fit multiple categories, choose the best single match.
```

What made this prompt work where mine didn't:

- **Concrete examples per category** gave the LLM pattern anchors, reducing ambiguity
- **Explicit format rules** made the output predictable enough for reliable downstream parsing
- **A tie-breaking rule** eliminated the multiple-label failure mode entirely

Once classification was stable, I added prompt templates for each question type. Factual questions got short, direct answers. Analytical questions got step-by-step explanations. Comparisons used tables and bullets. Definitions used plain language with examples.

The final system was a three-part workflow: classify the input, route to the appropriate downstream LLM, return a formatted answer matched to the question type.

![V3 final flow](/images/case-studies/A2-6.png)

---

## What this means in practice

A few takeaways I'd carry into a real product context:

**Meta-prompting is underused.** Most teams default to handwriting prompts and iterating manually. For classification tasks with more than two or three categories, this approach hits a reliability ceiling quickly. Using the model to generate the prompt is faster and produces better results. It's now my default starting point for any classification task.

**Reliability requirements drive architecture decisions.** A classification error in this system doesn't just produce a bad answer; it routes the user down the wrong path entirely. This means the classifier needs to be more conservative than the downstream responders. In a production version, I'd add a confidence threshold and a fallback category for ambiguous inputs rather than forcing a best guess.

**Chained LLM calls have real cost and latency implications.** This workflow makes two LLM calls per user query: one to classify, one to respond. At scale, that doubles inference cost and adds latency. The right optimization depends on the use case, but it's a decision that needs to be made explicitly, not discovered in production.

**The failure modes are predictable.** Ambiguous inputs that span categories, inputs that don't fit any category, inputs designed to confuse the classifier. These are known problems with known mitigations. A production system should be designed with explicit handling for each rather than hoping the classifier gets it right.

---

## Sources

- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) - Anthropic