import axios from "axios"
import Link from "next/link"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useWaitForTransaction } from "wagmi"

const ShareResultsSection = (props: any) => {
  const { hash } = props
  const { data: confirmedTx } = useWaitForTransaction({
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    hash,
  })

  useEffect(() => {
    const init = async () => {
      if (confirmedTx) {
        const nftResponse = (await axios.get(
          `/api/getNftsForOwner?owner=${"0xcfBf34d385EA2d5Eb947063b67eA226dcDA3DC38"}`,
        )) as any
        const lastItem = parseInt(nftResponse.data[nftResponse.data.length - 1], 16)
        console.log("lastItem", lastItem)
        toast.success(
          <Link
            target="_blank"
            href={`https://testnets.opensea.io/assets/mumbai/0xfd3e5624332f1865cf02b89da70c4d1fdc41bc8d/${lastItem}`}
          >
            view on OpenSea
          </Link>,
        )
      }
    }

    init()
  }, [confirmedTx])

  return <> </>
}

export default ShareResultsSection
