export type DietType = "veg" | "non-veg" | "egg";

export interface MenuVariant {
  id: string;
  name: string;
  price: number;
  isDefault?: boolean;
}

export interface MenuAddOn {
  id: string;
  name: string;
  price: number;
  isRequired?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  price: number;
  imageUrl: string;
  diet: DietType;
  isAvailable: boolean;
  variants?: MenuVariant[];
  addOns?: MenuAddOn[];
}

export interface MenuCategory {
  id: string;
  sectionId: string;
  name: string;
  sortOrder: number;
}

export interface MenuSection {
  id: string;
  name: string;
}

export interface CartLine {
  id: string;
  itemId: string;
  name: string;
  variantId?: string;
  variantName?: string;
  addOnIds: string[];
  addOnNames: string[];
  quantity: number;
  unitPrice: number;
  diet: DietType;
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  tableNumber?: string;
  gstin: string;
  city: string;
}

export type OrderStatus =
  | "INITIATED"
  | "PLACED"
  | "PREPARING"
  | "READY"
  | "COMPLETED";

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  tableNumber?: string;
  items: CartLine[];
  subtotal: number;
  tax: number;
  total: number;
  placedAt: string;
  estimatedMinutes: number;
}

export interface MerchantOrder {
  id: string;
  orderNumber: string;
  type: "DINE_IN" | "TAKEAWAY";
  tableNumber?: string;
  pickupCode?: string;
  status: OrderStatus;
  items: string[];
  total: number;
  placedAt: string;
  elapsedMinutes: number;
  notes?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  code: string;
  price: number;
  features: string[];
  recommended?: boolean;
}
