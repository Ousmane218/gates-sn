// Product data for Gates.sn
// Each category contains an array of items with bilingual names, descriptions and image paths

const products = [
    {
        category: "Nos Montres Premium",
        items: [
            {
                name: {
                    en: "Premium Black Stainless Steel Watch",
                    fr: "Montre Premium Acier Inoxydable Noire"
                },
                description: {
                    en: "High-quality stainless steel watch with Arabic numerals. Premium construction with superior durability and elegant black finish. Perfect for professional and formal occasions.",
                    fr: "Montre en acier inoxydable de haute qualité avec chiffres arabes. Construction premium avec durabilité supérieure et finition noire élégante. Parfaite pour les occasions professionnelles et formelles."
                },
                price: "CFA 15000",
                image: "/products/watches/black_arabic_stainless.jpg",
                material: "Acier inoxydable",
                waterResistance: "Étanche 100m"
            },
            {
                name: {
                    en: "Premium Black Silver Stainless Steel Watch",
                    fr: "Montre Premium Acier Inoxydable Noire Argentée"
                },
                description: {
                    en: "Luxury stainless steel watch with black case and silver Arabic numerals. High-end materials and precision engineering for the discerning customer who values quality and style.",
                    fr: "Montre de luxe en acier inoxydable avec boîtier noir et chiffres arabes argentés. Matériaux haut de gamme et ingénierie de précision pour le client exigeant qui valorise la qualité et le style."
                },
                price: "CFA 15000",
                image: "/products/watches/black_silver_arabic_stainless.jpg",
                material: "Acier inoxydable",
                waterResistance: "Étanche 100m"
            },
            {
                name: {
                    en: "Premium Silver Stainless Steel Watch",
                    fr: "Montre Premium Acier Inoxydable Argentée"
                },
                description: {
                    en: "Elegant silver stainless steel watch with Arabic numerals. Sophisticated design with premium materials and superior craftsmanship. A timeless piece for the modern professional.",
                    fr: "Montre élégante en acier inoxydable argenté avec chiffres arabes. Design sophistiqué avec matériaux premium et savoir-faire supérieur. Une pièce intemporelle pour le professionnel moderne."
                },
                price: "CFA 15000",
                image: "/products/watches/silver_arabic_stainless.jpg",
                material: "Acier inoxydable",
                waterResistance: "Étanche 100m"
            }
        ]
    },
    {
        category: "Nos Montres",
        items: [

            {
                name: {
                    en: "Black Multifunctional Dial Arabic Watch",
                    fr: "Montre Noire Multifonction avec Cadran Arabe"
                },
                description: {
                    en: "Advanced black watch with multifunctional dial featuring Arabic numerals and multiple time zones. Perfect for professionals who need precise timekeeping with additional features. Includes box and adjustment tool.",
                    fr: "Montre noire avancée avec cadran multifonction présentant des chiffres arabes et plusieurs fuseaux horaires. Parfaite pour les professionnels qui ont besoin d'une chronométrie précise avec des fonctionnalités supplémentaires. Livrée avec boîte et outil d'ajustement."
                },
                price: "CFA 10000",
                image: "/products/watches/black_multifunctinial_dial_arabic.jpg",
                material: "Résine",
                waterResistance: "Étanche"
            },
            // Nos Montres
            {
                name: {
                    en: "Black Automatic Watch",
                    fr: "Montre Automatique Noire"
                },
                description: {
                    en: "Elegant black automatic watch with self-winding movement. Features a sophisticated design with automatic timekeeping mechanism, perfect for those who appreciate traditional watch craftsmanship.",
                    fr: "Montre automatique noire élégante avec mouvement à remontage automatique. Présente un design sophistiqué avec mécanisme de chronométrage automatique, parfaite pour ceux qui apprécient l'artisanat horloger traditionnel."
                },
                price: "CFA 10000",
                image: "/products/watches/black-automatic.jpg",
                material: "Résine",
                waterResistance: "Étanche"
            },
            {
                name: {
                    en: "Black Arabic Numeral Watch",
                    fr: "Montre Noire avec Chiffres Arabes"
                },
                description: {
                    en: "Sleek all-black watch with Arabic numerals, includes box and adjustment tool.",
                    fr: "Montre noire élégante avec chiffres arabes, livrée avec boîte et outil d'ajustement."
                },
                price: "CFA 8000",
                image: "/products/watches/black-arabic-numeral.jpg",

                material: "Résine",
                waterResistance: "Étanche"
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
                price: "CFA 8000",
                image: "/products/watches/black-arabic-silver-numeral.jpg",
                material: "Résine",
                waterResistance: "Étanche"
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
                price: "CFA 8000",
                image: "/products/watches/white-arabic-numeral.jpg",
                material: "Résine",
                waterResistance: "Étanche"
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
                price: "CFA 8000",
                image: "/products/watches/light-blue-numeral-arabic.jpg",
                material: "Résine",
                waterResistance: "Étanche"
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
                price: "CFA 8000",
                image: "/products/watches/soft-pink-arabic-numeral.jpg",
                material: "Résine",
                waterResistance: "Étanche"
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
                price: "CFA 7000",
                image: "/products/watches/blue-grek-numeral.jpg",
                material: "Résine",
                waterResistance: "Étanche"
            },



            {
                name: {
                    en: "Light Gray Minimalist Watch",
                    fr: "Montre Gris Clair Minimaliste"
                },
                description: {
                    en: "Modern light gray watch with clear numerals and elegant design. Perfect for a subtle and sophisticated look. Includes box and adjustment tool.",
                    fr: "Montre gris clair moderne avec chiffres clairs et design élégant. Parfaite pour un look subtil et sophistiqué. Livrée avec boîte et outil d'ajustement."
                },
                price: "CFA 7000",
                image: "/products/watches/light-gray-numeral.jpg",
                material: "Résine",
                waterResistance: "Étanche"
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
                price: "CFA 8000",
                image: "/products/watches/green-arabic-numeral.jpg",
                material: "Résine",
                waterResistance: "Étanche"
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
                price: "CFA 8000",
                image: "/products/watches/gray-camo-arabic-numeral.jpg",
                material: "Résine",
                waterResistance: "Étanche"
            },



            // Add more products here
        ]
    },
    {
        category: "Nos Chapeaux",
        items: [
            {
                name: {
                    en: "Tony Chopper Blue Cap - One Piece",
                    fr: "Casquette Tony Chopper Bleue - One Piece"
                },
                description: {
                    en: "Official One Piece Tony Chopper themed cap in vibrant blue. Features Chopper's signature design elements and is perfect for anime fans and One Piece enthusiasts. Made with quality materials for comfort and durability.",
                    fr: "Casquette officielle One Piece Tony Chopper en bleu vibrant. Présente les éléments de design signature de Chopper et est parfaite pour les fans d'anime et les passionnés de One Piece. Fabriquée avec des matériaux de qualité pour le confort et la durabilité."
                },
                price: "CFA 8000",
                image: "/products/hats/blue_tony_chopper_1.jpg",
                images: [
                    "/products/hats/blue_tony_chopper_1.jpg",
                    "/products/hats/blue_tony_chopper.jpg"
                ],
                material: "Coton",
                waterResistance: "Non étanche"
            },
            {
                name: {
                    en: "Tony Chopper Brown Cap - One Piece",
                    fr: "Casquette Tony Chopper Marron - One Piece"
                },
                description: {
                    en: "Tony Chopper themed cap in warm brown color. Features the same iconic design as the blue version but in an earthy brown tone, perfect for fans who prefer neutral colors while showing their One Piece love.",
                    fr: "Casquette Tony Chopper en marron chaleureux. Présente le même design iconique que la version bleue mais dans un ton marron terreux, parfaite pour les fans qui préfèrent les couleurs neutres tout en montrant leur amour pour One Piece."
                },
                price: "CFA 8000",
                image: "/products/hats/brown_tony_chopper.jpg",
                material: "Coton",
                waterResistance: "Non étanche"
            },
            {
                name: {
                    en: "Monkey D. Luffy Straw Hat - One Piece",
                    fr: "Chapeau de Paille Monkey D. Luffy - One Piece"
                },
                description: {
                    en: "The iconic straw hat worn by Monkey D. Luffy, the main character of One Piece. This legendary hat represents freedom, adventure, and the spirit of a pirate king. Made from natural materials with the signature red ribbon band.",
                    fr: "Le chapeau de paille iconique porté par Monkey D. Luffy, le personnage principal de One Piece. Ce chapeau légendaire représente la liberté, l'aventure et l'esprit d'un roi des pirates. Fabriqué en matériaux naturels avec la bande rouge signature."
                },
                price: "CFA 5000",
                image: "/products/hats/luffy.jpg",
                material: "Paille naturelle",
                waterResistance: "Non étanche"
            },
            {
                name: {
                    en: "Tony Chopper Pink Cap - One Piece",
                    fr: "Casquette Tony Chopper Rose - One Piece"
                },
                description: {
                    en: "Tony Chopper themed cap in vibrant pink color. Features Chopper's signature design in a playful pink tone, perfect for fans who love bright colors and want to show their support for the adorable reindeer doctor of the Straw Hat Pirates.",
                    fr: "Casquette Tony Chopper en rose vibrant. Présente le design signature de Chopper dans un ton rose ludique, parfaite pour les fans qui aiment les couleurs vives et veulent montrer leur soutien au médecin renne adorable des Chapeaux de Paille."
                },
                price: "CFA 8000",
                image: "/products/hats/pink tony chopper.jpg",
                images: [
                    "/products/hats/pink tony chopper.jpg",
                    "/products/hats/pink_tony_chopper_1.jpg"
                ],
                material: "Coton",
                waterResistance: "Non étanche"
            },
            {
                name: {
                    en: "Tony Chopper Dark Pink Cap - One Piece",
                    fr: "Casquette Tony Chopper Rose Foncé - One Piece"
                },
                description: {
                    en: "Tony Chopper themed cap in rich dark pink color. Features Chopper's signature design in a deeper, more sophisticated pink tone with the iconic X symbol and antler details. Perfect for One Piece fans who prefer darker, more elegant colors.",
                    fr: "Casquette Tony Chopper en rose foncé riche. Présente le design signature de Chopper dans un ton rose plus profond et sophistiqué avec le symbole X iconique et les détails d'andouillers. Parfaite pour les fans de One Piece qui préfèrent les couleurs plus sombres et élégantes."
                },
                price: "CFA 8000",
                image: "/products/hats/tony_chopper_rose_foncer.jpg",
                material: "Coton",
                waterResistance: "Non étanche"
            },
            {
                name: {
                    en: "Trafalgar Law Cap - One Piece",
                    fr: "Casquette Trafalgar Law - One Piece"
                },
                description: {
                    en: "Trafalgar Law themed cap featuring the Surgeon of Death's signature style. This cap represents Law's cool and mysterious personality with his iconic design elements. Perfect for fans of the Heart Pirates captain.",
                    fr: "Casquette Trafalgar Law avec le style signature du Chirurgien de la Mort. Cette casquette représente la personnalité cool et mystérieuse de Law avec ses éléments de design iconiques. Parfaite pour les fans du capitaine des Pirates du Cœur."
                },
                price: "CFA 7000",
                image: "/products/hats/trafalgar.jpg",
                material: "Coton",
                waterResistance: "Non étanche"
            }
        ]
    }
    // Add more categories here
];

export default products; 