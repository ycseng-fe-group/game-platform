import { Suspense } from 'react';
import { getAllGames, getGamesByCategory, getAllCategories, getFeaturedGames } from '@/lib/games';
import { GameGrid } from '@/components/game/GameGrid';
import { CategoryFilter } from '@/components/ui/CategoryFilter';
import { GameCard } from '@/components/game/GameCard';
import type { GameCategory } from '@/types/game';

interface HomePageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { category } = await searchParams;
  const categories = getAllCategories();
  const games = category
    ? getGamesByCategory(category as GameCategory)
    : getAllGames();
  const featured = getFeaturedGames();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero - show only when no category filter */}
      {!category && (
        <section className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
              🕹️ <span className="text-[var(--color-accent-bright)]">GameHub</span>
            </h1>
            <p className="text-slate-400 text-lg">
              설치 없이 바로 플레이하는 HTML5 미니게임 플랫폼
            </p>
          </div>

          {/* Featured games */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-[var(--color-accent-bright)]">⭐</span> 인기 게임
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featured.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All games with filter */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <span className="text-[var(--color-accent-bright)]">🎮</span>
          {category ? `${category} 게임` : '모든 게임'}
          <span className="text-slate-500 font-normal text-sm">({games.length})</span>
        </h2>
        <Suspense>
          <CategoryFilter categories={categories} active={category} />
        </Suspense>
        <GameGrid games={games} />
      </section>
    </div>
  );
}
