import { Web3Button } from "@thirdweb-dev/react"

const ThirdWebMintButton = (props: any) => {
    const { contractAddress, abi, handleSuccess,  handleError, name, description, imageUri} = props

    return (<Web3Button
          contractAddress={contractAddress}
          contractAbi={abi}
          action={(contract) => contract.call("purchase", 1, name, description, imageUri)}
          onSuccess={handleSuccess}
          onError={handleError}
          accentColor="#4287f5"
          colorMode="light"
        > Hello</Web3Button>)
}

export default ThirdWebMintButton