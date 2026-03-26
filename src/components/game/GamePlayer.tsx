'use client';

import { useState, useRef, useEffect } from 'react';
import { Game } from '@/types/game';

interface GamePlayerProps {
  game: Game;
}

function supportsNativeFullscreen() {
  return typeof document !== 'undefined' && !!document.documentElement.requestFullscreen;
}

export function GamePlayer({ game }: GamePlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 네이티브 전체화면 종료 시 상태 동기화
  useEffect(() => {
    function onFullscreenChange() {
      if (!document.fullscreenElement) setIsFullscreen(false);
    }
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  async function toggleFullscreen() {
    if (supportsNativeFullscreen()) {
      // ── 네이티브 Fullscreen API (Android / Desktop) ──
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } else {
      // ── CSS 폴백 (iOS Safari 등 미지원 환경) ──
      setIsFullscreen(prev => !prev);
    }
  }

  const containerStyle = !isFullscreen
    ? {
        width: `min(100%, calc(80svh * ${game.width} / ${game.height}))`,
        aspectRatio: `${game.width} / ${game.height}`,
      }
    : undefined;

  return (
    <div className="w-full flex flex-col items-center">
      {/* CSS 전체화면 오버레이 (iOS 폴백) */}
      {isFullscreen && !supportsNativeFullscreen() && (
        <div
          className="fixed inset-0 z-50 bg-black flex flex-col"
          style={{ touchAction: 'none' }}
        >
          <iframe
            src={game.embedUrl}
            title={game.title}
            className="flex-1 w-full border-0"
            sandbox="allow-scripts allow-same-origin allow-pointer-lock"
            allow="pointer-lock"
          />
          {/* 닫기 버튼 */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-3 right-3 z-10 bg-black/60 text-white text-sm px-3 py-1.5 rounded-lg border border-white/20 backdrop-blur-sm"
          >
            ⊠ 닫기
          </button>
        </div>
      )}

      {/* 일반 플레이어 */}
      <div
        ref={containerRef}
        className="relative w-full rounded-xl overflow-hidden border border-[var(--color-surface-border)] bg-black"
        style={containerStyle}
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface-card)]">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-slate-400 text-sm">로딩 중...</p>
            </div>
          </div>
        )}

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
      <div
        className="flex items-center justify-between mt-3 px-1 w-full"
        style={{ maxWidth: `min(100%, calc(80svh * ${game.width} / ${game.height}))` }}
      >
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
