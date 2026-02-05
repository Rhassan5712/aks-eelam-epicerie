import { createClient } from "@/lib/supabase-server-component";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import Image from "next/image";

export default async function AdminProductsPage() {
    const supabase = await createClient();
    const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2">Produits</h2>
                    <p className="text-gray-400">Gérez votre catalogue produits.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-neon-green hover:bg-neon-green/80 text-navy-deep font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Ajouter un produit
                </Link>
            </div>

            {error ? (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl">
                    Erreur lors du chargement des produits. La table 'products' existe-t-elle ?
                    <br />
                    <span className="text-sm opacity-70">{error.message}</span>
                </div>
            ) : (
                <div className="bg-navy-light/30 border border-white/5 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5 bg-white/5 text-gray-400 text-sm uppercase tracking-wider">
                                    <th className="p-4">Image</th>
                                    <th className="p-4">Nom</th>
                                    <th className="p-4">Catégorie</th>
                                    <th className="p-4">Prix</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {products?.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">
                                            Aucun produit trouvé. Commencez par en ajouter un.
                                        </td>
                                    </tr>
                                ) : (
                                    products?.map((product) => (
                                        <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="p-4">
                                                <div className="w-12 h-12 bg-navy-deep rounded-lg overflow-hidden relative">
                                                    {product.image ? (
                                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">Img</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-bold text-white">{product.name}</div>
                                                {product.is_featured && (
                                                    <span className="text-xs text-neon-gold bg-neon-gold/10 px-2 py-0.5 rounded-full border border-neon-gold/20">
                                                        En vedette
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-gray-400">
                                                <span className="capitalize">{product.category}</span>
                                            </td>
                                            <td className="p-4 text-white font-mono">
                                                {product.price.toFixed(2)} €
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        href={`/admin/products/${product.id}/edit`}
                                                        className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    {/* We'll handle delete via a client component or form action later */}
                                                    <button
                                                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors border border-red-500/20"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
