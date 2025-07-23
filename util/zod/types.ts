
export type StoreItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity_in_stock: number;
  image_url: string;
  supplier?: string | null;
  category?: string | null;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  quantity_in_stock: number;
  category_id?: number;
  supplier_id?: number;
  image_url: string;
  color?: string;
  brand?: string;
  sku?: string;
  created_at?: string;
  updated_at?: string;
  weight?: number;
};

export type CarouselItem = {
  id: string;
  imgSrc: string;
  title: string;
  description: string;
};

export type ImageSizePopsType = {
  mobile: {
    width: number;
    height: number;
  };
  tab: {
    width: number;
    height: number;
  };
  desktop: {
    width: number;
    height: number;
  };
};




export type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

export type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: number) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
};