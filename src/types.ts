export interface Mood {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tracks?: number;
  tags?: string[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  image: string;
  duration: string;
}

export type Screen = 
  | 'splash' 
  | 'onboarding1' 
  | 'onboarding2' 
  | 'onboarding3' 
  | 'explore' 
  | 'vault' 
  | 'now-playing' 
  | 'timer' 
  | 'profile';
