export interface OpportunityCardData {
  id: number;
  title: string;
  desc: string;
  target: number;
  suffix: string;
  label: string;
  color: string;
}

export interface SplashPhaseConfig {
  id: string;
  duration: number;
  delay: number;
  hold: number;
}
