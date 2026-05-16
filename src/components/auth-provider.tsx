"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";

import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase";

export type AuthProfile = {
  id: string;
  displayName: string;
};

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  profile: AuthProfile | null;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<{ error: string | null; needsEmailConfirm: boolean }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function loadProfile(userId: string): Promise<AuthProfile | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = getSupabaseBrowserClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, display_name")
    .eq("id", userId)
    .maybeSingle();

  if (!data) return null;
  return { id: data.id, displayName: data.display_name };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const configured = isSupabaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [isLoading, setIsLoading] = useState(configured);

  useEffect(() => {
    if (!configured) {
      return;
    }

    const supabase = getSupabaseBrowserClient();
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setIsLoading(false);
      if (data.session?.user) {
        loadProfile(data.session.user.id).then((p) => {
          if (active) setProfile(p);
        });
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      if (nextSession?.user) {
        loadProfile(nextSession.user.id).then((p) => setProfile(p));
      } else {
        setProfile(null);
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [configured]);

  const signIn = useCallback<AuthContextValue["signIn"]>(async (email, password) => {
    if (!configured) {
      return { error: "Supabase is not configured." };
    }
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  }, [configured]);

  const signUp = useCallback<AuthContextValue["signUp"]>(
    async (email, password, displayName) => {
      if (!configured) {
        return { error: "Supabase is not configured.", needsEmailConfirm: false };
      }
      const supabase = getSupabaseBrowserClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName },
        },
      });

      if (error) {
        return { error: error.message, needsEmailConfirm: false };
      }

      if (data.user && data.session) {
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: data.user.id,
          display_name: displayName,
        });
        if (profileError) {
          return { error: profileError.message, needsEmailConfirm: false };
        }
        return { error: null, needsEmailConfirm: false };
      }

      return { error: null, needsEmailConfirm: true };
    },
    [configured],
  );

  const signOut = useCallback(async () => {
    if (!configured) return;
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
  }, [configured]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      profile,
      isLoading,
      isConfigured: configured,
      signIn,
      signUp,
      signOut,
    }),
    [user, session, profile, isLoading, configured, signIn, signUp, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>.");
  }
  return context;
}
