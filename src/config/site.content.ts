import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Curated business directory',
  },
  footer: {
    tagline: 'Listings, profiles, and supporting resources',
  },
  hero: {
    badge: 'Curated business directory',
    title: ['A polished home for', 'brands, listings, and local discovery.'],
    description:
      'Explore verified business listings, brand profiles, and supporting pages through a clean, premium browsing experience built for fast comparison.',
    primaryCta: {
      label: 'Browse listings',
      href: '/listings',
    },
    secondaryCta: {
      label: 'View profiles',
      href: '/profile',
    },
    searchPlaceholder: 'Search brands, services, categories, or locations',
    focusLabel: 'Featured surface',
    featureCardBadge: 'primary lane',
    featureCardTitle: 'Listings stay at the center, with profiles and support pages nearby.',
    featureCardDescription:
      'The homepage keeps the directory crisp and trusted, while other task routes remain available from lower-emphasis layers and direct URLs.',
  },
  home: {
    metadata: {
      title: 'Curated business listings and brand discovery',
      description:
        'Explore business listings, profiles, classifieds, and supporting surfaces through a premium directory-first experience.',
      openGraphTitle: 'Curated business listings and brand discovery',
      openGraphDescription:
        'Discover brands, services, and trusted listing pages through a calmer directory-first experience.',
      keywords: ['business listings', 'brand directory', 'local discovery', 'profiles', 'classifieds'],
    },
    introBadge: 'Why it works',
    introTitle: 'Built for scanning, comparing, and choosing with confidence.',
    introParagraphs: [
      'This site is designed like a premium directory, so brands and businesses feel organized, credible, and easy to evaluate.',
      'The main surfaces stay focused on listings and profile pages, while every other task route remains available for deeper browsing or direct access.',
      'The result is a cleaner path from search to decision without turning the whole product into a generic content feed.',
    ],
    sideBadge: 'Highlights',
    sidePoints: [
      'Primary emphasis on business listings with profile support nearby.',
      'Premium cards, stronger spacing, and clearer trust cues.',
      'Lower-emphasis access to classifieds, articles, images, and PDFs.',
      'Fast mobile-first browsing with search, compare, and contact patterns.',
    ],
    primaryLink: {
      label: 'Browse businesses',
      href: '/listings',
    },
    secondaryLink: {
      label: 'Open profiles',
      href: '/profile',
    },
  },
  cta: {
    badge: 'Start exploring',
    title: 'Find polished listings, compare brands, and move confidently to the next step.',
    description:
      'Move between listing pages, profiles, and supporting routes with a cleaner visual system built for business discovery.',
    primaryCta: {
      label: 'Open listings',
      href: '/listings',
    },
    secondaryCta: {
      label: 'Contact us',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Featured {label}',
  taskSectionDescriptionSuffix: 'Browse the newest items in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and insights',
    description: 'Read guides, stories, and long-form posts that add context to the directory.',
  },
  listing: {
    title: 'Business listings and brand pages',
    description: 'Explore services, companies, and structured pages organized for quick comparison.',
  },
  classified: {
    title: 'Classifieds and announcements',
    description: 'Browse offers, notices, and time-sensitive posts with a cleaner bulletin layout.',
  },
  image: {
    title: 'Images and visual posts',
    description: 'Explore image-led posts, galleries, and visual stories from across the platform.',
  },
  profile: {
    title: 'Profiles and public pages',
    description: 'Discover business profiles, brand pages, and identity-focused posts in one place.',
  },
  sbm: {
    title: 'Curated links and saved resources',
    description: 'Browse useful links, saved references, and curated resources organized for discovery.',
  },
  pdf: {
    title: 'PDFs and downloadable resources',
    description: 'Open reports, documents, and downloadable resources shared across the platform.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and structured pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a business offers.',
      'Listings connect naturally with profiles, classifieds, and other supporting content so brand information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore classifieds', href: '/classifieds' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open images', href: '/images' },
      { label: 'Browse resources', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Classifieds, offers, and timely updates',
    paragraphs: [
      'Classified posts help surface offers, notices, deals, and time-sensitive opportunities in a faster-scanning format.',
      'They work well alongside listings and profiles, making it easier to connect short-term posts with more structured content.',
      'Browse by category to find announcements quickly, then continue into related sections when you need more detail.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images take the lead in this section through galleries, visual posts, and story-led content where imagery carries the experience.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with listings, documents, and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Browse images', href: '/images' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related listings, profiles, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Explore listings', href: '/listings' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside listings and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'See listings', href: '/listings' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with listings and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Open listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Business listings', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
