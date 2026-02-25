import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  try {
    const stripe = (await import('stripe')).default;
    const stripeClient = new stripe(stripeKey);

    const event = stripeClient.webhooks.constructEvent(body, sig, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const { hash, product } = session.metadata || {};
      // Download is handled via Stripe success URL; no server-side fulfillment needed
      if (process.env.NODE_ENV === 'development') {
        console.info(`Payment completed: ${product} for hash ${hash}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Webhook error:', error);
    }
    return NextResponse.json({ error: 'Webhook failed' }, { status: 400 });
  }
}
