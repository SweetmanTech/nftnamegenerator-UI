import axios from "axios"
import { FC, useState } from "react"
import _ from "lodash"
import ButtonWithSpinner from "../ButtonWithSpinner"
import MintButton from "../MintButton"

interface AllowListFormProps {
  twitterHandle: string
  setTwitterHandle: (value: string) => void
  generatedName?: string
  setGeneratedName?: (value: string) => void
  loading: boolean
}
const AllowListForm: FC<AllowListFormProps> = ({
  twitterHandle,
  setTwitterHandle,
  loading,
  generatedName,
  setGeneratedName,
}) => {
  const displayBorder = (value: string) => !value?.length && "border-red-500"
  const displayRequiredText = (value: string, message: string) =>
    !value?.length && <p className="text-xs italic text-red-500">{message}</p>
  const [isGeneratingName, setIsGeneratingName] = useState(false)
  const generateName = async () => {
    setIsGeneratingName(true)
    const response = await axios.get("/api/randomName")
    setGeneratedName(response.data)
    setIsGeneratingName(false)
  }
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
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="generateName">
            Generated NFT Collection Name
          </label>
          <input
            className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="twitterHandle"
            type="text"
            readOnly
            value={_.startCase(generatedName)}
            onChange={(e) => setTwitterHandle(e.target.value)}
            placeholder="@cre8ors"
          />
        </div>
        <div className="flex space-x-4 ">
          <MintButton
            name="NAME"
            description="DESCRIPTION"
            imageUri="ipfs://bafybeidyqy7n2defa767w64g4oj4n63whgfl7mtigwqq6co3i6kg4qlo5u/lilnoun-6473.png"
          />
          <ButtonWithSpinner
            loading={isGeneratingName}
            disabled={loading}
            buttonLabel="generate name"
            buttonColor="primary"
            onClick={generateName}
          />
        </div>
      </form>
      <p className="text-xs text-center text-gray-500">&copy;2022 DEFIENT. All rights reserved.</p>
    </div>
  )
}

export default AllowListForm
