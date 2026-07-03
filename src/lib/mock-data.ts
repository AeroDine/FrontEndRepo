import type {
  MenuAddOn,
  MenuCategory,
  MenuItem,
  MenuSection,
  MerchantOrder,
  Restaurant,
  SubscriptionPlan,
} from "@/types";

export const DEMO_RESTAURANT: Restaurant = {
  id: "rest-1",
  name: "The Rustic Spoon",
  slug: "the-rustic-spoon",
  tagline: "Scan to Order • Artisan Kitchen",
  tableNumber: "12",
  gstin: "27AABCU9603R1ZM",
  city: "Bangalore",
};

export const MENU_SECTIONS: MenuSection[] = [
  { id: "sec-all", name: "All" },
];

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: "cat-all", sectionId: "sec-all", name: "All Items", sortOrder: 0 },
  { id: "cat-popular", sectionId: "sec-all", name: "Popular", sortOrder: 1 },
  { id: "cat-mains", sectionId: "sec-all", name: "Mains", sortOrder: 2 },
  { id: "cat-sides", sectionId: "sec-all", name: "Sides", sortOrder: 3 },
];

const ADD_ONS: Record<string, MenuAddOn[]> = {
  biryani: [
    { id: "ao-raita", name: "Extra Raita", price: 40 },
    { id: "ao-boiled-egg", name: "Boiled Egg", price: 25 },
  ],
  dosa: [
    { id: "ao-ghee", name: "Extra Ghee", price: 30, isRequired: false },
    { id: "ao-chutney", name: "Extra Chutney", price: 20 },
  ],
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "item-burger",
    name: "Truffle Mushroom Burger",
    description:
      "Wagyu beef patty, wild mushrooms, truffle aioli, aged cheddar on brioche.",
    categoryId: "cat-popular",
    price: 1540,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
    diet: "non-veg",
    isAvailable: true,
    rating: 4.9,
  },
  {
    id: "item-pizza",
    name: "Classic Margherita Pizza",
    description:
      "Authentic Neapolitan style pizza with San Marzano tomato sauce, fresh mozzarella di bufala, fresh basil leaves, and a drizzle of extra virgin olive oil on our 48-hour fermented sourdough crust.",
    categoryId: "cat-mains",
    price: 1320,
    imageUrl:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop",
    diet: "veg",
    isAvailable: true,
    rating: 4.9,
    calories: 850,
    variants: [
      { id: "var-regular", name: "Regular (10\")", price: 1320, isDefault: true },
      { id: "var-large", name: "Large (14\")", price: 1820, isDefault: false },
    ],
  },
  {
    id: "item-latte",
    name: "Iced Caramel Latte",
    description: "Espresso with caramel syrup, oat milk, and ice.",
    categoryId: "cat-sides",
    price: 650,
    imageUrl:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&h=400&fit=crop",
    diet: "veg",
    isAvailable: true,
    variants: [
      { id: "var-oat", name: "Oat Milk, Less Ice", price: 650, isDefault: true },
    ],
  },
  {
    id: "item-1",
    name: "Paneer Tikka",
    description:
      "Cottage cheese marinated in yogurt and spices, cooked in tandoor.",
    categoryId: "cat-popular",
    price: 280,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop",
    diet: "veg",
    isAvailable: true,
  },
  {
    id: "item-2",
    name: "Chicken 65",
    description: "Crispy Andhra-style fried chicken with curry leaves and red chilli.",
    categoryId: "cat-mains",
    price: 299,
    imageUrl:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&h=400&fit=crop",
    diet: "non-veg",
    isAvailable: true,
  },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "plan-starter",
    name: "Starter",
    code: "STARTER",
    price: 999,
    features: [
      "Up to 500 orders/month",
      "QR Code Ordering",
      "Basic Order Management",
      "2 Staff Accounts",
    ],
  },
  {
    id: "plan-pro",
    name: "Pro",
    code: "PRO",
    price: 2499,
    recommended: true,
    features: [
      "Unlimited orders",
      "1 Kitchen Display System (KDS)",
      "Advanced Analytics",
      "10 Staff Accounts",
      "Priority Support",
    ],
  },
  {
    id: "plan-enterprise",
    name: "Enterprise",
    code: "ENTERPRISE",
    price: 4999,
    features: [
      "Multiple Outlets Support",
      "Unlimited KDS Screens",
      "Custom API Access",
      "Unlimited Staff Accounts",
      "Dedicated Account Manager",
    ],
  },
];

export const MERCHANT_ORDERS: MerchantOrder[] = [
  {
    id: "mo-1",
    orderNumber: "ORD-0042",
    type: "DINE_IN",
    tableNumber: "12",
    status: "PREPARING",
    items: ["Hyderabadi Chicken Biryani (Full)", "Paneer Tikka × 1"],
    total: 598,
    placedAt: "2026-06-21T19:32:00",
    elapsedMinutes: 14,
    notes: "Less spicy please",
  },
  {
    id: "mo-2",
    orderNumber: "ORD-0043",
    type: "TAKEAWAY",
    pickupCode: "7294",
    status: "READY",
    items: ["Masala Dosa × 2", "Fresh Lime Soda (Sweet)"],
    total: 450,
    placedAt: "2026-06-21T19:28:00",
    elapsedMinutes: 18,
  },
  {
    id: "mo-3",
    orderNumber: "ORD-0044",
    type: "DINE_IN",
    tableNumber: "7",
    status: "PLACED",
    items: ["Chicken 65 × 1"],
    total: 299,
    placedAt: "2026-06-21T19:45:00",
    elapsedMinutes: 2,
  },
];

export const GST_RATE = 0.05;

export function getMenuItem(id: string): MenuItem | undefined {
  return MENU_ITEMS.find((item) => item.id === id);
}

export function getCategoryItems(categoryId: string): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.categoryId === categoryId);
}
