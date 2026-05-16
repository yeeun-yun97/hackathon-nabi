import { lt, type Cost, type LocalizedText } from "@/lib/i18n";

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
export type DegreeLevel = "none" | "high-school" | "bachelor" | "master" | "phd";
export type TopikLevel = "none" | "1" | "2" | "3" | "4" | "5" | "6";
export type KiipStage = "none" | "0" | "1" | "2" | "3" | "4" | "5";
export type VisaSubtype = "D-2" | "D-10" | "E-7" | "F-2-7" | "F-5" | "other" | "unsure";
export type SeoulDistrict = "마포구" | "성동구" | "강남구" | "종로구" | "용산구" | "기타";

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
  degreeLevel: DegreeLevel;
  topikLevel: TopikLevel;
  kiipStage: KiipStage;
  currentVisaSubtype: VisaSubtype;
  district: SeoulDistrict | "";
};

export type SupportProgram = {
  id: string;
  slug: string;
  title: LocalizedText;
  category: ServiceCategory;
  cities: Array<City | "all">;
  location: LocalizedText;
  address: string;
  mapQuery: string;
  languages: string[];
  cost: Cost;
  tags: string[];
  summary: LocalizedText;
  description: LocalizedText;
  requiredDocuments: LocalizedText[];
  contact: string;
  officialUrl: string;
  updatedAt: string;
};

export type VisaPointComponent = {
  id: string;
  label: LocalizedText;
  points: number;
  status: "earned" | "available" | "locked";
  action: LocalizedText;
  locality?: {
    label: LocalizedText;
    nextIntake?: string;
    url?: string;
  };
};

export type VisaTrack = {
  currentVisa: VisaSubtype;
  targetVisa: VisaSubtype;
  currentPoints: number;
  targetPoints: number;
  unlockEtaDays: number;
  expiresInDays: number;
  earned: VisaPointComponent[];
  strategies: VisaPointComponent[];
};

export type FacilitySport = "swimming" | "weights" | "yoga" | "fitness" | "court";
export type FacilityPayment = "local-card" | "cash" | "foreign-card";

export type Facility = {
  id: string;
  slug: string;
  name: LocalizedText;
  district: SeoulDistrict;
  address: string;
  mapQuery: string;
  coords: { lat: number; lng: number };
  hours: { open: string; close: string; note?: LocalizedText };
  sports: FacilitySport[];
  pricing: Array<{ tier: LocalizedText; monthly: number; residentDiscount?: boolean }>;
  requiredId: "ARC";
  paymentAccepted: FacilityPayment[];
  indoorShoeRule: boolean;
  koreanReceptionPrompt: string;
};

export type Checklist = {
  id: string;
  title: LocalizedText;
  category: ServiceCategory;
  cities: Array<City | "all">;
  description: LocalizedText;
  steps: LocalizedText[];
};

export type FaqItem = {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
  category: ServiceCategory;
  cities: Array<City | "all">;
};

export type CommunityPost = {
  id: string;
  slug: string;
  title: LocalizedText;
  author: string;
  city: City;
  category: ServiceCategory;
  excerpt: LocalizedText;
  body: LocalizedText;
  replies: Array<{
    author: string;
    body: LocalizedText;
  }>;
  updatedAt: string;
};

export const districtCoordinates: Record<SeoulDistrict, { lat: number; lng: number }> = {
  마포구: { lat: 37.5663, lng: 126.9019 },
  성동구: { lat: 37.5633, lng: 127.0367 },
  강남구: { lat: 37.5172, lng: 127.0473 },
  종로구: { lat: 37.5735, lng: 126.979 },
  용산구: { lat: 37.5326, lng: 126.9905 },
  기타: { lat: 37.5665, lng: 126.978 },
};

export const mockF27Track: VisaTrack = {
  currentVisa: "D-2",
  targetVisa: "F-2-7",
  currentPoints: 69,
  targetPoints: 80,
  unlockEtaDays: 365,
  expiresInDays: 180,
  earned: [
    {
      id: "topik-4",
      label: lt("TOPIK Level 4", "TOPIK 4급", "TOPIK 4级"),
      points: 20,
      status: "earned",
      action: lt(
        "Language score already reflected in your current total.",
        "현재 점수에 이미 언어 점수가 반영되어 있습니다.",
        "语言分数已计入当前总分。",
      ),
    },
    {
      id: "kiip-5",
      label: lt("KIIP Stage 5 completion", "사회통합프로그램 5단계 이수", "社会统合项目第5阶段完成"),
      points: 10,
      status: "earned",
      action: lt(
        "Keep your KIIP certificate ready for application review.",
        "신청 심사를 위해 KIIP 이수증을 준비해 두세요.",
        "请准备好 KIIP 完成证明以备审查。",
      ),
    },
    {
      id: "masters-track",
      label: lt("Domestic master's track", "국내 석사 과정", "韩国硕士课程"),
      points: 39,
      status: "earned",
      action: lt(
        "Your active graduate program anchors the current excellence-talent score.",
        "재학 중인 대학원 과정이 현재 우수인재 점수의 기반입니다.",
        "您在读的研究生课程是当前优秀人才评分的基础。",
      ),
    },
  ],
  strategies: [
    {
      id: "language-upgrade",
      label: lt("Option A: Language upgrade", "옵션 A: 언어 점수 업그레이드", "选项 A：语言提升"),
      points: 15,
      status: "available",
      action: lt(
        "Advance from TOPIK Level 4 toward the KIIP completion bonus path.",
        "TOPIK 4급에서 KIIP 이수 보너스 경로로 점수를 끌어올리세요.",
        "从 TOPIK 4 级提升到 KIIP 完成加分路径。",
      ),
      locality: {
        label: lt(
          "Nearby KIIP cohort: Mapo-gu Multicultural Family Center. Next intake opens in July.",
          "근처 KIIP 과정: 마포구 가족센터. 다음 접수는 7월에 열립니다.",
          "附近 KIIP 班：麻浦区家庭中心。下一期预计 7 月开放报名。",
        ),
        nextIntake: "2026-07-08",
        url: "https://www.socinet.go.kr",
      },
    },
    {
      id: "volunteer-hours",
      label: lt("Option B: Community service", "옵션 B: 봉사활동", "选项 B：社区服务"),
      points: 5,
      status: "available",
      action: lt(
        "Log 50 verified hours through the 1365 volunteer portal over the next year.",
        "향후 1년 동안 1365 자원봉사포털에서 인증 봉사 50시간을 기록하세요.",
        "未来一年通过 1365 志愿服务平台记录 50 小时认证服务。",
      ),
      locality: {
        label: lt(
          "Mapo Volunteer Center posts weekend roles that fit student schedules.",
          "마포구 자원봉사센터에는 학생 일정에 맞는 주말 활동이 올라옵니다.",
          "麻浦志愿者中心会发布适合学生时间的周末活动。",
        ),
        url: "https://www.1365.go.kr",
      },
    },
    {
      id: "graduation-milestone",
      label: lt("Option C: Academic milestone", "옵션 C: 학업 마일스톤", "选项 C：学业节点"),
      points: 7,
      status: "locked",
      action: lt(
        "Clear your upcoming domestic master's graduation milestone next year.",
        "내년에 예정된 국내 석사 졸업 요건을 공식적으로 완료하세요.",
        "明年正式完成韩国硕士毕业节点。",
      ),
      locality: {
        label: lt(
          "Ask your university international office for the graduation certificate timeline.",
          "대학 국제처에 졸업증명서 발급 일정을 확인하세요.",
          "请向学校国际处确认毕业证明开具时间。",
        ),
      },
    },
  ],
};

export const mockFacilities: Facility[] = [
  {
    id: "facility-mapo-art-center",
    slug: "mapo-art-center",
    name: lt("Mapo Art Center", "마포아트센터", "麻浦艺术中心"),
    district: "마포구",
    address: "서울특별시 마포구 대흥로20길 28",
    mapQuery: "Mapo Art Center sports center Seoul",
    coords: { lat: 37.5497, lng: 126.9457 },
    hours: {
      open: "09:00",
      close: "18:00",
      note: lt(
        "Standard public desk hours are 9:00 AM-6:00 PM.",
        "일반 안내 데스크 운영 시간은 오전 9시부터 오후 6시까지입니다.",
        "公共服务台标准时间为上午 9 点至下午 6 点。",
      ),
    },
    sports: ["swimming", "weights", "fitness"],
    pricing: [
      {
        tier: lt("Student/local resident gym tier", "학생·지역 주민 헬스장 요금", "学生/本地居民健身房价格"),
        monthly: 45000,
        residentDiscount: true,
      },
      {
        tier: lt("Swimming monthly access", "월 수영 이용권", "游泳月票"),
        monthly: 50000,
        residentDiscount: true,
      },
    ],
    requiredId: "ARC",
    paymentAccepted: ["local-card"],
    indoorShoeRule: true,
    koreanReceptionPrompt:
      "안녕하세요, 이 지역 주민 할인을 받아 헬스/수영 회원가입을 하고 싶습니다. 외국인등록증 여기 있습니다.",
  },
  {
    id: "facility-seongdong-sports-center",
    slug: "seongdong-sports-center",
    name: lt("Seongdong Public Sports Center", "성동구민종합체육센터", "城东区民综合体育中心"),
    district: "성동구",
    address: "서울특별시 성동구 왕십리로 89",
    mapQuery: "Seongdong public sports center Seoul",
    coords: { lat: 37.5484, lng: 127.0443 },
    hours: { open: "06:00", close: "22:00" },
    sports: ["swimming", "weights", "fitness", "court"],
    pricing: [
      { tier: lt("Public gym monthly pass", "공공 헬스 월 이용권", "公共健身房月票"), monthly: 42000, residentDiscount: true },
    ],
    requiredId: "ARC",
    paymentAccepted: ["local-card", "cash"],
    indoorShoeRule: true,
    koreanReceptionPrompt:
      "안녕하세요, 이 지역 주민 할인을 받아 헬스/수영 회원가입을 하고 싶습니다. 외국인등록증 여기 있습니다.",
  },
  {
    id: "facility-yongsan-community-pool",
    slug: "yongsan-community-pool",
    name: lt("Yongsan Community Pool", "용산구민 수영장", "龙山区民游泳馆"),
    district: "용산구",
    address: "서울특별시 용산구 녹사평대로 150",
    mapQuery: "Yongsan community swimming pool Seoul",
    coords: { lat: 37.532, lng: 126.9904 },
    hours: { open: "07:00", close: "21:00" },
    sports: ["swimming", "fitness"],
    pricing: [
      { tier: lt("Lap swim monthly pass", "자유수영 월 이용권", "自由泳月票"), monthly: 48000, residentDiscount: true },
    ],
    requiredId: "ARC",
    paymentAccepted: ["local-card"],
    indoorShoeRule: true,
    koreanReceptionPrompt:
      "안녕하세요, 이 지역 주민 할인을 받아 헬스/수영 회원가입을 하고 싶습니다. 외국인등록증 여기 있습니다.",
  },
  {
    id: "facility-jongno-fitness-hub",
    slug: "jongno-fitness-hub",
    name: lt("Jongno Fitness Hub", "종로 생활체육관", "钟路生活体育馆"),
    district: "종로구",
    address: "서울특별시 종로구 종로 38",
    mapQuery: "Jongno public fitness center Seoul",
    coords: { lat: 37.5701, lng: 126.982 },
    hours: { open: "08:00", close: "20:00" },
    sports: ["weights", "yoga", "fitness"],
    pricing: [
      { tier: lt("Fitness program monthly access", "생활체육 월 프로그램", "健身课程月票"), monthly: 40000, residentDiscount: true },
    ],
    requiredId: "ARC",
    paymentAccepted: ["local-card", "cash"],
    indoorShoeRule: true,
    koreanReceptionPrompt:
      "안녕하세요, 이 지역 주민 할인을 받아 헬스/수영 회원가입을 하고 싶습니다. 외국인등록증 여기 있습니다.",
  },
  {
    id: "facility-gangnam-community-gym",
    slug: "gangnam-community-gym",
    name: lt("Gangnam Community Gym", "강남구민체육관", "江南区民体育馆"),
    district: "강남구",
    address: "서울특별시 강남구 학동로 426",
    mapQuery: "Gangnam public gym Seoul",
    coords: { lat: 37.5172, lng: 127.0473 },
    hours: { open: "06:00", close: "22:00" },
    sports: ["weights", "fitness", "court"],
    pricing: [
      { tier: lt("Resident gym tier", "지역 주민 헬스 요금", "居民健身房价格"), monthly: 50000, residentDiscount: true },
    ],
    requiredId: "ARC",
    paymentAccepted: ["local-card"],
    indoorShoeRule: true,
    koreanReceptionPrompt:
      "안녕하세요, 이 지역 주민 할인을 받아 헬스/수영 회원가입을 하고 싶습니다. 외국인등록증 여기 있습니다.",
  },
];

export const supportPrograms: SupportProgram[] = [
  {
    id: "program-1",
    slug: "seoul-global-center-visa-help",
    title: lt(
      "Seoul Global Center visa and life counseling",
      "서울 글로벌 센터 비자·생활 상담",
      "首尔全球中心签证与生活咨询",
    ),
    category: "citizenship",
    cities: ["서울시"],
    location: lt("Jongno-gu, Seoul", "서울시 종로구", "首尔 钟路区"),
    address: "서울특별시 종로구 종로 38",
    mapQuery: "Seoul Global Center Jongno Seoul",
    languages: ["English", "Korean", "Chinese", "Vietnamese"],
    cost: "free",
    tags: ["Visa", "Immigration", "Documents", "Counseling"],
    summary: lt(
      "Free counseling for visa, residence, daily life, and public services in Seoul.",
      "서울에서 비자·체류·생활·공공 서비스를 무료로 상담받을 수 있습니다.",
      "在首尔提供签证、居留、生活与公共服务的免费咨询。",
    ),
    description: lt(
      "Seoul Global Center provides multilingual counseling for foreigners living in Seoul. It is a good first stop when you are unsure which government office or document applies to your situation.",
      "서울 글로벌 센터는 서울에 사는 외국인을 위한 다국어 상담을 제공합니다. 어느 기관·서류를 사용해야 할지 모를 때 가장 먼저 들러보기 좋은 곳입니다.",
      "首尔全球中心为在首尔生活的外国人提供多语言咨询。当您不确定该找哪个机构或办理哪种文件时，可以先到这里。",
    ),
    requiredDocuments: [
      lt("Passport", "여권", "护照"),
      lt("Alien Registration Card", "외국인등록증", "外国人登录证"),
      lt("Current visa information", "현재 비자 정보", "当前签证信息"),
    ],
    contact: "02-2075-4180",
    officialUrl: "https://global.seoul.go.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-2",
    slug: "mapo-public-health-center",
    title: lt(
      "Mapo Public Health Center foreign resident services",
      "마포구 보건소 외국인 진료 서비스",
      "麻浦区保健所外国居民服务",
    ),
    category: "safety-healthcare",
    cities: ["서울시"],
    location: lt("Mapo-gu, Seoul", "서울시 마포구", "首尔 麻浦区"),
    address: "서울특별시 마포구 월드컵로 212",
    mapQuery: "Mapo Public Health Center Seoul",
    languages: ["Korean", "English"],
    cost: "free",
    tags: ["Healthcare", "Vaccination", "Public health", "Clinic"],
    summary: lt(
      "Local health services, vaccination guidance, and public health consultations.",
      "지역 의료 서비스, 예방접종 안내, 보건 상담을 받을 수 있습니다.",
      "提供本地医疗服务、疫苗接种指引与公共保健咨询。",
    ),
    description: lt(
      "Public health centers can help with vaccinations, screenings, health education, and referrals. Availability varies by city, so check before visiting.",
      "보건소에서는 예방접종, 검진, 건강 교육, 진료 의뢰 등을 도와줍니다. 도시마다 운영 내용이 다르므로 방문 전 확인하세요.",
      "保健所可帮助您接种疫苗、健康检查、健康教育及转介诊。各地服务可能不同，请提前确认。",
    ),
    requiredDocuments: [
      lt("Alien Registration Card", "외국인등록증", "外国人登录证"),
      lt(
        "Health insurance card if available",
        "건강보험증 (가지고 있다면)",
        "若有健康保险卡",
      ),
    ],
    contact: "02-3153-9004",
    officialUrl: "https://www.mapo.go.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-3",
    slug: "yongsan-korean-language-class",
    title: lt(
      "Yongsan Korean language and culture classes",
      "용산구 한국어·문화 수업",
      "龙山区韩语与文化课程",
    ),
    category: "education-skill-building",
    cities: ["서울시"],
    location: lt("Yongsan-gu, Seoul", "서울시 용산구", "首尔 龙山区"),
    address: "서울특별시 용산구 녹사평대로 150",
    mapQuery: "Yongsan Korean language class Seoul",
    languages: ["Korean", "English"],
    cost: "low",
    tags: ["Korean class", "Culture", "Beginner", "Community"],
    summary: lt(
      "Beginner-friendly Korean language classes and cultural orientation programs.",
      "초급자를 위한 한국어 수업과 문화 적응 프로그램을 제공합니다.",
      "面向初学者的韩语课程与文化适应项目。",
    ),
    description: lt(
      "City and multicultural centers often run Korean classes for new residents. This program is useful for building daily life vocabulary and local confidence.",
      "구청과 다문화센터에서는 새로 정착한 외국인을 위한 한국어 수업을 자주 운영합니다. 생활 어휘를 익히고 지역에 적응하는 데 유용합니다.",
      "区厅和多文化中心常为新居民开设韩语课程。本项目有助于积累日常生活词汇并增强在地适应感。",
    ),
    requiredDocuments: [
      lt("Application form", "신청서", "申请表"),
      lt("Alien Registration Card", "외국인등록증", "外国人登录证"),
    ],
    contact: "02-2199-6114",
    officialUrl: "https://www.yongsan.go.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-4",
    slug: "seongdong-sports-center",
    title: lt(
      "Seongdong public sports center membership",
      "성동구 공공 체육센터 등록",
      "城东区公共体育中心会员",
    ),
    category: "sports-recreation",
    cities: ["서울시"],
    location: lt("Seongdong-gu, Seoul", "서울시 성동구", "首尔 城东区"),
    address: "서울특별시 성동구 왕십리로 89",
    mapQuery: "Seongdong public sports center Seoul",
    languages: ["Korean"],
    cost: "low",
    tags: ["Gym", "Swimming", "Recreation", "Wellbeing"],
    summary: lt(
      "Affordable gym, swimming, and recreation programs operated by the city.",
      "구에서 운영하는 저렴한 헬스장, 수영, 여가 프로그램을 이용할 수 있습니다.",
      "由区政府运营的实惠健身房、游泳与休闲项目。",
    ),
    description: lt(
      "Public sports centers are usually cheaper than private gyms and may offer swimming pools, fitness rooms, and community classes.",
      "공공 체육센터는 보통 사설 헬스장보다 저렴하며, 수영장·헬스장·동네 강좌 등을 운영합니다.",
      "公共体育中心通常比私人健身房便宜，并可能提供泳池、健身室与社区课程。",
    ),
    requiredDocuments: [
      lt("ID", "신분증", "身份证件"),
      lt("Local address information", "거주 주소 정보", "本地地址信息"),
    ],
    contact: "02-2204-7600",
    officialUrl: "https://www.sd.go.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-5",
    slug: "yeongdeungpo-job-plus-center",
    title: lt(
      "Yeongdeungpo Job Plus Center employment support",
      "영등포 일자리플러스센터 취업 지원",
      "永登浦Job Plus中心就业支援",
    ),
    category: "labour-employment",
    cities: ["서울시"],
    location: lt("Yeongdeungpo-gu, Seoul", "서울시 영등포구", "首尔 永登浦区"),
    address: "서울특별시 영등포구 당산로 123",
    mapQuery: "Yeongdeungpo Job Plus Center Seoul",
    languages: ["Korean", "English"],
    cost: "free",
    tags: ["Jobs", "Resume", "Labour", "Training"],
    summary: lt(
      "Employment counseling, job search help, and vocational training information.",
      "취업 상담, 구직 지원, 직업 훈련 정보를 제공합니다.",
      "提供就业咨询、求职支持及职业培训信息。",
    ),
    description: lt(
      "Job centers can help residents understand local hiring processes, prepare applications, and find training programs. Visa eligibility should be verified separately.",
      "고용센터는 지역 채용 절차 이해, 지원서 준비, 직업 훈련 프로그램 찾기를 도와줍니다. 비자 자격은 별도로 확인하세요.",
      "就业中心可帮助居民了解本地招聘流程、准备申请并寻找培训项目。签证资格请另行确认。",
    ),
    requiredDocuments: [
      lt("Alien Registration Card", "외국인등록증", "外国人登录证"),
      lt("Resume if available", "이력서 (있는 경우)", "若有简历"),
      lt("Visa type", "비자 종류", "签证类型"),
    ],
    contact: "02-2670-1114",
    officialUrl: "https://www.ydp.go.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-6",
    slug: "gangnam-financial-counseling",
    title: lt(
      "Gangnam household budget and banking guide",
      "강남구 가계 예산·은행 이용 안내",
      "江南区家庭预算与银行指南",
    ),
    category: "finances-spending",
    cities: ["서울시"],
    location: lt("Gangnam-gu, Seoul", "서울시 강남구", "首尔 江南区"),
    address: "서울특별시 강남구 학동로 426",
    mapQuery: "Gangnam financial counseling Seoul",
    languages: ["Korean", "English"],
    cost: "free",
    tags: ["Banking", "Budget", "Telecom", "Spending"],
    summary: lt(
      "Practical information about bank accounts, telecom plans, and local fees.",
      "은행 계좌, 통신 요금제, 지역 공과금에 대한 실용 정보를 제공합니다.",
      "提供有关银行账户、通讯套餐与本地费用的实用信息。",
    ),
    description: lt(
      "This guide helps newcomers understand common spending categories in Korea, what documents banks may request, and where to ask for help.",
      "한국에서 자주 발생하는 지출 항목, 은행 요청 서류, 도움받을 수 있는 곳을 정리해 새로 정착한 분들이 이해하기 쉽게 안내합니다.",
      "本指南帮助新移居者了解韩国常见支出类别、银行可能要求的文件以及可以寻求帮助的地方。",
    ),
    requiredDocuments: [
      lt("Passport", "여권", "护照"),
      lt("Alien Registration Card", "외국인등록증", "外国人登录证"),
      lt(
        "Korean phone number if available",
        "한국 휴대폰 번호 (있는 경우)",
        "若有韩国手机号码",
      ),
    ],
    contact: "02-3423-5114",
    officialUrl: "https://www.gangnam.go.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-7",
    slug: "seoul-transport-card-guide",
    title: lt(
      "Seoul public transport card guide",
      "서울 대중교통 카드 안내",
      "首尔公共交通卡指南",
    ),
    category: "transport",
    cities: ["서울시"],
    location: lt("Seoul", "서울시", "首尔"),
    address: "Seoul, South Korea",
    mapQuery: "Seoul public transport information center",
    languages: ["English", "Korean"],
    cost: "free",
    tags: ["Subway", "Bus", "T-money", "Mobility"],
    summary: lt(
      "How to use buses, subways, transfers, and rechargeable transport cards.",
      "버스·지하철·환승·충전식 교통카드 사용법을 안내합니다.",
      "公交、地铁、换乘以及可充值交通卡的使用方法。",
    ),
    description: lt(
      "A practical guide for setting up a transport card, understanding transfers, and finding route information in Seoul.",
      "서울에서 교통카드를 발급받고 환승 체계를 이해하며 경로 정보를 찾는 실용 가이드입니다.",
      "在首尔办理交通卡、理解换乘体系并查找路线信息的实用指南。",
    ),
    requiredDocuments: [
      lt(
        "No documents needed for most transport cards",
        "대부분의 교통카드는 별도 서류가 필요 없습니다",
        "大多数交通卡无需额外文件",
      ),
    ],
    contact: "120 Dasan Call Center",
    officialUrl: "https://english.seoul.go.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-8",
    slug: "free-legal-aid-for-foreigners",
    title: lt(
      "Free legal aid for foreign residents",
      "외국인 거주자를 위한 무료 법률 지원",
      "外国居民免费法律援助",
    ),
    category: "legal",
    cities: ["all"],
    location: lt("Nationwide", "전국", "全国"),
    address: "Korea Legal Aid Corporation",
    mapQuery: "Korea Legal Aid Corporation",
    languages: ["Korean", "English"],
    cost: "free",
    tags: ["Legal aid", "Contracts", "Rights", "Counseling"],
    summary: lt(
      "Legal counseling for housing contracts, workplace issues, and daily disputes.",
      "주거 계약, 직장 문제, 일상 분쟁에 대한 법률 상담을 받을 수 있습니다.",
      "针对住房合约、职场问题与日常纠纷提供法律咨询。",
    ),
    description: lt(
      "Legal aid can help you understand your options before signing documents or when dealing with housing, employment, or consumer problems.",
      "서류를 서명하기 전이나 주거·고용·소비 분쟁이 발생했을 때 어떤 선택지가 있는지 이해할 수 있도록 도와줍니다.",
      "在签署文件之前或处理住房、就业、消费问题时，法律援助可以帮助您了解可行的选择。",
    ),
    requiredDocuments: [
      lt("ID", "신분증", "身份证件"),
      lt(
        "Relevant contract or message records",
        "관련 계약서나 메시지 기록",
        "相关合约或消息记录",
      ),
      lt("Timeline of issue", "사건 발생 경과", "事件经过时间线"),
    ],
    contact: "132 Legal Aid",
    officialUrl: "https://www.klac.or.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-9",
    slug: "cheonan-multicultural-family-center",
    title: lt(
      "Cheonan Multicultural Family Support Center",
      "천안 다문화가족지원센터",
      "天安多文化家庭支援中心",
    ),
    category: "education-skill-building",
    cities: ["천안시"],
    location: lt("Cheonan", "천안시", "天安"),
    address: "충청남도 천안시 동남구 버들로 40",
    mapQuery: "Cheonan Multicultural Family Support Center",
    languages: ["Korean", "English", "Vietnamese"],
    cost: "free",
    tags: ["Multicultural family", "Korean class", "Family support", "Counseling"],
    summary: lt(
      "Family, language, and settlement support for multicultural families in Cheonan.",
      "천안 지역 다문화 가족의 가족·언어·정착 지원을 제공합니다.",
      "为天安地区多文化家庭提供家庭、语言与定居支援。",
    ),
    description: lt(
      "Multicultural family centers can help with language education, family counseling, child support programs, and local settlement information.",
      "다문화가족지원센터는 언어 교육, 가족 상담, 자녀 지원 프로그램, 지역 정착 정보를 도와줍니다.",
      "多文化家庭支援中心可协助语言教育、家庭咨询、子女支援项目以及本地定居信息。",
    ),
    requiredDocuments: [
      lt("ID", "신분증", "身份证件"),
      lt(
        "Family relation documents if requested",
        "요청 시 가족 관계 서류",
        "如需家庭关系证明",
      ),
      lt("Local address information", "거주 주소 정보", "本地地址信息"),
    ],
    contact: "041-555-1114",
    officialUrl: "https://www.cheonan.go.kr",
    updatedAt: "2026-05-16",
  },
  {
    id: "program-10",
    slug: "cheonan-public-health-guide",
    title: lt(
      "Cheonan public health and hospital guide",
      "천안 보건소·병원 이용 안내",
      "天安公共保健与医院指南",
    ),
    category: "safety-healthcare",
    cities: ["천안시"],
    location: lt("Cheonan", "천안시", "天安"),
    address: "충청남도 천안시 서북구 번영로 156",
    mapQuery: "Cheonan public health center",
    languages: ["Korean"],
    cost: "free",
    tags: ["Healthcare", "Public health", "Hospital", "Safety"],
    summary: lt(
      "A starting point for public health services and hospital navigation in Cheonan.",
      "천안에서 보건소 서비스와 병원 안내를 받을 수 있는 출발점입니다.",
      "了解天安公共保健服务与医院信息的入门指南。",
    ),
    description: lt(
      "Use the public health center to ask about local services, vaccinations, screenings, and referrals. Call ahead for language support.",
      "보건소에서 지역 서비스, 예방접종, 검진, 진료 의뢰 등을 문의하세요. 언어 지원이 필요하다면 미리 전화로 확인하는 것이 좋습니다.",
      "可以向保健所咨询本地服务、疫苗接种、健康检查与转介诊。如需语言支持请提前电话确认。",
    ),
    requiredDocuments: [
      lt("Alien Registration Card", "외국인등록증", "外国人登录证"),
      lt(
        "Health insurance card if available",
        "건강보험증 (가지고 있다면)",
        "若有健康保险卡",
      ),
    ],
    contact: "041-521-2552",
    officialUrl: "https://www.cheonan.go.kr",
    updatedAt: "2026-05-16",
  },
];

export const checklists: Checklist[] = [
  {
    id: "checklist-visa-extension",
    title: lt("Before extending your stay", "체류기간 연장 전에", "申请延长居留前"),
    category: "citizenship",
    cities: ["all"],
    description: lt(
      "Prepare documents and confirm which immigration office handles your city.",
      "서류를 준비하고 본인 도시를 담당하는 출입국 관리소를 확인하세요.",
      "准备好文件并确认负责您所在城市的出入境管理事务所。",
    ),
    steps: [
      lt(
        "Check your visa expiry date and appointment availability.",
        "비자 만료일과 예약 가능 시점을 확인하세요.",
        "确认您的签证到期日与可预约时间。",
      ),
      lt(
        "Prepare passport, ARC, application form, housing proof, and fee.",
        "여권, 외국인등록증, 신청서, 주거 증빙, 수수료를 준비하세요.",
        "准备护照、外国人登录证、申请表、住所证明与费用。",
      ),
      lt(
        "Verify requirements on HiKorea or with an immigration support center.",
        "필요 서류는 HiKorea 또는 외국인 지원센터에서 다시 확인하세요.",
        "请通过 HiKorea 或外国人支援中心再次确认所需材料。",
      ),
      lt(
        "Keep a photo or scan of every submitted document.",
        "제출한 모든 서류는 사진이나 스캔본으로 보관하세요.",
        "请将所有提交的文件拍照或扫描留存。",
      ),
    ],
  },
  {
    id: "checklist-healthcare",
    title: lt("When you need healthcare", "의료 서비스가 필요할 때", "需要就医时"),
    category: "safety-healthcare",
    cities: ["all"],
    description: lt(
      "Find appropriate care and avoid missing insurance or language support details.",
      "상황에 맞는 진료처를 찾고, 보험·통역 정보를 빠뜨리지 마세요.",
      "找到合适的医疗服务，并不要遗漏保险与语言支援的细节。",
    ),
    steps: [
      lt(
        "Confirm whether your case is emergency, clinic, hospital, or public health center level.",
        "응급실·의원·병원·보건소 중 어디가 적합한지 먼저 확인하세요.",
        "先确认情况属于急诊、诊所、医院还是保健所层级。",
      ),
      lt(
        "Bring ARC, passport, and health insurance card if available.",
        "외국인등록증, 여권, 건강보험증(있다면)을 가져가세요.",
        "请携带外国人登录证、护照以及健康保险卡（若有）。",
      ),
      lt(
        "Ask whether English support or interpretation is available before visiting.",
        "방문 전에 영어 지원이나 통역이 가능한지 확인하세요.",
        "前往前请先询问是否提供英语或口译支持。",
      ),
      lt(
        "For urgent symptoms, call emergency services instead of relying on online advice.",
        "급한 증상이 있다면 온라인 정보 대신 응급 서비스에 전화하세요.",
        "出现紧急症状时请直接拨打急救服务，不要依赖网上建议。",
      ),
    ],
  },
  {
    id: "checklist-bank-phone",
    title: lt(
      "Opening banking and phone services",
      "은행·통신 서비스를 개설할 때",
      "开通银行与通讯服务",
    ),
    category: "finances-spending",
    cities: ["all"],
    description: lt(
      "Common preparation for bank accounts, phone plans, and recurring payments.",
      "은행 계좌, 휴대폰 요금제, 정기 결제를 위한 일반적인 준비 사항입니다.",
      "办理银行账户、手机套餐与定期付款时的常见准备事项。",
    ),
    steps: [
      lt(
        "Bring passport, ARC, local address, and Korean phone number if you have one.",
        "여권, 외국인등록증, 거주 주소, 그리고 한국 휴대폰 번호(있다면)를 준비하세요.",
        "请准备护照、外国人登录证、本地地址以及韩国手机号码（若有）。",
      ),
      lt(
        "Ask about transfer limits, fees, and online banking access.",
        "이체 한도, 수수료, 인터넷뱅킹 가입 가능 여부를 물어보세요.",
        "请询问转账限额、手续费以及网银开通条件。",
      ),
      lt(
        "Compare prepaid and postpaid phone plans before signing.",
        "선불·후불 휴대폰 요금제를 비교한 뒤 가입하세요.",
        "签约前请先比较预付与后付费的手机套餐。",
      ),
      lt(
        "Keep copies of contracts and cancellation terms.",
        "계약서와 해지 조건은 사본으로 보관하세요.",
        "请保留合约与取消条款的副本。",
      ),
    ],
  },
  {
    id: "checklist-work-contract",
    title: lt(
      "Before signing a work contract",
      "근로 계약을 체결하기 전에",
      "签署劳动合同前",
    ),
    category: "labour-employment",
    cities: ["all"],
    description: lt(
      "Check visa eligibility, pay, working hours, and basic labour rights.",
      "비자 자격, 급여, 근무 시간, 기본적인 노동 권리를 확인하세요.",
      "检查签证资格、薪资、工作时间与基本劳动权利。",
    ),
    steps: [
      lt(
        "Confirm your visa allows the work type before accepting.",
        "현재 비자로 해당 업무가 가능한지 먼저 확인하세요.",
        "在接受工作前请先确认您的签证是否允许此类工作。",
      ),
      lt(
        "Review pay date, working hours, overtime, insurance, and severance terms.",
        "급여 지급일, 근무 시간, 연장근무, 4대 보험, 퇴직금 조건을 확인하세요.",
        "请确认发薪日、工作时间、加班、保险与离职金条款。",
      ),
      lt(
        "Ask for a written contract in a language you understand if possible.",
        "가능하면 본인이 이해할 수 있는 언어의 서면 계약서를 요청하세요.",
        "如有可能，请要求提供您能理解的语言的书面合同。",
      ),
      lt(
        "Contact a labour counseling center if anything is unclear.",
        "모호한 부분이 있다면 노동상담센터에 문의하세요.",
        "若有不明之处，请联系劳动咨询中心。",
      ),
    ],
  },
];

export const faqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: lt(
      "Which city or local office should I visit?",
      "어느 도시 또는 행정복지센터를 방문해야 하나요?",
      "我应该去哪个城市或行政中心办理？",
    ),
    answer: lt(
      "Start with the city or local office where your registered address is located. For immigration matters, confirm the responsible immigration office on the official site before visiting.",
      "먼저 본인이 등록된 주소지의 시청 또는 행정복지센터부터 알아보세요. 출입국 관련 사항은 공식 사이트에서 담당 출입국 관리소를 확인한 뒤 방문하세요.",
      "请先到您登记地址所在的市厅或行政中心。涉及出入境事务时，请先在官网确认负责的出入境管理事务所再前往。",
    ),
    category: "citizenship",
    cities: ["all"],
  },
  {
    id: "faq-2",
    question: lt(
      "Can I get help if I do not speak Korean well?",
      "한국어를 잘 못해도 도움을 받을 수 있나요?",
      "韩语不太流利也能获得帮助吗？",
    ),
    answer: lt(
      "Many public centers offer English or multilingual counseling, but availability changes. Call ahead or use a global center to confirm interpretation support.",
      "많은 공공기관에서 영어 또는 다국어 상담을 제공하지만 시간대에 따라 다릅니다. 미리 전화하거나 글로벌 센터를 통해 통역 지원을 확인하세요.",
      "许多公共机构提供英语或多语言咨询，但时间和情况会有所不同。请提前致电或通过全球中心确认口译支持。",
    ),
    category: "education-skill-building",
    cities: ["all"],
  },
  {
    id: "faq-3",
    question: lt(
      "Where can I find affordable exercise facilities?",
      "저렴한 운동 시설은 어디에서 찾을 수 있나요?",
      "在哪里可以找到价格实惠的运动设施？",
    ),
    answer: lt(
      "City-run sports centers are often cheaper than private gyms. Search by your city and check registration dates because popular classes fill quickly.",
      "구청에서 운영하는 체육센터는 사설 헬스장보다 저렴한 경우가 많습니다. 본인 도시 기준으로 검색하고, 인기 강좌는 빨리 마감되니 등록 일정을 확인하세요.",
      "区厅运营的体育中心通常比私人健身房便宜。请按所在城市搜索，并留意报名日期，热门课程很快会满员。",
    ),
    category: "sports-recreation",
    cities: ["서울시", "천안시"],
  },
  {
    id: "faq-4",
    question: lt(
      "What should I do if I have a housing contract problem?",
      "주거 계약에 문제가 생기면 어떻게 해야 하나요?",
      "住房合约出现问题时该怎么办？",
    ),
    answer: lt(
      "Collect the contract, payment records, chat messages, and timeline. Then contact a legal aid center or local counseling office before making major decisions.",
      "계약서, 입금 내역, 메시지 기록, 사건 경과를 정리한 뒤 큰 결정을 내리기 전에 법률구조센터나 지역 상담소에 문의하세요.",
      "请整理合约、付款记录、聊天记录与时间线，在做出重要决定前先联系法律援助中心或本地咨询处。",
    ),
    category: "legal",
    cities: ["all"],
  },
  {
    id: "faq-5",
    question: lt(
      "How do I open a Korean bank account as a foreigner?",
      "외국인이 한국 은행 계좌를 어떻게 개설하나요?",
      "外国人如何在韩国开设银行账户？",
    ),
    answer: lt(
      "Bring your passport, Alien Registration Card (ARC), and a Korean phone number. Most major banks (KB, Shinhan, Woori, Hana) have foreigner-friendly branches. Online banking and overseas remittance often require additional verification, so ask at the counter.",
      "여권, 외국인등록증, 한국 휴대폰 번호를 지참하세요. KB·신한·우리·하나 등 대부분의 주요 은행에 외국인 친화 지점이 있습니다. 인터넷뱅킹과 해외송금은 추가 인증이 필요할 수 있으니 창구에서 미리 문의하세요.",
      "请携带护照、外国人登录证（ARC）和韩国手机号。KB、新韩、友利、韩亚等主要银行都有外国人友好分行。网银和海外汇款通常需要额外验证，请在柜台咨询。",
    ),
    category: "finances-spending",
    cities: ["all"],
  },
  {
    id: "faq-6",
    question: lt(
      "How does the Korean National Health Insurance work for foreigners?",
      "외국인은 한국 국민건강보험을 어떻게 이용하나요?",
      "外国人如何使用韩国国民健康保险？",
    ),
    answer: lt(
      "Foreigners staying 6 months or longer are usually required to enroll in National Health Insurance (NHIS). It covers a large share of clinic and hospital costs. Bring your ARC and insurance card to medical visits. Check the NHIS website or call 1577-1000 (English available).",
      "6개월 이상 체류하는 외국인은 보통 국민건강보험(NHIS)에 의무 가입됩니다. 의원·병원 비용의 상당 부분을 보장합니다. 진료 시 외국인등록증과 건강보험증을 지참하세요. 자세한 내용은 NHIS 홈페이지 또는 1577-1000(영어 가능)에 문의하세요.",
      "在韩居留满 6 个月以上的外国人通常需强制加入国民健康保险（NHIS）。该保险可覆盖大部分门诊和住院费用。就诊时请携带外国人登录证和保险卡。详情请咨询 NHIS 官网或拨打 1577-1000（提供英语服务）。",
    ),
    category: "safety-healthcare",
    cities: ["all"],
  },
  {
    id: "faq-7",
    question: lt(
      "What is a T-money card and how do I use it?",
      "T-money 카드는 무엇이고 어떻게 사용하나요?",
      "T-money 卡是什么，如何使用？",
    ),
    answer: lt(
      "T-money is a rechargeable transit card used on subways, buses, and many taxis nationwide. Buy one at any convenience store (CU, GS25, 7-Eleven) for about 2,500-4,000 won and recharge with cash at the same stores or at subway machines. Tap when entering and exiting to get transfer discounts.",
      "T-money는 전국 지하철·버스·일부 택시에서 사용할 수 있는 충전식 교통카드입니다. 편의점(CU, GS25, 세븐일레븐)에서 약 2,500~4,000원에 구매하고 같은 편의점이나 지하철 충전기에서 현금으로 충전합니다. 환승 할인을 받으려면 승하차 시 모두 태그하세요.",
      "T-money 是全国地铁、公交和部分出租车通用的可充值交通卡。可在便利店（CU、GS25、7-Eleven）以约 2,500~4,000 韩元购买，并在便利店或地铁充值机用现金充值。上下车都要刷卡才能获得换乘折扣。",
    ),
    category: "transport",
    cities: ["all"],
  },
  {
    id: "faq-8",
    question: lt(
      "How can I get a Korean mobile phone plan as a foreigner?",
      "외국인이 한국 휴대폰 요금제는 어떻게 가입하나요?",
      "外国人如何办理韩国手机套餐？",
    ),
    answer: lt(
      "Postpaid plans (KT, SKT, LG U+) usually require an ARC and a Korean bank account. If you do not have an ARC yet, prepaid SIM cards are widely available at the airport and convenience stores. Budget MVNO carriers (알뜰폰) like KT M mobile or SK 7mobile offer cheaper plans with the same coverage.",
      "후불제 요금제(KT, SKT, LG U+)는 보통 외국인등록증과 한국 은행 계좌가 필요합니다. 외국인등록증이 아직 없다면 공항이나 편의점에서 선불 유심을 쉽게 구할 수 있습니다. 알뜰폰(KT M모바일, SK 7모바일 등)은 같은 통신망을 사용하면서 더 저렴합니다.",
      "后付费套餐（KT、SKT、LG U+）通常需要外国人登录证和韩国银行账户。如果尚未取得 ARC，可在机场或便利店购买预付费 SIM 卡。알뜰폰（如 KT M mobile、SK 7mobile）使用相同网络但价格更便宜。",
    ),
    category: "finances-spending",
    cities: ["all"],
  },
  {
    id: "faq-9",
    question: lt(
      "Where do I report my address change after moving?",
      "이사한 뒤 주소 변경은 어디에서 신고하나요?",
      "搬家后在哪里申报地址变更？",
    ),
    answer: lt(
      "Foreign residents must report a new address within 14 days of moving. Visit the local 행정복지센터 (community service center) or the immigration office in your area with your ARC and proof of residence (lease contract or housing confirmation). Late reporting can result in a fine.",
      "외국인 거주자는 이사 후 14일 이내에 주소 변경을 신고해야 합니다. 외국인등록증과 거주 증빙(임대 계약서 또는 거주 확인서)을 가지고 가까운 행정복지센터 또는 출입국 관리소를 방문하세요. 신고가 늦으면 과태료가 부과될 수 있습니다.",
      "外国居民须在搬家后 14 天内申报地址变更。请携带外国人登录证和居住证明（租赁合同或居住确认书）前往附近的行政福祉中心或出入境管理事务所。逾期申报可能会被处以罚款。",
    ),
    category: "citizenship",
    cities: ["all"],
  },
  {
    id: "faq-10",
    question: lt(
      "What should I do in a medical emergency?",
      "의료 응급 상황에서는 어떻게 해야 하나요?",
      "遇到医疗紧急情况该怎么办？",
    ),
    answer: lt(
      "Call 119 for ambulances and fire emergencies — operators can connect you to an English interpreter. For non-emergency medical questions in English, call 1339. Bring your passport or ARC and insurance card if possible. Major hospitals like Severance and Samsung Medical Center have international clinics.",
      "구급차나 화재 응급 상황은 119로 전화하세요. 영어 통역 연결이 가능합니다. 응급은 아니지만 의료 관련 영어 상담이 필요하면 1339에 전화하세요. 가능하면 여권 또는 외국인등록증과 보험증을 가져가세요. 세브란스·삼성서울병원 등 대형 병원에는 국제진료센터가 있습니다.",
      "拨打 119 可呼叫救护车和报告火警，接线员可转接英语翻译。非紧急医疗咨询（提供英语）可拨打 1339。如有可能，请携带护照或外国人登录证和保险卡。Severance、三星首尔等大型医院设有国际诊疗中心。",
    ),
    category: "safety-healthcare",
    cities: ["all"],
  },
  {
    id: "faq-11",
    question: lt(
      "Can I work part-time on a student (D-2) visa?",
      "유학생(D-2) 비자로 아르바이트를 할 수 있나요?",
      "持留学（D-2）签证可以做兼职吗？",
    ),
    answer: lt(
      "Yes, but you must first apply for a part-time work permit (시간제취업허가) at your immigration office. Hour limits depend on your TOPIK level and academic level (typically 10-25 hours per week during semesters, more during vacations). Working without permission can affect future visa applications.",
      "가능하지만 먼저 출입국 관리소에서 시간제취업허가를 신청해야 합니다. 허용 시간은 TOPIK 등급과 학위 과정에 따라 다르며, 보통 학기 중 주 10~25시간, 방학 중에는 더 많이 일할 수 있습니다. 허가 없이 일하면 향후 비자 심사에 불이익이 있을 수 있습니다.",
      "可以，但必须先在出入境管理事务所申请时间制就业许可（시간제취업허가）。每周可工作小时数取决于 TOPIK 等级和学历，通常学期内为每周 10~25 小时，假期可更多。未经许可工作可能影响今后的签证审核。",
    ),
    category: "labour-employment",
    cities: ["all"],
  },
  {
    id: "faq-12",
    question: lt(
      "How do I get a Korean driver's license as a foreigner?",
      "외국인은 한국 운전면허증을 어떻게 발급받나요?",
      "外国人如何取得韩国驾照？",
    ),
    answer: lt(
      "If your country has a license exchange agreement with Korea, you can convert your existing license at a Driver's License Examination Office. Bring your passport, ARC, original license, an apostilled translation, and a passport photo. Otherwise, you must take the written and road tests. Visit the safedriving.or.kr site for the latest list of eligible countries.",
      "한국과 면허 상호인정 협정이 있는 국가의 면허는 운전면허시험장에서 한국 면허로 교환할 수 있습니다. 여권, 외국인등록증, 원본 면허증, 아포스티유 번역본, 여권용 사진을 지참하세요. 협정이 없다면 학과·도로주행 시험을 응시해야 합니다. 최신 인정 국가 목록은 safedriving.or.kr에서 확인할 수 있습니다.",
      "若您所在国家与韩国签有驾照互认协议，可在驾照考试场将原驾照换发为韩国驾照。请携带护照、外国人登录证、原驾照、海牙认证翻译件及护照照片。否则需参加笔试和路考。最新可互认国家名单请见 safedriving.or.kr。",
    ),
    category: "transport",
    cities: ["all"],
  },
  {
    id: "faq-13",
    question: lt(
      "Where can I learn Korean for free or low cost?",
      "한국어를 무료나 저렴한 비용으로 어디에서 배울 수 있나요?",
      "在哪里可以免费或低价学习韩语？",
    ),
    answer: lt(
      "The Korean Immigration and Integration Program (KIIP, 사회통합프로그램) offers free Korean and culture classes and counts toward visa points. Multicultural family centers and 외국인주민센터 also run subsidized classes. Online options include the free King Sejong Institute (sejonghakdang.org) courses.",
      "사회통합프로그램(KIIP)은 무료로 한국어·문화 수업을 제공하며 비자 가점에도 반영됩니다. 다문화가족지원센터와 외국인주민센터에서도 저렴한 수업을 운영합니다. 온라인으로는 세종학당(sejonghakdang.org)의 무료 강좌가 있습니다.",
      "社会统合项目（KIIP）免费提供韩语和文化课程，并可计入签证加分。多文化家庭支援中心和外国人居民中心也开设低价课程。在线学习可使用世宗学堂（sejonghakdang.org）的免费课程。",
    ),
    category: "education-skill-building",
    cities: ["all"],
  },
  {
    id: "faq-14",
    question: lt(
      "What documents do I need to rent an apartment in Korea?",
      "한국에서 집을 임대하려면 어떤 서류가 필요한가요?",
      "在韩国租房需要哪些文件？",
    ),
    answer: lt(
      "You generally need a passport, ARC, proof of income or employment (or a guarantor), and a deposit. Korean rentals use 전세 (large lump-sum deposit) or 월세 (smaller deposit + monthly rent). Always register the contract at the local office (확정일자) to protect your deposit, and confirm the property has no major liens via the 등기부등본.",
      "일반적으로 여권, 외국인등록증, 소득·재직 증빙(또는 보증인), 보증금이 필요합니다. 한국 임대 형태는 전세(큰 보증금)와 월세(보증금+월세)로 나뉩니다. 보증금 보호를 위해 반드시 동주민센터에서 확정일자를 받고, 등기부등본으로 권리관계를 확인하세요.",
      "通常需要护照、外国人登录证、收入或在职证明（或保证人）以及押金。韩国租房分为전세（大额押金）和월세（小额押金+月租）。请务必到管辖政府部门办理确定日期（확정일자）以保护押金，并通过登记簿誊本（등기부등본）确认房屋无重大权利问题。",
    ),
    category: "legal",
    cities: ["all"],
  },
  {
    id: "faq-15",
    question: lt(
      "How does waste sorting and recycling work?",
      "쓰레기 분리수거는 어떻게 하나요?",
      "垃圾分类与回收如何进行？",
    ),
    answer: lt(
      "Korea has strict waste sorting rules. General trash must go in district-specific 종량제 봉투 (volume-based bags) sold at convenience stores. Food waste uses separate bags or RFID bins. Recyclables (paper, plastic, glass, cans) are collected on designated days. Check your building or the 행정복지센터 for the local schedule. Improper disposal can result in fines.",
      "한국은 분리수거 규정이 엄격합니다. 일반 쓰레기는 편의점에서 판매하는 지역별 종량제 봉투에 버려야 합니다. 음식물 쓰레기는 전용 봉투나 RFID 수거함을 사용합니다. 재활용품(종이, 플라스틱, 유리, 캔 등)은 지정된 요일에 배출합니다. 자세한 일정은 거주 건물 또는 행정복지센터에서 확인하세요. 잘못 버리면 과태료가 부과될 수 있습니다.",
      "韩国垃圾分类规定严格。普通垃圾须装入便利店出售的当地종량제（按量收费）专用袋；厨余垃圾使用专用袋或 RFID 回收桶；可回收物（纸、塑料、玻璃、易拉罐）按指定日收集。具体时间请向所住建筑或行政福祉中心确认。违规丢弃可能被处以罚款。",
    ),
    category: "safety-healthcare",
    cities: ["all"],
  },
  {
    id: "faq-16",
    question: lt(
      "What is the 1330 helpline?",
      "1330 안내 전화는 무엇인가요?",
      "1330 服务热线是什么？",
    ),
    answer: lt(
      "1330 is the Korea Tourism Organization's 24-hour multilingual helpline (English, Chinese, Japanese, and more). Despite the name, it can also help residents with translation in emergencies, transit confusion, restaurant communication, or general living questions. It's a useful first call when you need quick language help.",
      "1330은 한국관광공사가 운영하는 24시간 다국어 전화 안내(영어·중국어·일본어 등)입니다. 이름은 관광용이지만, 응급 상황 통역, 교통편 안내, 식당 의사소통, 생활 일반 문의 등 거주자도 이용할 수 있습니다. 빠른 언어 지원이 필요할 때 첫 번째로 걸기 좋습니다.",
      "1330 是韩国旅游公社运营的 24 小时多语言服务热线（提供英语、中文、日语等）。虽名为旅游热线，但居民也可用于紧急翻译、交通指引、餐厅沟通和生活咨询。需要快速语言帮助时是不错的首选。",
    ),
    category: "safety-healthcare",
    cities: ["all"],
  },
  {
    id: "faq-17",
    question: lt(
      "How do I get an Alien Registration Card (ARC)?",
      "외국인등록증(ARC)은 어떻게 발급받나요?",
      "如何申请外国人登录证（ARC）？",
    ),
    answer: lt(
      "If you stay in Korea more than 90 days, you must apply for an ARC within 90 days of arrival at your local immigration office. Book an appointment via HiKorea (hikorea.go.kr) and bring your passport, visa, photo, application form, residence proof, and the fee (around 30,000 won). Processing takes 2-3 weeks.",
      "한국에 90일 이상 체류한다면 입국 후 90일 이내에 거주지 관할 출입국 관리소에서 외국인등록증을 신청해야 합니다. 하이코리아(hikorea.go.kr)에서 방문 예약을 하고, 여권·비자·사진·신청서·거주 증빙·수수료(약 3만 원)를 지참하세요. 발급에는 2~3주가 소요됩니다.",
      "在韩居留 90 天以上者，须在入境后 90 天内于居住地管辖的出入境管理事务所申请外国人登录证。请通过 HiKorea（hikorea.go.kr）预约，并携带护照、签证、照片、申请表、居住证明及手续费（约 30,000 韩元）。办理需 2~3 周。",
    ),
    category: "citizenship",
    cities: ["all"],
  },
  {
    id: "faq-18",
    question: lt(
      "Can I send money home from my Korean account?",
      "한국 계좌에서 본국으로 송금할 수 있나요?",
      "可以从韩国账户向境外汇款吗？",
    ),
    answer: lt(
      "Yes. Most banks allow overseas remittance once you complete identity verification. There is an annual limit (commonly USD 50,000 for non-employed foreigners) without extra documentation. Apps like Wise, SentBe, and Hanpass often offer cheaper fees and better exchange rates than bank counters.",
      "가능합니다. 본인 인증을 마치면 대부분의 은행에서 해외 송금이 가능합니다. 추가 서류 없이 송금 가능한 연간 한도가 있으며(보통 무직 외국인 기준 미화 5만 달러), Wise·센트비·한패스 같은 앱이 은행 창구보다 수수료가 저렴하고 환율이 좋은 경우가 많습니다.",
      "可以。完成实名认证后，大多数银行均可办理海外汇款。无需额外材料的年汇款限额通常为美元 5 万（无工作外国人为准）。Wise、SentBe、Hanpass 等汇款应用通常比银行柜台手续费更低、汇率更优惠。",
    ),
    category: "finances-spending",
    cities: ["all"],
  },
  {
    id: "faq-19",
    question: lt(
      "How do I find a job as a foreigner in Korea?",
      "외국인이 한국에서 일자리를 어떻게 찾나요?",
      "外国人在韩国如何找工作？",
    ),
    answer: lt(
      "Popular job boards include WorkNet (work.go.kr), HiKorea, Saramin, JobKorea, and English-friendly sites like Seoul Global Center jobs and LinkedIn. Visa type matters: E-7 (specialty), D-10 (job seeker), and F-series visas have different rules. Job centers (고용센터) and the Seoul Global Center offer free counseling.",
      "워크넷(work.go.kr), 하이코리아, 사람인, 잡코리아, 그리고 서울글로벌센터 잡포털·링크드인 같은 영어 채용 사이트가 많이 활용됩니다. 비자 종류가 중요한데, E-7(전문직), D-10(구직), F계열 비자에 따라 가능한 업무가 다릅니다. 고용센터와 서울글로벌센터에서 무료 상담을 제공합니다.",
      "常用招聘网站包括 WorkNet（work.go.kr）、HiKorea、Saramin、JobKorea，以及对英语友好的首尔全球中心招聘版和 LinkedIn。签证种类很关键，E-7（专业职）、D-10（求职）、F 系列签证适用规则不同。就业中心（고용센터）和首尔全球中心提供免费咨询。",
    ),
    category: "labour-employment",
    cities: ["all"],
  },
  {
    id: "faq-20",
    question: lt(
      "What are common Korean tax obligations for foreign workers?",
      "외국인 근로자의 일반적인 세금 의무는 무엇인가요?",
      "外国劳动者常见的纳税义务有哪些？",
    ),
    answer: lt(
      "Most foreign employees pay income tax through monthly withholding and complete year-end settlement (연말정산) in February. If you stay over 183 days a year, you are usually treated as a Korean resident for tax purposes. Check whether your home country has a tax treaty with Korea. The National Tax Service runs a foreign-language helpline at 1588-0560.",
      "대부분의 외국인 근로자는 매월 원천징수로 소득세를 납부하고 2월에 연말정산을 합니다. 한 해에 183일 이상 체류하면 일반적으로 거주자로 분류돼 한국 기준 과세를 받습니다. 본국과의 조세조약 여부도 확인하세요. 국세청은 1588-0560에서 외국어 상담을 제공합니다.",
      "大多数外籍员工通过每月预扣纳税，并在 2 月办理年末结算（연말정산）。一年内停留超过 183 天通常被视为税收居民。请查询本国与韩国是否签有税收协定。国税厅在 1588-0560 提供外语咨询。",
    ),
    category: "finances-spending",
    cities: ["all"],
  },
  {
    id: "faq-21",
    question: lt(
      "How do I find an English-speaking doctor or hospital?",
      "영어 가능한 의사나 병원은 어떻게 찾나요?",
      "如何找到能说英语的医生或医院？",
    ),
    answer: lt(
      "Major hospitals in Seoul (Severance, Samsung Medical Center, Asan, Seoul National University Hospital) have International Healthcare Centers. The Korea Tourism Organization's Medical Korea page (english.visitkorea.or.kr) lists certified hospitals. For non-urgent guidance, call 1339 (24/7 medical helpline with English support).",
      "서울 대형 병원(세브란스, 삼성서울병원, 아산, 서울대병원)에는 국제진료센터가 있습니다. 한국관광공사의 메디컬코리아 페이지(english.visitkorea.or.kr)에서 인증 병원을 찾을 수 있습니다. 긴급하지 않은 의료 상담은 1339(24시간 영어 가능)로 문의하세요.",
      "首尔的大医院（Severance、三星首尔、Asan、首尔大学医院）设有国际诊疗中心。韩国旅游公社的 Medical Korea 页面（english.visitkorea.or.kr）列有认证医院。非紧急医疗咨询可拨打 1339（24 小时英语支持）。",
    ),
    category: "safety-healthcare",
    cities: ["all"],
  },
  {
    id: "faq-22",
    question: lt(
      "How do I extend my visa before it expires?",
      "비자가 만료되기 전에 어떻게 연장하나요?",
      "签证到期前如何申请延长？",
    ),
    answer: lt(
      "You can apply for an extension up to 4 months before expiry. Book an appointment on HiKorea (hikorea.go.kr), prepare your passport, ARC, application form, supporting documents (employment certificate, tuition receipt, housing proof), and the fee. Apply at least 1 month before expiry to avoid overstay risk.",
      "비자 연장은 만료 4개월 전부터 신청할 수 있습니다. 하이코리아(hikorea.go.kr)에서 예약하고 여권, 외국인등록증, 신청서, 증빙 서류(재직증명서, 등록금 영수증, 거주 증빙 등), 수수료를 준비하세요. 불법 체류를 피하려면 만료 최소 1개월 전에는 신청하세요.",
      "签证延长可在到期前 4 个月开始申请。请通过 HiKorea（hikorea.go.kr）预约，并准备护照、外国人登录证、申请表、证明材料（在职证明、学费收据、居住证明等）及手续费。建议至少在到期前 1 个月办理，以免逾期居留。",
    ),
    category: "citizenship",
    cities: ["all"],
  },
  {
    id: "faq-23",
    question: lt(
      "Are there free Korean cultural programs for foreigners?",
      "외국인을 위한 무료 한국 문화 체험 프로그램이 있나요?",
      "有面向外国人的免费韩国文化体验项目吗？",
    ),
    answer: lt(
      "Yes. The Seoul Global Cultural Center, Korea House, and various 외국인주민센터 hold free or low-cost workshops in cooking, hanbok, pottery, calligraphy, and K-pop dance. The Korea Tourism Organization also lists experience programs. Sign up early because popular sessions fill up quickly.",
      "있습니다. 서울글로벌문화체험센터, 한국의 집, 외국인주민센터 등에서 요리, 한복, 도자기, 서예, K-pop 댄스 등 무료·저렴한 워크숍을 운영합니다. 한국관광공사에서도 다양한 체험 프로그램을 소개하고 있어요. 인기 세션은 금방 마감되니 일찍 신청하세요.",
      "有的。首尔全球文化中心、Korea House，以及各地外国人居民中心都开设免费或低价的烹饪、韩服、陶艺、书法、K-pop 舞蹈等工作坊。韩国旅游公社也介绍各种体验项目。热门课程很快满额，请尽早报名。",
    ),
    category: "education-skill-building",
    cities: ["all"],
  },
  {
    id: "faq-24",
    question: lt(
      "Where can I get help if I face workplace discrimination or unpaid wages?",
      "직장 차별이나 임금 체불을 겪으면 어디에서 도움을 받을 수 있나요?",
      "遇到职场歧视或拖欠工资时该向谁求助？",
    ),
    answer: lt(
      "Contact the Ministry of Employment and Labor at 1350 (multilingual support available) to report unpaid wages, illegal overtime, or discrimination. The Korea Legal Aid Corporation (132) and Migrant Workers Centers also offer free counseling. Keep records of contracts, pay stubs, work hours, and any messages with your employer.",
      "임금 체불, 부당 초과근무, 차별은 고용노동부 1350(다국어 가능)에 신고할 수 있습니다. 대한법률구조공단(132)과 이주노동자센터에서도 무료 상담을 제공합니다. 계약서, 급여명세서, 근무 시간 기록, 사용자와 주고받은 메시지를 보관하세요.",
      "可拨打雇佣劳动部 1350（提供多语言）举报拖欠工资、违法加班或歧视。大韩法律救助公团（132）和移居劳动者中心也提供免费咨询。请保留合同、工资单、工作时间记录及与雇主的沟通信息。",
    ),
    category: "labour-employment",
    cities: ["all"],
  },
];

export const communityPosts: CommunityPost[] = [
  {
    id: "post-1",
    slug: "mapo-health-center-first-visit",
    title: lt(
      "First visit to Mapo Public Health Center",
      "마포구 보건소 첫 방문 후기",
      "首次到访麻浦区保健所的经历",
    ),
    author: "Mina",
    city: "서울시",
    category: "safety-healthcare",
    excerpt: lt(
      "Sharing what I brought and how I checked English support before visiting.",
      "방문 전에 챙긴 것들과 영어 지원 가능 여부를 어떻게 확인했는지 공유합니다.",
      "分享我带去的物品以及如何在前往前确认英语支持。",
    ),
    body: lt(
      "I called before going and asked whether English support was available. They told me to bring my ARC and health insurance card. The visit was much easier after preparing the documents.",
      "방문 전에 전화로 영어 지원이 가능한지 물어봤습니다. 외국인등록증과 건강보험증을 챙겨오라고 안내해 주었고, 서류를 준비해 가니 훨씬 수월했어요.",
      "我在去之前先打了电话，询问是否提供英语支持。对方提醒我带上外国人登录证和健康保险卡。准备好文件后，整个就诊过程顺利多了。",
    ),
    replies: [
      {
        author: "Jae",
        body: lt(
          "Calling first helped me too. The available services can be different by city.",
          "저도 먼저 전화한 게 도움이 되었어요. 도시마다 가능한 서비스가 다를 수 있습니다.",
          "我也是先打电话比较顺利。各城市可提供的服务可能不同。",
        ),
      },
    ],
    updatedAt: "2026-05-16",
  },
  {
    id: "post-2",
    slug: "cheap-swimming-in-seongdong",
    title: lt(
      "Affordable swimming class in Seongdong",
      "성동구 저렴한 수영 강좌 후기",
      "城东区实惠的游泳课程",
    ),
    author: "Alex",
    city: "서울시",
    category: "sports-recreation",
    excerpt: lt(
      "The public sports center was much cheaper than private gyms.",
      "공공 체육센터가 사설 헬스장보다 훨씬 저렴했습니다.",
      "公共体育中心比私人健身房便宜很多。",
    ),
    body: lt(
      "Registration opened early in the morning and popular classes filled fast. The website was Korean-only, but the front desk helped me confirm the schedule.",
      "등록은 이른 아침에 시작되었고 인기 강좌는 빠르게 마감되었어요. 웹사이트는 한국어만 지원했지만 안내 데스크에서 일정을 확인해 주셨습니다.",
      "报名很早开始，热门课程一下子就满了。官网只支持韩语，不过前台帮我确认了时间表。",
    ),
    replies: [
      {
        author: "Lina",
        body: lt(
          "Try checking nearby city facilities too if your preferred time is full.",
          "원하는 시간대가 마감이라면 주변 구의 체육시설도 확인해 보세요.",
          "如果心仪时段已满，可以看看周边区的设施。",
        ),
      },
    ],
    updatedAt: "2026-05-15",
  },
  {
    id: "post-3",
    slug: "visa-extension-documents",
    title: lt(
      "Documents I prepared for visa extension",
      "비자 연장을 위해 준비한 서류",
      "为延长签证准备的文件",
    ),
    author: "Sam",
    city: "서울시",
    category: "citizenship",
    excerpt: lt(
      "My checklist before visiting immigration for an extension.",
      "출입국 방문 전에 점검한 체크리스트입니다.",
      "前往出入境办理延长前的我的清单。",
    ),
    body: lt(
      "I prepared my passport, ARC, application form, housing contract, and fee. Requirements can change by visa type, so I checked HiKorea and asked Seoul Global Center.",
      "여권, 외국인등록증, 신청서, 임대 계약서, 수수료를 준비했습니다. 비자 종류마다 요건이 다를 수 있어 HiKorea를 확인하고 서울 글로벌 센터에도 문의했어요.",
      "我准备了护照、外国人登录证、申请表、租房合同与费用。各签证种类要求不同，我同时在 HiKorea 和首尔全球中心进行了确认。",
    ),
    replies: [
      {
        author: "nabi team",
        body: lt(
          "Good reminder: always verify with official sources for visa matters.",
          "좋은 팁이에요. 비자 관련 사항은 항상 공식 자료로 확인해 주세요.",
          "好建议——签证事务请始终向官方来源核实。",
        ),
      },
    ],
    updatedAt: "2026-05-14",
  },
  {
    id: "post-4",
    slug: "cheonan-family-center-korean-class",
    title: lt(
      "Cheonan family center Korean class registration",
      "천안 가족지원센터 한국어 수업 등록기",
      "天安家庭中心韩语课程报名",
    ),
    author: "Nora",
    city: "천안시",
    category: "education-skill-building",
    excerpt: lt(
      "I found a beginner Korean class through the multicultural family center.",
      "다문화가족지원센터를 통해 초급 한국어 수업을 찾았어요.",
      "通过多文化家庭中心找到了初级韩语课程。",
    ),
    body: lt(
      "The center asked about my local address and family situation. It was helpful to call first because class levels and registration periods change.",
      "센터에서 거주지 주소와 가족 상황을 물어봤습니다. 강의 수준과 등록 기간이 바뀌니 먼저 전화해 본 게 도움이 됐어요.",
      "中心询问了我的本地地址与家庭情况。课程级别与报名时间会变动，先打电话很有帮助。",
    ),
    replies: [
      {
        author: "Dani",
        body: lt(
          "They also had family counseling programs when I checked last month.",
          "지난달에 확인했을 때는 가족 상담 프로그램도 운영하고 있었어요.",
          "我上个月查询时，他们还提供家庭咨询项目。",
        ),
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
