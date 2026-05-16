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

