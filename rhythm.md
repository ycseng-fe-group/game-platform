역할: 너는 Web Audio API와 HTML5 Canvas를 활용한 고성능 리듬 게임 엔진 설계자야. Rhythm-Game-JS와 유사하게 모듈화가 잘 된 리듬 게임 프로토타입을 개발하려고 해.

시스템 아키텍처 요구사항:

오디오 엔진 (Core): AudioContext를 사용하여 배경음악(BGM)을 재생하고, performance.now() 대신 audioContext.currentTime을 기준으로 게임의 절대 시간을 관리해줘. (시각적 오차 방지)

노트 매니저 (Data): 아래와 같은 JSON 형식의 채보(Chart) 데이터를 읽어서 화면에 렌더링하는 시스템을 구축해줘.

JSON
[ { "time": 1.5, "lane": 0 }, { "time": 2.2, "lane": 2 } ]
판정 로직 (Judge): 유저의 입력 시간과 노트의 목표 시간 차이를 계산하여 Perfect(±50ms), Great(±100ms), Good(±150ms), Miss를 판정하고 콤보 시스템을 구현해줘.

렌더링 루프: requestAnimationFrame을 사용하되, 현재 오디오 시간과 동기화된 각 노트의 Y 좌표를 계산하는 공식을 포함해줘. (공식: y = (noteTime - currentTime) \* speed)

상세 기능:

4개의 라인(Key: D, F, J, K)을 지원하는 건반형 UI.

판정 시 화면 중앙에 판정 텍스트(Perfect 등)와 현재 콤보 표시.

배경음악 파일(.mp3)을 로드하고 로딩이 완료된 후 게임이 시작되는 프리로더(Preloader) 로직.

출력 형식:

코드의 가독성을 위해 Game, Note, AssetLoader 등 역할을 분리한 클래스(Class) 기반의 JavaScript 코드로 작성해줘.

단일 HTML 파일 내에 CSS와 JS를 포함하여 바로 실행 가능한 형태로 제공해줘.
