# Tabark

A premium, minimalist e-commerce storefront built with Next.js App Router. Warm
editorial design, mobile-first layouts, and fully functional shopping flows — no
decorative, dead-end buttons.

## Stack

- **Next.js 16** (App Router, Cache Components, Turbopack)
- **TypeScript** + **Tailwind CSS v4** + shadcn-style UI primitives
- **Motion** and **GSAP ScrollTrigger** for interaction and scroll choreography
- **Zustand** (persisted) for cart, wishlist, and UI state
- **React Hook Form** for forms, **next-themes** for light/dark
- **Lucide React** icons, `yet-another-react-lightbox` for the product gallery

## Getting started

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

```bash
pnpm lint       # ESLint
pnpm build      # production build
pnpm start      # serve the production build
```

## What works

- Product catalogue with search, category filters, sorting, and SSR-rendered
  results (`/shop?q=…&category=…`)
- Product pages with image gallery, variants, quantity controls, and related
  pieces
- Cart drawer + cart page with quantity updates, removal, and free-shipping
  progress
- Wishlist with header count, persisted in `localStorage`
- Editorial collections, brand story, campaign, newsletter, and contact pages
- Local accounts: register, sign in, session cookie, and account page
- Newsletter and contact forms that persist real submissions

## Preview limitations

This build is wired for a real backend but does not pretend to have one:

- **Checkout is a preview.** The form validates addresses and totals, then states
  clearly that no payment was taken and no order was placed. No payment gateway
  is connected.
- **Accounts and messages are stored locally** as JSON files in `.data/`
  (gitignored) via `src/lib/server/store.ts`. Passwords are hashed with scrypt
  and sessions are HMAC-signed, but this file store is intended for preview and
  local development — replace it with a database before deploying.
- Set `AUTH_SECRET` in the environment for a stable session-signing key:

  ```bash
  AUTH_SECRET="$(openssl rand -base64 32)"
  ```

Product imagery is served from Unsplash, allow-listed in `next.config.ts`.

## Structure

```text
src/
├── app/            routes, metadata, API handlers, error/loading/not-found
├── components/     layout, sections, products, cart, auth, ui primitives
├── data/           catalogue + collections (mock content, typed)
├── hooks/          hydration and shared client hooks
├── lib/            formatting, navigation, server auth/store helpers
├── store/          zustand cart, wishlist, UI stores
└── types/          shared domain types
```

`src/proxy.ts` rejects unknown product/collection slugs before render so they
return a real `404` even with partial prerendering enabled.
