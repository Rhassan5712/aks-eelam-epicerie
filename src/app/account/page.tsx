"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User, Package, Settings, LogOut, CreditCard, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
    const { user, profile, isLoading, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-dashboard flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-gold"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-dashboard py-12 px-4 md:px-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* Header Profile */}
                <div className="bg-navy-light/50 border border-gold/10 rounded-2xl p-6 md:p-10 backdrop-blur-sm flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-neon-gold overflow-hidden bg-navy-deep flex items-center justify-center">
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-12 h-12 text-slate-400" />
                            )}
                        </div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 bg-neon-green rounded-full border-4 border-navy-light"></div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-3xl font-bold text-white mb-2">{profile?.full_name || "Utilisateur"}</h1>
                        <p className="text-slate-400 mb-4">{user.email}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-bold border border-gold/20">
                                Membre AKS EELAM
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full md:w-auto">
                        <button className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl transition-colors border border-slate-700">
                            <Settings className="w-4 h-4" />
                            Paramètres
                        </button>
                        <button
                            onClick={signOut}
                            className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 px-4 py-2 rounded-xl transition-colors border border-red-500/20"
                        >
                            <LogOut className="w-4 h-4" />
                            Se déconnecter
                        </button>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Main Content - Orders */}
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Package className="w-6 h-6 text-neon-cyan" />
                            Mes Commandes
                        </h2>

                        {/* Empty State / Mock Data */}
                        <div className="bg-navy-light/30 border border-white/5 rounded-2xl p-8 text-center">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="w-8 h-8 text-slate-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Aucune commande pour le moment</h3>
                            <p className="text-slate-400 mb-6 max-w-md mx-auto">
                                Vous n'avez pas encore passé de commande. Découvrez nos produits et commencez votre shopping !
                            </p>
                            <Link
                                href="/produits"
                                className="inline-block bg-gradient-to-b from-[var(--color-neon-green)] to-[var(--color-neon-yellow)] hover:brightness-110 text-navy-deep px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-neon-green/20"
                            >
                                Explorer la boutique
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar - Quick Info */}
                    <div className="space-y-6">

                        {/* Address Card */}
                        <div className="bg-navy-light/30 border border-white/5 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-neon-pink" />
                                Carnet d'adresses
                            </h3>
                            <p className="text-slate-400 text-sm italic mb-4">Aucune adresse enregistrée</p>
                            <button className="text-neon-cyan text-sm font-bold hover:underline">
                                + Ajouter une adresse
                            </button>
                        </div>

                        {/* Payment Card */}
                        <div className="bg-navy-light/30 border border-white/5 rounded-2xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <CreditCard className="w-5 h-5 text-neon-green" />
                                Moyen de paiement
                            </h3>
                            <p className="text-slate-400 text-sm italic mb-4">Aucune carte enregistrée</p>
                            <button className="text-neon-cyan text-sm font-bold hover:underline">
                                + Ajouter une carte
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
