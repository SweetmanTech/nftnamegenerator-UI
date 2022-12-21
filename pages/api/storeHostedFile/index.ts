import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
// import { NFTStorage } from "nft.storage"
import getHostedFile from '../../../lib/getHostedFile';

// const NFT_STORAGE_TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGMzNTA3ZEY4NkNlZTgwZUExNTQyMzhkMDQ4NDVGOTg2MjM0NmI5M0EiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MzcwMDQ3NTM0MiwibmFtZSI6ImRlY2VudC1zZGsifQ.xKo6Lgznxai4GbZSc5jJwbisjWM9aA-RK7uVifHkrok"
// const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

const storeHostedFile: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {url} = req.query;
    const file = getHostedFile(url)
    console.log("file", file)
    const cid = url // await client.storeBlob(data)

    res.status(200).json({"url": `ipfs://${cid}`});
  } catch (e){
    console.log('error!', e);
    res.status(404).end();
  }
}

export default storeHostedFile;