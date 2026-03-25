import { GameCategory } from '@/types/game';

const categoryConfig: Record<GameCategory, { label: string; color: string }> = {
  arcade: { label: '아케이드', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  puzzle: { label: '퍼즐', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  action: { label: '액션', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
  strategy: { label: '전략', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
  casual: { label: '캐주얼', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
};

interface BadgeProps {
  category: GameCategory;
  className?: string;
}

export function Badge({ category, className = '' }: BadgeProps) {
  const config = categoryConfig[category];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${config.color} ${className}`}
    >
      {config.label}
    </span>
  );
}

export { categoryConfig };
