export type GameCategory =
  | 'arcade'
  | 'puzzle'
  | 'action'
  | 'strategy'
  | 'casual';

export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  category: GameCategory;
  tags: string[];
  playCount: number;
  featured: boolean;
  embedUrl: string;
  width: number;
  height: number;
  addedAt: string;
}
