import { createClient } from "@/lib/supabase-server-component";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, ArrowLeft, LogOut } from "lucide-react";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Check role
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (!profile || profile.role !== "admin") {
        redirect("/");
    }

    return (
        <div className="min-h-screen bg-navy-deep flex">
            {/* Sidebar */}
            <aside className="w-64 bg-navy-light/50 border-r border-white/5 flex flex-col fixed inset-y-0 z-50 backdrop-blur-xl">
                <div className="p-6 border-b border-white/5">
                    <h1 className="text-xl font-black text-white tracking-tighter uppercase">
                        AKS <span className="text-neon-cyan">ADMIN</span>
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/admin"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link
                        href="/admin/products"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    >
                        <Package className="w-5 h-5" />
                        <span className="font-medium">Produits</span>
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        <span className="font-medium">Commandes</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-white/5 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center space-x-3 px-4 py-3 text-neon-yellow hover:bg-white/5 rounded-xl transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-medium">Retour au site</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
