# AeroDine Frontend

Next.js frontend for the **AeroDine** QR restaurant ordering platform. Implements the customer mobile UX and merchant onboarding/E2E flows from the product UX specs, wired with mock data for now.

## Tech Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Zustand** (cart persistence)
- **Lucide React** (icons)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

### Marketing
| Route | Description |
|---|---|
| `/` | Landing page with links to demo flows |

### Customer (mobile-first)
| Route | UX Screen |
|---|---|
| `/order/welcome` | Welcome screen after QR scan |
| `/order/menu` | Digital menu with categories |
| `/order/item/[id]` | Item detail with variants & add-ons |
| `/order/cart` | Cart review |
| `/order/checkout` | Checkout + phone capture |
| `/order/payment` | UPI / card payment |
| `/order/status` | Live order status |

### Merchant
| Route | UX Screen |
|---|---|
| `/merchant/login` | OTP login |
| `/merchant/signup` | Welcome & sign up |
| `/merchant/onboarding/profile` | Business profile setup |
| `/merchant/onboarding/plan` | Subscription plan selection |
| `/merchant/onboarding/payout` | UPI payout & settlement |
| `/merchant/onboarding/qr` | QR setup & test payment |
| `/merchant/dashboard` | Merchant dashboard |
| `/merchant/orders` | Active orders |
| `/merchant/kitchen` | Kitchen display system |
| `/merchant/menu` | Menu management |
| `/merchant/reports` | Order history & reports |
| `/merchant/settings` | Settings & subscription |

## Backend Integration

Set the API base URL when connecting to `backend-server`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Project Structure

```
src/
├── app/              # Next.js routes
├── components/       # UI, layout, brand, merchant
├── lib/              # Utils, mock data
├── stores/           # Zustand (cart)
└── types/            # Shared TypeScript types
```

## Branding

All **FoodTrump** references from the UX PDFs are rebranded to **AeroDine**.

---

© Freedom Security Solutions
