import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-navy-deep border-t border-white/10 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold">
                        <span className="text-brand-gradient">AKS EELAM</span>
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Votre épicerie du quotidien... et d'ailleurs. Des produits exotiques aux nécessités courantes, nous sommes là pour vous.
                    </p>
                    <div className="flex space-x-4">
                        <Link href="https://www.instagram.com/akseelam_epicerie/" target="_blank" className="text-gray-400 hover:text-neon-pink"><Instagram className="w-5 h-5" /></Link>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-white">Navigation</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href="/" className="animated-underline hover:text-white transition-colors">Accueil</Link></li>
                        <li><Link href="/produits" className="animated-underline hover:text-white transition-colors">Catalogue</Link></li>
                        <li><Link href="/a-propos" className="animated-underline hover:text-white transition-colors">À Propos</Link></li>
                        <li><Link href="/contact" className="animated-underline hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-white">Horaires</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>Lundi - Dimanche</li>
                        <li className="text-brand-gradient font-bold">09:30 - 04:30</li>
                        <li>Ouvert 7j/7</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4 text-white">Contact</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex items-start space-x-2">
                            <MapPin className="w-4 h-4 text-neon-red flex-shrink-0" />
                            <span>679 rue d'abbeville 80000 Amiens</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-neon-green" />
                            <span>09 60 15 45 66</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <Mail className="w-4 h-4 text-neon-cyan" />
                            <span>akseelam23@gmail.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-white/5 text-center text-xs text-gray-600">
                © {new Date().getFullYear()} <span className="text-brand-gradient">AKS EELAM</span>. Tous droits réservés.
            </div>
        </footer>
    );
}
