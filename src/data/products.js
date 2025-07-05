// Product data for Gates.sn
// Each category contains an array of items with bilingual names, descriptions and image paths

const products = [
    {
        category: "Nos Montres",
        items: [
            {
                name: {
                    en: "Black Arabic Numeral Watch",
                    fr: "Montre Noire avec Chiffres Arabes"
                },
                description: {
                    en: "Sleek all-black watch with Arabic numerals, includes box and adjustment tool.",
                    fr: "Montre noire élégante avec chiffres arabes, livrée avec boîte et outil d'ajustement."
                },
                price: "CFA 12000",
                image: "/products/watches/black-arabic-numeral.jpg"
            },
            {
                name: {
                    en: "Black Silver Arabic Numeral Watch",
                    fr: "Montre Noire avec Chiffres Arabes Argentés"
                },
                description: {
                    en: "Elegant black watch with silver Arabic numerals, includes box and adjustment tool.",
                    fr: "Montre noire élégante avec chiffres arabes argentés, livrée avec boîte et outil d'ajustement."
                },
                price: "CFA 15000",
                image: "/products/watches/black-arabic-silver-numeral.jpg"
            },

            {
                name: {
                    en: "Black Automatic Watch",
                    fr: "Montre Automatique Noire"
                },
                description: {
                    en: "Elegant black automatic watch, includes box and adjustment tool.",
                    fr: "Montre automatique noire élégante , livrée avec boîte et outil d'ajustement."
                },
                price: "CFA 15000",
                image: "/products/watches/black-automatic.jpg",
                outOfStock: true
            },

            {
                name: {
                    en: "White Arabic Numeral Watch",
                    fr: "Montre Blanche avec Chiffres Arabes"
                },
                description: {
                    en: "Modern white watch with Arabic numerals, gift battery, box, and adjustment tool included.",
                    fr: "Montre blanche moderne avec chiffres arabes, pile offerte, boîte et outil d'ajustement inclus."
                },
                price: "CFA 12000",
                image: "/products/watches/white-arabic-numeral.jpg"
            },


            {
                name: {
                    en: "Light Blue Arabic Numeral Watch",
                    fr: "Montre Bleu Clair avec Chiffres Arabes"
                },
                description: {
                    en: "Fresh light blue watch with Arabic numerals, perfect for a cool and modern style. Includes box and adjustment tool.",
                    fr: "Montre bleu clair avec chiffres arabes, parfaite pour un style frais et moderne. Livrée avec boîte, pile offerte et outil d'ajustement."
                },
                price: "CFA 12000",
                image: "/products/watches/light-blue-numeral-arabic.jpg"
            },


            {
                name: {
                    en: "Camo Arabic Numeral Watch",
                    fr: "Montre Camouflage avec Chiffres Arabes"
                },
                description: {
                    en: "Unique camo-patterned watch with Arabic numerals, includes box, gift battery, and adjustment tool.",
                    fr: "Montre à motif camouflage avec chiffres arabes, livrée avec boîte, pile offerte et outil d'ajustement."
                },
                price: "CFA 15000",
                image: "/products/watches/militar-arabic-numeral.jpg"
            },

            {
                name: {
                    en: "Gray Camo Arabic Numeral Watch",
                    fr: "Montre Camouflage Grise avec Chiffres Arabes"
                },
                description: {
                    en: "Stylish gray camo watch with Arabic numerals, includes box and adjustment tool for a modern rugged look.",
                    fr: "Montre camouflage grise élégante avec chiffres arabes, livrée avec boîte et outil d'ajustement pour un look moderne et robuste."
                },
                price: "CFA 15000",
                image: "/products/watches/gray-camo-arabic-numeral.jpg"
            },

            {
                name: {
                    en: "Transparent Arabic Numeral Watch",
                    fr: "Montre Transparente avec Chiffres Arabes"
                },
                description: {
                    en: "Modern transparent watch with Arabic numerals, includes box, gift battery, and adjustment tool.",
                    fr: "Montre transparente moderne avec chiffres arabes, livrée avec boîte, pile offerte et outil d'ajustement."
                },
                price: "CFA 15000",
                image: "/products/watches/transparent-arabic-numeral.jpg"
            },

            {
                name: {
                    en: "Green Arabic Numeral Watch",
                    fr: "Montre Verte avec Chiffres Arabes"
                },
                description: {
                    en: "Vibrant green watch with gold Arabic numerals and hands, perfect for a unique and stylish look. Includes box and adjustment tool.",
                    fr: "Montre verte éclatante avec chiffres et aiguilles dorés arabes, parfaite pour un look unique et stylé. Livrée avec boîte, pile offerte et outil d'ajustement."
                },
                price: "CFA 15000",
                image: "/products/watches/green-arabic-numeral.jpg"
            },

            {
                name: {
                    en: "Brown Shemagh Arabic Watch",
                    fr: "Montre Marron Shemagh avec Chiffres Arabes"
                },
                description: {
                    en: "Brown watch with Arabic numerals and unique shemagh design, includes box, gift battery, and adjustment tool.",
                    fr: "Montre marron avec chiffres arabes et motif shemagh unique, livrée avec boîte, pile offerte et outil d'ajustement."
                },
                price: "CFA 12000",
                image: "/products/watches/fantasy-arabic-numeral.jpg"
            },

            {
                name: {
                    en: "Soft Pink Minimalist Watch",
                    fr: "Montre Rose Pâle Minimaliste"
                },
                description: {
                    en: "Elegant soft pink watch with  minimalist design, perfect for a modern look. Includes box and adjustment tool.",
                    fr: "Montre rose pâle élégante qvec un design minimaliste, parfaite pour un look moderne. Livrée avec boîte, pile offerte et outil d'ajustement."
                },
                price: "CFA 12000",
                image: "/products/watches/soft-pink-arabic-numeral.jpg"
            },

            {
                name: {
                    en: "Blue Minimalist Watch",
                    fr: "Montre Bleue Minimaliste"
                },
                description: {
                    en: "Modern blue minimalist watch with a clean dial and matching strap, perfect for a bold look. Includes box and adjustment tool.",
                    fr: "Montre minimaliste bleue moderne avec cadran épuré et bracelet assorti, parfaite pour un look audacieux. Livrée avec boîte, pile offerte et outil d'ajustement."
                },
                price: "CFA 12000",
                image: "/products/watches/blue-grek-numeral.jpg"
            },

            {
                name: {
                    en: "Light Gray Minimalist Watch",
                    fr: "Montre Gris Clair Minimaliste"
                },
                description: {
                    en: "Minimalist light gray watch with a clean dial, ideal for everyday elegance. Includes box and adjustment tool.",
                    fr: "Montre minimaliste gris clair avec cadran épuré, idéale pour une élégance quotidienne. Livrée avec boîte, pile offerte et outil d'ajustement."
                },
                price: "CFA 12000",
                image: "/products/watches/light-gray-numeral.jpg"
            },
            {
                name: {
                    en: "White Greek Numeral Watch",
                    fr: "Montre Blanche avec Chiffres Grecs"
                },
                description: {
                    en: "Elegant white watch with Greek numerals, minimalist design, includes box and adjustment tool.",
                    fr: "Montre blanche élégante avec chiffres grecs, design minimaliste, livrée avec boîte et outil d'ajustement."
                },
                price: "CFA 12000",
                image: "/products/watches/white-greek-numeral.jpg"
            },

            {
                name: {
                    en: "Purple Minimalist Watch",
                    fr: "Montre Violette Minimaliste"
                },
                description: {
                    en: "Trendy purple minimalist watch with a sleek design, ideal for a bold statement.  Includes box and adjustment tool",
                    fr: "Montre minimaliste violette tendance avec design épuré, idéale pour une touche audacieuse.Livrée avec boîte, pile offerte et outil d'ajustement."
                },
                price: "CFA 12000",
                image: "/products/watches/purple-minimalist.jpg"
            },
            {
                name: {
                    en: "Pink Minimalist Watch",
                    fr: "Montre Rose Minimaliste"
                },
                description: {
                    en: "Chic pink minimalist watch with a clean dial, perfect for a modern and feminine look. Includes box and adjustment tool.",
                    fr: "Montre minimaliste rose chic avec cadran épuré, parfaite pour un look moderne et féminin. Livrée avec boîte, pile offerte et outil d'ajustement."
                },
                price: "CFA 12000",
                image: "/products/watches/pink-minimalist.jpg"
            },

            // Add more products here
        ]
    },
    // Add more categories here
];

export default products; 