import { useState } from "react"
import AllowListForm from "../AllowListForm"

const AllowList = () => {
  const [twitterHandle, setTwitterHandle] = useState("")
  const [generatedName, setGeneratedName] = useState("")
  return (
    <AllowListForm
      twitterHandle={twitterHandle}
      setTwitterHandle={setTwitterHandle}
      loading={false}
      generatedName={generatedName}
      setGeneratedName={setGeneratedName}
    />
  )
}

export default AllowList
