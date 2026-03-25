'use client';

import { useState, useRef } from 'react';
import { Game } from '@/types/game';

interface GamePlayerProps {
  game: Game;
}

export function GamePlayer({ game }: GamePlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  async function toggleFullscreen() {
    if (!document.fullscreenElement) {
      await containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }

  const aspectRatio = (game.height / game.width) * 100;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Player container */}
      <div
        ref={containerRef}
        className="relative rounded-xl overflow-hidden border border-[var(--color-surface-border)] bg-black"
        style={{ paddingBottom: `${aspectRatio}%` }}
      >
        {/* Loading skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface-card)]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-slate-400 text-sm">로딩 중...</p>
            </div>
          </div>
        )}

        {/* Game iframe */}
        <iframe
          src={game.embedUrl}
          title={game.title}
          className="absolute inset-0 w-full h-full"
          sandbox="allow-scripts allow-same-origin allow-pointer-lock"
          onLoad={() => setIsLoaded(true)}
          allow="pointer-lock"
        />
      </div>

      {/* Controls bar */}
      <div className="flex items-center justify-between mt-3 px-1">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <span>🎮</span>
          <span>{game.tags.join(' · ')}</span>
        </div>
        <button
          onClick={toggleFullscreen}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors px-3 py-1.5 rounded-lg hover:bg-[var(--color-surface-card)] border border-transparent hover:border-[var(--color-surface-border)] cursor-pointer"
        >
          {isFullscreen ? '⊠ 창 모드' : '⛶ 전체화면'}
        </button>
      </div>
    </div>
  );
}
