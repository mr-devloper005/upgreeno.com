'use client'

import { useState } from 'react'
import { ContentImage } from '@/components/shared/content-image'
import { ImageLightbox } from '@/components/shared/image-lightbox'

export function ClickableImage({
  src,
  alt,
  allImages,
  index = 0,
  className,
  fill,
  sizes,
  quality,
  intrinsicWidth,
  intrinsicHeight,
  priority,
}: {
  src: string
  alt: string
  allImages?: string[]
  index?: number
  className?: string
  fill?: boolean
  sizes?: string
  quality?: number
  intrinsicWidth?: number
  intrinsicHeight?: number
  priority?: boolean
}) {
  const [open, setOpen] = useState(false)
  const images = allImages || [src]

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        <ContentImage
          src={src}
          alt={alt}
          fill={fill}
          sizes={sizes}
          quality={quality}
          className={className}
          intrinsicWidth={intrinsicWidth}
          intrinsicHeight={intrinsicHeight}
          priority={priority}
        />
      </div>
      <ImageLightbox
        images={images}
        initialIndex={index}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}
