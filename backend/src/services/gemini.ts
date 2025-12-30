import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { HumanMessage, SystemMessage } from "langchain";
import * as z from "zod";

const model = new ChatGoogleGenerativeAI({
	model: "gemini-pro",
	maxOutputTokens: 2048,
});

const message = [
	new SystemMessage(
		"You are an expert news content Summarizer. Summarize information in well-structured manner with accurate information.Try to keep the relevant information in the summary,  Provide content that is engaging & concise."
	),
	new HumanMessage("What is the summary of the this content? "),
];

const outputSchema = z.object({
	title: z.string().describe("Contains user friendly title of the topic"),
	content: z
		.string()
		.describe(
			"Contain in depth content about the topic , yet crisp & not verbose"
		),
	suggested_topics: z
		.string()
		.describe("contains array of all relayted topics , min of 3 topics"),
});

const prompt = new PromptTemplate({
	template: `
        You are an expert news content summarizer.
        Summarize the following content in a structured, engaging, and concise way.

        - Try to keep the relevant information in the summary,  Provide content that is engaging & concise.

        Content:
        {content}
        `,
	inputVariables: ["content"],
});

// Batch and stream are also supported
const chain = prompt.pipe(model.withStructuredOutput(outputSchema));

export default chain;
