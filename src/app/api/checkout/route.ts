import { NextRequest, NextResponse } from 'next/server';
import { isValidHash } from '@/lib/quiz/hash';

const PRICES: Record<string, { amount: number; name: string }> = {
  wallpaper: { amount: 199, name: 'HD Aura Wallpaper (4K)' },
  animated: { amount: 299, name: 'Animated Aura Live Wallpaper' },
  report: { amount: 499, name: 'Full Personality Report (PDF)' },
  bundle: { amount: 799, name: 'Complete Aura Pack (Wallpaper + Animated + Report)' },
};

export async function POST(req: NextRequest) {
  let hash: string;
  let product: string;
  try {
    const body = await req.json();
    hash = body?.hash;
    product = body?.product;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!hash || !product || !PRICES[product] || !isValidHash(hash)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;

  // Dev mode: no Stripe key configured
  if (!stripeKey) {
    return NextResponse.json({
      demo: true,
      message: `Demo mode: Would create Stripe Checkout for ${PRICES[product].name} at $${(PRICES[product].amount / 100).toFixed(2)}`,
      hash,
      product,
    });
  }

  // Production: create Stripe Checkout session
  try {
    const stripe = (await import('stripe')).default;
    const stripeClient = new stripe(stripeKey);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: PRICES[product].name,
              description: `Your unique aura visualization — ${product}`,
            },
            unit_amount: PRICES[product].amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/api/download/${hash}?product=${product}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/results/${hash}`,
      metadata: { hash, product },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Payment setup failed. Please try again or contact support.' },
      { status: 500 }
    );
  }
}
