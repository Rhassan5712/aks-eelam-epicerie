"use client";

import { Plus, Check } from 'lucide-react';
import { Product } from '@/data/products';
import Badge from './Badge';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import Image from 'next/image';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-navy-dark border border-white/10 overflow-hidden hover:border-neon-cyan/50 transition-all duration-500 flex flex-col h-full"
        >
            <div className="relative aspect-square overflow-hidden bg-navy-deep flex items-center justify-center text-6xl">
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <span className="transition-transform duration-700 group-hover:scale-110">
                        {product.category === 'alimentation' ? '🛒' :
                            product.category === 'exotique' ? '🌶️' :
                                product.category === 'boissons' ? '🥤' : '🧼'}
                    </span>
                )}
                <div className={`absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent opacity-60 ${product.inStock === false ? 'backdrop-grayscale' : ''}`} />




                <button
                    onClick={handleAdd}
                    disabled={product.inStock === false}
                    className={`absolute bottom-4 right-4 p-3 rounded-full shadow-2xl transition-all duration-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ${product.inStock === false
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed hidden'
                        : added
                            ? 'bg-neon-green text-white'
                            : 'bg-white text-navy-deep hover:bg-neon-cyan hover:text-white'
                        }`}
                >
                    {added ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                    <div className="flex flex-wrap gap-2">
                        {product.isFeatured && (
                            <Badge variant="yellow">Vedette</Badge>
                        )}
                        <Badge variant={product.category === 'exotique' ? 'yellow' : 'cyan'}>
                            {product.category}
                        </Badge>
                        {product.inStock === false ? (
                            <Badge variant="red">En rupture</Badge>
                        ) : (
                            <Badge variant="green">En stock</Badge>
                        )}
                    </div>
                    <span className="text-xl font-black text-white tracking-tighter">{product.price.toFixed(2)}€</span>
                </div>
                <h3 className="text-lg font-bold text-gray-100 group-hover:text-neon-cyan transition-colors uppercase italic tracking-tight">{product.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed flex-1">{product.description}</p>

                <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
            </div>
        </motion.div>
    );
}
