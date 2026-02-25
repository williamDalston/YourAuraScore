import { ImageResponse } from 'next/og';
import { decodeAnswers } from '@/lib/quiz/hash';
import { calculateDimensions } from '@/lib/quiz/scoring';
import { generatePalette, hslToString } from '@/lib/aura/palette';
import { matchArchetype } from '@/lib/archetypes/matcher';

export const runtime = 'edge';

interface Props {
  params: Promise<{ hash: string }>;
}

export async function GET(_req: Request, { params }: Props) {
  const { hash } = await params;

  const answers = decodeAnswers(hash);
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
