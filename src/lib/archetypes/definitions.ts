export interface Archetype {
  id: string;
  name: string;
  tagline: string;
  description: string;
  colorMeaning: string;
  dominantDimension: string;
  modifier: string;
}

// 24 archetypes: 6 dominant dimensions x 4 Q12 modifiers (Serene/Bold/Mystic/Wild)
export const archetypes: Archetype[] = [
  // Energy dominant
  {
    id: 'energy-serene',
    name: 'The Ember Keeper',
    tagline: 'Quiet fire that never goes out',
    description: 'You carry an internal furnace — steady, warm, and unshakeable. While others burn bright and fast, your energy is a long-burning coal that sustains everyone around you.',
    colorMeaning: 'Your warm amber and soft gold tones reflect a soul that radiates consistent warmth. The gentle orange undertones speak to your ability to energize others without overwhelming them.',
    dominantDimension: 'energy',
    modifier: 'serene',
  },
  {
    id: 'energy-bold',
    name: 'The Firestarter',
    tagline: 'Born to ignite',
    description: 'You are pure kinetic energy — the one who walks into a room and shifts its gravity. Your presence is electric, your conviction contagious, and your drive unstoppable.',
    colorMeaning: 'Blazing reds and electric oranges dominate your aura, signaling raw power and unapologetic ambition. The sharp contrast in your palette mirrors your all-or-nothing intensity.',
    dominantDimension: 'energy',
    modifier: 'bold',
  },
  {
    id: 'energy-mystic',
    name: 'The Alchemist',
    tagline: 'Transforms everything they touch',
    description: 'Your energy doesn\'t just move — it transmutes. You see potential where others see dead ends, and you have an uncanny ability to turn chaos into creation.',
    colorMeaning: 'Deep crimson meets shimmering violet in your aura, revealing the rare ability to channel raw energy through intuition. Your colors pulse with transformation energy.',
    dominantDimension: 'energy',
    modifier: 'mystic',
  },
  {
    id: 'energy-wild',
    name: 'The Lightning Rod',
    tagline: 'Chaos is your element',
    description: 'You thrive in the storm. Where others seek shelter, you stand with arms wide open, absorbing the electricity of unpredictable moments and channeling it into raw power.',
    colorMeaning: 'Electric white-gold cuts through deep indigo in your aura — the visual signature of someone who attracts and redirects intense energy. Your palette crackles with voltage.',
    dominantDimension: 'energy',
    modifier: 'wild',
  },

  // Warmth dominant
  {
    id: 'warmth-serene',
    name: 'The Still Water',
    tagline: 'Depth that heals',
    description: 'Your warmth is the kind that wraps around people like a blanket on a cold night. You don\'t demand attention — you create safety, and people find themselves opening up in your presence.',
    colorMeaning: 'Soft rose and gentle peach tones flow through your aura like morning light. These nurturing hues reflect your gift for making others feel truly seen and accepted.',
    dominantDimension: 'warmth',
    modifier: 'serene',
  },
  {
    id: 'warmth-bold',
    name: 'The Sun King',
    tagline: 'Warmth that commands',
    description: 'You lead with heart but never from weakness. Your charisma is magnetic because it\'s genuine — people follow you not out of obligation but because your warmth makes them believe in something bigger.',
    colorMeaning: 'Rich gold and warm coral pulse through your aura, the signature of a natural leader whose power comes from empathy. Your bright tones inspire confidence and loyalty.',
    dominantDimension: 'warmth',
    modifier: 'bold',
  },
  {
    id: 'warmth-mystic',
    name: 'The Healer',
    tagline: 'Feels what others cannot say',
    description: 'You possess an almost supernatural empathy. You sense emotional undercurrents before they surface, and your presence alone can shift the energy of a space from tension to trust.',
    colorMeaning: 'Ethereal pink meets luminous amber in your aura, creating a halo effect that mirrors your healing presence. The iridescent quality of your colors signals emotional intelligence beyond the ordinary.',
    dominantDimension: 'warmth',
    modifier: 'mystic',
  },
  {
    id: 'warmth-wild',
    name: 'The Bonfire',
    tagline: 'Love without limits',
    description: 'Your love is not quiet — it\'s a roaring, dancing, untameable force. You love hard, laugh loud, and make every gathering feel like a celebration. Your warmth is contagious chaos.',
    colorMeaning: 'Fiery tangerine and passionate magenta swirl through your aura with unstoppable momentum. These vivid warm tones reveal a heart that refuses to love quietly.',
    dominantDimension: 'warmth',
    modifier: 'wild',
  },

  // Complexity dominant
  {
    id: 'complexity-serene',
    name: 'The Architect',
    tagline: 'Finds order in everything',
    description: 'Your mind is a cathedral of organized thought. You see patterns invisible to others and build frameworks that turn chaos into clarity. Your serenity comes from understanding.',
    colorMeaning: 'Structured layers of teal and silver compose your aura, reflecting a mind that finds beauty in systems. The clean gradients reveal methodical thinking with artistic sensibility.',
    dominantDimension: 'complexity',
    modifier: 'serene',
  },
  {
    id: 'complexity-bold',
    name: 'The Mastermind',
    tagline: 'Three steps ahead, always',
    description: 'You don\'t just think — you strategize. Your mind runs simulations while others are still processing the question. You see the full chessboard and move with decisive intelligence.',
    colorMeaning: 'Deep indigo and electric teal create sharp, angular patterns in your aura. These cerebral colors signal a mind that operates on multiple levels simultaneously.',
    dominantDimension: 'complexity',
    modifier: 'bold',
  },
  {
    id: 'complexity-mystic',
    name: 'The Oracle',
    tagline: 'Sees the unseen threads',
    description: 'Your mind weaves connections between things that seem unrelated. You perceive hidden patterns in the universe and often know things before you can explain how you know them.',
    colorMeaning: 'Shifting iridescent purple and cosmic blue create an ever-changing tapestry in your aura. The complexity of your palette mirrors the multidimensional way you perceive reality.',
    dominantDimension: 'complexity',
    modifier: 'mystic',
  },
  {
    id: 'complexity-wild',
    name: 'The Tornado Mind',
    tagline: 'Beautiful chaos incarnate',
    description: 'Your thoughts don\'t follow straight lines — they spiral, collide, and birth new ideas at dizzying speed. What looks like chaos to others is your creative process in action.',
    colorMeaning: 'Fractured rainbow patterns clash and merge in your aura, with no two moments looking the same. Your kaleidoscopic palette captures the relentless innovation of your mind.',
    dominantDimension: 'complexity',
    modifier: 'wild',
  },

  // Luminance dominant
  {
    id: 'luminance-serene',
    name: 'The Moonbeam',
    tagline: 'Soft light that guides',
    description: 'You glow rather than blaze. Your light is the kind that appears at exactly the right moment — a gentle illumination that helps others find their way without blinding them.',
    colorMeaning: 'Pearl white and soft lavender create an ethereal luminosity in your aura. Your light, diffused tones reflect a soul that illuminates gently, like moonlight on still water.',
    dominantDimension: 'luminance',
    modifier: 'serene',
  },
  {
    id: 'luminance-bold',
    name: 'The Supernova',
    tagline: 'Impossible to look away',
    description: 'Your brightness is undeniable. You shine with a confidence that illuminates entire rooms, and your clarity of purpose makes you a beacon that others naturally orient toward.',
    colorMeaning: 'Brilliant white-gold and blazing yellow radiate from your aura\'s core. These ultra-bright tones signal someone whose inner light operates at maximum wattage.',
    dominantDimension: 'luminance',
    modifier: 'bold',
  },
  {
    id: 'luminance-mystic',
    name: 'The Aurora',
    tagline: 'Light that dances with meaning',
    description: 'Your luminance isn\'t static — it shifts, plays, and tells stories. Like the northern lights, your presence creates moments of awe that people remember long after.',
    colorMeaning: 'Shimmering greens and celestial purples dance through your aura like the aurora borealis. These ethereal, shifting colors reveal a soul connected to something vast and mysterious.',
    dominantDimension: 'luminance',
    modifier: 'mystic',
  },
  {
    id: 'luminance-wild',
    name: 'The Prism',
    tagline: 'Shatters light into infinite color',
    description: 'You take in the world\'s energy and refract it into a spectrum others never imagined. Your wild luminance doesn\'t just light up a room — it reveals hidden colors in everything.',
    colorMeaning: 'Full-spectrum light explodes through your aura in prismatic bursts. Every color of visible light appears in your palette, reflecting your ability to find beauty in every wavelength.',
    dominantDimension: 'luminance',
    modifier: 'wild',
  },

  // Rhythm dominant
  {
    id: 'rhythm-serene',
    name: 'The Tide',
    tagline: 'Moves with the moon',
    description: 'Your rhythm is ancient and unhurried. Like the ocean\'s tides, you advance and retreat in perfect time, governed by cycles deeper than conscious thought. Your consistency is your power.',
    colorMeaning: 'Deep ocean blue and seafoam green ebb and flow through your aura in gentle waves. These tidal colors reflect a soul attuned to natural rhythms and cosmic timing.',
    dominantDimension: 'rhythm',
    modifier: 'serene',
  },
  {
    id: 'rhythm-bold',
    name: 'The Pulse',
    tagline: 'Sets the beat for everyone',
    description: 'You are the heartbeat of every group you join. Your rhythm is infectious — when you move, others move with you. You don\'t follow the tempo; you create it.',
    colorMeaning: 'Pulsing crimson and electric magenta beat through your aura with audible intensity. Your dynamic color rhythm mirrors the way you set the pace for everything around you.',
    dominantDimension: 'rhythm',
    modifier: 'bold',
  },
  {
    id: 'rhythm-mystic',
    name: 'The Dreamweaver',
    tagline: 'Hears the music between the notes',
    description: 'You perceive rhythms that others miss entirely — the unspoken cadence of a conversation, the hidden tempo of a season changing. Your intuition is perfectly synced to the universe\'s frequency.',
    colorMeaning: 'Dreamy indigo and astral silver create a hypnotic oscillation in your aura. These mesmerizing tones pulse at frequencies that seem to communicate with something beyond the visible.',
    dominantDimension: 'rhythm',
    modifier: 'mystic',
  },
  {
    id: 'rhythm-wild',
    name: 'The Storm Drummer',
    tagline: 'Chaos has a beat, and you found it',
    description: 'Your rhythm breaks rules and creates new ones. You syncopate where others expect straight beats, and your unpredictable tempo keeps the world dancing on its toes.',
    colorMeaning: 'Thundercloud purple and lightning yellow create erratic, powerful bursts in your aura. Your asymmetric color patterns reveal a rhythm that defies convention while creating its own wild harmony.',
    dominantDimension: 'rhythm',
    modifier: 'wild',
  },

  // Depth dominant
  {
    id: 'depth-serene',
    name: 'The Deep Well',
    tagline: 'Still surface, infinite depth',
    description: 'You are the person everyone underestimates at first glance. Beneath your calm exterior lies a universe of thought, feeling, and wisdom that reveals itself only to those who look closely.',
    colorMeaning: 'Midnight blue and abyssal purple create layers of incredible depth in your aura. Each layer reveals more complexity, just like your personality — the deeper you go, the more there is to discover.',
    dominantDimension: 'depth',
    modifier: 'serene',
  },
  {
    id: 'depth-bold',
    name: 'The Anchor',
    tagline: 'Holds the world steady',
    description: 'Your depth gives you an unshakeable foundation. When storms come — and they always do — you are the one who holds fast. Your conviction runs so deep it becomes gravitational.',
    colorMeaning: 'Iron grey and deep burgundy create a dense, weighty presence in your aura. These grounded, substantial colors reflect the immovable conviction at your core.',
    dominantDimension: 'depth',
    modifier: 'bold',
  },
  {
    id: 'depth-mystic',
    name: 'The Abyss Walker',
    tagline: 'Explores where light doesn\'t reach',
    description: 'You are drawn to the depths that others fear. The unknown doesn\'t frighten you — it calls to you. You find treasures in the darkness that no one else dares to seek.',
    colorMeaning: 'Void black and bioluminescent cyan create an otherworldly depth in your aura. Like deep-sea creatures that generate their own light, your colors emerge from places most never explore.',
    dominantDimension: 'depth',
    modifier: 'mystic',
  },
  {
    id: 'depth-wild',
    name: 'The Storm Caller',
    tagline: 'Summons intensity from the deep',
    description: 'Your depth isn\'t quiet — it\'s volcanic. You feel everything at maximum intensity, and when those deep emotions surface, they reshape the landscape. You are a force of emotional nature.',
    colorMeaning: 'Volcanic red erupts through deep obsidian in your aura, like magma breaking through the earth\'s crust. Your colors reveal the tremendous pressure and beauty of emotions felt at full depth.',
    dominantDimension: 'depth',
    modifier: 'wild',
  },
];

export function getArchetypeById(id: string): Archetype | undefined {
  return archetypes.find(a => a.id === id);
}
