/* eslint-disable class-methods-use-this */
import { createHandler, Post, Body } from "next-api-decorators"
import { TwitterApi } from "twitter-api-v2"
import { _ } from "lodash"
import transformTwitterHandle from "../../../lib/transformTwitterHandle"

const EMOJIS = [
  "\uD83E\uDD73",
  "\uD83D\uDCAF",
  "\uD83D\uDE33",
  "\uD83D\uDC4F",
  "\uD83E\uDEE3",
  "\uD83D\uDEA8",
  "\uD83D\uDC40",
  "\uD83D\uDE4C",
  "\uD83D\uDD25",
]

class TwitterBot {
  @Post()
  async postTweet(@Body() body) {
    const client = new TwitterApi({
      appKey: "9iufGV3a77DcQcPXL4vybxNeD",
      appSecret: "nmSbX5p9085FzBgKKll6jbmpFvS8ooVTAvTeFWHm4yR9mdNjbP",
      accessToken: "1605441796946792448-3B3ufkNpD3Hqo3Cpeicb9OjoxUYF3P",
      accessSecret: "5gXSXDf82luiqMP0agaKAAXtrX7yTDW1N9KNCLJwnlBnH",
    })
    const { twitterHandle, generatedName } = body

    const tweet = `${_.sample(EMOJIS)} ${transformTwitterHandle(
      twitterHandle,
    )} just minted the free randomly generated NFT name:\n\
    \n${_.startCase(_.lowerCase(generatedName))}\n\
    \nIs it a bluechip or rug? For more ridiculous NFT collection names follow @iamchillpill.`
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
