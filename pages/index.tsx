/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next"
import SeoHead from "../components/SeoHead"
import styles from "../styles/Home.module.css"
import NFTNameGenerator from "../components/NFTNameGenerator"
import { useNFTNameGenerator } from "../providers/NFTNameGeneratorProvider"
import Results from "../components/Results"

const Home: NextPage = () => {
  const { showResults } = useNFTNameGenerator()
  return (
    <div className="max-w-full overflow-y-hidden bg-cover lg:bg-hero-pattern md:bg-hero-pattern bg-mobile-pattern">
      <SeoHead
        title="nft name generator"
        description="use AI to inspire your next nft drop"
        image=""
      />
      <div className="flex flex-row px-4 space-x-4 bg-white 4 lg:md:bg-transparent m-w-1/2">
        <a href="https://defient.co" target="_blank" rel="noreferrer">
          <img
            src="icons/defient.svg"
            alt="defient icon"
            className="object-right-bottom lg:md:object-left-top w-14 h-14"
          />
        </a>
        <a href="https://twitter.com/nftnamegen" target="_blank" rel="noreferrer">
          <img
            src="icons/twitter.svg"
            alt="twitter icon"
            className="object-right-bottom lg:md:object-left-top w-14 h-14"
          />
        </a>
      </div>
      <main className={styles.main}>
        {!showResults && <NFTNameGenerator />}
        {showResults && <Results />}
      </main>
    </div>
  )
}

export default Home
