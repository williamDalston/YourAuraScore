import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: Promise<{ token: string }>;
}

export async function GET(req: NextRequest, { params }: Props) {
  const { token: hash } = await params;
  const product = req.nextUrl.searchParams.get('product') || 'wallpaper';
  const sessionId = req.nextUrl.searchParams.get('session_id');

  // In production, validate the session_id with Stripe
  // For now, serve a simple download page
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Download Your Aura | YourAuraScore</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          body { background: #000; color: #fff; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
          .container { text-align: center; padding: 2rem; }
          h1 { font-size: 2rem; margin-bottom: 1rem; }
          p { color: rgba(255,255,255,0.6); margin-bottom: 2rem; }
          a { display: inline-block; background: linear-gradient(135deg, #7c3aed, #a855f7); color: white; padding: 1rem 2rem; border-radius: 9999px; text-decoration: none; font-weight: 600; }
          a:hover { opacity: 0.9; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Thank You!</h1>
          <p>Your ${product} purchase was successful. Your download will generate from your unique aura.</p>
          <a href="${baseUrl}/results/${hash}">Back to Your Aura</a>
          <p style="margin-top: 2rem; font-size: 0.8rem;">
            Note: In production, your high-resolution ${product} would be generated and downloaded automatically here.
          </p>
        </div>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}
