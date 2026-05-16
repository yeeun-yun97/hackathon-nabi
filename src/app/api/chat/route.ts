import OpenAI from "openai";

import { getCategoryLabel, recommendedCategoryIds, type UserProfile } from "@/lib/data";
import {
  aiResponseLanguageInstruction,
  defaultLocale,
  supportedLocales,
  translate,
  type Locale,
} from "@/lib/i18n";

function isSupportedLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (supportedLocales as readonly string[]).includes(value)
  );
}

export async function POST(request: Request) {
  const { message, profile, locale: rawLocale } = (await request.json()) as {
    message?: string;
    profile?: UserProfile;
    locale?: string;
  };

  const locale: Locale = isSupportedLocale(rawLocale) ? rawLocale : defaultLocale;

  if (!message?.trim()) {
    return Response.json({ error: "message is required" }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      {
        reply: translate(locale, "chat.missingApiKey"),
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
        `recommendedCategories=${recommendedCategoryIds(profile, 4)
          .map(getCategoryLabel)
          .join(", ")}`,
      ].join(", ")
    : "No user profile was provided.";

  const languageInstruction = aiResponseLanguageInstruction[locale];

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are nabi, a friendly multilingual guide for foreigners living in Korea. Provide practical, low-risk information about public services, healthcare, housing, immigration, education, culture, transport, finances, labour, and legal support. Use the user's profile (city, nationality, age, residency, housing, marital status, employment, family, visa, expiry) and the recommended categories to prioritize the most relevant guidance. Remind users to verify urgent legal, medical, or visa matters with official institutions.\n\nLanguage instruction: ${languageInstruction} If the user writes in a different language, still answer in the instructed language. Keep proper nouns (names, addresses, hotline numbers, organization names) in their original form.\n\nUser profile: ${profileContext}`,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return Response.json({
    reply:
      completion.choices[0]?.message.content ?? translate(locale, "chat.unanswered"),
  });
}
