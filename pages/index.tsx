import type { NextPage } from "next"
import SeoHead from "../components/SeoHead"
import styles from "../styles/Home.module.css"
import NFTNameGenerator from "../components/NFTNameGenerator"
import { useNFTNameGenerator } from "../providers/NFTNameGeneratorProvider"
import Results from "../components/Results"

const Home: NextPage = () => {
  const { showResults } = useNFTNameGenerator()
  return (
    <div className="max-w-full bg-cover lg:bg-hero-pattern md:bg-hero-pattern bg-mobile-pattern">
      <SeoHead
        title="nft name generator"
        description="use AI to inspire your next nft drop"
        image=""
      />
      <main className={styles.main}>
        {!showResults && <NFTNameGenerator />}
        {showResults && <Results />}
      </main>
    </div>
  )
}

export default Home
