import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllGames, getGameBySlug, getRelatedGames, formatPlayCount } from '@/lib/games';
import { GamePlayer } from '@/components/game/GamePlayer';
import { GameGrid } from '@/components/game/GameGrid';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

interface GamePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGames().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return {};
  return {
    title: game.title,
    description: game.description,
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const related = getRelatedGames(game);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
        <Link href="/" className="hover:text-white transition-colors">홈</Link>
        <span>›</span>
        <Link href={`/?category=${game.category}`} className="hover:text-white transition-colors">
          <Badge category={game.category} />
        </Link>
        <span>›</span>
        <span className="text-slate-300">{game.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Game player - takes up 2/3 */}
        <div className="lg:col-span-2">
          <GamePlayer game={game} />
        </div>

        {/* Game info sidebar */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge category={game.category} />
              {game.featured && (
                <span className="bg-[var(--color-accent-muted)] text-[var(--color-accent-bright)] text-xs font-bold px-2 py-0.5 rounded">
                  인기
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">{game.title}</h1>
            <p className="text-slate-400 text-sm leading-relaxed">{game.description}</p>
          </div>

          {/* Stats */}
          <div className="border border-[var(--color-surface-border)] rounded-xl p-4 bg-[var(--color-surface-card)] space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">플레이 횟수</span>
              <span className="text-white font-medium">{formatPlayCount(game.playCount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">카테고리</span>
              <Badge category={game.category} />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">태그</span>
              <span className="text-slate-300">{game.tags.join(', ')}</span>
            </div>
          </div>

          {/* How to play hint */}
          <div className="border border-[var(--color-surface-border)] rounded-xl p-4 bg-[var(--color-surface-card)]">
            <h3 className="text-sm font-semibold text-white mb-2">🎮 조작 방법</h3>
            <p className="text-slate-400 text-xs">
              게임 화면을 클릭하면 시작됩니다. 키보드 또는 마우스로 조작하세요.
            </p>
          </div>
        </div>
      </div>

      {/* Related games */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <span className="text-[var(--color-accent-bright)]">🎯</span>
            비슷한 게임
          </h2>
          <GameGrid games={related} />
        </section>
      )}
    </div>
  );
}
