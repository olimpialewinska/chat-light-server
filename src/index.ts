import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";
import { OpenAIMessage, askGpt, getSystemPrompt } from "./utils/prompt";
import { readFromImage } from "./utils/readFromImages";
import path from "path";
import { filterMessages, regex } from "./utils/messagesFilter";
import { CreateChatCompletionRequest } from "openai";

const uploadPath = path.join(__dirname, "uploads");

const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/askGpt", upload.array("files"), async (req, res) => {
  try {
    const messages: OpenAIMessage[] = JSON.parse(req.body.messages);
    let lastMessage: OpenAIMessage = messages[messages.length - 1];
    const files = req.files;
    if (!lastMessage.content && (!files || files.length === 0)) {
      res.send("Prompt is empty");
      return;
    }

    const context = filterMessages(messages);

    if (regex.test(lastMessage.content)) lastMessage.content = "";

    if (files && (files as any).length > 0) {
      for (const file of files as Express.Multer.File[]) {
        const text = await readFromImage(file.path);
        lastMessage.content = text
          ? ((lastMessage.content + " " + text) as string)
          : (text as string);
      }
    }

    const response = await askGpt([
      {
        role: "system",
        content: getSystemPrompt(),
      },
      ...(context as any),
      lastMessage,
    ]);
    res.send(response);
  } catch (e) {
    res.send("Unexpected error");
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
