"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Button from '@/components/ui/Button';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-navy-dark border-l border-white/10 z-[70] flex flex-col"
                    >
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white uppercase italic tracking-wider flex items-center">
                                <ShoppingBag className="mr-2 text-neon-cyan" /> VOTRE PANIER
                            </h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="text-6xl opacity-20 italic">VIDE</div>
                                    <p className="text-gray-500">Votre panier est encore vide.</p>
                                    <Button variant="neon-cyan" onClick={onClose}>Commencer mes courses</Button>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 group">
                                        <div className="w-20 h-20 bg-navy-deep flex items-center justify-center text-3xl flex-shrink-0 border border-white/5">
                                            {item.category === 'alimentation' ? '🛒' : item.category === 'exotique' ? '🌶️' : item.category === 'boissons' ? '🥤' : '🧼'}
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex justify-between">
                                                <h4 className="font-bold text-white text-sm uppercase">{item.name}</h4>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-600 hover:text-neon-red transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-gray-500">{item.price.toFixed(2)}€ / unité</p>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center border border-white/10 p-1">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:text-neon-cyan"><Minus className="w-3 h-3" /></button>
                                                    <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:text-neon-cyan"><Plus className="w-3 h-3" /></button>
                                                </div>
                                                <span className="text-sm font-bold text-neon-cyan">{(item.price * item.quantity).toFixed(2)}€</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-navy-deep space-y-4 text-center">
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-gray-400 uppercase text-xs font-bold tracking-widest">TOTAL ESTIMÉ</span>
                                    <span className="text-3xl font-black text-white">{cartTotal.toFixed(2)}€</span>
                                </div>
                                <Button variant="neon-cyan" className="w-full text-lg h-14" onClick={() => alert('Interface de paiement Stripe en cours de développement...')}>
                                    PROCÉDER AU PAIEMENT
                                </Button>
                                <button onClick={clearCart} className="text-xs text-gray-600 hover:text-gray-400 uppercase tracking-widest font-bold">
                                    Vider le panier
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
