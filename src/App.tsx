/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Moon, 
  Search, 
  Settings, 
  ArrowLeft, 
  MoreVertical, 
  Home, 
  Compass, 
  Heart, 
  User, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Share2, 
  ListMusic, 
  Smartphone,
  CheckCircle2,
  Star,
  MinusCircle,
  Edit2,
  ChevronRight,
  LogOut,
  HelpCircle,
  RefreshCcw,
  Square,
  Music,
  CloudRain,
  Building2,
  Disc,
  Coffee
} from 'lucide-react';
import { cn } from './lib/utils';
import { Screen, Mood, Track } from './types';
import { MOODS, TRENDING, CURRENT_TRACK } from './constants';

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (screen === 'splash') {
      const timer = setTimeout(() => setScreen('onboarding1'), 2500);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const renderScreen = () => {
    switch (screen) {
      case 'splash': return <SplashScreen />;
      case 'onboarding1': return <Onboarding1 onNext={() => setScreen('onboarding2')} onExplore={() => setScreen('explore')} />;
      case 'onboarding2': return <Onboarding2 onNext={() => setScreen('onboarding3')} onBack={() => setScreen('onboarding1')} />;
      case 'onboarding3': return <Onboarding3 onNext={() => setScreen('explore')} />;
      case 'explore': return <ExploreScreen onMoodClick={() => setScreen('now-playing')} />;
      case 'vault': return <VaultScreen />;
      case 'now-playing': return <NowPlayingScreen isPlaying={isPlaying} onTogglePlay={() => setIsPlaying(!isPlaying)} onBack={() => setScreen('explore')} />;
      case 'timer': return <TimerScreen onBack={() => setScreen('now-playing')} />;
      case 'profile': return <ProfileScreen />;
      default: return <ExploreScreen onMoodClick={() => setScreen('now-playing')} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-surface overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="min-h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {/* Global Navigation - Only shown on main screens */}
      {['explore', 'vault', 'profile'].includes(screen) && (
        <nav className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4">
          <div className="w-full max-w-md rounded-full border border-white/10 bg-black/60 backdrop-blur-3xl shadow-[0_20px_50px_rgba(157,80,187,0.15)] flex justify-around items-center py-2 px-4">
            <NavButton 
              icon={<Home size={20} />} 
              label="Home" 
              active={screen === 'explore'} 
              onClick={() => setScreen('explore')} 
            />
            <NavButton 
              icon={<Compass size={20} />} 
              label="Explore" 
              active={false} 
              onClick={() => {}} 
            />
            <NavButton 
              icon={<Heart size={20} />} 
              label="Favorites" 
              active={screen === 'vault'} 
              onClick={() => setScreen('vault')} 
            />
            <NavButton 
              icon={<User size={20} />} 
              label="Profile" 
              active={screen === 'profile'} 
              onClick={() => setScreen('profile')} 
            />
          </div>
        </nav>
      )}
    </div>
  );
}

// --- Components ---

function NavButton({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-3 transition-all duration-300 transform active:scale-90",
        active ? "text-primary bg-white/5 rounded-full" : "text-gray-500 hover:text-white"
      )}
    >
      {icon}
      <span className="font-headline text-[10px] uppercase tracking-widest font-semibold mt-1">{label}</span>
    </button>
  );
}

function SplashScreen() {
  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-surface to-surface-container-low z-0" />
      <div className="absolute inset-0 opacity-5 pointer-events-none z-10" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/stardust.png)' }} />
      
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-20 flex flex-col items-center"
      >
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-125 opacity-60 animate-pulse" />
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary via-primary-container to-secondary shadow-[0_0_50px_rgba(224,142,254,0.4)] flex items-center justify-center">
            <Moon className="text-white fill-white" size={48} />
          </div>
        </div>
        
        <h1 className="mt-12 font-headline text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-on-surface to-on-surface-variant/60">
          Velvet Nights
        </h1>
        <p className="mt-4 font-body text-secondary tracking-[0.4em] uppercase text-xs font-semibold opacity-80">
          Curated Soul & After Hours Rhythm
        </p>
      </motion.div>
    </div>
  );
}

function Onboarding1({ onNext, onExplore }: { onNext: () => void, onExplore: () => void }) {
  return (
    <div className="h-screen relative flex flex-col items-center justify-center p-6">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=1200" 
          className="w-full h-full object-cover opacity-40 grayscale-[20%]"
          alt="Atmospheric background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-surface/20 to-surface" />
      </div>

      <div className="relative z-10 w-full max-w-2xl glass-panel p-8 md:p-16 rounded-3xl border border-white/5 shadow-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Find Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-tertiary to-primary-container text-glow">Rhythm.</span>
          </h1>
          <p className="text-on-surface-variant text-lg md:text-xl max-w-md leading-relaxed font-medium">
            Discover curated moods designed for your late-night sessions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button 
            onClick={onNext}
            className="w-full sm:w-auto px-12 py-5 bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold rounded-full premium-glow hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Next
          </button>
          <button 
            onClick={onExplore}
            className="w-full sm:w-auto px-12 py-5 glass-panel text-on-surface font-headline font-bold rounded-full hover:bg-white/10 transition-colors duration-300 border border-white/10"
          >
            Explore first
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="flex gap-2">
          <div className="h-1.5 w-12 rounded-full bg-primary shadow-[0_0_10px_rgba(224,142,254,0.5)]" />
          <div className="h-1.5 w-8 rounded-full bg-surface-container-high" />
          <div className="h-1.5 w-8 rounded-full bg-surface-container-high" />
        </div>
        <span className="font-headline text-xs font-semibold tracking-widest text-on-surface-variant uppercase">Step 1 / 3</span>
      </div>
    </div>
  );
}

function Onboarding2({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 pt-24 pb-32 max-w-4xl mx-auto w-full relative">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tight mb-6 leading-[1.1]">
          Mix & Match
        </h1>
        <p className="text-on-surface-variant text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
          Blend music with rain, city sounds, and vinyl crackle to create the perfect vibe.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <MixerCard icon={<CloudRain />} title="Summer Rain" value={72} labelMin="Mute" labelMax="Intense" color="tertiary" />
        <MixerCard icon={<Building2 />} title="City Pulse" value={45} labelMin="Mute" labelMax="Bustling" color="primary" />
        <MixerCard icon={<Disc />} title="Vinyl Hiss" value={30} labelMin="Clean" labelMax="Dusty" color="secondary" />
        <MixerCard icon={<Music />} title="Midnight Beat" value={85} labelMin="Ambient" labelMax="Deep" color="tertiary" />
      </div>

      <div className="mt-16 w-full h-48 rounded-2xl overflow-hidden relative group">
        <img 
          src="https://images.unsplash.com/photo-1514525253361-bee8718a340b?auto=format&fit=crop&q=80&w=1200" 
          className="w-full h-full object-cover grayscale opacity-40"
          alt="Mood"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        <div className="absolute bottom-4 left-6 flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-[10px] uppercase font-headline tracking-[0.2em] text-on-surface">Live Preview: Rainy Tokyo Jazz</span>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 w-full pb-8 pt-4 flex flex-col items-center z-50">
        <div className="w-[90%] max-w-md bg-black/80 backdrop-blur-3xl rounded-full border border-white/5 shadow-2xl flex items-center justify-between p-2">
          <button onClick={onBack} className="px-8 py-3 text-on-surface-variant font-headline text-sm hover:text-white transition-colors">
            Back
          </button>
          <button onClick={onNext} className="bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold px-12 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg">
            Next
          </button>
        </div>
      </footer>
    </div>
  );
}

function MixerCard({ icon, title, value, labelMin, labelMax, color }: { icon: React.ReactNode, title: string, value: number, labelMin: string, labelMax: string, color: string }) {
  return (
    <div className="glass-panel p-8 rounded-3xl flex flex-col gap-6 group hover:bg-white/5 transition-all duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", `bg-${color}/10 text-${color}`)}>
            {icon}
          </div>
          <span className="font-headline font-bold text-xl tracking-tight">{title}</span>
        </div>
        <span className="text-on-surface-variant font-headline text-sm uppercase tracking-widest">{value}%</span>
      </div>
      <input 
        type="range" 
        defaultValue={value}
        className="w-full h-1.5 bg-surface-container-high rounded-full appearance-none cursor-pointer accent-primary" 
      />
      <div className="flex justify-between text-[10px] text-on-surface-variant uppercase tracking-widest font-headline">
        <span>{labelMin}</span>
        <span>{labelMax}</span>
      </div>
    </div>
  );
}

function Onboarding3({ onNext }: { onNext: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center pt-24 pb-32 px-6 max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex gap-2">
          <div className="w-8 h-1.5 rounded-full bg-primary/20" />
          <div className="w-8 h-1.5 rounded-full bg-primary/20" />
          <div className="w-12 h-1.5 rounded-full bg-primary shadow-lg" />
        </div>
        <span className="font-headline text-xs text-on-surface-variant font-medium tracking-widest uppercase">Step 3/3</span>
      </div>

      <div className="text-center mb-12">
        <h2 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-on-surface leading-tight">
          Unlock the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">Full Night</span>
        </h2>
        <p className="font-body text-on-surface-variant text-lg max-w-xl mx-auto">
          Step into a world of curated soundscapes and intimate rhythms designed for your late-night journeys.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full">
        <PlanCard 
          title="Monthly Vibe" 
          price="$9.99" 
          period="/month" 
          badge="Flexible" 
          features={["Unlimited Moods", "Hi-Fi Audio Quality"]} 
          missing={["Offline Mode"]}
        />
        <PlanCard 
          title="Annual Muse" 
          price="$79.99" 
          period="/year" 
          badge="Best Value" 
          featured 
          features={["Unlimited Moods", "Hi-Fi Audio Quality", "Offline Mode"]} 
          savings="Save 33% annually"
        />
      </div>

      <div className="mt-16 w-full max-w-md flex flex-col gap-4">
        <button onClick={onNext} className="w-full py-5 rounded-full bg-gradient-to-br from-primary to-primary-container text-white font-bold text-lg tracking-tight hover:brightness-110 active:scale-95 transition-all shadow-lg">
          Start Free Trial
        </button>
        <button onClick={onNext} className="w-full py-4 rounded-full bg-surface-container/40 backdrop-blur-xl border border-white/5 text-on-surface-variant font-medium text-sm tracking-wide hover:bg-white/5 active:scale-95 transition-all">
          Continue with limited version
        </button>
        <p className="text-center text-[10px] text-on-surface-variant/60 uppercase tracking-[0.2em] mt-2">
          No commitment. Cancel anytime.
        </p>
      </div>
    </div>
  );
}

function PlanCard({ title, price, period, badge, features, missing = [], featured = false, savings }: { title: string, price: string, period: string, badge: string, features: string[], missing?: string[], featured?: boolean, savings?: string }) {
  return (
    <div className={cn(
      "glass-panel p-10 rounded-3xl flex flex-col border relative transition-all duration-500",
      featured ? "border-primary/20 premium-glow bg-gradient-to-br from-surface-container/80 to-primary/5 scale-105" : "border-white/5 group hover:border-primary/30"
    )}>
      <div className={cn(
        "absolute -top-4 right-8 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase",
        featured ? "bg-gradient-to-r from-primary to-primary-container text-white shadow-lg" : "bg-surface-container-high border border-white/10 text-on-surface-variant"
      )}>
        {badge}
      </div>
      <div className="mb-8">
        <h3 className="font-headline text-2xl font-bold mb-2">{title}</h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-on-surface">{price}</span>
          <span className="text-on-surface-variant text-sm">{period}</span>
        </div>
        {savings && <p className="text-tertiary text-sm font-bold mt-2">{savings}</p>}
      </div>
      <ul className="space-y-5 mb-12 flex-1">
        {features.map(f => (
          <li key={f} className="flex items-center gap-3">
            {featured ? <Star className="text-primary fill-primary" size={20} /> : <CheckCircle2 className="text-primary" size={20} />}
            <span className={cn("text-on-surface/90 font-medium", featured && "font-bold")}>{f}</span>
          </li>
        ))}
        {missing.map(m => (
          <li key={m} className="flex items-center gap-3 opacity-50">
            <MinusCircle className="text-on-surface-variant" size={20} />
            <span className="text-on-surface-variant font-medium">{m}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExploreScreen({ onMoodClick }: { onMoodClick: () => void }) {
  return (
    <div className="pb-32">
      <header className="w-full sticky top-0 px-6 py-4 flex items-center justify-between z-50 bg-surface/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button className="text-primary hover:opacity-80 transition-opacity">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-headline font-bold text-2xl tracking-tight text-primary">Velvet Nights</h1>
        </div>
        <button className="text-on-surface-variant hover:text-primary transition-colors">
          <Search size={24} />
        </button>
      </header>

      <main className="px-6 mt-8 max-w-screen-xl mx-auto">
        <section className="mb-12">
          <p className="text-tertiary font-medium tracking-[0.2em] mb-2 text-xs uppercase">Curated Discovery</p>
          <h2 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-none mb-6">
            Explore the <span className="text-primary-container">Vibe.</span>
          </h2>
        </section>

        <section className="flex gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {['Emotional', 'Chill', 'Focus', 'Late Night'].map((cat, i) => (
            <button 
              key={cat}
              className={cn(
                "px-8 py-3 rounded-full font-semibold whitespace-nowrap transition-all",
                i === 0 ? "bg-secondary-container text-white" : "bg-surface-container-high text-on-surface-variant hover:bg-surface-bright"
              )}
            >
              {cat}
            </button>
          ))}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Main Feature */}
          <div 
            onClick={onMoodClick}
            className="md:col-span-8 group relative aspect-[16/10] overflow-hidden rounded-3xl bg-surface-container-high border border-white/5 cursor-pointer"
          >
            <img src={MOODS[0].image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="bg-primary/20 backdrop-blur-md text-primary text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 inline-block">Featured Mood</span>
              <h3 className="font-headline text-4xl font-bold mb-2">{MOODS[0].title}</h3>
              <p className="text-on-surface-variant max-w-md font-body">{MOODS[0].description}</p>
            </div>
          </div>

          {/* Side Feature */}
          <div className="md:col-span-4 flex flex-col justify-end p-8 rounded-3xl bg-surface-container-high border border-white/5 relative overflow-hidden group cursor-pointer">
            <img src={MOODS[1].image} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700" alt="" />
            <div className="relative z-10">
              <Moon className="text-primary mb-4" size={32} />
              <h3 className="font-headline text-2xl font-bold mb-2">{MOODS[1].title}</h3>
              <p className="text-on-surface-variant text-sm">{MOODS[1].description}</p>
            </div>
          </div>

          {/* Square Feature */}
          <div className="md:col-span-6 rounded-3xl bg-surface-container-high border border-white/5 overflow-hidden flex flex-col group cursor-pointer">
            <div className="h-1/2 overflow-hidden">
              <img src={MOODS[2].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
            </div>
            <div className="p-8">
              <h3 className="font-headline text-2xl font-bold mb-1">{MOODS[2].title}</h3>
              <p className="text-on-surface-variant text-sm">{MOODS[2].description}</p>
            </div>
          </div>

          {/* List Feature */}
          <div className="md:col-span-6 rounded-3xl bg-surface-container-high border border-white/5 p-8 flex items-center gap-6 group hover:bg-surface-bright transition-colors cursor-pointer">
            <div className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl">
              <img src={MOODS[3].image} className="w-full h-full object-cover" alt="" />
            </div>
            <div>
              <h3 className="font-headline text-2xl font-bold mb-2">{MOODS[3].title}</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">{MOODS[3].description}</p>
              <div className="mt-4 flex items-center gap-2 text-tertiary text-xs font-bold uppercase tracking-widest">
                <span>{MOODS[3].tracks} Tracks</span>
                <span className="w-1 h-1 bg-outline-variant rounded-full" />
                <span>{MOODS[3].tags?.[0]}</span>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-headline text-2xl font-bold">Trending Soundscapes</h2>
            <button className="text-primary text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TRENDING.map(item => (
              <div key={item.id} className="space-y-3 group cursor-pointer">
                <div className="aspect-square rounded-2xl overflow-hidden bg-surface-container shadow-lg">
                  <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="" />
                </div>
                <div>
                  <p className="font-bold text-on-surface group-hover:text-primary transition-colors">{item.title}</p>
                  <p className="text-xs text-on-surface-variant">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function VaultScreen() {
  return (
    <div className="pb-32">
      <header className="w-full sticky top-0 px-6 py-4 flex items-center justify-between z-50 bg-surface/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <ArrowLeft className="text-primary cursor-pointer" size={24} />
          <h1 className="font-headline font-bold text-2xl tracking-tight text-primary">Velvet Nights</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-tertiary p-[2px]">
          <div className="w-full h-full rounded-full bg-surface overflow-hidden">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Profile" />
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 pt-8">
        <section className="mb-12">
          <p className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase mb-2">Curated Collection</p>
          <h2 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight max-w-2xl">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary text-glow">Midnight</span> Vault.
          </h2>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <VaultCard title="3AM Thoughts" tracks={12} genre="Deep Soul & Lo-Fi" icon={<Moon />} image={MOODS[0].image} />
          <VaultCard title="Neon Rain" tracks={24} genre="Synthwave & Chill" icon={<CloudRain />} image={MOODS[1].image} />
        </div>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-headline text-xl font-bold tracking-tight">Recent Archives</h4>
            <button className="text-primary text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            <ArchiveItem title="Silk & Vinyl" tracks={8} genre="Vintage R&B" image={TRENDING[2].image} />
            <ArchiveItem title="Velvet Sessions" tracks={15} genre="Jazz Infused" image={TRENDING[0].image} />
          </div>
        </section>
      </main>
    </div>
  );
}

function VaultCard({ title, tracks, genre, icon, image }: { title: string, tracks: number, genre: string, icon: React.ReactNode, image: string }) {
  return (
    <div className="glass-panel rounded-3xl p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden group cursor-pointer border border-white/5">
      <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        <img src={image} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="relative z-10 flex justify-between items-start">
        <div className="bg-surface-bright/50 p-4 rounded-2xl backdrop-blur-md text-tertiary">
          {icon}
        </div>
        <Heart className="text-primary fill-primary" size={24} />
      </div>
      <div className="relative z-10">
        <h3 className="font-headline text-3xl font-bold mb-2">{title}</h3>
        <p className="text-on-surface-variant font-medium text-sm">{tracks} tracks • {genre}</p>
      </div>
    </div>
  );
}

function ArchiveItem({ title, tracks, genre, image }: { title: string, tracks: number, genre: string, image: string }) {
  return (
    <div className="glass-panel p-4 rounded-2xl flex items-center gap-6 group hover:bg-white/5 transition-all duration-300 cursor-pointer">
      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
        <img src={image} className="w-full h-full object-cover" alt="" />
      </div>
      <div className="flex-grow">
        <h5 className="font-bold text-lg">{title}</h5>
        <p className="text-on-surface-variant text-xs">{tracks} tracks • {genre}</p>
      </div>
      <MoreVertical className="text-on-surface-variant" size={20} />
    </div>
  );
}

function NowPlayingScreen({ isPlaying, onTogglePlay, onBack }: { isPlaying: boolean, onTogglePlay: () => void, onBack: () => void }) {
  return (
    <div className="h-screen relative overflow-hidden flex flex-col">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-[#1a0b2e] to-[#0d1b2a]" />
        <img 
          src={CURRENT_TRACK.image} 
          className="w-full h-full object-cover opacity-40 blur-3xl scale-110"
          alt=""
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      <header className="relative z-50 flex items-center justify-between w-full max-w-screen-xl mx-auto px-6 py-8">
        <button onClick={onBack} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all">
          <ChevronRight className="rotate-90" />
        </button>
        <div className="text-center">
          <p className="font-headline text-[10px] uppercase tracking-[0.2em] text-on-surface-variant opacity-70">Playing from Mood</p>
          <h1 className="font-headline font-bold text-lg tracking-tight text-on-surface">Midnight Sessions</h1>
        </div>
        <button className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all">
          <MoreVertical />
        </button>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center flex-1 px-8">
        <div className="relative group mb-12">
          <div className="absolute -inset-4 bg-primary/20 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-2xl">
            <img src={CURRENT_TRACK.image} className="w-full h-full object-cover" alt="" />
          </div>
        </div>

        <div className="text-center mb-10 w-full max-w-lg">
          <h2 className="font-headline font-extrabold text-4xl md:text-5xl tracking-tight mb-2 text-on-surface">{CURRENT_TRACK.title}</h2>
          <p className="font-body text-lg md:text-xl text-primary-dim opacity-90 font-medium">{CURRENT_TRACK.artist}</p>
        </div>

        <div className="w-full max-w-md mb-12">
          <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[42%] bg-gradient-to-r from-primary to-tertiary premium-glow" />
          </div>
          <div className="flex justify-between mt-4 font-headline text-xs tracking-widest text-on-surface-variant font-semibold">
            <span>02:14</span>
            <span>{CURRENT_TRACK.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between w-full max-w-xs md:max-w-md">
          <button className="text-on-surface-variant hover:text-primary transition-colors"><Shuffle size={24} /></button>
          <button className="text-on-surface hover:text-primary transition-colors"><SkipBack size={32} /></button>
          <button 
            onClick={onTogglePlay}
            className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-container text-white premium-glow active:scale-90 transition-transform duration-300"
          >
            {isPlaying ? <Pause size={40} fill="white" /> : <Play size={40} fill="white" className="ml-2" />}
          </button>
          <button className="text-on-surface hover:text-primary transition-colors"><SkipForward size={32} /></button>
          <button className="text-secondary hover:text-secondary-fixed transition-colors"><Heart size={24} fill="currentColor" /></button>
        </div>
      </main>

      <footer className="relative z-10 pb-12 px-8 flex justify-center">
        <div className="flex items-center gap-12 bg-surface-container/40 backdrop-blur-xl px-8 py-4 rounded-full border border-white/5">
          <FooterAction icon={<Smartphone size={18} />} label="Devices" />
          <FooterAction icon={<ListMusic size={18} />} label="Queue" />
          <FooterAction icon={<Share2 size={18} />} label="Share" />
        </div>
      </footer>
    </div>
  );
}

function FooterAction({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex flex-col items-center gap-1 group">
      <span className="text-on-surface-variant group-hover:text-tertiary transition-colors">{icon}</span>
      <span className="font-headline text-[9px] uppercase tracking-tighter text-on-surface-variant">{label}</span>
    </button>
  );
}

function TimerScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-hidden">
      <header className="w-full sticky top-0 px-6 py-4 flex items-center justify-between z-50 bg-surface/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="text-primary hover:opacity-80 transition-opacity">
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-headline font-bold text-2xl tracking-tight text-primary">Sleep Timer</h1>
        </div>
        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-container">
          Velvet Nights
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 relative">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-tertiary/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-16 w-full max-w-md">
          <div className="relative flex items-center justify-center w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 rounded-full border-2 border-primary/10 animate-pulse scale-110" />
            <svg className="w-full h-full transform -rotate-90">
              <circle className="text-surface-container-high" cx="50%" cy="50%" r="48%" stroke="currentColor" strokeWidth="4" fill="transparent" />
              <circle className="text-primary transition-all duration-700" cx="50%" cy="50%" r="48%" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray="1000" strokeDashoffset="250" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-headline font-extrabold text-6xl md:text-8xl tracking-tight text-on-surface">45:00</span>
              <span className="font-headline text-on-surface-variant tracking-[0.2em] uppercase text-xs mt-2">remaining</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 w-full">
            {['15 min', '30 min', '60 min'].map((time, i) => (
              <button 
                key={time}
                className={cn(
                  "flex-1 min-w-[80px] backdrop-blur-xl py-4 rounded-2xl border transition-all active:scale-95 group",
                  i === 1 ? "bg-primary/10 border-primary/20" : "bg-surface-container/40 border-white/5 hover:bg-surface-container-high/60"
                )}
              >
                <span className={cn("block font-headline font-bold text-lg", i === 1 ? "text-primary" : "text-on-surface group-hover:text-primary")}>{time}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <button className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center border border-white/5 hover:bg-surface-bright transition-colors active:scale-90">
              <RefreshCcw className="text-on-surface-variant" />
            </button>
            <button className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg hover:scale-105 active:scale-90 transition-all">
              <Pause className="text-white fill-white" size={40} />
            </button>
            <button className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center border border-white/5 hover:bg-surface-bright transition-colors active:scale-90">
              <Square className="text-on-surface-variant fill-on-surface-variant" />
            </button>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-10 left-0 right-0 flex justify-center z-20">
        <div className="bg-surface-container/60 backdrop-blur-2xl border border-white/5 px-6 py-3 rounded-full flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
          <p className="font-headline text-[10px] font-semibold text-on-surface-variant tracking-wider uppercase">Fading playback in progress</p>
        </div>
      </footer>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="pb-32">
      <header className="w-full sticky top-0 px-6 py-4 flex items-center justify-between z-50 bg-surface/80 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <ArrowLeft className="text-primary cursor-pointer" />
          <h1 className="font-headline font-bold text-2xl tracking-tight text-primary">Velvet Nights</h1>
        </div>
        <button className="p-2 rounded-full bg-surface-container-high text-on-surface-variant">
          <MoreVertical size={20} />
        </button>
      </header>

      <main className="max-w-screen-md mx-auto px-6 mt-8">
        <section className="flex flex-col items-center text-center mb-10">
          <div className="relative mb-6">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-primary to-tertiary">
              <img 
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300" 
                className="w-full h-full rounded-full object-cover border-4 border-surface"
                alt="Profile"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5 border-4 border-surface text-white">
              <Edit2 size={14} />
            </div>
          </div>
          <h2 className="font-headline text-3xl font-extrabold tracking-tight mb-1">Julian Night</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full border border-white/5">
            <div className="w-2 h-2 rounded-full bg-on-surface-variant" />
            <span className="text-on-surface-variant text-sm font-medium">Free Plan</span>
          </div>
        </section>

        <section className="mb-12">
          <div className="glass-panel rounded-3xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative z-10 text-center md:text-left">
              <h3 className="font-headline text-xl font-bold mb-2">Experience the Rhythm</h3>
              <p className="text-on-surface-variant text-sm max-w-xs">Ad-free music, high-fidelity audio, and exclusive late-night curated sets.</p>
            </div>
            <button className="relative z-10 px-8 py-4 rounded-full bg-gradient-to-br from-primary to-primary-container text-white font-bold shadow-lg hover:opacity-90 transition-all active:scale-95 whitespace-nowrap">
              Upgrade to Premium
            </button>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 blur-[60px] rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-tertiary/10 blur-[60px] rounded-full" />
          </div>
        </section>

        <div className="space-y-4">
          <ProfileLink icon={<Settings />} title="Settings" subtitle="Privacy, account data, and preferences" color="primary" />
          <ProfileLink icon={<Smartphone />} title="Connected Devices" subtitle="Manage where you are logged in" color="tertiary" />
          <ProfileLink icon={<HelpCircle />} title="Help" subtitle="FAQ, contact support, and community" color="secondary" />
        </div>

        <div className="mt-12 text-center">
          <button className="text-secondary font-semibold flex items-center gap-2 mx-auto hover:opacity-80 transition-opacity">
            <LogOut size={20} />
            Log Out
          </button>
          <p className="text-on-surface-variant text-[10px] mt-8 tracking-widest uppercase">Version 2.4.0 (Midnight Muse)</p>
        </div>
      </main>
    </div>
  );
}

function ProfileLink({ icon, title, subtitle, color }: { icon: React.ReactNode, title: string, subtitle: string, color: string }) {
  return (
    <div className="glass-panel rounded-2xl p-6 flex items-center justify-between group cursor-pointer hover:bg-surface-container-high/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", `bg-${color}/10 text-${color}`)}>
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-on-surface">{title}</h4>
          <p className="text-xs text-on-surface-variant">{subtitle}</p>
        </div>
      </div>
      <ChevronRight className="text-on-surface-variant group-hover:translate-x-1 transition-transform" size={20} />
    </div>
  );
}
