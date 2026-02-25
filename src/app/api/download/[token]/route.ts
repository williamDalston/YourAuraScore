import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: Promise<{ token: string }>;
}

const VALID_PRODUCTS = ['wallpaper', 'animated', 'report'];
const PRODUCT_LABELS: Record<string, string> = {
  wallpaper: 'HD Aura Wallpaper (4K)',
  animated: 'Animated Aura Live Wallpaper',
  report: 'Full Personality Report (PDF)',
};

function renderThankYouPage(hash: string, product: string, baseUrl: string) {
  const productLabel = PRODUCT_LABELS[product] || product;
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Download Your Aura | YourAuraScore</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          body { background: #000; color: #fff; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
          .container { text-align: center; padding: 2rem; max-width: 420px; }
          h1 { font-size: 2rem; margin-bottom: 1rem; }
          p { color: rgba(255,255,255,0.6); margin-bottom: 2rem; line-height: 1.6; }
          a { display: inline-block; background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; padding: 1rem 2rem; border-radius: 9999px; text-decoration: none; font-weight: 600; margin-top: 0.5rem; }
          a:hover { opacity: 0.9; }
          .note { font-size: 0.85rem; margin-top: 1.5rem; opacity: 0.7; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Thank You!</h1>
          <p>Your ${productLabel} purchase was successful. Visit your results page to view and save your unique aura.</p>
          <a href="${baseUrl}/results/${hash}">View Your Aura →</a>
          <p class="note">You can right-click the aura on the results page to save the image, or use the share options to download.</p>
        </div>
      </body>
    </html>
  `;
}

function renderErrorPage(message: string, baseUrl: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Error | YourAuraScore</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          body { background: #000; color: #fff; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
          .container { text-align: center; padding: 2rem; max-width: 420px; }
          h1 { font-size: 1.5rem; margin-bottom: 1rem; color: #f87171; }
          p { color: rgba(255,255,255,0.6); margin-bottom: 2rem; }
          a { display: inline-block; background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; padding: 1rem 2rem; border-radius: 9999px; text-decoration: none; font-weight: 600; }
          a:hover { opacity: 0.9; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Something went wrong</h1>
          <p>${message}</p>
          <a href="${baseUrl}">Return Home</a>
        </div>
      </body>
    </html>
  `;
}

export async function GET(req: NextRequest, { params }: Props) {
  const { token: hash } = await params;
  const product = req.nextUrl.searchParams.get('product') || 'wallpaper';
  const sessionId = req.nextUrl.searchParams.get('session_id');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  if (!hash || hash.length < 8) {
    return new NextResponse(
      renderErrorPage('Invalid download link. Please use the link from your purchase confirmation.', baseUrl),
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  if (!VALID_PRODUCTS.includes(product)) {
    return new NextResponse(
      renderErrorPage('Unknown product. Please contact support if you need help.', baseUrl),
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;

  // Dev mode: no Stripe configured — allow through with notice
  if (!stripeKey) {
    const html = renderThankYouPage(hash, product, baseUrl);
    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  // Production: validate Stripe session
  if (!sessionId) {
    return new NextResponse(
      renderErrorPage('Missing payment confirmation. Please complete checkout to access your download.', baseUrl),
      { status: 400, headers: { 'Content-Type': 'text/html' } }
    );
  }

  try {
    const stripe = (await import('stripe')).default;
    const stripeClient = new stripe(stripeKey);
    const session = await stripeClient.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return new NextResponse(
        renderErrorPage('Payment was not completed. Please complete your purchase to access your download.', baseUrl),
        { status: 403, headers: { 'Content-Type': 'text/html' } }
      );
    }

    const metaHash = session.metadata?.hash;
    const metaProduct = session.metadata?.product;

    if (metaHash !== hash || metaProduct !== product) {
      return new NextResponse(
        renderErrorPage('This download link does not match your purchase. Please use the link from your confirmation email.', baseUrl),
        { status: 403, headers: { 'Content-Type': 'text/html' } }
      );
    }

    return new NextResponse(renderThankYouPage(hash, product, baseUrl), {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch {
    return new NextResponse(
      renderErrorPage('We couldn\'t verify your purchase. Please contact info@alstonanalystics.com if you need assistance.', baseUrl),
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    );
  }
}
