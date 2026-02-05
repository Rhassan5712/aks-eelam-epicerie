"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface Profile {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    role: 'user' | 'admin';
}

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: Profile | null;
    isLoading: boolean;
    signOut: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithPassword: (email: string, password: string) => Promise<{ error: any }>;
    signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const setData = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error getting session:', error);
            }

            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(profileData);
            }

            setIsLoading(false);
        };

        setData();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(profileData);
            } else {
                setProfile(null);
            }

            setIsLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [supabase]);

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
            setSession(null);
            setUser(null);
            setProfile(null);
            router.push('/');
            router.refresh();
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    const signInWithGoogle = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    const signInWithPassword = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { error };
    };

    const signUp = async (email: string, password: string, fullName: string) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        return { error };
    };

    return (
        <AuthContext.Provider value={{ user, session, profile, isLoading, signOut, signInWithGoogle, signInWithPassword, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
