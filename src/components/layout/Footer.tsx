export function Footer() {
  return (
    <footer className="border-t border-[var(--color-surface-border)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🕹️</span>
            <span className="font-bold text-white">GameHub</span>
            <span className="text-slate-500 text-sm ml-2">HTML5 미니게임 플랫폼</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2024 GameHub. All games are for entertainment purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
