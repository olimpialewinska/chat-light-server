import { OpenAIMessage } from "./prompt";
export const regex = /(.*[^\s]+(?:\.(?:jpg|jpeg|png|gif))$)/i;

export function filterMessages(messages: OpenAIMessage[]) {
  const filteredMessages = messages.filter((message) => {
    return message.content && !regex.test(message.content);
  });

  filteredMessages.pop();

  return filteredMessages as OpenAIMessage[];
}
