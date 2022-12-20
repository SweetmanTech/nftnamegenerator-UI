import { ContractInterface, ethers, Signer } from "ethers"

import handleTxError from "./handleTxError"

const purchase = async (
  contractAddress: string,
  signer: Signer,
  abi: ContractInterface,
  name: string,
  description: string,
  imageUri: string,
) => {
  const contract = new ethers.Contract(contractAddress, abi, signer)
  try {
    const tx = await contract.purchase(1, name, description, imageUri)
    const receipt = await tx.wait()
    return receipt
  } catch (err) {
    handleTxError(err)
    return { error: err }
  }
}

export default purchase
