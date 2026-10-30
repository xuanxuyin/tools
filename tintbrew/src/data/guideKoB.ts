/**
 * Guide long-copy dictionary, ko — scenario pages, second half
 * (the two chart pages + what-colors-make blue/red/black/maroon/peach/
 * turquoise) plus the 8 shared gel-row notes. Keys mirror the en generator
 * in i18n.test.ts exactly (`gw.<slug>.<field>`); a guard test fails if
 * either side drifts.
 */
export const SCENARIO_KO_B: Record<string, string> = {
  /* ---------- shared gel notes (both chart pages) ---------- */
  'gw.gel.red.n': '가장 다루기 어려운 젤: 진한 빨강은 방울을 더해서가 아니라 시간이 걸어서 나옵니다.',
  'gw.gel.yellow.n': '제일 먼저 바닥나는 튜브; 따뜻한 레시피마다 노랑이 더 들어가려 합니다.',
  'gw.gel.orange.n': '한 방울이면 복숭아·살구 쪽으로 흘러갑니다.',
  'gw.gel.green.n': '켈리 그린은 차가운 편; 잎새 그린을 원하면 노랑을 살짝.',
  'gw.gel.blue.n': '네 방울 위로는 네이비 영역에 가까워집니다.',
  'gw.gel.purple.n': '버터크림의 노란 바탕에서 바이올렛은 핑크 쪽으로 끌립니다.',
  'gw.gel.brown.n': '한 방울은 카라멜; 여덟 방울은 다크 초콜릿.',
  'gw.gel.black.n': '눈금 최상단까지 가야 합니다 — 아니면 처음부터 초콜릿으로 시작하세요.',

  /* ---------- icing-color-chart ---------- */
  'gw.icing-color-chart.lead':
    '아이싱 컬러 차트 대부분은 사진이고, 사진은 거짓말을 합니다: 조명도 치우치고 프린터도 치우치고 배치도 치우칩니다. 이 차트는 계산입니다. 젤 색을 고르고 설탕 아이싱 한 컵당 방울 수를 세면, 색 견본이 그릇에서 실제로 보일 정확한 색이고 HEX 코드까지 붙어 있어 무엇이든 대조할 수 있습니다.',
  'gw.icing-color-chart.hero': '하얀 로열 아이싱에 빨강 젤 4방울',
  'gw.icing-color-chart.introH': '이 차트를 읽는 법',
  'gw.icing-color-chart.listH': '컬러 차트: 하얀 아이싱 한 컵, 1~8방울',
  'gw.icing-color-chart.ci1':
    '젤과 액체부터 짚고 넘어갑니다 — 방울이라는 단위는 젤에만 의미가 있어서입니다. 액체 색소는 물에 녹인 염료입니다; 한 "방울"로는 컵 하나를 물들이기 어렵고, 효과가 있는 양을 넣으면 아이싱이 수프가 됩니다. 젤은 농축 페이스트라 한 방울이 아래 전체의 통용 단위입니다.',
  'gw.icing-color-chart.ci2':
    '눈금은 이렇게 읽으세요: 컵당 한 방울은 파스텔(웰컴 파티 영역), 두 방울은 클래식 생일 케이크 색, 네 방울은 보석 톤, 여덟 방울은 짙은 색 — 아이싱이 감당할 수 있는 근처까지. 견본은 바탕과 젤의 지각적 혼합이라, 채널 수학이 아니라 이 혼합이 여러분 눈에 보이는 모습입니다.',
  'gw.icing-color-chart.ci3':
    '브랜드 참고: 윌턴(Wilton)의 이쑤시개식과 아메리컬러(Americolor)의 병 짜기식은 방울 크기가 조금 다릅니다. 아래 방울 수는 모두 ±20% 근사치로 보고, 전체 그릇에 붓기 전에 소량으로 먼저 시험하세요.',
  'gw.icing-color-chart.base': '하얀 로열 아이싱',
  'gw.icing-color-chart.baseB':
    '출발점: 색을 더하기 전의 바닐라 로열 아이싱. 거의 순백에 바닐라와 말린 달걀 흰자가 주는 옅은 따뜻함이 살짝 겹쳐 있습니다.',
  'gw.icing-color-chart.t1t': '색은 20분에 걸쳐 발전합니다.',
  'gw.icing-color-chart.t1b':
    '젤은 섞은 뒤에도 계속 "피어나고", 로열 아이싱은 마르면 젖었을 때보다 짙어 보입니다. 먼저 저어라, 기다려라, 그다음 조정; 즉시 조정하러 달려드는 게 사람들이 과잉으로 가는 전형적인 이유입니다.',
  'gw.icing-color-chart.t2t': '짙은 색은 방울이 아니라 휴식입니다.',
  'gw.icing-color-chart.t2b':
    '빨강과 검정은 특히 그렇습니다. 차트상 이미 짙은 구간인데도 연해 보이면, 젤을 더하기 전에 시간(또는 하룻밤)을 주세요.',
  'gw.icing-color-chart.t3t': '컵으로 재고, 배수하세요.',
  'gw.icing-color-chart.t3b':
    '방울 수는 아이싱 컵당입니다. 두 컵이면 두 배; 비율만 지키면 위의 모든 견본이 그대로 적용됩니다.',
  'gw.icing-color-chart.t4t': '먼저 작은 그릇에서 시험하세요.',
  'gw.icing-color-chart.t4b':
    '아이싱 한 술을 떠서 물들이고, 한 줄 짜서 말리고, 차트에 대보세요. 여덟 방울이 두 방울 많았다는 걸 나중에 발견하는 것보다 훨씬 쌉니다.',
  'gw.icing-color-chart.f1q': '아이싱 컵당 젤 색소를 몇 방울 넣나요?',
  'gw.icing-color-chart.f1a':
    '한 방울 파스텔, 두 방울 클래식 중간색, 네 방울 짙은 보석 톤, 여덟 방울 이상이 포화에 가까운 색(짙은 빨강, 검정류). 위 차트가 방울마다의 정확한 착지점을 보여줍니다.',
  'gw.icing-color-chart.f2q': '아이싱에 젤과 액체 색소의 차이는요?',
  'gw.icing-color-chart.f2a':
    '농도입니다. 액체 색소는 대부분 물이라 단단한 아이싱 한 컵을 물들이려면 숟가락 몇 개가 필요하고, 아이싱은 그대로 수프가 됩니다. 젤은 농축 페이스트라 방울이 작업 단위이고 농도는 거의 그대로입니다.',
  'gw.icing-color-chart.f3q': '처음 사야 할 젤은 무엇인가요?',
  'gw.icing-color-chart.f3a':
    '빨강, 노랑, 파랑, 초록이 혼합의 기본을 덮고, 검정과 갈색이 힘든 짙은색 만들기를 대신해줍니다. 차트의 나머지 색은 전부 이 여섯 개에서 나옵니다.',
  'gw.icing-color-chart.f4q': '윌턴과 아메리컬러의 방울 크기는 같나요?',
  'gw.icing-color-chart.f4a':
    '비슷하지만 다릅니다: 윌튼 통은 이쑤시개로 찍는 방식, 아메리컬러 병은 짜서 떨어뜨리는 방식. 실제 방울 수는 서로 20% 안팎 차이니 저어서, 차트에 대보고, 미세 조정하세요.',
  'gw.icing-color-chart.f5q': '어떤 색이든 파스텔 버전으로 만드는 법은?',
  'gw.icing-color-chart.f5a':
    '컵당 한 방울만 쓰거나, 색이 없는 아이싱으로 읽히는 만큼만 늘리세요. 파스텔은 하얗게 당겨진 짙은 색이고 한 방울이 보통 이미 그 자리입니다.',
  'gw.icing-color-chart.r1': '버터크림 컬러 차트 (버터가 모든 걸 따뜻하게 미는 이유)',
  'gw.icing-color-chart.r2': '갈색 아이싱 만들기: 다섯 가지 방법',
  'gw.icing-color-chart.r3': '검정 글레이즈 만들기',
  'gw.icing-color-chart.r4': '믹서에서 커스텀 색 직접 섞기',

  /* ---------- buttercream-color-chart ---------- */
  'gw.buttercream-color-chart.lead':
    '버터크림은 하얀색에서 시작하는 적이 없습니다. 버터 노랑에서 시작하고, 이것이 섞어 넣는 모든 색을 바꿉니다: 파랑은 틸로, 핑크는 코랄로, "하얀색"은 크림색으로 흘러갑니다. 이 차트는 진짜 아메리칸 버터크림 바탕에서 출발하고, 견본은 믹싱볼을 떠날 때 실제로 보게 될 색입니다 — 표백된 시연 글레이즈의 연기가 아닙니다.',
  'gw.buttercream-color-chart.hero': '아메리칸 버터크림에 빨강 젤 4방울',
  'gw.buttercream-color-chart.introH': '이 차트를 읽는 법',
  'gw.buttercream-color-chart.listH': '컬러 차트: 아메리칸 버터크림 한 컵, 1~8방울',
  'gw.buttercream-color-chart.ci1':
    '옐로 시프트가 버터크림 색의 이야기 전부입니다. 버터와 바닐라가 바탕을 아이보리로 물들이므로 아래 모든 혼합은 사실 "젤 색 + 노랑 약간"입니다. 같은 방울 수가 로열 차트보다 따뜻하게 읽히는 이유입니다: 파랑은 틸로, 보라는 연보라-핑크 쪽으로, 이 바탕에서 순수한 파스텔은 존재하지 않습니다.',
  'gw.buttercream-color-chart.ci2':
    '더 맑고 차가운 색이 필요하면 먼저 바탕을 하얗게 만드세요: 버터를 하얘질 때까지 5분 더 휘핑하고, 갈색 바닐라 대신 투명 바닐라를 쓰고, 더 하얀 버터크림(스위스·이탈리안식, 또는 쇼트닝 일부 치환)을 만드세요. 하얀색으로 한 걸음씩 갈수록 이 차트의 정확도를 한 조각씩 되찾습니다.',
  'gw.buttercream-color-chart.ci3':
    '로열과의 실무적 차이 하나: 지방은 색을 고르고 너그럽게 실어 나르므로, 버터크림이 오히려 짙은색을 내기 쉬운 매체입니다. 같은 1-2-4-8 방울 눈금이 적용되고, 다만 차트보다 예상보다 부드럽게 나올 때 방울 하나의 여유를 두세요.',
  'gw.buttercream-color-chart.base': '아메리칸 버터크림',
  'gw.buttercream-color-chart.baseB':
    '출발점: 버터와 설탕가루에 바닐라를 휘핑한 것. 하얀색이 아닙니다: 버터 느낌의 아이보리고, 아래 모든 색이 이것을 통과해야 합니다.',
  'gw.buttercream-color-chart.t1t': '색을 더하기 전에 버터부터 휘핑하세요.',
  'gw.buttercream-color-chart.t1b':
    '버터를 5분 더 휘핑하면 눈에 띄게 하얘집니다. 출발점이 밝을수록 위 모든 견본이 더 정확하게 떨어집니다.',
  'gw.buttercream-color-chart.t2t': '투명 바닐라를 쓰세요.',
  'gw.buttercream-color-chart.t2b':
    '일반 바닐라는 갈색이라 색을 입힙니다. 투명 바닐라는 밝은 버터크림을 위해 존재합니다; 가장 싼 한 단계 밝히기입니다.',
  'gw.buttercream-color-chart.t3t': '너무 짙어진 색은 플레인 버터크림으로 구하세요.',
  'gw.buttercream-color-chart.t3b':
    '색이 차트 범위를 넘어가면 색 없는 버터크림으로 늘리세요, 흰색 색소로 되돌리려 하지 말고. 비율이 돌아오고 농도도 삽니다.',
  'gw.buttercream-color-chart.t4t': '일광 아래에서 대조하세요.',
  'gw.buttercream-color-chart.t4b':
    '주방 스포트라이트는 따뜻한 색을 미화하고 파랑에 거짓말을 합니다. 북쪽 창이나 흐린 날의 일광이 차트의 HEX 코드가 실제로 맞는 곳입니다.',
  'gw.buttercream-color-chart.f1q': '왜 내 버터크림 색이 차트나 사진과 다른가요?',
  'gw.buttercream-color-chart.f1a':
    '관습적 범인 둘: 노란 바탕과 조명. 버터의 아이보리가 모든 젤을 따뜻하게 밀고 실내 조명이 한 번 더 민 것입니다. 버터를 더 하얗게, 투명 바닐라로, 일광 아래에서 비교하고, 그다음 방울 수를 조정하세요.',
  'gw.buttercream-color-chart.f2q': '하얀 버터크림은 어떻게 만드나요?',
  'gw.buttercream-color-chart.f2a':
    '버터를 오래 휘핑해 하얗게, 투명 바닐라로 교체, 아이보리를 받아들이기; 또는 더 하얀 바탕으로: 스위스·이탈리안 버터크림, 일부를 쇼트닝으로 바꾼 아메리칸식. 순수 버터로 눈처럼 하얀 색은 존재하지 않습니다.',
  'gw.buttercream-color-chart.f3q': '버터크림 컵당 젤을 몇 방울인가요?',
  'gw.buttercream-color-chart.f3a':
    '로열과 같은 1-2-4-8 눈금: 한 방울 파스텔, 두 방울 중간, 네 방울 짙은 색, 여덟 방울 포화. 지방이 색을 조금 먹으므로 정밀도가 중요한 날에는 로열 차트보다 한 방울 여유를 잡으세요.',
  'gw.buttercream-color-chart.f4q': '같은 젤을 퐁당에 써도 되나요?',
  'gw.buttercream-color-chart.f4a':
    '됩니다. 젤을 퐁당에 저어 섞기보다 반죽에 치대서 넣으세요. 색이 버터크림보다 빨리 짙어지므로 방울 눈금의 낮은 쪽에서 시작하세요.',
  'gw.buttercream-color-chart.f5q': '세이지 그린, 뮤트 블루 같은 커스텀 색은 어떻게?',
  'gw.buttercream-color-chart.f5a':
    '차트에서 가장 가까운 색에서 출발해 이웃 색이나 보색 한 꼬집으로 걸어가세요: 세이지는 초록+노랑 약간+검정, 뮤트 블루는 파랑+주황 한 자락. 믹서가 같은 산술을 실시간으로 합니다.',
  'gw.buttercream-color-chart.r1': '아이싱 컬러 차트 (더 하얀 바탕 버전)',
  'gw.buttercream-color-chart.r2': '검정 글레이즈 만들기',
  'gw.buttercream-color-chart.r3': '믹서에서 커스텀 색 직접 섞기',
  'gw.buttercream-color-chart.r4': '모든 HEX를 RGB나 HSL로',

  /* ---------- what-colors-make-blue ---------- */
  'gw.what-colors-make-blue.lead':
    '파랑은 물감의 원색입니다 — 즉 어떤 색 조합도 그 위에 떨어지지 않는다는 뜻이고, 보신 모든 "레시피"가 내놓는 것은 회색빛 인디고나 잿빛입니다. 아래는 그 점을 증명하는 산술을 견본마다 실제로 계산한 것과, 네이비나 스카이 블루가 정말 필요할 때 작동하는 어둡히고 밝히는 경로입니다.',
  'gw.what-colors-make-blue.ans': '진짜 파랑 — 섞어낼 수 있는 혼합이 아니라 시작점인 원색',
  'gw.what-colors-make-blue.introH': '왜 아무 것도 파랑을 섞어내지 못하는가',
  'gw.what-colors-make-blue.i1':
    '물감은 빛을 흡수해서 작동합니다. 원색 파랑은 눈이 파랑으로 읽는 구간을 반사하고 나머지 대부분을 흡수합니다 — 두 물감의 잔여물이 그 구간을 정확히 더해내는 조합은 존재하지 않습니다. 가장 많이 추천되는 보라+초록 레시피는 계산상 잿빛 보라 진창인데, 둘이 합치면 거의 모든 걸 흡수하고 흐릿한 무채색 잔여물만 남기 때문입니다.',
  'gw.what-colors-make-blue.i2':
    '화면은 정반대입니다: 빛을 더하고, 파랑 역시 빛의 원색입니다. 그래서 물감을 섞든 빛을 섞든 파랑은 시작으로 쓰는 것입니다. 혼합이 할 수 있는 일은 이미 있는 파랑을 옮기는 것 — 네이비로 어둡히고, 스카이 블루로 밝히고 — 이것이 이 페이지의 실용적인 절반입니다.',
  'gw.what-colors-make-blue.listH': '닿지 못하는 경로들, 전부 실제 계산',
  'gw.what-colors-make-blue.m1n': '보라 + 초록 (유행 레시피)',
  'gw.what-colors-make-blue.m1s': '대부분의 사이트가 추천하는 조합 — 정직하게 계산하면 잿빛 보라에 떨어집니다.',
  'gw.what-colors-make-blue.m1c1': '보라',
  'gw.what-colors-make-blue.m1c2': '초록',
  'gw.what-colors-make-blue.m1o':
    '각 물감이 상대가 반사하는 빛을 상쇄합니다. 위 견본이 실제 착지점입니다 — 회색빛 연보라로, 파랑과는 멉니다. 증명이지 레시피가 아닙니다.',
  'gw.what-colors-make-blue.m2n': '보라 + 검정 (가장 가까운 한 번)',
  'gw.what-colors-make-blue.m2s': '보라를 어둡히면 인디고 쪽으로 흘러갑니다 — 어떤 혼합보다 파랑에 가까운 한 번.',
  'gw.what-colors-make-blue.m2c1': '보라',
  'gw.what-colors-make-blue.m2c2': '검정',
  'gw.what-colors-make-blue.m2o':
    '이것은 미드나잇 블루-보라로 읽힙니다 — 짙은 그림자 색으로는 충분히 자격이 있지만, 진짜 파랑 옆에 두면 보라 성향이 즉시 드러납니다.',
  'gw.what-colors-make-blue.m3n': '파랑 + 검정 (작동하는 경로: 어둡히기)',
  'gw.what-colors-make-blue.m3s': '진짜 파랑에서 시작해 어둡히기 — 네이비의 실제 레시피.',
  'gw.what-colors-make-blue.m3c1': '파랑',
  'gw.what-colors-make-blue.m3c2': '검정',
  'gw.what-colors-make-blue.m3o':
    '이것이 "무슨 색이 네이비를 만드나"의 정직한 답입니다: 파랑에, 소량씩 나눈 검정. 전체 비율 표는 파랑과 검정 페이지에 있습니다.',
  'gw.what-colors-make-blue.t1t': '파랑은 사고, 계열은 섞으세요.',
  'gw.what-colors-make-blue.t1b':
    '울트라마린, 코발트, 프탈로 블루 라벨이 붙은 튜브는 모두 원색 구매입니다. 그 한 튜브에서 네이비(검정+), 스카이 블루(흰색+), 틸(초록+), 페리윙클(보라+)까지 갈 수 있습니다 — 혼합은 구매 후에 일어납니다, 전에가 아닙니다.',
  'gw.what-colors-make-blue.t2t': '따뜻한 파랑과 차가운 파랑.',
  'gw.what-colors-make-blue.t2b':
    '울트라마린은 보라 쪽(따뜻), 프탈로는 초록 쪽(차가움)으로 기웁니다. 가려는 계열에 맞춰 바탕을 고르세요 — 나중에 보색과 성향 싸움을 하는 일을 피합니다.',
  'gw.what-colors-make-blue.t3t': '아이싱은 다릅니다.',
  'gw.what-colors-make-blue.t3b':
    '아이싱은 하얀 바탕에서 시작하므로 그곳의 "파랑 만들기"는 하얀에 파랑 젤을 떨어뜨리는 일입니다 — 혼색 이론이 아니라 방울 수 문제. 버터크림 차트가 정확한 방울로 풉니다.',
  'gw.what-colors-make-blue.f1q': '어떤 두 색이 파랑을 만드나요?',
  'gw.what-colors-make-blue.f1a':
    '없습니다. 파랑은 물감과 빛 양쪽의 원색이라 어떤 두 색도 섞어서 만들 수 없습니다 — 유행하는 보라+초록 레시피는 계산상 잿빛 보라이고, 위 견본이 증명입니다. 파랑 색소에서 시작해 거기서부터 섞으세요.',
  'gw.what-colors-make-blue.f2q': '무슨 색이 네이비를 만드나요?',
  'gw.what-colors-make-blue.f2a':
    '파랑에 소량의 검정. 검정은 조금씩 나눠 넣으세요 — 감으로 4분의 1의 검정이 이미 네이비로 읽히고, 조금 더하면 미드나잇 블루입니다. 전체 비율 걸음마는 파랑과 검정 페이지에.',
  'gw.what-colors-make-blue.f3q': '무슨 색이 연한 파랑이나 스카이 블루를 만드나요?',
  'gw.what-colors-make-blue.f3a':
    '파랑에 흰색. 흰색은 소량으로도 파랑을 빠르게 스카이 블루와 파스텔 블루로 끌어올리므로 단계적으로 넣으세요. 초록 한 자락이 스카이 블루를 터콰이즈 계열로 데려갑니다.',
  'gw.what-colors-make-blue.f4q': '무슨 색이 파란 아이싱을 만드나요?',
  'gw.what-colors-make-blue.f4a':
    '아이싱은 방울 수 문제입니다: 하얀 버터크림에서 시작해 파랑 젤을 한 번에 한 방울씩. 두 방울이 파스텔로 읽히고 네다섯 방울이 중간 파랑입니다 — 버터크림 차트가 단계마다 정확한 방울 수를 나열합니다.',
  'gw.what-colors-make-blue.r1': '파랑과 검정: 네이비 비율 표',
  'gw.what-colors-make-blue.r2': '파랑과 흰색으로 스카이 블루',
  'gw.what-colors-make-blue.r3': '파랑과 초록으로 틸',
  'gw.what-colors-make-blue.r4': '모든 컬러 가이드',

  /* ---------- what-colors-make-red ---------- */
  'gw.what-colors-make-red.lead':
    '빨강은 물감의 원색입니다: 파랑, 노랑과 마찬가지로, 섞어서 만드는 것이 아니라 사는 물감입니다. 혼합이 줄 수 있는 것은 빨강 둘레의 계열 — 코랄, 라즈베리, 마룬, 러스트입니다. 아래는 그 혼합들의 정직한 계산과, 사람들이 검색하는 빨강 계열을 실제로 만들어내는 경로입니다.',
  'gw.what-colors-make-red.ans': '진짜 빨강 — 다른 모든 빨강을 섞는 출발점',
  'gw.what-colors-make-red.introH': '왜 빨강은 섞이지 않는가',
  'gw.what-colors-make-red.i1':
    '원색 빨강 물감은 눈이 빨강으로 읽는 긴 파장을 반사하고 나머지를 흡수합니다. 어떤 두 물감의 잔여물도 그 파장을 조립해내지 못합니다 — 그래서 원색입니다. 빨강을 섞을 수 있다는 레시피(마젠타+노랑)는 모두 조용히 이미 마젠타를 갖고 있다고 가정하는데, 마젠타는 또 다른 빨강 계열 원색일 뿐입니다.',
  'gw.what-colors-make-red.i2':
    '혼합이 정말 잘하는 일은 빨강을 자기 계열 안에서 옮기는 것입니다: 흰색은 핑크 쪽으로, 검정은 마룬 쪽으로, 보색은 러스트와 테라코타 쪽으로 민니다. 이 경로들은 실제이고 아래에 전부 계산되어 있으며, "무슨 색이 X 빨강을 만드나" 질문의 거의 전부를 덮습니다.',
  'gw.what-colors-make-red.listH': '가장 가까운 혼합들, 전부 실제 계산',
  'gw.what-colors-make-red.m1n': '핑크 + 주황 (코랄 경로)',
  'gw.what-colors-make-red.m1s': '혼합이 빨강에 가장 가까워지는 한 번 — 빨강과 애매한 따뜻한 코랄.',
  'gw.what-colors-make-red.m1c1': '핑크',
  'gw.what-colors-make-red.m1c2': '주황',
  'gw.what-colors-make-red.m1o':
    '주황을 누르고 핑크를 올리면 혼합은 빨강 쪽으로 걸어갑니다 — 하지만 코랄-베리 부근에서 멈춥니다. 쓸모 있는 색, 정직한 라벨: 빨강은 아닙니다.',
  'gw.what-colors-make-red.m2n': '핑크 + 갈색 (라즈베리 경로)',
  'gw.what-colors-make-red.m2s': '갈색으로 핑크를 어둡히면 라즈베리에 떨어집니다 — 더 어두운 쪽의 아깝게 한 번.',
  'gw.what-colors-make-red.m2c1': '핑크',
  'gw.what-colors-make-red.m2c2': '갈색',
  'gw.what-colors-make-red.m2o':
    '갈색은 어두운 주황이므로 이것은 핑크가 자기 계열로 어두워진 것입니다. 결과는 라즈베리-베리로 읽힙니다 — "빨강 튜브가 없을 때의 빨강 계열"의 자연스러운 착지점.',
  'gw.what-colors-make-red.m3n': '빨강 + 흰색 (작동하는 경로: 밝히기)',
  'gw.what-colors-make-red.m3s': '진짜 빨강에서 출발하면 흰색이 완전히 통제되는 핑크 계열을 줍니다.',
  'gw.what-colors-make-red.m3c1': '빨강',
  'gw.what-colors-make-red.m3c2': '흰색',
  'gw.what-colors-make-red.m3o':
    '이것이 "무슨 색이 핑크를 만드나"의 정직한 답입니다: 빨강에, 밝히기. 반반이 이미 버블검 핑크이고 흰색을 줄이면 연어-로즈 핑크입니다. 전체 비율 표는 빨강과 흰색 페이지에.',
  'gw.what-colors-make-red.t1t': '한 튜브로 계열 전체.',
  'gw.what-colors-make-red.t1b':
    '카드뮴 레드나 나프톨 레드 한 튜브에 흰색(핑크), 검정(마룬), 주황(스칼릿), 보색인 초록(러스트, 테라코타)을 더하면 빨강 계열이 덮입니다. 원색은 사고; 그다음의 모든 것은 섞는 것입니다.',
  'gw.what-colors-make-red.t2t': '선명한 빨강 아이싱은 젤 문제입니다.',
  'gw.what-colors-make-red.t2b':
    '짙은 빨강 아이싱은 악명 높게 힘듭니다 — 빨강 젤 한 병과 하룻밤 휴식이 필요하고 색은 앉아서 피어납니다. 방울 수는 아이싱 차트에; 인내심은 당신 몫입니다.',
  'gw.what-colors-make-red.t3t': '마룬과 버건디는 한 걸음 차이.',
  'gw.what-colors-make-red.t3b':
    '마룬은 빨강을 갈색이나 검정으로 어둡힌 것이고, 버건디는 빨강을 보라 쪽으로 당긴 것입니다. 두 경로 모두 마룬 페이지에 계산되어 있습니다 — 두 번째 원색은 필요 없습니다.',
  'gw.what-colors-make-red.f1q': '어떤 두 색이 빨강을 만드나요?',
  'gw.what-colors-make-red.f1a':
    '없습니다 — 빨강은 원색 물감입니다. 핑크+주황은 코랄에서, 핑크+갈색은 라즈베리에서 멈춥니다; 위의 두 견본이 실제 계산 증명입니다. 빨강 색소에서 시작해 바깥으로 섞으세요.',
  'gw.what-colors-make-red.f2q': '무슨 색이 짙은 빨강이나 마룬을 만드나요?',
  'gw.what-colors-make-red.f2a':
    '빨강에 갈색 약간, 또는 빨강에 검정 약간. 동량의 빨강+갈색은 벽돌 빨강에 떨어지고, 검정을 조금 더하면 마룬입니다. 세 경로의 걸음마는 모두 마룬 페이지에.',
  'gw.what-colors-make-red.f3q': '무슨 색이 핑크를 만드나요?',
  'gw.what-colors-make-red.f3a':
    '빨강과 흰색. 동량이 버블검 핑크이고 흰색을 줄이면 연어-로즈 핑크입니다. 핑크는 빨강의 틴트라 다른 경로가 필요 없습니다 — 비율은 빨강과 흰색 페이지에.',
  'gw.what-colors-make-red.f4q': '무슨 색이 빨간 아이싱을 만드나요?',
  'gw.what-colors-make-red.f4a':
    '하얀 아이싱에 강한 용량의 빨강 젤: 파스텔 빨강은 두세 방울, 트루 레드는 여덟 방울 이상일 수 있고, 짙은 빨강은 피어나도록 하룻밤 쉬어야 합니다. 방울 표는 아이싱 차트에.',
  'gw.what-colors-make-red.r1': '무슨 색이 마룬을 만드나',
  'gw.what-colors-make-red.r2': '빨강과 흰색으로 핑크',
  'gw.what-colors-make-red.r3': '빨강과 초록으로 갈색 — 보색의 한 수업',
  'gw.what-colors-make-red.r4': '모든 컬러 가이드',

  /* ---------- what-colors-make-black ---------- */
  'gw.what-colors-make-black.lead':
    '순수한 검정은 물감 혼합이 늘 아득하게 못 미치는 색입니다 — 물감을 쌓을수록 나오는 것은 진한 잿빛이지 공허가 아닙니다. 하지만 이런 근사 검정은 실제로 유용하고, 각 경로마다 온도가 있습니다: 삼원색 블렌드는 교과서 답이고, 보색 쌍은 따뜻한 버전과 차가운 버전을 줍니다. 아래 전부 실제 계산.',
  'gw.what-colors-make-black.ans': '전력 혼합이 도달하는 가장 깊은 곳 — 부드러운 잿빛',
  'gw.what-colors-make-black.introH': '왜 섞은 검정은 늘 근사 검정인가',
  'gw.what-colors-make-black.i1':
    '물감은 빛을 흡수하고, 완벽한 검정은 모든 걸 흡수해야 합니다. 실제 물감은 저마다 몇 파장씩 새어 나가게 하므로 혼합할 때마다 색이 조금씩 샙니다 — 아래 가장 깊은 혼합도 여전히 살짝 보라빛입니다. 실패가 아닙니다; 화가들은 이 혼합에 돈을 내고 이름도 있습니다 — 중성 틴트.',
  'gw.what-colors-make-black.i2':
    '기억할 메커니즘 두 개: 삼원색은 흡수 삼 겹을 쌓는 것이고, 보색 쌍(빨강+초록, 파랑+주황)은 같은 방식으로 색조를 상쇄합니다. 상업적 답 — 카본 블랙, 마스 블랙 안료 — 은 그을음을 유에 갈아 넣은 것이라 진짜 중성이고 진짜 쌉니다.',
  'gw.what-colors-make-black.listH': '각 경로, 전부 실제 계산',
  'gw.what-colors-make-black.m1n': '삼원색 전부',
  'gw.what-colors-make-black.m1s': '빨강 + 노랑 + 파랑: 교실 답, 따뜻한 보라빛 잿빛에 떨어집니다.',
  'gw.what-colors-make-black.m1c1': '빨강',
  'gw.what-colors-make-black.m1c2': '노랑',
  'gw.what-colors-make-black.m1c3': '파랑',
  'gw.what-colors-make-black.m1o':
    '작동하지만 가장 통제하기 어렵습니다 — 비율의 작은 변화가 온기를 오갑니다. 실제 계산 착지점은 회색빛 보라-탠으로, 대부분이 예상보다 한 단계 따뜻합니다.',
  'gw.what-colors-make-black.m2n': '빨강 + 초록 (따뜻한 근사 검정)',
  'gw.what-colors-make-black.m2s': '보색 쌍이 색조를 상쇄하고 올리브 기운의 따뜻한 짙은 색을 남깁니다.',
  'gw.what-colors-make-black.m2c1': '빨강',
  'gw.what-colors-make-black.m2c2': '초록',
  'gw.what-colors-make-black.m2o':
    '초록에 이미 노랑이 들어 있어 이 경로는 따뜻하게 떨어집니다 — 잿빛이 아니라 어스-초콜릿 영역. 검정이 어스 톤 옆에 앉아야 할 때 쓰세요.',
  'gw.what-colors-make-black.m3n': '빨강 + 초록 + 파랑 (가장 깊은 혼합)',
  'gw.what-colors-make-black.m3s': '노랑을 파랑으로 바꾸면: 이 페이지에서 가장 깊고 가장 중성에 가까운 혼합.',
  'gw.what-colors-make-black.m3c1': '빨강',
  'gw.what-colors-make-black.m3c2': '초록',
  'gw.what-colors-make-black.m3c3': '파랑',
  'gw.what-colors-make-black.m3o':
    '파랑이 노랑이 새어 나가게 하던 부분을 흡수합니다. 이것이 실용적인 "섞은 검정"입니다 — 차가운 성향의 부드러운 잿빛이고, 이 페이지의 혼합 중 가장 중성에 가깝습니다.',
  'gw.what-colors-make-black.t1t': '섞을 때와 살 때.',
  'gw.what-colors-make-black.t1b':
    '검정이 화면과 어울려야 할 때 섞으세요 — 살짝 온도 성향이 그림자를 장면에 붙입니다. 덮는 힘과 중성이 필요하면 카본 블랙을 사세요: 선반에서 가장 싼 물감 중 하나입니다.',
  'gw.what-colors-make-black.t2t': '회색은 이 페이지에 흰색을 더한 것.',
  'gw.what-colors-make-black.t2b':
    '위의 모든 근사 검정에 흰색을 더하면 같은 온도의 회색이 나옵니다 — 빨강+초록 경로는 따뜻한 회색, 삼색 블렌드는 차가운 회색. 비율 걸음마는 검정과 흰색 페이지에.',
  'gw.what-colors-make-black.t3t': '검정 아이싱은 물리가 따로 있습니다.',
  'gw.what-colors-make-black.t3b':
    '버터크림은 하얀색에서 시작하므로 검정 글레이즈는 하얀에 젤을 부어 넣는다는 뜻입니다 — 하양이 아니라 초콜릿에서 시작하세요, 안 그러면 방울 수가 가혹해집니다. 전체 방법은 검정 글레이즈 페이지에.',
  'gw.what-colors-make-black.f1q': '무슨 색이 검정을 만드나요?',
  'gw.what-colors-make-black.f1a':
    '삼원색(빨강, 노랑, 파랑) 블렌드는 따뜻한 잿빛을, 빨강+초록 같은 보색 쌍은 더 깊고 따뜻한 버전을 냅니다. 이 페이지의 가장 깊은 혼합은 빨강+초록+파랑입니다. 진짜 중성 검정은 혼합이 아니라 탄소 안료에서 나옵니다.',
  'gw.what-colors-make-black.f2q': '무슨 색이 검은 물감을 만드나요?',
  'gw.what-colors-make-black.f2a':
    '아크릴이나 유화: 빨강+초록+파랑 혼합이 통제된 부드러운 검정을 줍니다; 상품 튜브는 카본 블랙이나 마스 블랙 안료로, 중성이고 불투명합니다. 섞은 검정은 그림자 색으로 가장 빛나는데, 살짝 기운이 화면을 하나로 묶어주기 때문입니다.',
  'gw.what-colors-make-black.f3q': '무슨 색이 회색을 만드나요?',
  'gw.what-colors-make-black.f3a':
    '위의 근사 검정 경로 아무거나에 흰색 — 검정과 흰색 동량은 중간 회색입니다. 따뜻한 회색은 빨강+초록 경로에서, 차가운 회색은 삼색 경로에서 나옵니다.',
  'gw.what-colors-make-black.f4q': '무슨 색이 검은 아이싱을 만드나요?',
  'gw.what-colors-make-black.f4a':
    '하양이 아니라 초콜릿 버터크림에서 시작하세요 — 짙은 바탕이 검정 젤을 훨씬 적게 들게 합니다. 검정 젤을 더하고 쉬세요: 검은 글레이즈는 한 시간 동안 계속 짙어집니다. 전체 방법은 검정 글레이즈 페이지에.',
  'gw.what-colors-make-black.r1': '검정과 흰색으로 회색',
  'gw.what-colors-make-black.r2': '검정 글레이즈 만들기',
  'gw.what-colors-make-black.r3': '빨강과 초록: 보색 상쇄',
  'gw.what-colors-make-black.r4': '모든 컬러 가이드',

  /* ---------- what-colors-make-maroon ---------- */
  'gw.what-colors-make-maroon.lead':
    '마룬은 어둡히고 살짝 눌린 빨강입니다 — 공식적으로는 갈색빛 깊은 빨강이라, 가장 단순한 레시피는 빨강+갈색입니다. 원하는 마룬의 맛에 따라 유용한 경로가 세 개 있습니다: 벽돌, 클래식 마룬, 또는 보라 쪽인 버건디. 세 개 전부 아래에 실제 계산.',
  'gw.what-colors-make-maroon.ans': '깊은 갈색빛 빨강',
  'gw.what-colors-make-maroon.introH': '마룬이 실제로 무엇인가',
  'gw.what-colors-make-maroon.i1':
    '서류상 마룬은 깊은 갈색빛 빨강입니다 — 벽돌, 소고기피, 대학 후디 색을 떠올리세요. 빨강과 갈색 사이의 어둡힘 축에 앉으므로, 빨강을 자기 계열(갈색, 또는 검정 약간)로 어둡히는 것이 가장 깔끔한 경로입니다. 보라 쪽으로 당기면 버건디로 미끄러지는데, 마룬의 더 차가운 사촌입니다.',
  'gw.what-colors-make-maroon.i2':
    '아래 세 경로의 차이는 전부 그 성향에 있습니다. 목적지에 따라 고르세요: 벽돌-러스트는 갈색 쪽, 깊은 경로는 후디 마룬, 보라 경로는 와인 톤.',
  'gw.what-colors-make-maroon.listH': '세 경로, 전부 실제 계산',
  'gw.what-colors-make-maroon.m1n': '빨강 + 갈색 (직행 경로)',
  'gw.what-colors-make-maroon.m1s': '동량은 벽돌 빨강에 떨어집니다 — 마룬 계열의 밝고 녹슨 끝.',
  'gw.what-colors-make-maroon.m1c1': '빨강',
  'gw.what-colors-make-maroon.m1c2': '갈색',
  'gw.what-colors-make-maroon.m1o':
    '갈색이 어두운 주황이라 이 한 번은 빨강을 동시에 덥히고 어둡힙니다. 동량이 벽돌; 이 페이지의 다른 모든 마룬의 출발 비율입니다.',
  'gw.what-colors-make-maroon.m2n': '빨강 + 갈색 + 검정 (깊은 경로)',
  'gw.what-colors-make-maroon.m2s': '검정 약간이 벽돌을 진짜 후디 마룬까지 누릅니다.',
  'gw.what-colors-make-maroon.m2c1': '빨강',
  'gw.what-colors-make-maroon.m2c2': '갈색',
  'gw.what-colors-make-maroon.m2c3': '검정',
  'gw.what-colors-make-maroon.m2o':
    '계산 착지점은 사람들이 마룬이라 말할 때 마음속에 있는 그것입니다 — 깊고, 살짝 갈색빛이고, 의심 없이 빨강 계열. 검정은 마지막에, 조금씩 나눠 넣으세요.',
  'gw.what-colors-make-maroon.m3n': '빨강 + 보라 (버건디 경로)',
  'gw.what-colors-make-maroon.m3s': '같은 깊이를 보라 쪽에서 도달합니다 — 와인 색 영역.',
  'gw.what-colors-make-maroon.m3c1': '빨강',
  'gw.what-colors-make-maroon.m3c2': '보라',
  'gw.what-colors-make-maroon.m3o':
    '요구가 마룬이 아니라 버건디나 소고기피일 때 쓰세요: 동량은 차가운 기운의 진한 베리 마룬으로 읽힙니다. 엄밀히는 다른 색입니다; 실제로는 같은 검색입니다.',
  'gw.what-colors-make-maroon.t1t': '마룬과 버건디를 한 문장으로.',
  'gw.what-colors-make-maroon.t1b':
    '마룬은 갈색으로 어둡힌 빨강(따뜻); 버건디는 보라로 어둡힌 빨강(차가움)입니다. 같은 깊이, 다른 성향 — 이걸로 위 경로를 고르세요.',
  'gw.what-colors-make-maroon.t2t': '마룬이 너무 어두워졌을 때의 구조.',
  'gw.what-colors-make-maroon.t2b':
    '빨강으로 되돌리세요, 절대 흰색으로 하지 말고 — 흰색은 핑크로 만들어 본색을 죽입니다. 어두워진 게 아니라 흐려진 것이라면 빨강-주황 소량이 온기를 되살립니다.',
  'gw.what-colors-make-maroon.t3t': '마룬 아이싱은 초콜릿에서 시작.',
  'gw.what-colors-make-maroon.t3b':
    '아이싱과 버터크림 모두 초콜릿 바탕에서 시작해 빨강 젤을 떨어뜨리세요 — 하얀 아이싱에서 마룬을 쌓는 건 방울도 인내도 비쌉니다. 바탕 부분은 버터크림 차트가 설명합니다.',
  'gw.what-colors-make-maroon.f1q': '무슨 색이 마룬을 만드나요?',
  'gw.what-colors-make-maroon.f1a':
    '빨강과 갈색 동량은 벽돌 마룬; 검정 소량으로 클래식 마룬까지 어둡힙니다. 보라 쪽 버건디 버전을 원하면 빨강+보라로 바꾸세요. 세 경로 모두 위에 계산되어 있습니다.',
  'gw.what-colors-make-maroon.f2q': '마룬과 버건디의 차이는요?',
  'gw.what-colors-make-maroon.f2a':
    '둘 다 깊은 빨강입니다. 마룬은 갈색 쪽(따뜻, 벽돌 같은), 버건디는 보라 쪽(차가움, 와인 같은) — 그래서 마룬은 빨강+갈색, 버건디는 빨강+보라에서 나옵니다. 위 경로가 두 착지점을 모두 보여줍니다.',
  'gw.what-colors-make-maroon.f3q': '무슨 색이 짙은 빨강을 만드나요?',
  'gw.what-colors-make-maroon.f3a':
    '짙은 빨강은 마룬보다 한 단계 밝은 같은 계열입니다: 빨강에 갈색이나 검정 약간, 빨강이 주도하게. 대략 빨강 2에 갈색 1이면 짙은 빨강으로 읽히고, 그 아래가 마룬입니다.',
  'gw.what-colors-make-maroon.f4q': '무슨 색이 마룬 물감을 만드나요?',
  'gw.what-colors-make-maroon.f4a':
    '아크릴이나 유화에서는 빨강+갈색 경로가 가장 통제됩니다: 카드뮴 레드에 번트 앰버, 필요하면 검정 조금. 빨강+보라 경로는 퀴나크리돈 레드에 다이옥사진 바이올렛으로, 버건디 쪽에 해당합니다.',
  'gw.what-colors-make-maroon.r1': '무슨 색이 빨강을 만드나 (원색 진실)',
  'gw.what-colors-make-maroon.r2': '빨강과 보라: 버건디 혼합',
  'gw.what-colors-make-maroon.r3': '갈색 아이싱 만들기',
  'gw.what-colors-make-maroon.r4': '모든 컬러 가이드',

  /* ---------- what-colors-make-peach ---------- */
  'gw.what-colors-make-peach.lead':
    '피치는 살결 톤 쪽으로 부드러워진 주황입니다 — 그래서 가장 섞기 쉬운 커스텀 색 중 하나인데, 레시피 전체가 주황+흰색이고 취향에 따라 핑크나 노랑으로 기우는 것뿐입니다. 아래 세 경로, 클래식에서 로즈까지, 견본마다 실제 계산.',
  'gw.what-colors-make-peach.ans': '부드러운 피치',
  'gw.what-colors-make-peach.introH': '왜 피치는 섞기 쉬운가',
  'gw.what-colors-make-peach.i1':
    '피치는 주황과 핑크 사이의 밝은 구간에 앉습니다 — 공식적으로는 밝고 살짝 핑크 기운의 주황. 상쇄해야 할 것이 없으므로(보색 싸움이 없음) 경로는 전부 단순한 밝히기입니다: 주황을 흰색으로 들어 올리고, 결과를 취향대로 핑크나 노랑으로 기울이기. 이곳의 경로 중 어느 것도 흐려질 위험이 없습니다.',
  'gw.what-colors-make-peach.i2':
    '그 밝기가 지켜야 할 것입니다: 피치는 어두워지는 순간 죽습니다. 혼합이 연어나 살구 쪽으로 미끄러지면 주황을 더하지 말고 흰색으로 되돌리세요.',
  'gw.what-colors-make-peach.listH': '세 경로, 전부 실제 계산',
  'gw.what-colors-make-peach.m1n': '주황 + 흰색 (직행 경로)',
  'gw.what-colors-make-peach.m1s': '동량은 클래식 피치에 떨어집니다 — 밝고, 따뜻하고, 살결에 가까운.',
  'gw.what-colors-make-peach.m1c1': '주황',
  'gw.what-colors-make-peach.m1c2': '흰색',
  'gw.what-colors-make-peach.m1o':
    '교과서 피치이고 기억할 만한 비율입니다. 흰색이 더하면 크림 쪽으로; 주황이 더하면 살구 쪽으로 — 둘 다 나쁜 것이 아니라 좋은 이웃입니다.',
  'gw.what-colors-make-peach.m2n': '핑크 + 노랑 (로즈 경로)',
  'gw.what-colors-make-peach.m2s': '주황의 "부모" 둘을 섞으면 핑크 기운의 피치가 나옵니다.',
  'gw.what-colors-make-peach.m2c1': '핑크',
  'gw.what-colors-make-peach.m2c2': '노랑',
  'gw.what-colors-make-peach.m2o':
    '핑크 자체가 밝은 빨강이라 이 경로는 부품에서 피치를 조립하고, 착지점은 직행 경로보다 핑크 쪽입니다 — 과일 접시가 아니라 블러셔 팔레트의 피치.',
  'gw.what-colors-make-peach.m3n': '주황 + 흰색 + 핑크 약간 (살결 경로)',
  'gw.what-colors-make-peach.m3s': '직행 피치에 핑크를 살짝 — 초상 화가가 아는 그 혼합.',
  'gw.what-colors-make-peach.m3c1': '주황',
  'gw.what-colors-make-peach.m3c2': '흰색',
  'gw.what-colors-make-peach.m3c3': '핑크',
  'gw.what-colors-make-peach.m3o':
    '핑크 소량이 피치를 과일이 아니라 살결로 읽히게 하는 바로 그것입니다. 핑크는 아주 조금 — 이 밝기에서는 조금이 멀리 갑니다.',
  'gw.what-colors-make-peach.t1t': '피치, 살구, 연어 핑크.',
  'gw.what-colors-make-peach.t1b':
    '같은 계열의 다른 성향: 피치가 중앙, 살구는 노랑-주황 쪽, 연어는 더 깊고 핑크 쪽입니다. 노브는 핑크-노랑 균형과 흰색 양 두 개뿐입니다.',
  'gw.what-colors-make-peach.t2t': '피치 아이싱은 방울 수 문제.',
  'gw.what-colors-make-peach.t2b':
    '하얀 버터크림에 주황 젤 약간, 핑크 살짝이 피치 글레이즈입니다 — 컵당 주황 두 방울 핑크 한 방울이 작업 레시피. 바탕 방울 표는 버터크림 차트에.',
  'gw.what-colors-make-peach.t3t': '밝기를 지키세요, 아니면 잃습니다.',
  'gw.what-colors-make-peach.t3b':
    '피치는 어두워지는 즉시 연어와 테라코타로 무너집니다. 조정은 먼저 흰색에서; 온기가 필요하면 주황은 생각보다 적게.',
  'gw.what-colors-make-peach.f1q': '무슨 색이 피치를 만드나요?',
  'gw.what-colors-make-peach.f1a':
    '주황과 흰색 동량 — 클래식 레시피는 그게 전부입니다. 더 로즈한 피치를 원하면 핑크와 노랑을 섞거나, 주황+흰색에 핑크 소량으로 살결 버전을 만드세요.',
  'gw.what-colors-make-peach.f2q': '무슨 색이 피치 물감을 만드나요?',
  'gw.what-colors-make-peach.f2a':
    '흰색 물감에 주황 소량, 그다음 핑크나 노랑으로 미세 조정. 피치는 밝은 색이라 흰색 대부분에서 시작해 주황을 점차 더하세요 — 어두워지기는 쉽고 되돌리기는 어렵습니다.',
  'gw.what-colors-make-peach.f3q': '피치와 주황의 차이는요?',
  'gw.what-colors-make-peach.f3a':
    '피치는 밝아지고 살짝 핑크 기운을 띤 주황입니다 — 같은 색조 계열에 더 밝고 부드럽습니다. 주황+흰색이 차이의 대부분을 메우고, 나머지가 그 작은 핑크 기운입니다.',
  'gw.what-colors-make-peach.f4q': '무슨 색이 핑크를 만드나요?',
  'gw.what-colors-make-peach.f4a':
    '빨강과 흰색 — 핑크는 빨강의 틴트입니다. 거기에 주황이나 노랑 약간을 더하면 피치인데, 위의 핑크+노랑이 피치에 떨어지는 이유입니다.',
  'gw.what-colors-make-peach.r1': '주황과 흰색: 베이스 혼합',
  'gw.what-colors-make-peach.r2': '핑크와 노랑: 로즈 경로',
  'gw.what-colors-make-peach.r3': '빨강과 흰색으로 핑크',
  'gw.what-colors-make-peach.r4': '모든 컬러 가이드',

  /* ---------- what-colors-make-turquoise ---------- */
  'gw.what-colors-make-turquoise.lead':
    '터콰이즈는 파랑과 초록이 합의한 색입니다 — 하지만 기본 동량 혼합은 사실 더 깊은 사촌인 틸에 떨어집니다. 사람들이 상상하는 밝은 터콰이즈(수영장 물, 카리브 얕은바다)를 원하면 레시피는 초록 쪽으로 기울인 뒤 흰색으로 밝히는 것입니다. 세 경로를 아래에 견본마다 실제 계산했습니다.',
  'gw.what-colors-make-turquoise.ans': '밝은 터콰이즈',
  'gw.what-colors-make-turquoise.introH': '터콰이즈, 틸, 그리고 초록 기운',
  'gw.what-colors-make-turquoise.i1':
    '터콰이즈는 파랑과 초록 사이에 있되 초록 쪽에 더 가깝고 밝기가 높습니다 — 보석과 열대 바닷물을 떠올리세요. 틸은 같은 개념의 더 깊고 더 파란 버전이고, 그래서 순진한 파랑+초록 50:50은 터콰이즈가 아니라 틸을 줍니다. 수정은 노브 두 개입니다: 초록으로 민 뒤, 흰색을 더해 빛을 얻기.',
  'gw.what-colors-make-turquoise.i2':
    '이 모든 것에 없는 색은 필요 없습니다. 파랑, 초록, 흰색 — 아래 믹서에 있는 세 가지 — 이 깊은 틸에서 밝은 터콰이즈까지의 여정 전체를 덮습니다.',
  'gw.what-colors-make-turquoise.listH': '세 경로, 전부 실제 계산',
  'gw.what-colors-make-turquoise.m1n': '파랑 + 초록 (베이스 혼합 — 틸에 착지)',
  'gw.what-colors-make-turquoise.m1s': '동량은 공식 이름이 틸인 짙은 파랑빛 초록을 줍니다.',
  'gw.what-colors-make-turquoise.m1c1': '파랑',
  'gw.what-colors-make-turquoise.m1c2': '초록',
  'gw.what-colors-make-turquoise.m1o':
    '여기서 문제가 보입니다: 실제 계산 착지점은 짙은 네이비-초록입니다 — 멋지지만 이것은 틸입니다. 이 페이지의 모든 터콰이즈 레시피는 이 혼합에 수정 두 걸음을 더한 것입니다.',
  'gw.what-colors-make-turquoise.m2n': '초록 쪽으로 기울인 혼합 (진짜 터콰이즈 경로)',
  'gw.what-colors-make-turquoise.m2s': '초록 2에 파랑 1로 혼합을 터콰이즈 색조 위로 돌립니다.',
  'gw.what-colors-make-turquoise.m2c1': '초록',
  'gw.what-colors-make-turquoise.m2c2': '파랑',
  'gw.what-colors-make-turquoise.m2o':
    '이것이 터콰이즈 색조입니다 — 초록 기운이 모든 일을 합니다. 실제 계산 결과는 짙은 터콰이즈, 이 색의 보석 단계입니다.',
  'gw.what-colors-make-turquoise.m3n': '초록 + 파랑 + 흰색 (밝은 터콰이즈 경로)',
  'gw.what-colors-make-turquoise.m3s': '초록 쪽 혼합을 흰색으로 밝혀 수영장 물 터콰이즈를 얻습니다.',
  'gw.what-colors-make-turquoise.m3c1': '초록',
  'gw.what-colors-make-turquoise.m3c2': '파랑',
  'gw.what-colors-make-turquoise.m3c3': '흰색',
  'gw.what-colors-make-turquoise.m3o':
    '흰색이 터콰이즈와 틸을 가르는 밝기를 채웁니다. 흰색이 더하면 아쿠아와 파스텔 수영장 톤으로; 적게면 포화된 보석 느낌을 유지합니다.',
  'gw.what-colors-make-turquoise.t1t': '터콰이즈와 틸을 한 문장으로.',
  'gw.what-colors-make-turquoise.t1b':
    '틸은 더 깊고 파란 쪽; 터콰이즈는 더 밝고 초록 쪽입니다. 같은 두 모색 — 차이는 초록 비율과 흰색 밝히기에 있습니다.',
  'gw.what-colors-make-turquoise.t2t': '틸로 되돌아가기 시작하면.',
  'gw.what-colors-make-turquoise.t2b':
    '초록을 더하세요, 노랑이 아니라 — 노랑은 혼합을 스프링 그린과 라임 쪽으로 민 것입니다. 파래지는 게 아니라 흐려진다면 파랑이 왕 노릇 중이라는 뜻입니다: 초록을 쌓지 말고 파랑을 걷어내세요.',
  'gw.what-colors-make-turquoise.t3t': '터콰이즈 아이싱은 관대합니다.',
  'gw.what-colors-make-turquoise.t3b':
    '하얀 버터크림에 스카이 블루 젤과 레몬 옐로 약간이면 터콰이즈 글레이즈입니다 — 버터크림의 노란 바탕이 기울임의 절반을 대신해줍니다. 방울 수는 버터크림 차트에.',
  'gw.what-colors-make-turquoise.f1q': '무슨 색이 터콰이즈를 만드나요?',
  'gw.what-colors-make-turquoise.f1a':
    '파랑과 초록 — 하지만 초록 쪽으로, 2 대 1로 기울이세요, 그렇지 않으면 혼합이 틸에 떨어집니다. 밝은 터콰이즈를 원하면 초록 쪽 혼합에 흰색을 더해 수영장 물 톤으로 올리세요.',
  'gw.what-colors-make-turquoise.f2q': '터콰이즈와 틸의 차이는요?',
  'gw.what-colors-make-turquoise.f2a':
    '틸은 더 깊고 파란 쪽; 터콰이즈는 더 밝고 초록 쪽입니다. 둘 다 파랑과 초록에서 나옵니다 — 동량 혼합이 틸, 초록 쪽 혼합이 터콰이즈를 줍니다.',
  'gw.what-colors-make-turquoise.f3q': '무슨 색이 틸을 만드나요?',
  'gw.what-colors-make-turquoise.f3a':
    '파랑과 초록 동량 — 이 페이지 첫 번째 실제 계산 혼합입니다. 틸에서 터콰이즈까지의 전체 비율 걸음마는 파랑과 초록 페이지에.',
  'gw.what-colors-make-turquoise.f4q': '무슨 색이 터콰이즈 물감을 만드나요?',
  'gw.what-colors-make-turquoise.f4a':
    '프탈로 블루나 세러리언 블루에 초록 쪽 프탈로 그린을 대략 파랑 1 대 초록 2로, 그다음 흰색으로 밝히세요. 초록 물감 선택이 중요합니다: 프탈로 같은 파란빛 초록이 혼합을 깨끗하게 유지합니다.',
  'gw.what-colors-make-turquoise.r1': '파랑과 초록으로 틸: 전체 비율 걸음마',
  'gw.what-colors-make-turquoise.r2': '무슨 색이 파랑을 만드나',
  'gw.what-colors-make-turquoise.r3': '초록과 흰색으로 민트',
  'gw.what-colors-make-turquoise.r4': '모든 컬러 가이드',
};
