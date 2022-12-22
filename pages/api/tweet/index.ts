/* eslint-disable class-methods-use-this */
import { createHandler, Post, Body } from "next-api-decorators"
import * as getEmoji from "get-random-emoji"
import { TwitterApi } from "twitter-api-v2"

class TwitterBot {
  @Post()
  async postTweet(@Body() body) {
    const client = new TwitterApi({
      appKey: process.env.TWITTER_CONSUMER_KEY,
      appSecret: process.env.TWITTER_CONSUMER_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN_KEY,
      accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    })
    const { twitterHandle, generatedName } = body
    const tweet = `${getEmoji()}: @${twitterHandle} minted NFT collection name: ${generatedName}!\nClaim your name here \uD83D\uDC49 generate.defient.co\
    \nFor updates click here \uD83D\uDC49 @iamchillpill\
    \nPoll:`
    try {
      const response = await client.v2.tweet(tweet, {
        poll: {
          duration_minutes: 2 * 24 * 60,
          options: ["Bluechip", "Rug"],
        },
      })
      return response
    } catch (e) {
      throw new Error(e)
    }

    return null
  }
}
export default createHandler(TwitterBot)
