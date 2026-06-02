---
title: "Assignment 2"
summary: "Creating a shared component library to unify a product that had grown in too many directions."
date: "May 30, 2026"
concepts:
  - Query classification
  - Memory
  - Basic tool use
---

# Summary

This article walks through a case study to build an agentic system with the following capabilities: 
1. Query classification
2. Tool use
3. Memory

Each capability was built on its own before progressing to the next capability. 

# Query classification

*Query classification* is the task of assigning an input to a predefined category. The resulting category allows the input to be routed to the most appropriate downstream path. 

Classification has several use cases in agentic systems: 
1. Directing easy questions to small, cost-efficient models and hard questions to larger, more capable models. 
2. Routing different types of customer queries (invoices, payments, login issues) to different downstream processes.
3. Choosing which specialized sub-agent a task should be given to. 
4. Filtering out queries that should not enter the system at all (malicious, out of scope). 

## V1

The first iteration had a simple goal of classifying user input as either "happy" or "sad" and returning the result to the user. This was a straightforward goal where the system prompt could be easily written by hand. 

```
System prompt:
Classify the user's input as happy or sad. Only output one word.
```

![V1 flow](/images/case-studies/A2-1.png)
![V1 flow conversation](/images/case-studies/A2-2.png)

## V2

The second iteration built on the first by adding templates to format the system output differently for "happy" and "sad" answers. The classification prompt was kept the same. The main addition was an if-else component that routed the flow to the correct template based on the classification result. 

![V2 flow](/images/case-studies/A2-3.png)
![V2 flow conversation](/images/case-studies/A2-4.png)


## V3

The third iteration expanded to a more complex goal of classifying a user question into one of four question types: 

- Factual (what is....?, who invented...?)
- Analytical (how does...? why do...?)
- Comparison (what's the difference between...?)
- Definition (define..., explain...)


**Talk about prompt engineering, the first few hand-crafted prompts, then transitioning to meta-prompting.**

The initial design task was to create a system prompt that would instruct the LLM to classify user questions into the appropriate category. 

provide a sufficiently detailed system prompt for the LLM to categorize user inputs into the correct question type. I wrote the initial system prompt by hand and manually tested it by entering different user prompts in the Langflow playground. This revealed gaps in the system prompt: the LLM classifier would return multiple categories, unpredictable formats, or inconsistent answers for similar inputs. 

This led to harnessing a technique known as "meta-prompting" where instead of writing a prompt by hand, you describe the desired output and have the LLM generate it for you. This produced a much more elegant, cohesive, and effective prompt than my initial attempt. 

![V2 meta prompting](/images/case-studies/A2-5.png)

A few design choices were important: 

- Concrete examples so LLMs could pattern match for more reliable results. 
- Explicit output format rules to generate a predictable value for downstream parsing. 
- Tie-breaking rule to prevent the model from stalling or outputting multiple category labels. 

```
System prompt:

You are a query classifier. Your job is to read a user input and assign it to exactly one of the following categories:

- `factual`: Questions asking for a specific fact, figure, or piece of information. Example: "What is the capital of France?" or "Who invented the telephone?"
- `analytical`: Questions asking how or why something works, happens, or exists. Example: "How does photosynthesis work?" or "Why do interest rates affect inflation?"
- `comparison`: Questions asking for similarities or differences between two or more things. Example: "What's the difference between TCP and UDP?" or "How does React compare to Vue?"
- `definition`: Requests to define, explain, or describe what something is. Example: "Define machine learning." or "Explain what a neural network is."

Rules:

- Respond with only the category label: `factual`, `analytical`, `comparison`, or `definition`.
- Do not include any explanation, punctuation, or additional text.
- If the input could fit multiple categories, choose the best single match.

```












**

## Why Journal?

Remember: This journal is not for submission or instructor evaluation. Then why journal?

  

Building an AI assistant is more than writing code - it’s a chance to sharpen how you design, debug, and reason about LLM-powered systems. Use this journal to capture your prompt choices, roadblocks, and “aha!” moments while they’re fresh. When you review the reference solution later, these notes will let you see why your approach differed/aligned and what patterns you can carry into future projects. It’ll also help jog your memory when you look back a few months from now.

## Part 1: Query Understanding Engine

1. Classification System Design: What key instructions did you include in your prompts to distinguish between query types? What iterations of prompts did you have to go through? 

  

2. Iterative Development: As you test your system against the provided test cases as well as your own test cases, did you notice any gaps in your initial prompt? How did you improve the prompt iteratively? Remember: Try out your own test cases, do not limit yourself to the ones provided.

  

3. Observations and surprises: What are some instances where the model mislabeled a query? Note down a couple of such examples and how you tackled it.

## Part 2: Tool Integration (Calculator + [Bonus Datetime])

1. Tool Usage Logic: Explain your approach to detecting when calculations are needed and how your system decides whether to use the calculator or provide a direct response for simple calculations.

  

2. Continued improvement: Did any of your earlier sample queries fail after adding the tool? Note what changed and how did you fix it?

  

3. [Bonus Implementation - ONLY if you implemented the DateTime tool] What were the main challenges encountered? How did the prompt change to handle this new tool alongside the calculator?

  

4. Extensibility: What are some challenges you see for including more tools in the future? Think about one specific new tool (e.g. weather report, SQL query etc.) and how the workflow should change for the new tool?

  

## Part 3: Conversation Memory

  

1. Memory strategy: What prompt changes did you make to take memory into account?

  

2. Limitations and Improvements: What are some limitations of the current memory implementation where you are storing the entire conversation? How would you improve this in a real-world scenario? (Hint: Think about context length and long conversations, vector stores, persona based memory etc.)

## Part 4 - Thinking about Evaluation Metrics

1. Metric-to-feature mapping  
You just implemented a 2 step workflow agent (or more steps based on your approach). You need to choose the high-level metrics that you need to use for each feature of your system. How did you decide which evaluation metric (Exact Match vs LLM-as-a-Judge) is appropriate for different stages of the system (classifier vs responder)?  
  

2. When exact/fuzzy fails (e.g, Exact Match)  
What are some cases where exact/fuzzy match metrics fail? What type of metrics would you consider in those cases?

  

3. Evaluation using LLM-as-a-Judge  
Why are Exact Match metrics insufficient for final responses, and when does an LLM-as-a-Judge become necessary? If you use an LLM-judge prompt for measuring any capability of the system, how would you craft the prompt? Doesn’t need to elaborate - high-level understanding is sufficient.

  

4. Complexity of LLM Judges

how would you design the rubric and manage challenges such as consistency, cost, and evaluation drift?

  

5. Context-retention check  
Suppose you want to measure whether the assistant correctly uses conversation history in follow-up questions.  
• Outline a small LLM-judge rubric (or signal) you’d use to flag replies that ignore prior context.

  

6. Experiment-driven iteration and observability  
How did using experiments and evaluators enable safer prompt iteration and better observability compared to manual testing?

  

Mega Bonus: Once you are comfortable answering the above questions related to metrics, think about how you’d implement a system to test different prompts, create test datasets, track different metrics etc. You don’t need to actually implement it but think about how/what needs to be built to do this. This will help you appreciate the complexity of monitoring and observability platforms when we introduce them.

  

## Overall Reflection

1. Most impactful design choices: What were the most important design decisions you made in your implementation, and why did you make these choices? Which LangChain components were most crucial to your solution?

  

2. Biggest ‘aha’ moment: You might’ve used ChatGPT-like services before, but implementing these workflow agent systems will deepen your understanding of how they work. What are some aha learning moments during this assignment?

  

3. Hardest roadblock and solution: Describe one significant challenge you faced and explain your approach to solving it.

  

4. For the future: What is one principle that you learnt from this assignment? Think about how you can take those learnings and implement them in your area of work.

**