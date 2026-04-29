"use client"

import * as React from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Screenshot {
  src: string
  alt: string
  caption?: string
}

export interface ScreenshotGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  screenshots: Screenshot[]
  columns?: 2 | 3 | 4
}

export function ScreenshotGallery({
  screenshots,
  columns = 3,
  className,
  ...props
}: ScreenshotGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
  }

  const closeLightbox = React.useCallback(() => {
    setLightboxIndex(null)
  }, [])

  const goToPrevious = React.useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + screenshots.length) % screenshots.length : null
    )
  }, [screenshots.length])

  const goToNext = React.useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % screenshots.length : null
    )
  }, [screenshots.length])

  const columnClass = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === "Escape") closeLightbox()
        if (e.key === "ArrowLeft") goToPrevious()
        if (e.key === "ArrowRight") goToNext()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxIndex, closeLightbox, goToPrevious, goToNext])

  return (
    <>
      {/* Gallery Grid */}
      <div className={cn("grid gap-6", columnClass[columns], className)} {...props}>
        {screenshots.map((screenshot, index) => (
          <div
            key={index}
            className="group cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/70 border border-white/20 aspect-video">
              <Image
                src={screenshot.src}
                alt={screenshot.alt}
                fill
                className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {screenshot.caption && (
              <p className="text-sm text-cs-dark-blue/70 mt-3 text-center font-light">
                {screenshot.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-cs-dark-blue transition-colors p-2 rounded-full hover:bg-white/10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-4 text-white hover:text-cs-dark-blue transition-colors p-2 rounded-full hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          {/* Image Container */}
          <div
            className="max-w-6xl max-h-[90vh] mx-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-h-[85vh]">
              <Image
                src={screenshots[lightboxIndex].src}
                alt={screenshots[lightboxIndex].alt}
                width={1200}
                height={800}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
            </div>
            {screenshots[lightboxIndex].caption && (
              <p className="text-white text-center mt-4 text-lg">
                {screenshots[lightboxIndex].caption}
              </p>
            )}
          </div>

          {/* Next Button */}
          <button
            className="absolute right-4 text-white hover:text-cs-dark-blue transition-colors p-2 rounded-full hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            aria-label="Next"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {lightboxIndex + 1} / {screenshots.length}
          </div>
        </div>
      )}
    </>
  )
}
