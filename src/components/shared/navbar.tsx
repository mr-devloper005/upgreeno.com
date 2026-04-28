'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, ChevronRight, Sparkles, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { NAVBAR_OVERRIDE_ENABLED, NavbarOverride } from '@/overrides/navbar'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-[rgba(16,40,58,0.12)] bg-[rgba(255,251,245,0.92)] text-[#10283a] backdrop-blur-xl shadow-[0_1px_0_rgba(16,40,58,0.04)]',
    logo: 'rounded-[1.25rem] border border-[rgba(16,40,58,0.12)] bg-white shadow-[0_10px_24px_rgba(16,40,58,0.06)]',
    active: 'bg-[#003049] text-[#fffaf4] shadow-[0_10px_24px_rgba(0,48,73,0.16)]',
    idle: 'text-[#586779] hover:bg-[#f3e7d6] hover:text-[#10283a]',
    cta: 'rounded-full bg-[#003049] text-[#fffaf4] hover:bg-[#07283d]',
    mobile: 'border-t border-[rgba(16,40,58,0.12)] bg-[rgba(255,251,245,0.98)]',
  },
  'editorial-bar': {
    shell: 'border-b border-[#d8c8bb] bg-[#fff7ef]/94 text-[#2f1d16] backdrop-blur-xl',
    logo: 'rounded-full border border-[#dbc6b6] bg-white shadow-sm',
    active: 'bg-[#2f1d16] text-[#fff4e4]',
    idle: 'text-[#72594a] hover:bg-[#f2e5d4] hover:text-[#2f1d16]',
    cta: 'rounded-full bg-[#2f1d16] text-[#fff4e4] hover:bg-[#452920]',
    mobile: 'border-t border-[#dbc6b6] bg-[#fff7ee]',
  },
  'floating-bar': {
    shell: 'border-b border-transparent bg-transparent text-white',
    logo: 'rounded-[1.35rem] border border-white/12 bg-white/8 shadow-[0_16px_48px_rgba(15,23,42,0.22)] backdrop-blur',
    active: 'bg-[#fcbf49] text-[#07111f]',
    idle: 'text-slate-200 hover:bg-white/10 hover:text-white',
    cta: 'rounded-full bg-[#fcbf49] text-[#07111f] hover:bg-[#f1b437]',
    mobile: 'border-t border-white/10 bg-[#09101d]/96',
  },
  'utility-bar': {
    shell: 'border-b border-[rgba(16,40,58,0.12)] bg-[rgba(255,251,245,0.94)] text-[#10283a] backdrop-blur-xl shadow-[0_1px_0_rgba(16,40,58,0.04)]',
    logo: 'rounded-[1.25rem] border border-[rgba(16,40,58,0.12)] bg-white shadow-[0_10px_24px_rgba(16,40,58,0.06)]',
    active: 'bg-[#003049] text-[#fffaf4]',
    idle: 'text-[#586779] hover:bg-[#f3e7d6] hover:text-[#10283a]',
    cta: 'rounded-full bg-[#003049] text-[#fffaf4] hover:bg-[#07283d]',
    mobile: 'border-t border-[rgba(16,40,58,0.12)] bg-[rgba(255,251,245,0.98)]',
  },
} as const

const directoryPalette = {
  'directory-clean': {
    shell: 'border-b border-[rgba(16,40,58,0.12)] bg-[rgba(255,251,245,0.94)] text-[#10283a] shadow-[0_1px_0_rgba(16,40,58,0.04)] backdrop-blur-xl',
    logo: 'rounded-[1.25rem] border border-[rgba(16,40,58,0.12)] bg-white shadow-[0_10px_24px_rgba(16,40,58,0.06)]',
    nav: 'text-[#586779] hover:text-[#10283a]',
    search: 'border border-[rgba(16,40,58,0.12)] bg-white text-[#586779]',
    cta: 'bg-[#003049] text-[#fffaf4] hover:bg-[#07283d]',
    post: 'border border-[rgba(16,40,58,0.12)] bg-white text-[#10283a] hover:bg-[#f3e7d6]',
    mobile: 'border-t border-[rgba(16,40,58,0.12)] bg-[rgba(255,251,245,0.98)]',
  },
  'market-utility': {
    shell: 'border-b border-[rgba(16,40,58,0.12)] bg-[rgba(255,251,245,0.95)] text-[#10283a] shadow-[0_1px_0_rgba(16,40,58,0.04)] backdrop-blur-xl',
    logo: 'rounded-[1.25rem] border border-[rgba(16,40,58,0.12)] bg-white shadow-[0_10px_24px_rgba(16,40,58,0.06)]',
    nav: 'text-[#586779] hover:text-[#10283a]',
    search: 'border border-[rgba(16,40,58,0.12)] bg-white text-[#586779]',
    cta: 'bg-[#003049] text-[#fffaf4] hover:bg-[#07283d]',
    post: 'border border-[rgba(16,40,58,0.12)] bg-white text-[#10283a] hover:bg-[#f3e7d6]',
    mobile: 'border-t border-[rgba(16,40,58,0.12)] bg-[rgba(255,251,245,0.98)]',
  },
} as const

export function Navbar() {
  if (NAVBAR_OVERRIDE_ENABLED) {
    return <NavbarOverride />
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const featuredTasks = useMemo(() => {
    const wanted = ['profile'] as const
    return wanted.map((key) => SITE_CONFIG.tasks.find((task) => task.key === key)).filter(Boolean) as (typeof SITE_CONFIG.tasks)[number][]
  }, [])
  const secondaryTasks = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.key !== 'profile'),
    []
  )
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === recipe.primaryTask) || featuredTasks[0]
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'

  if (isDirectoryProduct) {
    const palette = directoryPalette[(recipe.brandPack === 'market-utility' ? 'market-utility' : 'directory-clean') as keyof typeof directoryPalette]

    return (
      <header className={cn('sticky top-0 z-50 w-full', palette.shell)}>
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <div className={cn('flex h-14 w-14 items-center justify-center overflow-hidden p-1.5', palette.logo)}>
                <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="56" height="56" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 hidden sm:block">
                <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
                <span className="block text-[10px] uppercase tracking-[0.24em] opacity-60">{siteContent.navbar.tagline}</span>
              </div>
            </Link>

            <div className="hidden items-center gap-3 xl:flex" />
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <Link href="/search" className={cn('flex w-full max-w-xl items-center gap-3 rounded-full px-4 py-3 transition-colors hover:bg-[#f3e7d6]', palette.search)}>
              <Search className="h-4 w-4" />
              <span className="text-sm">Search businesses, brands, and locations</span>
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild className={cn('rounded-full', palette.cta)}>
                  <Link href="/register">
                    <Plus className="mr-1 h-4 w-4" />
                    Add listing
                  </Link>
                </Button>
              </div>
            )}

            <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className={palette.mobile}>
            <div className="space-y-2 px-4 py-4">
              <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className={cn('mb-3 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors hover:bg-[#f3e7d6]', palette.search)}>
                <Search className="h-4 w-4" />
                Find businesses, brands, and services
              </Link>
              {featuredTasks.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link
                    key={task.key}
                    href={task.route}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-colors',
                      isActive ? 'bg-[#003049] text-white' : palette.post
                    )}
                  >
                    <span>{task.label}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                )
              })}
              <div className="px-2 pt-3">
                <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.24em] opacity-60">More sections</p>
                <div className="mt-2 grid gap-2">
                  {secondaryTasks.map((task) => {
                    const isActive = pathname.startsWith(task.route)
                    return (
                      <Link
                        key={task.key}
                        href={task.route}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                          isActive ? 'bg-[#003049] text-white' : 'bg-white text-[#10283a] hover:bg-[#f3e7d6]'
                        )}
                      >
                        <span>{task.label}</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'
  const isEditorial = recipe.navbar === 'editorial-bar'
  const isUtility = recipe.navbar === 'utility-bar'

  const navigation = featuredTasks

  return (
    <header className={cn('sticky top-0 z-50 w-full', style.shell)}>
      <nav className={cn('mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8', isFloating ? 'h-24 pt-4' : 'h-20')}>
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-7">
          <Link href="/" className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-2">
            <div className={cn('flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden p-1.5', style.logo)}>
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="56" height="56" className="h-full w-full object-contain" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
              <span className="hidden text-[10px] uppercase tracking-[0.28em] opacity-70 sm:block">{siteContent.navbar.tagline}</span>
            </div>
          </Link>

          {isEditorial ? (
            <div className="hidden min-w-0 flex-1 items-center gap-4 xl:flex">
              <div className="h-px flex-1 bg-[#d8c8bb]" />
              {navigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold uppercase tracking-[0.18em] transition-colors', isActive ? 'text-[#2f1d16]' : 'text-[#7b6254] hover:text-[#2f1d16]')}>
                    {task.label}
                  </Link>
                )
              })}
              <div className="h-px flex-1 bg-[#d8c8bb]" />
            </div>
          ) : isFloating ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {navigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          ) : isUtility ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {navigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
              {navigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {primaryTask && primaryTask.key !== 'listing' && (recipe.navbar === 'utility-bar' || recipe.navbar === 'floating-bar') ? (
            <Link href={primaryTask.route} className="hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-80 md:inline-flex">
              <Sparkles className="h-3.5 w-3.5" />
              {primaryTask.label}
            </Link>
          ) : null}

          <Button variant="ghost" size="icon" asChild className="hidden rounded-full md:flex">
            <Link href="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild className={style.cta}>
                <Link href="/register">{isEditorial ? 'Subscribe' : isUtility ? 'Post now' : 'Get started'}</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isFloating && primaryTask ? (
        <div className="mx-auto hidden max-w-7xl px-4 pb-3 sm:px-6 lg:block lg:px-8">
          <Link href={primaryTask.route} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur hover:bg-white/12">
            Featured surface
            <span>{primaryTask.label}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}

      {isMobileMenuOpen && (
        <div className={style.mobile}>
          <div className="space-y-2 px-4 py-4">
            <Link href="/search" onClick={() => setIsMobileMenuOpen(false)} className="mb-3 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground">
              <Search className="h-4 w-4" />
              Search the site
            </Link>
            {navigation.map((task) => {
              const Icon = taskIcons[task.key] || LayoutGrid
              const isActive = pathname.startsWith(task.route)
              return (
                <Link key={task.key} href={task.route} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                  <Icon className="h-5 w-5" />
                  {task.label}
                </Link>
              )
            })}
            <div className="pt-3">
              <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.24em] opacity-60">More sections</p>
              <div className="mt-2 grid gap-2">
                {secondaryTasks.map((task) => {
                  const isActive = pathname.startsWith(task.route)
                  return (
                    <Link
                      key={task.key}
                      href={task.route}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                        isActive ? 'bg-[#003049] text-white' : 'bg-white text-[#10283a] hover:bg-[#f3e7d6]'
                      )}
                    >
                      <span>{task.label}</span>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
