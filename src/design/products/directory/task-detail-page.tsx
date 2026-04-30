import Link from 'next/link'
import { ArrowRight, Globe, Mail, MapPin, Phone, ShieldCheck, Tag, Star, MessageSquare, Image as ImageIcon, CheckCircle2, Clock } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { ClickableImage } from '@/components/shared/clickable-image'
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
  const offerings = specialtyChips.length > 0 ? specialtyChips.slice(0, 6) : ['Premium Service', 'Expert Team', 'Fast Delivery', 'Quality Guarantee', '24/7 Support', 'Custom Solutions']
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

        {/* Hero Section */}
        <section className="mb-12">
          <div className="overflow-hidden rounded-[2.2rem] border border-[rgba(16,40,58,0.12)] bg-white shadow-[0_24px_70px_rgba(16,40,58,0.08)]">
            <div className="relative h-[420px] overflow-hidden bg-[#eef3f6]">
              <ClickableImage src={images[0]} alt={post.title} allImages={images} index={0} fill className="object-cover" />
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
          </div>
        </section>

        {/* Title Section */}
        <section className="mb-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">{category || taskLabel}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">{post.title}</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              {website ? <a href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#e67e22] px-5 py-3 text-sm font-semibold text-white hover:bg-[#d35400] transition-colors">Visit website <ArrowRight className="h-4 w-4" /></a> : null}
              <Link href={taskRoute} className="inline-flex items-center gap-2 rounded-full border-2 border-[#e67e22] bg-white px-5 py-3 text-sm font-semibold text-[#e67e22] hover:bg-[#fff8ef] transition-colors">Browse more</Link>
            </div>
          </div>
        </section>

        {/* Contact & Location Section */}
        <section className="mb-12">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">Contact & Location</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Get in touch with us</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-[rgba(16,40,58,0.12)] bg-white p-7 shadow-[0_20px_60px_rgba(16,40,58,0.06)]">
              <div className="space-y-4">
                {location ? (
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#e67e22] p-3">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">Address</p>
                      <p className="mt-1 text-sm text-[#10283a]">{location}</p>
                    </div>
                  </div>
                ) : null}
                {phone ? (
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#e67e22] p-3">
                      <Phone className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">Phone</p>
                      <p className="mt-1 text-sm text-[#10283a]">{phone}</p>
                    </div>
                  </div>
                ) : null}
                {email ? (
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#e67e22] p-3">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">Email</p>
                      <p className="mt-1 text-sm text-[#10283a]">{email}</p>
                    </div>
                  </div>
                ) : null}
                {website ? (
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-[#e67e22] p-3">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">Website</p>
                      <a href={website} target="_blank" rel="noreferrer" className="mt-1 text-sm text-[#003049] hover:underline">{website}</a>
                    </div>
                  </div>
                ) : null}
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
            </div>
            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-[2rem] border border-[rgba(16,40,58,0.12)] bg-white shadow-[0_24px_60px_rgba(16,40,58,0.08)]">
                <iframe src={mapEmbedUrl} title={`${post.title} map`} className="h-full min-h-[400px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            ) : null}
          </div>
        </section>

        {/* Working Hours Section */}
        {typeof content.hours === 'string' && content.hours.trim() ? (
          <section className="mb-12">
            <div className="rounded-[2rem] border border-[rgba(16,40,58,0.12)] bg-white p-7 shadow-[0_20px_60px_rgba(16,40,58,0.06)]">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#e67e22] p-2">
                  <Clock className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">Working Hours</p>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">When we're open</h2>
              <p className="mt-4 text-sm leading-8 text-[#586779]">{content.hours}</p>
            </div>
          </section>
        ) : null}

        {/* About Section */}
        <section className="mb-12">
          <div className="rounded-[2rem] border border-[rgba(16,40,58,0.12)] bg-white p-7 shadow-[0_20px_60px_rgba(16,40,58,0.06)]">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[#e67e22] p-2">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">About {post.title}</p>
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">Learn more about our services</h2>
            <RichContent html={formatRichHtml(description)} className="mt-4 text-sm leading-8 text-[#586779]" />
            {highlights.length ? (
              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {highlights.slice(0, 4).map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-[1.4rem] border border-[rgba(16,40,58,0.12)] bg-[#fff8ef] px-4 py-4 text-sm text-[#10283a]">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#e67e22]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {/* Our Offerings Section */}
        <section className="mb-12">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">Our Offerings</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">What we provide</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {offerings.map((offering, index) => (
              <div key={index} className="rounded-[1.5rem] border border-[rgba(16,40,58,0.12)] bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="rounded-full bg-[#e67e22] p-3 w-fit">
                  <CheckCircle2 className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#10283a]">{offering}</h3>
                <p className="mt-2 text-sm text-[#586779]">Professional {offering.toLowerCase()} services tailored to your needs.</p>
              </div>
            ))}
          </div>
        </section>


        {/* Gallery Section */}
        {images.length > 1 ? (
          <section className="mb-12">
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[#e67e22] p-2">
                  <ImageIcon className="h-5 w-5 text-white" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">Gallery</p>
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">Photo Gallery</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {images.slice(1, 7).map((image, index) => (
                <div key={image} className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-[1.5rem] border border-[rgba(16,40,58,0.12)] bg-[#f7f3ec]">
                  <ClickableImage src={image} alt={`${post.title} gallery ${index + 1}`} allImages={images} index={index + 1} fill className="object-cover" />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* Related Listings Section */}
        {related.length ? (
          <section className="mb-12">
            <div className="flex items-end justify-between gap-4 border-b border-[rgba(16,40,58,0.12)] pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">Related Listings</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Keep browsing nearby matches</h2>
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
