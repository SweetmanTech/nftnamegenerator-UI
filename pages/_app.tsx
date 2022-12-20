import "../styles/globals.css"
import "@rainbow-me/rainbowkit/styles.css"
import type { AppProps } from "next/app"
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit"
import { allChains, configureChains, createClient, WagmiConfig } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ThirdwebProvider } from "@thirdweb-dev/react"

const { chains, provider, webSocketProvider } = configureChains(
  allChains.filter(
    (c) =>
      c.id === Number(process.env.NEXT_PUBLIC_CHAIN_ID) ||
      c.id === Number(process.env.NEXT_PUBLIC_ALLOW_LIST_CHAIN_ID),
  ),
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  chains,
})

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        <ThirdwebProvider
          desiredChainId={Number(process.env.NEXT_PUBLIC_CHAIN_ID)}
          sdkOptions={{
            gasless: {
              openzeppelin: {
                relayerUrl: "https://api.defender.openzeppelin.com/autotasks/...",
              },
            },
          }}
        >
          <Component {...pageProps} />
          <ToastContainer />
        </ThirdwebProvider> 
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
export default MyApp
