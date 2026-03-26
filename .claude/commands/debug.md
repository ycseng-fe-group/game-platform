---
description: 버그를 진단하고 수정합니다 — 오류 추적, 근본 원인 분석, 수정 적용
argument-hint: <오류 메시지 또는 버그 설명>
allowed-tools: Read, Edit, Bash, Glob
---

이 Next.js 게임 플랫폼에서 다음 문제를 디버깅합니다: $ARGUMENTS

## 1단계 — 재현 및 증거 수집

1. 오류 메시지가 제공된 경우, 코드베이스에서 관련 코드를 검색합니다:
   - 오류 문자열 또는 함수명으로 검색
   - 발생 위치의 파일과 라인 확인

2. 구조화된 오류를 얻기 위해 빌드/타입체크 실행:
   ```bash
   pnpm exec tsc --noEmit 2>&1 | head -50
   pnpm lint 2>&1 | head -50
   ```

3. Canvas/게임 런타임 버그인 경우:
   - 해당 게임 파일 전체 읽기
   - 게임 루프, 이벤트 핸들러, 상태 전이 추적
   - 문제를 유발하는 정확한 조건 파악

## 2단계 — 근본 원인 분석

수정을 제안하기 전에 다음을 설명합니다:
- **무슨 일이 일어나고 있는가**: 정확한 동작
- **왜 발생하는가**: 원인이 되는 코드 경로 또는 상태
- **어디서 발생하는가**: 파일 경로와 라인 번호

**Canvas 게임 버그 공통 유형:**
- **Stale Closure**: 이벤트 리스너나 게임 루프 콜백이 오래된 값을 캡처
- **메모리 누수**: `requestAnimationFrame` 또는 이벤트 리스너가 정리되지 않음
- **좌표계 불일치**: canvas 논리 크기 vs CSS 크기 불일치
- **Null 체크 누락**: `canvas.getContext('2d')`가 null 반환
- **iframe 크기 불일치**: `src/data/games.ts`의 width/height가 실제 캔버스와 다름
- **타이밍 오류**: deltaTime 미사용으로 프레임레이트에 종속된 물리

**Next.js 관련 버그 유형:**
- **SSR 크래시**: Server Component에서 `window` / `document` 접근
- **하이드레이션 불일치**: 서버/클라이언트 렌더링 결과 차이
- **동적 import 누락**: Canvas 게임이 `ssr: false` 없이 로드됨

## 3단계 — 수정 적용

근본 원인을 해결하는 최소한의 수정을 구현합니다.

명확한 diff 형식으로 표시합니다 (수정 전 → 수정 후).

## 4단계 — 검증

```bash
pnpm exec tsc --noEmit && pnpm lint
```

오류가 해결되었는지 확인합니다. 런타임 버그였다면 수동 검증 방법을 안내합니다.
