import { FC } from "react"
import MintButton from "../MintButton"
import abi from "../../lib/abi-allow-list.json"
import ThirdWebMintButton from "../ThirdWebMintButton"

interface AllowListFormProps {
  walletAddress: string
  setWalletAddress?: (value: string) => void
  twitterHandle: string
  setTwitterHandle: (value: string) => void
  whyCre8or: string
  setWhyCre8or: (value: string) => void
  creatorType: string
  setCreatorType: (value: string) => void
  handleSignUp: () => void
  loading: boolean
}
const AllowListForm: FC<AllowListFormProps> = ({
  walletAddress,
  setWalletAddress,
  twitterHandle,
  setTwitterHandle,
  whyCre8or,
  setWhyCre8or,
  creatorType,
  setCreatorType,
  handleSignUp,
  loading,
}) => {
  const displayBorder = (value: string) => !value?.length && "border-red-500"
  const displayRequiredText = (value: string, message: string) =>
    !value?.length && <p className="text-xs italic text-red-500">{message}</p>
  const disabled = !twitterHandle?.length
  return (
    <div className="w-full max-w-xl">
      <form
        className={`px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md ${loading && "animate-pulse"}`}
      >
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
            Twitter Handle
          </label>
          <input
            className={`w-full px-3 py-2 mb-3 leading-tight text-gray-700 border ${displayBorder(
              twitterHandle,
            )} rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
            id="twitterHandle"
            type="text"
            value={twitterHandle}
            onChange={(e) => setTwitterHandle(e.target.value)}
            placeholder="@cre8ors"
          />
          {displayRequiredText(twitterHandle, "Please enter a twitter handle.")}
        </div>
        <ThirdWebMintButton contractAddress="0x8f4ee27aa859d7d2ed9e0e38e9b09e8c896afa70" abi={abi} name="NAME" description="DESCRIPTION" imageUri="ipfs://bafybeidyqy7n2defa767w64g4oj4n63whgfl7mtigwqq6co3i6kg4qlo5u/lilnoun-6473.png" handleError={() => console.log("ERROR")} handleSuccess={() => console.log("SUCCESS")} />
      </form>
      <p className="text-xs text-center text-gray-500">&copy;2022 DEFIENT. All rights reserved.</p>
    </div>
  )
}

export default AllowListForm
