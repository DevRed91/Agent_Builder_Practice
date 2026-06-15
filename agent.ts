import 'dotenv/config';
import fs from 'fs';
import { FunctionTool, LlmAgent, loadSkillFromDir, SequentialAgent, SkillToolset } from '@google/adk';
import { z } from 'zod';
import * as path from 'node:path';

const GEMINI_MODEL = 'gemini-3.5-flash';
const mySkill = await loadSkillFromDir(path.join(process.cwd(), 'skills', 'my-skill'));
const mySkillToolset = new SkillToolset([mySkill]);
const instructionContent = fs.readFileSync(
    path.join(process.cwd(), 'prompts', 'lifting-system-reviewer.md'),
    'utf-8'
);
const readFileTool = new FunctionTool({
    name: "readFile",
    description: "Reads the content of a file.",
    parameters: z.object({
        filePath: z.string().describe("The path to the file to read")
    }),
    execute: async (args: { filePath: string }) => {
        if (!fs.existsSync(args.filePath)) {
            return `File not found: ${args.filePath}`;
        }
        return fs.readFileSync(args.filePath, 'utf-8');
    }
} as any);

const editFileTool = new FunctionTool({
    name: "editFile",
    description: "Overwrites the specified file with new content.",
    parameters: z.object({
        filePath: z.string().describe("The path to the file to edit"),
        newContent: z.string().describe("The new content to write into the file")
    }),
    execute: async (args: { filePath: string, newContent: string }) => {
        fs.writeFileSync(args.filePath, args.newContent, 'utf-8');
        return `Successfully updated ${args.filePath}`;
    }
} as any);

export const fileEditingAgent = new LlmAgent({
    name: "LiftingSystemReviewer",
    model: GEMINI_MODEL,
    instruction: instructionContent,
    tools: [readFileTool, editFileTool, mySkillToolset],
    outputKey: "lifting_system_review_result"
});