/**
 * Illustrative F-2-7 "horizon" scoring for the Discover visa tab.
 * Combines saved profile fields (TOPIK, KIIP, degree, logged volunteer hours) into a demo track.
 * This is not an official immigration score—only a product mock tied to user-entered data.
 */

import type {
  DegreeLevel,
  KiipStage,
  TopikLevel,
  UserProfile,
  VisaPointComponent,
  VisaSubtype,
  VisaTrack,
} from "@/lib/data";
import { lt } from "@/lib/i18n";
import { daysUntilVisaExpiry } from "@/lib/profile";

export const VISA_HORIZON_TARGET_VISA = "F-2-7" as const satisfies VisaSubtype;

const ILLUSTRATIVE_TARGET_POINTS = 80;

function topikIllustrativePoints(level: TopikLevel): number {
  switch (level) {
    case "none":
      return 0;
    case "1":
    case "2":
      return 6;
    case "3":
      return 12;
    case "4":
      return 20;
    case "5":
      return 24;
    case "6":
      return 26;
    default:
      return 0;
  }
}

function kiipIllustrativePoints(stage: KiipStage): number {
  switch (stage) {
    case "none":
      return 0;
    case "0":
    case "1":
    case "2":
      return 3;
    case "3":
    case "4":
      return 7;
    case "5":
      return 10;
    default:
      return 0;
  }
}

function degreeIllustrativePoints(level: DegreeLevel): number {
  switch (level) {
    case "none":
      return 0;
    case "high-school":
      return 8;
    case "bachelor":
      return 28;
    case "master":
      return 39;
    case "phd":
      return 44;
    default:
      return 0;
  }
}

function volunteerIllustrativePoints(hours: number): number {
  const h = Math.max(0, hours);
  return Math.min(15, Math.floor(h / 50) * 5);
}

function topikNumeric(level: TopikLevel): number {
  if (level === "none") {
    return 0;
  }
  return Number.parseInt(level, 10) || 0;
}

function topikEarnedLabel(level: TopikLevel): VisaPointComponent["label"] {
  if (level === "none") {
    return lt("TOPIK (not logged yet)", "TOPIK (아직 미기재)", "TOPIK（尚未填写）");
  }
  return lt(`TOPIK Level ${level}`, `TOPIK ${level}급`, `TOPIK ${level}级`);
}

function kiipEarnedLabel(stage: KiipStage): VisaPointComponent["label"] {
  if (stage === "none") {
    return lt("KIIP (not logged yet)", "KIIP (아직 미기재)", "KIIP（尚未填写）");
  }
  return lt(`KIIP Stage ${stage}`, `KIIP ${stage}단계`, `KIIP 第${stage}阶段`);
}

function degreeEarnedLabel(level: DegreeLevel): VisaPointComponent["label"] {
  const map: Record<DegreeLevel, VisaPointComponent["label"]> = {
    none: lt("Degree (not logged yet)", "학력 (아직 미기재)", "学历（尚未填写）"),
    "high-school": lt("High school track", "고등학교", "高中学历"),
    bachelor: lt("Bachelor's track", "학사", "本科"),
    master: lt("Master's track", "석사", "硕士"),
    phd: lt("Doctorate track", "박사", "博士"),
  };
  return map[level];
}

export function buildVisaHorizonFromProfile(profile: UserProfile): VisaTrack {
  const hours = profile.volunteerHoursLogged ?? 0;
  const tp = topikIllustrativePoints(profile.topikLevel);
  const kp = kiipIllustrativePoints(profile.kiipStage);
  const dp = degreeIllustrativePoints(profile.degreeLevel);
  const vp = volunteerIllustrativePoints(hours);
  const currentPoints = tp + kp + dp + vp;

  const visaDays = daysUntilVisaExpiry(profile.visaExpiryDate);
  const expiresInDays = visaDays > 0 ? visaDays : 180;
  const unlockEtaDays = visaDays > 0 ? Math.min(Math.max(visaDays, 30), 365) : 180;

  const earned: VisaPointComponent[] = [
    {
      id: "illustrative-topik",
      label: topikEarnedLabel(profile.topikLevel),
      points: tp,
      status: "earned",
      action: lt(
        "Illustrative language points from your saved TOPIK level in onboarding or profile.",
        "온보딩·프로필에 저장된 TOPIK 급수로 계산한 참고용 언어 점수입니다.",
        "根据您在入门或档案中保存的 TOPIK 级别计算的演示性语言分。",
      ),
    },
    {
      id: "illustrative-kiip",
      label: kiipEarnedLabel(profile.kiipStage),
      points: kp,
      status: "earned",
      action: lt(
        "Illustrative integration-program points from your saved KIIP stage.",
        "저장된 KIIP 단계를 바탕으로 한 참고용 점수입니다.",
        "根据已保存的 KIIP 阶段计算的演示分数。",
      ),
    },
    {
      id: "illustrative-degree",
      label: degreeEarnedLabel(profile.degreeLevel),
      points: dp,
      status: "earned",
      action: lt(
        "Illustrative academic-track points from your saved degree level.",
        "저장된 최종 학력을 바탕으로 한 참고용 학력 점수입니다.",
        "根据已保存的学历档位计算的演示性学业分。",
      ),
    },
    {
      id: "illustrative-volunteer",
      label: lt(
        `Community service (logged ${hours}h)`,
        `봉사활동 (기록 ${hours}시간)`,
        `社区服务（已记录 ${hours} 小时）`,
      ),
      points: vp,
      status: "earned",
      action: lt(
        "Five illustrative points per 50 verified hours you log (max 15 in this demo).",
        "기록한 시간마다 50시간당 참고 점수 5점, 이 데모에선 최대 15점입니다.",
        "本演示中每记录满 50 小时示例分 +5，上限 15。",
      ),
    },
  ];

  const topikN = topikNumeric(profile.topikLevel);
  const topikStrategy: VisaPointComponent =
    topikN >= 5
      ? {
          id: "topik-upgrade",
          label: lt(
            "TOPIK band",
            "TOPIK 구간",
            "TOPIK 档次",
          ),
          points: 15,
          status: "earned",
          action: lt(
            "Your saved level is already TOPIK 5+ in this illustrative model.",
            "저장된 급수가 이 참고 모델에서 이미 TOPIK 5급 이상으로 반영돼 있어요.",
            "在当前演示模型中，您保存的级别已按 TOPIK 5 级及以上计入。",
          ),
          locality: {
            label: lt(
              "Raise TOPIK only if an advisor confirms extra points matter for your case.",
              "추가 점수가 본인에게 실제로 필요한지 전문가 확인 후에만 상향을 검토하세요.",
              "仅在顾问确认对您确有分数意义时再考虑刷高 TOPIK。",
            ),
            url: "https://www.topik.go.kr",
          },
        }
      : {
          id: "topik-upgrade",
          label: lt(
            "Option A: TOPIK ladder upgrade",
            "옵션 A: TOPIK 단계 상향",
            "选项 A：TOPIK 等级提升",
          ),
          points: 15,
          status: "available",
          action: lt(
            "Move toward TOPIK Level 5 or 6 so illustrative language points can rise (verify with an official checklist).",
            "참고용 언어 점수를 올리려면 TOPIK 5·6급을 목표로 하되, 실제 제출 서류는 출입국 안내를 확인하세요.",
            "为提高演示性语言分可向 TOPIK 5/6 努力，正式计分以出入境当局指南为准。",
          ),
          locality: {
            label: lt(
              "Book the next national session and protect thesis weeks from crunch.",
              "다음 전국 회차를 예약하고, 논문 마감 주간과 겹치지 않게 리듬을 잡으세요.",
              "报名下一次统考，并避开论文周冲刺。",
            ),
            nextIntake: "2026-06-15",
            url: "https://www.topik.go.kr",
          },
        };

  const volunteerStrategy: VisaPointComponent =
    hours >= 50
      ? {
          id: "volunteer-hours",
          label: lt("Community service", "봉사활동", "社区服务"),
          points: 5,
          status: "earned",
          action: lt(
            "You logged at least 50 hours in this demo—illustrative volunteer points are maxed until you add more bands.",
            "데모에서 50시간 이상 기록되어 참고용 봉사 점수 구간이 채워졌어요.",
            "演示中已满 50 小时记录，示例性志愿分已按档计满。",
          ),
          locality: {
            label: lt(
              "Keep certificates from the 1365 portal for interviews.",
              "1365 포털 인증 내역을 면접·제출용으로 보관하세요.",
              "请保留 1365 平台认证记录以备提交。",
            ),
            url: "https://www.1365.go.kr",
          },
        }
      : {
          id: "volunteer-hours",
          label: lt("Option B: Community service", "옵션 B: 봉사활동", "选项 B：社区服务"),
          points: 5,
          status: "available",
          action: lt(
            "Log 50 verified hours through the 1365 volunteer portal, then update your saved hours on the visa edit screen.",
            "1365 포털에서 인증 봉사 50시간을 채운 뒤 비자 정보 화면에 시간을 반영하세요.",
            "在 1365 平台记录满 50 小时认证服务后，在签证信息页更新已记录小时数。",
          ),
          locality: {
            label: lt(
              "District volunteer centers post weekend shifts that fit student schedules.",
              "구 자원봉사센터에 학생 일정에 맞는 주말 일정이 많이 올라옵니다.",
              "区志愿中心常发适合学生的周末岗。",
            ),
            url: "https://www.1365.go.kr",
          },
        };

  const gradLocked = profile.employmentStatus === "student";

  const gradStrategy: VisaPointComponent = {
    id: "graduation-milestone",
    label: lt(
      "Option C: Academic milestone",
      "옵션 C: 학업 마일스톤",
      "选项 C：学业节点",
    ),
    points: 7,
    status: gradLocked ? "locked" : "available",
    action: gradLocked
      ? lt(
          "While you remain a student, finish coursework before counting this milestone in your plan.",
          "재학 중에는 이 마일스톤을 실행 계획에 넣기 전에 학업 이수를 우선하세요.",
          "仍在就读时，请先完成课业再把这个节点纳入计划。",
        )
      : lt(
          "Confirm graduation or degree certificates with your school office and immigration counselor.",
          "졸업·학위 증명은 학교 행정 및 출입국 상담으로 최종 확인하세요.",
          "毕业/学位证明请以学校与移民顾问核实为准。",
        ),
    locality: {
      label: lt(
        "International offices publish certificate timelines each semester.",
        "국제처는 학기마다 증명서 발급 일정을 안내합니다.",
        "国际处每学期会公布证明开具时间。",
      ),
    },
  };

  return {
    currentVisa: profile.currentVisaSubtype,
    targetVisa: VISA_HORIZON_TARGET_VISA,
    currentPoints,
    targetPoints: ILLUSTRATIVE_TARGET_POINTS,
    unlockEtaDays,
    expiresInDays,
    earned,
    strategies: [topikStrategy, volunteerStrategy, gradStrategy],
  };
}
