---
description: Next.js + Canvas 게임 플랫폼 성능 감사 및 최적화
argument-hint: [영역: bundle|canvas|nextjs|all]
allowed-tools: Read, Bash, Edit, Glob
---

이 Next.js 게임 플랫폼의 성능 감사를 실행합니다. 감사 영역: $ARGUMENTS (기본값: all)

## Phase 1 — 번들 분석

1. `pnpm build 2>&1` 실행 후 결과 확인:
   - 전체 JS 번들 크기
   - First-load JS가 200kB를 초과하는 라우트
   - 코드 스플리팅 효과 (게임 컴포넌트가 별도 청크로 분리되는가)

2. `next.config.ts` 확인:
   - `output` 모드 (static vs server)
   - 이미지 최적화 설정
   - App Router에 유용한 `experimental` 플래그

3. 게임 페이지 라우트 (`src/app/games/*/page.tsx`) 스캔:
   - 모든 게임 컴포넌트가 `dynamic(..., { ssr: false })`로 로드되는가
   - 무거운 라이브러리가 최상위에서 import되지 않는가

## Phase 2 — Canvas 렌더링

`public/games/` 내 모든 게임 HTML 파일 스캔:

각 게임에 대해 확인:

1. **루프 내 객체 할당**: 매 프레임 새 배열/객체가 생성되는가?
   - 나쁜 예: `const visible = enemies.filter(...)` — 루프 내부
   - 좋은 예: 지속적인 배열을 재사용

2. **OffscreenCanvas 기회**: 정적 배경이 매 프레임 재그려지는가? 별도 캔버스에 사전 렌더링 제안

3. **Canvas 해상도**: `devicePixelRatio` 스케일링이 적용되었는가?
   ```js
   const dpr = window.devicePixelRatio || 1;
   canvas.width = logicalWidth * dpr;
   canvas.height = logicalHeight * dpr;
   ctx.scale(dpr, dpr);
   ```

## Phase 3 — Next.js App Router 최적화

1. `src/app/layout.tsx` 및 게임 페이지 확인:
   - `loading.tsx` 파일 누락 (스트리밍)
   - 게임 페이지 `metadata` export 누락
   - 불필요한 `'use client'` 지시어

2. `public/` 에셋 확인:
   - 썸네일이 `next/image`를 사용하지 않는 경우
   - WebP/AVIF 미변환 대용량 이미지

## Phase 4 — 우선순위별 권장사항

우선순위 목록:
- **P0** (메모리 누수 또는 크래시 유발)
- **P1** (LCP/FPS 측정 가능한 개선)
- **P2** (있으면 좋은 최적화)

P0 및 P1 항목은 직접 수정합니다.
