"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { useAuth } from "@/components/auth-provider";
import { useLanguage } from "@/components/language-provider";

const cardClass = "rounded-3xl border border-black/[0.06] bg-white p-8 shadow-sm";
const inputClass =
  "mt-2 w-full rounded-2xl border border-black/[0.08] bg-[#f6f7fb] px-4 py-3 text-base outline-none transition focus:border-[#2B4FA5] focus:ring-2 focus:ring-[#2B4FA5]/20";

type Mode = "signin" | "signup";

function safeRedirect(redirectTo: string | null) {
  if (!redirectTo) return "/community";
  if (!redirectTo.startsWith("/") || redirectTo.startsWith("//")) {
    return "/community";
  }
  return redirectTo;
}

export function AuthForm({ mode }: { mode: Mode }) {
  const { t } = useLanguage();
  const { signIn, signUp, isConfigured } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = safeRedirect(params.get("redirectTo"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isSignUp = mode === "signup";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setInfo(null);

    if (!isConfigured) {
      setError(t("auth.notConfigured"));
      return;
    }

    setSubmitting(true);
    try {
      if (isSignUp) {
        const trimmedName = displayName.trim();
        if (trimmedName.length < 2) {
          setError(t("auth.displayName"));
          return;
        }
        const result = await signUp(email.trim(), password, trimmedName);
        if (result.error) {
          setError(result.error);
          return;
        }
        if (result.needsEmailConfirm) {
          setInfo(t("auth.confirmEmail"));
          return;
        }
        router.push(redirectTo);
      } else {
        const result = await signIn(email.trim(), password);
        if (result.error) {
          setError(result.error);
          return;
        }
        router.push(redirectTo);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] text-[#17211f]">
      <div className="mx-auto flex w-full max-w-md flex-col gap-8 px-6 pb-20 pt-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#2B4FA5]">
            {t("header.nav.community")}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em]">
            {isSignUp ? t("auth.signUpTitle") : t("auth.signInTitle")}
          </h1>
          <p className="mt-3 leading-7 text-[#52615b]">
            {isSignUp ? t("auth.signUpSubtitle") : t("auth.signInSubtitle")}
          </p>
        </div>
        <form className={cardClass} onSubmit={handleSubmit}>
          {!isConfigured ? (
            <p className="mb-5 rounded-2xl bg-[#fff5d6] px-4 py-3 text-sm font-medium text-[#7a5a00]">
              {t("auth.notConfigured")}
            </p>
          ) : null}
          {isSignUp ? (
            <label className="block">
              <span className="text-sm font-semibold">{t("auth.displayName")}</span>
              <input
                autoComplete="name"
                className={inputClass}
                onChange={(event) => setDisplayName(event.target.value)}
                required
                type="text"
                value={displayName}
              />
            </label>
          ) : null}
          <label className={`block ${isSignUp ? "mt-5" : ""}`}>
            <span className="text-sm font-semibold">{t("auth.email")}</span>
            <input
              autoComplete="email"
              className={inputClass}
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </label>
          <label className="mt-5 block">
            <span className="text-sm font-semibold">{t("auth.password")}</span>
            <input
              autoComplete={isSignUp ? "new-password" : "current-password"}
              className={inputClass}
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>
          {error ? (
            <p className="mt-5 rounded-2xl bg-[#ffe1e1] px-4 py-3 text-sm font-medium text-[#a40000]">
              {error}
            </p>
          ) : null}
          {info ? (
            <p className="mt-5 rounded-2xl bg-[#e8f1ff] px-4 py-3 text-sm font-medium text-[#1a3a7c]">
              {info}
            </p>
          ) : null}
          <button
            className="mt-6 w-full rounded-full bg-[#2B4FA5] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23408a] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={submitting}
            type="submit"
          >
            {submitting
              ? t(isSignUp ? "auth.signingUp" : "auth.signingIn")
              : t(isSignUp ? "auth.signUpCta" : "auth.signInCta")}
          </button>
        </form>
        <p className="text-sm text-[#52615b]">
          {isSignUp ? t("auth.haveAccount") : t("auth.noAccount")}{" "}
          <Link
            className="font-semibold text-[#2B4FA5] hover:underline"
            href={
              isSignUp
                ? `/login${params.get("redirectTo") ? `?redirectTo=${encodeURIComponent(params.get("redirectTo")!)}` : ""}`
                : `/signup${params.get("redirectTo") ? `?redirectTo=${encodeURIComponent(params.get("redirectTo")!)}` : ""}`
            }
          >
            {t(isSignUp ? "auth.signInCta" : "auth.signUpCta")}
          </Link>
        </p>
        <Link className="text-sm font-semibold text-[#2B4FA5] hover:underline" href="/">
          {t("common.back")}
        </Link>
      </div>
    </main>
  );
}
