import { games } from '@/data/games';
import type { Game, GameCategory } from '@/types/game';

export function getAllGames(): Game[] {
  return games;
}

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getGamesByCategory(category: GameCategory): Game[] {
  return games.filter((g) => g.category === category);
}

export function getFeaturedGames(): Game[] {
  return games.filter((g) => g.featured);
}

export function getAllCategories(): GameCategory[] {
  return [...new Set(games.map((g) => g.category))];
}

export function getRelatedGames(game: Game, limit = 4): Game[] {
  return games
    .filter((g) => g.id !== game.id && g.category === game.category)
    .slice(0, limit);
}

export function searchGames(query: string): Game[] {
  const q = query.toLowerCase();
  return games.filter(
    (g) =>
      g.title.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export function formatPlayCount(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}
