import { FC } from "react"
import _ from "lodash"
import MintButton from "../MintButton"

interface AllowListFormProps {
  twitterHandle: string
  setTwitterHandle: (value: string) => void
  loading: boolean
}
const AllowListForm: FC<AllowListFormProps> = ({ twitterHandle, setTwitterHandle, loading }) => {
  const displayBorder = (value: string) => !value?.length && "border-red-500"
  const displayRequiredText = (value: string, message: string) =>
    !value?.length && <p className="text-xs italic text-red-500">{message}</p>

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
        <div className="flex space-x-4 ">
          <MintButton twitterHandle={twitterHandle} />
        </div>
      </form>
      <p className="text-xs text-center text-gray-500">&copy;2022 DEFIENT. All rights reserved.</p>
    </div>
  )
}

export default AllowListForm
