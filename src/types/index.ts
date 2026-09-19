export type PaketKey = "12jam" | "24jam" | "36jam" | "48jam";

export interface PaketItem {
  nama: string;
  durasi: string;
  harga: number;
  badge: string | null;
  bonus: string | null;
}

export interface GameItem {
  title: string;
  category: "sports" | "action" | "fighting" | "racing" | "coop" | "horror";
  icon: string;
  popular: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}