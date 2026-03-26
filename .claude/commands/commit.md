---
description: 타입체크 + 린트 후 커밋 메시지를 자동 생성하여 커밋합니다
argument-hint: [커밋 메시지 힌트]
allowed-tools: Bash
---

품질 검사를 실행하고 git 커밋을 생성합니다. 메시지 힌트: $ARGUMENTS

## 단계

1. **변경사항 확인**
   ```bash
   git status
   git diff --stat
   ```
   변경사항이 없으면 "커밋할 내용 없음"을 보고하고 중단합니다.

2. **TypeScript 타입 검사**
   ```bash
   pnpm exec tsc --noEmit
   ```
   실패 시 오류를 보고하고 중단합니다 — 타입 오류가 있는 상태로 커밋하지 않습니다.

3. **린트 검사**
   ```bash
   pnpm lint
   ```
   경고가 아닌 오류가 있으면 중단합니다.

4. **변경 파일 스테이징**
   ```bash
   git add -u
   ```
   기능의 일부인 신규 파일도 스테이징합니다 (.env, 빌드 아티팩트 제외).

5. **커밋 메시지 생성**
   `$ARGUMENTS`에 메시지가 제공된 경우 그대로 사용합니다.
   없으면 `git diff --cached`를 분석하여 컨벤셔널 커밋 메시지를 작성합니다:
   - 형식: `<타입>(<범위>): <요약>`
   - 타입: `feat`, `fix`, `refactor`, `perf`, `test`, `chore`, `docs`
   - 범위: 게임 이름 또는 모듈 (예: `feat(rhythm): BPM 동기화 개선`)
   - 첫 줄 최대 72자
   - 내용이 복잡하면 본문 추가

6. **커밋 실행**
   ```bash
   git commit -m "<생성된 메시지>"
   ```

7. **확인**
   ```bash
   git log --oneline -3
   ```
   커밋이 정상적으로 반영되었는지 확인합니다.
