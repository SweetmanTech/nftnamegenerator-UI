/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router"
import { useState } from "react"
import { Tweet, Share } from "react-twitter-widgets"
import SkeletonCard from "../../components/SkeletonCard"

const Results = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  return (
    <div className="min-h-screen bg-center bg-cover bg-hero-pattern ">
      <h1 className="mt-0 mb-2 text-6xl font-normal leading-normal text-center text-black-800">
        Congrats!
      </h1>
      <h2 className="mt-0 mb-2 text-5xl font-normal leading-normal text-center text-black-800">
        Your NFT is now minted!
      </h2>
      <div className="flex flex-wrap items-center content-center justify-center w-full">
        <div className="grid grid-cols-1 gap-5 p-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {/* <!--Card 1--> */}
          <div className="p-2 overflow-hidden bg-white rounded flex-center">
            {loading && <SkeletonCard />}
            <div className="justify-center text-center">
              <Tweet tweetId={String(router.query.tweetId)} onLoad={() => setLoading(false)} />
              <Share url=" " options={{ text: String(router.query.text), size: "large" }} />
            </div>
          </div>
          {/* <!--Card 2--> */}
          {loading && <SkeletonCard />}
          {!loading && (
            <div className="max-w-sm bg-white rounded ">
              <a href="#!">
                <img className="rounded-t-lg" src={String(router.query.imageUri)} alt="" />
              </a>
              <div className="p-6">
                <h5 className="mb-2 text-xl font-medium text-gray-900">
                  Generated NFT Collection Name
                </h5>
                <p className="mb-4 text-base text-gray-700">View on OpenSea</p>
                <button
                  type="button"
                  className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  View
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Results
