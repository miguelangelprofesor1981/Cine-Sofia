
export interface Activity {
  scene: string;
  description: string;
  educationalGoal: string;
}

export interface PhilosophicalAnalysis {
  movieTitle: string;
  synopsis: string;
  posterUrl?: string;
  trailerUrl?: string;
  philosophicalThemes: string[];
  relatedAuthors: string[];
  analysis: string; // Detailed connection
  activities: Activity[];
}

export interface GeneratedMedia {
  type: 'image' | 'video';
  url: string;
  prompt: string;
}

export enum AppState {
  IDLE,
  ANALYZING,
  SUCCESS,
  ERROR
}