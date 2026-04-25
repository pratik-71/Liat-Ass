export interface OpportunityCardData {
  id: number;
  title: string;
  desc: string;
  target?: number;
  suffix?: string;
  label?: string;
  color?: string;
}

export type AppScreen = 'intro' | 'dashboard' | 'retail' | 'attractions' | 'luxury';

export interface ModuleProps {
  onBack: () => void;
  onNavigate: (screen: AppScreen) => void;
}

export interface SplashPhaseConfig {
  id: string;
  duration: number;
  delay: number;
  hold: number;
}
