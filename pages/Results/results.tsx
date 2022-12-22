import { TwitterTweetEmbed } from "react-twitter-embed"
import Image from "next/future/image"
import { useRouter } from "next/router"
import { useState } from "react"
import SkeletonCard from "../../components/SkeletonCard"

const Results = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  return (
    <div className="flex flex-wrap items-center justify-center">
      <div className="grid grid-cols-1 gap-5 p-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
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
  )
}
export default Results
