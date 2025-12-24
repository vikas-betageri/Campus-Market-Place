
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  image: string;
  sellerId: string;
  sellerName: string;
  createdAt: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export type Theme = 'light' | 'dark';

export interface AIAnalysisResult {
  title: string;
  description: string;
  suggestedPrice: number;
  category: string;
}
