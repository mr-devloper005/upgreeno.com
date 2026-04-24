import React from 'react'
import Link from 'next/link'
import { FileText, Building2, LayoutGrid, Tag, Github, Twitter, Linkedin, Image as ImageIcon, User, ArrowRight, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { FOOTER_OVERRIDE_ENABLED, FooterOverride } from '@/overrides/footer'

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

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

const footerCompanyLinks = [
  { name: 'Help Center', href: '/help' },
  { name: 'Contact us', href: '/contact' },
]

const resourceLinks = [
  { name: 'Help Center', href: '/help' },
  { name: 'Community', href: '/community' },
  { name: 'Developers', href: '/developers' },
  { name: 'Status', href: '/status' },
]

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
  { name: 'Careers', href: '/careers' },
  { name: 'Blog', href: '/blog' },
  { name: 'Press', href: '/press' },
]

export function Footer() {
  if (FOOTER_OVERRIDE_ENABLED) {
    return <FooterOverride />
  }

  const { recipe } = getFactoryState()
  const primaryTasks = ['listing', 'profile']
    .map((key) => SITE_CONFIG.tasks.find((task) => task.key === key))
    .filter(Boolean) as (typeof SITE_CONFIG.tasks)[number][]
  const allTasks = SITE_CONFIG.tasks
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === recipe.primaryTask) || primaryTasks[0]

  if (recipe.footer === 'minimal-footer') {
    return (
      <footer className="border-t border-[rgba(16,40,58,0.12)] bg-[rgba(255,251,245,0.96)] text-[#10283a]">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 rounded-[2rem] border border-[rgba(16,40,58,0.12)] bg-white/80 p-6 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div>
              <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
              <p className="mt-1 max-w-xl text-sm text-[#586779]">{SITE_CONFIG.description}</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              {primaryTasks.map((task) => (
                <Link key={task.key} href={task.route} className="rounded-full border border-[rgba(16,40,58,0.12)] bg-[#f3e7d6] px-3 py-2 text-sm font-semibold text-[#10283a] hover:bg-[#efe0ca]">
                  {task.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'dense-footer') {
    return (
      <footer className="border-t border-white/10 bg-[linear-gradient(180deg,#07111f_0%,#0b1a2e_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/8 p-1.5">
                  <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="48" height="48" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{siteContent.footer.tagline}</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">{SITE_CONFIG.description}</p>
              {primaryTask ? (
                <Link href={primaryTask.route} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#fcbf49] px-4 py-2.5 text-sm font-semibold text-[#07111f] hover:bg-[#f1b437]">
                  Explore {primaryTask.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Surfaces</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {allTasks.slice(0, 6).map((item) => (
                    <li key={item.key}><Link href={item.route} className="flex items-center gap-2 hover:text-white">{taskIcons[item.key] ? React.createElement(taskIcons[item.key], { className: 'h-4 w-4' }) : null}{item.label}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Resources</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {resourceLinks.map((item) => (
                    <li key={item.name}><Link href={item.href} className="hover:text-white">{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Connect</h3>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map((item) => (
                    <Link key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/8 p-2.5 text-slate-200 hover:bg-white/12 hover:text-white">
                      <item.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-5 text-sm text-slate-400">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'editorial-footer') {
    return (
      <footer className="border-t border-[#d8c8bb] bg-[linear-gradient(180deg,#fff8ef_0%,#f7eee1_100%)] text-[#2f1d16]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#dbc6b6] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#72594a]">
                <Sparkles className="h-3.5 w-3.5" />
                Editorial desk
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{SITE_CONFIG.name}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#72594a]">{SITE_CONFIG.description}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6d5a]">Sections</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {allTasks.slice(0, 6).map((item) => (
                  <li key={item.key}><Link href={item.route} className="hover:text-[#2f1d16]">{item.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6d5a]">Company</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {companyLinks.map((item) => (
                  <li key={item.name}><Link href={item.href} className="hover:text-[#2f1d16]">{item.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t border-[rgba(16,40,58,0.12)] bg-[linear-gradient(180deg,#fffdf9_0%,#f6efe4_100%)] text-[#10283a]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-[rgba(16,40,58,0.12)] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 overflow-hidden rounded-2xl border border-[rgba(16,40,58,0.12)] bg-white p-1 shadow-sm">
              <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} width="56" height="56" className="h-full w-full object-contain" />
            </div>
            <div>
              <span className="block text-lg font-semibold">{SITE_CONFIG.name}</span>
              <span className="text-xs uppercase tracking-[0.22em] text-slate-500">{siteContent.footer.tagline}</span>
            </div>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-[#586779]">{SITE_CONFIG.description}</p>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7b8a]">Company</h3>
            <ul className="mt-3 flex flex-wrap gap-4 text-sm text-[#586779]">
              {footerCompanyLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-[#10283a]">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 text-sm text-[#6b7b8a]">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
      </div>
    </footer>
  )
}
