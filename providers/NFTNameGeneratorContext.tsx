import { createContext, SetStateAction, Dispatch } from "react"

export interface NFTNameGeneratorContextInterface {
  twitterHandle?: string
  setTwitterHandle?: Dispatch<SetStateAction<string>>
  publicWallet?: string
  setPublicWallet?: Dispatch<SetStateAction<string>>
  loading: boolean
  setLoading?: Dispatch<SetStateAction<boolean>>
  setShowResults?: Dispatch<SetStateAction<boolean>>
  showResults?: boolean
  name?: string
  setName?: Dispatch<SetStateAction<string>>
  description?: string
  setDescription?: Dispatch<SetStateAction<string>>
  imageURI?: string
  setImageURI?: Dispatch<SetStateAction<string>>
  twitterId?: string
  setTwitterId?: Dispatch<SetStateAction<string>>
  tokenId?: string
  handleGenerateClick?: () => void
  startConfetti?: boolean
  setStartConfetti?: Dispatch<SetStateAction<boolean>>
  haveTokenId?: boolean
}
export const initialContext: NFTNameGeneratorContextInterface = {
  loading: false,
}
const NFTNameGeneratorContext = createContext<NFTNameGeneratorContextInterface>(initialContext)

export default NFTNameGeneratorContext
