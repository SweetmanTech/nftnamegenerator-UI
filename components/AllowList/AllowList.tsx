import { useState } from "react"
import AllowListForm from "../AllowListForm"

const AllowList = () => {
  const [twitterHandle, setTwitterHandle] = useState("")
  return (
    <AllowListForm
      twitterHandle={twitterHandle}
      setTwitterHandle={setTwitterHandle}
      loading={false}
    />
  )
}

export default AllowList
