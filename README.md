# YourAuraScore

A personality quiz that generates a unique, one-of-a-kind aura visualization. Answer 12 visual questions and get a stunning generative art piece that reflects your energy.

## Features

- **60-second visual quiz** — 12 questions, no signup required
- **Unique aura visualization** — Algorithmic art using noise, particles, and color theory
- **24 personality archetypes** — From "The Firestarter" to "The Dreamweaver"
- **Shareable results** — Results encoded in the URL for easy sharing
- **Optional purchases** — HD wallpaper, animated wallpaper, PDF report via Stripe

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS
- Stripe (payments)
- Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/YourAuraScore.git
cd YourAuraScore

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your values (see below)
```

### Environment Variables

See `.env.example` for the full list. Required for production:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_BASE_URL` | Yes | Your production URL (e.g. `https://youraura.score`) |
| `STRIPE_SECRET_KEY` | For payments | Stripe secret key (test or live) |
| `STRIPE_WEBHOOK_SECRET` | For webhooks | Stripe webhook signing secret |

Without Stripe keys, the app runs in demo mode (checkout shows alerts instead of redirecting).

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

## Deployment (Vercel)

1. Push to GitHub and import the repo in [Vercel](https://vercel.com)
2. Add environment variables in the Vercel project settings
3. Configure your custom domain and set `NEXT_PUBLIC_BASE_URL` accordingly

### Stripe Webhook Setup

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Add endpoint: `https://your-domain.com/api/webhook`
3. Select event: `checkout.session.completed`
4. Copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`

## Project Structure

```
src/
├── app/           # App Router pages and API routes
├── components/    # React components (quiz, aura, results)
├── hooks/         # useQuiz, useAuraEngine
└── lib/           # Archetypes, aura engine, scoring
```

## Contact

- **Support:** info@alstonanalytics.com

## License

Private — all rights reserved.
