import type {
  AgeGroup,
  City,
  DegreeLevel,
  EmploymentStatus,
  FamilyStatus,
  Gender,
  HousingStatus,
  KiipStage,
  MaritalStatus,
  ResidencyStatus,
  ServiceCategory,
  SeoulDistrict,
  TopikLevel,
  VisaSubtype,
  YesNoUnsure,
} from "@/lib/data";

export const supportedLocales = ["en", "ko", "zh"] as const;
export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (supportedLocales as readonly string[]).includes(value)
  );
}

export const localeLabels: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  zh: "中文",
};

export const localeShortLabels: Record<Locale, string> = {
  en: "EN",
  ko: "KO",
  zh: "ZH",
};

export const aiResponseLanguageInstruction: Record<Locale, string> = {
  en: "Always respond in English (en).",
  ko: "사용자에게 항상 한국어로 답변하세요. (ko)",
  zh: "请始终用简体中文回复用户。(zh-CN)",
};

const en = {
  // header
  "header.brand.subtitle": "Your local guide",
  "header.nav.discover": "Discover",
  "header.nav.visa": "Visa Horizon",
  "header.nav.health": "Health & Recreation",
  "header.nav.checklists": "Checklists",
  "header.nav.faq": "FAQ",
  "header.nav.community": "Community",
  "header.nav.chat": "AI Chat",
  "header.cta.setProfile": "Set profile",
  "header.cta.myPage": "My page",
  "header.language.label": "Language",

  // seo
  "seo.title": "nabi: for foreigners in korea",
  "seo.description":
    "nabi helps foreign residents in Korea navigate visas, local services, healthcare, recreation, community information, and practical daily-life support.",

  // common
  "common.notProvided": "Not provided",
  "common.update": "Update",
  "common.back": "Back",
  "common.loading": "Loading...",
  "common.asking": "Asking...",
  "common.askNari": "Ask nabi",
  "common.answer": "Answer",
  "common.results": "{count} results for {city}",

  // home hero
  "home.heroBadge": "For foreigners building a life in Korea",
  "home.heroTitle": "Find the right help before life gets confusing.",
  "home.heroSubtitle":
    "nabi helps foreigners in Korea find government support, healthcare, housing, education, and visa procedures matched to their situation and city.",
  "home.heroPrimaryCta": "Start finding support",
  "home.heroSecondaryCta": "Ask AI guide",

  // home services section
  "home.servicesEyebrow": "Filtered directory",
  "home.servicesTitle": "Find the help you need by situation",
  "home.servicesSubtitle":
    "Built around a Supabase-backed directory of agencies, programs, regions, languages, costs, and eligibility — searchable through custom filters.",
  "home.service.government.title": "Government help",
  "home.service.government.label": "Public support",
  "home.service.government.desc":
    "Find community service centers, multicultural family centers, interpretation help, and emergency welfare support near you.",
  "home.service.health.title": "Health & wellness",
  "home.service.health.label": "Medical",
  "home.service.health.desc":
    "Hospitals that serve foreigners, public health centers, insurance guidance, plus pools and gyms for daily wellbeing.",
  "home.service.housing.title": "Housing & documents",
  "home.service.housing.label": "Housing",
  "home.service.housing.desc":
    "Step-by-step help with leases, residency registration, visa extensions, required documents, and where to file them.",
  "home.service.language.title": "Language & culture",
  "home.service.language.label": "Education",
  "home.service.language.desc":
    "Korean language classes, cultural orientation, community events, and free local programs by neighborhood.",

  "home.faqs.0":
    "Where can foreigners in Seoul get free counseling support?",
  "home.faqs.1": "What documents should I prepare before extending my stay?",
  "home.faqs.2":
    "Are there hospitals I can visit if I do not have Korean health insurance?",

  "home.communityEyebrow": "Community",
  "home.communityTitle": "Ask people nearby",
  "home.communityDescription":
    "A space where foreigners in the same city share hospital experiences, public office tips, recommended Korean classes, and immigration know-how.",
  "home.faqEyebrow": "FAQ",
  "home.faqDescription":
    "We can expand this flow to combine official agency answers with community insights based on your city, visa status, language, and insurance.",
  "home.aiEyebrow": "AI concierge",
  "home.aiTitle": "Ask in your own words",
  "home.aiDescription":
    "A ChatGPT-powered route is ready, so questions like \"I live in Seoul and need a visa extension\" can be answered with checklists and the right offices.",

  // home visa alert
  "home.visaAlert.eyebrow": "Visa Status Update",
  "home.visaAlert.body":
    "Your current residence permit expires in {days} days. Based on your updated profile, you may be eligible for long-term options such as F-2-7—review renewal and horizon steps.",
  "home.visaAlert.bodyFallback":
    "Add your visa expiry date in onboarding to see a live countdown and tailored renewal guidance.",
  "home.visaAlert.cta": "Open mock lock screen",

  // home life-in-korea moments
  "home.life.0.eyebrow": "Settle in",
  "home.life.0.caption": "Make Korea feel like home.",
  "home.life.0.alt": "Friends taking a photo at Gwanghwamun",
  "home.life.1.eyebrow": "Work & grow",
  "home.life.1.caption": "Build your career, your way.",
  "home.life.1.alt": "Young professionals walking in Gangnam",
  "home.life.2.eyebrow": "Learn",
  "home.life.2.caption": "Pick up the language at your pace.",
  "home.life.2.alt": "Students studying together at a Korean language institute",

  // home explorer section
  "home.explorerEyebrow": "Try it now",
  "home.explorerTitle": "Filter programs to fit your moment.",
  "home.explorerDescription":
    "Pick the tags that match where you are — and see real programs available near you.",

  // home health & recreation
  "home.health.eyebrow": "Health & Recreation",
  "home.health.title":
    "Compare public gyms, pools, and first-visit rules near your district.",
  "home.health.description":
    "See ARC requirements, resident pricing, local-card payment notes, indoor-shoe rules, and a Korean desk prompt before you visit.",
  "home.health.cta": "Explore facilities",

  // visa page
  "visa.eyebrow": "Visa Horizon",
  "visa.title": "Renew today, plan your next status.",
  "visa.subtitle":
    "A dual-track view for immediate renewal prep and long-term F-2-7 readiness.",
  "visa.replayNotification": "Replay notification",
  "visa.quickEdit.eyebrow": "Your profile",
  "visa.quickEdit.title": "Visa type & expiry",
  "visa.quickEdit.description":
    "Same fields as onboarding. Your visa type feeds the dashboard copy; the expiry date drives home alerts and the renewal day count.",
  "visa.quickEdit.save": "Save",
  "visa.quickEdit.saved": "Saved. Reload the home page or notification mock to see updated copy.",
  "visa.quickEdit.fullProfile": "Open full onboarding for city, TOPIK, and district →",
  "visa.edit.back": "Back to Discover (Visa tab)",
  "visa.edit.open": "Update visa details",
  "visa.profileSummary.title": "Saved visa details",
  "visa.profileSummary.description":
    "Review what nabi uses for renewal countdowns and visa dashboard copy. Edit on the next screen.",
  "visa.horizonTrack": "Horizon track",
  "visa.fromTo": "{current} to {target}",
  "visa.horizonDescription":
    "Your mock F-2-7 score is close. These options show practical ways to close the remaining point gap.",
  "visa.daysUntilCheckpoint": "{days} days until renewal checkpoint",
  "visa.estimatedUnlock": "Estimated unlock",
  "visa.daysShort": "{days} days",
  "visa.ofPoints": "of {target} pts",
  "visa.bridgeHeadline":
    "Horizon view: you need {points} more points in the next {days} days—if you earn them, you can unlock full F-2-7 eligibility on your current academic track.",
  "visa.renewal.eyebrow": "Renewal track",
  "visa.renewal.title": "Keep your {current} status ready before the deadline.",
  "visa.renewal.description":
    "nabi turns your stored visa, district, and education profile into a practical immigration visit checklist.",
  "visa.renewal.primaryCta": "Renew current visa status",
  "visa.renewal.steps.0":
    "Reserve a HiKorea visit before the renewal window fills.",
  "visa.renewal.steps.1":
    "Prepare passport, ARC, application form, housing proof, and fee.",
  "visa.renewal.steps.2":
    "Bring enrollment or employment proof that matches your current visa.",
  "visa.clock.label": "Your visa clock",
  "visa.clock.daysLeft": "{days} days left",
  "visa.clock.expiryNotSet": "Expiry date not set",
  "visa.clock.checkExpiry": "Check expiry date",
  "visa.clock.expiry": "Expiry",
  "visa.clock.notProvided": "Not provided",
  "visa.clock.district": "District",
  "visa.clock.notSelected": "Not selected",
  "visa.clock.profileBasis": "Profile basis",

  // visa strategy options
  "visa.strategy.points": "+{points} pts",
  "visa.strategy.status.available": "available",
  "visa.strategy.status.earned": "earned",
  "visa.strategy.status.locked": "locked",
  "visa.strategy.nextIntake": "Next intake: {date}",
  "visa.strategy.openResource": "Open resource",

  // visa notification page
  "visa.notification.label": "Notification",
  "visa.notification.tapHint": "Tap to unlock your visa horizon",
  "visa.notification.dateLabel": "Saturday, May 16",
  "visa.notification.brand": "nabi Visa Horizon",
  "visa.notification.title": "Visa renewal window opens soon",
  "visa.notification.body":
    "Visa status update: your current residence permit expires in {days} days. Review your renewal checklist and long-term residency track.",
  "visa.notification.bodyFallback":
    "Visa status update: add your expiry date to your profile to unlock the personalized countdown and next steps.",
  "visa.notification.timestamp": "now",

  // biometric
  "visa.biometric.brand": "nabi secure pass",
  "visa.biometric.status": "Confirming identity",
  "visa.biometric.note":
    "Unlocking your visa dashboard with stored profile context.",

  // health page
  "health.eyebrow": "Health & Recreation",
  "health.title": "Find public gyms and pools that are easier to join.",
  "health.subtitle":
    "Compare local facilities by sports, open hours, monthly public pricing, and the practical desk requirements foreigners need on the first visit.",

  "health.openNow": "Open now",
  "health.closed": "Closed",
  "health.closedNow": "Closed now",
  "health.monthlyRate": "Monthly public rate",
  "health.residentDiscount": "Resident discount: ARC required",

  "health.map.eyebrow": "Neighbourhood map",
  "health.map.title": "Facilities across your area",
  "health.map.subtitle":
    "Numbered links open directions. With NEXT_PUBLIC_GOOGLE_MAPS_API_KEY we first load an interactive map (enable Maps JavaScript API + billing). If that fails we try a Static Map image (Maps Static API), then OpenStreetMap.",
  "health.map.alt": "Map preview of recreation facilities around Seoul",
  "health.map.aria": "Map of recreation facilities",
  "health.map.iframeTitle": "OpenStreetMap preview of Seoul recreation facilities",
  "health.map.staticMapFallbackNote":
    "Google map image failed to load. In Google Cloud Console, enable “Maps Static API” for this API key (JavaScript API alone is not enough), ensure billing is on, and that HTTP referrer restrictions allow localhost. Showing OpenStreetMap instead.",
  "health.map.jsFallbackNote":
    "Interactive Google map did not load. Check that Maps JavaScript API is enabled for this key, billing is active, and referrer restrictions allow your site. Trying a static map image next.",

  "health.facility.scale.municipal": "Municipal hub",
  "health.facility.scale.boutique": "Boutique / neighborhood",

  "health.list.eyebrow": "Closest to your district",
  "health.list.sortedFrom": "Sorted from {district}",
  "health.list.updateDistrict": "Update district",
  "health.list.distance": "{km} km",

  // facility detail
  "health.detail.back": "Back to Health & Recreation",
  "health.detail.intro":
    "Public sports center options for lap swimming, general weight lifting, and indoor fitness with resident pricing around ₩40,000-₩50,000 per month.",
  "health.detail.sports": "Sports available",
  "health.detail.pricing": "Monthly pricing",
  "health.detail.showKoreanReception": "Show Korean to receptionist",
  "health.detail.saveFacility": "Save to my profile",
  "health.detail.savedFacility": "Saved to profile",

  "health.indoorShoe.eyebrow": "Indoor-shoe rule",
  "health.indoorShoe.title": "Street shoes stay off the gym floor",
  "health.indoorShoe.body":
    "Pack a separate, clean pair of training sneakers and change in the locker room. Street shoes are usually not allowed on workout surfaces.",

  // sports
  "health.sport.swimming": "Lap swimming",
  "health.sport.weights": "General weight lifting",
  "health.sport.yoga": "Yoga",
  "health.sport.fitness": "Indoor fitness",
  "health.sport.court": "Court sports",

  // join requirements
  "health.requirements.eyebrow": "Join requirements",
  "health.requirements.title": "Bring these before you queue",
  "health.requirements.arc": "ARC required:",
  "health.requirements.arcDesc":
    "Show your Alien Registration Card for local residency discounts.",
  "health.requirements.payment": "Payment:",
  "health.requirements.paymentSuffix":
    "Public centers may prefer a Korean-issued card at the desk.",
  "health.requirements.indoorShoes": "Indoor shoes:",
  "health.requirements.indoorShoesYes":
    "Bring clean indoor-only shoes for the gym floor.",
  "health.requirements.indoorShoesNo":
    "Ask the desk whether separate indoor shoes are required.",
  "health.payment.cash": "Cash",
  "health.payment.foreign": "Foreign card",
  "health.payment.local": "Local Korean card",

  // first visit onboarding
  "health.firstVisit.eyebrow": "First visit onboarding",
  "health.firstVisit.title": "A desk script for joining",
  "health.firstVisit.steps.0":
    "1. Arrive during desk hours and take a queue ticket if available.",
  "health.firstVisit.steps.1":
    "2. Show your ARC and ask for the local resident discount before paying.",
  "health.firstVisit.steps.2":
    "3. Confirm the swim lane or gym time block, then ask where to store indoor shoes.",
  "health.firstVisit.openModal": "Open Korean receptionist text",
  "health.firstVisit.modalEyebrow": "Reception desk",
  "health.firstVisit.modalTitle": "Show this sentence",
  "health.firstVisit.close": "Close",

  // korean shield
  "health.shield.label": "Show this exact Korean",
  "health.shield.note":
    "Keep this sentence in Korean so a receptionist can read it directly.",
  "health.shield.copy": "Copy Korean text",

  // info explorer
  "explorer.title": "Personalized search",
  "explorer.cityChip": "Seoul",
  "explorer.programs.0.title": "Seoul Global Center",
  "explorer.programs.0.category": "Government help",
  "explorer.programs.0.desc":
    "Daily-life counseling for foreigners, basic visa guidance, government procedures, and interpreter referrals.",
  "explorer.programs.1.title": "Public Health Center",
  "explorer.programs.1.category": "Health & wellness",
  "explorer.programs.1.desc":
    "Vaccinations, health screenings, and public health consultations available at the local public health center.",
  "explorer.programs.2.title": "Housing Contract Checklist",
  "explorer.programs.2.category": "Housing & documents",
  "explorer.programs.2.desc":
    "What to check before signing a monthly lease, residency registration, certified date, and how to protect your deposit.",
  "explorer.programs.3.title": "Korean Language Class Finder",
  "explorer.programs.3.category": "Language & culture",
  "explorer.programs.3.desc":
    "Find free or low-cost Korean classes run by multicultural centers and district offices.",
  "explorer.empty":
    "No matching examples for these filters. Try fewer filters or check back when more Supabase data is added.",

  // ai chat preview (home)
  "chatPreview.label": "nabi AI",
  "chatPreview.defaultMessage":
    "I live in Seoul and need help with healthcare and visa renewal.",
  "chatPreview.defaultReply":
    "I can help you prepare a visit checklist, find nearby public offices, compare free support programs, and explain what to verify with official institutions.",
  "chatPreview.button": "Ask nabi",

  // onboarding page
  "onboarding.eyebrow": "Personal setup",
  "onboarding.title": "Tell nabi where you are and what you need.",
  "onboarding.subtitle":
    "The city, visa status, multicultural family info, age group, and visa expiry you share are used as context for search, checklists, community, and AI answers.",

  // onboarding form
  "onboarding.cityTitle": "Which city are you in?",
  "onboarding.cityDescription":
    "We use your city to surface nearby public offices, healthcare, education, and community info first.",
  "onboarding.cityUseLocation": "Use my current location",
  "onboarding.locationStatus.initial":
    "Choose your city manually, or use your current location to estimate it.",
  "onboarding.locationStatus.updated":
    "Recommendations are now based on {city}.",
  "onboarding.locationStatus.checking": "Checking your current location...",
  "onboarding.locationStatus.inferred":
    "We estimated {city} from your location. You can pick another city manually if needed.",
  "onboarding.locationStatus.unsupported":
    "This browser does not support location detection.",
  "onboarding.locationStatus.denied":
    "Could not access location. Please pick a city manually.",
  "onboarding.selectedCityLabel": "Selected city",
  "onboarding.selectedCityNote":
    "Location permission is only used to estimate your city. We do not store coordinates and only filter info by the chosen city.",

  "onboarding.aboutTitle": "About you",
  "onboarding.aboutDescription":
    "This information is only used to decide which categories (immigration, healthcare, labour, education, etc.) to prioritize for you.",
  "onboarding.educationTitle": "Education & visa progress",
  "onboarding.educationDescription":
    "These details power the F-2-7 horizon tracker and nearby language or milestone recommendations.",
  "onboarding.field.preferredLanguage": "Preferred language",
  "onboarding.field.nationality": "Nationality",
  "onboarding.field.nationalityPlaceholder": "e.g. Vietnam, USA",
  "onboarding.field.ageGroup": "Age group",
  "onboarding.field.gender": "Gender",
  "onboarding.field.residency": "Residency status",
  "onboarding.field.housing": "Housing",
  "onboarding.field.maritalStatus": "Marital status",
  "onboarding.field.employment": "Employment",
  "onboarding.field.family": "Family",
  "onboarding.field.hasVisa": "Do you currently have a visa?",
  "onboarding.field.multicultural": "Multicultural family?",
  "onboarding.field.visaExpiry": "Visa expiry date",
  "onboarding.field.visaExpiryNote":
    "Leave blank if you have no visa or are not sure.",
  "onboarding.field.degreeLevel": "Degree level",
  "onboarding.field.topikLevel": "TOPIK level",
  "onboarding.field.kiipStage": "KIIP stage",
  "onboarding.field.currentVisaSubtype": "Current visa type",
  "onboarding.field.district": "Seoul district",
  "onboarding.submit": "Save and find recommendations",

  // onboarding option labels
  "option.age.under-18": "Under 18",
  "option.age.18-24": "18-24",
  "option.age.25-34": "25-34",
  "option.age.35-49": "35-49",
  "option.age.50-plus": "50+",
  "option.gender.female": "Female",
  "option.gender.male": "Male",
  "option.gender.non-binary": "Non-binary",
  "option.gender.prefer-not-to-say": "Prefer not to say",
  "option.residency.new-arrival": "New arrival",
  "option.residency.short-term": "Short-term",
  "option.residency.long-term": "Long-term",
  "option.residency.permanent": "Permanent resident",
  "option.residency.considering-immigration": "Considering immigration",
  "option.housing.renting": "Renting",
  "option.housing.owning": "Owning",
  "option.housing.dormitory": "Dormitory",
  "option.housing.with-family": "With family",
  "option.housing.looking": "Looking for housing",
  "option.marital.single": "Single",
  "option.marital.partnered": "Partnered",
  "option.marital.married": "Married",
  "option.marital.divorced": "Divorced",
  "option.marital.widowed": "Widowed",
  "option.employment.student": "Student",
  "option.employment.employed-full-time": "Full-time employed",
  "option.employment.employed-part-time": "Part-time employed",
  "option.employment.self-employed": "Self-employed",
  "option.employment.job-seeking": "Job-seeking",
  "option.employment.homemaker": "Homemaker",
  "option.employment.retired": "Retired",
  "option.family.single-household": "Single household",
  "option.family.couple": "Couple",
  "option.family.with-children": "With children",
  "option.family.multicultural-family": "Multicultural family",
  "option.family.extended-family": "Extended family",
  "option.yesNo.yes": "Yes",
  "option.yesNo.no": "No",
  "option.yesNo.unsure": "Not sure",
  "option.degree.none": "No degree",
  "option.degree.high-school": "High school",
  "option.degree.bachelor": "Bachelor's",
  "option.degree.master": "Master's",
  "option.degree.phd": "PhD",
  "option.topik.none": "No TOPIK",
  "option.topik.1": "TOPIK Level 1",
  "option.topik.2": "TOPIK Level 2",
  "option.topik.3": "TOPIK Level 3",
  "option.topik.4": "TOPIK Level 4",
  "option.topik.5": "TOPIK Level 5",
  "option.topik.6": "TOPIK Level 6",
  "option.kiip.none": "No KIIP",
  "option.kiip.0": "KIIP Stage 0",
  "option.kiip.1": "KIIP Stage 1",
  "option.kiip.2": "KIIP Stage 2",
  "option.kiip.3": "KIIP Stage 3",
  "option.kiip.4": "KIIP Stage 4",
  "option.kiip.5": "KIIP Stage 5",
  "option.visaSubtype.D-2": "D-2 Student",
  "option.visaSubtype.D-10": "D-10 Job seeker",
  "option.visaSubtype.E-7": "E-7 Professional",
  "option.visaSubtype.F-2-7": "F-2-7 Excellence Talent",
  "option.visaSubtype.F-5": "F-5 Permanent resident",
  "option.visaSubtype.other": "Other",
  "option.visaSubtype.unsure": "Not sure",
  "option.district.": "Not selected",
  "option.district.마포구": "Mapo-gu",
  "option.district.성동구": "Seongdong-gu",
  "option.district.강남구": "Gangnam-gu",
  "option.district.종로구": "Jongno-gu",
  "option.district.용산구": "Yongsan-gu",
  "option.district.기타": "Other Seoul district",

  // discover page
  "discover.eyebrow": "Discover support",
  "discover.title": "Find public help and local services near you.",
  "discover.subtitle":
    "Filter government help, healthcare, education, transport, legal, and labour info by district and the categories that matter most to you.",
  "discover.filtersLabel": "Filters",
  "discover.cityFieldLabel": "City",
  "discover.categoriesFieldLabel": "Categories",
  "discover.categoriesFieldDescription":
    "Recommended categories are marked with a star.",
  "discover.recommendedBadge": "For you",
  "discover.recommendedTitle": "Recommended for your profile",
  "discover.updateProfile": "Update profile",
  "discover.recommendedDescription":
    "These categories are recommended based on your visa, family, residency, employment, and age profile.",
  "discover.whyTheseCategories": "Why these categories?",
  "discover.noMatchingTitle": "No matching programs yet",
  "discover.noMatchingHint":
    "Try fewer categories or update your city profile. More local services can be added through Supabase later.",

  // discover tabs
  "discover.tabs.aria": "Discover sections",
  "discover.tabs.support": "Support",
  "discover.tabs.visa": "Visa",
  "discover.tabs.health": "Health",
  "discover.tabs.checklists": "Checklists",
  "discover.tabs.naturalization": "Naturalization",

  // discover detail
  "discover.detail.back": "Back to discover",
  "discover.detail.whatToBring": "What to bring",
  "discover.detail.details": "Details",
  "discover.detail.languages": "Languages",
  "discover.detail.contact": "Contact",
  "discover.detail.updated": "Updated",
  "discover.detail.beforeYouGo": "Before you go",
  "discover.detail.beforeYouGoDescription":
    "Legal, visa, medical, and emergency matters can change by personal situation. Always verify requirements with the official institution before visiting.",
  "discover.detail.openOfficial": "Open official site",

  // google map card
  "googleMap.locationLabel": "Location",
  "googleMap.note":
    "We don't embed the map directly — only a quick link for confirming the location. Use Google Maps for full directions and nearby information.",
  "googleMap.openMaps": "Open in Google Maps",

  // checklists
  "checklists.eyebrow": "Checklists",
  "checklists.title": "Know what to prepare before you go.",
  "checklists.subtitle":
    "Walk through the steps people often miss for visa, medical, financial, and labour matters.",
  "checklists.empty": "No checklist for this filter yet",

  // community
  "community.eyebrow": "Community",
  "community.title": "Learn from people nearby.",
  "community.subtitle":
    "Find administrative, medical, class, and life experiences shared by people in the same area.",
  "community.filtersLabel": "Your community filters",
  "community.noLocalMatch": "No exact local match yet",
  "community.noLocalMatchHint": "Showing sample posts from other cities.",
  "community.byAuthor": "By {name}",

  // community detail
  "community.detail.back": "Back to community",
  "community.detail.byAuthorUpdated": "By {name} · Updated {date}",
  "community.detail.safetyNote": "Safety note",
  "community.detail.safetyNoteDescription":
    "Community posts are personal experiences. For legal, medical, visa, or emergency questions, verify details with official institutions.",
  "community.detail.replies": "Replies",

  // faq
  "faq.eyebrow": "FAQ",
  "faq.title": "Quick answers for life in Korea.",
  "faq.subtitle":
    "Search frequently asked questions matched to your district and the categories you care about.",
  "faq.searchPlaceholder": "Search FAQ...",

  // chat
  "chat.eyebrow": "AI concierge",
  "chat.title": "Ask with your city and visa context included.",
  "chat.subtitle":
    "We pass the city, language, visa status, multicultural family info, age group, and visa expiry you saved during onboarding to give you tailored guidance.",
  "chat.profileContext": "Profile context",
  "chat.field.city": "City",
  "chat.field.language": "Language",
  "chat.field.nationality": "Nationality",
  "chat.field.ageGroup": "Age group",
  "chat.field.residency": "Residency",
  "chat.field.housing": "Housing",
  "chat.field.employment": "Employment",
  "chat.field.family": "Family",
  "chat.field.visa": "Visa",
  "chat.field.visaExpiry": "Visa expiry",
  "chat.recommendedCategories": "Recommended categories",
  "chat.askLabel": "Ask nabi",
  "chat.button": "Ask with my profile",
  "chat.defaultMessage": "I need help finding support near me.",
  "chat.defaultReply":
    "Ask nabi about your city, visa timeline, healthcare, housing, employment, or family support.",
  "chat.networkError":
    "A network error occurred. Please try again in a moment.",
  "chat.unanswered": "Could not generate an answer. Please rephrase your question.",
  "chat.missingApiKey":
    "OPENAI_API_KEY is not set yet. Add the key to .env.local or Vercel to enable AI counseling.",

  // categories
  "category.education-skill-building": "Education + skill building",
  "category.safety-healthcare": "Safety & healthcare",
  "category.sports-recreation": "Sports & recreation",
  "category.citizenship": "Citizenship",
  "category.finances-spending": "Finances & spending",
  "category.transport": "Transport",
  "category.labour-employment": "Labour & employment",
  "category.legal": "Legal",

  // cities
  "city.서울시": "Seoul",
  "city.천안시": "Cheonan",
  "city.부산시": "Busan",
  "city.인천시": "Incheon",
  "city.수원시": "Suwon",
  "city.대전시": "Daejeon",

  // languages (preferred language options)
  "language.English": "English",
  "language.Korean": "Korean",
  "language.Chinese": "Chinese",
  "language.Vietnamese": "Vietnamese",
  "language.Japanese": "Japanese",
  "language.Thai": "Thai",

  // cost tier labels
  "cost.free": "Free",
  "cost.low": "Low cost",
  "cost.paid": "Paid",

  // info-explorer filter chips
  "chip.visa": "Visa",
  "chip.healthcare": "Healthcare",
  "chip.housing": "Housing",
  "chip.education": "Education",
  "chip.free": "Free",
  "chip.english": "English",

  // auth
  "auth.signIn": "Log in",
  "auth.signUp": "Sign up",
  "auth.signOut": "Log out",
  "auth.email": "Email",
  "auth.password": "Password",
  "auth.displayName": "Display name",
  "auth.signInTitle": "Welcome back",
  "auth.signInSubtitle": "Log in to write posts and reply in the community.",
  "auth.signUpTitle": "Create your account",
  "auth.signUpSubtitle": "It only takes a minute. We use your name on community posts.",
  "auth.noAccount": "Don't have an account?",
  "auth.haveAccount": "Already have an account?",
  "auth.signInCta": "Log in",
  "auth.signUpCta": "Create account",
  "auth.signingIn": "Signing in...",
  "auth.signingUp": "Creating account...",
  "auth.notConfigured":
    "Authentication is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.",
  "auth.confirmEmail":
    "Check your inbox to confirm your email, then come back to log in.",
  "auth.greeting": "Hi, {name}",
  "auth.requiredToWrite": "Log in to share your story",
  "auth.requiredToReply": "Log in to leave a reply",

  // my page
  "me.eyebrow": "My page",
  "me.title": "Hi, {name}",
  "me.subtitle": "Your profile and account in one place.",
  "me.profile.title": "Profile snapshot",
  "me.profile.description": "Recommendations across nabi use these values. Update anytime.",
  "me.profile.city": "City",
  "me.profile.visa": "Current visa",
  "me.profile.residency": "Residency",
  "me.profile.family": "Family",
  "me.profile.empty": "Not set",
  "me.actions.editProfile": "Edit profile",
  "me.actions.signOut": "Sign out",
  "me.profileEditor.close": "Close editor",
  "me.profileEditor.openFullPage": "Open full-page onboarding",
  "me.profileEditor.sectionTitle": "Edit stored profile",
  "me.profileEditor.sectionDescription":
    "Same fields as /onboarding: city, visa, TOPIK, KIIP, district, and more. Saves to this browser (local storage).",
  "me.profileEditor.save": "Save profile",
  "me.profileEditor.cancel": "Cancel",
  "me.savedFacilities.eyebrow": "Saved places",
  "me.savedFacilities.title": "Health & Recreation saves",
  "me.savedFacilities.description":
    "Facilities you bookmarked before visiting the front desk or signing up.",
  "me.savedFacilities.empty": "No saved facilities yet. Save one from a facility detail page.",
  "me.savedFacilities.cta": "Browse facilities",
  "me.notSignedIn.title": "Please sign in to see your page.",
  "me.notSignedIn.subtitle": "Log in or create an account to view your profile.",
  "me.notSignedIn.signIn": "Sign in",
  "me.notSignedIn.signUp": "Sign up",
  "me.sections.tabs.aria": "My content",
  "me.sections.tabs.posts": "My posts",
  "me.sections.tabs.replies": "My replies",
  "me.sections.tabs.scraps": "Saved",
  "me.sections.posts.empty": "You haven't posted yet.",
  "me.sections.posts.cta": "Write your first post",
  "me.sections.replies.empty": "No replies yet.",
  "me.sections.replies.onPost": "On: {title}",
  "me.sections.scraps.empty": "Nothing saved yet.",

  // community write / replies
  "community.writePost": "Write a post",
  "community.writeBack": "Back to community",
  "community.writeTitle": "Share what helped you",
  "community.writeSubtitle":
    "Tell others what you learned about life in Korea. Posts are public.",
  "community.fields.title": "Title",
  "community.fields.titlePlaceholder": "What did you learn?",
  "community.fields.body": "Story",
  "community.fields.bodyPlaceholder": "Share the steps, documents, or tips that made it easier.",
  "community.fields.category": "Category",
  "community.fields.city": "City",
  "community.fields.author": "Display name",
  "community.fields.authorPlaceholder": "How should we credit you?",
  "community.publish": "Publish post",
  "community.publishing": "Publishing...",
  "community.userPostsHeading": "From the community",
  "community.userPostBadge": "Member post",
  "community.empty": "No community posts yet. Be the first to share.",
  "community.detail.replyPlaceholder": "Share what helped or ask a follow-up question.",
  "community.detail.postReply": "Post reply",
  "community.detail.posting": "Posting...",
  "community.detail.repliesCount": "{count} replies",
  "community.detail.byAuthorOn": "By {name} · {date}",
  "community.fields.language": "Post language",
  "community.language.ko": "Korean",
  "community.language.en": "English",
  "community.language.zh": "Chinese",
  "community.scrap.add": "Save post",
  "community.scrap.remove": "Remove from saved",

  // naturalization helper
  "naturalization.eyebrow": "Naturalization helper",
  "naturalization.title": "Plan your path to Korean nationality.",
  "naturalization.subtitle":
    "Answer a few questions to see which naturalization tracks fit your situation, what you still need, and where the risks are.",
  "naturalization.wizard.aria": "Naturalization wizard",
  "naturalization.progress.label": "Step {current} of {total}",
  "naturalization.progress.step1": "Basic info",
  "naturalization.progress.step2": "Family",
  "naturalization.progress.step3": "Result",
  "naturalization.actions.next": "Next",
  "naturalization.actions.back": "Back",
  "naturalization.actions.seeResult": "See result",
  "naturalization.actions.restart": "Restart",
  "naturalization.option.yes": "Yes",
  "naturalization.option.no": "No",
  "naturalization.option.unsure": "Not sure",
  "naturalization.step1.title": "Basic info",
  "naturalization.step1.description":
    "We use these to estimate your eligibility timeline.",
  "naturalization.step1.field.nationality": "Nationality",
  "naturalization.step1.field.nationalityPlaceholder": "e.g. United States",
  "naturalization.step1.field.age": "Age",
  "naturalization.step1.field.currentVisa": "Current visa",
  "naturalization.step1.field.entryDate": "Entry date to Korea",
  "naturalization.step1.field.entryDateHint":
    "First date you entered Korea on your current track.",
  "naturalization.step1.field.continuousResidence": "Continuous residence",
  "naturalization.step1.field.continuousResidenceHint":
    "Have you stayed in Korea continuously without long absences?",
  "naturalization.step2.title": "Family relations",
  "naturalization.step2.description":
    "Your family ties affect simplified and special naturalization paths.",
  "naturalization.step2.q1.title": "Is your spouse a Korean national?",
  "naturalization.step2.q1.marriageYears": "Marriage duration (years)",
  "naturalization.step2.q1.marriageYearsHint":
    "Number of years married. Decimals allowed (e.g. 1.5).",
  "naturalization.step2.q2.title": "Is either parent a Korean national?",
  "naturalization.step2.q2.whichParent": "Which parent?",
  "naturalization.step2.q2.father": "Father",
  "naturalization.step2.q2.mother": "Mother",
  "naturalization.step2.q2.both": "Both",
  "naturalization.result.summaryEyebrow": "Based on your answers",
  "naturalization.result.summaryTitle": "Here's where you stand",
  "naturalization.result.summarySubtitle":
    "A snapshot of likely paths, what to prepare, and where to be careful.",
  "naturalization.result.disclaimer":
    "This is informational only — verify with HiKorea or a licensed lawyer.",
  "naturalization.result.entryDateMissing":
    "Add your entry date in Step 1 for a more accurate timeline.",
  "naturalization.result.types.eyebrow": "Naturalization types",
  "naturalization.result.types.title": "Possible tracks for you",
  "naturalization.result.types.general.title": "General naturalization",
  "naturalization.result.types.general.description":
    "Five or more years of continuous residence and current F-5 status.",
  "naturalization.result.types.simplified.title": "Simplified naturalization",
  "naturalization.result.types.simplified.description":
    "Marriage to a Korean national, or three years of residence with deeper local ties.",
  "naturalization.result.types.special.title": "Special naturalization",
  "naturalization.result.types.special.description":
    "Korean parent, adopted by a Korean, or other special qualifications.",
  "naturalization.badge.green": "Likely",
  "naturalization.badge.yellow": "Needs conditions",
  "naturalization.badge.red": "Currently difficult",
  "naturalization.result.checklist.eyebrow": "Eligibility checklist",
  "naturalization.result.checklist.title": "What's met, what's missing",
  "naturalization.result.checklist.continuousResidence":
    "Continuous residence in Korea",
  "naturalization.result.checklist.fiveYears": "Five or more years in Korea",
  "naturalization.result.checklist.threeYears": "Three or more years in Korea",
  "naturalization.result.checklist.f5": "F-5 permanent resident status",
  "naturalization.result.checklist.koreanSpouse": "Korean spouse",
  "naturalization.result.checklist.marriageDuration":
    "Marriage of two or more years",
  "naturalization.result.checklist.koreanParent": "Korean parent",
  "naturalization.result.checklist.adultAge": "Adult age (19+)",
  "naturalization.result.checklist.status.met": "Met",
  "naturalization.result.checklist.status.partial": "Partially met",
  "naturalization.result.checklist.status.notMet": "Not met",
  "naturalization.result.actions.eyebrow": "Recommended action plan",
  "naturalization.result.actions.title": "Suggested next steps",
  "naturalization.result.actions.acquireF5":
    "Acquire F-5 permanent residence",
  "naturalization.result.actions.acquireF5Description":
    "Build the points and documents needed to qualify for F-5 before applying for general naturalization.",
  "naturalization.result.actions.completeKiip": "Complete the KIIP program",
  "naturalization.result.actions.completeKiipDescription":
    "Finishing KIIP through stage 5 satisfies the social integration requirement.",
  "naturalization.result.actions.gatherSpouseDocs":
    "Gather marriage and joint-life documents",
  "naturalization.result.actions.gatherSpouseDocsDescription":
    "Marriage certificate, joint accounts, residence ledger, photos — anything proving an authentic shared life.",
  "naturalization.result.actions.gatherFamilyRegistry":
    "Collect your Korean parent's family registry",
  "naturalization.result.actions.gatherFamilyRegistryDescription":
    "기본증명서 and 가족관계증명서 from your Korean parent are central to special naturalization.",
  "naturalization.result.actions.submitApplication":
    "Submit your naturalization application",
  "naturalization.result.actions.submitApplicationDescription":
    "File at the immigration office with the required forms, fees, and supporting documents.",
  "naturalization.result.actions.prepareInterview":
    "Prepare for the interview",
  "naturalization.result.actions.prepareInterviewDescription":
    "Practice Korean conversation, basic civics, and your family story before your slot.",
  "naturalization.result.risks.eyebrow": "Potential risks",
  "naturalization.result.risks.title": "Things that could slow you down",
  "naturalization.result.risks.absences.title": "Long absences from Korea",
  "naturalization.result.risks.absences.description":
    "Trips outside Korea longer than six months can break continuous residence and reset your clock.",
  "naturalization.result.risks.taxArrears.title":
    "Possible tax or fine arrears",
  "naturalization.result.risks.taxArrears.description":
    "Unpaid taxes, health insurance premiums, or fines must be cleared before naturalization.",
  "naturalization.result.risks.marriageAuthenticity.title":
    "Marriage authenticity review",
  "naturalization.result.risks.marriageAuthenticity.description":
    "Marriage-based applications get extra scrutiny — keep evidence of a real shared life.",
} as const satisfies Record<string, string>;

export type TranslationKey = keyof typeof en;

const ko = {
  // header
  "header.brand.subtitle": "당신의 한국 생활 가이드",
  "header.nav.discover": "정보 찾기",
  "header.nav.visa": "비자 호라이즌",
  "header.nav.health": "건강과 여가",
  "header.nav.checklists": "체크리스트",
  "header.nav.faq": "자주 묻는 질문",
  "header.nav.community": "커뮤니티",
  "header.nav.chat": "AI 상담",
  "header.cta.setProfile": "프로필 설정",
  "header.cta.myPage": "마이페이지",
  "header.language.label": "언어",

  "seo.title": "nabi: 대한민국의 외국인 거주자를 위한 서비스",
  "seo.description":
    "nabi는 한국에 거주하는 외국인이 비자, 지역 서비스, 의료, 여가, 커뮤니티 정보와 실용적인 생활 지원을 쉽게 찾도록 돕습니다.",

  // common
  "common.notProvided": "입력되지 않음",
  "common.update": "업데이트",
  "common.back": "뒤로",
  "common.loading": "불러오는 중...",
  "common.asking": "질문 중...",
  "common.askNari": "nabi에게 물어보기",
  "common.answer": "답변",
  "common.results": "{city} 기준 {count}개 결과",

  // home hero
  "home.heroBadge": "한국에서 생활을 시작하는 외국인을 위해",
  "home.heroTitle": "삶이 복잡해지기 전에 필요한 도움을 찾아보세요.",
  "home.heroSubtitle":
    "nabi는 외국인이 한국에서 필요한 정부지원, 의료, 주거, 교육, 체류 절차를 상황과 위치에 맞게 찾도록 돕는 정보 플랫폼입니다.",
  "home.heroPrimaryCta": "지원 정보 찾기 시작",
  "home.heroSecondaryCta": "AI 가이드에게 묻기",

  // home services
  "home.servicesEyebrow": "필터링된 디렉토리",
  "home.servicesTitle": "필요한 도움을 상황별로 찾기",
  "home.servicesSubtitle":
    "Supabase에 기관, 프로그램, 지역, 언어, 비용, 신청 조건을 저장하고 커스텀 필터로 검색하는 구조를 전제로 설계했습니다.",
  "home.service.government.title": "정부 지원",
  "home.service.government.label": "공공 지원",
  "home.service.government.desc":
    "행정복지센터, 다문화가족지원센터, 통역 상담, 긴급 복지 제도를 가까운 위치 기준으로 찾습니다.",
  "home.service.health.title": "건강과 의료",
  "home.service.health.label": "의료",
  "home.service.health.desc":
    "외국인 진료가 가능한 병원, 보건소, 보험 안내, 수영장과 체육시설까지 생활 건강 정보를 모읍니다.",
  "home.service.housing.title": "주거와 서류",
  "home.service.housing.label": "주거",
  "home.service.housing.desc":
    "주거 계약, 전입 신고, 체류기간 연장, 필요한 서류와 방문 장소를 단계별로 안내합니다.",
  "home.service.language.title": "언어와 문화",
  "home.service.language.label": "교육",
  "home.service.language.desc":
    "한국어 수업, 문화 교육, 커뮤니티 이벤트, 지역별 무료 프로그램을 추천합니다.",

  "home.faqs.0": "서울에서 외국인이 무료로 상담받을 수 있는 곳은 어디인가요?",
  "home.faqs.1": "체류기간 연장 전에 어떤 서류를 준비해야 하나요?",
  "home.faqs.2": "한국 건강보험에 가입하지 않았을 때 갈 수 있는 병원이 있나요?",

  "home.communityEyebrow": "커뮤니티",
  "home.communityTitle": "주변 사람에게 물어보기",
  "home.communityDescription":
    "같은 지역에 사는 외국인들이 병원 경험, 행정센터 방문 후기, 한국어 수업 추천, 이민 절차 팁을 공유하는 커뮤니티 공간입니다.",
  "home.faqEyebrow": "자주 묻는 질문",
  "home.faqDescription":
    "지역, 비자 상태, 언어, 보험 여부를 입력하면 공식 기관과 커뮤니티 답변을 함께 보여주는 흐름으로 확장할 수 있습니다.",
  "home.aiEyebrow": "AI 컨시어지",
  "home.aiTitle": "내 말로 자연스럽게 물어보기",
  "home.aiDescription":
    "ChatGPT API 라우트가 준비되어 있어 사용자가 \"서울에 살고 있고 비자 연장을 해야 해요\"처럼 질문하면 체크리스트와 관련 기관을 안내하도록 확장할 수 있습니다.",

  // 비자 알림
  "home.visaAlert.eyebrow": "비자 상태 업데이트",
  "home.visaAlert.body":
    "현재 체류 자격이 {days}일 후 만료됩니다. 프로필을 바탕으로 F-2-7 등 장기 자격 준비와 갱신 단계를 함께 확인하세요.",
  "home.visaAlert.bodyFallback":
    "온보딩에서 비자 만료일을 입력하면 실시간 카운트다운과 맞춤 갱신 안내를 볼 수 있어요.",
  "home.visaAlert.cta": "잠금화면 미리보기 열기",

  // Life in Korea 섹션
  "home.life.0.eyebrow": "정착하기",
  "home.life.0.caption": "한국이 집처럼 편안해지도록.",
  "home.life.0.alt": "광화문에서 함께 사진을 찍는 친구들",
  "home.life.1.eyebrow": "일하고 성장하기",
  "home.life.1.caption": "당신의 방식으로 커리어를 쌓아요.",
  "home.life.1.alt": "강남 거리를 걷는 직장인들",
  "home.life.2.eyebrow": "배우기",
  "home.life.2.caption": "내 속도로 한국어를 익혀요.",
  "home.life.2.alt": "한국어 학당에서 함께 공부하는 학생들",

  // 프로그램 탐색기
  "home.explorerEyebrow": "지금 바로 써보기",
  "home.explorerTitle": "지금 내 상황에 맞는 프로그램만 골라보세요.",
  "home.explorerDescription":
    "지금 내 상황과 맞는 태그를 선택하면 가까운 곳의 실제 프로그램을 바로 보여드려요.",

  // 건강 & 여가
  "home.health.eyebrow": "건강 & 여가",
  "home.health.title": "구별 공공 체육시설, 수영장, 첫 방문 규정을 비교해보세요.",
  "home.health.description":
    "외국인등록증 요구사항, 주민 할인 가격, 지역카드 결제 안내, 실내화 규정, 그리고 데스크 응대용 한국어 문구까지 한 번에.",
  "home.health.cta": "시설 둘러보기",

  // 비자 페이지
  "visa.eyebrow": "비자 호라이즌",
  "visa.title": "오늘 갱신하고, 다음 자격을 계획하세요.",
  "visa.subtitle":
    "당장의 갱신 준비와 장기적인 F-2-7 준비를 한 화면에서 보여드립니다.",
  "visa.replayNotification": "알림 다시 보기",
  "visa.quickEdit.eyebrow": "내 프로필",
  "visa.quickEdit.title": "비자 종류·만료일",
  "visa.quickEdit.description":
    "온보딩과 같은 항목입니다. 비자 종류는 대시보드 문구에, 만료일은 홈 알림·갱신 카드의 남은 일수에 반영됩니다.",
  "visa.quickEdit.save": "저장",
  "visa.quickEdit.saved": "저장했어요. 홈이나 잠금화면 미리보기를 새로 열면 문구가 갱신됩니다.",
  "visa.quickEdit.fullProfile": "도시·TOPIK·구 등 전체 설정은 온보딩으로 →",
  "visa.edit.back": "디스커버 비자 탭으로",
  "visa.edit.open": "비자 정보 수정",
  "visa.profileSummary.title": "저장된 비자 정보",
  "visa.profileSummary.description":
    "갱신 카운트다운·비자 대시보드 문구에 쓰이는 값이에요. 다음 화면에서 바꿀 수 있어요.",
  "visa.horizonTrack": "호라이즌 트랙",
  "visa.fromTo": "{current} → {target}",
  "visa.horizonDescription":
    "F-2-7 모의 점수가 거의 다 왔어요. 남은 점수를 채울 실질적인 방법들을 모았습니다.",
  "visa.daysUntilCheckpoint": "갱신 체크포인트까지 {days}일",
  "visa.estimatedUnlock": "예상 달성 시점",
  "visa.daysShort": "{days}일",
  "visa.ofPoints": "/ {target}점",
  "visa.bridgeHeadline":
    "호라이즌: 지금 학업 트랙으로는 앞으로 {days}일 안에 {points}점만 더 모으면 F-2-7 전체 요건에 도달할 수 있어요.",

  // 갱신 체크리스트
  "visa.renewal.eyebrow": "갱신 트랙",
  "visa.renewal.title": "마감 전에 {current} 자격을 안전하게 유지하세요.",
  "visa.renewal.description":
    "저장된 비자·구·학력 프로필을 바탕으로 실제 방문에 필요한 체크리스트를 만들어드립니다.",
  "visa.renewal.primaryCta": "현재 비자 갱신 체크리스트로 이동",
  "visa.renewal.steps.0": "갱신 창구가 가득 차기 전에 HiKorea 예약을 잡으세요.",
  "visa.renewal.steps.1":
    "여권, 외국인등록증, 신청서, 주거 증빙, 수수료를 준비하세요.",
  "visa.renewal.steps.2":
    "현재 비자에 맞는 재학·재직 증빙을 함께 챙기세요.",
  "visa.clock.label": "비자 카운트다운",
  "visa.clock.daysLeft": "{days}일 남음",
  "visa.clock.expiryNotSet": "만료일이 설정되지 않았습니다",
  "visa.clock.checkExpiry": "만료일을 확인해주세요",
  "visa.clock.expiry": "만료일",
  "visa.clock.notProvided": "입력되지 않음",
  "visa.clock.district": "거주 구",
  "visa.clock.notSelected": "선택되지 않음",
  "visa.clock.profileBasis": "프로필 기반",

  // 전략 옵션
  "visa.strategy.points": "+{points}점",
  "visa.strategy.status.available": "가능",
  "visa.strategy.status.earned": "획득",
  "visa.strategy.status.locked": "잠김",
  "visa.strategy.nextIntake": "다음 모집: {date}",
  "visa.strategy.openResource": "자료 열기",

  // 비자 알림 페이지
  "visa.notification.label": "알림",
  "visa.notification.tapHint": "탭해서 비자 호라이즌 열기",
  "visa.notification.dateLabel": "5월 16일 토요일",
  "visa.notification.brand": "nabi 비자 호라이즌",
  "visa.notification.title": "비자 갱신 창구가 곧 열립니다",
  "visa.notification.body":
    "비자 상태 업데이트: 현재 체류 자격이 {days}일 후 만료됩니다. 갱신 체크리스트와 장기 체류 트랙을 확인하세요.",
  "visa.notification.bodyFallback":
    "비자 상태 업데이트: 프로필에 만료일을 입력하면 맞춤 카운트다운과 다음 단계를 열 수 있어요.",
  "visa.notification.timestamp": "지금",

  // 생체 인증
  "visa.biometric.brand": "nabi 시큐어 패스",
  "visa.biometric.status": "본인 확인 중",
  "visa.biometric.note": "저장된 프로필로 비자 대시보드를 여는 중이에요.",

  // 건강 & 여가 페이지
  "health.eyebrow": "건강 & 여가",
  "health.title": "외국인이 더 쉽게 등록할 수 있는 공공 체육시설을 찾아보세요.",
  "health.subtitle":
    "종목, 운영 시간, 월 회원료, 그리고 첫 방문 때 필요한 데스크 절차를 한 번에 비교합니다.",

  "health.openNow": "운영 중",
  "health.closed": "운영 종료",
  "health.closedNow": "지금은 운영 종료",
  "health.monthlyRate": "공공 월 이용료",
  "health.residentDiscount": "거주자 할인: 외국인등록증 필요",

  "health.map.eyebrow": "동네 지도",
  "health.map.title": "시설이 모여 있는 위치",
  "health.map.subtitle":
    "번호를 누르면 길 찾기가 열려요. NEXT_PUBLIC_GOOGLE_MAPS_API_KEY가 있으면 먼저 인터랙티브 지도(Maps JavaScript API + 결제)를 띄우고, 실패 시 정적 이미지(Maps Static API), 그다음 OpenStreetMap 순으로 시도합니다.",
  "health.map.alt": "서울 주변 레크리에이션 시설 지도 미리보기",
  "health.map.aria": "레크리에이션 시설 지도",
  "health.map.iframeTitle": "서울 시설 위치 OpenStreetMap 미리보기",
  "health.map.staticMapFallbackNote":
    "Google 지도 이미지를 불러오지 못했습니다. Google Cloud 콘솔에서 이 키에 ‘Maps Static API’를 활성화했는지(JavaScript API만 켜두면 Static 요청이 거절됩니다), 결제 연결·HTTP 리퍼러(로컬 허용)를 확인해 주세요. 대신 OpenStreetMap을 표시합니다.",
  "health.map.jsFallbackNote":
    "인터랙티브 Google 지도를 불러오지 못했습니다. Maps JavaScript API 활성화·결제·리퍼러(사이트 허용)를 확인해 주세요. 다음으로 정적 지도 이미지를 시도합니다.",

  "health.facility.scale.municipal": "광역 시설",
  "health.facility.scale.boutique": "근린·부티크형",

  // 시설 리스트
  "health.list.eyebrow": "내 구 기준 가까운 순",
  "health.list.sortedFrom": "{district} 기준 정렬",
  "health.list.updateDistrict": "구 변경하기",
  "health.list.distance": "{km} km",

  // 시설 상세
  "health.detail.back": "건강 & 여가로 돌아가기",
  "health.detail.intro":
    "수영, 일반 웨이트, 실내 운동이 가능한 공공 체육센터로, 거주자 기준 월 약 4–5만원대 가격입니다.",
  "health.detail.sports": "운영 종목",
  "health.detail.pricing": "월별 이용료",
  "health.detail.showKoreanReception": "리셉션에 보여줄 한국어",
  "health.detail.saveFacility": "내 프로필에 저장",
  "health.detail.savedFacility": "프로필에 저장됨",

  "health.indoorShoe.eyebrow": "실내화 안내",
  "health.indoorShoe.title": "운동장에는 실외화를 신고 들어가지 마세요",
  "health.indoorShoe.body":
    "락커룸에서 갈아 신을 깨끗한 실내 운동화를 따로 챙기세요. 일반적으로 운동 공간에는 길거리 신발이 허용되지 않아요.",

  // 종목
  "health.sport.swimming": "자유 수영",
  "health.sport.weights": "일반 웨이트",
  "health.sport.yoga": "요가",
  "health.sport.fitness": "실내 피트니스",
  "health.sport.court": "코트 스포츠",

  // 가입 요건
  "health.requirements.eyebrow": "가입 요건",
  "health.requirements.title": "줄 서기 전에 이것부터 준비하세요",
  "health.requirements.arc": "외국인등록증 필수:",
  "health.requirements.arcDesc":
    "거주자 할인을 받으려면 외국인등록증을 제시하세요.",
  "health.requirements.payment": "결제:",
  "health.requirements.paymentSuffix":
    "공공 센터는 한국 발급 카드 결제를 선호할 수 있어요.",
  "health.requirements.indoorShoes": "실내화:",
  "health.requirements.indoorShoesYes": "체육관용 깨끗한 실내화를 가져가세요.",
  "health.requirements.indoorShoesNo": "데스크에 실내화 별도 필요 여부를 확인하세요.",
  "health.payment.cash": "현금",
  "health.payment.foreign": "해외 카드",
  "health.payment.local": "한국 카드",

  // 첫 방문 온보딩
  "health.firstVisit.eyebrow": "첫 방문 온보딩",
  "health.firstVisit.title": "데스크에서 쓰는 가입 스크립트",
  "health.firstVisit.steps.0":
    "1. 데스크 운영 시간에 도착하고 번호표가 있으면 뽑으세요.",
  "health.firstVisit.steps.1":
    "2. 외국인등록증을 보여주고 결제 전에 거주자 할인을 요청하세요.",
  "health.firstVisit.steps.2":
    "3. 수영 레인이나 헬스장 이용 시간을 확인하고, 실내화 보관 위치를 물어보세요.",
  "health.firstVisit.openModal": "한국어 응대 문구 열기",
  "health.firstVisit.modalEyebrow": "리셉션 데스크",
  "health.firstVisit.modalTitle": "이 문장을 보여주세요",
  "health.firstVisit.close": "닫기",

  // 한국어 카드
  "health.shield.label": "이 한국어 그대로 보여주세요",
  "health.shield.note":
    "리셉션 직원이 그대로 읽을 수 있도록 한국어 문장을 유지해주세요.",
  "health.shield.copy": "한국어 복사",

  // explorer
  "explorer.title": "맞춤 검색",
  "explorer.cityChip": "서울",
  "explorer.programs.0.title": "서울 글로벌 센터",
  "explorer.programs.0.category": "정부 지원",
  "explorer.programs.0.desc":
    "외국인 생활 상담, 비자 기본 안내, 행정 절차, 통역 연계 정보를 제공합니다.",
  "explorer.programs.1.title": "보건소",
  "explorer.programs.1.category": "건강과 의료",
  "explorer.programs.1.desc":
    "예방접종, 건강검진, 보건 상담 등 지역 보건소에서 받을 수 있는 서비스를 안내합니다.",
  "explorer.programs.2.title": "주거 계약 체크리스트",
  "explorer.programs.2.category": "주거와 서류",
  "explorer.programs.2.desc":
    "월세 계약 전 확인할 내용, 전입 신고, 확정일자, 보증금 보호 절차를 정리합니다.",
  "explorer.programs.3.title": "한국어 수업 찾기",
  "explorer.programs.3.category": "언어와 문화",
  "explorer.programs.3.desc":
    "다문화센터와 구청에서 운영하는 무료 또는 저렴한 한국어 수업을 찾습니다.",
  "explorer.empty":
    "조건에 맞는 예시가 없어요. 필터를 줄이거나 Supabase 데이터가 추가되면 더 많은 결과를 볼 수 있습니다.",

  // ai chat preview
  "chatPreview.label": "nabi AI",
  "chatPreview.defaultMessage":
    "서울에 살고 있어요. 의료 서비스와 비자 갱신 도움이 필요해요.",
  "chatPreview.defaultReply":
    "방문 체크리스트 준비, 가까운 공공기관 찾기, 무료 지원 프로그램 비교, 공식 기관에 꼭 확인해야 할 사항까지 안내해드릴 수 있어요.",
  "chatPreview.button": "nabi에게 묻기",

  // onboarding
  "onboarding.eyebrow": "개인 설정",
  "onboarding.title": "어디에 있고 어떤 도움이 필요한지 알려주세요.",
  "onboarding.subtitle":
    "가입 시 받은 도시, 비자 유무, 다문화 가족 여부, 연령대, 비자 만료일은 검색, 체크리스트, 커뮤니티, AI 답변의 기본 맥락으로 사용됩니다.",
  "onboarding.cityTitle": "어느 도시에 살고 계세요?",
  "onboarding.cityDescription":
    "도시를 기준으로 가까운 공공기관, 의료서비스, 교육 프로그램, 커뮤니티 정보를 먼저 보여드립니다.",
  "onboarding.cityUseLocation": "현재 위치 사용하기",
  "onboarding.locationStatus.initial":
    "도시를 직접 선택하거나 현재 위치로 추정할 수 있어요.",
  "onboarding.locationStatus.updated": "{city} 기준으로 정보를 추천합니다.",
  "onboarding.locationStatus.checking": "현재 위치를 확인하는 중입니다...",
  "onboarding.locationStatus.inferred":
    "현재 위치를 참고해 {city}로 추정했습니다. 필요하면 직접 다른 도시를 선택할 수 있어요.",
  "onboarding.locationStatus.unsupported":
    "이 브라우저에서는 현재 위치를 사용할 수 없어요.",
  "onboarding.locationStatus.denied":
    "위치 권한을 받을 수 없어요. 도시를 직접 선택해주세요.",
  "onboarding.selectedCityLabel": "선택된 도시",
  "onboarding.selectedCityNote":
    "위치 권한은 도시 추정에만 사용됩니다. 정확한 좌표는 저장하지 않고, 선택된 도시를 기준으로 공공기관과 생활 정보를 필터링합니다.",
  "onboarding.aboutTitle": "기본 정보",
  "onboarding.aboutDescription":
    "이 정보는 어떤 카테고리(이민, 의료, 노동, 교육 등)가 더 중요한지를 판단해 추천 우선순위를 정하는 데에만 사용됩니다.",
  "onboarding.educationTitle": "학업 및 비자 진행 상황",
  "onboarding.educationDescription":
    "이 정보는 F-2-7 호라이즌 트래커와 주변 언어·학업 마일스톤 추천에 사용됩니다.",
  "onboarding.field.preferredLanguage": "선호 언어",
  "onboarding.field.nationality": "국적",
  "onboarding.field.nationalityPlaceholder": "예: 베트남, 미국",
  "onboarding.field.ageGroup": "연령대",
  "onboarding.field.gender": "성별",
  "onboarding.field.residency": "체류 상태",
  "onboarding.field.housing": "주거 형태",
  "onboarding.field.maritalStatus": "결혼 여부",
  "onboarding.field.employment": "직업",
  "onboarding.field.family": "가족 형태",
  "onboarding.field.hasVisa": "현재 비자가 있나요?",
  "onboarding.field.multicultural": "다문화 가족인가요?",
  "onboarding.field.visaExpiry": "비자 만료일",
  "onboarding.field.visaExpiryNote":
    "비자가 없거나 확실하지 않으면 비워두어도 됩니다.",
  "onboarding.field.degreeLevel": "학위 수준",
  "onboarding.field.topikLevel": "TOPIK 급수",
  "onboarding.field.kiipStage": "KIIP 단계",
  "onboarding.field.currentVisaSubtype": "현재 비자 종류",
  "onboarding.field.district": "서울 자치구",
  "onboarding.submit": "저장하고 추천 받기",

  "option.age.under-18": "18세 미만",
  "option.age.18-24": "18-24세",
  "option.age.25-34": "25-34세",
  "option.age.35-49": "35-49세",
  "option.age.50-plus": "50세 이상",
  "option.gender.female": "여성",
  "option.gender.male": "남성",
  "option.gender.non-binary": "논바이너리",
  "option.gender.prefer-not-to-say": "응답하지 않음",
  "option.residency.new-arrival": "최근 입국",
  "option.residency.short-term": "단기 체류",
  "option.residency.long-term": "장기 체류",
  "option.residency.permanent": "영주권자",
  "option.residency.considering-immigration": "이민 고려 중",
  "option.housing.renting": "임대",
  "option.housing.owning": "자가",
  "option.housing.dormitory": "기숙사",
  "option.housing.with-family": "가족과 함께",
  "option.housing.looking": "주거지를 찾는 중",
  "option.marital.single": "미혼",
  "option.marital.partnered": "동거",
  "option.marital.married": "기혼",
  "option.marital.divorced": "이혼",
  "option.marital.widowed": "사별",
  "option.employment.student": "학생",
  "option.employment.employed-full-time": "정규직",
  "option.employment.employed-part-time": "시간제",
  "option.employment.self-employed": "자영업",
  "option.employment.job-seeking": "구직 중",
  "option.employment.homemaker": "가사 전담",
  "option.employment.retired": "은퇴",
  "option.family.single-household": "1인 가구",
  "option.family.couple": "부부",
  "option.family.with-children": "자녀가 있는 가구",
  "option.family.multicultural-family": "다문화 가족",
  "option.family.extended-family": "확대 가족",
  "option.yesNo.yes": "예",
  "option.yesNo.no": "아니오",
  "option.yesNo.unsure": "잘 모르겠어요",
  "option.degree.none": "학위 없음",
  "option.degree.high-school": "고등학교",
  "option.degree.bachelor": "학사",
  "option.degree.master": "석사",
  "option.degree.phd": "박사",
  "option.topik.none": "TOPIK 없음",
  "option.topik.1": "TOPIK 1급",
  "option.topik.2": "TOPIK 2급",
  "option.topik.3": "TOPIK 3급",
  "option.topik.4": "TOPIK 4급",
  "option.topik.5": "TOPIK 5급",
  "option.topik.6": "TOPIK 6급",
  "option.kiip.none": "KIIP 없음",
  "option.kiip.0": "KIIP 0단계",
  "option.kiip.1": "KIIP 1단계",
  "option.kiip.2": "KIIP 2단계",
  "option.kiip.3": "KIIP 3단계",
  "option.kiip.4": "KIIP 4단계",
  "option.kiip.5": "KIIP 5단계",
  "option.visaSubtype.D-2": "D-2 유학",
  "option.visaSubtype.D-10": "D-10 구직",
  "option.visaSubtype.E-7": "E-7 특정활동",
  "option.visaSubtype.F-2-7": "F-2-7 우수인재",
  "option.visaSubtype.F-5": "F-5 영주",
  "option.visaSubtype.other": "기타",
  "option.visaSubtype.unsure": "잘 모르겠어요",
  "option.district.": "선택 안 함",
  "option.district.마포구": "마포구",
  "option.district.성동구": "성동구",
  "option.district.강남구": "강남구",
  "option.district.종로구": "종로구",
  "option.district.용산구": "용산구",
  "option.district.기타": "기타 서울 자치구",

  // discover
  "discover.eyebrow": "지원 정보 찾기",
  "discover.title": "주변에서 받을 수 있는 공공 지원과 생활 서비스를 찾아보세요.",
  "discover.subtitle":
    "지역구와 관심 카테고리를 기준으로 정부지원, 의료, 교육, 교통, 법률, 노동 정보를 필터링합니다.",
  "discover.filtersLabel": "필터",
  "discover.cityFieldLabel": "도시",
  "discover.categoriesFieldLabel": "카테고리",
  "discover.categoriesFieldDescription":
    "추천 카테고리는 별표로 표시됩니다.",
  "discover.recommendedBadge": "맞춤",
  "discover.recommendedTitle": "프로필 기반 추천",
  "discover.updateProfile": "프로필 수정",
  "discover.recommendedDescription":
    "아래 카테고리는 비자, 가족, 거주, 고용, 연령 같은 프로필 정보를 기반으로 추천됩니다.",
  "discover.whyTheseCategories": "왜 이 카테고리인가요?",
  "discover.noMatchingTitle": "조건에 맞는 프로그램이 아직 없어요",
  "discover.noMatchingHint":
    "카테고리를 줄여 보거나 도시를 변경해 보세요. Supabase에 더 많은 지역 정보를 추가할 수 있습니다.",

  "discover.tabs.aria": "찾기 섹션",
  "discover.tabs.support": "지원 정보",
  "discover.tabs.visa": "비자",
  "discover.tabs.health": "건강 & 여가",
  "discover.tabs.checklists": "체크리스트",
  "discover.tabs.naturalization": "귀화 도우미",

  "discover.detail.back": "지원 정보로 돌아가기",
  "discover.detail.whatToBring": "준비할 것",
  "discover.detail.details": "상세 정보",
  "discover.detail.languages": "지원 언어",
  "discover.detail.contact": "연락처",
  "discover.detail.updated": "최근 업데이트",
  "discover.detail.beforeYouGo": "방문 전 확인",
  "discover.detail.beforeYouGoDescription":
    "법률, 비자, 의료, 응급 사항은 개인 상황에 따라 달라질 수 있어요. 방문 전 반드시 공식 기관에 확인하세요.",
  "discover.detail.openOfficial": "공식 사이트 열기",

  "googleMap.locationLabel": "위치",
  "googleMap.note":
    "지도를 화면에 직접 띄우지 않고 위치 확인용 링크만 제공합니다. 자세한 길찾기와 주변 정보는 Google Maps에서 확인하세요.",
  "googleMap.openMaps": "Google Maps에서 열기",

  "checklists.eyebrow": "체크리스트",
  "checklists.title": "방문 전에 무엇을 준비할지 확인하세요.",
  "checklists.subtitle":
    "비자, 의료, 금융, 노동처럼 실수하기 쉬운 절차를 단계별로 확인하세요.",
  "checklists.empty": "이 조건에 맞는 체크리스트가 없어요",

  "community.eyebrow": "커뮤니티",
  "community.title": "주변 사람들의 경험에서 배우기",
  "community.subtitle":
    "같은 지역에서 경험한 행정, 의료, 수업, 생활 정보를 찾아봅니다.",
  "community.filtersLabel": "내 커뮤니티 필터",
  "community.noLocalMatch": "이 지역에 맞는 글이 아직 없어요",
  "community.noLocalMatchHint": "다른 도시의 예시 글을 보여드립니다.",
  "community.byAuthor": "작성자: {name}",

  "community.detail.back": "커뮤니티로 돌아가기",
  "community.detail.byAuthorUpdated": "작성자 {name} · 업데이트 {date}",
  "community.detail.safetyNote": "안전 주의",
  "community.detail.safetyNoteDescription":
    "커뮤니티 글은 개인의 경험입니다. 법률, 의료, 비자, 응급 사항은 반드시 공식 기관에 확인하세요.",
  "community.detail.replies": "답글",

  "faq.eyebrow": "자주 묻는 질문",
  "faq.title": "한국 생활을 위한 빠른 답변",
  "faq.subtitle":
    "지역구와 관심 카테고리에 맞춰 자주 묻는 질문을 검색합니다.",
  "faq.searchPlaceholder": "FAQ 검색...",

  "chat.eyebrow": "AI 컨시어지",
  "chat.title": "도시와 비자 정보를 포함해 질문해 보세요.",
  "chat.subtitle":
    "온보딩에서 저장한 도시, 언어, 비자 유무, 다문화 가족 여부, 연령대, 비자 만료일을 함께 보내 더 맞춤형 안내를 받습니다.",
  "chat.profileContext": "프로필 정보",
  "chat.field.city": "도시",
  "chat.field.language": "언어",
  "chat.field.nationality": "국적",
  "chat.field.ageGroup": "연령대",
  "chat.field.residency": "체류 상태",
  "chat.field.housing": "주거",
  "chat.field.employment": "직업",
  "chat.field.family": "가족",
  "chat.field.visa": "비자",
  "chat.field.visaExpiry": "비자 만료일",
  "chat.recommendedCategories": "추천 카테고리",
  "chat.askLabel": "nabi에게 묻기",
  "chat.button": "내 프로필로 질문하기",
  "chat.defaultMessage": "주변에서 받을 수 있는 도움을 찾고 싶어요.",
  "chat.defaultReply":
    "도시, 비자 일정, 의료, 주거, 고용, 가족 지원에 대해 nabi에게 물어보세요.",
  "chat.networkError": "네트워크 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
  "chat.unanswered": "답변을 만들지 못했어요. 질문을 조금 더 구체적으로 적어주세요.",
  "chat.missingApiKey":
    "OPENAI_API_KEY가 아직 설정되지 않았어요. .env.local 또는 Vercel에 키를 추가하면 AI 상담을 사용할 수 있습니다.",

  "category.education-skill-building": "교육 및 역량 강화",
  "category.safety-healthcare": "안전과 의료",
  "category.sports-recreation": "스포츠와 여가",
  "category.citizenship": "체류·국적",
  "category.finances-spending": "금융과 생활비",
  "category.transport": "교통",
  "category.labour-employment": "노동과 취업",
  "category.legal": "법률",

  "city.서울시": "서울시",
  "city.천안시": "천안시",
  "city.부산시": "부산시",
  "city.인천시": "인천시",
  "city.수원시": "수원시",
  "city.대전시": "대전시",

  "language.English": "영어",
  "language.Korean": "한국어",
  "language.Chinese": "중국어",
  "language.Vietnamese": "베트남어",
  "language.Japanese": "일본어",
  "language.Thai": "태국어",

  "cost.free": "무료",
  "cost.low": "저렴",
  "cost.paid": "유료",

  "chip.visa": "비자",
  "chip.healthcare": "의료",
  "chip.housing": "주거",
  "chip.education": "교육",
  "chip.free": "무료",
  "chip.english": "영어 가능",

  // auth
  "auth.signIn": "로그인",
  "auth.signUp": "회원가입",
  "auth.signOut": "로그아웃",
  "auth.email": "이메일",
  "auth.password": "비밀번호",
  "auth.displayName": "표시 이름",
  "auth.signInTitle": "다시 오신 걸 환영해요",
  "auth.signInSubtitle": "로그인하면 커뮤니티에 글을 쓰고 답글을 달 수 있어요.",
  "auth.signUpTitle": "계정 만들기",
  "auth.signUpSubtitle": "1분이면 끝나요. 입력한 이름은 커뮤니티 글에 표시됩니다.",
  "auth.noAccount": "계정이 없으신가요?",
  "auth.haveAccount": "이미 계정이 있으신가요?",
  "auth.signInCta": "로그인",
  "auth.signUpCta": "계정 만들기",
  "auth.signingIn": "로그인 중...",
  "auth.signingUp": "계정 생성 중...",
  "auth.notConfigured":
    "인증이 설정되지 않았습니다. .env.local 에 NEXT_PUBLIC_SUPABASE_URL 과 NEXT_PUBLIC_SUPABASE_ANON_KEY 를 설정해 주세요.",
  "auth.confirmEmail": "이메일을 확인해 인증을 완료한 뒤 다시 로그인해 주세요.",
  "auth.greeting": "{name}님 안녕하세요",
  "auth.requiredToWrite": "로그인하면 경험을 공유할 수 있어요",
  "auth.requiredToReply": "로그인하면 답글을 남길 수 있어요",

  "me.eyebrow": "마이페이지",
  "me.title": "{name}님 안녕하세요",
  "me.subtitle": "프로필과 계정을 한곳에서 관리하세요.",
  "me.profile.title": "프로필 요약",
  "me.profile.description": "nabi의 모든 추천이 이 값을 사용해요. 언제든 수정할 수 있어요.",
  "me.profile.city": "도시",
  "me.profile.visa": "현재 비자",
  "me.profile.residency": "거주 상태",
  "me.profile.family": "가족 상황",
  "me.profile.empty": "미설정",
  "me.actions.editProfile": "프로필 수정",
  "me.actions.signOut": "로그아웃",
  "me.profileEditor.close": "편집 닫기",
  "me.profileEditor.openFullPage": "온보딩 전체 페이지 열기",
  "me.profileEditor.sectionTitle": "저장된 프로필 수정",
  "me.profileEditor.sectionDescription":
    "/onboarding 과 동일한 항목입니다. 도시, 비자, TOPIK, KIIP, 거주 구 등을 바꿀 수 있어요. 이 브라우저 localStorage에 저장됩니다.",
  "me.profileEditor.save": "프로필 저장",
  "me.profileEditor.cancel": "취소",
  "me.savedFacilities.eyebrow": "저장한 장소",
  "me.savedFacilities.title": "건강·여가 저장 목록",
  "me.savedFacilities.description":
    "방문 전 또는 회원 가입 전에 저장해 둔 시설이에요.",
  "me.savedFacilities.empty": "아직 저장한 시설이 없어요. 시설 상세 화면에서 저장해 보세요.",
  "me.savedFacilities.cta": "시설 둘러보기",
  "me.notSignedIn.title": "마이페이지를 보려면 로그인이 필요해요.",
  "me.notSignedIn.subtitle": "로그인하거나 계정을 만들어 프로필을 확인해 보세요.",
  "me.notSignedIn.signIn": "로그인",
  "me.notSignedIn.signUp": "회원가입",
  "me.sections.tabs.aria": "내 활동",
  "me.sections.tabs.posts": "내가 쓴 글",
  "me.sections.tabs.replies": "내 댓글",
  "me.sections.tabs.scraps": "스크랩",
  "me.sections.posts.empty": "아직 작성한 글이 없어요.",
  "me.sections.posts.cta": "첫 글 작성하기",
  "me.sections.replies.empty": "아직 작성한 댓글이 없어요.",
  "me.sections.replies.onPost": "글: {title}",
  "me.sections.scraps.empty": "아직 스크랩한 글이 없어요.",

  // community write / replies
  "community.writePost": "글쓰기",
  "community.writeBack": "커뮤니티로 돌아가기",
  "community.writeTitle": "도움이 된 경험을 공유해 주세요",
  "community.writeSubtitle":
    "한국 생활에서 배운 점을 다른 사람과 나눠 보세요. 작성한 글은 공개됩니다.",
  "community.fields.title": "제목",
  "community.fields.titlePlaceholder": "어떤 점을 알게 되셨나요?",
  "community.fields.body": "이야기",
  "community.fields.bodyPlaceholder": "도움이 된 절차, 서류, 팁을 자유롭게 적어주세요.",
  "community.fields.category": "카테고리",
  "community.fields.city": "도시",
  "community.fields.author": "표시 이름",
  "community.fields.authorPlaceholder": "어떤 이름으로 표시할까요?",
  "community.publish": "글 등록",
  "community.publishing": "등록 중...",
  "community.userPostsHeading": "커뮤니티에서 공유된 글",
  "community.userPostBadge": "회원 글",
  "community.empty": "아직 작성된 커뮤니티 글이 없어요. 첫 번째 글을 남겨 보세요.",
  "community.detail.replyPlaceholder": "도움이 된 점이나 추가 질문을 적어 보세요.",
  "community.detail.postReply": "답글 등록",
  "community.detail.posting": "등록 중...",
  "community.detail.repliesCount": "답글 {count}개",
  "community.detail.byAuthorOn": "작성자 {name} · {date}",

  // 귀화 도우미
  "naturalization.eyebrow": "귀화 도우미",
  "naturalization.title": "한국 국적 취득까지의 길을 설계해 보세요.",
  "naturalization.subtitle":
    "몇 가지 질문에 답하면 어떤 귀화 유형이 적합한지, 무엇을 더 준비해야 하는지, 어떤 위험이 있는지 한눈에 알려드려요.",
  "naturalization.wizard.aria": "귀화 도우미 마법사",
  "naturalization.progress.label": "{total}단계 중 {current}단계",
  "naturalization.progress.step1": "기본 정보",
  "naturalization.progress.step2": "가족 관계",
  "naturalization.progress.step3": "결과",
  "naturalization.actions.next": "다음",
  "naturalization.actions.back": "이전",
  "naturalization.actions.seeResult": "결과 보기",
  "naturalization.actions.restart": "다시 시작",
  "naturalization.option.yes": "예",
  "naturalization.option.no": "아니요",
  "naturalization.option.unsure": "잘 모르겠어요",
  "naturalization.step1.title": "기본 정보",
  "naturalization.step1.description":
    "이 정보를 바탕으로 자격 시점과 일정을 추정해요.",
  "naturalization.step1.field.nationality": "국적",
  "naturalization.step1.field.nationalityPlaceholder": "예: 미국",
  "naturalization.step1.field.age": "나이",
  "naturalization.step1.field.currentVisa": "현재 비자",
  "naturalization.step1.field.entryDate": "한국 입국일",
  "naturalization.step1.field.entryDateHint":
    "현재 체류 트랙으로 한국에 처음 입국한 날짜를 입력하세요.",
  "naturalization.step1.field.continuousResidence": "연속 체류 여부",
  "naturalization.step1.field.continuousResidenceHint":
    "한국에서 장기간 출국 없이 연속해서 체류하셨나요?",
  "naturalization.step2.title": "가족 관계",
  "naturalization.step2.description":
    "가족 관계는 간이귀화와 특별귀화 자격에 영향을 줍니다.",
  "naturalization.step2.q1.title": "배우자가 한국인인가요?",
  "naturalization.step2.q1.marriageYears": "혼인 기간 (년)",
  "naturalization.step2.q1.marriageYearsHint":
    "결혼한 햇수를 입력하세요. 소수점도 가능합니다 (예: 1.5).",
  "naturalization.step2.q2.title": "부모 중 한국 국적자가 있나요?",
  "naturalization.step2.q2.whichParent": "어느 분이신가요?",
  "naturalization.step2.q2.father": "아버지",
  "naturalization.step2.q2.mother": "어머니",
  "naturalization.step2.q2.both": "두 분 모두",
  "naturalization.result.summaryEyebrow": "입력하신 답변 기준",
  "naturalization.result.summaryTitle": "현재 상태 요약",
  "naturalization.result.summarySubtitle":
    "가능성 있는 귀화 유형, 준비할 항목, 주의할 위험을 정리했어요.",
  "naturalization.result.disclaimer":
    "본 화면은 참고용 안내일 뿐이며, 실제 신청 전 HiKorea 또는 변호사를 통해 반드시 확인하세요.",
  "naturalization.result.entryDateMissing":
    "더 정확한 일정을 보려면 1단계에서 입국일을 입력하세요.",
  "naturalization.result.types.eyebrow": "귀화 가능 유형",
  "naturalization.result.types.title": "당신에게 가능한 트랙",
  "naturalization.result.types.general.title": "일반귀화",
  "naturalization.result.types.general.description":
    "5년 이상 연속 체류와 현재 F-5 영주 자격이 필요한 트랙.",
  "naturalization.result.types.simplified.title": "간이귀화",
  "naturalization.result.types.simplified.description":
    "한국인 배우자와의 혼인 또는 3년 이상 체류와 강한 지역 연결을 요구하는 트랙.",
  "naturalization.result.types.special.title": "특별귀화",
  "naturalization.result.types.special.description":
    "한국인 부모가 있거나 그 외 특별한 자격이 인정되는 트랙.",
  "naturalization.badge.green": "가능성 높음",
  "naturalization.badge.yellow": "추가 조건 필요",
  "naturalization.badge.red": "현재 어려움",
  "naturalization.result.checklist.eyebrow": "체크리스트",
  "naturalization.result.checklist.title": "충족 항목과 부족 항목",
  "naturalization.result.checklist.continuousResidence": "한국 연속 체류",
  "naturalization.result.checklist.fiveYears": "한국 거주 5년 이상",
  "naturalization.result.checklist.threeYears": "한국 거주 3년 이상",
  "naturalization.result.checklist.f5": "F-5 영주 자격 보유",
  "naturalization.result.checklist.koreanSpouse": "한국인 배우자",
  "naturalization.result.checklist.marriageDuration": "혼인 2년 이상",
  "naturalization.result.checklist.koreanParent": "한국인 부모",
  "naturalization.result.checklist.adultAge": "성년 연령 (19세 이상)",
  "naturalization.result.checklist.status.met": "충족",
  "naturalization.result.checklist.status.partial": "부분 충족",
  "naturalization.result.checklist.status.notMet": "미충족",
  "naturalization.result.actions.eyebrow": "추천 액션 플랜",
  "naturalization.result.actions.title": "다음 단계 제안",
  "naturalization.result.actions.acquireF5": "F-5 영주권 취득",
  "naturalization.result.actions.acquireF5Description":
    "일반귀화 신청 전 F-5 영주 자격에 필요한 점수와 서류를 미리 준비하세요.",
  "naturalization.result.actions.completeKiip": "KIIP 이수",
  "naturalization.result.actions.completeKiipDescription":
    "KIIP 5단계까지 이수하면 사회통합 요건을 충족할 수 있습니다.",
  "naturalization.result.actions.gatherSpouseDocs": "혼인 및 공동 생활 서류 준비",
  "naturalization.result.actions.gatherSpouseDocsDescription":
    "혼인관계증명서, 공동 통장, 주민등록등본, 사진 등 진정한 부부 생활을 입증할 자료를 모으세요.",
  "naturalization.result.actions.gatherFamilyRegistry":
    "한국인 부모의 가족관계 서류 준비",
  "naturalization.result.actions.gatherFamilyRegistryDescription":
    "한국인 부모의 기본증명서와 가족관계증명서는 특별귀화에서 핵심 서류입니다.",
  "naturalization.result.actions.submitApplication": "귀화 신청 제출",
  "naturalization.result.actions.submitApplicationDescription":
    "필요 서식, 수수료, 증빙 서류를 갖춰 출입국·외국인청에 신청서를 접수하세요.",
  "naturalization.result.actions.prepareInterview": "면접 준비",
  "naturalization.result.actions.prepareInterviewDescription":
    "한국어 회화, 기본 시민 상식, 가족 사정 질문에 답할 수 있도록 일정 전 충분히 연습하세요.",
  "naturalization.result.risks.eyebrow": "예상 리스크",
  "naturalization.result.risks.title": "지연을 부를 수 있는 요소",
  "naturalization.result.risks.absences.title": "장기 해외체류 이력",
  "naturalization.result.risks.absences.description":
    "6개월 이상 출국이 있을 경우 연속 체류가 끊겨 기간이 다시 계산될 수 있습니다.",
  "naturalization.result.risks.taxArrears.title": "세금·과태료 체납 가능성",
  "naturalization.result.risks.taxArrears.description":
    "체납 세금, 건강보험료, 과태료가 있다면 귀화 신청 전에 모두 정리해야 합니다.",
  "naturalization.result.risks.marriageAuthenticity.title": "혼인 진정성 심사",
  "naturalization.result.risks.marriageAuthenticity.description":
    "혼인 기반 신청은 추가 심사가 진행되므로 진정한 부부 생활을 입증할 자료를 충실히 준비하세요.",
  "community.fields.language": "글 작성 언어",
  "community.language.ko": "한국어",
  "community.language.en": "영어",
  "community.language.zh": "중국어",
  "community.scrap.add": "스크랩하기",
  "community.scrap.remove": "스크랩 해제",
} satisfies Record<TranslationKey, string>;

const zh = {
  // header
  "header.brand.subtitle": "您的本地生活向导",
  "header.nav.discover": "探索支持",
  "header.nav.visa": "签证展望",
  "header.nav.health": "健康与休闲",
  "header.nav.checklists": "清单",
  "header.nav.faq": "常见问题",
  "header.nav.community": "社区",
  "header.nav.chat": "AI 咨询",
  "header.cta.setProfile": "设置个人资料",
  "header.cta.myPage": "我的",
  "header.language.label": "语言",

  "seo.title": "nabi：为在韩国的外国居民服务",
  "seo.description":
    "nabi 帮助在韩外国居民查找签证、本地服务、医疗、休闲、社区信息和实用生活支持。",

  "common.notProvided": "未填写",
  "common.update": "更新",
  "common.back": "返回",
  "common.loading": "加载中...",
  "common.asking": "正在询问...",
  "common.askNari": "向 nabi 提问",
  "common.answer": "回答",
  "common.results": "{city} 的 {count} 条结果",

  "home.heroBadge": "为在韩国生活的外国人而设",
  "home.heroTitle": "在生活变得复杂之前找到对的帮助。",
  "home.heroSubtitle":
    "nabi 是一个帮助在韩外国人根据所在城市与个人状况，找到政府支持、医疗、住房、教育与签证手续信息的平台。",
  "home.heroPrimaryCta": "开始查找支持",
  "home.heroSecondaryCta": "向 AI 顾问提问",

  "home.servicesEyebrow": "筛选目录",
  "home.servicesTitle": "按情境查找所需帮助",
  "home.servicesSubtitle":
    "基于 Supabase 存储机构、项目、地区、语言、费用与申请条件，并通过自定义筛选器进行检索。",
  "home.service.government.title": "政府帮助",
  "home.service.government.label": "公共支持",
  "home.service.government.desc":
    "查找附近的行政福利中心、多文化家庭支援中心、口译咨询及紧急福利支援。",
  "home.service.health.title": "健康与保健",
  "home.service.health.label": "医疗",
  "home.service.health.desc":
    "可接待外国人的医院、保健所、保险指南，以及泳池和体育设施等日常健康信息。",
  "home.service.housing.title": "住房与文件",
  "home.service.housing.label": "住房",
  "home.service.housing.desc":
    "逐步指引租赁合约、迁入申报、签证延期及所需文件与办理地点。",
  "home.service.language.title": "语言与文化",
  "home.service.language.label": "教育",
  "home.service.language.desc":
    "推荐韩语课程、文化教育、社区活动以及各地区的免费项目。",

  "home.faqs.0": "在首尔的外国人可以在哪里获得免费咨询？",
  "home.faqs.1": "延长居留前需要准备哪些文件？",
  "home.faqs.2": "没加入韩国健康保险时可以去哪些医院？",

  "home.communityEyebrow": "社区",
  "home.communityTitle": "向身边的人请教",
  "home.communityDescription":
    "同城的外国人可以在这里分享就医经历、行政中心走访体验、推荐的韩语课程以及移民流程的实用建议。",
  "home.faqEyebrow": "常见问题",
  "home.faqDescription":
    "可以扩展为：根据您的地区、签证状态、语言与保险情况，同时呈现官方机构与社区的回答。",
  "home.aiEyebrow": "AI 助手",
  "home.aiTitle": "用您自己的话提问",
  "home.aiDescription":
    "已准备好 ChatGPT 路由——例如 \"我住在首尔，需要延长签证\" 这样的问题，将给出清单与对应机构指引。",

  // 签证提醒
  "home.visaAlert.eyebrow": "签证状态更新",
  "home.visaAlert.body":
    "您的居留许可将在 {days} 天后到期。根据已保存的档案，您可以同时查看续签步骤与 F-2-7 等长期路径。",
  "home.visaAlert.bodyFallback":
    "在入门设置中填写签证到期日，即可看到实时倒计时与定制续签提示。",
  "home.visaAlert.cta": "打开锁屏样例",

  // 在韩生活
  "home.life.0.eyebrow": "落地生活",
  "home.life.0.caption": "让韩国成为像家一样的地方。",
  "home.life.0.alt": "在光化门一起合影的朋友们",
  "home.life.1.eyebrow": "工作成长",
  "home.life.1.caption": "用属于你的方式打造职业生涯。",
  "home.life.1.alt": "在江南街头走路的年轻职场人",
  "home.life.2.eyebrow": "学习",
  "home.life.2.caption": "按自己的节奏掌握韩语。",
  "home.life.2.alt": "在韩语学院一起学习的学生们",

  // 项目浏览
  "home.explorerEyebrow": "立即体验",
  "home.explorerTitle": "按你当前的情境筛选项目。",
  "home.explorerDescription": "选择符合你状态的标签，立即查看附近真实可用的项目。",

  // 健康与休闲
  "home.health.eyebrow": "健康与休闲",
  "home.health.title": "比较各区的公共健身房、泳池及首次入场规则。",
  "home.health.description":
    "外国人登录证要求、居民优惠价格、本地卡支付说明、室内鞋规则，以及前台沟通用韩语句子，一次了解。",
  "home.health.cta": "探索设施",

  // 签证页面
  "visa.eyebrow": "签证 Horizon",
  "visa.title": "今天续签，规划下一步身份。",
  "visa.subtitle": "同一界面查看眼前的续签准备与长期 F-2-7 规划。",
  "visa.replayNotification": "重播通知",
  "visa.quickEdit.eyebrow": "个人档案",
  "visa.quickEdit.title": "签证类型与到期日",
  "visa.quickEdit.description":
    "与入门设置中的字段相同。签证类型用于仪表盘文案，到期日用于首页提醒与续签卡片的剩余天数。",
  "visa.quickEdit.save": "保存",
  "visa.quickEdit.saved": "已保存。重新打开首页或锁屏预览即可看到更新后的文案。",
  "visa.quickEdit.fullProfile": "前往完整入门设置（城市、TOPIK、区等）→",
  "visa.edit.back": "返回 Discover（签证标签）",
  "visa.edit.open": "修改签证信息",
  "visa.profileSummary.title": "已保存的签证信息",
  "visa.profileSummary.description":
    "这些信息用于续签倒计时与签证仪表盘文案。可在下一页编辑。",
  "visa.horizonTrack": "Horizon 轨道",
  "visa.fromTo": "{current} 到 {target}",
  "visa.horizonDescription":
    "您的 F-2-7 模拟分数已经接近。这些方案帮助您补足剩余分数。",
  "visa.daysUntilCheckpoint": "距续签节点还有 {days} 天",
  "visa.estimatedUnlock": "预计达成时间",
  "visa.daysShort": "{days} 天",
  "visa.ofPoints": "/ {target} 分",
  "visa.bridgeHeadline":
    "Horizon：按您当前的学业路径，若在未来 {days} 天内再获得 {points} 分，就有望达到 F-2-7 的完整资格线。",

  // 续签清单
  "visa.renewal.eyebrow": "续签轨道",
  "visa.renewal.title": "在期限前保持您的 {current} 身份。",
  "visa.renewal.description":
    "nabi 根据已保存的签证、地区、教育档案，生成实用的出入境访问清单。",
  "visa.renewal.primaryCta": "前往当前签证续签清单",
  "visa.renewal.steps.0": "在续签窗口被订满之前，先到 HiKorea 预约。",
  "visa.renewal.steps.1": "准备护照、外国人登录证、申请表、住所证明与手续费。",
  "visa.renewal.steps.2": "携带与当前签证匹配的在学或在职证明。",
  "visa.clock.label": "您的签证倒计时",
  "visa.clock.daysLeft": "剩余 {days} 天",
  "visa.clock.expiryNotSet": "未设置到期日",
  "visa.clock.checkExpiry": "请确认到期日",
  "visa.clock.expiry": "到期日",
  "visa.clock.notProvided": "未填写",
  "visa.clock.district": "居住区",
  "visa.clock.notSelected": "未选择",
  "visa.clock.profileBasis": "档案依据",

  // 策略选项
  "visa.strategy.points": "+{points} 分",
  "visa.strategy.status.available": "可获得",
  "visa.strategy.status.earned": "已获得",
  "visa.strategy.status.locked": "未达成",
  "visa.strategy.nextIntake": "下一次招生：{date}",
  "visa.strategy.openResource": "打开资源",

  // 签证通知页
  "visa.notification.label": "通知",
  "visa.notification.tapHint": "点击解锁您的 Visa Horizon",
  "visa.notification.dateLabel": "5 月 16 日 星期六",
  "visa.notification.brand": "nabi Visa Horizon",
  "visa.notification.title": "签证续签窗口即将开放",
  "visa.notification.body":
    "签证状态更新：您的居留许可将在 {days} 天后到期。请查看续签清单与长期居留规划。",
  "visa.notification.bodyFallback":
    "签证状态更新：请在档案中填写到期日以解锁个性化倒计时与后续步骤。",
  "visa.notification.timestamp": "刚刚",

  // 生物识别
  "visa.biometric.brand": "nabi 安全通行",
  "visa.biometric.status": "正在确认身份",
  "visa.biometric.note": "正在使用保存的档案为您打开签证仪表盘。",

  // 健康与休闲页面
  "health.eyebrow": "健康与休闲",
  "health.title": "找到外国人更容易加入的公共体育设施。",
  "health.subtitle":
    "按运动项目、营业时间、月费、首次入场所需手续等维度比较各类设施。",

  "health.openNow": "营业中",
  "health.closed": "已闭馆",
  "health.closedNow": "目前已闭馆",
  "health.monthlyRate": "公共月费",
  "health.residentDiscount": "居民优惠：需外国人登录证",

  "health.map.eyebrow": "街区地图",
  "health.map.title": "各设施所在区域",
  "health.map.subtitle":
    "点击编号可打开路线。若设置了 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY，将优先加载可交互地图（需启用 Maps JavaScript API 并开通结算）；失败则尝试静态图（Maps Static API），再退回 OpenStreetMap。",
  "health.map.alt": "首尔周边运动休闲设施地图预览",
  "health.map.aria": "休闲设施地图",
  "health.map.iframeTitle": "首尔设施位置 OpenStreetMap 预览",
  "health.map.staticMapFallbackNote":
    "无法加载 Google 地图图片。请在 Google Cloud 控制台为该密钥启用“Maps Static API”（仅启用 JavaScript API 时静态图请求会被拒绝），并确认已关联结算、HTTP 来源限制允许 localhost。改为显示 OpenStreetMap。",
  "health.map.jsFallbackNote":
    "无法加载可交互 Google 地图。请确认已启用 Maps JavaScript API、已开通结算，且来源限制允许当前站点。将尝试静态地图图片。",

  "health.facility.scale.municipal": "市级综合馆",
  "health.facility.scale.boutique": "社区精品馆",

  // 设施列表
  "health.list.eyebrow": "按区距离排序",
  "health.list.sortedFrom": "以 {district} 为起点",
  "health.list.updateDistrict": "更换地区",
  "health.list.distance": "{km} 公里",

  // 设施详情
  "health.detail.back": "返回健康与休闲",
  "health.detail.intro":
    "可进行自由泳、一般力量训练与室内健身的公共体育中心，本地居民月费约 4–5 万韩元。",
  "health.detail.sports": "可用项目",
  "health.detail.pricing": "月度费用",
  "health.detail.showKoreanReception": "向前台出示韩语",
  "health.detail.saveFacility": "保存到我的档案",
  "health.detail.savedFacility": "已保存",

  "health.indoorShoe.eyebrow": "室内鞋提示",
  "health.indoorShoe.title": "运动区域禁止穿室外鞋进入",
  "health.indoorShoe.body":
    "请另备一双干净的运动鞋，在更衣室更换后再进入训练区。一般情况下室内外鞋需分开。",

  // 项目
  "health.sport.swimming": "自由泳",
  "health.sport.weights": "一般力量训练",
  "health.sport.yoga": "瑜伽",
  "health.sport.fitness": "室内健身",
  "health.sport.court": "场地球类",

  // 加入要求
  "health.requirements.eyebrow": "加入要求",
  "health.requirements.title": "排队前先备齐这些",
  "health.requirements.arc": "需外国人登录证：",
  "health.requirements.arcDesc": "出示外国人登录证可享本地居民优惠。",
  "health.requirements.payment": "支付方式：",
  "health.requirements.paymentSuffix": "公共中心可能更倾向于韩国本地卡。",
  "health.requirements.indoorShoes": "室内鞋：",
  "health.requirements.indoorShoesYes": "请准备健身房专用的干净室内鞋。",
  "health.requirements.indoorShoesNo": "请向前台确认是否需要单独室内鞋。",
  "health.payment.cash": "现金",
  "health.payment.foreign": "境外卡",
  "health.payment.local": "韩国本地卡",

  // 首次入场
  "health.firstVisit.eyebrow": "首次入场指引",
  "health.firstVisit.title": "前台沟通脚本",
  "health.firstVisit.steps.0":
    "1. 在前台营业时间到达，如有取号机请先取号。",
  "health.firstVisit.steps.1":
    "2. 出示外国人登录证，并在付款前请求居民优惠。",
  "health.firstVisit.steps.2":
    "3. 确认游泳道或健身时段，并询问室内鞋存放位置。",
  "health.firstVisit.openModal": "打开韩语前台文本",
  "health.firstVisit.modalEyebrow": "前台",
  "health.firstVisit.modalTitle": "请出示这句话",
  "health.firstVisit.close": "关闭",

  // 韩语卡
  "health.shield.label": "请直接出示这段韩语",
  "health.shield.note": "保留韩语原文，让前台人员可直接阅读。",
  "health.shield.copy": "复制韩语",

  "explorer.title": "个性化搜索",
  "explorer.cityChip": "首尔",
  "explorer.programs.0.title": "首尔全球中心",
  "explorer.programs.0.category": "政府帮助",
  "explorer.programs.0.desc":
    "提供外国人生活咨询、签证基础指引、行政流程及口译对接信息。",
  "explorer.programs.1.title": "公共保健所",
  "explorer.programs.1.category": "健康与保健",
  "explorer.programs.1.desc":
    "提供疫苗接种、健康检查、保健咨询等当地保健所可办理的服务信息。",
  "explorer.programs.2.title": "租房合约清单",
  "explorer.programs.2.category": "住房与文件",
  "explorer.programs.2.desc":
    "整理签订月租前需确认的事项、迁入申报、确定日期及押金保护流程。",
  "explorer.programs.3.title": "韩语课程查询",
  "explorer.programs.3.category": "语言与文化",
  "explorer.programs.3.desc":
    "查找多文化中心和区厅运营的免费或低价韩语课程。",
  "explorer.empty":
    "暂无符合条件的示例。请减少筛选条件，或等待 Supabase 添加更多数据。",

  "chatPreview.label": "nabi AI",
  "chatPreview.defaultMessage": "我住在首尔，需要医疗与签证延期方面的帮助。",
  "chatPreview.defaultReply":
    "我可以帮您准备走访清单，找到附近的公共机构，比较免费支持项目，并指出向官方机构需要确认的事项。",
  "chatPreview.button": "向 nabi 提问",

  "onboarding.eyebrow": "个人设置",
  "onboarding.title": "请告诉 nabi 您的所在地与所需帮助。",
  "onboarding.subtitle":
    "您填写的城市、签证状态、是否多文化家庭、年龄段及签证到期日，将作为搜索、清单、社区与 AI 回答的基本上下文。",
  "onboarding.cityTitle": "您在哪个城市？",
  "onboarding.cityDescription":
    "我们以您的城市为基础，优先呈现附近的公共机构、医疗、教育与社区信息。",
  "onboarding.cityUseLocation": "使用我的当前位置",
  "onboarding.locationStatus.initial":
    "您可以手动选择城市，或使用当前位置进行估算。",
  "onboarding.locationStatus.updated": "现在按 {city} 推荐信息。",
  "onboarding.locationStatus.checking": "正在确认您的当前位置...",
  "onboarding.locationStatus.inferred":
    "已根据当前位置估算为 {city}。如有需要可手动选择其他城市。",
  "onboarding.locationStatus.unsupported": "此浏览器不支持获取当前位置。",
  "onboarding.locationStatus.denied":
    "未能获取位置权限。请手动选择城市。",
  "onboarding.selectedCityLabel": "已选城市",
  "onboarding.selectedCityNote":
    "位置权限仅用于估算城市。我们不会保存精确坐标，仅按所选城市筛选公共机构与生活信息。",
  "onboarding.aboutTitle": "关于您",
  "onboarding.aboutDescription":
    "这些信息仅用于判断哪些类别（移民、医疗、劳动、教育等）对您更重要，以排序推荐。",
  "onboarding.educationTitle": "教育与签证进度",
  "onboarding.educationDescription":
    "这些信息会用于 F-2-7 展望追踪器，以及附近语言课程和学业节点建议。",
  "onboarding.field.preferredLanguage": "首选语言",
  "onboarding.field.nationality": "国籍",
  "onboarding.field.nationalityPlaceholder": "例如：越南、美国",
  "onboarding.field.ageGroup": "年龄段",
  "onboarding.field.gender": "性别",
  "onboarding.field.residency": "居留状态",
  "onboarding.field.housing": "居住情况",
  "onboarding.field.maritalStatus": "婚姻状况",
  "onboarding.field.employment": "就业",
  "onboarding.field.family": "家庭情况",
  "onboarding.field.hasVisa": "您目前是否持有签证？",
  "onboarding.field.multicultural": "是否为多文化家庭？",
  "onboarding.field.visaExpiry": "签证到期日",
  "onboarding.field.visaExpiryNote": "若没有签证或不确定，可以留空。",
  "onboarding.field.degreeLevel": "学历",
  "onboarding.field.topikLevel": "TOPIK 等级",
  "onboarding.field.kiipStage": "KIIP 阶段",
  "onboarding.field.currentVisaSubtype": "当前签证类型",
  "onboarding.field.district": "首尔区",
  "onboarding.submit": "保存并查看推荐",

  "option.age.under-18": "18 岁以下",
  "option.age.18-24": "18-24 岁",
  "option.age.25-34": "25-34 岁",
  "option.age.35-49": "35-49 岁",
  "option.age.50-plus": "50 岁以上",
  "option.gender.female": "女性",
  "option.gender.male": "男性",
  "option.gender.non-binary": "非二元",
  "option.gender.prefer-not-to-say": "不愿透露",
  "option.residency.new-arrival": "刚到韩国",
  "option.residency.short-term": "短期居留",
  "option.residency.long-term": "长期居留",
  "option.residency.permanent": "永久居民",
  "option.residency.considering-immigration": "考虑移民",
  "option.housing.renting": "租房",
  "option.housing.owning": "自有",
  "option.housing.dormitory": "宿舍",
  "option.housing.with-family": "与家人同住",
  "option.housing.looking": "正在找房",
  "option.marital.single": "单身",
  "option.marital.partnered": "同居",
  "option.marital.married": "已婚",
  "option.marital.divorced": "离异",
  "option.marital.widowed": "丧偶",
  "option.employment.student": "学生",
  "option.employment.employed-full-time": "全职",
  "option.employment.employed-part-time": "兼职",
  "option.employment.self-employed": "自营",
  "option.employment.job-seeking": "求职中",
  "option.employment.homemaker": "家庭主妇/夫",
  "option.employment.retired": "退休",
  "option.family.single-household": "单人家庭",
  "option.family.couple": "夫妻",
  "option.family.with-children": "有子女",
  "option.family.multicultural-family": "多文化家庭",
  "option.family.extended-family": "大家庭",
  "option.yesNo.yes": "是",
  "option.yesNo.no": "否",
  "option.yesNo.unsure": "不确定",
  "option.degree.none": "无学历",
  "option.degree.high-school": "高中",
  "option.degree.bachelor": "本科",
  "option.degree.master": "硕士",
  "option.degree.phd": "博士",
  "option.topik.none": "无 TOPIK",
  "option.topik.1": "TOPIK 1 级",
  "option.topik.2": "TOPIK 2 级",
  "option.topik.3": "TOPIK 3 级",
  "option.topik.4": "TOPIK 4 级",
  "option.topik.5": "TOPIK 5 级",
  "option.topik.6": "TOPIK 6 级",
  "option.kiip.none": "无 KIIP",
  "option.kiip.0": "KIIP 第 0 阶段",
  "option.kiip.1": "KIIP 第 1 阶段",
  "option.kiip.2": "KIIP 第 2 阶段",
  "option.kiip.3": "KIIP 第 3 阶段",
  "option.kiip.4": "KIIP 第 4 阶段",
  "option.kiip.5": "KIIP 第 5 阶段",
  "option.visaSubtype.D-2": "D-2 留学",
  "option.visaSubtype.D-10": "D-10 求职",
  "option.visaSubtype.E-7": "E-7 专业",
  "option.visaSubtype.F-2-7": "F-2-7 优秀人才",
  "option.visaSubtype.F-5": "F-5 永久居留",
  "option.visaSubtype.other": "其他",
  "option.visaSubtype.unsure": "不确定",
  "option.district.": "未选择",
  "option.district.마포구": "麻浦区",
  "option.district.성동구": "城东区",
  "option.district.강남구": "江南区",
  "option.district.종로구": "钟路区",
  "option.district.용산구": "龙山区",
  "option.district.기타": "其他首尔地区",

  "discover.eyebrow": "探索支持",
  "discover.title": "查找您身边可获得的公共帮助与本地服务。",
  "discover.subtitle":
    "按区与关注类别筛选政府支援、医疗、教育、交通、法律与劳动信息。",
  "discover.filtersLabel": "筛选",
  "discover.cityFieldLabel": "城市",
  "discover.categoriesFieldLabel": "类别",
  "discover.categoriesFieldDescription": "推荐类别会被特别标记。",
  "discover.recommendedBadge": "为您推荐",
  "discover.recommendedTitle": "基于您的资料的推荐",
  "discover.updateProfile": "更新资料",
  "discover.recommendedDescription":
    "以下类别根据您的签证、家庭、居住、就业和年龄等资料推荐。",
  "discover.whyTheseCategories": "为什么是这些类别？",
  "discover.noMatchingTitle": "暂无符合条件的项目",
  "discover.noMatchingHint":
    "请尝试减少类别或更新您的城市。后续可通过 Supabase 添加更多本地服务。",

  "discover.tabs.aria": "探索分区",
  "discover.tabs.support": "支持信息",
  "discover.tabs.visa": "签证",
  "discover.tabs.health": "健康与休闲",
  "discover.tabs.checklists": "清单",
  "discover.tabs.naturalization": "归化助手",

  "discover.detail.back": "返回探索支持",
  "discover.detail.whatToBring": "需要携带",
  "discover.detail.details": "详细信息",
  "discover.detail.languages": "可用语言",
  "discover.detail.contact": "联系方式",
  "discover.detail.updated": "最近更新",
  "discover.detail.beforeYouGo": "走访前请注意",
  "discover.detail.beforeYouGoDescription":
    "法律、签证、医疗与紧急事项会因个人情况而异。前往前请务必向官方机构确认。",
  "discover.detail.openOfficial": "打开官方网站",

  "googleMap.locationLabel": "位置",
  "googleMap.note":
    "我们不直接嵌入地图，仅提供位置确认链接。详细路线与周边信息请在 Google 地图中查看。",
  "googleMap.openMaps": "在 Google 地图中打开",

  "checklists.eyebrow": "清单",
  "checklists.title": "出门前先确认要准备的内容。",
  "checklists.subtitle": "逐步过一遍签证、医疗、金融、劳动等容易忽略的环节。",
  "checklists.empty": "此条件下暂无清单",

  "community.eyebrow": "社区",
  "community.title": "向附近的人请教经验。",
  "community.subtitle": "查找同地区的人分享的行政、医疗、课程与生活经验。",
  "community.filtersLabel": "我的社区筛选",
  "community.noLocalMatch": "暂无完全匹配的本地内容",
  "community.noLocalMatchHint": "为您显示其他城市的示例帖子。",
  "community.byAuthor": "作者：{name}",

  "community.detail.back": "返回社区",
  "community.detail.byAuthorUpdated": "作者 {name} · 更新于 {date}",
  "community.detail.safetyNote": "安全提示",
  "community.detail.safetyNoteDescription":
    "社区帖子是个人经验。法律、医疗、签证或紧急事项请向官方机构核实。",
  "community.detail.replies": "回复",

  "faq.eyebrow": "常见问题",
  "faq.title": "在韩生活的快速答案。",
  "faq.subtitle": "按所在区与关注类别搜索常见问题。",
  "faq.searchPlaceholder": "搜索常见问题...",

  "chat.eyebrow": "AI 助手",
  "chat.title": "带上您的城市与签证背景一起提问。",
  "chat.subtitle":
    "我们会附带您在引导设置中保存的城市、语言、签证状态、多文化家庭信息、年龄段和签证到期日，以提供更个性化的建议。",
  "chat.profileContext": "个人资料背景",
  "chat.field.city": "城市",
  "chat.field.language": "语言",
  "chat.field.nationality": "国籍",
  "chat.field.ageGroup": "年龄段",
  "chat.field.residency": "居留",
  "chat.field.housing": "住房",
  "chat.field.employment": "就业",
  "chat.field.family": "家庭",
  "chat.field.visa": "签证",
  "chat.field.visaExpiry": "签证到期日",
  "chat.recommendedCategories": "推荐类别",
  "chat.askLabel": "向 nabi 提问",
  "chat.button": "结合我的资料提问",
  "chat.defaultMessage": "我想找一找附近可以获得的支持。",
  "chat.defaultReply":
    "向 nabi 询问您的城市、签证时间、医疗、住房、就业或家庭支援。",
  "chat.networkError": "出现网络错误，请稍后重试。",
  "chat.unanswered": "未能生成回答，请尝试更具体地描述您的问题。",
  "chat.missingApiKey":
    "尚未设置 OPENAI_API_KEY。请在 .env.local 或 Vercel 中添加密钥以启用 AI 咨询。",

  "category.education-skill-building": "教育与技能",
  "category.safety-healthcare": "安全与医疗",
  "category.sports-recreation": "运动与休闲",
  "category.citizenship": "居留与国籍",
  "category.finances-spending": "财务与消费",
  "category.transport": "交通",
  "category.labour-employment": "劳动与就业",
  "category.legal": "法律",

  "city.서울시": "首尔",
  "city.천안시": "天安",
  "city.부산시": "釜山",
  "city.인천시": "仁川",
  "city.수원시": "水原",
  "city.대전시": "大田",

  "language.English": "英语",
  "language.Korean": "韩语",
  "language.Chinese": "中文",
  "language.Vietnamese": "越南语",
  "language.Japanese": "日语",
  "language.Thai": "泰语",

  "cost.free": "免费",
  "cost.low": "低价",
  "cost.paid": "付费",

  "chip.visa": "签证",
  "chip.healthcare": "医疗",
  "chip.housing": "住房",
  "chip.education": "教育",
  "chip.free": "免费",
  "chip.english": "英语支持",

  // auth
  "auth.signIn": "登录",
  "auth.signUp": "注册",
  "auth.signOut": "退出登录",
  "auth.email": "邮箱",
  "auth.password": "密码",
  "auth.displayName": "显示名称",
  "auth.signInTitle": "欢迎回来",
  "auth.signInSubtitle": "登录后即可在社区发帖与回复。",
  "auth.signUpTitle": "创建账户",
  "auth.signUpSubtitle": "只需一分钟。您填写的名称将显示在社区帖子中。",
  "auth.noAccount": "还没有账户？",
  "auth.haveAccount": "已经有账户？",
  "auth.signInCta": "登录",
  "auth.signUpCta": "创建账户",
  "auth.signingIn": "登录中...",
  "auth.signingUp": "创建账户中...",
  "auth.notConfigured":
    "未配置身份验证。请在 .env.local 中设置 NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY。",
  "auth.confirmEmail": "请到邮箱确认您的邮件，然后回来登录。",
  "auth.greeting": "你好，{name}",
  "auth.requiredToWrite": "登录后即可分享您的经验",
  "auth.requiredToReply": "登录后即可发表回复",

  "me.eyebrow": "我的",
  "me.title": "你好，{name}",
  "me.subtitle": "在一处管理您的资料和账户。",
  "me.profile.title": "资料概览",
  "me.profile.description": "nabi 的所有推荐都基于这些信息，随时可以更新。",
  "me.profile.city": "所在城市",
  "me.profile.visa": "当前签证",
  "me.profile.residency": "居留状态",
  "me.profile.family": "家庭情况",
  "me.profile.empty": "未设置",
  "me.actions.editProfile": "编辑资料",
  "me.actions.signOut": "退出登录",
  "me.profileEditor.close": "关闭编辑",
  "me.profileEditor.openFullPage": "打开完整入门设置页",
  "me.profileEditor.sectionTitle": "编辑已保存资料",
  "me.profileEditor.sectionDescription":
    "与 /onboarding 相同：城市、签证、TOPIK、KIIP、居住区等。保存到本浏览器 localStorage。",
  "me.profileEditor.save": "保存资料",
  "me.profileEditor.cancel": "取消",
  "me.savedFacilities.eyebrow": "已保存地点",
  "me.savedFacilities.title": "健康与休闲收藏",
  "me.savedFacilities.description": "在去前台或办卡前收藏的设施。",
  "me.savedFacilities.empty": "尚无保存的设施。请在设施详情页点击保存。",
  "me.savedFacilities.cta": "浏览设施",
  "me.notSignedIn.title": "请登录后查看您的页面。",
  "me.notSignedIn.subtitle": "登录或注册以查看您的资料。",
  "me.notSignedIn.signIn": "登录",
  "me.notSignedIn.signUp": "注册",
  "me.sections.tabs.aria": "我的内容",
  "me.sections.tabs.posts": "我的帖子",
  "me.sections.tabs.replies": "我的回复",
  "me.sections.tabs.scraps": "收藏",
  "me.sections.posts.empty": "您还没有发布帖子。",
  "me.sections.posts.cta": "写第一篇帖子",
  "me.sections.replies.empty": "您还没有发表回复。",
  "me.sections.replies.onPost": "帖子：{title}",
  "me.sections.scraps.empty": "您还没有收藏任何帖子。",

  // community write / replies
  "community.writePost": "发帖",
  "community.writeBack": "返回社区",
  "community.writeTitle": "分享对您有帮助的经验",
  "community.writeSubtitle": "把在韩生活中获得的经验分享给大家。帖子会公开显示。",
  "community.fields.title": "标题",
  "community.fields.titlePlaceholder": "您学到了什么？",
  "community.fields.body": "正文",
  "community.fields.bodyPlaceholder": "分享有用的步骤、所需材料或小贴士。",
  "community.fields.category": "类别",
  "community.fields.city": "城市",
  "community.fields.author": "显示名称",
  "community.fields.authorPlaceholder": "希望以什么名字显示？",
  "community.publish": "发布帖子",
  "community.publishing": "发布中...",
  "community.userPostsHeading": "来自社区",
  "community.userPostBadge": "会员帖子",
  "community.empty": "暂无社区帖子，欢迎您发布第一条。",
  "community.detail.replyPlaceholder": "分享对您有帮助的内容或继续追问。",
  "community.detail.postReply": "发布回复",
  "community.detail.posting": "发布中...",
  "community.detail.repliesCount": "{count} 条回复",
  "community.detail.byAuthorOn": "作者 {name} · {date}",
  "community.fields.language": "帖子语言",
  "community.language.ko": "韩语",
  "community.language.en": "英语",
  "community.language.zh": "中文",
  "community.scrap.add": "收藏帖子",
  "community.scrap.remove": "取消收藏",

  // 归化助手
  "naturalization.eyebrow": "归化助手",
  "naturalization.title": "规划你通往韩国国籍的路径。",
  "naturalization.subtitle":
    "回答几个简单问题，了解哪种归化途径适合你、还需要准备什么、以及可能存在的风险。",
  "naturalization.wizard.aria": "归化助手向导",
  "naturalization.progress.label": "第 {current} 步 / 共 {total} 步",
  "naturalization.progress.step1": "基本信息",
  "naturalization.progress.step2": "家庭关系",
  "naturalization.progress.step3": "结果",
  "naturalization.actions.next": "下一步",
  "naturalization.actions.back": "上一步",
  "naturalization.actions.seeResult": "查看结果",
  "naturalization.actions.restart": "重新开始",
  "naturalization.option.yes": "是",
  "naturalization.option.no": "否",
  "naturalization.option.unsure": "不确定",
  "naturalization.step1.title": "基本信息",
  "naturalization.step1.description":
    "我们将根据这些信息估算你的资格时间表。",
  "naturalization.step1.field.nationality": "国籍",
  "naturalization.step1.field.nationalityPlaceholder": "例如：美国",
  "naturalization.step1.field.age": "年龄",
  "naturalization.step1.field.currentVisa": "当前签证",
  "naturalization.step1.field.entryDate": "入境韩国日期",
  "naturalization.step1.field.entryDateHint":
    "请填写当前居留途径下首次进入韩国的日期。",
  "naturalization.step1.field.continuousResidence": "连续居住情况",
  "naturalization.step1.field.continuousResidenceHint":
    "你是否在韩国连续居住，没有长时间出境？",
  "naturalization.step2.title": "家庭关系",
  "naturalization.step2.description":
    "家庭关系会影响简易归化和特别归化的资格。",
  "naturalization.step2.q1.title": "你的配偶是韩国人吗？",
  "naturalization.step2.q1.marriageYears": "婚姻年数",
  "naturalization.step2.q1.marriageYearsHint":
    "请填写已婚年数，可填小数（例如 1.5）。",
  "naturalization.step2.q2.title": "父母中是否有韩国国籍者？",
  "naturalization.step2.q2.whichParent": "哪一位？",
  "naturalization.step2.q2.father": "父亲",
  "naturalization.step2.q2.mother": "母亲",
  "naturalization.step2.q2.both": "父母双方",
  "naturalization.result.summaryEyebrow": "基于你的回答",
  "naturalization.result.summaryTitle": "当前情况一览",
  "naturalization.result.summarySubtitle":
    "可能的归化途径、需要准备的内容以及需要注意的风险。",
  "naturalization.result.disclaimer":
    "本页面仅供参考，请通过 HiKorea 或专业律师确认实际情况。",
  "naturalization.result.entryDateMissing":
    "请在第 1 步填写入境日期，以获得更准确的时间估算。",
  "naturalization.result.types.eyebrow": "归化类型",
  "naturalization.result.types.title": "可能适用于你的途径",
  "naturalization.result.types.general.title": "一般归化",
  "naturalization.result.types.general.description":
    "需要在韩连续居住 5 年以上，并已持有 F-5 永久居留资格。",
  "naturalization.result.types.simplified.title": "简易归化",
  "naturalization.result.types.simplified.description":
    "与韩国国民结婚，或在韩居住 3 年以上并具有较强的本地联系。",
  "naturalization.result.types.special.title": "特别归化",
  "naturalization.result.types.special.description":
    "拥有韩国国籍的父母，或满足其他特别资格条件。",
  "naturalization.badge.green": "可能性高",
  "naturalization.badge.yellow": "需补充条件",
  "naturalization.badge.red": "当前较难",
  "naturalization.result.checklist.eyebrow": "资格清单",
  "naturalization.result.checklist.title": "已满足与未满足的条件",
  "naturalization.result.checklist.continuousResidence": "在韩连续居住",
  "naturalization.result.checklist.fiveYears": "在韩居住满 5 年以上",
  "naturalization.result.checklist.threeYears": "在韩居住满 3 年以上",
  "naturalization.result.checklist.f5": "持有 F-5 永久居留资格",
  "naturalization.result.checklist.koreanSpouse": "韩国籍配偶",
  "naturalization.result.checklist.marriageDuration": "结婚 2 年以上",
  "naturalization.result.checklist.koreanParent": "韩国籍父母",
  "naturalization.result.checklist.adultAge": "成年年龄（19 岁以上）",
  "naturalization.result.checklist.status.met": "已满足",
  "naturalization.result.checklist.status.partial": "部分满足",
  "naturalization.result.checklist.status.notMet": "未满足",
  "naturalization.result.actions.eyebrow": "推荐行动方案",
  "naturalization.result.actions.title": "建议的下一步",
  "naturalization.result.actions.acquireF5": "获取 F-5 永久居留资格",
  "naturalization.result.actions.acquireF5Description":
    "在申请一般归化前，先积累 F-5 永久居留所需的积分与材料。",
  "naturalization.result.actions.completeKiip": "完成 KIIP 课程",
  "naturalization.result.actions.completeKiipDescription":
    "完成 KIIP 第 5 阶段后，可满足社会融合的要求。",
  "naturalization.result.actions.gatherSpouseDocs": "整理婚姻与共同生活材料",
  "naturalization.result.actions.gatherSpouseDocsDescription":
    "结婚证、共同账户、住民登录誊本、共同生活照片等，均可证明真实的婚姻生活。",
  "naturalization.result.actions.gatherFamilyRegistry":
    "整理韩国父母的家族关系材料",
  "naturalization.result.actions.gatherFamilyRegistryDescription":
    "韩国籍父母的基本证明书与家族关系证明书是特别归化的关键材料。",
  "naturalization.result.actions.submitApplication": "提交归化申请",
  "naturalization.result.actions.submitApplicationDescription":
    "携带所需表格、费用和证明材料前往出入境·外国人厅提交申请。",
  "naturalization.result.actions.prepareInterview": "准备面试",
  "naturalization.result.actions.prepareInterviewDescription":
    "面试前练习韩语会话、基本公民常识，并准备好家庭情况相关问题的回答。",
  "naturalization.result.risks.eyebrow": "潜在风险",
  "naturalization.result.risks.title": "可能拖慢进度的因素",
  "naturalization.result.risks.absences.title": "长期离境韩国",
  "naturalization.result.risks.absences.description":
    "单次离境超过 6 个月可能中断连续居住，导致居住年限重新计算。",
  "naturalization.result.risks.taxArrears.title": "可能存在税款或罚款欠缴",
  "naturalization.result.risks.taxArrears.description":
    "未缴清的税款、健康保险费或罚款必须在归化申请前结清。",
  "naturalization.result.risks.marriageAuthenticity.title": "婚姻真实性审查",
  "naturalization.result.risks.marriageAuthenticity.description":
    "基于婚姻的归化会受到额外审查，请妥善保存真实婚姻生活的证据。",
} satisfies Record<TranslationKey, string>;

const dictionaries: Record<Locale, Record<TranslationKey, string>> = { en, ko, zh };

const warnedMissingKeys = new Set<string>();

function warnMissingKey(locale: Locale, key: string) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  const fingerprint = `${locale}::${key}`;
  if (warnedMissingKeys.has(fingerprint)) {
    return;
  }
  warnedMissingKeys.add(fingerprint);
  console.warn(
    `[i18n] Missing translation key "${key}" for locale "${locale}". Falling back to English.`,
  );
}

function applyValues(
  template: string,
  values?: Record<string, string | number>,
): string {
  if (!values) {
    return template;
  }
  return Object.entries(values).reduce((output, [name, value]) => {
    return output.replace(new RegExp(`\\{${name}\\}`, "g"), String(value));
  }, template);
}

export function translate(
  locale: Locale,
  key: TranslationKey,
  values?: Record<string, string | number>,
): string {
  const template = dictionaries[locale]?.[key] ?? dictionaries.en[key];
  return applyValues(template, values);
}

/**
 * Escape hatch for keys that can only be known at runtime (DB codes,
 * computed paths, etc.). Prefer the typed helpers (`translate`, `translateOption`)
 * whenever the key is known statically.
 */
export function translateDynamic(
  locale: Locale,
  key: string,
  values?: Record<string, string | number>,
): string {
  const dict = dictionaries[locale] as unknown as Record<string, string | undefined>;
  const fallback = dictionaries.en as unknown as Record<string, string | undefined>;
  const template = dict[key] ?? fallback[key];

  if (template === undefined) {
    warnMissingKey(locale, key);
    return key;
  }

  return applyValues(template, values);
}

export function translateCity(locale: Locale, city: City): string {
  return translate(locale, `city.${city}` as TranslationKey);
}

export function translateCategory(locale: Locale, category: ServiceCategory): string {
  return translate(locale, `category.${category}` as TranslationKey);
}

export function translateLanguageOption(locale: Locale, language: string): string {
  return translateDynamic(locale, `language.${language}`);
}

export type OptionGroupValueMap = {
  age: AgeGroup;
  gender: Gender;
  residency: ResidencyStatus;
  housing: HousingStatus;
  marital: MaritalStatus;
  employment: EmploymentStatus;
  family: FamilyStatus;
  yesNo: YesNoUnsure;
  degree: DegreeLevel;
  topik: TopikLevel;
  kiip: KiipStage;
  visaSubtype: VisaSubtype;
  district: SeoulDistrict | "";
};

export function translateOption<G extends keyof OptionGroupValueMap>(
  locale: Locale,
  group: G,
  value: OptionGroupValueMap[G],
): string {
  return translate(locale, `option.${group}.${value}` as TranslationKey);
}

export type Translator = {
  (key: TranslationKey, values?: Record<string, string | number>): string;
};

export type LocalizedText = Record<Locale, string>;

/**
 * Compact constructor for declaring localized values inline in data files.
 * `lt(en, ko, zh)` is equivalent to `{ en, ko, zh }`.
 */
export function lt(en: string, ko: string, zh: string): LocalizedText {
  return { en, ko, zh };
}

export function pickLocalized(value: LocalizedText, locale: Locale): string {
  return value[locale] ?? value.en;
}

export type Cost = "free" | "low" | "paid";

export function translateCost(locale: Locale, cost: Cost): string {
  return translate(locale, `cost.${cost}` as TranslationKey);
}

export type FilterChip = "visa" | "healthcare" | "housing" | "education" | "free" | "english";

export function translateChip(locale: Locale, chip: FilterChip): string {
  return translate(locale, `chip.${chip}` as TranslationKey);
}

