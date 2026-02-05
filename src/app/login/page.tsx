"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Mail, Lock, LogIn, Chrome } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const { signInWithGoogle, signInWithPassword } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const { error } = await signInWithPassword(email, password);
            if (error) {
                // Traduction des erreurs courantes
                if (error.message.includes("Invalid login credentials")) {
                    setError("Email ou mot de passe incorrect.");
                } else if (error.message.includes("Email not confirmed")) {
                    setError("Veuillez confirmer votre email avant de vous connecter.");
                } else if (error.message.includes("Rate limit exceeded") || error.message.includes("Too many requests")) {
                    setError("Trop de tentatives de connexion. Veuillez patienter.");
                } else {
                    setError(error.message);
                }
            } else {
                router.push('/');
            }
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de la connexion.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signInWithGoogle();
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-dashboard flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-navy-light/50 p-8 rounded-2xl border border-gold/10 backdrop-blur-sm">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gold mb-2">Bon retour !</h2>
                    <p className="text-slate-400">Connectez-vous à votre compte AKS EELAM</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl text-sm font-medium">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-3 bg-white text-navy-deep hover:bg-slate-100 py-3 px-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
                    >
                        <Chrome className="w-5 h-5" />
                        Continuer avec Google
                    </button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-navy-light/0 text-slate-500 backdrop-blur-sm">Ou continuer avec email</span>
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-navy-deep border border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all text-white placeholder:text-slate-600"
                                    placeholder="votre@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-navy-deep border border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all text-white placeholder:text-slate-600"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-neon-gold hover:bg-neon-yellow text-navy-deep py-3 px-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-neon-gold/20 disabled:opacity-50"
                        >
                            {isLoading ? "Connexion..." : "Se connecter"}
                        </button>
                    </form>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-center text-slate-400 text-sm mb-4">
                        Pas encore de compte ?
                    </p>
                    <Link
                        href="/register"
                        className="w-full block text-center bg-slate-800 hover:bg-slate-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 border border-slate-700 hover:border-slate-600"
                    >
                        Créer un compte
                    </Link>
                </div>
            </div>
        </div>
    );
}
