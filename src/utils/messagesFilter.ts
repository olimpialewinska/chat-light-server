import { OpenAIMessage } from "./prompt";

export function filterMessages(messages: OpenAIMessage[]) {
  const regex = /(.*[^\s]+(?:\.(?:jpg|jpeg|png|gif))$)/i;
  return messages.filter((message) => {
    return message.content && !regex.test(message.content);
  });
}
