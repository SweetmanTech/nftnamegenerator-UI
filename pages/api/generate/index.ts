import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const { query } = req
  console.log("query", query)

  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
      prompt: "turning the twitter user sweetman_eth into a cartoon character in the ChillPill cartoon universe on christmas",
      n: 3,
      size: "1024x1024",
    });
    console.log("response", response)
    res.status(200).json(response.data)
  } catch (err) {
    res.status(200).json(err)
  }
}


