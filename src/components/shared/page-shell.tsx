'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-[rgba(16,40,58,0.12)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,48,73,0.08),transparent_26%),radial-gradient(circle_at_top_right,rgba(214,40,40,0.08),transparent_22%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="max-w-3xl">
                <p className="brand-chip mb-4">Directory page</p>
                <h1 className="text-4xl font-semibold tracking-[-0.05em] text-foreground sm:text-5xl">{title}</h1>
                {description ? <p className="mt-4 max-w-2xl text-base leading-8 text-[#586779]">{description}</p> : null}
              </div>
              {actions ? (
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  {actions}
                </div>
              ) : null}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  )
}
