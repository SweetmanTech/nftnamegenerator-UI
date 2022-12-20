/* eslint-disable class-methods-use-this */
import { createHandler, Post, Body } from "next-api-decorators"
import Twitter from "twitter-lite"

class TwitterBot {
  @Post()
  async postTweet(@Body() body) {
    const client = new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    })
    const { twitterHandle, generatedName } = body
    const tweet = `Bluechip or Rug?${twitterHandle} randomly generated NFT collection name is ${generatedName}!
    Want more terrible NFT collection names? Follow our fav degen @iamchillpill.`
    try {
      await client.post("statuses/update", { status: tweet })
      return { status: "success" }
    } catch (e) {
      throw new Error(e)
    }

    return null
  }
}
export default createHandler(TwitterBot)
