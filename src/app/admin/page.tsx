export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Tableau de bord</h2>
                <p className="text-gray-400">Bienvenue dans l&apos;interface d&apos;administration.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Placeholder Stats */}
                <div className="bg-navy-light/30 border border-white/5 p-6 rounded-2xl">
                    <h3 className="text-gray-400 font-bold uppercase text-sm mb-2">Produits en ligne</h3>
                    <p className="text-4xl font-black text-white">--</p>
                </div>
                <div className="bg-navy-light/30 border border-white/5 p-6 rounded-2xl">
                    <h3 className="text-gray-400 font-bold uppercase text-sm mb-2">Commandes (Mois)</h3>
                    <p className="text-4xl font-black text-white">--</p>
                </div>
                <div className="bg-navy-light/30 border border-white/5 p-6 rounded-2xl">
                    <h3 className="text-gray-400 font-bold uppercase text-sm mb-2">Revenus (Est.)</h3>
                    <p className="text-4xl font-black text-brand-gradient">-- €</p>
                </div>
            </div>
        </div>
    );
}
