/**
 * Guide long-copy dictionary, ko — scenario pages, first half
 * (what-colors-make brown/purple/green/orange + how-to-make black-frosting /
 * brown-icing). Keys mirror the en generator in i18n.test.ts exactly
 * (`gw.<slug>.<field>`); a guard test fails if either side drifts.
 */
export const SCENARIO_KO_A: Record<string, string> = {
  /* ---------- what-colors-make-brown ---------- */
  'gw.what-colors-make-brown.lead':
    '갈색은 색이 흐려질 때 생기는 실수가 아닙니다 — 어두운 주황이고, 두 쌍의 보색, 검정을 거치는 셰이딩, 그리고 삼원색 블렌드라는 다섯 가지 깔끔한 경로가 있습니다. 각 경로는 조금씩 다른 갈색에 도달하고, 아래의 모든 색 견본은 사진이 아니라 계산된 블렌드입니다.',
  'gw.what-colors-make-brown.ans': '따뜻한 밤나무 갈색',
  'gw.what-colors-make-brown.introH': '왜 이렇게 많은 색이 갈색을 만드나요',
  'gw.what-colors-make-brown.i1':
    '색상환에서 갈색은 자리가 없습니다 — 어둡고 낮은 채도의 주황입니다. 그래서 거의 모든 보색 쌍을 섞으면 갈색이 나옵니다: 각 안료가 상대가 반사하는 빛을 흡수하고, 눈에 도달하는 흐릿한 따뜻한 잔여물이 갈색입니다. 빨강과 초록, 주황과 파랑, 노랑과 보라: 세 쌍 모두 같은 계열에 속하며 온도만 조금 다릅니다.',
  'gw.what-colors-make-brown.i2':
    '같은 논리가 초등학교 급식판 버전도 설명합니다: 물감 삼원색(빨강, 노랑, 파랑)을 함께 섞어도 갈색이 됩니다. 셋이 합치면 거의 모든 빛을 흡수하기 때문입니다. 갈색은 본질적으로 주황이므로, 주황을 검정으로 어둡게 해도 도달합니다 — 이것이 셰이딩 경로입니다. 물감이든 글레이즈든 슬라임이든: 아래의 산술은 같고 매체만 바뀝니다.',
  'gw.what-colors-make-brown.listH': '다섯 경로, 전부 계산',
  'gw.what-colors-make-brown.m1n': '빨강 + 초록',
  'gw.what-colors-make-brown.m1s': '고전 답: 빨강과 초록은 보색이라 서로를 상쇄합니다.',
  'gw.what-colors-make-brown.m1c1': '빨강',
  'gw.what-colors-make-brown.m1c2': '초록',
  'gw.what-colors-make-brown.m1o':
    '주력 갈색. 두 색을 대략 같게; 빨강 쪽으로 기울면 따뜻한 적갈, 초록 쪽이면 올리브 기운이 듭니다.',
  'gw.what-colors-make-brown.m2n': '주황 + 파랑',
  'gw.what-colors-make-brown.m2s': '다른 보색 쌍 — 보통 가장 깨끗하고 흐리지 않은 갈색.',
  'gw.what-colors-make-brown.m2c1': '주황',
  'gw.what-colors-make-brown.m2c2': '파랑',
  'gw.what-colors-make-brown.m2o':
    '주황은 이미 "갈색 되기 직전의 색"(같은 색조, 더 밝을 뿐)이라 이 경로는 가장 적은 힘으로 자연스러운 초콜릿 톤에 닿습니다. 파랑은 소량만 써서 회색화를 막으세요.',
  'gw.what-colors-make-brown.m3n': '노랑 + 보라',
  'gw.what-colors-make-brown.m3s': '세 번째 보색 쌍: 머스터드 쪽으로 기운 흙갈색.',
  'gw.what-colors-make-brown.m3c1': '노랑',
  'gw.what-colors-make-brown.m3c2': '보라',
  'gw.what-colors-make-brown.m3o':
    '노랑은 가장 밝은 안료이고 보라는 쌍 중 가장 어두워서, 블렌드는 앞의 두 경로보다 더 덥고 더 탁합니다. 황토와 흙 톤에 좋습니다.',
  'gw.what-colors-make-brown.m4n': '삼원색 전부',
  'gw.what-colors-make-brown.m4s': '빨강 + 노랑 + 파랑: 모든 아이가 물감 팔레트에서 발견하는 것.',
  'gw.what-colors-make-brown.m4c1': '빨강',
  'gw.what-colors-make-brown.m4c2': '노랑',
  'gw.what-colors-make-brown.m4c3': '파랑',
  'gw.what-colors-make-brown.m4o':
    '되지만 가장 통제하기 어려운 경로입니다 — 세 안료가 너무 완전히 상쇄해서 비율이 조금만 바뀌어도 결과가 따뜻함, 차가움, 회색 사이를 오갑니다. 색을 이해하는 데는 좋고 목표 색을 맞추는 데는 나쁩니다.',
  'gw.what-colors-make-brown.m5n': '주황 + 검정 (셰이딩 경로)',
  'gw.what-colors-make-brown.m5s': '보색 섞기 건너뛰기: 갈색은 곧 어두운 주황이니 주황을 어둡게만 하세요.',
  'gw.what-colors-make-brown.m5c1': '주황',
  'gw.what-colors-make-brown.m5c2': '검정',
  'gw.what-colors-make-brown.m5o':
    '주황이 이미 있다면 가장 예측 가능한 경로입니다. 무게로 4분의 1의 검정이 밤색을 내고, 더 밀면 초콜릿입니다. "어떤 색이 짙은 갈색을 만드나"와 "갈색을 만드는 색"이 같은 답 계열인 이유이기도 합니다.',
  'gw.what-colors-make-brown.t1t': '따뜻한 갈색 vs 차가운 갈색.',
  'gw.what-colors-make-brown.t1b':
    '어느 경로든 빨강·주황 쪽으로 기울면 따뜻해지고(밤색, 테라코타) 파랑·초록 쪽이면 차가워집니다(움버, 토프). 같은 경로, 아주 작은 성향 차이입니다.',
  'gw.what-colors-make-brown.t2t': '연한 갈색과 탠은 같은 경로에 흰색을 더한 것.',
  'gw.what-colors-make-brown.t2b':
    '탠, 베이지, 연한 갈색은 새로운 색이 아닙니다 — 갈색을 흰색으로 늘리는 것입니다. 4분의 1의 흰색이 이미 탠으로 읽힙니다; 차이는 그게 전부입니다.',
  'gw.what-colors-make-brown.t3t': '매체가 착지점을 바꿉니다.',
  'gw.what-colors-make-brown.t3b':
    '아크릴은 건조 후 어두워지고, 수채는 밝아지며, 글레이즈는 흰색 베이스에서 시작합니다. 계산 블렌드는 혼합 논리에 맞고, 실물은 한 단계 밝거나 어두운 것이 정상입니다.',
  'gw.what-colors-make-brown.t4t': '보색은 조금씩 더하세요.',
  'gw.what-colors-make-brown.t4b':
    '보색 갈색은 마지막에 빠르게 어두워집니다. 보색을 아주 작게 나눠 넣고 한 단계 일찍 멈추세요 — 섞는 동안 계속 발전합니다.',
  'gw.what-colors-make-brown.f1q': '어떤 두 색이 갈색을 만드나요?',
  'gw.what-colors-make-brown.f1a':
    '보색 쌍이면 무엇이든: 빨강+초록, 주황+파랑, 노랑+보라. 각각 착지점이 조금 다릅니다 — 주황+파랑이 보통 가장 깨끗하고 빨강+초록이 가장 고전적입니다. 갈색은 문자 그대로 어두운 주황이라 검정으로 주황을 어둡게 해도 됩니다.',
  'gw.what-colors-make-brown.f2q': '어떤 색이 갈색 물감을 만드나요?',
  'gw.what-colors-make-brown.f2a':
    '같은 보색 경로입니다: 아크릴·유화에서는 주황에 약간의 파랑이 가장 통제되고 빨강+초록이 가장 전통적입니다. 주색에서 시작해 보색을 조금씩 더하세요.',
  'gw.what-colors-make-brown.f3q': '짙은 갈색은 어떻게 만드나요?',
  'gw.what-colors-make-brown.f3a':
    '아무 갈색 경로나 더 누르세요: 보색을 더하면 어두워지고, 검정을 조금 넣어도 됩니다. 물감의 고전은 황토에 약간의 울트라마린 — 같은 원리입니다.',
  'gw.what-colors-make-brown.f4q': '연한 갈색이나 탠은 어떻게 만드나요?',
  'gw.what-colors-make-brown.f4a':
    '흰색을 더하세요. 탠, 베이지, 연한 갈색은 위의 갈색을 흰색으로 당긴 것입니다 — 감으로 4분의 1의 흰색이 이미 탠입니다. 글레이즈라면 이것이 바로 갈색 젤로 탠 아이싱을 만드는 방법입니다.',
  'gw.what-colors-make-brown.f5q': '왜 섞은 색이 새 색 대신 갈색이 되나요?',
  'gw.what-colors-make-brown.f5a':
    '물감은 빼기를 합니다: 각 안료가 파장을 흡수하고 쌓일수록 더 많이 흡수합니다. 무거운 혼합 후 살아남는 것은 빨강~노랑 사이의 흐릿한 구간 — 눈은 이것을 갈색으로 보고합니다. 화면은 빛을 더하므로 같은 혼합이 다르게 나타납니다.',
  'gw.what-colors-make-brown.r1': '빨강과 초록: 고전 갈색, 모든 비율',
  'gw.what-colors-make-brown.r2': '갈색과 흰색으로 탠 만들기',
  'gw.what-colors-make-brown.r3': '갈색 아이싱 만들기: 다섯 가지 방법',
  'gw.what-colors-make-brown.r4': '모든 컬러 가이드',

  /* ---------- what-colors-make-purple ---------- */
  'gw.what-colors-make-purple.lead':
    '보라는 색상환의 이방인입니다: 자신의 파장이 없습니다. 물감에서는 빨강+파랑으로, 마젠타+파랑으로는 더 선명하게, 흰색이나 검정을 더하면 라벤더나 가지색이 됩니다. 아래 각 견본은 계산된 블렌드라서 물감을 짜기 전에 각 경로의 정확한 착지점을 볼 수 있습니다.',
  'gw.what-colors-make-purple.ans': '동등한 비율의 빨강과 파랑',
  'gw.what-colors-make-purple.introH': '왜 보라가 가장 까다로운 고전 혼합인가',
  'gw.what-colors-make-purple.i1':
    '빨강, 초록, 파랑과 달리 보라는 화면이 단일 채널로 낼 수 있는 색도 아니고 눈이 독립적으로 보는 파장도 아닙니다. 보라는 스펙트럼의 빨강 끝과 파랑 끝 사이 빈 공간에 살므로 혼합물로만 존재할 수 있습니다. 그래서 교실의 표준 답(빨강+파랑)이자 실전에서 가장 유명한 실망이기도 합니다: 결과물은 예상보다 회색빛이고 어둡습니다.',
  'gw.what-colors-make-purple.i2':
    '이유는 뺄셈입니다. 빨강 안료는 파란 빛의 대부분을, 파랑 안료는 빨간 빛의 대부분을 흡수합니다 — 겹치면 흐릿한 바이올렛 잔여물만 남습니다. 화가들이 이를 피하는 방법은 빨강을 마젠타로 바꾸는 것 — 빨간 빛과 파란 빛을 모두 반사하는 안료입니다. 같은 발상으로 보라가 훨씬 살아납니다. 아래 경로는 둘 다 있고 각각 정확한 착지점이 표시되어 있습니다.',
  'gw.what-colors-make-purple.listH': '다섯 경로, 전부 계산',
  'gw.what-colors-make-purple.m1n': '빨강 + 파랑 (교실 답)',
  'gw.what-colors-make-purple.m1s': '고전: 동량의 빨강과 파랑은 은은한 트루 퍼플에 닿습니다.',
  'gw.what-colors-make-purple.m1c1': '빨강',
  'gw.what-colors-make-purple.m1c2': '파랑',
  'gw.what-colors-make-purple.m1o':
    '모두가 배우는 답이고 실제로 작동합니다 — 다만 결과가 머릿속 보라보다 어둡다는 점을 보세요. 빨강은 파랑을, 파랑은 빨강을 흡수해 혼합은 처음부터 어둡습니다. 대부분의 용도에 충분하고, 불꽃을 원하면 다음 경로입니다.',
  'gw.what-colors-make-purple.m2n': '마젠타 + 파랑 (선명 경로)',
  'gw.what-colors-make-purple.m2s': '빨강을 마젠타로 바꾸면 같은 혼합이 전기처럼 바뀝니다.',
  'gw.what-colors-make-purple.m2c1': '마젠타',
  'gw.what-colors-make-purple.m2c2': '파랑',
  'gw.what-colors-make-purple.m2o':
    '마젠타는 인쇄 원색 — 빨간 빛과 파란 빛을 반사하고 절반을 먹지 않습니다. 물감에서는 퀴나크리돈 마젠타+울트라마린이고, 깨끗한 로열 퍼플의 표준 레시피입니다. 빨강+파랑이 실망스러울 때 업그레이드하세요.',
  'gw.what-colors-make-purple.m3n': '파랑 쪽으로 기울이면 바이올렛',
  'gw.what-colors-make-purple.m3s': '빨강의 두 배 파랑이 혼합을 블루 바이올렛과 인디고로 밉니다.',
  'gw.what-colors-make-purple.m3c1': '빨강',
  'gw.what-colors-make-purple.m3c2': '파랑',
  'gw.what-colors-make-purple.m3o':
    '바이올렛은 파랑을 더한 보라입니다. 아이리스, 라벤더 블루, 황혼의 하늘이 이 구간입니다. 물감에서 보라에 울트라마린을 더하는 것과 같습니다.',
  'gw.what-colors-make-purple.m4n': '빨강 쪽으로 기울이면 플럼',
  'gw.what-colors-make-purple.m4s': '비율을 뒤집으면 혼합이 따뜻해져 플럼과 와인 영역으로 갑니다.',
  'gw.what-colors-make-purple.m4c1': '빨강',
  'gw.what-colors-make-purple.m4c2': '파랑',
  'gw.what-colors-make-purple.m4o':
    '여분의 빨강이 혼합을 레드 퍼플로 민니다: 플럼, 와인, 마젠타 쪽 보라. 이 계열은 차갑지 않고 따뜻하게 읽히며, 푹시아 같은 핑크빛 보라의 출발점이기도 합니다.',
  'gw.what-colors-make-purple.m5n': '보라 + 검정 (셰이딩 경로)',
  'gw.what-colors-make-purple.m5s': '완성된 보라에 4분의 1 검정으로 가지색을 냅니다.',
  'gw.what-colors-make-purple.m5c1': '보라',
  'gw.what-colors-make-purple.m5c2': '검정',
  'gw.what-colors-make-purple.m5o':
    '깊은 가지색까지 가장 예측 가능한 길입니다. 검정은 조금씩 — 보라는 마지막 단계에 빠르게 어두워지고 되돌릴 수 없습니다. 반대 방향은 흰색입니다: 아래 라벤더 FAQ를 보세요.',
  'gw.what-colors-make-purple.t1t': '선명한 보라는 빨강에 달려 있습니다.',
  'gw.what-colors-make-purple.t1b':
    '노란빛 빨강(카드뮴 레드, 버밀리언)은 노랑과 파랑이 반대로 당기므로 혼합을 진창으로 만듭니다. 보라가 늘 회색이면 마젠타, 로즈, 퀴나크리돈으로 바꾸세요 — 파랑을 좋아하는 빨강입니다.',
  'gw.what-colors-make-purple.t2t': '라벤더는 틴트이지 새 색이 아닙니다.',
  'gw.what-colors-make-purple.t2b':
    '라벤더, 라일락, 연보라는 모두 보라+흰색입니다. 4분의 1의 흰색이 이미 라벤더로 읽히고, 더하면 라일락으로 갑니다. 글레이즈에서는 흰 베이스가 이 단계를 공짜로 해줍니다.',
  'gw.what-colors-make-purple.t3t': '보라에서 노랑을 멀리하세요.',
  'gw.what-colors-make-purple.t3b':
    '노랑은 보라의 보색입니다: 조금이라도 섞이면(더러운 붓, 오염된 젤) 혼합이 회색과 갈색으로 무너집니다. 그게 목적이라면 채도 낮추기이고, 전체 지도는 "어떤 색이 갈색을 만드나"에 있습니다.',
  'gw.what-colors-make-purple.t4t': '화면은 속이고 물감은 뺍니다.',
  'gw.what-colors-make-purple.t4b':
    '모니터는 빨간 빛과 파란 빛을 직접 섞어 디지털 보라가 어떤 물감 혼합보다 깨끗합니다. 튜브 버전이 화면 견본보다 한 단계 어둡고 회색인 것은 정상입니다.',
  'gw.what-colors-make-purple.f1q': '어떤 두 색이 보라를 만드나요?',
  'gw.what-colors-make-purple.f1a':
    '빨강과 파랑 — 고전 답이고 동량 혼합은 은은한 바이올렛에 닿습니다. 더 깨끗한 혼합은 마젠타+파랑입니다. 파랑 쪽이 바이올렛, 빨강 쪽이 플럼입니다.',
  'gw.what-colors-make-purple.f2q': '짙은 보라는 어떻게 만드나요?',
  'gw.what-colors-make-purple.f2a':
    '두 가지: 파랑을 더하면(어두워지고 차가워짐) 완성된 보라에 검정을 소량 더해 가지색·딥 퍼플. 천천히 — 두 경로 모두 마지막 구간이 빠릅니다.',
  'gw.what-colors-make-purple.f3q': '라벤더나 연보라는 어떻게 만드나요?',
  'gw.what-colors-make-purple.f3a':
    '흰색을 더하세요. 라벤더, 라일락, 페리윙클은 보라의 틴트입니다: 대략 흰색 1에 보라 4가 라벤더이고 더하면 라일락으로 갑니다. 버터크림·글레이즈에서는 흰 베이스가 이를 자동으로 합니다.',
  'gw.what-colors-make-purple.f4q': '왜 빨강+파랑이 보라 대신 회색이나 갈색이 되나요?',
  'gw.what-colors-make-purple.f4a':
    '거의 항상 빨강 탓입니다. 노란빛 빨강(카드뮴, 버밀리언)이 보라를 죽이는 색을 혼합에 넣습니다. 마젠타나 로즈로 바꾸고 붓을 씻으세요 — 이전 혼합의 소량 노랑도 같은 해를 끼칩니다.',
  'gw.what-colors-make-purple.f5q': '퍼플과 바이올렛의 차이는 뭔가요?',
  'gw.what-colors-make-purple.f5a':
    '일상에서는 호환됩니다. 엄밀히는 바이올렛이 블루 쪽(인디고 쪽)이고 퍼플이 플럼·마젠타 쪽으로 붉습니다. 화가는 바이올렛을 블루 쪽 혼합에, 퍼플을 레드 쪽에 씁니다; 위의 두 비율 경로가 그 차이를 나란히 보여줍니다.',
  'gw.what-colors-make-purple.r1': '빨강과 파랑: 모든 비율의 정확한 색',
  'gw.what-colors-make-purple.r2': '파랑과 보라로 바이올렛 만들기',
  'gw.what-colors-make-purple.r3': '보라와 빨강으로 마젠타 만들기',
  'gw.what-colors-make-purple.r4': '어떤 색이 갈색을 만드나 (보색 충돌)',
  'gw.what-colors-make-purple.r5': '나만의 보라 직접 섞기',

  /* ---------- what-colors-make-green ---------- */
  'gw.what-colors-make-green.lead':
    '파랑과 노랑은 초록을 만듭니다 — 모두가 처음 배우는 혼합이자, 파랑 선택이 모든 것을 조용히 결정하는 자리입니다. 보라빛 파랑은 흐리고 자연스러운 초록을, 시안 쪽 파랑은 선명한 초록을 냅니다; 노랑이 많으면 옐로그린으로, 파랑이 많으면 틸로 미끄러집니다. 아래 각 견본은 사진이 아닌 계산 블렌드입니다.',
  'gw.what-colors-make-green.ans': '물감에서 파랑과 노랑',
  'gw.what-colors-make-green.introH': '왜 파랑과 노랑이 초록을 만드나',
  'gw.what-colors-make-green.i1':
    '초록은 빛의 삼원색 중 하나 — 화면은 섞지 않고 녹색 픽셀을 켭니다. 물감에는 지름길이 없습니다: 녹색 안료는 혼합에서 와야 하고 파랑+노랑이 그 길입니다. 뺄셈으로 작동합니다: 파란 안료는 스펙트럼의 빨강·주황 끝을, 노란 안료는 보라·파랑 끝을 흡수하고 둘 다 통과시키는 구간이 초록입니다. 살아남은 구간이 보이는 색입니다.',
  'gw.what-colors-make-green.i2':
    '혼합은 각 안료가 무엇을 통과시키느냐에 달렸으므로, 구체적인 파랑이 비율보다 중요합니다. 보라빛 파랑(울트라마린)은 빨강을 조금 새어 나가게 해 흐리고 자연스러운 초록 — 세이지와 이끼 — 을 냅니다. 시안 쪽 파랑(프탈로)은 따뜻한 빛을 안 새어 선명하고 차가운 초록을 냅니다. 아래 경로는 화가의 출발점에서 시작합니다: 파랑을 노랑 베이스에 조금씩 개어 고전 혼합을 얻고, 그다음 초록을 중심으로 노랑, 파랑, 검정, 흰색이 옐로그린, 틸, 포레스트, 세이지로 데려갑니다.',
  'gw.what-colors-make-green.listH': '다섯 경로, 전부 계산',
  'gw.what-colors-make-green.m1n': '노랑에 파랑 (화가의 경로)',
  'gw.what-colors-make-green.m1s': '두 배의 노랑 베이스에 파랑을 개어 넣기 — 고전의 신선한 초록.',
  'gw.what-colors-make-green.m1c1': '스카이 블루',
  'gw.what-colors-make-green.m1c2': '노랑',
  'gw.what-colors-make-green.m1o':
    '팔레트에서 실제로 하는 일: 파랑을 노랑에 조금씩, 절대 반대로 하지 않습니다. 동량은 대부분의 물감에서 어두운 회색빛 중간색으로 지나칩니다 — 화면에서 50/50 파랑+노랑 빛은 초록이 아니라 옅은 파랑으로 치닫습니다. 초록을 만드는 공정은 물감입니다.',
  'gw.what-colors-make-green.m2n': '초록 + 노랑 (샤르트뢰즈 경로)',
  'gw.what-colors-make-green.m2s': '초록에서 노랑 쪽으로 기울여 라임, 옐로그린, 스프링 그린.',
  'gw.what-colors-make-green.m2c1': '초록',
  'gw.what-colors-make-green.m2c2': '노랑',
  'gw.what-colors-make-green.m2o':
    '선명한 옐로그린까지 가장 깨끗한 길: 초록은 이미 목표 자리에 앉아 있고 노랑은 샤르트뢰즈 쪽으로만 데려갑니다. 파랑+노랑이 도무지 밝아지지 않을 때의 해결책이기도 합니다 — 회색과 싸우지 말고 녹색 안료에서 다시 시작하세요.',
  'gw.what-colors-make-green.m3n': '초록 + 파랑 (틸 경로)',
  'gw.what-colors-make-green.m3s': '반대쪽으로 기울여 틸, 시 그린, 스프루스.',
  'gw.what-colors-make-green.m3c1': '초록',
  'gw.what-colors-make-green.m3c2': '스카이 블루',
  'gw.what-colors-make-green.m3o':
    '파랑이 많은 초록은 차분하게 읽힙니다 — 계열에서 스파·깊은 숲 쪽 끝입니다. 실제 튜브에서는 시안 쪽 파랑(프탈로)이 가장 아련한 틸을, 보라 쪽(울트라마린)이 더 가라앉은 스프루스를 냅니다.',
  'gw.what-colors-make-green.m4n': '초록 + 검정 (포레스트 경로)',
  'gw.what-colors-make-green.m4s': '완성된 초록에 4분의 1 검정으로 포레스트 그린과 파인 그린.',
  'gw.what-colors-make-green.m4c1': '초록',
  'gw.what-colors-make-green.m4c2': '검정',
  'gw.what-colors-make-green.m4o':
    '짙은 초록까지의 셰이딩 경로입니다. 검정은 어둡히면서 평평하게 만드므로 스타일리시해지기 전에 멈추세요 — 자연스러운 깊이는 파랑으로, 검정은 마지막 미세 조정으로 남겨둡니다.',
  'gw.what-colors-make-green.m5n': '초록 + 흰색 (세이지 경로)',
  'gw.what-colors-make-green.m5s': '완성된 초록을 흰색으로 당겨 세이지, 민트, 파스텔 그린.',
  'gw.what-colors-make-green.m5c1': '초록',
  'gw.what-colors-make-green.m5c2': '흰색',
  'gw.what-colors-make-green.m5o':
    '세이지는 흰색을 절반까지 당긴 초록이고, 실내 디자인이 가장 원하는 초록입니다: 흰색이 시끄러운 부분을 전부 부드럽게 합니다. 동량이 이미 세이지로 읽히고, 민트는 파랑 쪽 초록에서 출발하는 같은 여정입니다.',
  'gw.what-colors-make-green.t1t': '파랑이 무드를 결정합니다.',
  'gw.what-colors-make-green.t1b':
    '울트라마린(보라 쪽)은 흐리고 자연스러운 초록을, 프탈로(시안 쪽)은 선명하고 차가운 초록을 냅니다. 초록 혼합이 반복해서 실망스러우면 비율이 아니라 파랑을 바꾸세요.',
  'gw.what-colors-make-green.t2t': '자연은 파랑으로, 스타일은 검정으로 어둡히세요.',
  'gw.what-colors-make-green.t2b':
    '파랑을 더하면 어두워지면서도 살아있는 초록 — 자연스러운 파인과 이끼가 그렇습니다. 검정은 더 빠르지만 평평해서 그래픽적인 포레스트와 스타일화에 어울립니다.',
  'gw.what-colors-make-green.t3t': '올리브는 멍이 든 초록입니다.',
  'gw.what-colors-make-green.t3b':
    '빨강 — 초록의 보색 — 을 조금 넣으면 초록이 올리브와 이끼로 끌립니다. 갈색이 되는 것과 같은 충돌인데 일찍 멈춘 것입니다. 어스 톤에는 좋고 선명함에는 재앙입니다.',
  'gw.what-colors-make-green.t4t': '화면은 초록을 섞지 않습니다.',
  'gw.what-colors-make-green.t4b':
    '초록은 빛의 원색입니다: 디스플레이는 섞지 않고 켭니다. 그래서 디지털 초록이 어떤 물감 옆에서도 형광처럼 보입니다 — 파란 빛+노란 빛은 하양으로 가므로 화면에서 50/50이 초록이 아니라 하얗게 보이는 것도 물감과 정반대입니다.',
  'gw.what-colors-make-green.f1q': '어떤 두 색이 초록을 만드나요?',
  'gw.what-colors-make-green.f1a':
    '파랑과 노랑입니다. 뺄셈 혼합: 파랑은 스펙트럼의 따뜻한 끝을, 노랑은 차가운 끝을 흡수하고 가운데 초록 띠가 살아남습니다. 동량은 중간 초록; 노랑 많으면 옐로그린, 파랑 많으면 틸입니다.',
  'gw.what-colors-make-green.f2q': '짙은 초록이나 포레스트 그린은 어떻게 만드나요?',
  'gw.what-colors-make-green.f2a':
    '두 가지: 파랑을 더하면 초록이 살아있는 채로 어두워집니다(자연스러운 파인, 이끼), 완성된 초록에 검정을 소량 더하면(그래픽 포레스트). 파랑은 부드럽고 검정은 세고 평평하게 오니 조금씩 넣으세요.',
  'gw.what-colors-make-green.f3q': '연두, 민트, 세이지는 어떻게 만드나요?',
  'gw.what-colors-make-green.f3a':
    '흰색을 더하세요. 세이지는 대략 동량의 초록+흰색이고, 민트는 파랑 쪽 초록에서 같은 틴트입니다. 글레이즈에서는 흰 베이스가 대신해줍니다 — 녹색 젤 한 방울이 이미 파스텔 구간입니다.',
  'gw.what-colors-make-green.f4q': '올리브 그린은 어떻게 만드나요?',
  'gw.what-colors-make-green.f4a':
    '빨강을 조금 더하세요. 빨강은 초록의 보색이라 소량으로 초록을 갈색까지 가지 않고 올리브·이끼로 멍들게 합니다. 주황이나 갈색 한 꼬집도 같은 일을 하되 더 따뜻합니다.',
  'gw.what-colors-make-green.f5q': '왜 파랑과 노랑이 그냥 어두워지는 대신 초록이 되나요?',
  'gw.what-colors-make-green.f5a':
    '두 안료가 스펙트럼의 다른 반쪽을 막기 때문입니다. 파랑은 빨강과 주황을, 노랑은 보라와 파랑을 흡수합니다. 겹친 뒤 양쪽이 모두 반사하는 것은 가운데 초록 띠뿐 — 그것이 눈에 도달합니다.',
  'gw.what-colors-make-green.r1': '파랑과 노랑: 모든 비율의 정확한 색',
  'gw.what-colors-make-green.r2': '노랑과 초록으로 샤르트뢰즈 만들기',
  'gw.what-colors-make-green.r3': '초록과 검정으로 포레스트 그린 만들기',
  'gw.what-colors-make-green.r4': '어떤 색이 갈색을 만드나 (올리브-갈색 국경)',
  'gw.what-colors-make-green.r5': '모든 컬러 가이드',

  /* ---------- what-colors-make-orange ---------- */
  'gw.what-colors-make-orange.lead':
    '빨강과 노랑은 주황을 만듭니다 — 색상환에서 가장 우호적인 혼합입니다. 두 색이 이웃이라 흐림 없이 어우러집니다. 나머지는 비율이 정합니다: 노랑 많으면 골드 앰버, 빨강 많으면 버밀리언, 흰색은 피치, 검정은 번트로 데려갑니다. 아래 견본은 전부 계산된 것입니다.',
  'gw.what-colors-make-orange.ans': '동등한 비율의 빨강과 노랑',
  'gw.what-colors-make-orange.introH': '왜 주황은 쉽게 섞이나',
  'gw.what-colors-make-orange.i1':
    '주황은 과일 이름을 딴 유일한 대색입니다 — 오렌지가 유럽에 오기 전 영어에는 단어가 없어 "geoluread"(노랑빨강)이라 불렀습니다. 색상환에서 빨강과 노랑의 한가운데에 앉아 둘은 적수가 아닌 이웃이라 보라와 갈색 같은 흐림이 없습니다. 어떤 비율을 골라도 착지점은 쓸모 있습니다.',
  'gw.what-colors-make-orange.i2':
    '화면에서 주황은 순수한 덧셈입니다: 빨간 빛+초록 빛. TV에는 주황 픽셀이 없습니다 — 빨강과 초록을 함께 켜서 과일 그릇의 주황을 그리며, 이것이 디지털 사진에서 주황과 갈색이 가까운 이유입니다: 갈색은 어두운 주황이고 같은 알고리즘에서 밝기만 낮춘 것입니다.',
  'gw.what-colors-make-orange.listH': '다섯 경로, 전부 계산',
  'gw.what-colors-make-orange.m1n': '빨강 + 노랑 (고전)',
  'gw.what-colors-make-orange.m1s': '동량의 빨강과 노랑은 깨끗한 트루 오렌지에 닿습니다.',
  'gw.what-colors-make-orange.m1c1': '빨강',
  'gw.what-colors-make-orange.m1c2': '노랑',
  'gw.what-colors-make-orange.m1o':
    '교실 답이자 물감에서 가장 관대한 혼합입니다. 빨강과 노랑은 색상환 이웃이라 이곳에는 흐려질 비율이 없습니다 — 둘 사이의 경사면을 미끄러질 뿐입니다. 이 혼합이 아래 모든 변형의 닻입니다.',
  'gw.what-colors-make-orange.m2n': '노랑 많이: 앰버',
  'gw.what-colors-make-orange.m2s': '두 배의 노랑이 혼합을 골드와 앰버로 데려갑니다.',
  'gw.what-colors-make-orange.m2c1': '빨강',
  'gw.what-colors-make-orange.m2c2': '노랑',
  'gw.what-colors-make-orange.m2o':
    '노랑이 많은 주황은 골드, 앰버, 머리골드로 읽힙니다 — 계열에서 햇볕 쪽 끝입니다. 대부분의 물감에서 노랑이 더 강한 쪽이므로, 경사면의 특정 지점을 쫓을 때는 노랑이 아니라 빨강을 재세요.',
  'gw.what-colors-make-orange.m3n': '빨강 많이: 버밀리언',
  'gw.what-colors-make-orange.m3s': '비율을 뒤집으면 혼합이 뜨거워지며 버밀리언과 스칼릿으로 갑니다.',
  'gw.what-colors-make-orange.m3c1': '빨강',
  'gw.what-colors-make-orange.m3c2': '노랑',
  'gw.what-colors-make-orange.m3o':
    '빨강이 많은 주황은 버밀리언과 스칼릿의 영토 — 불, 양귀비, 산호입니다. 역사적으로 버밀리언은 별도의 수은 안료였지만, 혼합으로 이미 가진 두 원색으로 같은 구간에 닿습니다.',
  'gw.what-colors-make-orange.m4n': '주황 + 흰색 (피치 경로)',
  'gw.what-colors-make-orange.m4s': '완성된 주황의 틴트로 피치, 애프리콧, 파스텔 코랄.',
  'gw.what-colors-make-orange.m4c1': '주황',
  'gw.what-colors-make-orange.m4c2': '흰색',
  'gw.what-colors-make-orange.m4o':
    '피치는 흰색으로 당긴 주황이고, 핑크가 흰색으로 당긴 빨강이듯입니다. 4분의 1의 흰색이 이미 피치로 읽히고, 더 가면 애프리콧과 파스텔 코랄입니다. 글레이즈의 흰 베이스는 기본적으로 이 자리에서 시작한다는 뜻입니다.',
  'gw.what-colors-make-orange.m5n': '주황 + 검정 (번트 경로)',
  'gw.what-colors-make-orange.m5s': '완성된 주황을 번트 오렌지까지 — 그 너머는 갈색.',
  'gw.what-colors-make-orange.m5c1': '주황',
  'gw.what-colors-make-orange.m5c2': '검정',
  'gw.what-colors-make-orange.m5o':
    '4분의 1의 검정이 번트와 러스트를 냅니다. 더 밀면 갈색 국경을 넘습니다 — 갈색이 어두운 주황이기 때문이고, 이것이 "어떤 색이 갈색을 만드나" 페이지 전체의 전제입니다. 경사면 하나, 색 셋.',
  'gw.what-colors-make-orange.t1t': '따뜻한 빨강을 고르세요.',
  'gw.what-colors-make-orange.t1b':
    '파란빛 빨강(알리자린, 마젠타)은 회색빛 러스트 오렌지를 냅니다; 따뜻한 빨강(카드뮴, 스칼릿, 버밀리언)이 혼합을 밝게 유지합니다. 주황이 반복해서 벽돌색이 되면 범인은 빨강입니다.',
  'gw.what-colors-make-orange.t2t': '골드는 비율이지 안료가 아닙니다.',
  'gw.what-colors-make-orange.t2b':
    '골드-앰버-머리골드 구간은 주황에 노랑이 조금 더해진 것입니다. 골드 물감 튜브가 아니라 경사면을 기울일 일입니다. 반대 방향의 불꽃색도 같습니다 — 빨강이 더하면 더 뜨거워집니다.',
  'gw.what-colors-make-orange.t3t': '피치와 번트는 같은 손잡입니다.',
  'gw.what-colors-make-orange.t3b':
    '흰색은 주황을 피치와 애프리콧으로, 검정은 번트와 러스트로 데려갑니다. 팔레트의 다른 주황은 중심 혼합에서 이 두 걸음 중 하나 차이입니다.',
  'gw.what-colors-make-orange.t4t': '주황에 파랑을 더하면 갈색.',
  'gw.what-colors-make-orange.t4b':
    '파랑은 주황의 보색입니다: 섞으면 러스트, 탠, 갈색에 떨어집니다. 주황을 어스 톤으로 낮추고 싶을 땐 완벽하고, 깨끗한 주황을 지키고 싶을 땐 가장 빠른 실패입니다.',
  'gw.what-colors-make-orange.f1q': '어떤 두 색이 주황을 만드나요?',
  'gw.what-colors-make-orange.f1a':
    '빨강과 노랑, 모든 비율로. 둘은 색상환 이웃이라 어떤 비율이든 깨끗합니다: 동량이 트루 오렌지, 노랑 많으면 골드·앰버, 빨강 많으면 버밀리언입니다.',
  'gw.what-colors-make-orange.f2q': '짙은 주황이나 번트 오렌지는 어떻게 만드나요?',
  'gw.what-colors-make-orange.f2a':
    '완성된 주황에 검정을 소량 — 4분의 1이 번트와 러스트에 떨어집니다. 약간의 파랑(보색)은 더 따뜻하고 흙빛으로 어둡힙니다; 어느 쪽이든 밀면 갈색입니다. 갈색이 어두운 주황이니까요.',
  'gw.what-colors-make-orange.f3q': '피치나 연한 주황은 어떻게 만드나요?',
  'gw.what-colors-make-orange.f3a':
    '흰색을 더하세요. 피치는 대략 흰색 1에 주황 3이고, 더하면 애프리콧과 파스텔 코랄로 갑니다. 빨강을 핑크로 만드는 것과 같은 동작입니다.',
  'gw.what-colors-make-orange.f4q': '빨강 없이 주황을 만드는 방법은?',
  'gw.what-colors-make-orange.f4a':
    '노랑에 마젠타를 섞으세요. 마젠타는 잉크와 물감 혼합의 원색이고, 노랑+마젠타가 사이의 빨강 채널을 덮습니다 — 프린터가 인쇄하는 모든 주황이 정확히 이 쌍에서 나옵니다.',
  'gw.what-colors-make-orange.f5q': '어떤 색이 주황 물감을 만드나요?',
  'gw.what-colors-make-orange.f5a':
    '카드뮴 레드+카드뮴 옐로가 깨끗하고 불투명한 고전 튜브 레시피입니다. 스칼릿·버밀리언에 레몬 옐로가 더 뜨겁고, 알리자린으로 바꾸면 같은 혼합이 흙빛 러스트 톤이 됩니다.',
  'gw.what-colors-make-orange.r1': '빨강과 노랑: 모든 비율의 정확한 색',
  'gw.what-colors-make-orange.r2': '주황과 노랑으로 골드 만들기',
  'gw.what-colors-make-orange.r3': '주황과 빨강으로 버밀리언 만들기',
  'gw.what-colors-make-orange.r4': '어떤 색이 갈색을 만드나 (어두운 주황 해설)',
  'gw.what-colors-make-orange.r5': '나만의 주황 직접 섞기',

  /* ---------- how-to-make-black-frosting ---------- */
  'gw.how-to-make-black-frosting.lead':
    '검정은 홈 베이커가 싸우는 색입니다. 흰 글레이즈에 검정 젤을 넣으면 검정이 오기 훨씬 전에 회색이 나오고, 다음으로 쓴맛이 납니다. 해결은 흰색에서 시작하지 않는 것: 초콜릿으로 시작하고, 액체 대신 젤을 쓰고, 색이 하룻밤 발전하게 두세요. 훨씬 적은 색소로 깊고 카메라에 잘 받는 검정에 닿습니다.',
  'gw.how-to-make-black-frosting.ans': '짙은 차콜 블랙',
  'gw.how-to-make-black-frosting.introH': '검정 글레이즈가 왜 버티나',
  'gw.how-to-make-black-frosting.i1':
    '글레이즈가 흰색으로 보이는 건 설탕과 지방이 모든 파장을 눈으로 산란시키기 때문입니다. 식용 색소는 빛을 뺄 수만 있고 더할 수는 없어서, 검정 글레이즈는 닿는 빛을 거의 다 흡수해야 합니다. 흰색 출발은 소름 돋는 양의 색소가 필요하고, 진한 색소는 씁니다. 문제의 전부를 한 문단으로 말하면 이렇습니다.',
  'gw.how-to-make-black-frosting.i2':
    '두 번째 문제는 색소 자체입니다. 액체 색소는 대부분 물입니다; 검정에 가까워지려면 숟가락 몇 개가 필요하고 버터크림은 수프가 됩니다. 젤 색소(Americolor, Wilton, Chefmaster)는 농축 페이스트입니다: 4분의 1 티스푼이 4분의 1 컵의 액체가 못 하는 일을 하고 농도는 삽니다.',
  'gw.how-to-make-black-frosting.listH': '네 가지 방법',
  'gw.how-to-make-black-frosting.m1n': '초콜릿 베이스 + 검정 젤 (베이커리 방식)',
  'gw.how-to-make-black-frosting.m1s': '짙은 초콜릿 버터크림에서 시작해 검정 젤을 더합니다. 갈색이 이미 빛의 대부분을 흡수했습니다.',
  'gw.how-to-make-black-frosting.m1c1': '초콜릿 버터크림',
  'gw.how-to-make-black-frosting.m1c2': '검정 젤',
  'gw.how-to-make-black-frosting.m1o':
    '베이커리가 실제로 하는 방식입니다. 초콜릿 글레이즈가 젤 병을 열기 전에 80%를 해치우므로 색소는 5분의 1이면 되고, 쓴 잔맛이 없고, 화학물 대신 초콜릿 맛이 납니다.',
  'gw.how-to-make-black-frosting.m2n': '블랙 코코아 버터크림',
  'gw.how-to-make-black-frosting.m2s': '오닉스(블랙) 코코아 파우더가 향을 내며 색을 입힙니다: 색소 없이 오레오급 어둠.',
  'gw.how-to-make-black-frosting.m2c1': '블랙 코코아 버터크림',
  'gw.how-to-make-black-frosting.m2c2': '검정 젤',
  'gw.how-to-make-black-frosting.m2o':
    '블랙 코코아는 오레오 크림을 오레오답게 만드는 원료입니다. 일반 코코아의 4분의 1을 바꾸면 글레이즈가 혼자 거의 검정에 닿고, 사진용으로 젤을 살짝 마무리합니다.',
  'gw.how-to-make-black-frosting.m3n': '흰 베이스 + 진한 검정 젤',
  'gw.how-to-make-black-frosting.m3s': '바닐라 맛을 지켜야 하는 경로: 흰 버터크림에 젤을 진하게.',
  'gw.how-to-make-black-frosting.m3c1': '바닐라 버터크림',
  'gw.how-to-make-black-frosting.m3c2': '검정 젤',
  'gw.how-to-make-black-frosting.m3o':
    '계산 견본이 이 경로의 정직한 천장입니다: 차콜, 검정이 아닙니다. 하룻밤 지나면 어두워지지만 사진용 트루 블랙이 필요하다면 프로가 조용히 초콜릿에서 시작하는 이유입니다.',
  'gw.how-to-make-black-frosting.m4n': '검정 젤이 없다면? 빨강+파랑+초록',
  'gw.how-to-make-black-frosting.m4s': '비상 혼합: 흰 글레이즈에 삼원색이 서로의 빛을 상쇄합니다.',
  'gw.how-to-make-black-frosting.m4c1': '바닐라 버터크림',
  'gw.how-to-make-black-frosting.m4c2': '빨강 젤',
  'gw.how-to-make-black-frosting.m4c3': '파랑 젤',
  'gw.how-to-make-black-frosting.m4c4': '초록 젤',
  'gw.how-to-make-black-frosting.m4o':
    '각 안료가 상대가 반사하는 것을 흡수해 함께 남기는 게 거의 없습니다: 그릇에 담긴 감산 혼합입니다. 탁해지고 맛을 잡아먹으니 계획이 아닌 구조용입니다.',
  'gw.how-to-make-black-frosting.t1t': '판단 전에 하룻밤 쉬세요.',
  'gw.how-to-make-black-frosting.t1b':
    '검정 젤은 수화되며 어두워집니다. 저녁 8시의 짙은 회색이 아침엔 검정으로 읽힙니다. 휴식은 공짜고 추가 색소는 맛의 비용입니다.',
  'gw.how-to-make-black-frosting.t2t': '컵 단위로 세세요.',
  'gw.how-to-make-black-frosting.t2b':
    '초콜릿 베이스에서는 컵당 8분의 1 티스푼에서 시작해 4분의 1 근처에서 멈춥니다. 흰 베이스에서는 컵당 최대 2분의 1 티스푼까지 잡고 잉크가 아닌 차콜을 기대하세요.',
  'gw.how-to-make-black-frosting.t3t': '카메라의 검정과 눈의 검정은 다릅니다.',
  'gw.how-to-make-black-frosting.t3b':
    '사진에서 검정으로 읽히는 것은 보통 짙은 차콜입니다. 가장 검은 글레이즈는 실물로는 평평하고 염색된 티가 나므로 생각보다 한 단계 밝게 잡으세요.',
  'gw.how-to-make-black-frosting.t4t': '파이핑 전에 다시 휘핑.',
  'gw.how-to-make-black-frosting.t4b':
    '쉰 검정 버터크림은 표면이 회색 줄무늬로 보입니다. 15초 휘핑으로 색이 다시 뭉칩니다.',
  'gw.how-to-make-black-frosting.f1q': '검정 글레이즈에 검정 식용 색소가 얼마나 필요한가요?',
  'gw.how-to-make-black-frosting.f1a':
    '초콜릿 베이스에서는 버터크림 컵당 8분의 1~4분의 1 티스푼 젤. 흰 베이스에서는 컵당 2분의 1 티스푼 이상이고 하룻밤 쉬지 않으면 차콜을 받아들여야 합니다. 검정에 액체 색소는 절대 쓰지 마세요: 필요한 양이 먼저 글레이즈를 묽게 만듭니다.',
  'gw.how-to-make-black-frosting.f2q': '검정 글레이즈가 왜 회색이 되었나요?',
  'gw.how-to-make-black-frosting.f2a':
    '거의 항상 셋 중 하나입니다: 흰색에서 시작(가장 어려운 길), 쉬지 않음(젤은 몇 시간 더 어두워짐), 젤 한계 도달. 확실한 수정은 초콜릿 글레이즈에서 다시 시작하는 것 — 갈색이 어둡힘의 대부분을 공짜로 해줍니다.',
  'gw.how-to-make-black-frosting.f3q': '검정 색소 없이 검정 글레이즈를 만드는 법?',
  'gw.how-to-make-black-frosting.f3a':
    '블랙 코코아 파우더, 오닉스 코코아로도 팝니다. 색소 없이 향을 내며 아주 짙은 갈흑색을 입힙니다. 카메라 조명 아래 트루 블랙이 필요할 때만 검정 젤을 소량 더하세요.',
  'gw.how-to-make-black-frosting.f4q': '검정 글레이즈는 맛이 없나요?',
  'gw.how-to-make-black-frosting.f4a':
    '젤이 많이 드는 경우만 그렇습니다. 진한 검정 젤은 쓰고 화학적으로 읽힙니다. 초콜릿 베이스 방식이 정확히 이것을 피하려고 존재합니다: 색소는 적게, 맛은 초콜릿이 책임집니다.',
  'gw.how-to-make-black-frosting.f5q': '로열 아이싱에도 적용되나요?',
  'gw.how-to-make-black-frosting.f5a':
    '됩니다, 두 가지 조정과 함께. 로열 아이싱이 버터크림보다 희어서 같은 어둠에 더 많은 젤이 필요하고, 딱딱함을 유지해야 해서 젤이 액체보다 나은 이유가 하나 더 있습니다. 하룻밤 휴식 트릭은 로열에서 더 강하게 작동합니다.',
  'gw.how-to-make-black-frosting.r1': '빨강과 초록이 갈색을 만드는 이유 (비상 혼합의 이론)',
  'gw.how-to-make-black-frosting.r2': '갈색 아이싱 만들기: 다섯 가지 방법',
  'gw.how-to-make-black-frosting.r3': '아이싱 컬러 차트: 젤별 방울 수',
  'gw.how-to-make-black-frosting.r4': '나만의 글레이즈 색 직접 섞기',

  /* ---------- how-to-make-brown-icing ---------- */
  'gw.how-to-make-brown-icing.lead':
    '갈색은 주방에서 가장 다정한 "어려운" 색입니다. 들어갈 문이 다섯 개라서: 코코아 파우더, 갈색 젤, 빨강+초록, 주황+파랑, 또는 에스프레소 한 잔. 각각 다른 갈색에 닿고, 아래 견본은 눈대중 사진이 아닌 계산 블렌드입니다.',
  'gw.how-to-make-brown-icing.ans': '따뜻한 베이커스 브라운',
  'gw.how-to-make-brown-icing.introH': '갈색이 실제로 무엇인가',
  'gw.how-to-make-brown-icing.i1':
    '갈색은 어두운 주황입니다. 빨강-노랑 계열의 밝기를 누르는 경로면 어디든 닿아서, "다른" 방법이 이렇게 많이 같은 계열에 떨어지는 이유입니다. 물감에서 빨강+초록이 갈색인 건 서로의 빛을 흡수하고 살아남는 흐릿한 따뜻한 잔여물 때문입니다.',
  'gw.how-to-make-brown-icing.i2':
    '탠과 베이지는 볼륨을 낮춘 같은 이야기입니다: 갈색을 흰색으로 당기기. 탠 아이싱을 원하면 아래 방법 아무거나 색을 4분의 1만 쓰면 이미 도착해 있습니다.',
  'gw.how-to-make-brown-icing.listH': '다섯 가지 방법',
  'gw.how-to-make-brown-icing.m1n': '코코아 파우더 (색 + 풍미)',
  'gw.how-to-make-brown-icing.m1s': '흰 아이싱에 코코아를 저으면: 색과 초콜릿 풍미가 함께, 색소 없이.',
  'gw.how-to-make-brown-icing.m1c1': '흰 아이싱',
  'gw.how-to-make-brown-icing.m1c2': '코코아 파우더',
  'gw.how-to-make-brown-icing.m1o':
    '컵당 1~2 큰 술로 시작하고 진하게 하려면 더하되, 설탕가루를 조금 줄여 보상하세요.',
  'gw.how-to-make-brown-icing.m2n': '갈색 젤 색소',
  'gw.how-to-make-brown-icing.m2s': '가장 통제되는 경로: 흰 아이싱에 갈색 젤, 방울 단위로 조정.',
  'gw.how-to-make-brown-icing.m2c1': '흰 아이싱',
  'gw.how-to-make-brown-icing.m2c2': '갈색 젤',
  'gw.how-to-make-brown-icing.m2o':
    '컵당 한 방울은 카라멜; 두세 방울이 초콜릿입니다. Wilton Brown과 Americolor Chocolate Brown이 흔한 튜브입니다. 더치 프로세스 코코아와 갈색 젤은 함께 써도 깔끔합니다.',
  'gw.how-to-make-brown-icing.m3n': '빨강 + 초록 젤',
  'gw.how-to-make-brown-icing.m3s': '색 이론의 답: 두 보색 젤이 서로를 갈색으로 상쇄.',
  'gw.how-to-make-brown-icing.m3c1': '흰 아이싱',
  'gw.how-to-make-brown-icing.m3c2': '빨강 젤',
  'gw.how-to-make-brown-icing.m3c3': '초록 젤',
  'gw.how-to-make-brown-icing.m3o':
    '빨강 안료는 초록 빛을, 초록 안료는 빨강 빛을 흡수하고; 되돌아오는 것은 은은한 따뜻한 갈색입니다. 두 젤을 대략 같게 하세요. 아니면 벽돌이나 올리브로 기웁니다.',
  'gw.how-to-make-brown-icing.m4n': '주황 + 파랑 젤',
  'gw.how-to-make-brown-icing.m4s': '다른 보색 쌍: 주황에 짧은 파랑으로 월넛 브라운.',
  'gw.how-to-make-brown-icing.m4c1': '흰 아이싱',
  'gw.how-to-make-brown-icing.m4c2': '주황 젤',
  'gw.how-to-make-brown-icing.m4c3': '파랑 젤',
  'gw.how-to-make-brown-icing.m4o':
    '파랑이 강하니 주황의 절반만. 파랑 쪽이면 회색으로, 주황 쪽이면 카라멜로 읽힙니다.',
  'gw.how-to-make-brown-icing.m5n': '에스프레소 (모카 경로)',
  'gw.how-to-make-brown-icing.m5s': '인스턴트 에스프레소를 흰 아이싱에: 어른 디저트용 풍미 우선 갈색.',
  'gw.how-to-make-brown-icing.m5c1': '흰 아이싱',
  'gw.how-to-make-brown-icing.m5c2': '에스프레소',
  'gw.how-to-make-brown-icing.m5o':
    '인스턴트 가루를 물 몇 방울에 먼저 녹이면 줄무늬가 덜 생깁니다. 컵당 두 작은 술은 모카 탠이고, 코코아 방법과 합치면 진지한 커피 갈색입니다.',
  'gw.how-to-make-brown-icing.t1t': '탠은 살짝 못 미친 갈색입니다.',
  'gw.how-to-make-brown-icing.t1b':
    '탠 아이싱은 위 방법 아무거나 색 4분의 1로, 또는 갈색 아이싱을 흰색으로 늘리세요. 탠, 베이지, 갈색은 한 계열이고 흰색 함량만 다릅니다.',
  'gw.how-to-make-brown-icing.t2t': '로열 아이싱은 마르며 어두워집니다.',
  'gw.how-to-make-brown-icing.t2b':
    '색을 판단하기 전에 유산지에 시험선을 짜고 20분을 주세요. 마른 로열은 그릇에서 보던 것보다 눈에 띄게 어둡고 따뜻합니다.',
  'gw.how-to-make-brown-icing.t3t': '용도에 맞는 갈색을 고르세요.',
  'gw.how-to-make-brown-icing.t3b':
    '진저브레드는 빨강 기운 갈색(빨강 젤 더), 초콜릿 샌드위치 쿠키는 짙은 코코아 쪽. 먼저 풍미로 방법을 고르고 젤로 미세 조정하세요.',
  'gw.how-to-make-brown-icing.f1q': '어떤 두 색이 갈색 아이싱을 만드나요?',
  'gw.how-to-make-brown-icing.f1a':
    '빨강+초록, 또는 주황+파랑: 보색 안료가 서로의 빛을 흡수하고 남은 것이 갈색입니다. 무색소 답은 코코아 파우더. 경로마다 카라멜부터 베이커스 초콜릿까지 조금씩 다른 갈색에 닿습니다.',
  'gw.how-to-make-brown-icing.f2q': '갈색 색소 없이 갈색 글레이즈를 만드는 법?',
  'gw.how-to-make-brown-icing.f2a':
    '코코아 파우더가 정답입니다: 컵당 1~2 큰 술이 색과 풍미를 한 번에. 백업은 동량의 빨강+초록 젤로 뺄셈으로 갈색을 만드는 것입니다.',
  'gw.how-to-make-brown-icing.f3q': '어떤 색이 탠 아이싱을 만드나요?',
  'gw.how-to-make-brown-icing.f3a':
    '갈색과 같은 색을 적게: 갈색은 어두운 주황이고 탠은 그 갈색을 흰색으로 당긴 것입니다. 젤을 4분의 1만 쓰거나, 완성된 갈색 아이싱을 흰색과 섞어 탠으로 읽힐 때까지 하세요.',
  'gw.how-to-make-brown-icing.f4q': '갈색 아이싱이 왜 회색으로 보이나요?',
  'gw.how-to-make-brown-icing.f4a':
    '안료가 너무 쌓여서: 파랑, 초록, 빨강이 쌓이면 모든 걸 흡수해 회색이 됩니다. 흰 베이스에서 다시 시작해 한 경로로 갈색을 쌓으세요.',
  'gw.how-to-make-brown-icing.f5q': '컵당 코코아를 얼마나 써야 하나요?',
  'gw.how-to-make-brown-icing.f5a':
    '컵당 한 큰 술은 밀크 초콜릿 갈색, 두 큰 술은 다크. 그 이상은 걸쭉해지고 퍼석해집니다; 액체 대신 설탕가루 한 술을 코코아와 바꾸세요.',
  'gw.how-to-make-brown-icing.r1': '어떤 색이 갈색을 만드나: 다섯 경로 계산',
  'gw.how-to-make-brown-icing.r2': '빨강과 초록으로 갈색 — 정확한 색 보기',
  'gw.how-to-make-brown-icing.r3': '갈색과 흰색으로 탠 만들기 (탠 아이싱 트릭)',
  'gw.how-to-make-brown-icing.r4': '검정 글레이즈 만들기',
  'gw.how-to-make-brown-icing.r5': '아이싱 컬러 차트: 젤별 방울 수',
};
