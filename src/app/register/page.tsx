"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Mail, Lock, User, UserPlus, Chrome } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const { signUp, signInWithGoogle } = useAuth();
    const router = useRouter();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setIsLoading(true);
        try {
            const { error } = await signUp(email, password, fullName);
            if (error) {
                // Traduction des erreurs courantes de Supabase
                if (error.message.includes("Rate limit exceeded") || error.message.includes("Too many requests")) {
                    setError("Trop de tentatives. Veuillez patienter un moment avant de réessayer.");
                } else if (error.message.includes("User already registered")) {
                    setError("Cet email est déjà utilisé par un autre compte.");
                } else if (error.message.includes("Password should be at least")) {
                    setError("Le mot de passe doit contenir au moins 6 caractères.");
                } else {
                    setError(error.message);
                }
            } else {
                setSuccess(true);
            }
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de l'inscription.");
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

    if (success) {
        return (
            <div className="min-h-dashboard flex items-center justify-center px-4 py-12">
                <div className="max-w-md w-full space-y-8 bg-navy-light/50 p-8 rounded-2xl border border-gold/10 backdrop-blur-sm text-center">
                    <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <UserPlus className="w-10 h-10 text-gold" />
                    </div>
                    <h2 className="text-3xl font-bold text-gold mb-2">Vérifiez vos emails</h2>
                    <p className="text-slate-300 mb-8">
                        Un lien de confirmation a été envoyé à <strong>{email}</strong>.
                        Veuillez cliquer sur le lien pour activer votre compte.
                    </p>
                    <Link
                        href="/login"
                        className="inline-block bg-gold hover:bg-gold-light text-navy-deep py-3 px-8 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-gold/20"
                    >
                        Retour à la connexion
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-dashboard flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-navy-light/50 p-8 rounded-2xl border border-gold/10 backdrop-blur-sm">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gold mb-2">Créer un compte</h2>
                    <p className="text-slate-400">Rejoignez AKS EELAM dès aujourd'hui</p>
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
                        S'inscrire avec Google
                    </button>

                    <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-navy-light/0 text-slate-500 backdrop-blur-sm">Ou s'inscrire avec email</span>
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Nom complet</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full bg-navy-deep border border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all text-white placeholder:text-slate-600"
                                    placeholder="Jean Dupont"
                                />
                            </div>
                        </div>

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

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">Confirmer le mot de passe</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-navy-deep border border-slate-700 rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-gold/50 focus:border-gold outline-none transition-all text-white placeholder:text-slate-600"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gold hover:bg-gold-light text-navy-deep py-3 px-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-gold/20 disabled:opacity-50"
                        >
                            {isLoading ? "Création..." : "S'inscrire"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-slate-400 text-sm">
                    Déjà un compte ?{' '}
                    <Link href="/login" className="text-gold hover:text-gold-light font-semibold underline underline-offset-4">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
}
