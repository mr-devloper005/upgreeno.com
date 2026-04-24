import type { TaskKey } from "./site-config";
import type { SitePost } from "./site-connector";

type SamplePost = {
  title: string;
  slug: string;
  summary: string;
  category: string;
  description: string;
  body?: string;
  location?: string;
  address?: string;
  website?: string;
  phone?: string;
  email?: string;
  highlights?: string[];
  tags: string[];
  authorName: string;
  publishedAt: string;
  imageUrl: string;
  extra?: Record<string, unknown>;
};

const listingSamples: SamplePost[] = [
  {
    title: "Northline Workspace",
    slug: "northline-workspace",
    summary: "Flexible coworking, meeting rooms, and a polished client-facing lounge.",
    category: "Coworking",
    description:
      "A business-first workspace for teams that want meeting rooms, fast internet, and a presentation-ready reception area in one place.",
    body:
      "Northline Workspace blends private desks, bookable conference rooms, and a coffee bar so teams can host clients without leaving the building.",
    location: "Indiranagar, Bengaluru",
    address: "24 100 Feet Road, Indiranagar, Bengaluru 560038",
    website: "https://northlineworkspace.example",
    phone: "+91 98765 43010",
    email: "hello@northlineworkspace.example",
    highlights: ["Private cabins", "Client lounge", "Conference rooms", "Weekly networking events"],
    tags: ["Coworking", "Office", "Verified"],
    authorName: "Northline Desk",
    publishedAt: "2026-04-10",
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=800&fit=crop",
    extra: { founded: 2019, teamSize: 18, hours: "Mon-Sat, 8:00 AM - 8:00 PM", priceRange: "$$" },
  },
  {
    title: "Luma Dental Studio",
    slug: "luma-dental-studio",
    summary: "Modern dental care with clear treatment plans and same-day support.",
    category: "Healthcare",
    description:
      "A calm, premium clinic profile built for families and professionals who want a trustworthy practice with clear pricing and convenient appointments.",
    body:
      "Luma Dental Studio focuses on preventive care, cosmetic dentistry, and gentle same-day support with a front desk team that handles bookings quickly.",
    location: "Koramangala, Bengaluru",
    address: "17 80 Feet Road, Koramangala, Bengaluru 560034",
    website: "https://lumadental.example",
    phone: "+91 98765 43011",
    email: "care@lumadental.example",
    highlights: ["Digital scans", "Family care", "Emergency appointments", "Transparent pricing"],
    tags: ["Clinic", "Healthcare", "Verified"],
    authorName: "Luma Care Team",
    publishedAt: "2026-04-08",
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&h=800&fit=crop",
    extra: { founded: 2021, teamSize: 11, hours: "Mon-Sat, 9:00 AM - 7:30 PM", priceRange: "$$$" },
  },
  {
    title: "Harbor Street Interiors",
    slug: "harbor-street-interiors",
    summary: "Interior styling and home refresh projects for residential and retail spaces.",
    category: "Design",
    description:
      "A clean listing for an interior studio that helps homes, cafes, and boutiques create more polished customer-facing spaces.",
    body:
      "Harbor Street Interiors handles concept boards, material selection, and site coordination with a focus on understated premium finishes.",
    location: "Whitefield, Bengaluru",
    address: "42 ECC Road, Whitefield, Bengaluru 560066",
    website: "https://harborstreetinteriors.example",
    phone: "+91 98765 43012",
    email: "studio@harborstreetinteriors.example",
    highlights: ["Concept boards", "Retail styling", "Material sourcing", "Turnkey execution"],
    tags: ["Interior Design", "Retail", "Verified"],
    authorName: "Harbor Studio",
    publishedAt: "2026-04-06",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=800&fit=crop",
    extra: { founded: 2017, teamSize: 14, hours: "Mon-Fri, 10:00 AM - 6:30 PM", priceRange: "$$$" },
  },
  {
    title: "Atlas Auto Care",
    slug: "atlas-auto-care",
    summary: "Premium detailing, maintenance, and pickup-friendly service bays.",
    category: "Automotive",
    description:
      "A practical business listing for car owners who want quick service slots, clear estimates, and a professional waiting area.",
    body:
      "Atlas Auto Care offers detailing, inspections, and routine maintenance with digital invoices and pickup updates for busy owners.",
    location: "HSR Layout, Bengaluru",
    address: "210 Outer Ring Road, HSR Layout, Bengaluru 560102",
    website: "https://atlasautocare.example",
    phone: "+91 98765 43013",
    email: "service@atlasautocare.example",
    highlights: ["Detailing bay", "Pickup service", "Digital estimates", "Fleet support"],
    tags: ["Auto", "Service Center", "Verified"],
    authorName: "Atlas Service Desk",
    publishedAt: "2026-04-04",
    imageUrl: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200&h=800&fit=crop",
    extra: { founded: 2018, teamSize: 22, hours: "Daily, 8:30 AM - 8:00 PM", priceRange: "$$" },
  },
  {
    title: "Cove Coffee Roasters",
    slug: "cove-coffee-roasters",
    summary: "Small-batch coffee, brunch service, and a tidy retail counter.",
    category: "Food & Drink",
    description:
      "A neighborhood cafe listing with clear menu cues, location details, and enough trust information to help people decide quickly.",
    body:
      "Cove Coffee Roasters is designed for weekday breaks and weekend meetups with single-origin coffee, baked goods, and retail beans.",
    location: "Bellandur, Bengaluru",
    address: "8 Embassy Tech Village Road, Bellandur, Bengaluru 560103",
    website: "https://covecoffee.example",
    phone: "+91 98765 43014",
    email: "brew@covecoffee.example",
    highlights: ["Single-origin beans", "Breakfast menu", "Retail shelf", "Outdoor seating"],
    tags: ["Cafe", "Roastery", "Verified"],
    authorName: "Cove Hospitality",
    publishedAt: "2026-04-02",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=800&fit=crop",
    extra: { founded: 2020, teamSize: 9, hours: "Mon-Sun, 7:30 AM - 9:00 PM", priceRange: "$$" },
  },
];

const profileSamples: SamplePost[] = [
  {
    title: "Aarav Mehta",
    slug: "aarav-mehta",
    summary: "Founder profile with advisory services, product strategy, and startup support.",
    category: "Founder",
    description:
      "A profile that explains the person behind the brand, their specialties, and the kind of work they are known for.",
    body:
      "Aarav advises small teams on launch planning, positioning, and operational setup for service businesses and product-led brands.",
    location: "Bengaluru, India",
    website: "https://aaravmehta.example",
    email: "aarav@aaravmehta.example",
    highlights: ["Startup advisory", "Positioning workshops", "Launch planning", "Fractional strategy"],
    tags: ["Founder", "Consultant", "Verified"],
    authorName: "Aarav Mehta",
    publishedAt: "2026-04-09",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&h=800&fit=crop",
    extra: { founded: 2016, teamSize: 4, specialties: ["Brand strategy", "Launch ops", "Growth planning"] },
  },
  {
    title: "Mosaic Creative Group",
    slug: "mosaic-creative-group",
    summary: "Agency profile for brand systems, campaigns, and polished client delivery.",
    category: "Agency",
    description:
      "A structured brand profile for a creative team that wants a clearer public identity and a stronger credibility signal.",
    body:
      "Mosaic Creative Group produces brand systems, social campaigns, and landing pages for businesses that need cleaner presentation.",
    location: "Mumbai, India",
    website: "https://mosaiccreative.example",
    phone: "+91 98765 43021",
    email: "studio@mosaiccreative.example",
    highlights: ["Brand systems", "Campaign design", "Landing pages", "Monthly retainers"],
    tags: ["Agency", "Creative", "Verified"],
    authorName: "Mosaic Studio",
    publishedAt: "2026-04-07",
    imageUrl: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1200&h=800&fit=crop",
    extra: { founded: 2018, teamSize: 16, specialties: ["Identity design", "Content production", "Web launches"] },
  },
  {
    title: "Neha Iyer",
    slug: "neha-iyer",
    summary: "Profile for a growth marketer focused on local and service businesses.",
    category: "Consultant",
    description:
      "A personal profile that balances bio, services, and trust cues so clients can understand the person quickly.",
    body:
      "Neha helps service brands sharpen search visibility, improve lead quality, and package offers for easier conversion.",
    location: "Pune, India",
    website: "https://nehaiyer.example",
    email: "hi@nehaiyer.example",
    highlights: ["Local SEO", "Lead funnels", "Offer positioning", "Performance audits"],
    tags: ["Consultant", "SEO", "Verified"],
    authorName: "Neha Iyer",
    publishedAt: "2026-04-05",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&h=800&fit=crop",
    extra: { founded: 2019, specialties: ["SEO", "Funnels", "Audits"], teamSize: 1 },
  },
  {
    title: "Peak Motion Fitness",
    slug: "peak-motion-fitness",
    summary: "Trainer profile for premium fitness coaching and classes.",
    category: "Coach",
    description:
      "A business profile that highlights coaching style, schedule, and what members can expect before they sign up.",
    body:
      "Peak Motion Fitness works with busy professionals on personal training, mobility, and structured group classes.",
    location: "Hyderabad, India",
    website: "https://peakmotion.example",
    phone: "+91 98765 43022",
    highlights: ["Personal training", "Mobility plans", "Group classes", "Assessment calls"],
    tags: ["Fitness", "Coach", "Verified"],
    authorName: "Peak Motion",
    publishedAt: "2026-04-03",
    imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop",
    extra: { founded: 2020, teamSize: 6, specialties: ["Strength", "Mobility", "Nutrition support"] },
  },
  {
    title: "Northstar Legal",
    slug: "northstar-legal",
    summary: "Professional profile for a legal practice serving startups and SMBs.",
    category: "Professional Services",
    description:
      "A trust-oriented public profile with contact details, service highlights, and enough context for first-time visitors.",
    body:
      "Northstar Legal advises on registrations, agreements, compliance reviews, and contract support for growing businesses.",
    location: "Chennai, India",
    website: "https://northstarlegal.example",
    phone: "+91 98765 43023",
    email: "contact@northstarlegal.example",
    highlights: ["Company setup", "Contract review", "Compliance", "Startup support"],
    tags: ["Legal", "Advisory", "Verified"],
    authorName: "Northstar Team",
    publishedAt: "2026-04-01",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop",
    extra: { founded: 2015, teamSize: 10, specialties: ["Company law", "Contracts", "Compliance"] },
  },
];

const classifiedSamples: SamplePost[] = [
  {
    title: "Retail kiosk available near Forum Mall",
    slug: "retail-kiosk-for-lease-forum-mall",
    summary: "Compact storefront with strong footfall and flexible lease terms.",
    category: "Real Estate",
    description:
      "A short-term commercial listing for brands that want a visible sales point in a busy retail corridor.",
    body:
      "The kiosk is suited for accessories, gifting, or premium beverage brands and includes lighting, counter space, and mall access support.",
    location: "Koramangala, Bengaluru",
    website: "https://example.com/lease",
    phone: "+91 98765 43031",
    highlights: ["High footfall", "Flexible lease", "Power backup", "Mall management support"],
    tags: ["Retail", "Lease", "Negotiable"],
    authorName: "Lease Desk",
    publishedAt: "2026-04-11",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=800&fit=crop",
    extra: { price: 48000, currency: "INR", condition: "good", isNegotiable: true },
  },
  {
    title: "Hiring freelance SEO specialist",
    slug: "hiring-freelance-seo-specialist",
    summary: "Project-based SEO support for a small service brand.",
    category: "Jobs",
    description:
      "A practical job-style classified with scope, contact detail, and clear delivery expectations for quick applicants.",
    body:
      "Looking for a freelancer to improve local search visibility, optimize listings, and prepare monthly reporting.",
    location: "Remote / India",
    email: "jobs@upgreeno.example",
    highlights: ["Local SEO", "Reporting", "Listing cleanup", "Monthly retainer"],
    tags: ["Job", "SEO", "Remote"],
    authorName: "Growth Desk",
    publishedAt: "2026-04-09",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=800&fit=crop",
    extra: { price: 45000, currency: "INR", condition: "new", isNegotiable: false },
  },
  {
    title: "Studio display setup, like new",
    slug: "studio-display-setup-like-new",
    summary: "Professional monitor and desk setup from a design studio closure.",
    category: "Electronics",
    description:
      "A polished resale post for creators, studios, and office buyers who want a clean equipment listing with useful specifics.",
    body:
      "Includes a 27-inch display, articulated arm, and cable management accessories, all in excellent condition and ready for pickup.",
    location: "Bengaluru, India",
    phone: "+91 98765 43032",
    highlights: ["Original box", "Pickup only", "Excellent condition", "Accessories included"],
    tags: ["Electronics", "Resale", "Negotiable"],
    authorName: "Studio Admin",
    publishedAt: "2026-04-07",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=800&fit=crop",
    extra: { price: 32000, currency: "INR", condition: "like-new", isNegotiable: true },
  },
  {
    title: "Weekend pop-up stall for artisan brands",
    slug: "weekend-popup-stall-artisan-brands",
    summary: "Small event stall with short booking windows and strong visibility.",
    category: "Services",
    description:
      "A time-sensitive commercial notice for makers and small brands that need a short-run retail setup.",
    body:
      "The stall is suitable for handcrafted goods, home fragrance, gifting, and snack brands, with setup support provided by the venue.",
    location: "Indiranagar, Bengaluru",
    website: "https://example.com/pop-up",
    highlights: ["Prime weekend slot", "Setup support", "Power available", "Good walk-in traffic"],
    tags: ["Pop-up", "Retail", "Event"],
    authorName: "Event Desk",
    publishedAt: "2026-04-06",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&h=800&fit=crop",
    extra: { price: 12000, currency: "INR", condition: "good", isNegotiable: true },
  },
  {
    title: "Shared office desk near metro",
    slug: "shared-office-desk-near-metro",
    summary: "Flexible desk rental for solo founders and remote workers.",
    category: "Real Estate",
    description:
      "A compact workspace listing that includes transport access, flexible hours, and a no-fuss move-in setup.",
    body:
      "Ideal for solo founders or small teams that need a ready workspace without committing to a long lease.",
    location: "Malleswaram, Bengaluru",
    phone: "+91 98765 43033",
    email: "spaces@upgreeno.example",
    highlights: ["Metro access", "Monthly billing", "Meeting room access", "Quiet floor"],
    tags: ["Desk", "Workspace", "Negotiable"],
    authorName: "Space Desk",
    publishedAt: "2026-04-05",
    imageUrl: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1200&h=800&fit=crop",
    extra: { price: 9500, currency: "INR", condition: "good", isNegotiable: true },
  },
];

const genericTitles: Record<Exclude<TaskKey, "listing" | "profile" | "classified">, string[]> = {
  article: [
    "How Local Brands Win Search in 2026",
    "A Cleaner Way to Present Business Listings",
    "What Makes a Trustworthy Directory Page",
    "Content Systems for Multi-Location Brands",
    "Short Notes on Better Conversion Copy",
  ],
  image: [
    "Golden Hour Storefronts",
    "Studio Portrait Set",
    "Workspace Details",
    "Weekend Market Scenes",
    "Minimal Brand Spaces",
  ],
  pdf: [
    "Local SEO Playbook",
    "Marketplace UX Guide",
    "Lead Capture Checklist",
    "Brand Launch Brief",
    "Directory QA Notes",
  ],
  sbm: [
    "SEO Checklist 2026",
    "Directory Growth Tactics",
    "Review Request Templates",
    "Listing Audit Links",
    "Business Profile Resources",
  ],
  social: [
    "Community Launch Update",
    "Partnership Notes",
    "Weekly Growth Digest",
    "Feature Release Thread",
    "Creator Spotlight",
  ],
  org: [
    "Northwind Collective",
    "Brightline Media",
    "Atlas Labs",
    "Cobalt Studio",
    "Zenith Partners",
  ],
  comment: [
    "Reply: Better Business Profiles",
    "Commentary: Directory Trust",
    "Response: Listing Quality",
    "Thread: Search Improvements",
    "Hot Take: Cleaner Cards",
  ],
} as const;

const genericCategories: Record<Exclude<TaskKey, "listing" | "profile" | "classified">, string[]> = {
  article: ["Strategy", "SEO", "Product", "Growth", "Ops"],
  image: ["Lifestyle", "Travel", "Studio", "Urban", "Minimal"],
  pdf: ["Guides", "Playbooks", "Templates", "Reports", "Docs"],
  sbm: ["Bookmarks", "Tools", "Resources", "SEO", "Research"],
  social: ["Community", "News", "Updates", "Events", "Insights"],
  org: ["Agency", "Studio", "Collective", "Partner", "Network"],
  comment: ["Opinion", "Reply", "Discussion", "Feedback", "Debate"],
} as const;

const genericSummaries: Record<Exclude<TaskKey, "listing" | "profile" | "classified">, string> = {
  article: "Editorial insight with clearer structure and practical takeaways.",
  image: "Visual post with a stronger image-led presentation.",
  pdf: "Downloadable resource with document-style context.",
  sbm: "Curated bookmark entry with useful references.",
  social: "Community update with a cleaner activity snapshot.",
  org: "Organization profile with service and identity context.",
  comment: "Response post with context and perspective.",
};

const genericImages: Record<Exclude<TaskKey, "listing" | "profile" | "classified">, string[]> = {
  article: [
    "photo-1555066931-4365d14bab8c",
    "photo-1497366754035-f200968a6e72",
    "photo-1496171367470-9ed9a91ea931",
    "photo-1516321318423-f06f85e504b3",
    "photo-1504384308090-c894fdcc538d",
  ],
  image: [
    "photo-1500375592092-40eb2168fd21",
    "photo-1503023345310-bd7c1de61c7d",
    "photo-1524758631624-e2822e304c36",
    "photo-1516321497487-e288fb19713f",
    "photo-1495567720989-cebdbdd97913",
  ],
  pdf: [
    "photo-1455390582262-044cdead277a",
    "photo-1516321318423-f06f85e504b3",
    "photo-1489515217757-5fd1be406fef",
    "photo-1497366754035-f200968a6e72",
    "photo-1504384308090-c894fdcc538d",
  ],
  sbm: [
    "photo-1497366412874-3415097a27e7",
    "photo-1516321318423-f06f85e504b3",
    "photo-1498050108023-5d8b5f1a4b0f",
    "photo-1497366754035-f200968a6e72",
    "photo-1504384308090-c894fdcc538d",
  ],
  social: [
    "photo-1516321318423-f06f85e504b3",
    "photo-1497366412874-3415097a27e7",
    "photo-1504384308090-c894fdcc538d",
    "photo-1555066931-4365d14bab8c",
    "photo-1498050108023-5d8b5f1a4b0f",
  ],
  org: [
    "photo-1450101499163-c8848c66ca85",
    "photo-1497366754035-f200968a6e72",
    "photo-1504384308090-c894fdcc538d",
    "photo-1497366412874-3415097a27e7",
    "photo-1516321318423-f06f85e504b3",
  ],
  comment: [
    "photo-1497366754035-f200968a6e72",
    "photo-1498050108023-5d8b5f1a4b0f",
    "photo-1504384308090-c894fdcc538d",
    "photo-1516321318423-f06f85e504b3",
    "photo-1455390582262-044cdead277a",
  ],
};

const buildImage = (task: TaskKey, index: number) => {
  const imageId = genericImages[task as Exclude<TaskKey, "listing" | "profile" | "classified">]?.[index] || genericImages.article[index];
  return `https://images.unsplash.com/${imageId}?w=1200&h=800&fit=crop`;
};

const makeDetailedPost = (task: "listing" | "profile" | "classified", item: SamplePost, index: number): SitePost => ({
  id: `${task}-mock-${index + 1}`,
  title: item.title,
  slug: item.slug,
  summary: item.summary,
  content: {
    type: task,
    category: item.category,
    location: item.location,
    address: item.address,
    website: item.website,
    phone: item.phone,
    email: item.email,
    description: item.description,
    body: item.body,
    excerpt: item.summary,
    highlights: item.highlights || [],
    author: item.authorName,
    ...item.extra,
  },
  media: [{ url: item.imageUrl, type: "IMAGE" }],
  tags: item.tags,
  authorName: item.authorName,
  publishedAt: item.publishedAt,
});

const makeGenericPost = (task: Exclude<TaskKey, "listing" | "profile" | "classified">, index: number): SitePost => {
  const title = genericTitles[task][index];
  const category = genericCategories[task][index];
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    id: `${task}-mock-${index + 1}`,
    title,
    slug,
    summary: genericSummaries[task],
    content: {
      type: task,
      category,
      location: "Delhi",
      description: genericSummaries[task],
      body: `${title} gives the section a more realistic sample entry with clear context and useful cues.`,
      excerpt: genericSummaries[task],
      highlights: ["Sample content", "Clear category", "Better browsing"],
      author: "Site Master Pro",
    },
    media: [{ url: buildImage(task, index), type: "IMAGE" }],
    tags: [task, category],
    authorName: "Site Master Pro",
    publishedAt: `2026-04-${String(10 - index).padStart(2, "0")}`,
  };
};

export const getMockPostsForTask = (task: TaskKey): SitePost[] => {
  if (task === "listing") {
    return listingSamples.map((item, index) => makeDetailedPost("listing", item, index));
  }
  if (task === "profile") {
    return profileSamples.map((item, index) => makeDetailedPost("profile", item, index));
  }
  if (task === "classified") {
    return classifiedSamples.map((item, index) => makeDetailedPost("classified", item, index));
  }

  return Array.from({ length: 5 }).map((_, index) => makeGenericPost(task as Exclude<TaskKey, "listing" | "profile" | "classified">, index));
};
