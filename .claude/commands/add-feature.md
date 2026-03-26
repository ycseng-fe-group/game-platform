---
description: 게임 플랫폼에 새로운 기능을 구현합니다 (리더보드, UI, 필터 등)
argument-hint: <기능 설명>
allowed-tools: Read, Write, Edit, Bash, Glob
---

이 Next.js 게임 플랫폼에 다음 기능을 구현합니다: $ARGUMENTS

## 프로세스

### 1단계 — 코드베이스 파악
코드를 작성하기 전에:
- 관련 기존 페이지와 컴포넌트 읽기
- `src/types/` — 데이터 구조 파악
- `src/lib/` — 기존 유틸 함수 확인
- `next.config.ts` — 관련 설정 확인
- `src/data/games.ts` — 게임 레지스트리 구조 확인

### 2단계 — 설계
간략한 계획 작성:
- 생성 또는 수정할 파일 목록
- 필요한 새 타입
- 새 의존성 필요 여부 (먼저 설치 여부 확인)
- Server Component / Client Component / 양쪽 모두 여부
- Next.js App Router 컨벤션 (layouts, loading, error boundaries)

**계획 확인 후 구현을 진행합니다.**

### 3단계 — 구현
다음 규칙을 준수합니다:

**TypeScript**
- 모든 신규 코드는 완전히 타입 지정 — `any` 금지
- 공유 데이터 구조는 `src/types/`에 인터페이스/타입 정의
- 설정 객체에 적합하면 `satisfies` 연산자 사용

**React / Next.js**
- 기본적으로 Server Component 사용; 브라우저 API, 훅, 이벤트 핸들러가 필요할 때만 `'use client'` 추가
- 서버 렌더링 가능한 데이터는 `fetch` + Next.js 캐싱 사용
- 이미지는 `next/image`, 네비게이션은 `next/link`

**Tailwind CSS**
- `style` prop 사용 금지 — Tailwind 유틸리티 클래스 사용
- 반응형 레이아웃에 `sm:`, `md:`, `lg:` 접두사 사용

**게임 관련**
- Canvas 게임 컴포넌트는 반드시 `dynamic(..., { ssr: false })`로 로드
- 게임 데이터 추가 시 `src/data/games.ts`에 메타데이터도 함께 업데이트

### 4단계 — 검증
구현 완료 후:
```bash
pnpm exec tsc --noEmit && pnpm lint
```
오류가 있으면 수정 후 완료합니다.

### 5단계 — 요약
생성 또는 수정된 모든 파일을 한 줄 설명과 함께 나열합니다.
