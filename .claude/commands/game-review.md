---
description: Canvas 게임의 성능, 메모리 누수, 코드 품질을 리뷰하고 수정합니다
argument-hint: <게임-이름 또는 파일-경로>
allowed-tools: Read, Glob, Bash, Edit, Write
---

다음 Canvas 게임 코드를 철저히 리뷰하고, 발견된 문제를 직접 수정합니다: $ARGUMENTS

> **수정 원칙**: 리뷰 후 실패 항목이 있으면 각 항목마다 실제 코드를 수정합니다.
> 수정 전 항상 파일을 Read로 읽고, Edit 도구로 최소 범위만 변경합니다.

## 리뷰 체크리스트

### 1. 메모리 누수 검사 & 수정
- [ ] 게임 루프(`requestAnimationFrame`)가 종료 시 정상적으로 취소되는가
- [ ] 이벤트 리스너가 언마운트/종료 시 제거되는가
- [ ] `setInterval` / `setTimeout` 이 정리되는가
- [ ] 불필요한 전역 변수나 클로저가 없는가

**메모리 누수 수정 패턴**:

`requestAnimationFrame` 누수 → `cancelAnimationFrame`으로 정리:
```js
// 수정 전 (누수)
function gameLoop(ts) { ...; requestAnimationFrame(gameLoop); }
requestAnimationFrame(gameLoop);

// 수정 후
let rafId;
function gameLoop(ts) { ...; rafId = requestAnimationFrame(gameLoop); }
rafId = requestAnimationFrame(gameLoop);
// 종료 시
cancelAnimationFrame(rafId);
```

이벤트 리스너 누수 → named function + `removeEventListener`:
```js
// 수정 전 (누수 - 익명함수는 제거 불가)
window.addEventListener('keydown', (e) => { ... });

// 수정 후
function handleKeyDown(e) { ... }
window.addEventListener('keydown', handleKeyDown);
// 종료 시 (visibilitychange, beforeunload 또는 게임오버 시)
window.removeEventListener('keydown', handleKeyDown);
```

`setInterval` / `setTimeout` 누수 → id 저장 후 `clearInterval` / `clearTimeout`:
```js
// 수정 전 (누수)
setInterval(spawnEnemy, 2000);

// 수정 후
const spawnTimer = setInterval(spawnEnemy, 2000);
// 종료 시
clearInterval(spawnTimer);
```

`visibilitychange`로 탭 숨김 시 정리:
```js
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(rafId);
    clearInterval(spawnTimer);
  } else if (gameState === 'playing') {
    rafId = requestAnimationFrame(gameLoop);
    spawnTimer = setInterval(spawnEnemy, 2000);
  }
});
```

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
1. 문제가 되는 정확한 코드 위치 (파일명:줄번호)
2. 왜 문제인지 (메모리 누수 / 성능 / 정확성)
3. 수정된 코드 스니펫

## 수정 절차

리뷰 완료 후, 실패 항목이 있으면 다음 순서로 수정합니다:

1. **메모리 누수 우선 수정** (카테고리 1 실패 항목)
   - `requestAnimationFrame` ID를 변수에 저장하고 `cancelAnimationFrame` 호출 추가
   - 이벤트 리스너를 named function으로 변환하고 제거 코드 추가
   - `setInterval`/`setTimeout` ID를 저장하고 `clear*` 호출 추가
   - `visibilitychange` 핸들러 추가 (탭 전환 시 루프 중단)

2. **성능 문제 수정** (카테고리 2 실패 항목)
   - 리소스 로딩을 루프 밖으로 이동
   - `ctx.save()`/`ctx.restore()` 불균형 수정

3. **정확성 수정** (카테고리 4 실패 항목)
   - null 체크, 좌표계 오류 수정

수정 후 변경된 파일 목록과 함께 요약 점수: **X / 6 카테고리 통과** 로 표시합니다.
