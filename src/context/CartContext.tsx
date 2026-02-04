"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';
import { useAuth } from './AuthContext';
import { createClient } from '@/lib/supabase';

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    cartCount: number;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const { user } = useAuth();
    const supabase = createClient();

    // Load cart initially (from localStorage if not logged in, or from DB if logged in)
    useEffect(() => {
        const loadCart = async () => {
            if (user) {
                // Load from Supabase
                const { data, error } = await supabase
                    .from('cart_items')
                    .select('*')
                    .eq('user_id', user.id);

                if (error) {
                    console.error('Error loading cart from DB:', error);
                    return;
                }

                if (data && data.length > 0) {
                    // We need to map product_id back to products. 
                    // For now, assuming we might need to fetch products or they are available.
                    // To keep it simple, we'll store enough info or just IDs.
                    // This part needs refinement depending on how you want to handle product data.
                    // Using basic mapping for now.
                    // setCart(mappedData);
                } else {
                    // If DB is empty, sync from localStorage to DB once
                    const localCart = localStorage.getItem('aks_eelam_cart');
                    if (localCart) {
                        const parsedLocal = JSON.parse(localCart) as CartItem[];
                        if (parsedLocal.length > 0) {
                            const dbItems = parsedLocal.map(item => ({
                                user_id: user.id,
                                product_id: item.id,
                                quantity: item.quantity
                            }));
                            await supabase.from('cart_items').insert(dbItems);
                            setCart(parsedLocal);
                        }
                    }
                }
            } else {
                // Load from localStorage
                const savedCart = localStorage.getItem('aks_eelam_cart');
                if (savedCart) {
                    try {
                        setCart(JSON.parse(savedCart));
                    } catch (e) {
                        console.error('Failed to parse cart', e);
                    }
                }
            }
        };

        loadCart();
    }, [user]);

    // Save cart to local storage (always) and DB (if logged in)
    useEffect(() => {
        localStorage.setItem('aks_eelam_cart', JSON.stringify(cart));

        const syncToDB = async () => {
            if (user && cart.length > 0) {
                // Upsert cart items to Supabase
                for (const item of cart) {
                    await supabase.from('cart_items').upsert({
                        user_id: user.id,
                        product_id: item.id,
                        quantity: item.quantity
                    }, { onConflict: 'user_id,product_id' });
                }

                // Remove items from DB that are not in local cart
                const itemIds = cart.map(i => i.id);
                await supabase.from('cart_items')
                    .delete()
                    .eq('user_id', user.id)
                    .not('product_id', 'in', `(${itemIds.join(',')})`);
            } else if (user && cart.length === 0) {
                await supabase.from('cart_items').delete().eq('user_id', user.id);
            }
        };

        syncToDB();
    }, [cart, user]);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) return;
        setCart(prev => prev.map(item =>
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => setCart([]);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
