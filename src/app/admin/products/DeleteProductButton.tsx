"use client";

import { createClient } from "@/lib/supabase";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteProductButton({ productId }: { productId: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleDelete = async () => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.")) {
            return;
        }

        setIsDeleting(true);

        try {
            console.log("Tentative de suppression du produit:", productId);
            const { error, count } = await supabase
                .from("products")
                .delete({ count: 'exact' })
                .eq("id", productId);

            if (error) {
                console.error("Erreur Supabase:", error);
                alert("Erreur lors de la suppression : " + error.message);
            } else if (count === 0) {
                console.warn("Aucun produit supprimé. Vérifiez les droits.");
                alert("Impossible de supprimer le produit. Vérifiez vos droits d'accès ou si le produit est lié à des commandes.");
            } else {
                console.log("Produit supprimé avec succès");
                router.refresh();
            }
        } catch (err) {
            console.error("Erreur inattendue:", err);
            alert("Une erreur inattendue est survenue.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors border border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Supprimer le produit"
        >
            <Trash2 className={`w-4 h-4 ${isDeleting ? "animate-pulse" : ""}`} />
        </button>
    );
}
