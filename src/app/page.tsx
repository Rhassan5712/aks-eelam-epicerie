"use client";

import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Clock, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/ui/ProductCard';
import { products, categories } from '@/data/products';

export default function Home() {
  const featuredProducts = products.filter(p => p.isFeatured);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-red/10 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="font-bold tracking-[0.2em] text-sm md:text-base uppercase text-brand-gradient text-glow-hover cursor-default transition-all duration-300">
              Bienvenue chez AKS EELAM
            </h2>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-tight">
              VOTRE ÉPICERIE DU <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px var(--color-neon-cyan)' }}>QUOTIDIEN</span> ...ET D'AILLEURS
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light"
          >
            Découvrez une sélection unique de produits exotiques, épices rares et alimentation générale au cœur du 11ème arrondissement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Button variant="primary" size="lg" className="w-full md:w-auto">
              <Link href="/produits" className="flex items-center">
                Voir le catalogue <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button variant="neon-cyan" size="lg" className="w-full md:w-auto">
              <Link href="/contact" className="flex items-center">
                Nous trouver <MapPin className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Floating elements décoratifs */}
        <div className="absolute right-10 bottom-20 hidden lg:block opacity-20">
          <div className="w-64 h-64 border-2 border-neon-yellow rounded-full animate-pulse" />
        </div>
      </section>

      {/* Info Banner */}
      <section className="max-w-7xl mx-auto px-4 -mt-32 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 glass-morphism p-1 border border-white/5 shadow-2xl">
          <div className="p-8 flex items-center space-x-6 bg-navy-deep/40">
            <Clock className="w-10 h-10 text-neon-yellow" />
            <div>
              <h4 className="font-bold text-white">Ouvert 7j/7</h4>
              <p className="text-sm text-gray-400">09:30 - 04:00 non-stop</p>
            </div>
          </div>
          <div className="p-8 flex items-center space-x-6 bg-navy-deep/40">
            <ShoppingBag className="w-10 h-10 text-neon-cyan" />
            <div>
              <h4 className="font-bold text-white">Click & Collect</h4>
              <p className="text-sm text-gray-400">Prêt en 20 minutes</p>
            </div>
          </div>
          <div className="p-8 flex items-center space-x-6 bg-navy-deep/40">
            <Star className="w-10 h-10 text-neon-red" />
            <div>
              <h4 className="font-bold text-white">Produits Frais</h4>
              <p className="text-sm text-gray-400">Arrivages réguliers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter">NOS UNIVERS</h2>
          <div className="w-24 h-1 bg-neon-cyan mx-auto" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative h-64 overflow-hidden border border-white/10 flex flex-col items-center justify-center p-6 cursor-pointer hover:border-white/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-navy-dark group-hover:bg-navy-deep transition-colors" />
              <span className="text-6xl mb-4 relative z-10 transition-transform duration-500 group-hover:scale-110">{cat.icon}</span>
              <h3 className="text-lg font-bold text-white relative z-10 text-center">{cat.name}</h3>
              <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-500 bg-transparent group-hover:bg-neon-${cat.color}`} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase">SÉLECTION DU MOMENT</h2>
            <p className="text-gray-400">Ne manquez pas nos arrivages les plus populaires.</p>
          </div>
          <Button variant="ghost" className="group">
            <Link href="/produits" className="flex items-center">
              Tout le catalogue <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
