"use client";

import Link from 'next/link';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import CartDrawer from '@/components/ui/CartDrawer';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cartCount } = useCart();
    const { user, profile, signOut } = useAuth();

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism h-16 border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                    <Link href="/" className="flex items-center">
                        <span className="text-2xl font-bold tracking-tighter text-brand-gradient mr-2">
                            AKS EELAM
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-300 animated-underline font-bold uppercase text-xs tracking-widest hover:text-white transition-colors">Accueil</Link>
                        <Link href="/produits" className="text-gray-300 animated-underline font-bold uppercase text-xs tracking-widest hover:text-white transition-colors">Produits</Link>
                        <Link href="/services" className="text-gray-300 animated-underline font-bold uppercase text-xs tracking-widest hover:text-white transition-colors">Services</Link>
                        <Link href="/contact" className="text-gray-300 animated-underline font-bold uppercase text-xs tracking-widest hover:text-white transition-colors">Contact</Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="text-gray-300 hover:text-neon-yellow transition-colors relative p-2"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-neon-red text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {user ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/account"
                                    className="hidden md:flex items-center gap-2 text-gray-300 hover:text-neon-cyan transition-colors"
                                >
                                    {profile?.avatar_url ? (
                                        <img src={profile.avatar_url} alt="" className="w-8 h-8 rounded-full border border-gold/50" />
                                    ) : (
                                        <User className="w-6 h-6" />
                                    )}
                                    <span className="text-xs font-bold uppercase tracking-tight truncate max-w-[100px]">
                                        {profile?.full_name || user.email?.split('@')[0]}
                                    </span>
                                </Link>
                                {(profile?.role === 'admin' || ["hassannawaz95100@gmail.com", "arthigankugan12@gmail.com"].includes(user.email || "")) && (
                                    <Link
                                        href="/admin"
                                        className="hidden md:flex items-center gap-2 text-neon-yellow hover:text-white transition-colors border border-neon-yellow/30 px-3 py-1 rounded-lg"
                                    >
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Admin</span>
                                    </Link>
                                )}
                                <button
                                    onClick={() => signOut()}
                                    className="text-[10px] font-bold text-slate-500 hover:text-neon-red uppercase tracking-widest transition-colors"
                                >
                                    Déconnexion
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="hidden md:flex items-center gap-2 text-gray-300 hover:text-neon-cyan transition-colors bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
                            >
                                <User className="w-5 h-5" />
                                <span className="text-xs font-bold uppercase tracking-widest">Connexion</span>
                            </Link>
                        )}

                        <button
                            className="md:hidden text-gray-300 p-2"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden glass-morphism border-b border-white/10 py-4 px-4 space-y-4 animate-in fade-in slide-in-from-top-4">
                        <Link href="/" className="block text-gray-300 font-bold uppercase text-xs" onClick={() => setIsOpen(false)}>Accueil</Link>
                        <Link href="/produits" className="block text-gray-300 font-bold uppercase text-xs" onClick={() => setIsOpen(false)}>Produits</Link>
                        <Link href="/services" className="block text-gray-300 font-bold uppercase text-xs" onClick={() => setIsOpen(false)}>Services</Link>
                        <Link href="/contact" className="block text-gray-300 font-bold uppercase text-xs" onClick={() => setIsOpen(false)}>Contact</Link>
                        <div className="border-t border-white/10 pt-4 mt-4">
                            {user ? (
                                <div className="space-y-4">
                                    <Link href="/account" className="flex items-center gap-2 text-gray-300 font-bold uppercase text-xs" onClick={() => setIsOpen(false)}>
                                        <User className="w-5 h-5" />
                                        Mon Compte
                                    </Link>
                                    <button
                                        onClick={() => {
                                            signOut();
                                            setIsOpen(false);
                                        }}
                                        className="text-gray-300 font-bold uppercase text-xs text-left w-full hover:text-neon-red"
                                    >
                                        Se déconnecter
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login" className="flex items-center gap-2 text-neon-cyan font-bold uppercase text-xs" onClick={() => setIsOpen(false)}>
                                    <User className="w-5 h-5" />
                                    Se connecter / S'inscrire
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
