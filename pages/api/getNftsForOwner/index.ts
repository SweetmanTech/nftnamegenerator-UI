import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import axios from "axios";

const getTokensForOwner: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data } = await axios.get(`${process.env.ALCHEMY_RPC_URL}/getNFTs`, {
      params: {
        owner: req.query.owner,
        contractAddresses: [process.env.NEXT_PUBLIC_CONTRACT_ADDRESS],
      }
    });
    const tokenIds = data.ownedNfts.map((nft: any) => nft.id.tokenId);
    res.status(200).json(tokenIds);
  } catch (e){
    console.log('error!', e);
    res.status(404).end();
  }
}

export default getTokensForOwner;