import { FC } from "react"
import { useNFTNameGenerator } from "../../providers/NFTNameGeneratorProvider"
import MintButton from "../MintButton"

const NameGeneratorForm: FC = () => {
  const { twitterHandle, setTwitterHandle, loading, publicWallet, setPublicWallet } =
    useNFTNameGenerator()
  return (
    <div className="items-center w-full max-w-3xl">
      <form
        className={`px-10 pt-6 pb-8 mb-4 bg-white rounded  items-center ${
          loading && "animate-pulse"
        }`}
      >
        <div className="mb-4">
          <input
            className="w-full px-3 py-4 mb-3 leading-tight text-gray-700 border border-gray-700 shadow appearance-none rounded-xl focus:outline-none focus:shadow-outline"
            id="twitterHandle"
            type="text"
            value={publicWallet}
            onChange={(e) => setPublicWallet(e.target.value)}
            placeholder="0x3398.."
          />
          <label className="block mb-2 font-semibold text-gray-700 text-md font" htmlFor="password">
            Public Wallet
          </label>
        </div>
        <div className="mb-4">
          <input
            className="w-full px-3 py-4 mb-3 leading-tight text-gray-700 border border-gray-700 shadow appearance-none rounded-xl focus:outline-none focus:shadow-outline"
            id="twitterHandle"
            type="text"
            value={twitterHandle}
            onChange={(e) => setTwitterHandle(e.target.value)}
            placeholder="@defientco"
          />
          <label className="block mb-2 font-semibold text-gray-700 text-md font" htmlFor="password">
            Twitter Handle
          </label>
        </div>
        <div className="flex flex-col items-center space-x-4 ">
          <MintButton />
        </div>
      </form>
      <p className="text-xs text-center text-gray-500">&copy;2022 DEFIENT. All rights reserved.</p>
    </div>
  )
}

export default NameGeneratorForm
