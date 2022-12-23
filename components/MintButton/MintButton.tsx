import { FC, useState } from "react"
import Confetti from "react-confetti"
import axios from "axios"
import { useRouter } from "next/router"
import useWindowSize from "../../lib/useWindowSize"
import { storeBlob } from "../../lib/ipfs"

const textToImage = require("text-to-image")

interface MintButtonProps {
  twitterHandle?: string
}
const MintButton: FC<MintButtonProps> = ({ twitterHandle }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [startConfetti, setStartConfetti] = useState(false)
  const { width, height } = useWindowSize()

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

  const postTweet = async (generatedName) => {
    const response = await axios.post("/api/tweet", {
      twitterHandle,
      generatedName,
    })
    return response
  }
  const handleClick = async () => {
    setLoading(true)

    // Usage example:
    const response = await axios.get("/api/randomName")
    const dataUri = await textToImage.generate(response.data, {
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
    console.log("data uri", dataUri)
    const file = dataURLtoFile(dataUri, "a.png")
    const ipfsUrl = await storeBlob(file)

    const receipt = (await axios.get(`/api/mint?imageUri=${ipfsUrl}`)) as any
    console.log("receipt", receipt)

    if (!receipt?.error) {
      setStartConfetti(true)
      setTimeout(() => {
        setStartConfetti(false)
      }, 5000)
    }
    console.log("posting tweet", response.data)
    const tweetResponse = await postTweet(response.data)
    console.log("tweetResponse", tweetResponse)
    router.push(
      {
        pathname: "/Results",
        query: {
          imageUri: dataUri,
          tweetId: tweetResponse.data.data.id,
          text: tweetResponse.data.data.text,
        },
      },
      "/Results",
    )
    setLoading(false)
  }

  const className = `${loading ? "bg-blue-500/50" : "bg-blue-500"} ${
    !loading && "hover:bg-blue-700"
  } focus:ring-4 foucus:ring-blue-300 text-white font-bold py-2.5 px-5 rounded text-center inline-flex items-center`
  return (
    <>
      <button type="button" onClick={handleClick} disabled={loading} className={className}>
        {loading && (
          <svg
            role="status"
            className="inline w-4 h-4 mr-2 text-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
        )}
        {loading ? "Minting" : "Let's Mint"}
      </button>
      {startConfetti && <Confetti width={width} height={height} />}
    </>
  )
}

export default MintButton
