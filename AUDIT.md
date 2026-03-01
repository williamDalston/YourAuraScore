# YourAuraScore — Full Site Audit

---

## 1. PROJECT IDENTITY & PURPOSE

**What this site IS:** YourAuraScore is a browser-based personality quiz that generates unique, deterministic generative-art "aura" visualizations. Users answer 12 visual/interactive questions (image picks, word choices, icon taps, sliders) and receive a real-time Canvas-rendered aura artwork, one of 24 personality archetypes, personality insights, a rarity score, and social sharing tools. Optional paid upsells include HD wallpaper downloads, animated wallpapers, PDF personality reports (via Stripe), and print-on-demand merchandise (via Printful).

**Target audience:**
- Age range: 16–35, skewing female/non-binary
- Demographics: Gen Z and younger Millennials, social-media-native, into astrology/MBTI/personality typing, aesthetic-driven
- Intent: Entertainment, self-discovery, shareable social content ("I'm The Firestarter!")
- Tech savviness: Moderate — comfortable with mobile apps and sharing links, not necessarily technical
- Device split estimate: 75% mobile / 25% desktop (quiz + sharing behavior is mobile-first)

**Core value proposition:** A free, no-signup, 60-second personality quiz that produces a genuinely beautiful, one-of-a-kind generative artwork (not a stock image) — beautiful enough to use as a phone wallpaper. Privacy-first: zero server-side data storage, everything encoded in the URL.

**Competitive landscape:**
1. **Aura photography studios** (physical, $30-50 per session) — YourAuraScore is free, instant, digital-native
2. **16Personalities / MBTI tests** — lengthy, text-heavy, no visual output. YourAuraScore is visual-first and 60 seconds
3. **BuzzFeed-style quizzes** — shallow, ad-heavy, generic results. YourAuraScore produces unique generative art, not canned images

---

## 2. ARCHITECTURE OVERVIEW

### Tech Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.6 (App Router) |
| Language | TypeScript 5 (strict mode) |
| UI Library | React 19.2.3 |
| Styling | Tailwind CSS 4 (via @tailwindcss/postcss) |
| Animation | Framer Motion 12.34.3 |
| Generative Art | HTML5 Canvas + simplex-noise 4.0.3 |
| Payments | Stripe 20.3.1 (@stripe/stripe-js 8.8.0) |
| Hosting | Vercel |
| Database | **None** — all data encoded in URL hash |
| Auth | **None** — no user accounts |
| Merch | Printful (API placeholder, not yet implemented) |

### File/Folder Structure
```
YourAuraScore/
├── .env.example           # Environment variable template
├── .env.local             # Local env vars (Stripe keys, base URL)
├── .vercel/               # Vercel project config
├── package.json           # Dependencies & scripts
├── next.config.ts         # Next.js config (empty/default)
├── tsconfig.json          # TypeScript config (strict, path aliases)
├── postcss.config.mjs     # PostCSS with Tailwind plugin
├── eslint.config.mjs      # ESLint (next/core-web-vitals + TS)
├── public/                # Static assets (SVGs: file, globe, next, vercel, window)
│   └── favicon.ico
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── layout.tsx     # Root layout (Geist font, bg-black, skip-to-content)
│   │   ├── page.tsx       # Homepage (hero, features, CTA)
│   │   ├── globals.css    # Global styles (custom animations, scrollbar, slider)
│   │   ├── loading.tsx    # Global loading spinner
│   │   ├── error.tsx      # Error boundary (client)
│   │   ├── global-error.tsx # Root error boundary
│   │   ├── not-found.tsx  # 404 page
│   │   ├── robots.ts      # SEO robots.txt
│   │   ├── sitemap.ts     # SEO sitemap
│   │   ├── quiz/
│   │   │   └── page.tsx   # Quiz page (renders QuizContainer)
│   │   ├── results/
│   │   │   └── [hash]/
│   │   │       ├── page.tsx        # Results page (server component, generates OG metadata)
│   │   │       └── ResultsClient.tsx # Results page (client component, all result sections)
│   │   ├── about/page.tsx     # About page
│   │   ├── privacy/page.tsx   # Privacy policy
│   │   ├── terms/page.tsx     # Terms of service
│   │   ├── og/[hash]/route.tsx # Dynamic OG image generation (Edge runtime)
│   │   └── api/
│   │       ├── checkout/route.ts    # Stripe Checkout session creation
│   │       ├── download/[token]/route.ts # Post-purchase thank-you page
│   │       ├── printful/route.ts    # Printful merch API (placeholder)
│   │       └── webhook/route.ts     # Stripe webhook handler
│   ├── components/
│   │   ├── quiz/
│   │   │   ├── QuizContainer.tsx  # Quiz orchestrator (state + routing)
│   │   │   ├── QuestionCard.tsx   # Question renderer (dispatches to option types)
│   │   │   ├── ProgressBar.tsx    # Animated progress bar
│   │   │   ├── ImageOption.tsx    # Gradient-card option type
│   │   │   ├── WordOption.tsx     # Text-button option type
│   │   │   ├── IconOption.tsx     # Emoji-icon option type
│   │   │   └── SliderOption.tsx   # Range slider option type
│   │   ├── aura/
│   │   │   ├── AuraCanvas.tsx     # Canvas wrapper component
│   │   │   └── AuraReveal.tsx     # Animated reveal with glow
│   │   ├── results/
│   │   │   ├── ArchetypeCard.tsx      # Archetype name + description
│   │   │   ├── ColorMeaning.tsx       # Color interpretation card
│   │   │   ├── PersonalityInsights.tsx # 3 personality insight cards
│   │   │   ├── RarityBadge.tsx        # Rarity percentage badge
│   │   │   ├── DownloadUpsell.tsx     # Paid download CTAs (wallpaper/animated/report)
│   │   │   └── MerchSection.tsx       # Printful merch grid
│   │   └── share/
│   │       └── ShareButtons.tsx   # Share (native), copy link, X/Twitter, Pinterest
│   ├── hooks/
│   │   ├── useQuiz.ts         # Quiz state machine (useReducer)
│   │   └── useAuraEngine.ts   # Canvas engine hook (init, animate, cleanup)
│   └── lib/
│       ├── quiz/
│       │   ├── types.ts       # TypeScript types (Dimensions, Question, QuizState)
│       │   ├── questions.ts   # 12 quiz questions with dimension weights
│       │   ├── scoring.ts     # Dimension calculator (weighted averaging)
│       │   └── hash.ts        # Base36 answer encoding/decoding
│       ├── archetypes/
│       │   ├── definitions.ts # 24 archetype definitions (6 dimensions × 4 modifiers)
│       │   ├── matcher.ts     # Archetype matching + rarity calculation
│       │   └── insights.ts    # Personality insight generator
│       └── aura/
│           ├── engine.ts      # Main render engine (init, render frame, animation loop)
│           ├── noise.ts       # Simplex/FBM/cellular noise (seeded PRNG)
│           ├── palette.ts     # Color palette generator (HSL-based color theory)
│           ├── particles.ts   # Particle system (swirl/float/pulse/drift behaviors)
│           ├── patterns.ts    # Pattern overlays (geometric/organic/chaotic/minimal)
│           └── renderer.ts    # Background + noise field renderer
```

### Data Flow
1. **User visits `/quiz`** → `QuizContainer` renders, `useQuiz` hook initializes state (useReducer)
2. **User answers questions** → `answerQuestion()` dispatches ANSWER action, advances `currentQuestion`
3. **Quiz completes** (12 answers) → `completeQuiz()` calls `calculateDimensions()` to produce 6 personality dimensions (0–100 each), then `encodeAnswers()` to produce a base36 hash string
4. **Router pushes to `/results/{hash}`** → Server component generates OG metadata with dynamic image URL
5. **`ResultsClient` renders** → `decodeAnswers(hash)` reconstructs answers → `calculateDimensions()` → `matchArchetype()` → `calculateRarity()` → `generateInsights()`
6. **`AuraReveal` + `AuraCanvas`** → `useAuraEngine` hook: `initEngine()` decodes hash → generates palette, particles, noise, patterns → `startAnimation()` runs `requestAnimationFrame` loop → renders to Canvas
7. **User shares** → URL with hash is shared; recipients see the same deterministic result
8. **User purchases** → `POST /api/checkout` creates Stripe Checkout session → redirects to Stripe → webhook confirms payment → `GET /api/download/{hash}` shows thank-you page

### Database Schema
**None.** All state is encoded in the URL hash (base36 string, 6-12 chars). This is a fully stateless application — no database, no session storage, no cookies for quiz data.

### API Routes/Endpoints
| Route | Method | Purpose | Auth |
|---|---|---|---|
| `/api/checkout` | POST | Creates Stripe Checkout session for digital products | None (validates hash) |
| `/api/download/[token]` | GET | Post-purchase thank-you page, validates Stripe session | Stripe session_id |
| `/api/webhook` | POST | Stripe webhook handler (checkout.session.completed) | Stripe signature verification |
| `/api/printful` | POST | Printful merch creation (placeholder — not functional) | None (validates hash) |
| `/og/[hash]` | GET | Dynamic OG image generation (Edge runtime, 1200×630) | None |

### Third-Party Integrations
| Service | Purpose | Status |
|---|---|---|
| Stripe | Payment processing for digital downloads | Implemented (demo mode without keys) |
| Printful | Print-on-demand merchandise | **Placeholder only** — API calls are commented out |
| Google AdSense | Advertising | **Mentioned in privacy policy but NOT implemented in code** |
| Vercel | Hosting & deployment | Configured (.vercel/ exists) |

### State Management
- **Quiz state**: `useReducer` in `useQuiz` hook (local component state, not global)
- **Aura engine**: `useRef` + `useState` in `useAuraEngine` hook
- **No global state management** (no Redux, Zustand, Context, etc.) — not needed given the simple, linear flow

---

## 3. CURRENT STYLING & DESIGN AUDIT

### Color Palette
| Role | Value | Where Used |
|---|---|---|
| Background | `#000000` (pure black) | Every page `bg-black`, `--background: #000` |
| Foreground | `#ededed` | `--foreground`, body text |
| Primary accent | `#7c3aed` (violet-600) | CTA buttons, progress bar, gradient starts |
| Secondary accent | `#a855f7` (purple-500) | Button gradients, hover states |
| Pink accent | `#ec4899` (pink-500) | Progress bar gradient, hero background blob |
| Amber accent | `#f59e0b` (amber-500) | Progress bar gradient, hero gradient text |
| Blue accent | `#3b82f6` (blue-500) | Hero background blob |
| Cyan accent | `#06b6d4` (cyan-500) | Hero background blob |
| Text primary | `text-white` (#fff) | Headings, primary text |
| Text secondary | `text-white/60` | Body text, descriptions |
| Text tertiary | `text-white/50` | Labels, question counters |
| Text muted | `text-white/30` | Footer links, subtitles |
| Purple highlight | `text-purple-400` (#c084fc) | Logo "Score" text, subtitle accent |
| Card background | `bg-white/5` | Quiz options, result cards, merch items |
| Card border | `border-white/10` | All cards and buttons |
| Card hover | `bg-white/10`, `border-white/30` | Hover states |
| Error | `text-red-400` (#f87171) | Error messages |

### Typography
| Element | Font | Size | Weight | Line Height |
|---|---|---|---|---|
| Body | Geist Sans (variable `--font-geist-sans`) | — | — | — |
| Mono | Geist Mono (variable `--font-geist-mono`) | — | — | — |
| H1 (hero) | Geist Sans | `text-5xl` / `sm:text-7xl` (3rem / 4.5rem) | `font-bold` (700) | `leading-[1.1]` |
| H1 (pages) | Geist Sans | `text-3xl` (1.875rem) | `font-bold` | default |
| H2 (archetype) | Geist Sans | `text-4xl sm:text-5xl` | `font-bold` | default |
| H2 (sections) | Geist Sans | `text-lg` (1.125rem) | `font-semibold` (600) | default |
| Question text | Geist Sans | `text-2xl sm:text-3xl` | `font-bold` | `leading-tight` |
| Body text | Geist Sans | `text-sm` (0.875rem) / `text-base` (1rem) | normal | `leading-relaxed` (1.625) |
| Labels | Geist Sans | `text-xs` (0.75rem) | `font-medium` (500) | default |
| Section headers | Geist Sans | `text-xs` | normal | uppercase, `tracking-[0.2em]` |
| CTA button | Geist Sans | `text-lg` (1.125rem) | `font-semibold` | default |
| Small body | Geist Sans | `text-sm` | normal | `leading-relaxed` |

### Border Radius
| Element | Value |
|---|---|
| CTA buttons | `rounded-full` (9999px) — pill shape |
| Quiz option cards | `rounded-2xl` (1rem) |
| Result cards | `rounded-2xl` (1rem) |
| Download buttons | `rounded-xl` (0.75rem) |
| Merch items | `rounded-xl` (0.75rem) |
| Progress bar | `rounded-full` |
| Share buttons | `rounded-full` |
| Rarity badge | `rounded-full` |
| Canvas/aura | `rounded-2xl` (1rem) |
| Aura glow | `rounded-3xl` (1.5rem) |
| Scrollbar thumb | `3px` |

### Spacing System
- Consistent use of Tailwind's default spacing scale (multiples of 4px)
- Page padding: `px-6` (24px) on all pages
- Section vertical: `py-8` to `py-20` (32px to 80px)
- Card internal: `p-4` to `p-6` (16px to 24px)
- Element gaps: `gap-3` to `gap-8` (12px to 32px)
- Max-width containers: `max-w-2xl` (672px for text pages), `max-w-4xl` (896px for feature grid), `max-w-md` (448px for results), `max-w-lg` (512px for quiz)

### Shadow Usage
| Element | Shadow |
|---|---|
| CTA button | `shadow-lg shadow-purple-500/25` → `hover:shadow-purple-500/40` |
| Slider thumb | `box-shadow: 0 2px 8px rgba(0,0,0,0.3)` |
| Image option labels | `drop-shadow-lg` |
| No other shadows | The site relies on transparency/blur rather than elevation shadows |

### Button Styles
| Type | Shape | Colors | Hover | Size |
|---|---|---|---|---|
| Primary CTA | `rounded-full` pill | Gradient: violet-600 → purple-600 | violet-500 → purple-500, scale(1.05), stronger shadow | `px-10 py-4 text-lg` |
| Download primary | `rounded-xl` | Same gradient | Lighter gradient | `px-5 py-4` full-width |
| Download secondary | `rounded-xl` | `bg-white/5 border-white/10` | `bg-white/10` | `px-5 py-4` full-width |
| Share button | `rounded-full` pill | `bg-white/10` | `bg-white/20` | `px-5 py-2.5` |
| Social icon | `rounded-full` circle | `bg-white/10` | `bg-white/20` | `w-10 h-10` |
| Word option | `rounded-2xl` | Gradient backgrounds (4 variations) | scale(1.05) | `py-5 px-8 text-xl` |
| Icon option | `rounded-2xl` | `bg-white/5 border-white/10` | scale(1.08), `border-white/30`, `bg-white/10` | `p-6` |
| Slider confirm | `rounded-full` | `bg-white text-black` | `bg-white/90` | `px-8 py-3 text-sm` |
| Error try-again | `rounded-full` | `bg-white/10` | `bg-white/20` | `px-6 py-2.5` |

### Card/Container Styles
- Glassmorphism approach: `bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10`
- No drop shadows on cards — relies on transparency layers and blur
- Result section cards follow consistent pattern: staggered fade-in animations with increasing delays

### Navigation Style
- **Top bar**: Simple flex layout, logo left, single "About" link right
- **Not sticky** — scrolls with page
- **No hamburger menu** — only one nav link, no mobile nav needed
- **Back button** on quiz: absolute positioned, top-left, `text-white/50`
- **Logo**: Text-only "YourAura" (white) + "Score" (purple-400), `font-bold text-lg`

### Footer Style
- **Homepage only**: `border-t border-white/5`, horizontal layout
- Content: Copyright left, Privacy/Terms/About links right
- Colors: `text-white/30` all text
- Layout: `flex-col sm:flex-row` responsive
- **Other pages**: No footer

### Responsive Breakpoints
| Breakpoint | Changes |
|---|---|
| Default (mobile) | Single column, smaller text, stacked layouts |
| `sm:` (640px) | Hero text grows (5xl → 7xl), feature grid goes 3-col, footer goes horizontal |
| No `md:`, `lg:`, `xl:` breakpoints used | Minimal responsive adaptation |

### Animation/Transitions
| Animation | Element | Details |
|---|---|---|
| `pulse-slow` (6s) | Hero bg blob | Scale 1→1.1, opacity 0.15→0.25 |
| `float` (8s) | Hero bg blob | translateY/X wandering |
| `float-delayed` (10s) | Hero bg blob | Offset wandering pattern |
| `animate-spin` | Loading spinner | Standard spin |
| `animate-pulse` | Loading dots | Standard pulse |
| Framer Motion slide | Question cards | `x: 60→0` enter, `x: 0→-60` exit, 0.35s |
| Framer Motion scale | Option buttons | Various whileHover/whileTap scales |
| Framer Motion fade-in | Option items | Staggered `delay: index * 0.1` |
| Framer Motion reveal | Aura canvas | `scale: 0.9→1, blur: 20px→0, opacity: 0→1`, 1.5s |
| Framer Motion stagger | Result sections | Increasing delays: 1.8s, 2.2s, 2.6s, 3.4s, 3.6s, 3.8s, 4.2s |
| Canvas animation | Aura art | 3.5s reveal with easeInOutCubic, continuous particle/noise animation |
| Ambient glow pulse | Behind canvas | scale [1,1.05,1], opacity [0.2,0.35,0.2], 4s infinite |
| Progress bar | Top of quiz | Width transition 0.4s easeOut |

### Dark Mode
**The entire site is dark mode by default.** Background is `#000000` everywhere. There is no light mode, no toggle, no `prefers-color-scheme` media query. The site is dark-only by design — this is appropriate for the aesthetic.

### Icon System
- **No icon library installed** (no Lucide, Heroicons, etc.)
- All icons are inline SVGs, hand-coded in each component
- Emoji used for quiz options (🔥🌊🌿💨🌧️⚡🎐🤫🌸☀️🍂❄️) and merch items (🖼️📱✨🎨👜)
- Feature section on homepage uses HTML entities (&#127912; &#10024; &#129504;)
- Sizing is inconsistent: `width="20"`, `width="18"`, `width="24"`, `width="16"` across different components

### Image Handling
- **No actual images used** — all "images" are CSS gradients rendered as backgrounds
- No `<img>` tags in the entire codebase
- No image optimization needed (no next/image usage)
- OG images are generated server-side via `ImageResponse` (Edge runtime)
- Canvas renders aura at 1080×1920 resolution, displayed with `max-height: 70vh`
- Public folder contains only default Next.js SVGs and favicon

---

## 4. TARGET AUDIENCE PSYCHOLOGY & STYLING RECOMMENDATIONS

### What visual language does this audience expect?
This audience (Gen Z, personality-quiz lovers, astrology enthusiasts) expects:
- **Bold, dark, mystical aesthetics** — the current black background with purple/pink gradients is on-brand
- **Smooth, satisfying micro-interactions** — already implemented well with Framer Motion
- **Mobile-first, thumb-friendly design** — needs improvement (see below)
- **Social-media-native sharing** — partially implemented
- **"Premium but accessible"** feel — no paywalls on the core experience

### Trust signals needed
- Social proof: "X people have discovered their aura" counter (easy to implement with a simple counter API)
- User testimonials or social screenshots
- "As seen on" social proof if any influencers share it
- Professional design quality (already strong)

### Specific styling changes (STATUS)
1. **Add a subtle grain/texture overlay** — NOT DONE (cosmetic, low priority)
2. ~~**Increase touch targets on mobile**~~ — **DONE.** Back button, share icons (40→44px), cookie consent buttons, merch grid all meet 44px minimum. Merch last item spans full width on odd count.
3. ~~**Add Facebook and WhatsApp sharing**~~ — **DONE.**
4. ~~**Progress bar should be sticky**~~ — **DONE.**
5. ~~**Footer consistency**~~ — **DONE.** All pages have footers. Results page has nav bar + footer with links.
6. **Hero button shimmer** — NOT DONE (cosmetic, low priority)
7. ~~**Reduce result page animation delays**~~ — **DONE.** ~40% reduction.
8. **Haptic feedback on mobile** — NOT DONE (nice-to-have)

### UX/UI fixes (IMPLEMENTED)
- **Results page navigation**: Added nav bar with logo (links home) and "Retake Quiz" link at top. Footer with Archetypes/Privacy/Terms links and CTA button at bottom.
- **API timeout handling**: Both download upsell and merch buttons now abort after 10 seconds with "Request timed out" error instead of hanging forever.
- **Low-contrast text fixed**: Bumped body text from `/70-/75` to `/80-/90` on ArchetypeCard, ColorMeaning, PersonalityInsights, and upsell sub-text.
- **ARIA accessibility**: Loading spinner has `role="status"`, slider input has `aria-label` and `aria-valuetext`, merch buttons have `aria-label` with product name and price.
- **Quiz back button**: Moved from absolute positioning to proper layout flow, meets 44px touch target.
- **Slider labels**: Middle labels hidden on mobile to prevent overflow, only endpoints + selected value shown.
- **Cookie consent**: Safe-area-inset-bottom padding for iPhone notch.

### Mobile-first priorities
- Quiz is the core experience — it works well on mobile already
- Results page now has proper top nav and bottom footer (no more dead-end feel)
- All touch targets meet 44px minimum
- Canvas aspect ratio (9:16) works perfectly as a phone wallpaper preview

### Conversion psychology
- The "Keep Your Aura Forever" download upsell section is now positioned at emotional peak (after Archetype + Color Meaning, before Rarity/Share)
- **Bundle-first ordering**: Highest-margin product ($7.99 bundle) leads with "BEST VALUE" badge, followed by individual products
- **Free preview vs paid HD**: Free save exports at 540x960 preview quality; paid wallpaper is 1080x1920 — clear quality upgrade
- **Share after purchase**: Share buttons now appear below the upsell, preventing post-share bounce before conversion
- CTA button colors are correct (high contrast purple on black, amber-to-pink gradient for bundle)
- **Still missing: urgency cues** — add "Your aura link expires in 30 days" or similar
- **Still missing: social proof on upsells** — "2,400+ auras downloaded" would boost conversion

### Page load perception
- Loading spinner exists (`loading.tsx`) — good
- Canvas has a loading spinner while rendering — good
- **Missing: skeleton screens** for the results page components during the reveal stagger
- Consider adding a blur-up placeholder for the canvas during the 3.5s reveal

---

## 5. DOMAIN NAME RECOMMENDATIONS

| Rank | Domain | Why It Works | TLD | Availability | SEO Keywords |
|---|---|---|---|---|---|
| 1 | **youraura.score** | Referenced throughout codebase already. Memorable, describes the product. ".score" TLD is unique. | .score | Unknown — .score is a newer TLD, likely available | "aura", "score" |
| 2 | **youraura.app** | Clean, mobile-native feel. Short and memorable. | .app | Likely available — less common than .com | "aura" |
| 3 | **auraquiz.com** | Direct, SEO-friendly. Users would search "aura quiz." | .com | Moderate — may be taken, check immediately | "aura", "quiz" |
| 4 | **getmyaura.com** | Action-oriented, memorable, implies personal result | .com | Likely available — compound phrase | "aura" |
| 5 | **auravibes.co** | Trendy, Gen Z language ("vibes"), modern TLD | .co | Check availability — "vibes" domains are popular | "aura", "vibes" |

---

## 6. MONETIZATION PLAN

### Current monetization
- **Stripe Checkout implemented** for 3 digital products:
  - HD Wallpaper (4K PNG): $1.99
  - Animated Aura (MP4 loop): $2.99
  - Full Personality Report (PDF): $4.99
- **Printful merch** listed in UI (poster $24.99, phone case $19.99, stickers $9.99, canvas $39.99, tote $22.99) but **API integration is a placeholder** — orders go nowhere
- **Google AdSense** mentioned in privacy policy but **zero ad code exists in the codebase**

### Primary revenue model recommendation: **Digital downloads (freemium upsell)**
The current $1.99-$4.99 digital products are the right model. Users take a free quiz, get emotionally attached to their result, then convert on paid downloads. This is proven by similar quiz/generator products.

### Secondary revenue streams
1. **Merchandise** (Printful) — finish the integration. The $20-40 price points on physical goods are healthy margins with POD
2. **Google AdSense** — add a single non-intrusive ad unit on the results page (below the share section, above merch). Expected RPM: $3-8 for personality/entertainment content

### AdSense readiness
- **NOT ready.** Zero ad code in the codebase.
- Privacy policy mentions AdSense (good for compliance) but implementation is missing
- Best ad placement: Single responsive ad unit on the results page between share and merch sections
- Content policy: Site is clean, no controversial content — should pass AdSense review easily
- Minimum requirement: Need 10-15 pages of content to be approved. Currently only 5 pages. Add a blog or "Archetype Explorer" page listing all 24 archetypes to increase page count.

### Pricing strategy
Current pricing is reasonable:
- $1.99 wallpaper is an impulse buy — correct
- $2.99 animated is a slight upsell — correct
- $4.99 report is the premium tier — correct
- **Add a bundle: "Complete Aura Pack" at $7.99** (all 3 products, saves $2) — this will increase AOV significantly

### Revenue optimization (IMPLEMENTED)
- **Bundle pricing added**: "Complete Aura Pack" at $7.99 (all 3 products, saves $2 vs buying individually at $9.97)
- **Bundle leads the upsell section**: Highest-margin product shown first with "BEST VALUE" badge and prominent amber-to-pink gradient
- **Upsell moved higher on page**: Now appears right after Archetype + Color Meaning (emotional peak) instead of buried below Share
- **Share moved below upsell**: Users see purchase options before social sharing, preventing post-share bounce
- **Free save downgraded to preview quality**: Exports at 540x960 (half resolution) labeled "Save Preview" — paid HD wallpaper is 1080x1920 (4K)
- **Post-purchase auto-download**: After Stripe payment, users redirect to results page with `?download=` param that auto-triggers the HD canvas export

### Monetization implementation steps remaining
1. Finish Printful API integration (merch fulfillment)
2. Implement animated MP4 and PDF report generation (wallpaper PNG export now works)
3. Apply for AdSense, add ad component
4. Add analytics (Google Analytics or Plausible) to track conversion funnel

---

## 7. FEATURES — CURRENT STATE

| Feature | Status | What Works | What Doesn't | What's Missing |
|---|---|---|---|---|
| **Homepage** | Complete | Hero, features, CTA, footer, animated background, responsive | — | Social proof counter, testimonials |
| **Quiz (12 questions)** | Complete | All 4 question types work (image, word, icon, slider), back button, progress bar, animations, routing | — | Keyboard navigation for accessibility |
| **Answer encoding/decoding** | Complete | Base36 hash, deterministic, bidirectional, URL-safe | — | — |
| **Dimension scoring** | Complete | 6 dimensions, weighted averaging, normalization to 0-100 | — | — |
| **Archetype matching** | Complete | 24 archetypes (6×4), dominant dimension + Q12 modifier, fallback logic | — | — |
| **Personality insights** | Complete | 3 insights per result, deterministic selection, high/low variants | — | — |
| **Rarity calculation** | Complete | Based on deviation from center values | — | — |
| **Aura visualization** | Complete | Real-time Canvas rendering, noise fields, particles (4 behaviors), patterns (4 types), palette generation, 3.5s reveal animation, vignette, center glow | — | Export/download functionality (canvas.toDataURL exists in engine but no UI button) |
| **OG image generation** | Complete | Dynamic 1200×630 images per hash, Edge runtime, fallback for invalid hashes, archetype name overlay | — | — |
| **Share buttons** | Complete | Native share API, copy link, X/Twitter, Facebook, WhatsApp, Pinterest | — | Instagram sharing (not possible via URL) |
| **Download upsell** | Working | UI renders (bundle first, best-value badge), API creates Stripe sessions, post-purchase auto-download of PNG, demo mode works | — | Animated MP4 generation, PDF report generation |
| **Merch section** | Placeholder | UI renders with 5 products, API has validation | **Printful API is completely stubbed out** — commented code, returns demo JSON | Full Printful integration, product creation, checkout flow |
| **Stripe payments** | Working | Checkout session creation, webhook handler, success URL routing, demo mode, bundle pricing ($7.99) | — | Set real Stripe keys for production |
| **Stripe webhook** | Complete | Signature verification, event handling, logging | — | No fulfillment action (by design — downloads are URL-based) |
| **Save/Download** | Complete | Free preview save (540x960), paid HD export (1080x1920) via post-purchase redirect | — | — |
| **About page** | Complete | Content, CTA, navigation, footer | — | — |
| **Privacy policy** | Complete | Covers data, cookies, payments, third parties, meta description, footer | — | — |
| **Terms of service** | Complete | Covers service, digital products, merch, IP, liability, meta description, footer | — | — |
| **Cookie consent** | Complete | LocalStorage-based banner, Accept/Decline, links to privacy policy | — | — |
| **SEO (robots.txt)** | Complete | Allows all, disallows /api/, references sitemap | — | — |
| **SEO (sitemap)** | Complete | 6 URLs (including /archetypes), proper priorities and change frequencies | — | — |
| **SEO (JSON-LD)** | Complete | WebApplication schema.org structured data in layout | — | FAQPage, Organization schemas |
| **Archetype Explorer** | Complete | /archetypes page with all 24 archetypes grouped by dimension, color-coded cards, SEO metadata | — | — |
| **Error handling** | Complete | error.tsx, global-error.tsx, not-found.tsx, invalid hash fallback | — | — |
| **Loading state** | Complete | Global loading spinner | — | — |
| **Accessibility** | Partially working | Skip-to-content link, aria-labels on buttons, aria-hidden on decorative elements | — | Missing focus management on quiz transitions, missing ARIA live regions for progress updates |
| **Analytics** | Not implemented | — | — | No Google Analytics, Plausible, or any tracking |
| **AdSense** | Not implemented | — | — | Mentioned in privacy policy, zero code |
| **Cookie consent** | Not implemented | — | — | Required for GDPR/AdSense compliance |

---

## 8. SEO & DISCOVERABILITY

### Current meta tags
| Page | Title | Description | OG Tags |
|---|---|---|---|
| Homepage | "YourAuraScore — Discover Your Unique Aura" | "Take a 60-second visual personality quiz..." | title, description, siteName, type |
| Quiz | "Take the Quiz \| YourAuraScore" | "Answer 12 visual questions to discover your unique aura visualization." | Inherits from layout |
| Results | "Your Aura \| YourAuraScore" | "Discover your unique aura visualization based on your personality." | Dynamic: title "I just discovered my aura!", image `/og/{hash}` |
| About | "About \| YourAuraScore" | "Learn about YourAuraScore — AI-powered personality visualization." | Inherits from layout |
| Privacy | "Privacy Policy \| YourAuraScore" | — (no description set) | Inherits from layout |
| Terms | "Terms of Service \| YourAuraScore" | — (no description set) | Inherits from layout |

### Missing SEO elements
1. **Structured data (JSON-LD)**: No schema.org markup. Add `WebApplication`, `FAQPage` (for About), `Organization` schemas
2. **Canonical URLs**: Not explicitly set (Next.js may handle this automatically, but should be explicit)
3. **Privacy/Terms meta descriptions**: Missing — add descriptions
4. **H1 consistency**: Some pages use h1 correctly, but hierarchy should be validated
5. **Alt text on SVG icons**: Inline SVGs have no title/desc elements
6. **`lang` attribute**: Set correctly (`en`) — good

### Content strategy
- **Target keywords**: "aura quiz", "personality visualization", "what's my aura", "aura test", "personality test with art", "aura generator"
- **Blog potential**: "What Your Aura Colors Mean" (target informational queries), "The 24 Aura Archetypes Explained" (long-tail), "Aura vs MBTI: Which Personality Test Is Better?"
- **Archetype explorer page**: List all 24 archetypes as a browsable gallery — captures search traffic for archetype names

### Page speed concerns
1. **Framer Motion bundle**: ~30KB gzipped — significant for a mostly-static site. Consider lazy-loading it only on quiz and results pages
2. **Stripe.js**: Dynamically imported (good — `await import('stripe')`) but `@stripe/stripe-js` is in client bundle. Should only load on results page
3. **simplex-noise**: ~4KB — small, acceptable
4. **No image optimization needed** — no images to optimize
5. **Geist fonts**: Loaded via `next/font/google` — good (self-hosted, swap behavior)
6. **Canvas rendering**: 1080×1920 at 4x downscale is performant — no concerns

### Accessibility score estimate
**Estimated: 75-80/100** (Lighthouse)
- Good: skip-to-content link, aria-labels on interactive elements, semantic HTML, color contrast (white on black is high contrast)
- Issues:
  - Quiz `QuestionCard` doesn't manage focus when transitioning between questions
  - `ProgressBar` changes are not announced to screen readers (needs `aria-live`)
  - Slider input has no accessible label element
  - Emoji-only content in quiz options may not be meaningful to screen readers
  - No `role="main"` on main content (uses `id` instead)

---

## 9. ENVIRONMENT VARIABLES & SECRETS

| Variable Name | Where Used | What It's For | Set in .env.local? | How To Get It |
|---|---|---|---|---|
| `NEXT_PUBLIC_BASE_URL` | `results/page.tsx`, `og/route.tsx`, `checkout/route.ts`, `download/route.ts`, `robots.ts`, `sitemap.ts` | Full production URL for OG images, redirects, SEO | Yes (`http://localhost:3000`) | Set to your production domain (e.g., `https://youraura.score`) |
| `STRIPE_SECRET_KEY` | `checkout/route.ts`, `download/route.ts`, `webhook/route.ts` | Stripe API authentication | Set but **empty** | [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys) — use `sk_test_...` for dev, `sk_live_...` for prod |
| `STRIPE_WEBHOOK_SECRET` | `webhook/route.ts` | Webhook signature verification | Set but **empty** | [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks) → Add endpoint → Copy signing secret (`whsec_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Referenced in .env.local but **NOT used anywhere in code** | Would be for client-side Stripe.js | Set but **empty** | Same Stripe Dashboard → API Keys (`pk_test_...`) |
| `PRINTFUL_API_KEY` | `printful/route.ts` | Printful API authentication | Set but **empty** | [Printful Dashboard → API](https://www.printful.com/dashboard/api) |

---

## 10. MANUAL SETUP TASKS REMAINING

- [ ] **Purchase domain** — Buy your chosen domain from Namecheap/Porkbun/Google Domains. Estimated time: 10 minutes
- [ ] **Set up Stripe account** — Sign up at stripe.com, get API keys (test + live), add to Vercel env vars. [stripe.com/register](https://stripe.com/register). Estimated time: 20 minutes
- [ ] **Create Stripe webhook** — In Stripe Dashboard → Webhooks → Add endpoint: `https://yourdomain.com/api/webhook` → Select `checkout.session.completed` → Copy signing secret to `STRIPE_WEBHOOK_SECRET`. Estimated time: 10 minutes
- [ ] **Set Vercel environment variables** — In Vercel project → Settings → Environment Variables → Add: `NEXT_PUBLIC_BASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`. Estimated time: 5 minutes
- [ ] **Configure DNS** — Point your domain to Vercel: Add CNAME record `www` → `cname.vercel-dns.com` and A record `@` → Vercel's IP (shown in Vercel dashboard). Estimated time: 15 minutes
- [ ] **Set up Printful account** (if using merch) — Sign up at printful.com, create API key, add to Vercel env vars. Estimated time: 15 minutes
- [ ] **Apply for Google AdSense** — [adsense.google.com](https://adsense.google.com) → Apply → Need 10+ pages of content, privacy policy (exists), original content. Review takes 1-14 days. Estimated time: 30 minutes (application + adding ad code)
- [ ] **Add cookie consent banner** — Required for GDPR compliance before adding AdSense or analytics. Use a library like `react-cookie-consent` or build a simple banner. Estimated time: 1-2 hours
- [ ] **Set up analytics** — Sign up for Google Analytics 4 or Plausible, add tracking script to layout. Estimated time: 30 minutes
- [ ] **Create social media accounts** — Instagram, TikTok, X/Twitter for @YourAuraScore to build presence and capture traffic from shared results. Estimated time: 30 minutes
- [ ] **Generate legal pages properly** — Current privacy/terms are basic. Consider using [termly.io](https://termly.io) or a lawyer for proper legal coverage especially around digital product sales. Estimated time: 1-2 hours

---

## 11. PRIORITY ACTION LIST

### MUST DO BEFORE LAUNCH (blocking)

1. ~~**Implement actual file delivery for paid products**~~ — **DONE (wallpaper).** HD wallpaper (1080x1920 PNG) auto-downloads after Stripe purchase via `?download=` redirect. Animated MP4 and PDF report generation still need implementation.
2. **Set up Stripe with real keys** — Without Stripe keys, all purchases show "demo mode" alerts. Get test keys working, then switch to live before launch. — Estimated time: 30 minutes
3. **Set NEXT_PUBLIC_BASE_URL to production domain** — OG images, share links, and Stripe redirects all use this. Currently set to `http://localhost:3000`. — Estimated time: 5 minutes
4. ~~**Remove or fix NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**~~ — **DONE.** Removed unused env var from .env.local.
5. ~~**Fix the "chaotic" pattern's Math.random()**~~ — **DONE.** Replaced with deterministic sin-based pseudorandom seeded from time parameter.

### SHOULD DO BEFORE LAUNCH (quality)

1. ~~**Add Facebook and WhatsApp share buttons**~~ — **DONE.** Added with proper SVG icons and share URLs.
2. ~~**Add cookie consent banner**~~ — **DONE.** LocalStorage-based banner with Accept/Decline and privacy policy link.
3. **Add analytics** — You have zero visibility into traffic, conversion rates, or user behavior. At minimum add Plausible or GA4. — Estimated time: 30 minutes
4. ~~**Make result reveal delays faster**~~ — **DONE.** Reduced all delays by ~40%.
5. ~~**Add a "Save Aura" button**~~ — **DONE.** Preview-quality save (540x960) as free download; HD (1080x1920) is paid.
6. ~~**Add consistent footer to all pages**~~ — **DONE.** Footer added to About, Privacy, Terms pages.
7. **Fix icon sizing inconsistency** — SVG icons are 16px, 18px, 20px, 24px across different components. Standardize to 20px for body icons and 24px for buttons. — Estimated time: 30 minutes
8. ~~**Add `meta description` to Privacy and Terms pages**~~ — **DONE.**
9. ~~**Typo fix**~~ — **DONE.** Fixed "alstonanalystics" → "alstonanalytics" across all files.

### REVENUE OPTIMIZATION (IMPLEMENTED)

1. ~~**Reorder results page for conversion**~~ — **DONE.** Download upsell now appears right after Archetype + Color Meaning (emotional peak), before Rarity and Share sections.
2. ~~**Lead with bundle pricing**~~ — **DONE.** Bundle ($7.99, "BEST VALUE" badge) is now the first and most prominent item in the upsell section.
3. ~~**Prevent free save from cannibalizing paid wallpaper**~~ — **DONE.** Free save exports at 540x960 preview quality labeled "Save Preview". Paid HD wallpaper is full 1080x1920.
4. ~~**Move share below purchase**~~ — **DONE.** Share section now appears after upsell, preventing post-share bounce before conversion.
5. ~~**Post-purchase delivery flow**~~ — **DONE.** Stripe success → download route → auto-redirect with `?download=` param → success banner + auto-download.

### DO AFTER LAUNCH (optimization)

1. **Implement Printful merch integration** — Finish the commented-out API integration. Requires: rendering aura at print resolution, uploading to Printful API, creating products, handling checkout. — Estimated time: 6-10 hours
2. **Add AdSense** — Apply and implement ad units on results page. — Estimated time: 2-3 hours
3. ~~**Build "Archetype Explorer" page**~~ — **DONE.** /archetypes page with all 24 archetypes grouped by dimension, added to sitemap and homepage nav.
4. **Add blog** — SEO-driven content: "What Your Aura Colors Mean", "24 Aura Archetypes Explained", "Aura Quiz vs MBTI". — Estimated time: 2-3 hours per article
5. ~~**Implement bundle pricing**~~ — **DONE.** Bundle at $7.99 in checkout route and UI.
6. ~~**Add JSON-LD structured data**~~ — **DONE.** WebApplication schema in layout.tsx.
7. **Implement social proof counter** — "X auras discovered" counter (can use a simple API endpoint with a KV store or even Vercel KV). — Estimated time: 2-3 hours
8. **Performance audit** — Lazy-load Framer Motion and Stripe.js only where needed. Consider code splitting. — Estimated time: 2-3 hours
9. **Add email capture** — Optional email field on results page to build a mailing list ("Get personality insights monthly"). — Estimated time: 3-4 hours
10. **A/B test pricing** — Test $1.99 vs $2.99 for wallpaper, measure conversion impact. — Estimated time: 2-3 hours
11. **Implement animated MP4 generation** — Server-side rendering of aura animation frames into MP4 for the "Animated Aura" product. — Estimated time: 6-8 hours
12. **Implement PDF personality report** — Server-side PDF generation with archetype details, insights, color meanings for the "Full Personality Report" product. — Estimated time: 4-6 hours

---

## 12. ONE-LINE SITE SUMMARY

**"YourAuraScore is a visual personality quiz for Gen Z that generates unique generative-art aura visualizations, monetized via digital downloads ($1.99-$7.99 bundle) and print merchandise."**
