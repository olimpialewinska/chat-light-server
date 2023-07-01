# ChatLight server 
This is a server written in TypeScript using the Express framework. It provides an API endpoint for asking questions to GPT. 
Open locally and try with [ChatLight](https://github.com/olimpialewinska/chat-light).

## Prerequisites
Make sure you have the following installed on your machine:

- Node.js
- npm (Node Package Manager)

# Installation
Clone the repository:

```
git clone https://github.com/olimpialewinska/chat-light-server.git
cd chat-light-server
npm install
```

Create a .env file in the root directory and configure the following environment variables:
 - Openai API key
 - Google-cloud vision API key

To start the server, run the following command:
```
npm start
```
The server will start running at http://localhost:3000.

## API Endpoints

POST /askGpt
This endpoint is used to ask questions to the AI model. It expects a JSON payload with the following structure:
```{
  "messages": [
    {
      "role": "user",
      "content": "Question goes here"
    }
  ]
}
```
The messages array can contain multiple messages in a conversation format. Each message has a role (either "user" or "assistant") and content (the text of the message).
In addition to the JSON payload, this endpoint also accepts file uploads. It expects the files to be uploaded using the files field with multipart/form-data encoding.
The response from the server will be the AI model's answer to the question.

