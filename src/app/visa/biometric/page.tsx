"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { BiometricLockMock } from "@/components/visa/BiometricLockMock";

export default function VisaBiometricPage() {
  const router = useRouter();

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      router.replace("/visa");
    }, 1500);

    return () => window.clearTimeout(timeout);
  }, [router]);

  return <BiometricLockMock />;
}
