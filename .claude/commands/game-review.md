---
description: Canvas 게임의 성능, 메모리 누수, 코드 품질을 리뷰합니다
argument-hint: <게임-이름 또는 파일-경로>
allowed-tools: Read, Glob, Bash
---

다음 Canvas 게임 코드를 철저히 리뷰합니다: $ARGUMENTS

## 리뷰 체크리스트

### 1. 메모리 누수 검사
- [ ] 게임 루프(`requestAnimationFrame`)가 종료 시 정상적으로 취소되는가
- [ ] 이벤트 리스너가 언마운트/종료 시 제거되는가
- [ ] `setInterval` / `setTimeout` 이 정리되는가
- [ ] 불필요한 전역 변수나 클로저가 없는가

### 2. Canvas 렌더링 성능
- [ ] 매 프레임 `ctx.clearRect()`가 호출되는가 (또는 의도적인 dirty-rect 사용인가)
- [ ] 무거운 연산이 렌더 함수 밖에서 처리되는가
- [ ] `ctx.save()` / `ctx.restore()` 호출 수가 균형 잡혀 있는가
- [ ] 이미지/리소스가 루프 밖에서 미리 로드·캐싱되는가
- [ ] HiDPI(`devicePixelRatio`) 처리가 되어 있는가

### 3. 게임 루프 품질
- [ ] deltaTime을 계산하고 물리/이동에 사용하는가 (`ts - lastTs`)
- [ ] 프레임레이트가 독립적으로 동작하는가 (dt 기반)
- [ ] 게임 상태 전이(시작 → 플레이 → 일시정지 → 게임오버)가 명확한가

### 4. 코드 정확성
- [ ] Canvas context null 체크: `if (!ctx) return;`
- [ ] 좌표계 오류 없음 (canvas 논리 크기 vs CSS 크기)
- [ ] 경계 충돌 판정이 정확한가 (off-by-one 없음)

### 5. UX / 모바일
- [ ] 터치 이벤트 지원 (또는 데스크톱 전용임이 명시됨)
- [ ] 모바일에서 조작 UI(버튼 등)가 제공되는가
- [ ] 탭을 벗어나거나 숨김 상태일 때 게임이 일시정지되는가 (`visibilitychange`)

### 6. Next.js 연동
- [ ] `src/data/games.ts` 메타데이터가 실제 파일 경로와 일치하는가
- [ ] iframe 임베드 width/height가 실제 게임 캔버스 크기와 맞는가
- [ ] `addedAt` 날짜가 올바르게 설정되어 있는가

## 출력 형식

실패한 항목마다:
1. 문제가 되는 정확한 코드 위치
2. 왜 문제인지 (메모리 누수 / 성능 / 정확성)
3. 수정된 코드 스니펫

마지막에 요약 점수: **X / 6 카테고리 통과** 로 표시합니다.
