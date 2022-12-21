const getHostedFile = async (httpsUri) => {
  console.log("getHostedFile", httpsUri)
  const headers = new Headers()

  headers.append("Content-Type", "application/json")
  headers.append("Accept", "application/json")

  headers.append("Access-Control-Allow-Origin", "http://localhost:3000")
  headers.append("Access-Control-Allow-Credentials", "true")

  headers.append("GET", "POST", "OPTIONS")

  const response = await fetch(httpsUri, {
    headers,
  })
  console.log("response", response)

  const blob = await response.blob()
  console.log("BLOB", blob)
  // const file = new File([blob], "", { type: blob.type })
  // console.log("FILE", file)
  // return file
}

export default getHostedFile
