import Link from 'next/link';
import { getAllCategories } from '@/lib/games';
import { categoryConfig } from '@/components/ui/Badge';

export function Header() {
  const categories = getAllCategories();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-surface-border)] bg-[var(--color-surface)]/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🕹️</span>
            <span className="font-bold text-lg text-white group-hover:text-[var(--color-accent-bright)] transition-colors">
              GameHub
            </span>
          </Link>

          {/* Category nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-1.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[var(--color-surface-hover)] transition-all"
            >
              전체
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/?category=${cat}`}
                className="px-3 py-1.5 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-[var(--color-surface-hover)] transition-all"
              >
                {categoryConfig[cat].label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu hint */}
          <div className="md:hidden text-slate-400 text-sm">
            🕹️ GameHub
          </div>
        </div>
      </div>
    </header>
  );
}
