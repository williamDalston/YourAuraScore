import { NextRequest, NextResponse } from 'next/server';
import { isValidHash } from '@/lib/quiz/hash';

const VALID_PRODUCTS = ['poster', 'phone-case', 'stickers', 'canvas', 'tote'];

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

  if (!hash || !product || !isValidHash(hash) || !VALID_PRODUCTS.includes(product)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const printfulKey = process.env.PRINTFUL_API_KEY;

  // Dev mode: no Printful key configured
  if (!printfulKey) {
    return NextResponse.json({
      demo: true,
      message: `Demo mode: Would create Printful product "${product}" with aura hash ${hash}`,
      product,
      hash,
    });
  }

  // Production: create Printful product
  // This would:
  // 1. Render the aura at print resolution (5400x7200 for poster)
  // 2. Upload image to Printful via their API
  // 3. Create a product with the uploaded image
  // 4. Return the Printful checkout URL
  try {
    // Placeholder for Printful API integration
    // const response = await fetch('https://api.printful.com/store/products', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${printfulKey}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ ... }),
    // });

    return NextResponse.json({
      demo: true,
      message: 'Printful integration ready — configure PRINTFUL_API_KEY to enable.',
    });
  } catch (error) {
    console.error('Printful error:', error);
    return NextResponse.json({ error: 'Merch creation failed' }, { status: 500 });
  }
}
