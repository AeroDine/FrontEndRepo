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
  name: "Spice Garden",
  slug: "spice-garden",
  tagline: "Authentic Pune flavours since 2018",
  tableNumber: "12",
  gstin: "27AABCU9603R1ZM",
  city: "Pune",
};

export const MENU_SECTIONS: MenuSection[] = [
  { id: "sec-lunch", name: "Lunch" },
  { id: "sec-dinner", name: "Dinner" },
];

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: "cat-starters", sectionId: "sec-lunch", name: "Starters", sortOrder: 1 },
  { id: "cat-mains", sectionId: "sec-lunch", name: "Mains", sortOrder: 2 },
  { id: "cat-biryani", sectionId: "sec-lunch", name: "Biryani", sortOrder: 3 },
  { id: "cat-beverages", sectionId: "sec-lunch", name: "Beverages", sortOrder: 4 },
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
    id: "item-1",
    name: "Paneer Tikka",
    description:
      "Char-grilled cottage cheese with bell peppers, mint chutney, and smoked spices.",
    categoryId: "cat-starters",
    price: 249,
    imageUrl:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop",
    diet: "veg",
    isAvailable: true,
  },
  {
    id: "item-2",
    name: "Chicken 65",
    description: "Crispy Andhra-style fried chicken with curry leaves and red chilli.",
    categoryId: "cat-starters",
    price: 299,
    imageUrl:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&h=400&fit=crop",
    diet: "non-veg",
    isAvailable: true,
  },
  {
    id: "item-3",
    name: "Hyderabadi Chicken Biryani",
    description: "Slow-cooked basmati rice with tender chicken, saffron, and fried onions.",
    categoryId: "cat-biryani",
    price: 349,
    imageUrl:
      "https://images.unsplash.com/photo-1563379091339-03246963d29f?w=600&h=400&fit=crop",
    diet: "non-veg",
    isAvailable: true,
    variants: [
      { id: "var-half", name: "Half", price: 249, isDefault: false },
      { id: "var-full", name: "Full", price: 349, isDefault: true },
    ],
    addOns: ADD_ONS.biryani,
  },
  {
    id: "item-4",
    name: "Masala Dosa",
    description: "Crisp rice crepe filled with spiced potato masala, served with sambar.",
    categoryId: "cat-mains",
    price: 180,
    imageUrl:
      "https://images.unsplash.com/photo-1630384060420-cbb7592843f8?w=600&h=400&fit=crop",
    diet: "veg",
    isAvailable: true,
    addOns: ADD_ONS.dosa,
  },
  {
    id: "item-5",
    name: "Dal Tadka",
    description: "Yellow lentils tempered with garlic, cumin, and ghee. Served with rice.",
    categoryId: "cat-mains",
    price: 220,
    imageUrl:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop",
    diet: "veg",
    isAvailable: false,
  },
  {
    id: "item-6",
    name: "Fresh Lime Soda",
    description: "Sweet or salted — your choice of refreshing lime soda.",
    categoryId: "cat-beverages",
    price: 90,
    imageUrl:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop",
    diet: "veg",
    isAvailable: true,
    variants: [
      { id: "var-sweet", name: "Sweet", price: 90, isDefault: true },
      { id: "var-salt", name: "Salt", price: 90 },
    ],
  },
];

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "plan-basic",
    name: "QR Basic",
    code: "QR_BASIC",
    price: 1999,
    features: [
      "Up to 500 orders/month",
      "Digital menu & QR ordering",
      "Kitchen display",
      "Email support",
    ],
  },
  {
    id: "plan-pro",
    name: "QR Pro",
    code: "QR_PRO",
    price: 2999,
    recommended: true,
    features: [
      "Unlimited orders",
      "Takeaway + dine-in",
      "Analytics dashboard",
      "WhatsApp notifications",
      "Priority support",
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
