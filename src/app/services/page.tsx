"use client";

import { motion } from 'framer-motion';
import { Truck, Package, PhoneCall, ShoppingBag, Clock, ShieldCheck } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ServicesPage() {
    const services = [
        {
            icon: ShoppingBag,
            title: "Click & Collect",
            desc: "Commandez en ligne et récupérez vos articles en magasin en moins de 20 minutes.",
            color: "yellow",
            details: ["Évitez la file d'attente", "Service gratuit", "Disponible 7j/7"]
        },
        {
            icon: PhoneCall,
            title: "Commande Téléphonique",
            desc: "Préférez le contact humain ? Appelez-nous pour préparer votre commande à l'avance.",
            color: "red",
            details: ["Conseils personnalisés", "Disponibilité immédiate", "Paiement en magasin"]
        },
        {
            icon: Package,
            title: "Produits sur Demande",
            desc: "Vous cherchez un produit exotique spécifique ? Nous pouvons le commander pour vous.",
            color: "green",
            details: ["Réseau mondial", "Délai moyen: 1 semaine", "Alerte SMS à l'arrivée"]
        }
    ];

    return (
        <div className="pb-24">
            {/* Hero */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
                        NOS <span className="neon-text-yellow">SERVICES</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Plus qu'une simple épicerie, nous vous simplifions la vie avec des services adaptés à votre quotidien urbain.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-morphism p-10 border border-white/5 relative group hover:border-white/20 transition-all overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-neon-${item.color}/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:blur-xl transition-all`} />

                            <div className="flex flex-col md:flex-row gap-8 relative z-10">
                                <div className={`p-4 rounded-sm border neon-border-${item.color === 'cyan' ? 'cyan' : 'yellow'} h-fit`}>
                                    <Icon className={`w-10 h-10 text-neon-${item.color}`} />
                                </div>
                                <div className="space-y-4 flex-1">
                                    <h3 className="text-2xl font-bold text-white uppercase italic tracking-wider">{item.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                                    <ul className="grid grid-cols-1 gap-2">
                                        {item.details.map((detail, i) => (
                                            <li key={i} className="flex items-center text-sm text-gray-500">
                                                <div className={`w-1 h-1 bg-neon-${item.color} mr-2`} />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-4">
                                        <Button variant={item.color as any} size="sm">En savoir plus</Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </section>

            {/* CTA Section */}
            <section className="max-w-5xl mx-auto px-4 mt-24">
                <div className="glass-morphism p-12 border border-neon-cyan/30 text-center space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
                    <h2 className="text-3xl font-bold text-white italic">UNE QUESTION SUR LE STOCK ?</h2>
                    <p className="text-xl text-gray-400">Contactez-nous directement par téléphone pour une prise en charge immédiate.</p>
                    <div className="flex flex-center justify-center">
                        <Button variant="neon-cyan" size="lg" className="text-xl px-12 h-16">
                            <PhoneCall className="mr-4 w-6 h-6" /> 01 23 45 67 89
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
