import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-navy-deep flex flex-col items-center justify-center text-center p-4 space-y-6">
            <h1 className="text-9xl font-black text-brand-gradient">404</h1>
            <h2 className="text-2xl font-bold text-white">Page introuvable</h2>
            <p className="text-gray-400 max-w-md">
                Désolé, la page que vous recherchez semble avoir été déplacée ou n'existe pas.
            </p>
            <Button variant="primary">
                <Link href="/">Retour à l'accueil</Link>
            </Button>
        </div>
    )
}
