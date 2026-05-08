import 'dotenv/config';
import { FunctionTool, LlmAgent, SequentialAgent } from '@google/adk';
import { z } from 'zod';

const GEMINI_MODEL = 'gemini-2.5-flash';
const reactArchitect = new LlmAgent({
    name: "ReactArchitect",
    model: GEMINI_MODEL,
    instruction: `You are a Senior React Architect. Given a feature request, define the component hierarchy.
  Specify which components should be functional, what state resides where (using Hooks), and the prop signatures.
  Output the architecture plan in a clear markdown format.`,
    outputKey: "component_architecture"
});

const componentEngineer = new LlmAgent({
    name: "ComponentEngineer",
    model: GEMINI_MODEL,
    instruction: `You are a Lead React Developer. Implement the following architecture:
  {component_architecture}
  
  Guidelines:
  - Use TypeScript for type safety.
  - Use Tailwind CSS for styling.
  - Follow modern React (v18+) best practices (memo, useCallbacks where necessary).
  - Output ONLY the code blocks.`,
    outputKey: "generated_react_code"
});

const reactQA = new LlmAgent({
    name: "ReactQA",
    model: GEMINI_MODEL,
    instruction: `You are a React Performance Expert. Review the following code:
  {generated_react_code}
  
  Check for:
  1. Missing useEffect dependency arrays.
  2. Potential memory leaks.
  3. Proper accessibility (ARIA labels).
  4. Optimization opportunities.
  
  Provide a final, refactored version of the code that is production-ready.`,
    outputKey: "final_react_app"
});

export const reactExpertAgent = new SequentialAgent({
    name: "ReactExpertPipeline",
    description: "A professional pipeline for generating high-quality React components.",
    subAgents: [
        reactArchitect,
        componentEngineer,
        reactQA
    ]
});