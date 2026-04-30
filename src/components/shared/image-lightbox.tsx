'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { ContentImage } from '@/components/shared/content-image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ImageLightbox({
  images,
  initialIndex = 0,
  open,
  onOpenChange,
}: {
  images: string[]
  initialIndex?: number
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [index, setIndex] = useState(initialIndex)

  useEffect(() => {
    if (open) setIndex(initialIndex)
  }, [open, initialIndex])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setIndex((i) => (i > 0 ? i - 1 : images.length - 1))
      } else if (e.key === 'ArrowRight') {
        setIndex((i) => (i < images.length - 1 ? i + 1 : 0))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, images.length])

  if (!images.length) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-0 bg-black/95 p-0 sm:max-w-4xl [&>button]:hidden"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogTitle className="sr-only">Image viewer</DialogTitle>
        <div className="relative flex items-center justify-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            <ContentImage
              src={images[index]}
              alt={`Image ${index + 1} of ${images.length}`}
              fill
              sizes="(max-width: 768px) 100vw, 900px"
              quality={90}
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white"
                onClick={() => setIndex((i) => (i > 0 ? i - 1 : images.length - 1))}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white"
                onClick={() => setIndex((i) => (i < images.length - 1 ? i + 1 : 0))}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}

          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>

          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs text-white">
              {index + 1} / {images.length}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
