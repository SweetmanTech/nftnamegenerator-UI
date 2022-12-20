import type { NextPage } from "next"
import SeoHead from "../components/SeoHead"
import styles from "../styles/Home.module.css"
import AllowList from "../components/AllowList"

const Home: NextPage = () => (
  <div className={styles.container}>
    <SeoHead title="nft name generator" description="use AI to inspire your next nft drop" image="" />

    <main className={styles.main}>
      <h1 className={styles.title}>nft name generator</h1>
      <AllowList />
    </main>
  </div>
)

export default Home
