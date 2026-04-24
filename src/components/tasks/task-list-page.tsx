import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, Tag, User, Search, ShieldCheck } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory': 'bg-[radial-gradient(circle_at_top_left,rgba(0,48,73,0.08),transparent_24%),radial-gradient(circle_at_top_right,rgba(214,40,40,0.08),transparent_20%),linear-gradient(180deg,#f9f3ea_0%,#ffffff_100%)]',
  'listing-showcase': 'bg-[linear-gradient(180deg,#fffdf8_0%,#f7f0e3_100%)]',
  'article-editorial': 'bg-[radial-gradient(circle_at_top_left,rgba(214,40,40,0.08),transparent_20%),linear-gradient(180deg,#fff8ef_0%,#ffffff_100%)]',
  'article-journal': 'bg-[linear-gradient(180deg,#fffdf9_0%,#f5ede1_100%)]',
  'image-masonry': 'bg-[linear-gradient(180deg,#07111f_0%,#111c2f_100%)] text-white',
  'image-portfolio': 'bg-[linear-gradient(180deg,#06101c_0%,#12223a_100%)] text-white',
  'profile-creator': 'bg-[linear-gradient(180deg,#08111d_0%,#101e31_100%)] text-white',
  'profile-business': 'bg-[linear-gradient(180deg,#fffdf8_0%,#f7efe5_100%)]',
  'classified-bulletin': 'bg-[linear-gradient(180deg,#f6efe4_0%,#ffffff_100%)]',
  'classified-market': 'bg-[linear-gradient(180deg,#f7f2e8_0%,#ffffff_100%)]',
  'sbm-curation': 'bg-[linear-gradient(180deg,#fff7ef_0%,#ffffff_100%)]',
  'sbm-library': 'bg-[linear-gradient(180deg,#f7f7fb_0%,#ffffff_100%)]',
} as const

type UiTone = {
  muted: string
  panel: string
  soft: string
  input: string
  button: string
}

function getUiTone(layoutKey: string): UiTone {
  const base = {
    muted: 'text-[#586779]',
    panel: 'border border-[rgba(16,40,58,0.12)] bg-white',
    soft: 'border border-[rgba(16,40,58,0.12)] bg-[#fffdf8]',
    input: 'border border-[rgba(16,40,58,0.12)] bg-white text-[#10283a]',
    button: 'bg-[#003049] text-[#fffaf4] hover:bg-[#07283d]',
  }

  if (layoutKey.startsWith('image') || layoutKey.startsWith('profile')) {
    return {
      muted: 'text-slate-300',
      panel: 'border border-white/10 bg-white/6',
      soft: 'border border-white/10 bg-white/5',
      input: 'border-white/10 bg-white/6 text-white',
      button: 'bg-[#fcbf49] text-[#07111f] hover:bg-[#f1b437]',
    }
  }

  if (layoutKey.startsWith('article') || layoutKey.startsWith('sbm')) {
    return {
      muted: 'text-[#586779]',
      panel: 'border border-[rgba(16,40,58,0.12)] bg-white/92',
      soft: 'border border-[rgba(16,40,58,0.12)] bg-[#fff8ef]',
      input: 'border border-[rgba(16,40,58,0.12)] bg-white text-[#10283a]',
      button: 'bg-[#003049] text-[#fffaf4] hover:bg-[#07283d]',
    }
  }

  return base
}

function HeaderBlock({
  task,
  layoutKey,
  taskConfig,
  ui,
  category,
}: {
  task: TaskKey
  layoutKey: string
  taskConfig: ReturnType<typeof getTaskConfig>
  ui: UiTone
  category: string
}) {
  const Icon = taskIcons[task] || LayoutGrid

  if (layoutKey === 'listing-directory' || layoutKey === 'listing-showcase') {
    return (
      <section className={`mb-10 rounded-[2rem] p-7 shadow-[0_24px_70px_rgba(16,40,58,0.07)] lg:p-8 ${ui.panel}`}>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(16,40,58,0.12)] bg-[#f3e7d6] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#003049]">
            <ShieldCheck className="h-3.5 w-3.5" />
            Featured directory
          </div>
          <div className="mt-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] opacity-70">
            <Icon className="h-4 w-4" />
            {taskConfig?.label || task}
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
          <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>Built for quicker scanning, stronger trust cues, and a structure designed for comparing businesses rather than browsing a generic feed.</p>
        </div>
      </section>
    )
  }

  if (layoutKey === 'article-editorial' || layoutKey === 'article-journal') {
    return (
      <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
          <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
          <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This reading surface uses slower pacing, stronger typographic hierarchy, and more breathing room so long-form content feels intentional rather than squeezed into a generic feed.</p>
        </div>
        <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${ui.muted}`}>Reading note</p>
          <p className={`mt-4 text-sm leading-7 ${ui.muted}`}>Use category filters to jump between topics without collapsing the page into the same repeated card rhythm used by other task types.</p>
          <form className="mt-5 flex items-center gap-3" action={taskConfig?.route || '#'}>
            <select name="category" defaultValue={category} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => (
                <option key={item.slug} value={item.slug}>{item.name}</option>
              ))}
            </select>
            <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-semibold ${ui.button}`}>Apply</button>
          </form>
        </div>
      </section>
    )
  }

  if (layoutKey === 'image-masonry' || layoutKey === 'image-portfolio') {
    return (
      <section className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
            <Icon className="h-3.5 w-3.5" />
            Visual feed
          </div>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">{taskConfig?.description || 'Latest posts'}</h1>
          <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This surface leans into stronger imagery, larger modules, and more expressive spacing so visual content feels materially different from reading and directory pages.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className={`min-h-[220px] rounded-[2rem] ${ui.panel}`} />
          <div className={`min-h-[220px] rounded-[2rem] ${ui.soft}`} />
          <div className={`col-span-2 min-h-[120px] rounded-[2rem] ${ui.panel}`} />
        </div>
      </section>
    )
  }

  if (layoutKey === 'profile-creator' || layoutKey === 'profile-business') {
    return (
      <section className={`mb-12 rounded-[2.2rem] p-8 shadow-[0_24px_70px_rgba(16,40,58,0.1)] ${ui.panel}`}>
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className={`min-h-[240px] rounded-[2rem] ${ui.soft}`} />
          <div>
            <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Profiles with stronger identity, trust, and reputation cues.</h1>
            <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This layout prioritizes the person or business surface first, then lets the feed continue below without borrowing the same visual logic used by articles or listings.</p>
          </div>
        </div>
      </section>
    )
  }

  if (layoutKey === 'classified-bulletin' || layoutKey === 'classified-market') {
    return (
      <section className="mb-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className={`rounded-[1.8rem] p-6 ${ui.panel}`}>
          <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Fast-moving notices, offers, and responses in a compact board format.</h1>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {['Quick to scan', 'Shorter response path', 'Clearer urgency cues'].map((item) => (
            <div key={item} className={`rounded-[1.5rem] p-5 ${ui.soft}`}>
              <p className="text-sm font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (layoutKey === 'sbm-curation' || layoutKey === 'sbm-library') {
    return (
      <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <div>
          <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Curated resources arranged more like collections than a generic post feed.</h1>
          <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>Bookmarks, saved resources, and reference-style items need calmer grouping and lighter metadata. This variant gives them that separation.</p>
        </div>
        <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
          <p className={`text-xs uppercase tracking-[0.24em] ${ui.muted}`}>Collection filter</p>
          <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
            <select name="category" defaultValue={category} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
              <option value="all">All categories</option>
              {CATEGORY_OPTIONS.map((item) => (
                <option key={item.slug} value={item.slug}>{item.name}</option>
              ))}
            </select>
            <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-semibold ${ui.button}`}>Apply</button>
          </form>
        </div>
      </section>
    )
  }

  return null
}

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30, { allowMockFallback: true })
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const ui = getUiTone(layoutKey)

  const isDark = ['image-masonry', 'image-portfolio', 'profile-creator'].includes(layoutKey)

  const listHeroProps = {
    task,
    layoutKey,
    taskConfig,
    ui,
    category: normalizedCategory,
  }

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        <HeaderBlock {...listHeroProps} />

        {intro ? (
          <section className={`mb-12 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(16,40,58,0.06)] sm:p-8 ${ui.panel}`}>
            <h2 className="text-2xl font-semibold text-foreground">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}
