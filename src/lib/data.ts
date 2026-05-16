export const serviceCategories = [
  {
    id: "education-skill-building",
    label: "Education + skill building",
    description: "Language classes, job skills, cultural orientation, and learning programs.",
  },
  {
    id: "safety-healthcare",
    label: "Safety & healthcare",
    description: "Hospitals, public health centers, emergency help, and safety support.",
  },
  {
    id: "sports-recreation",
    label: "Sports & recreation",
    description: "Gyms, swimming pools, parks, community activities, and wellbeing programs.",
  },
  {
    id: "citizenship",
    label: "Citizenship",
    description: "Immigration, residency, naturalization, and official procedures.",
  },
  {
    id: "finances-spending",
    label: "Finances & spending",
    description: "Banking, budgeting, telecom, public fees, and affordable local services.",
  },
  {
    id: "transport",
    label: "Transport",
    description: "Public transit, cards, discounts, directions, and mobility support.",
  },
  {
    id: "labour-employment",
    label: "Labour & employment",
    description: "Job centers, contracts, workplace rights, training, and employment counseling.",
  },
  {
    id: "legal",
    label: "Legal",
    description: "Legal aid, document help, rights information, and official counseling.",
  },
] as const;

export type ServiceCategory = (typeof serviceCategories)[number]["id"];

export const cities = ["서울시", "천안시", "부산시", "인천시", "수원시", "대전시"] as const;

export type City = (typeof cities)[number];

export type AgeGroup = "under-18" | "18-24" | "25-34" | "35-49" | "50-plus";
export type Gender = "female" | "male" | "non-binary" | "prefer-not-to-say";
export type ResidencyStatus =
  | "new-arrival"
  | "short-term"
  | "long-term"
  | "considering-immigration"
  | "permanent";
export type HousingStatus = "renting" | "owning" | "dormitory" | "with-family" | "looking";
export type MaritalStatus = "single" | "partnered" | "married" | "divorced" | "widowed";
export type EmploymentStatus =
  | "student"
  | "employed-full-time"
  | "employed-part-time"
  | "self-employed"
  | "job-seeking"
  | "homemaker"
  | "retired";
export type FamilyStatus =
  | "single-household"
  | "couple"
  | "with-children"
  | "multicultural-family"
  | "extended-family";
export type YesNoUnsure = "yes" | "no" | "unsure";

export type UserProfile = {
  city: City;
  preferredLanguage: string;
  nationality: string;
  gender: Gender;
  ageGroup: AgeGroup;
  residencyStatus: ResidencyStatus;
  housingStatus: HousingStatus;
  maritalStatus: MaritalStatus;
  employmentStatus: EmploymentStatus;
  familyStatus: FamilyStatus;
  hasVisa: YesNoUnsure;
  multiculturalFamily: YesNoUnsure;
  visaExpiryDate: string;
};

export type SupportProgram = {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  cities: Array<City | "all">;
  location: string;
  address: string;
  mapQuery: string;
  languages: string[];
  cost: "Free" | "Low cost" | "Paid";
  tags: string[];
  summary: string;
  description: string;
  requiredDocuments: string[];
  contact: string;
  officialUrl: string;
  updatedAt: string;
};

export type Checklist = {
  id: string;
  title: string;
  category: ServiceCategory;
  cities: Array<City | "all">;
  description: string;
  steps: string[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: ServiceCategory;
  cities: Array<City | "all">;
};

export type CommunityPost = {
  id: string;
  slug: string;
  title: string;
  author: string;
  city: City;
  category: ServiceCategory;
  excerpt: string;
  body: string;
  replies: Array<{
    author: string;
    body: string;
  }>;
  updatedAt: string;
};

export const supportPrograms: SupportProgram[] = [
  {
    id: "program-1",
    slug: "seoul-global-center-visa-help",
    title: "Seoul Global Center visa and life counseling",
    category: "citizenship",
    cities: ["서울시"],
    location: "서울시 종로구",
    address: "서울특별시 종로구 종로 38",
    mapQuery: "Seoul Global Center Jongno Seoul",
    languages: ["English", "Korean", "Chinese", "Vietnamese"],
    cost: "Free",
    tags: ["Visa", "Immigration", "Documents", "Counseling"],
    summary: "Free counseling for visa, residence, daily life, and public services in Seoul.",
    description:
      "Seoul Global Center provides multilingual counseling for foreigners living in Seoul. It is a good first stop when you are unsure which government office or document applies to your situation.",
    requiredDocuments: ["Passport", "Alien Registration Card", "Current visa information"],
    contact: "02-2075-4180",
    officialUrl: "https://global.seoul.go.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-2",
    slug: "mapo-public-health-center",
    title: "Mapo Public Health Center foreign resident services",
    category: "safety-healthcare",
    cities: ["서울시"],
    location: "서울시 마포구",
    address: "서울특별시 마포구 월드컵로 212",
    mapQuery: "Mapo Public Health Center Seoul",
    languages: ["Korean", "English"],
    cost: "Free",
    tags: ["Healthcare", "Vaccination", "Public health", "Clinic"],
    summary: "Local health services, vaccination guidance, and public health consultations.",
    description:
      "Public health centers can help with vaccinations, screenings, health education, and referrals. Availability varies by city, so check before visiting.",
    requiredDocuments: ["Alien Registration Card", "Health insurance card if available"],
    contact: "02-3153-9004",
    officialUrl: "https://www.mapo.go.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-3",
    slug: "yongsan-korean-language-class",
    title: "Yongsan Korean language and culture classes",
    category: "education-skill-building",
    cities: ["서울시"],
    location: "서울시 용산구",
    address: "서울특별시 용산구 녹사평대로 150",
    mapQuery: "Yongsan Korean language class Seoul",
    languages: ["Korean", "English"],
    cost: "Low cost",
    tags: ["Korean class", "Culture", "Beginner", "Community"],
    summary: "Beginner-friendly Korean language classes and cultural orientation programs.",
    description:
      "City and multicultural centers often run Korean classes for new residents. This program is useful for building daily life vocabulary and local confidence.",
    requiredDocuments: ["Application form", "Alien Registration Card"],
    contact: "02-2199-6114",
    officialUrl: "https://www.yongsan.go.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-4",
    slug: "seongdong-sports-center",
    title: "Seongdong public sports center membership",
    category: "sports-recreation",
    cities: ["서울시"],
    location: "서울시 성동구",
    address: "서울특별시 성동구 왕십리로 89",
    mapQuery: "Seongdong public sports center Seoul",
    languages: ["Korean"],
    cost: "Low cost",
    tags: ["Gym", "Swimming", "Recreation", "Wellbeing"],
    summary: "Affordable gym, swimming, and recreation programs operated by the city.",
    description:
      "Public sports centers are usually cheaper than private gyms and may offer swimming pools, fitness rooms, and community classes.",
    requiredDocuments: ["ID", "Local address information"],
    contact: "02-2204-7600",
    officialUrl: "https://www.sd.go.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-5",
    slug: "yeongdeungpo-job-plus-center",
    title: "Yeongdeungpo Job Plus Center employment support",
    category: "labour-employment",
    cities: ["서울시"],
    location: "서울시 영등포구",
    address: "서울특별시 영등포구 당산로 123",
    mapQuery: "Yeongdeungpo Job Plus Center Seoul",
    languages: ["Korean", "English"],
    cost: "Free",
    tags: ["Jobs", "Resume", "Labour", "Training"],
    summary: "Employment counseling, job search help, and vocational training information.",
    description:
      "Job centers can help residents understand local hiring processes, prepare applications, and find training programs. Visa eligibility should be verified separately.",
    requiredDocuments: ["Alien Registration Card", "Resume if available", "Visa type"],
    contact: "02-2670-1114",
    officialUrl: "https://www.ydp.go.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-6",
    slug: "gangnam-financial-counseling",
    title: "Gangnam household budget and banking guide",
    category: "finances-spending",
    cities: ["서울시"],
    location: "서울시 강남구",
    address: "서울특별시 강남구 학동로 426",
    mapQuery: "Gangnam financial counseling Seoul",
    languages: ["Korean", "English"],
    cost: "Free",
    tags: ["Banking", "Budget", "Telecom", "Spending"],
    summary: "Practical information about bank accounts, telecom plans, and local fees.",
    description:
      "This guide helps newcomers understand common spending categories in Korea, what documents banks may request, and where to ask for help.",
    requiredDocuments: ["Passport", "Alien Registration Card", "Korean phone number if available"],
    contact: "02-3423-5114",
    officialUrl: "https://www.gangnam.go.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-7",
    slug: "seoul-transport-card-guide",
    title: "Seoul public transport card guide",
    category: "transport",
    cities: ["서울시"],
    location: "서울시",
    address: "Seoul, South Korea",
    mapQuery: "Seoul public transport information center",
    languages: ["English", "Korean"],
    cost: "Free",
    tags: ["Subway", "Bus", "T-money", "Mobility"],
    summary: "How to use buses, subways, transfers, and rechargeable transport cards.",
    description:
      "A practical guide for setting up a transport card, understanding transfers, and finding route information in Seoul.",
    requiredDocuments: ["No documents needed for most transport cards"],
    contact: "120 Dasan Call Center",
    officialUrl: "https://english.seoul.go.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-8",
    slug: "free-legal-aid-for-foreigners",
    title: "Free legal aid for foreign residents",
    category: "legal",
    cities: ["all"],
    location: "전국",
    address: "Korea Legal Aid Corporation",
    mapQuery: "Korea Legal Aid Corporation",
    languages: ["Korean", "English"],
    cost: "Free",
    tags: ["Legal aid", "Contracts", "Rights", "Counseling"],
    summary: "Legal counseling for housing contracts, workplace issues, and daily disputes.",
    description:
      "Legal aid can help you understand your options before signing documents or when dealing with housing, employment, or consumer problems.",
    requiredDocuments: ["ID", "Relevant contract or message records", "Timeline of issue"],
    contact: "132 Legal Aid",
    officialUrl: "https://www.klac.or.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-9",
    slug: "cheonan-multicultural-family-center",
    title: "Cheonan Multicultural Family Support Center",
    category: "education-skill-building",
    cities: ["천안시"],
    location: "천안시",
    address: "충청남도 천안시 동남구 버들로 40",
    mapQuery: "Cheonan Multicultural Family Support Center",
    languages: ["Korean", "English", "Vietnamese"],
    cost: "Free",
    tags: ["Multicultural family", "Korean class", "Family support", "Counseling"],
    summary: "Family, language, and settlement support for multicultural families in Cheonan.",
    description:
      "Multicultural family centers can help with language education, family counseling, child support programs, and local settlement information.",
    requiredDocuments: ["ID", "Family relation documents if requested", "Local address information"],
    contact: "041-555-1114",
    officialUrl: "https://www.cheonan.go.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-10",
    slug: "cheonan-public-health-guide",
    title: "Cheonan public health and hospital guide",
    category: "safety-healthcare",
    cities: ["천안시"],
    location: "천안시",
    address: "충청남도 천안시 서북구 번영로 156",
    mapQuery: "Cheonan public health center",
    languages: ["Korean"],
    cost: "Free",
    tags: ["Healthcare", "Public health", "Hospital", "Safety"],
    summary: "A starting point for public health services and hospital navigation in Cheonan.",
    description:
      "Use the public health center to ask about local services, vaccinations, screenings, and referrals. Call ahead for language support.",
    requiredDocuments: ["Alien Registration Card", "Health insurance card if available"],
    contact: "041-521-2552",
    officialUrl: "https://www.cheonan.go.kr",
    updatedAt: "2026-05-16",
  },
];

export const checklists: Checklist[] = [
  {
    id: "checklist-visa-extension",
    title: "Before extending your stay",
    category: "citizenship",
    cities: ["all"],
    description: "Prepare documents and confirm which immigration office handles your city.",
    steps: [
      "Check your visa expiry date and appointment availability.",
      "Prepare passport, ARC, application form, housing proof, and fee.",
      "Verify requirements on HiKorea or with an immigration support center.",
      "Keep a photo or scan of every submitted document.",
    ],
  },
  {
    id: "checklist-healthcare",
    title: "When you need healthcare",
    category: "safety-healthcare",
    cities: ["all"],
    description: "Find appropriate care and avoid missing insurance or language support details.",
    steps: [
      "Confirm whether your case is emergency, clinic, hospital, or public health center level.",
      "Bring ARC, passport, and health insurance card if available.",
      "Ask whether English support or interpretation is available before visiting.",
      "For urgent symptoms, call emergency services instead of relying on online advice.",
    ],
  },
  {
    id: "checklist-bank-phone",
    title: "Opening banking and phone services",
    category: "finances-spending",
    cities: ["all"],
    description: "Common preparation for bank accounts, phone plans, and recurring payments.",
    steps: [
      "Bring passport, ARC, local address, and Korean phone number if you have one.",
      "Ask about transfer limits, fees, and online banking access.",
      "Compare prepaid and postpaid phone plans before signing.",
      "Keep copies of contracts and cancellation terms.",
    ],
  },
  {
    id: "checklist-work-contract",
    title: "Before signing a work contract",
    category: "labour-employment",
    cities: ["all"],
    description: "Check visa eligibility, pay, working hours, and basic labour rights.",
    steps: [
      "Confirm your visa allows the work type before accepting.",
      "Review pay date, working hours, overtime, insurance, and severance terms.",
      "Ask for a written contract in a language you understand if possible.",
      "Contact a labour counseling center if anything is unclear.",
    ],
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "Which city or local office should I visit?",
    answer:
      "Start with the city or local office where your registered address is located. For immigration matters, confirm the responsible immigration office on the official site before visiting.",
    category: "citizenship",
    cities: ["all"],
  },
  {
    id: "faq-2",
    question: "Can I get help if I do not speak Korean well?",
    answer:
      "Many public centers offer English or multilingual counseling, but availability changes. Call ahead or use a global center to confirm interpretation support.",
    category: "education-skill-building",
    cities: ["all"],
  },
  {
    id: "faq-3",
    question: "Where can I find affordable exercise facilities?",
    answer:
      "City-run sports centers are often cheaper than private gyms. Search by your city and check registration dates because popular classes fill quickly.",
    category: "sports-recreation",
    cities: ["서울시", "천안시"],
  },
  {
    id: "faq-4",
    question: "What should I do if I have a housing contract problem?",
    answer:
      "Collect the contract, payment records, chat messages, and timeline. Then contact a legal aid center or local counseling office before making major decisions.",
    category: "legal",
    cities: ["all"],
  },
];

export const communityPosts: CommunityPost[] = [
  {
    id: "post-1",
    slug: "mapo-health-center-first-visit",
    title: "First visit to Mapo Public Health Center",
    author: "Mina",
    city: "서울시",
    category: "safety-healthcare",
    excerpt: "Sharing what I brought and how I checked English support before visiting.",
    body:
      "I called before going and asked whether English support was available. They told me to bring my ARC and health insurance card. The visit was much easier after preparing the documents.",
    replies: [
      {
        author: "Jae",
        body: "Calling first helped me too. The available services can be different by city.",
      },
    ],
    updatedAt: "2026-05-16",
  },
  {
    id: "post-2",
    slug: "cheap-swimming-in-seongdong",
    title: "Affordable swimming class in Seongdong",
    author: "Alex",
    city: "서울시",
    category: "sports-recreation",
    excerpt: "The public sports center was much cheaper than private gyms.",
    body:
      "Registration opened early in the morning and popular classes filled fast. The website was Korean-only, but the front desk helped me confirm the schedule.",
    replies: [
      {
        author: "Lina",
        body: "Try checking nearby city facilities too if your preferred time is full.",
      },
    ],
    updatedAt: "2026-05-15",
  },
  {
    id: "post-3",
    slug: "visa-extension-documents",
    title: "Documents I prepared for visa extension",
    author: "Sam",
    city: "서울시",
    category: "citizenship",
    excerpt: "My checklist before visiting immigration for an extension.",
    body:
      "I prepared my passport, ARC, application form, housing contract, and fee. Requirements can change by visa type, so I checked HiKorea and asked Seoul Global Center.",
    replies: [
      {
        author: "Nari team",
        body: "Good reminder: always verify with official sources for visa matters.",
      },
    ],
    updatedAt: "2026-05-14",
  },
  {
    id: "post-4",
    slug: "cheonan-family-center-korean-class",
    title: "Cheonan family center Korean class registration",
    author: "Nora",
    city: "천안시",
    category: "education-skill-building",
    excerpt: "I found a beginner Korean class through the multicultural family center.",
    body:
      "The center asked about my local address and family situation. It was helpful to call first because class levels and registration periods change.",
    replies: [
      {
        author: "Dani",
        body: "They also had family counseling programs when I checked last month.",
      },
    ],
    updatedAt: "2026-05-16",
  },
];

export function getCategoryLabel(category: ServiceCategory) {
  return serviceCategories.find((item) => item.id === category)?.label ?? category;
}

export function matchesCity(itemCities: Array<City | "all">, selectedCity?: string) {
  return !selectedCity || itemCities.includes("all") || itemCities.includes(selectedCity as City);
}

type CategoryScoreEntry = {
  category: ServiceCategory;
  score: number;
  reasons: string[];
};

function daysUntil(dateString: string) {
  if (!dateString) {
    return Number.POSITIVE_INFINITY;
  }

  const target = new Date(dateString).getTime();

  if (Number.isNaN(target)) {
    return Number.POSITIVE_INFINITY;
  }

  const diff = target - Date.now();

  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function scoreCategoriesForProfile(profile: UserProfile): CategoryScoreEntry[] {
  const scores: Record<ServiceCategory, CategoryScoreEntry> = {
    "education-skill-building": {
      category: "education-skill-building",
      score: 1,
      reasons: ["Useful for everyone settling in"],
    },
    "safety-healthcare": {
      category: "safety-healthcare",
      score: 1,
      reasons: ["Healthcare basics matter for every resident"],
    },
    "sports-recreation": {
      category: "sports-recreation",
      score: 1,
      reasons: ["Local recreation supports daily wellbeing"],
    },
    citizenship: {
      category: "citizenship",
      score: 1,
      reasons: ["Immigration and residency basics"],
    },
    "finances-spending": {
      category: "finances-spending",
      score: 1,
      reasons: ["Banking, fees, and daily spending"],
    },
    transport: {
      category: "transport",
      score: 1,
      reasons: ["Getting around your city"],
    },
    "labour-employment": {
      category: "labour-employment",
      score: 1,
      reasons: ["Work, hiring, and labour rights"],
    },
    legal: {
      category: "legal",
      score: 1,
      reasons: ["Basic legal awareness"],
    },
  };

  function bump(category: ServiceCategory, amount: number, reason: string) {
    scores[category].score += amount;
    scores[category].reasons.push(reason);
  }

  if (profile.hasVisa === "no" || profile.hasVisa === "unsure") {
    bump("citizenship", 3, "Visa status is not confirmed");
    bump("legal", 1, "Legal aid can help unclear visa cases");
  }

  if (profile.hasVisa === "yes") {
    bump("citizenship", 1, "Keep visa documents up to date");
  }

  const remainingDays = daysUntil(profile.visaExpiryDate);

  if (remainingDays <= 90) {
    bump("citizenship", 3, "Visa expiry is within 90 days");
    bump("legal", 1, "Legal preparation before expiry");
  } else if (remainingDays <= 180) {
    bump("citizenship", 2, "Visa expiry is within 6 months");
  }

  if (profile.residencyStatus === "new-arrival") {
    bump("education-skill-building", 2, "New arrivals benefit from orientation");
    bump("transport", 2, "Learning local transport early");
    bump("finances-spending", 2, "Setting up bank, phone, and utilities");
    bump("safety-healthcare", 1, "Knowing local healthcare basics");
  }

  if (profile.residencyStatus === "considering-immigration") {
    bump("citizenship", 2, "Considering long-term immigration");
    bump("legal", 2, "Legal context for immigration decisions");
  }

  if (profile.residencyStatus === "long-term" || profile.residencyStatus === "permanent") {
    bump("finances-spending", 1, "Long-term financial planning");
    bump("legal", 1, "Long-term residents face more legal needs");
  }

  if (profile.multiculturalFamily === "yes" || profile.familyStatus === "multicultural-family") {
    bump("education-skill-building", 2, "Multicultural family education programs");
    bump("safety-healthcare", 1, "Family healthcare support");
    bump("legal", 1, "Family-related legal support");
  }

  if (profile.familyStatus === "with-children" || profile.familyStatus === "extended-family") {
    bump("education-skill-building", 2, "Children and family education");
    bump("safety-healthcare", 2, "Family healthcare needs");
    bump("sports-recreation", 1, "Family-friendly recreation");
  }

  if (profile.maritalStatus === "married" || profile.maritalStatus === "partnered") {
    bump("legal", 1, "Marriage and partnership documents");
    bump("citizenship", 1, "Family-based residency considerations");
  }

  if (
    profile.employmentStatus === "job-seeking" ||
    profile.employmentStatus === "employed-part-time"
  ) {
    bump("labour-employment", 3, "Active job-seeking or part-time work");
    bump("finances-spending", 1, "Income variability and budgeting");
    bump("legal", 1, "Workplace rights awareness");
  }

  if (
    profile.employmentStatus === "employed-full-time" ||
    profile.employmentStatus === "self-employed"
  ) {
    bump("labour-employment", 2, "Active employment context");
    bump("finances-spending", 1, "Tax and benefits planning");
  }

  if (profile.employmentStatus === "student") {
    bump("education-skill-building", 3, "Active student status");
    bump("transport", 1, "Daily commute support");
    bump("finances-spending", 1, "Student budgeting");
  }

  if (profile.employmentStatus === "homemaker" || profile.employmentStatus === "retired") {
    bump("safety-healthcare", 2, "Healthcare focus for current life stage");
    bump("sports-recreation", 1, "Wellbeing programs");
  }

  if (profile.housingStatus === "looking" || profile.housingStatus === "renting") {
    bump("legal", 2, "Housing contracts and tenant rights");
    bump("finances-spending", 1, "Housing costs and deposits");
  }

  if (profile.housingStatus === "dormitory" || profile.housingStatus === "with-family") {
    bump("safety-healthcare", 1, "Shared-living health considerations");
  }

  if (profile.ageGroup === "under-18" || profile.ageGroup === "18-24") {
    bump("education-skill-building", 2, "Younger learners benefit most");
    bump("sports-recreation", 1, "Active life-stage recreation");
  }

  if (profile.ageGroup === "50-plus") {
    bump("safety-healthcare", 2, "Health priorities later in life");
    bump("finances-spending", 1, "Retirement and benefits planning");
  }

  return Object.values(scores).sort((a, b) => b.score - a.score);
}

export function recommendedCategoryIds(profile: UserProfile, count = 3): ServiceCategory[] {
  return scoreCategoriesForProfile(profile)
    .slice(0, count)
    .map((entry) => entry.category);
}
