/* eslint-disable class-methods-use-this */
import { generateSlug, RandomWordOptions } from "random-word-slugs"
import { createHandler, Get } from "next-api-decorators"
import * as synonyms from "synonyms"

const options: RandomWordOptions<3> = {
  format: "lower",
  categories: {
    noun: ["animals", "transportation", "technology"],
  },
  partsOfSpeech: ["adjective", "noun", "noun"],
}
class RandomName {
  @Get()
  async getRandomName() {
    const slug = generateSlug(3, options)
    const synomynsList = await synonyms("club", "n")
    const synonym = synomynsList[Math.floor(Math.random() * synomynsList.length)]
    return `${slug} ${synonym}`
  }
}
export default createHandler(RandomName)
