import Image from "next/image"
import { FC, useState } from "react"
import Confetti from "react-confetti"
import axios from "axios"
import useWindowSize from "../../lib/useWindowSize"
import ShareResultsSection from "../ShareResultsSection"
import { toast } from "react-toastify"
import Link from "next/link"
import { storeBlob } from "../../lib/ipfs"
import getHostedFile from "../../lib/getHostedFile"

interface MintButtonProps {
  name?: string
  description?: string
  imageUri?: string
  resetFormResponse?: (value: string) => void
}
const MintButton: FC<MintButtonProps> = () => {
  const [loading, setLoading] = useState(false)
  const [startConfetti, setStartConfetti] = useState(false)
  const [imageUri, setImageUri] = useState("")
  const [txHash, setTxHash] = useState("")
  const { width, height } = useWindowSize()

  const handleClick = async () => {
    setLoading(true)
    const generated = (await axios.get("/api/generate?twitter=sweetman_eth")) as any
    console.log("AI", generated.data.data)
    const url = generated?.data?.data?.[0]?.url
    console.log("generated?.data?.data?.[0]", generated?.data?.data?.[0])
    toast.success(
      <Link href={url} target="__blank">
        image generated
      </Link>,
    )
    const ipfsUri = (await axios.get(`/api/storeHostedFile?url=${url}`)) as any
    console.log("ipfsUri", ipfsUri)
    const file = await getHostedFile(url)
    console.log("file", file)
    // const ipfs = await storeBlob(file)
    // toast.success(
    //   <Link href={url} target="__blank">
    //     <>ipfs generated: {ipfs}</>
    //   </Link>,
    // )
    setImageUri(url)
    const receipt = (await axios.get(
      `/api/mint?imageUri=${url}?name=${"MINT BUTTON COMPONENT"}`,
    )) as any
    const receiptJson = JSON.parse(receipt.data.result)
    setTxHash(receiptJson.hash)
    if (!receipt?.error) {
      setStartConfetti(true)
      setTimeout(() => {
        setStartConfetti(false)
      }, 5000)
    }
    setLoading(false)
  }

  const className = `${loading ? "bg-blue-500/50" : "bg-blue-500"} ${
    !loading && "hover:bg-blue-700"
  } text-white font-bold py-2 px-4 rounded`
  return (
    <>
      <ShareResultsSection hash={txHash} />
      {imageUri && <Image src={imageUri} alt="generative art" width={500} height={500} />}
      <button type="button" onClick={handleClick} disabled={loading} className={className}>
        {loading ? <Image src="/spinner.gif" alt="spinner" width={50} height={50} /> : "Mint"}
      </button>

      {startConfetti && <Confetti width={width} height={height} />}
    </>
  )
}

export default MintButton
