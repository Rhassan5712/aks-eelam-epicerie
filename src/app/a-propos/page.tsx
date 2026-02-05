"use client";

import { motion } from 'framer-motion';
import { Heart, Users, ShieldCheck, Truck } from 'lucide-react';

export default function AboutPage() {
    const stats = [
        { label: 'Années d\'expérience', value: '10+' },
        { label: 'Produits en rayon', value: '2000+' },
        { label: 'Clients satisfaits', value: '50k+' },
        { label: 'Ouverture', value: '7j/7' },
    ];

    return (
        <div className="space-y-24 pb-24">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-navy-deep" />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-transparent to-navy-deep" />

                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase"
                    >
                        L'HISTOIRE D'<span className="neon-text-cyan">AKS EELAM</span>
                    </motion.h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-xl font-light">
                        Plus qu'une épicerie, un pont entre les cultures au cœur de Paris.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="max-w-5xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center space-y-2">
                            <div className="text-3xl md:text-5xl font-black neon-text-yellow">{stat.value}</div>
                            <div className="text-xs uppercase tracking-widest text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Content */}
            <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">NOTRE MISSION</h2>
                    <div className="w-20 h-1 bg-neon-cyan" />
                    <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
                        <p>
                            Fondée il y a plus de 10 ans, AKS EELAM est née d'une volonté simple : offrir aux Parisiens le meilleur des produits exotiques tout en assurant un service de proximité irréprochable.
                        </p>
                        <p>
                            Située au 123 Avenue de la République, notre boutique est devenue un lieu de rencontre pour les amateurs de saveurs d'ailleurs et ceux qui cherchent la qualité au juste prix.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        <div className="flex items-start space-x-4">
                            <Heart className="w-8 h-8 text-neon-red flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-white">Passion</h4>
                                <p className="text-sm text-gray-500">Amour des produits authentiques.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <Users className="w-8 h-8 text-neon-cyan flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-white">Communauté</h4>
                                <p className="text-sm text-gray-500">Un accueil chaleureux pour tous.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative aspect-square">
                    <div className="absolute inset-0 border-2 border-neon-cyan translate-x-4 translate-y-4" />
                    <div className="relative h-full w-full overflow-hidden border border-white/10">
                        <div className="w-full h-full bg-navy-dark flex items-center justify-center text-8xl">🏪</div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-navy-dark/50 py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16 px-4">
                        <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter">NOS ENGAGEMENTS</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: ShieldCheck, title: "Qualité Garantie", desc: "Nous sélectionnons rigoureusement chaque fournisseur pour vous garantir la fraîcheur.", color: "cyan" },
                            { icon: Truck, title: "Service Rapide", desc: "Un retrait en magasin rapide pour votre confort.", color: "yellow" },
                            { icon: Heart, title: "Proximité", desc: "Ouvert tous les jours jusque tard pour être là quand vous avez besoin de nous.", color: "red" }
                        ].map((v, i) => {
                            const Icon = v.icon;
                            return (
                                <div key={i} className="glass-morphism p-8 border border-white/5 space-y-4 hover:border-white/20 transition-all">
                                    <Icon className={`w-12 h-12 text-neon-${v.color}`} />
                                    <h3 className="text-xl font-bold text-white uppercase">{v.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
