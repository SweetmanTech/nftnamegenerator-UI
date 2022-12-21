import Image from "next/image"
import { FC, useState } from "react"
import Confetti from "react-confetti"
import axios from "axios"
import useWindowSize from "../../lib/useWindowSize"

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

  const handleClick = async () => {
    setLoading(true)
    const receipt = (await axios.get("/api/mint?name=MINT BUTTON COMPONENT")) as any
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

      {startConfetti && <Confetti width={width} height={height} />}
    </>
  )
}

export default MintButton
