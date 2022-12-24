/* eslint-disable class-methods-use-this */
import { ethers } from "ethers"
import { createHandler, Get, Query } from "next-api-decorators"

class GetTxLogs {
  @Get()
  async getTxLogs(@Query("txHash") txHash: string) {
    const provider = new ethers.providers.AlchemyProvider(
      Number(process.env.NEXT_PUBLIC_CHAIN_ID),
      process.env.ALCHEMY_API_KEY,
    )
    const txLogs = await provider.getTransactionReceipt(txHash)
    if (txLogs) {
      return txLogs
    }
    return false
  }
}

export default createHandler(GetTxLogs)
