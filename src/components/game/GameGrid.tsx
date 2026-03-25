import { Game } from '@/types/game';
import { GameCard } from '@/components/game/GameCard';

interface GameGridProps {
  games: Game[];
  emptyMessage?: string;
}

export function GameGrid({ games, emptyMessage = '게임이 없습니다.' }: GameGridProps) {
  if (games.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        <p className="text-4xl mb-4">🎮</p>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
