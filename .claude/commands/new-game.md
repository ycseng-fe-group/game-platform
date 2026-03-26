---
description: 새로운 HTML5 Canvas 게임을 플랫폼에 스캐폴딩합니다
argument-hint: <게임-이름> [설명]
allowed-tools: Read, Write, Edit, Bash, Glob
---

이 Next.js 게임 플랫폼에 새로운 HTML5 Canvas 게임을 완전히 스캐폴딩합니다.

게임 이름 및 설명: $ARGUMENTS

## 단계

1. **기존 프로젝트 구조 파악** (컨벤션 확인):
   - `src/types/` — 공유 타입 정의 확인
   - `src/data/games.ts` — 게임 레지스트리/메타데이터 형식 확인
   - `public/games/` — 기존 게임 구조 참고
   - `src/app/` — 라우팅 구조 확인

2. **게임 파일 생성** (`public/games/<게임-이름>/index.html`):
   - Vanilla JS + HTML5 Canvas 기반 단일 HTML 파일로 작성
   - `requestAnimationFrame` 게임 루프 구현 (deltaTime 기반 이동)
   - 키보드 및/또는 마우스/터치 이벤트 처리
   - 점수, 게임 상태(playing / paused / game-over) 관리
   - 모바일 대응 (터치 이벤트 포함)

3. **게임 루프 골격**:
   ```js
   let lastTs = 0;
   function loop(ts) {
     const dt = Math.min((ts - lastTs) / 1000, 0.05);
     lastTs = ts;
     update(dt);
     render();
     requestAnimationFrame(loop);
   }
   requestAnimationFrame(loop);
   ```

4. **게임 메타데이터 추가** (`src/data/games.ts`):
   - id, slug, title, description, thumbnail, category, tags, embedUrl, width, height, addedAt
   - `addedAt`은 오늘 날짜(YYYY-MM-DD)로 설정

5. **썸네일 SVG 생성** (`public/thumbnails/<게임-이름>.svg`):
   - 400×225 크기, 게임 컨셉을 반영하는 시각적 요소 포함

## 품질 규칙

- Canvas context null 체크: `const ctx = canvas.getContext('2d'); if (!ctx) return;`
- 게임 루프는 반드시 deltaTime을 사용해 프레임레이트 독립적으로 동작
- 모바일: 캔버스 탭/터치 이벤트 지원
- iframe 임베드 기준 width/height를 `src/data/games.ts`에 정확히 기재

## 완료 후 출력

생성/수정된 파일 목록과 게임 루프 핵심 구현을 요약합니다.
