// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { Configuration, OpenAIApi } = require("openai");

export default async function handler(req, res) {
  // if method not post send this
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed!!" });
    return;
  }
  // if method post then do it
  if (req.method === "POST") {
    // req body with name is chat
    let messages = req.body.messages;
    let chat = req.body.chat;
    let openai_messages = []
    openai_messages.push({
      role: 'system',
      content: 'You are a helpful assistant.'
    })
    messages.forEach(message => {
      openai_messages.push({
        role: 'user',
        content: message.chat
      })
      openai_messages.push({
        role: 'assistant',
        content: message.answer
      })
    })
    openai_messages.push({
      role: 'user',
      content: chat
    })
    // if there is a chat
    if (chat) {
      // configuration api openai
      const configuration = new Configuration({
        basePath: `https://${process.env.NEXT_PUBLIC_DOMAIN}/openai/v1`,
        apiKey: process.env.API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createChatCompletion({
        model: "models/llama-2-7b-chat.ggmlv3.q8_0.bin",
        messages: openai_messages,
        temperature: 0.7,
        max_tokens: 2048
      });
      console.log(response.data)
      // if get data from openai send json
      if (response.data?.choices) {
        res.json(response.data.choices[0].message.content);
        // if can't get data from openai send error
      } else {
        res.status(500).send("Oops, Something went wrong!!");
      }
      // if no chat send error not found
    } else {
      res.status(404).send("Please, write your chat!!");
    }
  }
}
