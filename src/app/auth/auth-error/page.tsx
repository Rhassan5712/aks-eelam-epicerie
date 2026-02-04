"use client";

import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function AuthErrorPage() {
    return (
        <div className="min-h-dashboard flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full space-y-8 bg-navy-light/50 p-8 rounded-2xl border border-red-500/20 backdrop-blur-sm text-center">
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-3xl font-bold text-red-500 mb-2">Erreur d'Authentification</h2>
                <p className="text-slate-300 mb-8">
                    Nous n'avons pas pu valider votre session. Le lien a peut-être expiré ou est invalide.
                </p>
                <div className="flex flex-col gap-4">
                    <Link
                        href="/login"
                        className="inline-block bg-gold hover:bg-gold-light text-navy-deep py-3 px-8 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-gold/20"
                    >
                        Réessayer la connexion
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Retour à l'accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}
