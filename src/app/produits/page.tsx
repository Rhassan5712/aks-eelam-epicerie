"use client";

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Grid2X2, List } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { categories, Product } from '@/data/products';
import Button from '@/components/ui/Button';
import { createClient } from '@/lib/supabase';

function ProductsContent() {
    const searchParams = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState('tous');
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            setSelectedCategory(category);
        }
    }, [searchParams]);

    useEffect(() => {
        const fetchProducts = async () => {
            console.log("Starting fetchProducts...");
            setIsLoading(true);
            try {
                console.log("Calling supabase.from('products').select('*')");
                const { data, error } = await supabase
                    .from('products')
                    .select('*');

                console.log("Supabase response:", { data, error });

                if (error) {
                    console.error('Error fetching products:', error);
                } else if (data) {
                    console.log("Products fetched successfully:", data.length);
                    setProducts(data as Product[]);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
            } finally {
                console.log("Setting isLoading to false");
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'tous' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
                    NOTRE <span className="neon-text-cyan">CATALOGUE</span>
                </h1>
                <p className="text-gray-400 max-w-2xl">
                    Explorez notre large gamme de produits, des produits exotiques du monde entier aux nécessités courantes.
                </p>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between glass-morphism p-4 border border-white/10 sticky top-20 z-30">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto">
                    <Button
                        variant={selectedCategory === 'tous' ? 'neon-cyan' : 'ghost'}
                        size="sm"
                        onClick={() => setSelectedCategory('tous')}
                    >
                        Tous
                    </Button>
                    {categories.map((cat) => (
                        <Button
                            key={cat.id}
                            variant={selectedCategory === cat.id ? 'neon-cyan' : 'ghost'}
                            size="sm"
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            {cat.name}
                        </Button>
                    ))}
                </div>

                <div className="relative w-full lg:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Rechercher un produit..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-navy-deep border border-white/10 rounded-sm py-2 pl-10 pr-4 text-sm text-white focus:border-neon-cyan outline-none transition-colors"
                    />
                </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="bg-navy-dark h-96 rounded-lg animate-pulse border border-white/5" />
                    ))}
                </div>
            ) : (
                /* Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {!isLoading && filteredProducts.length === 0 && (
                <div className="text-center py-24 space-y-4">
                    <div className="text-6xl text-gray-600">🕵️‍♂️</div>
                    <h3 className="text-xl font-bold text-white">Aucun produit trouvé</h3>
                    <p className="text-gray-400">Essayez de modifier vos filtres ou votre recherche.</p>
                    <Button variant="outline" onClick={() => { setSelectedCategory('tous'); setSearchQuery(''); }}>
                        Réinitialiser
                    </Button>
                </div>
            )}
        </div>
    );
}

export default function ProduitsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-navy-deep flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-cyan"></div></div>}>
            <ProductsContent />
        </Suspense>
    );
}
