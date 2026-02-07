import { createClient } from "@/lib/supabase-server-component";

export default async function DebugAuthPage() {
    const supabase = await createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;

    const ADMIN_EMAILS = ["hassannawaz95100@gmail.com", "arthigankugan12@gmail.com"];

    let dbRole = "Not checked";
    let profileError = null;

    if (user) {
        const { data: profile, error } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (profile) dbRole = profile.role;
        if (error) profileError = error.message;
    }

    const isAdminByEmail = user?.email && ADMIN_EMAILS.includes(user.email);
    const isAdminByRole = dbRole === 'admin';

    return (
        <div className="p-10 max-w-2xl mx-auto space-y-6 text-black">
            <h1 className="text-2xl font-bold">Diagnostique d'Authentification</h1>

            <div className="p-4 border rounded bg-gray-50">
                <h2 className="font-bold mb-2">Session Actuelle</h2>
                <pre className="bg-gray-200 p-2 rounded overflow-auto">
                    {JSON.stringify(user, null, 2)}
                </pre>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded bg-blue-50">
                    <h3 className="font-bold">Vérification Email</h3>
                    <p>Email: {user?.email || "Non connecté"}</p>
                    <p>Dans la liste admin ? {isAdminByEmail ? "OUI" : "NON"}</p>
                    <p className="text-sm text-gray-500 mt-2">Liste: {ADMIN_EMAILS.join(", ")}</p>
                </div>

                <div className="p-4 border rounded bg-green-50">
                    <h3 className="font-bold">Vérification Base de Données</h3>
                    <p>Rôle DB: {dbRole}</p>
                    <p>Est Admin ? {isAdminByRole ? "OUI" : "NON"}</p>
                    {profileError && <p className="text-red-500 text-sm">Erreur: {profileError}</p>}
                </div>
            </div>

            <div className="p-4 border rounded bg-yellow-50">
                <h3 className="font-bold">Résultat Final</h3>
                <p className="text-xl">
                    Accès Admin : {isAdminByEmail || isAdminByRole ?
                        <span className="text-green-600 font-bold">AUTORISÉ</span> :
                        <span className="text-red-600 font-bold">REFUSÉ</span>
                    }
                </p>
            </div>

            <div className="text-sm text-gray-500">
                <p>Si "Accès Admin" est REFUSÉ, l'utilisateur sera redirigé s'il tente d'accéder à /admin.</p>
            </div>
        </div>
    );
}
