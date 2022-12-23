import type { NextPage } from "next"
import SeoHead from "../components/SeoHead"
import styles from "../styles/Home.module.css"
import NFTNameGenerator from "../components/NFTNameGenerator"

const Home: NextPage = () => (
  <div className="max-w-full bg-cover bg-hero-pattern">
    <SeoHead
      title="nft name generator"
      description="use AI to inspire your next nft drop"
      image=""
    />

    <main className={styles.main}>
      <NFTNameGenerator />
    </main>
  </div>
)

export default Home
