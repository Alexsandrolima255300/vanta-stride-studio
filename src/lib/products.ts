import shoeBlack from "@/assets/shoe-black.jpg";
import shoeGrey from "@/assets/shoe-grey.jpg";
import shoeWhite from "@/assets/shoe-white.jpg";
import heroSneaker from "@/assets/hero-sneaker.jpg";

export type Genero = "Masculino" | "Feminino" | "Unissex";
export type Categoria = "Corrida" | "Casual" | "Skate";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  color: string;
  colorHex: string;
  genero: Genero;
  categoria: Categoria;
  sizes: number[];
  stock: number;
  amortecimento: number;
  description: string;
  bestSeller?: boolean;
  novo?: boolean;
};

export const products: Product[] = [
  {
    slug: "vanta-x1",
    name: "VANTA X1",
    tagline: "Knit performance",
    price: 299.9,
    oldPrice: 379.9,
    rating: 4.8,
    reviews: 214,
    image: heroSneaker,
    color: "Preto",
    colorHex: "#111111",
    genero: "Unissex",
    categoria: "Corrida",
    sizes: [37, 38, 39, 40, 41, 42, 43],
    stock: 42,
    amortecimento: 5,
    description:
      "Cabedal em knit contínuo sem costuras e entressola esculpida em espuma de alta resiliência. O X1 é o ponto de partida da linguagem VANTA.",
    bestSeller: true,
    novo: true,
  },
  {
    slug: "vanta-air",
    name: "VANTA AIR",
    tagline: "Daily lightweight",
    price: 349.9,
    rating: 4.6,
    reviews: 156,
    image: shoeWhite,
    color: "Branco",
    colorHex: "#f2f2f2",
    genero: "Feminino",
    categoria: "Casual",
    sizes: [34, 35, 36, 37, 38, 39, 40],
    stock: 18,
    amortecimento: 4,
    description:
      "Silhueta limpa, mesh respirável e peso reduzido em 22%. Feito para o dia inteiro sem parecer um tênis de corrida.",
    bestSeller: true,
  },
  {
    slug: "vanta-run",
    name: "VANTA RUN",
    tagline: "Long distance",
    price: 399.9,
    oldPrice: 459.9,
    rating: 4.9,
    reviews: 331,
    image: shoeGrey,
    color: "Cinza",
    colorHex: "#8a8a8a",
    genero: "Masculino",
    categoria: "Corrida",
    sizes: [38, 39, 40, 41, 42, 43, 44],
    stock: 7,
    amortecimento: 5,
    description:
      "Placa de propulsão interna e retorno de energia progressivo. Desenvolvido para treinos longos com estabilidade constante.",
    bestSeller: true,
  },
  {
    slug: "vanta-deck",
    name: "VANTA DECK",
    tagline: "Skate reinforced",
    price: 259.9,
    rating: 4.4,
    reviews: 98,
    image: shoeBlack,
    color: "Preto",
    colorHex: "#111111",
    genero: "Unissex",
    categoria: "Skate",
    sizes: [38, 39, 40, 41, 42, 43],
    stock: 0,
    amortecimento: 3,
    description:
      "Suede reforçado nas zonas de abrasão e sola vulcanizada com grip direcional. Construído para durar mais que a sessão.",
  },
  {
    slug: "vanta-lite",
    name: "VANTA LITE",
    tagline: "Everyday minimal",
    price: 229.9,
    oldPrice: 289.9,
    rating: 4.2,
    reviews: 74,
    image: shoeWhite,
    color: "Branco",
    colorHex: "#f2f2f2",
    genero: "Feminino",
    categoria: "Casual",
    sizes: [34, 35, 36, 37, 38, 39],
    stock: 63,
    amortecimento: 3,
    description:
      "O modelo mais leve da linha. Construção monocromática, sem logos aparentes, apenas o corte.",
  },
  {
    slug: "vanta-trail",
    name: "VANTA TRAIL",
    tagline: "Off-road grip",
    price: 449.9,
    rating: 4.7,
    reviews: 121,
    image: shoeGrey,
    color: "Cinza",
    colorHex: "#8a8a8a",
    genero: "Masculino",
    categoria: "Corrida",
    sizes: [39, 40, 41, 42, 43, 44, 45],
    stock: 25,
    amortecimento: 4,
    description:
      "Tração agressiva, proteção lateral e drenagem rápida. Do asfalto ao cascalho sem trocar de calçado.",
    novo: true,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
