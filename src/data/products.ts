export interface Product {
  id: string;
  title: string;
  description: string;
  link: string;
  image?: string;
}

export const initialProducts: Product[] = [
  {
    id: "p1",
    title: "Urban Shipping Yard",
    description: "A highly detailed cinematic urban shipping yard environment designed for AAA-quality renders, game environments, architectural visualization, and industrial world-building. Built with realistic assets, immersive atmosphere, and production-ready detailing.",
    link: "https://www.cgtrader.com/3d-models/exterior/industrial-exterior/urban-shipping-yard",
    image: "/images/products/urban-shipping-yard.jpg",
  },
  {
    id: "p2",
    title: "Medieval Castle Complex",
    description: "A massive medieval castle environment crafted with cinematic realism, detailed architecture, fortified structures, and immersive fantasy atmosphere. Perfect for films, games, historical renders, and cinematic storytelling.",
    link: "https://www.cgtrader.com/3d-models/exterior/landmark/medieval-castle-complex",
    image: "/images/products/medieval-castle.jpg",
  },
  {
    id: "p3",
    title: "Whimsical Village Landscape",
    description: "A beautifully stylized fantasy village landscape featuring cinematic composition, immersive lighting, handcrafted environment detailing, and game-ready optimization for high-quality production workflows.",
    link: "https://www.cgtrader.com/3d-models/exterior/historic-exterior/whimsical-village-landscape-b041b645-5577-45bb-a7e7-e7575ac8ae3b",
    image: "/images/products/whimsical-village.jpg",
  },
  {
    id: "p4",
    title: "Charming Neighborhood Landscape",
    description: "A premium-quality neighborhood environment scene designed with realistic architecture, natural landscape detailing, cinematic atmosphere, and modern environment storytelling aesthetics.",
    link: "https://www.cgtrader.com/3d-models/exterior/house/charming-neighborhood-landscape",
    image: "/images/products/charming-neighborhood.jpg",
  }
];
