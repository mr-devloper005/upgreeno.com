export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'uukv3n8eix',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'upgreeno',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Curated business listings',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A polished directory for brands, services, and local companies with clear comparison, trusted presentation, and premium browsing flow.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'upgreeno.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://upgreeno.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

