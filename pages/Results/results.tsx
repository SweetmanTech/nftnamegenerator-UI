import { TwitterTweetEmbed } from "react-twitter-embed"
import Image from "next/future/image"
import { useRouter } from "next/router"
import { useState } from "react"

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
      <div className="flex flex-wrap items-center content-center justify-center">
        <div className="grid grid-cols-1 gap-5 p-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {/* <!--Card 1--> */}
          <div className="overflow-hidden rounded">
            {loading && <SkeletonCard />}
            <TwitterTweetEmbed
              tweetId={String(router.query.tweetId)}
              onLoad={() => setLoading(false)}
            />
          </div>
          {/* <!--Card 2--> */}
          {loading && <SkeletonCard />}
          {!loading && (
            <Image
              className="object-fill "
              src={String(router.query.imageUri)}
              alt="generated image"
              width={478}
              height={478}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          )}
        </div>
      </div>
    </div>
  )
}
export default Results
