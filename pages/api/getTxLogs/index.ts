/* eslint-disable class-methods-use-this */
import { EtherscanProvider } from "@ethersproject/providers"
import { createHandler, Get, Query } from "next-api-decorators"

class GetTxLogs {
  @Get()
  async getTxLogs(@Query("txHash") txHash: string) {
    const provider = new EtherscanProvider("maticmum")
    const txLogs = await provider.getTransactionReceipt(txHash)
    if (txLogs) {
      return txLogs
    }
    return false
  }
}

export default createHandler(GetTxLogs)
