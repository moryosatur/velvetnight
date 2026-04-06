import { Mood, Track } from "./types";

export const MOODS: Mood[] = [
  {
    id: "1",
    title: "Midnight Tokyo",
    description: "Synthetic cityscapes and distant hums. The perfect companion for lonely neon drives.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800",
    category: "Chill",
    tags: ["Synthwave", "City"]
  },
  {
    id: "2",
    title: "Rainy Jazz",
    description: "Sophisticated noir rhythms for contemplative evenings.",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800",
    category: "Emotional",
    tags: ["Noir", "Jazz"]
  },
  {
    id: "3",
    title: "Lofi Sunset",
    description: "Hazy melodies and warm analog textures.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
    category: "Chill",
    tags: ["Lofi", "Analog"]
  },
  {
    id: "4",
    title: "Quiet Cabin",
    description: "Acoustic layers and the sound of crackling wood. Find your sanctuary.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    category: "Focus",
    tracks: 42,
    tags: ["Ambient", "Folk"]
  }
];

export const TRENDING: Mood[] = [
  {
    id: "t1",
    title: "Deep Echoes",
    description: "Post-Rock Ambient",
    image: "https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=400",
    category: "Focus"
  },
  {
    id: "t2",
    title: "Solo Walks",
    description: "Melancholy Beats",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=400",
    category: "Emotional"
  },
  {
    id: "t3",
    title: "Analog Dust",
    description: "Soulful Cuts",
    image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=400",
    category: "Chill"
  },
  {
    id: "t4",
    title: "Glass & Rain",
    description: "Piano Solos",
    image: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=400",
    category: "Focus"
  }
];

export const CURRENT_TRACK: Track = {
  id: "now",
  title: "3AM Thoughts",
  artist: "Lumina Muse",
  image: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=800",
  duration: "04:52"
};
