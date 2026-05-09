import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { InMemoryRunner } from "@google/adk";
import { reactExpertAgent } from "./agent.js";

/**
 * MCP Server that exposes the React Expert Pipeline as a tool.
 */
const server = new McpServer({
  name: "React Expert Agent Server",
  version: "1.0.0",
});

// Register the agent as a tool
server.tool(
  "generate_react_component",
  "Generates high-quality React components using a multi-agent pipeline (Architect, Engineer, QA).",
  {
    prompt: z.string().describe("The feature request or component description (e.g., 'A responsive data table with sorting')"),
  },
  async ({ prompt }) => {
    try {
      console.error(`Running ReactExpertPipeline for: ${prompt}`);
      
      // Initialize the Runner to execute the agent pipeline
      const runner = new InMemoryRunner({
        agent: reactExpertAgent,
        appName: "ReactExpertAgentServer",
      });

      const userId = "mcp-user";
      const sessionId = `session-${Date.now()}`;

      // Start the execution
      const eventGenerator = runner.runAsync({
        userId,
        sessionId,
        newMessage: { role: "user", parts: [{ text: prompt }] },
      });

      // Consume the events (required to drive the generator)
      for await (const event of eventGenerator) {
        if (event.content) {
          // You can log progress here if desired
        }
      }

      // Retrieve the final session state
      const session = await runner.sessionService.getSession({
        appName: "ReactExpertAgentServer",
        userId,
        sessionId,
      });

      const result = session?.state || {};

      return {
        content: [
          {
            type: "text",
            text: (result.final_react_app as string) || "Agent execution finished but returned no content.",
          },
        ],
      };
    } catch (error: any) {
      console.error("Error in generate_react_component tool:", error);
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Error executing pipeline: ${error.message || String(error)}`,
          },
        ],
      };
    }
  }
);

/**
 * Main entry point to start the server over stdio.
 */
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("React Expert Agent MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in MCP Server:", error);
  process.exit(1);
});
