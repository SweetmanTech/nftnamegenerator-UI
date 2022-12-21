/* eslint-disable class-methods-use-this */
import { generateSlug, RandomWordOptions } from "random-word-slugs"
import * as WordPos from "wordpos"
import { createHandler, Get } from "next-api-decorators"
import * as synonyms from "synonyms"

const options: RandomWordOptions<2> = {
  format: "lower",
  categories: {
    noun: ["animals", "transportation", "technology"],
  },
  partsOfSpeech: ["noun", "noun"],
}
class RandomName {
  @Get()
  async getRandomName() {
    const wordpos = new WordPos()
    const verb = await wordpos.randVerb()
    const noun = generateSlug(2, options)
    const synomynsList = await synonyms("club", "n")
    const synonym = synomynsList[Math.floor(Math.random() * synomynsList.length)]
    return `${verb} ${noun} ${synonym}`
  }
}
export default createHandler(RandomName)
