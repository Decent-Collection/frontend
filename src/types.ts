export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  images?: string[];
  badge?: string;
  description?: string;
  features?: string[];
  reviews?: Review[];
};
