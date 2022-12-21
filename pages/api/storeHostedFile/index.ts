import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
// import { NFTStorage } from "nft.storage"
import * as download from "image-downloader"
import * as path from "path"
import { storeBlob } from '../../../lib/ipfs';
// const NFT_STORAGE_TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGMzNTA3ZEY4NkNlZTgwZUExNTQyMzhkMDQ4NDVGOTg2MjM0NmI5M0EiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MzcwMDQ3NTM0MiwibmFtZSI6ImRlY2VudC1zZGsifQ.xKo6Lgznxai4GbZSc5jJwbisjWM9aA-RK7uVifHkrok"
// const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

const storeHostedFile: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { url } = req.query
    const currentPath = path.resolve(process.cwd())
    console.log("storeHostedFile", url)
    console.log("currentPath", currentPath)
    const myUrl = Array.isArray(url) ? url[0] : url
    console.log("myUrl", myUrl)
    await download.image({
      url: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-0ZpOAAdyZlQDa7SsLzwTIWDY/user-9vvtBAR4JKTK7pNbSjB8ONsC/img-PEJHP9ZoQQu4Sp8BnqP8VyUZ.png?st=2022-12-21T14%3A13%3A04Z&se=2022-12-21T16%3A13%3A04Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2022-12-21T07%3A25%3A41Z&ske=2022-12-22T07%3A25%3A41Z&sks=b&skv=2021-08-06&sig=SaODXN0wPHh/TMDo1qDYoaDfcAa399PSgOn4jXrGBdg%3D",
      dest: currentPath, // Save to /path/to/dest/image.jpg
    })

    const result = await storeBlob(currentPath)
    console.log("STORED?", result)

    res.status(200).json({"url": `ipfs://${cid}`});
  } catch (e){
    console.log('error!', e);
    res.status(404).end();
  }
}

export default storeHostedFile;