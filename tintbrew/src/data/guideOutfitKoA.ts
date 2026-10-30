/**
 * Guide long-copy dictionary, ko — outfit pages, first half
 * (what-colors-go-with brown + green). Keys mirror the en generator in
 * i18n.test.ts exactly (`ow.<slug>.<field>`); a guard test fails if
 * either side drifts.
 */
export const OUTFIT_KO_A: Record<string, string> = {
  /* ---------- what-colors-go-with-brown ---------- */
  'ow.what-colors-go-with-brown.lead':
    '브라운은 옷장에서 가장 친절한 "어려운" 색입니다: 따뜻한 기운의 어두운 뉴트럴이라, 거의 모든 클래식 뉴트럴이 여기에 복종합니다 — 크림, 화이트, 네이비, 올리브, 블랙 레더 — 실패하는 조합은 적고 구체적입니다. 아래 열 룩은 매번 다른 브라운(탠, 초콜릿, 카멜, 에스프레소)을 앵커로 삼고, 견본마다 정확한 HEX와 조합이 성립하는 이유를 계산한 명도 차를 붙였습니다.',
  'ow.what-colors-go-with-brown.base': '밤색',
  'ow.what-colors-go-with-brown.top': '밤색 상의',
  'ow.what-colors-go-with-brown.introH': '브라운이 왜 거의 모든 색과 어울리는가',
  'ow.what-colors-go-with-brown.i1':
    '브라운은 어두운 주황입니다. 이 사실 하나가 아래 모든 조합을 설명합니다: 색상환에서 주황에 가까운 색(탠, 카멜, 러스트, 골드)은 같은 계열로 녹아들고, 먼 색(네이비, 라이트 블루, 포레스트 그린)은 대비를 제공해 브라운이 단조로워지지 않게 합니다. 브라운은 명도가 낮아 블랙과 네이비처럼 뉴트럴처럼 굴고, 그래서 크림과 아이보리 같은 밝은 뉴트럴이 옆에 앉아도 주목을 가로채지 않습니다.',
  'ow.what-colors-go-with-brown.i2':
    '대부분의 스타일리스트가 수렴한 실무 규칙: 브라운 아이템 하나로 룩을 앵커하고, 파트너 색은 같은 따뜻한 계열이나 조용한 대비색 중 하나로 고르며, 아이템 사이에 최소 한 곳은 충분히 큰 명도 차를 둡니다. 그 차이 — 감이 아니라 측정 가능한 — 가 각 조합 아래 Oklab 리딩이 보고하는 것입니다: 0.3 이상의 명도 차는 단정하게 읽히고, 거의 같은 명도는 느슨하게 읽히며, 이건 의도적으로 돌릴 수 있는 노브입니다.',
  'ow.what-colors-go-with-brown.combosH': '열 룩, 브라운을 앵커로',
  'ow.what-colors-go-with-brown.cb1n': '탠 치노, 화이트 티, 브라운 로퍼',
  'ow.what-colors-go-with-brown.cb1sc': '데일리 기본',
  'ow.what-colors-go-with-brown.cb1o':
    '브라운 패션의 유니폼: 밝은 탠 팬츠, 플레인 화이트 상의, 짙은 브라운 레더가 바닥을 다집니다. 일 년 아홉 달 고민 없이 입습니다.',
  'ow.what-colors-go-with-brown.cb1it1': '탠 치노',
  'ow.what-colors-go-with-brown.cb1it2': '오프화이트 티셔츠',
  'ow.what-colors-go-with-brown.cb1it3': '브라운 로퍼',
  'ow.what-colors-go-with-brown.cb2n': '초콜릿 니트, 크림 팬츠, 에스프레소 부츠',
  'ow.what-colors-go-with-brown.cb2sc': '가을 출근',
  'ow.what-colors-go-with-brown.cb2o':
    '상의는 딥 초콜릿, 하의는 크림, 에스프레소 부츠가 바닥 — 니트 시즌 공식으로, 사무실에서 한 번도 틀린 적 없습니다.',
  'ow.what-colors-go-with-brown.cb2it1': '초콜릿 니트',
  'ow.what-colors-go-with-brown.cb2it2': '크림 팬츠',
  'ow.what-colors-go-with-brown.cb2it3': '에스프레소 앵클부츠',
  'ow.what-colors-go-with-brown.cb3n': '브라운 레더 재킷, 블랙 티, 그레이 데님',
  'ow.what-colors-go-with-brown.cb3sc': '주말',
  'ow.what-colors-go-with-brown.cb3o':
    '브라운에 블랙은 이제 반칙이 아닙니다 — 레더 재킷이 그걸 가장 쉽게 증명합니다. 나머지는 무채색으로 두고 재킷이 말하게 하세요.',
  'ow.what-colors-go-with-brown.cb3it1': '브라운 레더 재킷',
  'ow.what-colors-go-with-brown.cb3it2': '블랙 티셔츠',
  'ow.what-colors-go-with-brown.cb3it3': '그레이 데님',
  'ow.what-colors-go-with-brown.cb3it4': '블랙 부츠',
  'ow.what-colors-go-with-brown.cb4n': '카멜 코트, 네이비 스웨터, 다크 데님',
  'ow.what-colors-go-with-brown.cb4sc': '겨울 출근',
  'ow.what-colors-go-with-brown.cb4o':
    '카멜은 브라운의 가장 세련된 단입니다. 네이비와 데님 위에 걸면 로고 하나 없이 비싸 보이고; 브라운 부츠가 아래에서 마무리합니다.',
  'ow.what-colors-go-with-brown.cb4it1': '카멜 코트',
  'ow.what-colors-go-with-brown.cb4it2': '네이비 스웨터',
  'ow.what-colors-go-with-brown.cb4it3': '다크 데님',
  'ow.what-colors-go-with-brown.cb4it4': '브라운 첼시부츠',
  'ow.what-colors-go-with-brown.cb5n': '브라운 코듀로이 팬츠, 올리브 셔츠, 화이트 스니커즈',
  'ow.what-colors-go-with-brown.cb5sc': '캠퍼스',
  'ow.what-colors-go-with-brown.cb5o':
    '브라운 코듀로이와 올리브는 색상환 이웃이라 함께 있으면 편안합니다. 화이트 스니커즈가 이 낮은 대비 조합이 흐려지지 않게 막습니다.',
  'ow.what-colors-go-with-brown.cb5it1': '브라운 코듀로이 팬츠',
  'ow.what-colors-go-with-brown.cb5it2': '올리브 셔츠',
  'ow.what-colors-go-with-brown.cb5it3': '화이트 스니커즈',
  'ow.what-colors-go-with-brown.cb6n': '에스프레소 팬츠, 블러시 핑크 탑, 탠 힐',
  'ow.what-colors-go-with-brown.cb6sc': '데이트 나이트',
  'ow.what-colors-go-with-brown.cb6o':
    '브라운의 가장 놀라운 단짝은 더스티 핑크입니다 — 온기가 맞고 명도 차가 일합니다. 탠 힐은 다리 라인을 끊지 않고 늘립니다.',
  'ow.what-colors-go-with-brown.cb6it1': '에스프레소 팬츠',
  'ow.what-colors-go-with-brown.cb6it2': '블러시 핑크 셔츠',
  'ow.what-colors-go-with-brown.cb6it3': '탠 힐',
  'ow.what-colors-go-with-brown.cb7n': '브라운 롱 스커트, 러스트 스웨터, 골드 주얼리',
  'ow.what-colors-go-with-brown.cb7sc': '가을',
  'ow.what-colors-go-with-brown.cb7o':
    '톤온톤 브라운에 색조 한 단 이동: 러스트는 브라운의 더 뜨거운 사촌입니다. 골드 하드웨어는 여기에 속하고 실버는 아닙니다.',
  'ow.what-colors-go-with-brown.cb7it1': '브라운 롱 스커트',
  'ow.what-colors-go-with-brown.cb7it2': '러스트 스웨터',
  'ow.what-colors-go-with-brown.cb7it3': '브라운 앵클부츠',
  'ow.what-colors-go-with-brown.cb7it4': '골드 주얼리',
  'ow.what-colors-go-with-brown.cb8n': '브라운 블레이저, 라이트 블루 옥스포드 셔츠, 차콜 팬츠',
  'ow.what-colors-go-with-brown.cb8sc': '비즈니스 캐주얼',
  'ow.what-colors-go-with-brown.cb8o':
    '라이트 블루에 브라운은 저평가된 강력 콤보입니다 — 잘 입은 앵커맨 아나운서 아무나 보세요. 초콜릿 재킷은 권위 있게 읽히고, 캐주얼하지 않습니다.',
  'ow.what-colors-go-with-brown.cb8it1': '브라운 블레이저',
  'ow.what-colors-go-with-brown.cb8it2': '라이트 블루 옥스포드 셔츠',
  'ow.what-colors-go-with-brown.cb8it3': '차콜 팬츠',
  'ow.what-colors-go-with-brown.cb8it4': '딥 브라운 더비 슈즈',
  'ow.what-colors-go-with-brown.cb9n': '토프 팬츠, 버건디 탑, 앵클부츠',
  'ow.what-colors-go-with-brown.cb9sc': '컬러를 치고 싶을 때',
  'ow.what-colors-go-with-brown.cb9o':
    '토프는 회색 쪽으로 식은 브라운이고, 버건디는 그 절제를 공유하는 빨강입니다. 네이비에 토프만 입던 사람에게 한 단계 업그레이드입니다.',
  'ow.what-colors-go-with-brown.cb9it1': '토프 팬츠',
  'ow.what-colors-go-with-brown.cb9it2': '버건디 탑',
  'ow.what-colors-go-with-brown.cb9it3': '브라운 앵클부츠',
  'ow.what-colors-go-with-brown.cb10n': '브라운 멜빵바지, 브르타뉴 스트라이프, 화이트 슈즈',
  'ow.what-colors-go-with-brown.cb10sc': '주말 심부름',
  'ow.what-colors-go-with-brown.cb10o':
    '프렌치 마켓 콤보: 브라운 데님 멜빵바지에 네이비-화이트 스트라이프 탑. 어설퍼지기 어렵고 매일 입기 쉽습니다.',
  'ow.what-colors-go-with-brown.cb10it1': '브라운 멜빵바지',
  'ow.what-colors-go-with-brown.cb10it2': '네이비 스트라이프 탑',
  'ow.what-colors-go-with-brown.cb10it3': '화이트 캔버스 스니커즈',
  'ow.what-colors-go-with-brown.dc1n': '레더, 크림, 올리브',
  'ow.what-colors-go-with-brown.dc1o':
    '거실 기본값: 가죽 브라운 소파, 크림 벽, 올리브 쿠션, 바닥에 웜 우드.',
  'ow.what-colors-go-with-brown.dc1c1': '가죽 소파',
  'ow.what-colors-go-with-brown.dc1c2': '크림 벽',
  'ow.what-colors-go-with-brown.dc1c3': '올리브 쿠션',
  'ow.what-colors-go-with-brown.dc1c4': '웜 우드',
  'ow.what-colors-go-with-brown.dc2n': '월넛과 화이트',
  'ow.what-colors-go-with-brown.dc2o':
    '주방 콤보: 월넛 캐비닛 또는 조리대 아일, 순백 벽과 거의 검은 카운터탑.',
  'ow.what-colors-go-with-brown.dc2c1': '월넛',
  'ow.what-colors-go-with-brown.dc2c2': '화이트 벽',
  'ow.what-colors-go-with-brown.dc2c3': '블랙 카운터탑',
  'ow.what-colors-go-with-brown.dc3n': '에스프레소와 브라스',
  'ow.what-colors-go-with-brown.dc3o':
    '침실 단: 에스프레소 우드, 브라스 조명, 워시드 리넨. 깊고, 따뜻하고, 조용합니다.',
  'ow.what-colors-go-with-brown.dc3c1': '에스프레소 우드',
  'ow.what-colors-go-with-brown.dc3c2': '브라스',
  'ow.what-colors-go-with-brown.dc3c3': '리넨',
  'ow.what-colors-go-with-brown.dc4n': '탠과 세이지',
  'ow.what-colors-go-with-brown.dc4o':
    '현관 버전: 탠 바구니와 황마, 세이지 페인트, 화이트 도어 트림. 브라운의 가장 조용한 두 파트너가 한자리에.',
  'ow.what-colors-go-with-brown.dc4c1': '탠 바스켓',
  'ow.what-colors-go-with-brown.dc4c2': '세이지 페인트',
  'ow.what-colors-go-with-brown.dc4c3': '화이트 도어 트림',
  'ow.what-colors-go-with-brown.av1n': '선명한 주황',
  'ow.what-colors-go-with-brown.av1w':
    '브라운에서 색조 한 단 차이: 의도된 조합이 아니라 실패한 농도 매칭처럼 읽힙니다. 러스트는 되고 교통콘 오렌지는 안 됩니다.',
  'ow.what-colors-go-with-brown.av2n': '네온 라임',
  'ow.what-colors-go-with-brown.av2w':
    '완전 포화의 초록은 브라운의 온기와 정면 충돌합니다. 올리브와 세이지가 같은 일을 협상으로 합니다.',
  'ow.what-colors-go-with-brown.av3n': '아이스 핑크',
  'ow.what-colors-go-with-brown.av3w':
    '브라운의 노란 바탕을 미화하지 않고 조롱하는 유일한 파스텔입니다. 더스티 핑크(6번 룩 참고)가 작동하는 버전입니다.',
  'ow.what-colors-go-with-brown.t1t': '룩마다 명도 차 하나를 지키세요.',
  'ow.what-colors-go-with-brown.t1b':
    '브라운 룩이 실패하는 방식은 색조 선택이 아니라 전체가 균일하게 중간 어두움인 것입니다. 최소 한 아이템은 나머지보다 눈에 띄게 밝거나 어둡게 — 각 조합 아래 Oklab 리딩이 어느 쪽인지 알려줍니다.',
  'ow.what-colors-go-with-brown.t2t': '가죽 소품은 같은 계열로.',
  'ow.what-colors-go-with-brown.t2b':
    '신발, 벨트, 와치 스트랩: 같은 브라운 계열 안에 머무세요, 같은 농도일 필요는 없습니다. 코냑은 코냑 쪽 탠과, 에스프레소는 에스프레소와.',
  'ow.what-colors-go-with-brown.t3t': '차가운 회색보다 따뜻한 회색.',
  'ow.what-colors-go-with-brown.t3b':
    '회색과 브라운은 어울립니다, 회색이 따뜻할 때(그레이지, 토프, 스톤). 차가운 블루그레이는 브라운 옆에서 두 색 모두 실수처럼 보이게 합니다.',
  'ow.what-colors-go-with-brown.t4t': '톤온톤은 소재에 맡기세요.',
  'ow.what-colors-go-with-brown.t4b':
    '브라운의 가장 대담한 안전 수는 올 브라운 룩에 소재 섞기 — 스웨이드, 코듀로이, 레더, 니트. 소재 차이가 색조가 주지 않는 대비를 채웁니다.',
  'ow.what-colors-go-with-brown.f1q': '브라운 옷에 무슨 색이 어울리나요?',
  'ow.what-colors-go-with-brown.f1a':
    '믿을 수 있는 파트너는 크림과 아이보리, 네이비, 라이트 블루, 올리브, 포레스트 그린, 블랙 레더, 더스티 핑크, 그리고 다른 브라운들(탠, 카멜, 에스프레소)입니다. 두 규칙이 거의 전부를 덮습니다: 파트너를 따뜻한 계열에서 고르면 느슨한 읽기, 네이비/초록에서 고르면 대비 읽기 — 그리고 아이템 사이 선명한 명도 차 하나를 지키기.',
  'ow.what-colors-go-with-brown.f2q': '브라운에 블랙은 괜찮나요?',
  'ow.what-colors-go-with-brown.f2a':
    '괜찮습니다 — 옛 금지는 낡았습니다. 작동하는 버전은 텍스처 있는 브라운(레더, 스웨이드)에 블랙 베이직을 곁들이고 소재가 두 어두움을 가르는 것입니다. 여전히 실패하는 버전은 매끈한 블랙 천과 매끈한 브라운 천이 명도가 거의 같고 룩 어디에도 대비 아이템이 없는 것입니다.',
  'ow.what-colors-go-with-brown.f3q': '브라운에 회색은 괜찮나요?',
  'ow.what-colors-go-with-brown.f3a':
    '따뜻한 회색은 됩니다: 그레이지, 토프, 스톤. 차가운 블루그레이는 브라운의 노란 바탕과 싸워 두 색 모두 지저분해 보입니다. 회색이 차갑게 읽히면 크림이나 올리브로 바꾸세요.',
  'ow.what-colors-go-with-brown.f4q': '브라운 팬츠에 무슨 색 신발?',
  'ow.what-colors-go-with-brown.f4a':
    '더 어두운 브라운 슈즈 — 클래식 규칙은 밑단 아래 가죽이 팬츠보다 한두 단 어두울 것. 탠 치노엔 밤색이나 에스프레소; 초콜릿 팬츠엔 거의 검은 브라운. 블랙 슈즈도 됩니다, 룩 다른 곳에 블랙이 호응할 때만.',
  'ow.what-colors-go-with-brown.f5q': '브라운은 뉴트럴인가요?',
  'ow.what-colors-go-with-brown.f5a':
    '옷장의 의미에서는 그렇습니다: 브라운은 낮은 명도의 어두운 주황이라, 네이비나 블랙처럼 물러나서 룩을 앵커하기에 충분합니다. 밝고 부드러운 색이 브라운과 이렇게 자유롭게 어울리는 이유입니다 — 대비는 얻고 경쟁은 없습니다.',
  'ow.what-colors-go-with-brown.r1': '무슨 색이 브라운을 만드나 (어두운 주황인 이유)',
  'ow.what-colors-go-with-brown.r2': '무슨 색이 버건디와 어울리나',
  'ow.what-colors-go-with-brown.r3': '브라운과 화이트: 탠 그라데이션, 모든 비율',
  'ow.what-colors-go-with-brown.r4': '모든 컬러 가이드',

  /* ---------- what-colors-go-with-green ---------- */
  'ow.what-colors-go-with-green.lead':
    '초록은 옷장 네 개를 한 아이템으로 압축합니다 — 올리브, 세이지, 포레스트, 에메랄드 — 단마다 친구가 다릅니다. 아래 열 룩이 네 단을 모두 건너며, 매번 초록 아이템 하나를 앵커로 삼고 정확한 HEX와 조합이 왜 성립하는지 계산한 명도 차를 붙였습니다 — 단정만이 아니라.',
  'ow.what-colors-go-with-green.base': '포레스트 그린',
  'ow.what-colors-go-with-green.top': '포레스트 그린 상의',
  'ow.what-colors-go-with-green.introH': '초록이 네 개의 다른 조합 문제인 이유',
  'ow.what-colors-go-with-green.i1':
    '초록은 스펙트럼 한가운데 앉아 있고, 옷장 언어로 번역하면: 모든 색이 이웃이거나 대비입니다. 파랑과 틸은 이웃 — 초록의 차가운 쪽을 공유해 쉽게 녹습니다. 크림, 탠, 카멜은 뉴트럴 진영 — 초록이 유일한 목소리가 되게 합니다. 버건디와 머스터드는 클래식한 깊고 따뜻한 대비로, 색상환에서 초록과 충분히 멀면서도 같은 부드러운 자연스러운 단을 공유하기 때문에 작동합니다.',
  'ow.what-colors-go-with-green.i2':
    '색조보다 단이 중요합니다. 올리브는 탠, 크림, 버건디를 원하고; 세이지는 크림, 그레이, 카멜을; 포레스트는 카멜과 다크 데님을; 에메랄드는 블랙과 골드를 원합니다. 아래 각 조합을 색 매칭이 아니라 단 수업으로 읽으세요 — 그리고 Oklab 리딩으로 최소 한 아이템이 실제 명도 차를 만드는지 확인하세요.',
  'ow.what-colors-go-with-green.combosH': '열 룩, 초록을 앵커로',
  'ow.what-colors-go-with-green.cb1n': '올리브 팬츠, 화이트 티, 탠 슈즈',
  'ow.what-colors-go-with-green.cb1sc': '데일리 기본',
  'ow.what-colors-go-with-green.cb1o':
    '올리브는 보통 사람이 실제로 입는 초록입니다. 화이트와 탠과 함께면 기본 캐주얼 유니폼입니다 — 군대의 색, 민간인의 예의.',
  'ow.what-colors-go-with-green.cb1it1': '올리브 팬츠',
  'ow.what-colors-go-with-green.cb1it2': '화이트 티셔츠',
  'ow.what-colors-go-with-green.cb1it3': '탠 슈즈',
  'ow.what-colors-go-with-green.cb2n': '세이지 니트, 크림 팬츠, 브라운 부츠',
  'ow.what-colors-go-with-green.cb2sc': '소프트 출근',
  'ow.what-colors-go-with-green.cb2o':
    '세이지는 절반까지 당겨져 뉴트럴이 된 초록이라 조용한 파트너를 원합니다: 아래 크림, 발에 브라운 레더. 낮은 대비가 포인트입니다.',
  'ow.what-colors-go-with-green.cb2it1': '세이지 니트',
  'ow.what-colors-go-with-green.cb2it2': '크림 팬츠',
  'ow.what-colors-go-with-green.cb2it3': '브라운 부츠',
  'ow.what-colors-go-with-green.cb3n': '에메랄드 셔츠, 블랙 팬츠, 블랙 힐',
  'ow.what-colors-go-with-green.cb3sc': '저녁',
  'ow.what-colors-go-with-green.cb3o':
    '에메랄드는 블랙을 원합니다, 루비가 벨벳을 원하듯: 에메랄드가 포화 전부를 내고 블랙이 액자를 냅니다. 실버나 골드 주얼리, 그 중간은 넣지 마세요.',
  'ow.what-colors-go-with-green.cb3it1': '에메랄드 셔츠',
  'ow.what-colors-go-with-green.cb3it2': '블랙 팬츠',
  'ow.what-colors-go-with-green.cb3it3': '블랙 힐',
  'ow.what-colors-go-with-green.cb4n': '포레스트 그린 코트, 카멜 터틀넥, 다크 데님',
  'ow.what-colors-go-with-green.cb4sc': '겨울 출근',
  'ow.what-colors-go-with-green.cb4o':
    '포레스트 그린에 카멜은 부유하게 읽히는 겨울 콤보입니다. 데님은 너무 격식이 되지 않게 하고; 부츠가 코트에 응답합니다.',
  'ow.what-colors-go-with-green.cb4it1': '포레스트 그린 코트',
  'ow.what-colors-go-with-green.cb4it2': '카멜 터틀넥',
  'ow.what-colors-go-with-green.cb4it3': '다크 데님',
  'ow.what-colors-go-with-green.cb4it4': '에스프레소 부츠',
  'ow.what-colors-go-with-green.cb5n': '카고 팬츠, 블랙 후디, 화이트 스니커즈',
  'ow.what-colors-go-with-green.cb5sc': '스트릿',
  'ow.what-colors-go-with-green.cb5o':
    '초록의 스트릿 기본값: 유틸리티 카고, 블랙 레이어, 화이트 아웃솔. 나머지가 전부 무채색일 때 초록 아이템이 가장 일합니다.',
  'ow.what-colors-go-with-green.cb5it1': '그린 카고 팬츠',
  'ow.what-colors-go-with-green.cb5it2': '블랙 후디',
  'ow.what-colors-go-with-green.cb5it3': '화이트 스니커즈',
  'ow.what-colors-go-with-green.cb6n': '그린 셔켓, 화이트 탱크, 블루 데님',
  'ow.what-colors-go-with-green.cb6sc': '웨스턴 기본',
  'ow.what-colors-go-with-green.cb6o':
    '그린 셔츠 재킷이 화이트 탱크와 블루 데님 위에 — 목장 지대의 유니폼. 데님의 파랑은 초록의 색상환 이웃이라 이 콤보는 한 번도 싸우지 않습니다.',
  'ow.what-colors-go-with-green.cb6it1': '그린 셔켓',
  'ow.what-colors-go-with-green.cb6it2': '화이트 탱크',
  'ow.what-colors-go-with-green.cb6it3': '블루 데님',
  'ow.what-colors-go-with-green.cb6it4': '화이트 캔버스 스니커즈',
  'ow.what-colors-go-with-green.cb7n': '켈리 그린 스커트, 화이트 셔츠, 탠 플랫',
  'ow.what-colors-go-with-green.cb7sc': '봄 행사',
  'ow.what-colors-go-with-green.cb7o':
    '켈리 그린은 가장 큰 목소리의 단이라 주변을 전부 조용히 합니다: 위 화이트, 아래 탠. 큰 소리 하나, 속삭임 둘.',
  'ow.what-colors-go-with-green.cb7it1': '켈리 그린 스커트',
  'ow.what-colors-go-with-green.cb7it2': '화이트 셔츠',
  'ow.what-colors-go-with-green.cb7it3': '탠 플랫 슈즈',
  'ow.what-colors-go-with-green.cb8n': '올리브 재킷, 버건디 스카프, 그레이 팬츠',
  'ow.what-colors-go-with-green.cb8sc': '가을 레이어링',
  'ow.what-colors-go-with-green.cb8o':
    '초록에 버건디는 남성복 필자들이 매년 추천하는 가을 콤보입니다 — 이유가 분명합니다: 둘 다 깊고, 둘 다 부드럽고, 서로 주목을 가로채지 않습니다.',
  'ow.what-colors-go-with-green.cb8it1': '올리브 재킷',
  'ow.what-colors-go-with-green.cb8it2': '오트밀 티셔츠',
  'ow.what-colors-go-with-green.cb8it3': '버건디 스카프',
  'ow.what-colors-go-with-green.cb8it4': '그레이 팬츠',
  'ow.what-colors-go-with-green.cb8it5': '다크 부츠',
  'ow.what-colors-go-with-green.cb9n': '파인 그린 팬츠, 머스터드 니트, 크림 스니커즈',
  'ow.what-colors-go-with-green.cb9sc': '가을 색',
  'ow.what-colors-go-with-green.cb9o':
    '초록과 머스터드는 색상환에서 가깝고 둘 다 가을로 읽혀 이 짝이 의도된 세트가 아니라 조화로 느껴집니다. 발의 크림이 전체가 어두워지는 걸 막습니다.',
  'ow.what-colors-go-with-green.cb9it1': '파인 그린 팬츠',
  'ow.what-colors-go-with-green.cb9it2': '머스터드 니트',
  'ow.what-colors-go-with-green.cb9it3': '크림 스니커즈',
  'ow.what-colors-go-with-green.cb10n': '민트 탑, 화이트 데님, 실버 플랫',
  'ow.what-colors-go-with-green.cb10sc': '여름',
  'ow.what-colors-go-with-green.cb10o':
    '연민트는 초록의 여름 단입니다. 화이트와의 조합은 봄과 4월처럼 자연스럽고, 여기 속한 금속은 실버입니다 (골드가 아니라).',
  'ow.what-colors-go-with-green.cb10it1': '민트 탑',
  'ow.what-colors-go-with-green.cb10it2': '화이트 데님',
  'ow.what-colors-go-with-green.cb10it3': '실버 플랫 슈즈',
  'ow.what-colors-go-with-green.dc1n': '세이지, 크림, 오크',
  'ow.what-colors-go-with-green.dc1o':
    '조용한 거실: 세이지 벽 또는 패브릭, 크림 텍스타일, 라이트 오크 바닥. 팜하우스 카탈로그의 기본값이고, 이유가 있습니다.',
  'ow.what-colors-go-with-green.dc1c1': '세이지',
  'ow.what-colors-go-with-green.dc1c2': '크림',
  'ow.what-colors-go-with-green.dc1c3': '라이트 오크',
  'ow.what-colors-go-with-green.dc2n': '포레스트와 브라스',
  'ow.what-colors-go-with-green.dc2o':
    '서재 콤보: 딥 포레스트 캐비닛, 브라스 하드웨어, 아이보리 벽. 초록의 가장 비싸 보이는 단.',
  'ow.what-colors-go-with-green.dc2c1': '포레스트 그린',
  'ow.what-colors-go-with-green.dc2c2': '브라스',
  'ow.what-colors-go-with-green.dc2c3': '아이보리 벽',
  'ow.what-colors-go-with-green.dc3n': '올리브와 베이지',
  'ow.what-colors-go-with-green.dc3o':
    '침실 버전: 올리브 침구 또는 페인트, 베이지 리넨, 월넛 다리. 따뜻하고, 부드럽고, 잠이 옵니다.',
  'ow.what-colors-go-with-green.dc3c1': '올리브',
  'ow.what-colors-go-with-green.dc3c2': '베이지 리넨',
  'ow.what-colors-go-with-green.dc3c3': '월넛',
  'ow.what-colors-go-with-green.dc4n': '에메랄드와 네이비',
  'ow.what-colors-go-with-green.dc4o':
    '다이닝: 에메랄드 벨벳, 네이비 벽, 아이보리 트림. 차가운 바탕을 공유하는 두 보석색.',
  'ow.what-colors-go-with-green.dc4c1': '에메랄드 벨벳',
  'ow.what-colors-go-with-green.dc4c2': '네이비 벽',
  'ow.what-colors-go-with-green.dc4c3': '아이보리 트림',
  'ow.what-colors-go-with-green.av1n': '선명한 빨강',
  'ow.what-colors-go-with-green.av1w':
    '기본값으로 크리스마스입니다. 임무가 파티라면 이 줄을 무시하세요; 아니면 이 짝은 주문한 적 없는 의상을 가져다줍니다.',
  'ow.what-colors-go-with-green.av2n': '마젠타',
  'ow.what-colors-go-with-green.av2w':
    '초록의 시끄러운 이웃을 풀볼륨으로 — 같은 시선을 나누지 않고 빼앗습니다. 더스티 핑크가 협력으로 그 일을 합니다.',
  'ow.what-colors-go-with-green.av3n': '선명한 주황',
  'ow.what-colors-go-with-green.av3w':
    '목소리 큰 따뜻한 색 둘이 주목을 두고 다툽니다. 머스터드와 러스트가 협력하는 볼륨으로 "따뜻함+초록" 일을 합니다.',
  'ow.what-colors-go-with-green.t1t': '조합 전에 당신의 초록 이름부터.',
  'ow.what-colors-go-with-green.t1b':
    '올리브, 세이지, 포레스트, 에메랄드는 각각 다른 단짝을 둡니다. 아이템이 어느 단인지 먼저 정하고 그 단을 위한 파트너를 고르세요 — 추상적인 "초록"을 위해서가 아니라.',
  'ow.what-colors-go-with-green.t2t': '부드러운 초록은 따뜻한 뉴트럴을 사랑합니다.',
  'ow.what-colors-go-with-green.t2b':
    '올리브와 세이지는 탠, 카멜, 크림, 브라운 레더와 가장 안전합니다. 공유하는 낮은 채도가 조합을 계절 의상이 아니라 자연스럽게 읽게 합니다.',
  'ow.what-colors-go-with-green.t3t': '데님은 공짜 답입니다.',
  'ow.what-colors-go-with-green.t3b':
    '블루 데님은 모든 초록 단과 어울립니다, 데님이 익숙한 명도의 낮은 채도 파랑이기 때문입니다. 막힐 때 초록 아이템 + 데님 + 화이트 또는 탠 슈즈가 곧 룩입니다.',
  'ow.what-colors-go-with-green.t4t': '룩마다 큰 소리 하나.',
  'ow.what-colors-go-with-green.t4b':
    '켈리 그린과 에메랄드는 풀볼륨 색입니다. 주변은 뉴트럴로 낮추세요 — 화이트, 탠, 블랙 — 안 그러면 룩 전체가 경연이 됩니다.',
  'ow.what-colors-go-with-green.f1q': '초록 옷에 무슨 색이 어울리나요?',
  'ow.what-colors-go-with-green.f1a':
    '단을 가로질러: 크림과 아이보리, 탠과 카멜, 브라운 레더, 네이비, 블루 데님, 그레이, 버건디와 머스터드. 올리브와 세이지는 따뜻한 뉴트럴을; 에메랄드와 포레스트는 블랙, 카멜, 데님을 선호합니다. 아이템 사이 선명한 명도 차 하나가 어떤 조합도 단정하게 만듭니다.',
  'ow.what-colors-go-with-green.f2q': '빨강에 초록은 괜찮나요?',
  'ow.what-colors-go-with-green.f2a':
    '선명한 빨강+초록은 크리스마스로 읽힙니다 — 그건 의상 연상이지 색채 법 위반이 아닙니다. 빨강 대비를 원하면 버건디나 러스트를 쓰세요: 빨강의 부드러운 깊은 버전들은 올리브, 포레스트와 사계절 어울리며 명절이 아니라 가을로 읽힙니다.',
  'ow.what-colors-go-with-green.f3q': '파랑에 초록은 괜찮나요?',
  'ow.what-colors-go-with-green.f3a':
    '괜찮습니다 — 색상환 이웃이라 타고난 융합 파트너입니다. 그린 탑에 블루 데님이 일상의 증거이고; 포레스트 그린에 네이비가 격식 버전입니다. 한쪽이 눈에 띄게 밝게 유지해 둘이 한 덩어리로 녹는 걸 피하세요.',
  'ow.what-colors-go-with-green.f4q': '세이지 그린에 무슨 색이 어울리나요?',
  'ow.what-colors-go-with-green.f4a':
    '크림, 아이보리, 그레이지, 카멜, 블러시 핑크, 소프트 골드, 더 부드러운 브라운들. 세이지는 이미 반쪽 뉴트럴이라 조용한 동행을 원합니다; 강한 색은 세이지를 짓누릅니다. 세이지+크림+브라운 레더가 표준형입니다.',
  'ow.what-colors-go-with-green.f5q': '올리브 그린에 무슨 색이 어울리나요?',
  'ow.what-colors-go-with-green.f5a':
    '탠, 크림, 화이트, 블랙, 버건디, 러스트, 네이비, 그레이. 올리브는 남성복에 가장 친절한 초록입니다, 어스 톤처럼 굴기 때문입니다 — 브라운의 사촌으로 취급하고 같은 조합이 전부 적용됩니다.',
  'ow.what-colors-go-with-green.r1': '무슨 색이 초록을 만드나 (파랑이 결정하는 이유)',
  'ow.what-colors-go-with-green.r2': '무슨 색이 브라운과 어울리나',
  'ow.what-colors-go-with-green.r3': '초록과 화이트: 세이지 그라데이션, 모든 비율',
  'ow.what-colors-go-with-green.r4': '모든 컬러 가이드',
};
