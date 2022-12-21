// TEMPORARY FILE UNTIL THESE METHODS ARE ADDED TO NPM PACKAGE.
import { NFTStorage } from "nft.storage"

const NFT_STORAGE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGMzNTA3ZEY4NkNlZTgwZUExNTQyMzhkMDQ4NDVGOTg2MjM0NmI5M0EiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MzcwMDQ3NTM0MiwibmFtZSI6ImRlY2VudC1zZGsifQ.xKo6Lgznxai4GbZSc5jJwbisjWM9aA-RK7uVifHkrok"
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

export const storeBlob = async (data) => {
  const cid = await client.storeBlob(data)
  return `ipfs://${cid}`
}
