"use client"

import * as React from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

export interface DemoVideoSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  videoUrl?: string
  youtubeUrl?: string
  thumbnailUrl?: string
  title?: string
  description?: string
  aspectRatio?: "video" | "wide" | "square"
}

const aspectRatioStyles = {
  video: "aspect-video",
  wide: "aspect-[21/9]",
  square: "aspect-square",
}

export function DemoVideoSection({
  videoUrl,
  youtubeUrl,
  thumbnailUrl = "/placeholder-video-thumbnail.jpg",
  title = "See ClinicalSim.ai in Action",
  description,
  aspectRatio = "video",
  className,
  ...props
}: DemoVideoSectionProps) {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement>(null)

  const handlePlay = () => {
    setIsPlaying(true)
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  return (
    <div className={cn("space-y-6", className)} {...props}>
      {/* Title and Description */}
      {(title || description) && (
        <div className="text-center max-w-3xl mx-auto mb-8">
          {title && (
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg md:text-xl text-cs-dark-blue/85 font-light">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Video Container */}
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900",
          aspectRatioStyles[aspectRatio],
          !youtubeUrl && "group cursor-pointer"
        )}
        onClick={!youtubeUrl ? handlePlay : undefined}
      >
        {/* YouTube iframe */}
        {youtubeUrl && (
          <iframe
            src={youtubeUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}

        {/* Video Element */}
        {videoUrl && !youtubeUrl && (
          <video
            ref={videoRef}
            className={cn(
              "absolute inset-0 w-full h-full object-cover",
              isPlaying ? "opacity-100" : "opacity-0"
            )}
            controls={isPlaying}
            poster={thumbnailUrl}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Thumbnail with Play Button */}
        {!isPlaying && !videoUrl && !youtubeUrl && (
          <>
            <Image
              src={thumbnailUrl}
              alt="Video thumbnail"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-cs-electric shadow-2xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-cs-electric/50">
                <Play className="w-10 h-10 md:w-12 md:h-12 text-white ml-1" fill="white" />
              </div>
            </div>
          </>
        )}

        {/* Coming Soon Overlay (if no video URL provided) */}
        {!videoUrl && !youtubeUrl && (
          <div className="absolute inset-0 flex items-center justify-center bg-cs-dark-blue/90">
            <div className="text-center text-white p-8">
              <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-2xl font-medium">Demo Video Coming Soon</p>
              <p className="text-lg font-light mt-2 opacity-80">
                We&apos;re preparing an in-depth product demonstration
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
