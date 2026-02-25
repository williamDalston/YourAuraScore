import type { Metadata } from 'next';
import ResultsClient from './ResultsClient';

interface Props {
  params: Promise<{ hash: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hash } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://youraura.score';

  return {
    title: 'Your Aura | YourAuraScore',
    description: 'Discover your unique aura visualization based on your personality.',
    openGraph: {
      title: 'I just discovered my aura! ✨',
      description: 'Take the quiz and discover your unique aura visualization.',
      images: [`${baseUrl}/og/${hash}`],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'I just discovered my aura! ✨',
      description: 'Take the quiz and discover your unique aura visualization.',
      images: [`${baseUrl}/og/${hash}`],
    },
  };
}

export default async function ResultsPage({ params }: Props) {
  const { hash } = await params;
  return <ResultsClient hash={hash} />;
}
