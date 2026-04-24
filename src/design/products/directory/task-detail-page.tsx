import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const detailFacts = [
    typeof content.founded === 'string' || typeof content.founded === 'number' ? { label: 'Founded', value: String(content.founded) } : null,
    typeof content.teamSize === 'string' || typeof content.teamSize === 'number' ? { label: 'Team size', value: String(content.teamSize) } : null,
    typeof content.priceRange === 'string' ? { label: 'Price range', value: content.priceRange } : null,
    typeof content.hours === 'string' ? { label: 'Hours', value: content.hours } : null,
    typeof content.rating === 'string' || typeof content.rating === 'number' ? { label: 'Rating', value: String(content.rating) } : null,
    typeof content.reviewsCount === 'string' || typeof content.reviewsCount === 'number' ? { label: 'Reviews', value: String(content.reviewsCount) } : null,
  ].filter((item): item is { label: string; value: string } => Boolean(item))
  const specialtyChips = [
    ...(Array.isArray(content.specialties) ? content.specialties : []),
    ...(Array.isArray(content.services) ? content.services : []),
  ].filter((item): item is string => typeof item === 'string')
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f9f3ea_0%,#ffffff_100%)] text-[#10283a]">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(16,40,58,0.12)] bg-white px-4 py-2 text-sm font-semibold text-[#10283a] shadow-sm hover:bg-[#f3e7d6]">
          <ArrowRight className="h-4 w-4 rotate-180" />
          Back to {taskLabel}
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div>
            <div className="overflow-hidden rounded-[2.2rem] border border-[rgba(16,40,58,0.12)] bg-white shadow-[0_24px_70px_rgba(16,40,58,0.08)]">
              <div className="relative h-[420px] overflow-hidden bg-[#eef3f6]">
                <ContentImage src={images[0]} alt={post.title} fill className="object-cover" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#003049] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#fffaf4]">
                    <Tag className="h-3.5 w-3.5" />
                    {category}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#10283a] shadow-sm">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                </div>
              </div>
              {images.length > 1 ? (
                <div className="grid grid-cols-4 gap-3 p-4">
                  {images.slice(1, 5).map((image) => (
                    <div key={image} className="relative h-24 overflow-hidden rounded-2xl border border-[rgba(16,40,58,0.12)] bg-[#f7f3ec]">
                      <ContentImage src={image} alt={post.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-8 rounded-[2rem] border border-[rgba(16,40,58,0.12)] bg-white p-7 shadow-[0_20px_60px_rgba(16,40,58,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">About this {task}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Structured details instead of a generic content block.</h2>
              <p className="mt-4 text-sm leading-8 text-[#586779]">{description}</p>
              {highlights.length ? (
                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {highlights.slice(0, 4).map((item) => (
                    <div key={item} className="rounded-[1.4rem] border border-[rgba(16,40,58,0.12)] bg-[#fff8ef] px-4 py-4 text-sm text-[#10283a]">
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
              {specialtyChips.length ? (
                <div className="mt-6 rounded-[2rem] border border-[rgba(16,40,58,0.12)] bg-white/88 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">Specialties</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {specialtyChips.slice(0, 8).map((item) => (
                      <span key={item} className="rounded-full border border-[rgba(16,40,58,0.12)] bg-[#fff8ef] px-3 py-1 text-sm text-[#10283a]">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="space-y-6">
              <div className="rounded-[2rem] border border-[rgba(16,40,58,0.12)] bg-white p-7 shadow-[0_24px_60px_rgba(16,40,58,0.08)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">{category || taskLabel}</p>
                  <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">{post.title}</h1>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#003049] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {location ? <div className="flex items-center gap-3 rounded-2xl border border-[rgba(16,40,58,0.12)] bg-[#fff8ef] px-4 py-3 text-sm text-[#586779]"><MapPin className="h-4 w-4" /> {location}</div> : null}
                {phone ? <div className="flex items-center gap-3 rounded-2xl border border-[rgba(16,40,58,0.12)] bg-[#fff8ef] px-4 py-3 text-sm text-[#586779]"><Phone className="h-4 w-4" /> {phone}</div> : null}
                {email ? <div className="flex items-center gap-3 rounded-2xl border border-[rgba(16,40,58,0.12)] bg-[#fff8ef] px-4 py-3 text-sm text-[#586779]"><Mail className="h-4 w-4" /> {email}</div> : null}
                {website ? <div className="flex items-center gap-3 rounded-2xl border border-[rgba(16,40,58,0.12)] bg-[#fff8ef] px-4 py-3 text-sm text-[#586779]"><Globe className="h-4 w-4" /> {website}</div> : null}
              </div>
              {detailFacts.length ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {detailFacts.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-[rgba(16,40,58,0.12)] bg-[#fff8ef] px-4 py-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">{item.label}</p>
                      <p className="mt-2 text-sm font-medium text-[#10283a]">{item.value}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                {website ? <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#003049] px-5 py-3 text-sm font-semibold text-white hover:bg-[#07283d]">Visit website <ArrowRight className="h-4 w-4" /></a> : null}
                <Link href={taskRoute} className="inline-flex items-center gap-2 rounded-full border border-[rgba(16,40,58,0.12)] bg-white px-5 py-3 text-sm font-semibold text-[#10283a] hover:bg-[#f3e7d6]">Browse more</Link>
              </div>
            </div>

            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-[2rem] border border-[rgba(16,40,58,0.12)] bg-white shadow-[0_24px_60px_rgba(16,40,58,0.08)]">
                <div className="border-b border-[rgba(16,40,58,0.12)] px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">Location</p>
                </div>
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}

            <div className="rounded-[2rem] border border-[rgba(16,40,58,0.12)] bg-white p-6 shadow-[0_24px_60px_rgba(16,40,58,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">Quick trust cues</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {['Clear contact details', 'Stronger business framing', 'Map and location cues', 'Related surfaces nearby'].map((item) => (
                  <div key={item} className="rounded-[1.3rem] border border-[rgba(16,40,58,0.12)] bg-[#fff8ef] px-4 py-4 text-sm text-[#10283a]">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-[rgba(16,40,58,0.12)] pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">Related surfaces</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(16,40,58,0.12)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#6b7b8a]">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
