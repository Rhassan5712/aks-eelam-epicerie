"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Button from "@/components/ui/Button";
import { ArrowLeft, Save, Loader2, Upload } from "lucide-react";
import Link from "next/link";

interface ProductFormProps {
    product?: any;
}

const CATEGORIES = [
    { id: "alimentation", name: "Alimentation Générale" },
    { id: "exotique", name: "Produits Exotiques & Épices" },
    { id: "boissons", name: "Boissons Fraîches" },
    { id: "hygiene", name: "Hygiène & Entretien" },
];

export default function ProductForm({ product }: ProductFormProps) {
    const router = useRouter();
    const supabase = createClient();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: product?.name || "",
        category: product?.category || "alimentation",
        price: product?.price || 0,
        description: product?.description || "",
        image: product?.image || "",
        is_featured: product?.is_featured || false,
        in_stock: product?.in_stock ?? true,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (product) {
                // Update
                const { error } = await supabase
                    .from("products")
                    .update(formData)
                    .eq("id", product.id);
                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from("products")
                    .insert([formData]);
                if (error) throw error;
            }

            router.push("/admin/products");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
            <div className="flex items-center justify-between">
                <Link href="/admin/products" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Retour
                </Link>
                <h2 className="text-2xl font-bold text-white">
                    {product ? "Modifier le produit" : "Nouveau produit"}
                </h2>
            </div>

            <div className="bg-navy-light/30 border border-white/5 rounded-2xl p-6 space-y-6">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Nom du produit</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-navy-deep border border-white/10 rounded-xl py-3 px-4 text-white focus:border-neon-cyan outline-none transition-colors"
                        placeholder="Ex: Riz Basmati"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Catégorie</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-navy-deep border border-white/10 rounded-xl py-3 px-4 text-white focus:border-neon-cyan outline-none transition-colors appearance-none"
                        >
                            {CATEGORIES.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Prix (€)</label>
                        <input
                            type="number"
                            name="price"
                            step="0.01"
                            required
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full bg-navy-deep border border-white/10 rounded-xl py-3 px-4 text-white focus:border-neon-cyan outline-none transition-colors"
                            placeholder="0.00"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Description</label>
                    <textarea
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full bg-navy-deep border border-white/10 rounded-xl py-3 px-4 text-white focus:border-neon-cyan outline-none transition-colors resize-none"
                        placeholder="Description détaillée..."
                    />
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">Image du produit</label>

                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-1 w-full space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase font-bold">Lien de l&apos;image (URL)</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full bg-navy-deep border border-white/10 rounded-xl py-3 px-4 text-white focus:border-neon-cyan outline-none transition-colors"
                                    placeholder="https://..."
                                />
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-white/5"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-navy-light px-2 text-gray-500 font-bold">OU</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] text-gray-500 uppercase font-bold">Télécharger un fichier</label>
                                <div className="flex items-center gap-4">
                                    <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl py-6 px-4 hover:border-neon-cyan/50 hover:bg-white/5 transition-all cursor-pointer group">
                                        <Upload className="w-8 h-8 text-gray-500 group-hover:text-neon-cyan transition-colors mb-2" />
                                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                            Cliquez pour choisir une image
                                        </span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;

                                                setLoading(true);
                                                setError(null);

                                                try {
                                                    const fileExt = file.name.split('.').pop();
                                                    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
                                                    const filePath = `${fileName}`;

                                                    const { error: uploadError, data } = await supabase.storage
                                                        .from('products')
                                                        .upload(filePath, file);

                                                    if (uploadError) throw uploadError;

                                                    const { data: { publicUrl } } = supabase.storage
                                                        .from('products')
                                                        .getPublicUrl(filePath);

                                                    setFormData(prev => ({ ...prev, image: publicUrl }));
                                                } catch (err: any) {
                                                    setError("Erreur lors du téléchargement : " + err.message);
                                                } finally {
                                                    setLoading(false);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {formData.image && (
                            <div className="w-full md:w-32 lg:w-48 aspect-square bg-navy-deep rounded-2xl overflow-hidden border border-white/10 relative group shadow-2xl">
                                <img
                                    src={formData.image}
                                    alt="Aperçu"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, image: "" }))}
                                        className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-widest"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="is_featured"
                            name="is_featured"
                            checked={formData.is_featured}
                            onChange={handleChange}
                            className="w-5 h-5 bg-navy-deep border-white/20 rounded focus:ring-neon-cyan text-neon-cyan"
                        />
                        <label htmlFor="is_featured" className="text-sm text-gray-300 font-medium cursor-pointer select-none">Mettre en avant</label>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="in_stock"
                            name="in_stock"
                            checked={formData.in_stock}
                            onChange={handleChange}
                            className="w-5 h-5 bg-navy-deep border-white/20 rounded focus:ring-neon-green text-neon-green"
                        />
                        <label htmlFor="in_stock" className="text-sm text-gray-300 font-medium cursor-pointer select-none">En stock</label>
                    </div>
                </div>
            </div>

            <Button
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Enregistrement...
                    </>
                ) : (
                    <>
                        <Save className="w-5 h-5 mr-2" />
                        Enregistrer le produit
                    </>
                )}
            </Button>
        </form>
    );
}
