import { Configuration, CreateChatCompletionRequest, OpenAIApi } from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  organization: process.env.OPENAI_ORGANIZATION,
});
const openai = new OpenAIApi(configuration);

export function getSystemPrompt() {
  return `You are a helpful assistant.`;
}

export type OpenAIMessage = CreateChatCompletionRequest["messages"][0];

export async function askGpt(messages: OpenAIMessage[]) {
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });
    return completion.data.choices[0].message?.content;
  } catch (e) {
    return "Connection error with OpenAI";
  }
}
