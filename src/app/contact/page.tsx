"use client";

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ContactPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-24 pb-24">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
                    RESTEZ EN <span className="neon-text-cyan">CONTACT</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Une question ? Une commande spéciale ? N'hésitez pas à nous contacter ou à passer nous voir en magasin.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Info */}
                <div className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="glass-morphism p-6 border border-white/5 space-y-4">
                            <Phone className="w-8 h-8 text-neon-green" />
                            <h3 className="font-bold text-white uppercase italic">Téléphone</h3>
                            <p className="text-gray-400 text-sm">09 60 15 45 66</p>
                            <p className="text-gray-500 text-xs">Appel direct possible</p>
                        </div>
                        <div className="glass-morphism p-6 border border-white/5 space-y-4">
                            <Mail className="w-8 h-8 text-neon-cyan" />
                            <h3 className="font-bold text-white uppercase italic">Email</h3>
                            <p className="text-gray-400 text-sm">akseelam23@gmail.com</p>
                            <p className="text-gray-500 text-xs">Réponse sous 24h</p>
                        </div>
                        <div className="glass-morphism p-6 border border-white/5 space-y-4">
                            <MapPin className="w-8 h-8 text-neon-red" />
                            <h3 className="font-bold text-brand-gradient uppercase italic">Adresse</h3>
                            <p className="text-gray-400 text-sm">679 rue d'abbeville 80000 Amiens</p>
                            <p className="text-gray-500 text-xs">Amiens</p>
                        </div>
                        <div className="glass-morphism p-6 border border-white/5 space-y-4">
                            <Clock className="w-8 h-8 text-neon-yellow" />
                            <h3 className="font-bold text-brand-gradient uppercase italic">Ouverture</h3>
                            <p className="text-gray-400 text-sm">Lun - Dim: 09:30 - 04:30</p>
                            <p className="text-gray-500 text-xs">Ouvert 7j/7</p>
                        </div>
                    </div>

                    <div className="relative aspect-video w-full grayscale hover:grayscale-0 transition-all duration-700 rounded-sm overflow-hidden border border-white/10">
                        <iframe
                            src="https://maps.google.com/maps?q=679+rue+d'abbeville+80000+amiens&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 w-full h-full"
                        ></iframe>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="glass-morphism p-8 md:p-12 border border-white/10 relative">
                    <div className="absolute -top-6 -right-6 lg:-top-12 lg:-right-12 text-neon-cyan opacity-10">
                        <MessageSquare className="w-32 h-32 lg:w-64 lg:h-64" />
                    </div>

                    <form className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nom Complet</label>
                                <input
                                    type="text"
                                    placeholder="Jean Dupont"
                                    className="w-full bg-navy-deep border border-white/10 rounded-sm py-3 px-4 text-white focus:border-neon-cyan outline-none transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</label>
                                <input
                                    type="email"
                                    placeholder="jean@exemple.com"
                                    className="w-full bg-navy-deep border border-white/10 rounded-sm py-3 px-4 text-white focus:border-neon-cyan outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sujet</label>
                            <select className="w-full bg-navy-deep border border-white/10 rounded-sm py-3 px-4 text-white focus:border-neon-cyan outline-none transition-colors appearance-none">
                                <option>Information Générale</option>
                                <option>Commande Spéciale</option>
                                <option>Réclamation</option>
                                <option>Partenariat</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Message</label>
                            <textarea
                                rows={6}
                                placeholder="Votre message ici..."
                                className="w-full bg-navy-deep border border-white/10 rounded-sm py-3 px-4 text-white focus:border-neon-cyan outline-none transition-colors resize-none"
                            />
                        </div>

                        <Button variant="neon-cyan" size="lg" className="w-full group">
                            Envoyer le message <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
