'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { GameCategory } from '@/types/game';
import { categoryConfig } from '@/components/ui/Badge';

interface CategoryFilterProps {
  categories: GameCategory[];
  active?: string;
}

const ALL_LABEL = '전체';

export function CategoryFilter({ categories, active }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleClick(cat?: GameCategory) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) {
      params.set('category', cat);
    } else {
      params.delete('category');
    }
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => handleClick()}
        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer ${
          !active
            ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white'
            : 'bg-[var(--color-surface-card)] border-[var(--color-surface-border)] text-slate-400 hover:text-white hover:border-[var(--color-accent-bright)]'
        }`}
      >
        {ALL_LABEL}
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleClick(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all cursor-pointer ${
            active === cat
              ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white'
              : 'bg-[var(--color-surface-card)] border-[var(--color-surface-border)] text-slate-400 hover:text-white hover:border-[var(--color-accent-bright)]'
          }`}
        >
          {categoryConfig[cat].label}
        </button>
      ))}
    </div>
  );
}
