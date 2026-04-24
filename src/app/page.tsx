import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, FileText, ShieldCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import type { SitePost } from '@/lib/site-connector'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type TaskFeedItem = { task: (typeof SITE_CONFIG.tasks)[number]; posts: SitePost[] }

const featuredTaskKeys: TaskKey[] = ['listing']

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

async function loadHomeFeed() {
  const tasksToLoad = SITE_CONFIG.tasks.filter((task) => featuredTaskKeys.includes(task.key))
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      tasksToLoad.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 8, { allowMockFallback: true, fresh: true }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const listingPosts = taskFeed.find(({ task }) => task.key === 'listing')?.posts || []
  const classifiedPosts = await fetchTaskPosts('classified', 4, { allowMockFallback: true, fresh: true }).catch(() => [])

  return { listingPosts, classifiedPosts }
}

function HeroCard({
  title,
  value,
  description,
}: {
  title: string
  value: string
  description: string
}) {
  return (
    <div className="rounded-[1.5rem] border border-[rgba(16,40,58,0.12)] bg-white/85 p-4 shadow-[0_12px_28px_rgba(16,40,58,0.06)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">{title}</p>
      <p className="mt-2 text-lg font-semibold text-[#10283a]">{value}</p>
      <p className="mt-1 text-sm leading-6 text-[#586779]">{description}</p>
    </div>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const { listingPosts } = await loadHomeFeed()
  const primaryListing = listingPosts[0]
  const featuredListings = listingPosts.slice(0, 3)
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,48,73,0.08),transparent_28%),radial-gradient(circle_at_top_right,rgba(214,40,40,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(252,191,73,0.14),transparent_26%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <div className="brand-chip mb-5 w-fit">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Curated business directory
                </div>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                  A polished home for brands, listings, and local discovery.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[#586779]">{siteContent.home.metadata.description}</p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/listings" className="inline-flex items-center gap-2 rounded-full bg-[#003049] px-5 py-3 text-sm font-semibold text-[#fffaf4] shadow-[0_12px_28px_rgba(0,48,73,0.18)] hover:bg-[#07283d]">
                    Browse listings
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <HeroCard title="Primary lane" value="Business Listings" description="The homepage foregrounds business discovery first." />
                  <HeroCard title="Quick scan" value="Fast comparison" description="Visitors can review listings without extra noise." />
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[2.2rem] border border-[rgba(16,40,58,0.12)] bg-white/88 p-6 shadow-[0_24px_70px_rgba(16,40,58,0.08)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">Featured listing</p>
                      <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{primaryListing?.title || 'Featured business'}</h2>
                    </div>
                    <Building2 className="h-6 w-6 text-[#003049]" />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#586779]">{primaryListing?.summary || 'A highlighted business surface with stronger trust cues and a faster path to action.'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4 border-b border-[rgba(16,40,58,0.12)] pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">Featured businesses</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Stronger listings with clearer trust cues.</h2>
            </div>
            <Link href="/listings" className="text-sm font-semibold text-[#003049] hover:opacity-80">Open listings</Link>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {featuredListings.map((post) => (
              <TaskPostCard key={post.id} post={post} href={getTaskHref('listing', post.slug)} taskKey="listing" />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
