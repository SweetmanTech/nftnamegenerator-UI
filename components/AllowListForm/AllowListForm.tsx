import axios from "axios"
import { FC, useState } from "react"
import _ from "lodash"
import Image from "next/image"
import ButtonWithSpinner from "../ButtonWithSpinner"
import MintButton from "../MintButton"

const textToImage = require("text-to-image")

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
  const [imageUri, setImageUri] = useState("")

  const displayBorder = (value: string) => !value?.length && "border-red-500"
  const displayRequiredText = (value: string, message: string) =>
    !value?.length && <p className="text-xs italic text-red-500">{message}</p>
  const [isGeneratingName, setIsGeneratingName] = useState(false)
  const generateName = async () => {
    setIsGeneratingName(true)

    const response = await axios.get("/api/randomName")
    setGeneratedName(response.data)
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
    setImageUri(dataUri)
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
        {imageUri && <Image src={imageUri} alt="spinner" width={100} height={100} />}

        <div className="flex space-x-4 ">
          <MintButton
            twitterHandle={twitterHandle}
            generatedName={generatedName}
            imageUri={imageUri}
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
