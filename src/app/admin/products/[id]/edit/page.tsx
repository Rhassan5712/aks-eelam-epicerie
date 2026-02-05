import { createClient } from "@/lib/supabase-server-component";
import ProductForm from "../../ProductForm";
import { redirect } from "next/navigation";

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { data: product } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();

    if (!product) {
        redirect("/admin/products");
    }

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-2xl">
                <ProductForm product={product} />
            </div>
        </div>
    );
}
