export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description: string;
    isFeatured?: boolean;
    inStock?: boolean;
}

export const categories = [
    { id: 'alimentation', name: 'Alimentation Générale', icon: '🛒', color: 'cyan' },
    { id: 'exotique', name: 'Produits Exotiques & Épices', icon: '🌶️', color: 'yellow' },
    { id: 'boissons', name: 'Boissons Fraîches', icon: '🥤', color: 'cyan' },
    { id: 'hygiene', name: 'Hygiène & Entretien', icon: '🧼', color: 'green' },
];

export const products: Product[] = [
    {
        id: '1',
        name: 'Épices Curry Madras',
        price: 4.50,
        category: 'exotique',
        image: '/images/products/curry.png',
        description: 'Mélange d\'épices authentique pour vos plats exotiques.',
        isFeatured: false,
    },
    {
        id: '2',
        name: 'Riz Basmati Royal',
        price: 12.99,
        category: 'alimentation',
        image: '/images/products/rice.png',
        description: 'Riz basmati de qualité supérieure à grain long.',
        isFeatured: false,
    },
    {
        id: '3',
        name: 'Boisson Mangue Tropicale',
        price: 2.20,
        category: 'boissons',
        image: '/images/products/mango.png',
        description: 'Rafraîchissement intense à base de mangue fraîche.',
        isFeatured: false,
    },
    {
        id: '4',
        name: 'Lait de Coco Bio',
        price: 3.10,
        category: 'exotique',
        image: '/images/products/coconut.png',
        description: 'Lait de coco onctueux pour vos recettes.',
        inStock: false,
    },
    {
        id: '5',
        name: 'Fanta (Assortiment)',
        price: 1.50,
        category: 'boissons',
        image: '/images/products/fanta.png',
        description: 'Sélection de boissons rafraîchissantes Fanta aux saveurs variées.',
        isFeatured: true,
    },
    {
        id: '6',
        name: 'Chips Brets Cheddar Jalapeño',
        price: 2.40,
        category: 'alimentation',
        image: '/images/products/brets-cheddar.png',
        description: 'Chips croustillantes au bon goût de cheddar et de jalapeño.',
        isFeatured: true,
    },
    {
        id: '7',
        name: 'Chips Brets Yakitori',
        price: 2.40,
        category: 'alimentation',
        image: '/images/products/brets-yakitori.png',
        description: 'Chips aux saveurs japonaises de Yakitori.',
        inStock: false,
    },
    {
        id: '8',
        name: "B'lue Eau Aromatisée",
        price: 2.50,
        category: 'boissons',
        image: '/images/products/blue-drink.png',
        description: 'Eau aromatisée rafraîchissante made in Thaïlande (Vitamines C, B3, B6, B12).',
    },
    {
        id: '9',
        name: 'Cacolac',
        price: 1.20,
        category: 'boissons',
        image: '/images/products/cacolac.png',
        description: 'Boisson lactée au cacao, source de plaisir et de fraîcheur.',
    },
    {
        id: '10',
        name: 'Caraïbos (Assortiment)',
        price: 1.20,
        category: 'boissons',
        image: '/images/products/caraibos.png',
        description: 'Jus de fruits exotiques : Ananas, Goyave, Mangue, Tropical.',
    },
    {
        id: '11',
        name: 'Monster Energy Ultra Black',
        price: 2.50,
        category: 'boissons',
        image: '/images/products/monster-ultra-black.png',
        description: 'Boisson énergisante sans sucre au goût de cerise noire.',
        isFeatured: true,
    },
    {
        id: '12',
        name: 'Red Bull Ice (Vanille)',
        price: 2.50,
        category: 'boissons',
        image: '/images/products/redbull-ice.png',
        description: 'Red Bull The Ice Edition: Goût Mûre givrée & Vanille.',
    },
    {
        id: '13',
        name: 'Red Bull Winter (Fuji)',
        price: 3.00,
        category: 'boissons',
        image: '/images/products/redbull-winter.png',
        description: 'Red Bull The Winter Edition: Goût Pomme Fuji & Gingembre.',
        inStock: false,
    },
    {
        id: '14',
        name: 'Pocky / Mikado (Assortiment)',
        price: 2.90,
        category: 'alimentation',
        image: '/images/products/pocky-mikado.png',
        description: 'Bâtonnets biscuités nappés : Chocolat au lait, Fraise, Cookies & Cream.',
    },
    {
        id: '15',
        name: 'Mochi Royal (Assortiment)',
        price: 3.70,
        category: 'alimentation',
        image: '/images/products/mochi-royal.png',
        description: 'Mochis traditionnels aux saveurs variées, tendres et délicieux.',
        isFeatured: true,
    },
    {
        id: '16',
        name: 'Happy Swing Rolls',
        price: 1.99,
        category: 'alimentation',
        image: '/images/products/happy-swing-rolls.png',
        description: 'Gaufrettes croustillantes fourrées : Brownie, Noisette, Cacao, Cerise.',
    },
];
