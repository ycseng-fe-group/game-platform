import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/types/game';
import { Badge } from '@/components/ui/Badge';
import { formatPlayCount } from '@/lib/games';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.slug}`} className="group block">
      <div className="game-card-glow rounded-xl overflow-hidden border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] transition-all duration-300 hover:border-[var(--color-accent)] hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-[var(--color-surface)]">
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {game.featured && (
            <div className="absolute top-2 left-2">
              <span className="bg-[var(--color-accent)] text-white text-xs font-bold px-2 py-0.5 rounded">
                인기
              </span>
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-[var(--color-accent)] text-white font-bold px-6 py-2.5 rounded-full text-sm">
              ▶ 플레이
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-white text-sm leading-tight group-hover:text-[var(--color-accent-bright)] transition-colors">
              {game.title}
            </h3>
            <Badge category={game.category} />
          </div>
          <p className="text-slate-400 text-xs line-clamp-2 mb-3">
            {game.description}
          </p>
          <div className="flex items-center text-xs text-slate-500">
            <span>🎮 {formatPlayCount(game.playCount)} 플레이</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
