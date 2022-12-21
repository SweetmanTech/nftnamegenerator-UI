import Image from "next/image"
import { FC, useState } from "react"
import Confetti from "react-confetti"
import axios from "axios"
import useWindowSize from "../../lib/useWindowSize"
import { storeBlob } from "../../lib/ipfs"

const textToImage = require("text-to-image")

interface MintButtonProps {
  name?: string
  description?: string
  imageUri?: string
  resetFormResponse?: (value: string) => void
}
const MintButton: FC<MintButtonProps> = () => {
  const [loading, setLoading] = useState(false)
  const [startConfetti, setStartConfetti] = useState(false)
  const { width, height } = useWindowSize()
  const [name, setName] = useState("")
  const [imageUri, setImageUri] = useState()

  function dataURLtoFile(dataurl, filename) {
    const arr = dataurl.split(",")
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)

    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  const handleClick = async () => {
    setLoading(true)
    const generatedName = await axios.get("/api/randomName")
    setName(generatedName.data)
    const dataUri = await textToImage.generate(generatedName.data, {
      debug: true,
      fontSize: 58,
      fontFamily: "Aileron",
      lineHeight: 58,
      margin: 5,
      customHeight: 500,
      maxWidth: 500,
      bgColor: "black",
      textColor: "white",
      textAlign: "center",
      verticalAlign: "center",
    })
    setImageUri(dataUri)

    // Usage example:
    const file = dataURLtoFile(dataUri, "a.png")
    const ipfsUrl = await storeBlob(file)

    const receipt = (await axios.get(`/api/mint?imageUri=${ipfsUrl}`)) as any

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
      <button type="button" onClick={handleClick} disabled={loading} className={className}>
        {loading ? <Image src="/spinner.gif" alt="spinner" width={50} height={50} /> : "Mint"}
      </button>
      <div>{name}</div>
      {imageUri && <Image src={imageUri} alt="spinner" width={50} height={50} />}

      {startConfetti && <Confetti width={width} height={height} />}
    </>
  )
}

export default MintButton
