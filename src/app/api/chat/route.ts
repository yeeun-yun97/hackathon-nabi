import OpenAI from "openai";

import { getCategoryLabel, recommendedCategoryIds, type UserProfile } from "@/lib/data";

export async function POST(request: Request) {
  const { message, profile } = (await request.json()) as {
    message?: string;
    profile?: UserProfile;
  };

  if (!message?.trim()) {
    return Response.json({ error: "message is required" }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      {
        reply:
          "OPENAI_API_KEY가 아직 설정되지 않았어요. Vercel 또는 .env.local에 키를 추가하면 AI 상담을 사용할 수 있습니다.",
      },
      { status: 200 },
    );
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const profileContext = profile
    ? [
        `city=${profile.city}`,
        `preferredLanguage=${profile.preferredLanguage}`,
        `nationality=${profile.nationality || "not provided"}`,
        `gender=${profile.gender}`,
        `ageGroup=${profile.ageGroup}`,
        `residencyStatus=${profile.residencyStatus}`,
        `housingStatus=${profile.housingStatus}`,
        `maritalStatus=${profile.maritalStatus}`,
        `employmentStatus=${profile.employmentStatus}`,
        `familyStatus=${profile.familyStatus}`,
        `hasVisa=${profile.hasVisa}`,
        `multiculturalFamily=${profile.multiculturalFamily}`,
        `visaExpiryDate=${profile.visaExpiryDate || "not provided"}`,
        `recommendedCategories=${recommendedCategoryIds(profile, 4).map(getCategoryLabel).join(", ")}`,
      ].join(", ")
    : "No user profile was provided.";

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are Nari, a friendly multilingual guide for foreigners living in Korea. Provide practical, low-risk information about public services, healthcare, housing, immigration, education, culture, transport, finances, labour, and legal support. Use the user's profile (city, nationality, age, residency, housing, marital status, employment, family, visa, expiry) and the recommended categories to prioritize the most relevant guidance. Remind users to verify urgent legal, medical, or visa matters with official institutions. User profile: ${profileContext}`,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return Response.json({
    reply:
      completion.choices[0]?.message.content ??
      "답변을 만들지 못했어요. 질문을 조금 더 구체적으로 적어주세요.",
  });
}
