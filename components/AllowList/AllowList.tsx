import { useState } from "react"
import AllowListForm from "../AllowListForm"

const AllowList = () => {
  const [twitterHandle, setTwitterHandle] = useState("")
  const [publicWallet, setPublicWallet] = useState("")
  return (
    <AllowListForm
      twitterHandle={twitterHandle}
      setTwitterHandle={setTwitterHandle}
      publicWallet={publicWallet}
      setPublicWallet={setPublicWallet}
      loading={false}
    />
  )
}

export default AllowList
