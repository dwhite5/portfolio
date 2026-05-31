---
title: "Assignment 2"
summary: "Creating a shared component library to unify a product that had grown in too many directions."
date: "May 30, 2026"
concepts:
  - Query classification
  - Memory
  - Basic tool use
---
Assignment 2 was about three things: 
- Query classification
- Tool use
- Memory


# Query classification

*Query classification* is the task of assigning an input to a predefined category. The resulting category allows the input to be routed to the most appropriate downstream path. 

This can have several use cases in agentic systems: 
1. Directing easy questions to small, cost-efficient models and hard questions to larger, more capable models. 
2. Routing different types of customer queries (invoices, payments, login issues) to different downstream processes.
3. Choosing which specialized sub-agent a task should be given to. 
4. Filtering out queries that should not enter the system at all (malicious, out of scope). 

## Process
The case study began by constructing a simple, linear workflow with no classification. This consisted of the following Langflow components: 

1. **Chat input** to accept user input. 
2. **Prompt template** to structure system prompt for the LLM. 
3. **Language model** to send LLM request. 
4. **Chat output** to return LLM response to the user. 


![Alt text](/images/case-studies/A2-1.png)


The warmup started by a basic, linear control flow to get the juices flowing. It used the following Langflow components: 

1. Chat input - Collects user input as a chat message
2. Prompt template  - String with dynamic variables to fill the system prompt for the language model. 
3. Language model - LLM call configured with API key to access OpenAI models via API. 
4. Chat output - Emits LLM output as a chat message

Once the linear flow was successfully wired and validated, the next step was to introduce simple version of query classification. 

At its core, this entails routing to 


For the language model component, I selected gpt-5-nano because it's small and fast. Classifying a 


The next step was to split this linear flow into two possible outcomes with an If-Else component. This component routes the flow to a corresponding path based on a simple text comparison. In this case, the prior model call was classifying the user input as "happy" or "sad". The If-Else was set up to determine if the input was equal to "happy." True results were routed to a "happy" path (no pun intended), while false results were routed to a sad path. 

This was the first implementation of query classification: classifying a user input, then using the result to route control to the appropriate path. 








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