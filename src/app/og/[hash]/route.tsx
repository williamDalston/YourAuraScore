import { ImageResponse } from 'next/og';
import { decodeAnswers, isValidHash } from '@/lib/quiz/hash';
import { calculateDimensions } from '@/lib/quiz/scoring';
import { generatePalette, hslToString } from '@/lib/aura/palette';
import { matchArchetype } from '@/lib/archetypes/matcher';

export const runtime = 'edge';

interface Props {
  params: Promise<{ hash: string }>;
}

function fallbackOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 'bold', color: 'white', marginBottom: 16 }}>
          YourAuraScore
        </div>
        <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.7)' }}>
          Take the quiz → youraura.score
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

export async function GET(_req: Request, { params }: Props) {
  const { hash } = await params;

  if (!isValidHash(hash)) {
    return fallbackOgImage();
  }

  let answers: Record<number, number>;
  try {
    answers = decodeAnswers(hash);
  } catch {
    return fallbackOgImage();
  }
  const dimensions = calculateDimensions(answers);
  const palette = generatePalette(dimensions);
  const archetype = matchArchetype(dimensions, answers[12] ?? 0);

  const primary = hslToString(palette.primary);
  const secondary = hslToString(palette.secondary);
  const accent = hslToString(palette.accent);
  const bg = hslToString(palette.background);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: bg,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Aura gradient blobs */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '20%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${primary}, transparent)`,
            opacity: 0.6,
            filter: 'blur(60px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '15%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${secondary}, transparent)`,
            opacity: 0.5,
            filter: 'blur(50px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '40%',
            right: '30%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accent}, transparent)`,
            opacity: 0.4,
            filter: 'blur(40px)',
          }}
        />

        {/* Text overlay */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            My Aura Is
          </div>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            }}
          >
            {archetype.name}
          </div>
          <div
            style={{
              fontSize: '20px',
              color: 'rgba(255,255,255,0.6)',
              marginTop: '12px',
            }}
          >
            youraura.score
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
