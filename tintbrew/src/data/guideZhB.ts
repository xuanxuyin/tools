/**
 * Guide long-copy dictionary, zh — scenario pages, second half
 * (the two chart pages + what-colors-make blue/red/black/maroon/peach/
 * turquoise) plus the 8 shared gel-row notes. Keys mirror the en generator
 * in i18n.test.ts exactly (`gw.<slug>.<field>`); a guard test fails if
 * either side drifts.
 */
export const SCENARIO_ZH_B: Record<string, string> = {
  /* ---------- shared gel notes (both chart pages) ---------- */
  'gw.gel.red.n': '最难伺候的凝胶：深红靠的是静置时间，不是更多滴数。',
  'gw.gel.yellow.n': '最先用完换新的一管；每个暖色配方都还想再加点黄。',
  'gw.gel.orange.n': '一滴就会往桃色和肤色漂。',
  'gw.gel.green.n': 'Kelly 绿偏冷；要叶绿色就加一点点黄。',
  'gw.gel.blue.n': '四滴往上就接近藏青的地界。',
  'gw.gel.purple.n': '在奶油霜的黄底里，紫罗兰会被拉向粉。',
  'gw.gel.brown.n': '一滴是焦糖色；八滴是黑巧克力色。',
  'gw.gel.black.n': '得用到刻度最高端——或者干脆从巧克力起步。',

  /* ---------- icing-color-chart ---------- */
  'gw.icing-color-chart.lead':
    '多数糖霜配色表是照片，而照片会撒谎：灯光偏、打印机偏、批次也偏。这张表是算出来的。选好凝胶颜色，数好每杯白糖霜的滴数，色样就是你在碗里会看到的确切颜色，还带 HEX 色号可以对照任何东西。',
  'gw.icing-color-chart.hero': '白色皇家糖霜里加 4 滴红色凝胶',
  'gw.icing-color-chart.introH': '怎么读这张表',
  'gw.icing-color-chart.listH': '配色表：一杯白糖霜，1 到 8 滴',
  'gw.icing-color-chart.ci1':
    '先说凝胶和液体，因为滴数这个单位只对凝胶有意义。液体色素是溶在水里的染料；一"滴"几乎染不动一整杯，而有用的量又会把糖霜冲成汤。凝胶是浓缩膏，单滴就是下面通用的计量单位。',
  'gw.icing-color-chart.ci2':
    '刻度这样读：每杯一滴是粉彩（迎宾派对的领域），两滴是经典生日蛋糕色，四滴是宝石色，八滴是深色，接近糖霜能吃下的极限。色样是基底与凝胶的感知混合，所以你看到的是这只混合在你眼里的样子，不是生硬的通道数学。',
  'gw.icing-color-chart.ci3':
    '品牌说明：Wilton 牙签蘸取式和 Americolor 挤压瓶式的滴大小略有出入。下面所有滴数都当作 ±20% 的近似值，先调一小份试色再投入整碗。',
  'gw.icing-color-chart.base': '白色皇家糖霜',
  'gw.icing-color-chart.baseB':
    '起点：加色前的香草皇家糖霜。接近纯白，带一点香草和蛋清干带来的淡淡暖调。',
  'gw.icing-color-chart.t1t': '颜色会发展 20 分钟。',
  'gw.icing-color-chart.t1b':
    '凝胶搅开后还会继续"开花"，皇家糖霜干后也比湿的时候显深。先搅、再等、然后调；立刻动手调正是人们过头的典型原因。',
  'gw.icing-color-chart.t2t': '深色靠静置，不是加滴。',
  'gw.icing-color-chart.t2b':
    '红和黑尤其如此。如果表上显示你已经在深色区但它看起来还是浅，先给时间（或过一夜），再加凝胶。',
  'gw.icing-color-chart.t3t': '按杯计量再放大。',
  'gw.icing-color-chart.t3b':
    '滴数以每杯糖霜计。两杯就翻倍；保住比例，上面每个色样照样适用。',
  'gw.icing-color-chart.t4t': '先在小碗里试色。',
  'gw.icing-color-chart.t4b':
    '舀一勺糖霜，调色，划一道晾干，再对着表比。比事后发现八滴多了两滴便宜多了。',
  'gw.icing-color-chart.f1q': '每杯糖霜加几滴凝胶色素？',
  'gw.icing-color-chart.f1a':
    '一滴粉彩，两滴经典中等色，四滴深宝石色，八滴以上接近饱和（深红、黑这类）。上面的表列出每个滴数的确切落点。',
  'gw.icing-color-chart.f2q': '糖霜用凝胶和液体色素有什么区别？',
  'gw.icing-color-chart.f2a':
    '浓度。液体色素大部分是水，要染动一杯硬性糖霜得用几汤匙，糖霜直接变汤。凝胶是浓缩膏，滴就是工作单位，糖霜稠度几乎不动。',
  'gw.icing-color-chart.f3q': '最先该买哪几支凝胶？',
  'gw.icing-color-chart.f3a':
    '红、黄、蓝、绿覆盖混色基本盘，黑和棕帮你省掉费劲搭深色的过程。表上其余每种色都能从这六支调出来。',
  'gw.icing-color-chart.f4q': 'Wilton 和 Americolor 的滴数一样大吗？',
  'gw.icing-color-chart.f4a':
    '接近但不相同：Wilton 罐装是牙签蘸取式，Americolor 瓶装是挤压滴管。实际滴数彼此差在 20% 以内，所以搅开、对照表、再微调。',
  'gw.icing-color-chart.f5q': '怎么把任何颜色调成粉彩版？',
  'gw.icing-color-chart.f5a':
    '每杯只用一滴，或用无色糖霜延展调好的颜色直到读起来对。粉彩就是被拉向白的深色，一滴通常已经到位。',
  'gw.icing-color-chart.r1': '奶油霜配色表（黄油为什么把一切都推暖）',
  'gw.icing-color-chart.r2': '怎么调棕色糖霜：五种方法',
  'gw.icing-color-chart.r3': '怎么调黑糖霜',
  'gw.icing-color-chart.r4': '在调色器里调自定义颜色',

  /* ---------- buttercream-color-chart ---------- */
  'gw.buttercream-color-chart.lead':
    '奶油霜从来不是从白色开始的。它从黄油黄开始，而这会改变你搅进去的每一种颜色：蓝漂向水鸭、粉变成珊瑚、"白"变成奶油色。这张表从真实的美国奶油霜基底出发，色样是你离开搅拌碗时真正会看到的颜色，不是漂白过的演示糖霜装出来的样子。',
  'gw.buttercream-color-chart.hero': '美国奶油霜里加 4 滴红色凝胶',
  'gw.buttercream-color-chart.introH': '怎么读这张表',
  'gw.buttercream-color-chart.listH': '配色表：一杯美国奶油霜，1 到 8 滴',
  'gw.buttercream-color-chart.ci1':
    '黄移就是奶油霜配色的一切故事。黄油和香草把基底染成象牙色，所以下面每次混合其实都是"凝胶色加一点黄"。这就是为什么同一个滴数在这里读起来比皇家糖霜表更暖：蓝偏水鸭、紫偏藕紫，从这个基底出发根本不存在纯正粉彩。',
  'gw.buttercream-color-chart.ci2':
    '需要更正更冷的颜色，就先把基底打白：黄油多打发五分钟直到发白，用透明香草精代替棕色那种，或搭一个更白的奶油霜（瑞士意式、或掺一部分起酥油）。每向白走一步，这张表的准确性就买回一分。',
  'gw.buttercream-color-chart.ci3':
    '与皇家糖霜的一个实际差别：脂肪承载颜色均匀又宽容，所以奶油霜反而是更容易调深的介质。同样的 1-2-4-8 滴刻度适用，只是表里比你预期的稍软时，多给一滴的耐心。',
  'gw.buttercream-color-chart.base': '美国奶油霜',
  'gw.buttercream-color-chart.baseB':
    '起点：黄油和糖粉加香草打发。不是白色：一种黄油感的象牙色，下面每种颜色都得穿过它。',
  'gw.buttercream-color-chart.t1t': '加色之前先把黄油打发。',
  'gw.buttercream-color-chart.t1b':
    '多打五分钟黄油会明显发白。起点越浅，上面每个色样就落得越准。',
  'gw.buttercream-color-chart.t2t': '用透明香草精。',
  'gw.buttercream-color-chart.t2b':
    '普通香草精是棕色的，会染色。透明香草精就是为浅色奶油霜而生的；它是最便宜的一步增白。',
  'gw.buttercream-color-chart.t3t': '颜色过深用原味奶油霜救。',
  'gw.buttercream-color-chart.t3b':
    '颜色冲过了表的范围，用无色奶油霜延展，别试图用白色色素拉回来。比例恢复，稠度也保住。',
  'gw.buttercream-color-chart.t4t': '在日光下对色。',
  'gw.buttercream-color-chart.t4b':
    '厨房射灯美化暖色、对蓝光撒谎。朝北的窗或阴天的日光才是表里 HEX 色号真正对得上的地方。',
  'gw.buttercream-color-chart.f1q': '为什么我的奶油霜颜色和表或照片不一样？',
  'gw.buttercream-color-chart.f1a':
    '两个惯犯：黄底和灯光。黄油的象牙色把每支凝胶都推暖，室内灯光再推一次。把黄油打得更白、换透明香草精、在日光下对比，然后再调滴数。',
  'gw.buttercream-color-chart.f2q': '怎么调白色奶油霜？',
  'gw.buttercream-color-chart.f2a':
    '黄油打久打白、换透明香草精、接受象牙色；或搭更白的基底：瑞士意式奶油霜，或一部分换起酥油的美式配方。纯黄油调出雪白不存在。',
  'gw.buttercream-color-chart.f3q': '每杯奶油霜加几滴凝胶？',
  'gw.buttercream-color-chart.f3a':
    '和皇家糖霜一样的 1-2-4-8 刻度：一滴粉彩、两滴中等、四滴深色、八滴饱和。脂肪会稍微吃色，所以讲究精度的场合，比皇家糖霜表预算多一滴。',
  'gw.buttercream-color-chart.f4q': '同款凝胶能用翻糖吗？',
  'gw.buttercream-color-chart.f4a':
    '能。把凝胶揉进翻糖而不是搅拌，颜色会比奶油霜里加深得更快，所以从滴数刻度的低端起步。',
  'gw.buttercream-color-chart.f5q': '怎么调鼠尾草绿、雾霾蓝这类自定义色？',
  'gw.buttercream-color-chart.f5a':
    '从表里最接近的颜色出发，用一点邻居色或互补色走过去：鼠尾草绿是绿加一点黄和黑，雾霾蓝是蓝加一撮橙。调色器做的是同样的算术，实时算。',
  'gw.buttercream-color-chart.r1': '糖霜配色表（更白基底的版本）',
  'gw.buttercream-color-chart.r2': '怎么调黑糖霜',
  'gw.buttercream-color-chart.r3': '在调色器里调自定义色',
  'gw.buttercream-color-chart.r4': '把任意 HEX 转成 RGB 或 HSL',

  /* ---------- what-colors-make-blue ---------- */
  'gw.what-colors-make-blue.lead':
    '蓝是颜料三原色之一，也就是说没有任何颜色组合能落在它上面——你见过的每个"配方"产出的都是发灰的靛蓝或灰。下面是证明这一点的算术，逐个色样实算，外加你真正需要藏青或天蓝时管用的加深和浅化路线。',
  'gw.what-colors-make-blue.ans': '真正的蓝——起点原色，不是调得出来的混合',
  'gw.what-colors-make-blue.introH': '为什么没有颜色能混出蓝',
  'gw.what-colors-make-blue.i1':
    '颜料靠吸收光工作。原色蓝反射你眼睛读作蓝色的那段，吸收其余大部分——不存在哪两种颜料的剩余加起来正好是它。被推荐最多的紫加绿配方，算出来是灰紫泥，因为两者加起来几乎吸收一切，只剩一点昏暗无色的残余。',
  'gw.what-colors-make-blue.i2':
    '屏幕正相反：它们加光，而蓝也是光的原色。所以无论你混颜料还是混光，蓝都是拿来起步的东西。混合能做的是挪动一个已有的蓝——加深到藏青、提亮到天蓝——这是本页实用的一半。',
  'gw.what-colors-make-blue.listH': '差一点的路，全部实算',
  'gw.what-colors-make-blue.m1n': '紫 + 绿（流行配方）',
  'gw.what-colors-make-blue.m1s': '多数网站推荐的组合——诚实实算，落在灰紫上。',
  'gw.what-colors-make-blue.m1c1': '紫',
  'gw.what-colors-make-blue.m1c2': '绿',
  'gw.what-colors-make-blue.m1o':
    '每种颜料抵消对方反射的。上面的色样就是真实落点——一个发灰的藕紫，离蓝很远。这是证明，不是配方。',
  'gw.what-colors-make-blue.m2n': '紫 + 黑（最接近的一次）',
  'gw.what-colors-make-blue.m2s': '加深紫色会漂进靛蓝——任何混合离蓝最近的一次。',
  'gw.what-colors-make-blue.m2c1': '紫',
  'gw.what-colors-make-blue.m2c2': '黑',
  'gw.what-colors-make-blue.m2o':
    '这个读作午夜蓝紫——画深阴影色完全够格，但放到真蓝旁边，紫的倾向立刻露馅。',
  'gw.what-colors-make-blue.m3n': '蓝 + 黑（管用的路线：加深）',
  'gw.what-colors-make-blue.m3s': '从真蓝起步加深——藏青真正的做法。',
  'gw.what-colors-make-blue.m3c1': '蓝',
  'gw.what-colors-make-blue.m3c2': '黑',
  'gw.what-colors-make-blue.m3o':
    '这是"什么颜色调出藏青"的诚实答案：蓝，加小份多次的黑。完整比例表在蓝与黑页面。',
  'gw.what-colors-make-blue.t1t': '蓝靠买，家族靠调。',
  'gw.what-colors-make-blue.t1b':
    '任何标着群青、钴蓝或酞菁蓝的管子都是原色采购。从那一管你能到藏青（加黑）、天蓝（加白）、水鸭（加绿）、长春花蓝（加紫）——混合发生在买之后，不是之前。',
  'gw.what-colors-make-blue.t2t': '暖蓝与冷蓝。',
  'gw.what-colors-make-blue.t2b':
    '群青偏紫（暖），酞菁偏绿（冷）。按你要去的家族挑基底——省得之后用互补色跟倾向搏斗。',
  'gw.what-colors-make-blue.t3t': '糖霜的情况不同。',
  'gw.what-colors-make-blue.t3b':
    '糖霜从白色基底起步，所以那里的"调出蓝"是往白里滴蓝凝胶——一个滴数问题，不是混色理论问题。奶油霜表用精确滴数解决了它。',
  'gw.what-colors-make-blue.f1q': '哪两种颜色能调出蓝？',
  'gw.what-colors-make-blue.f1a':
    '没有。蓝在颜料和光里都是原色，所以没有哪两种颜色能混出它——流行的紫加绿配方算出来是灰紫，上面的色样就是证明。从蓝色素起步，从那里再调。',
  'gw.what-colors-make-blue.f2q': '什么颜色调出藏青？',
  'gw.what-colors-make-blue.f2a':
    '蓝加少量黑。黑要小份小份加——凭手感四分之一的黑已经读作藏青，再多一点就到午夜蓝。完整比例走查见蓝与黑页。',
  'gw.what-colors-make-blue.f3q': '什么颜色调出浅蓝或天蓝？',
  'gw.what-colors-make-blue.f3a':
    '蓝加白。少量白就能很快把蓝抬到天蓝和粉蓝，所以白要逐步加。一点绿能把天蓝带向绿松家族。',
  'gw.what-colors-make-blue.f4q': '什么颜色调出蓝色糖霜？',
  'gw.what-colors-make-blue.f4a':
    '糖霜是滴数问题：从白奶油霜起步，蓝凝胶一次一滴地加。两滴读作粉彩，四五滴是中等蓝——奶油霜配色表列了每个色阶的确切滴数。',
  'gw.what-colors-make-blue.r1': '蓝配黑：藏青比例表',
  'gw.what-colors-make-blue.r2': '蓝配白调出天蓝',
  'gw.what-colors-make-blue.r3': '蓝配绿调出水鸭色',
  'gw.what-colors-make-blue.r4': '全部配色指南',

  /* ---------- what-colors-make-red ---------- */
  'gw.what-colors-make-red.lead':
    '红是颜料原色：和蓝、黄一样，它是你买来的颜料，不是你搭出来的混合。混合能给你的是红周围的一族——珊瑚、树莓、褐红、铁锈。下面是这些混合的诚实实算，外加真正能调出人们搜索的那些红的路线。',
  'gw.what-colors-make-red.ans': '真正的红——所有其他红的调配起点',
  'gw.what-colors-make-red.introH': '为什么红调不出来',
  'gw.what-colors-make-red.i1':
    '原色红颜料反射你眼睛读作红色的长波段，吸收其余。没有任何两种颜料的剩余能拼出那个波段——这正是它成为原色的原因。声称能调红的配方（品红加黄）都悄悄假设你已经拥有品红，而品红只是另一种红族原色。',
  'gw.what-colors-make-red.i2':
    '混合真正擅长的是在红的家族内挪动它：白推它去粉，黑推它去褐红，互补色推它去铁锈和陶土。这些路线是真实存在的，下面都有实算，它们几乎覆盖所有"什么颜色调出 X 红"的问题。',
  'gw.what-colors-make-red.listH': '最近的混合，全部实算',
  'gw.what-colors-make-red.m1n': '粉 + 橙（珊瑚路线）',
  'gw.what-colors-make-red.m1s': '混合离红最近的一次——一个和红暧昧的暖珊瑚。',
  'gw.what-colors-make-red.m1c1': '粉',
  'gw.what-colors-make-red.m1c2': '橙',
  'gw.what-colors-make-red.m1o':
    '把橙压下去、粉提上来，混合会朝红走——但停在珊瑚浆果一带。有用的颜色，诚实的标签：它不是红。',
  'gw.what-colors-make-red.m2n': '粉 + 棕（树莓路线）',
  'gw.what-colors-make-red.m2s': '用棕加深粉落在树莓上——更暗的一次差一点。',
  'gw.what-colors-make-red.m2c1': '粉',
  'gw.what-colors-make-red.m2c2': '棕',
  'gw.what-colors-make-red.m2o':
    '棕是深橙，所以这是粉被自己的家族加深。结果读作树莓浆果——"没有红颜料管时的红系色"的天然落点。',
  'gw.what-colors-make-red.m3n': '红 + 白（管用的路线：浅化）',
  'gw.what-colors-make-red.m3s': '从真红出发，白给出完全可控的粉族。',
  'gw.what-colors-make-red.m3c1': '红',
  'gw.what-colors-make-red.m3c2': '白',
  'gw.what-colors-make-red.m3o':
    '这是"什么颜色调出粉"的诚实答案：红，加浅。一半对一半已经是泡泡糖粉；白再少些给鲑鱼粉和玫瑰粉。完整比例表在红与白页。',
  'gw.what-colors-make-red.t1t': '一管红，整个家族。',
  'gw.what-colors-make-red.t1b':
    '一支镉红或萘酚红，加白（粉）、黑（褐红）、橙（朱红）和它的互补色绿（铁锈、陶土），就覆盖了红族。原色靠买；之后的一切都是调。',
  'gw.what-colors-make-red.t2t': '亮红糖霜是凝胶问题。',
  'gw.what-colors-make-red.t2b':
    '深红糖霜出名的费——要一整管红凝胶加过夜静置，颜色坐着坐着才开花。滴数在糖霜表里；耐心归你。',
  'gw.what-colors-make-red.t3t': '褐红和酒红只差一步。',
  'gw.what-colors-make-red.t3b':
    '褐红是红用棕或黑加深；酒红是红拉向紫。两条路线都在褐红页有实算——不需要第二种原色。',
  'gw.what-colors-make-red.f1q': '哪两种颜色能调出红？',
  'gw.what-colors-make-red.f1a':
    '没有——红是原色颜料。粉加橙停在珊瑚，粉加棕停在树莓；上面两个色样就是实算证明。从红色素起步向外调。',
  'gw.what-colors-make-red.f2q': '什么颜色调出深红或褐红？',
  'gw.what-colors-make-red.f2a':
    '红加一点棕，或红加一点黑。等量红棕落在砖红；再补一点黑就到褐红。三条路线的走查都在褐红页。',
  'gw.what-colors-make-red.f3q': '什么颜色调出粉？',
  'gw.what-colors-make-red.f3a':
    '红加白。等量给泡泡糖粉；白少些给鲑鱼粉和玫瑰粉。粉是红的浅化，所以不需要别的路线——比例见红与白页。',
  'gw.what-colors-make-red.f4q': '什么颜色调出红色糖霜？',
  'gw.what-colors-make-red.f4a':
    '白糖霜加重剂量红凝胶：粉彩红要两三滴，正红可能要八滴以上，深红应该过夜静置让它开花。滴数表在糖霜配色表。',
  'gw.what-colors-make-red.r1': '什么颜色调出褐红',
  'gw.what-colors-make-red.r2': '红配白调出粉',
  'gw.what-colors-make-red.r3': '红配绿调出棕——互补色的一课',
  'gw.what-colors-make-red.r4': '全部配色指南',

  /* ---------- what-colors-make-black ---------- */
  'gw.what-colors-make-black.lead':
    '纯黑是颜料混合永远差一点的那种颜色——颜料堆上去得到的是浓炭灰，不是虚空。但这些近黑真的有用，而且每条路线各有温度：三原色调和是教科书答案，互补色对给你暖冷两个版本。下面全部实算。',
  'gw.what-colors-make-black.ans': '全量混合能达到的最深——一种柔炭灰',
  'gw.what-colors-make-black.introH': '为什么混出来的黑永远是近黑',
  'gw.what-colors-make-black.i1':
    '颜料吸收光，而完美的黑要吸收一切。真实颜料每种都会漏掉一些波长，所以每次混合都会漏一点颜色——下面最深的混合仍然微微偏紫。这不是失败；艺术家花钱买这种混合，名字叫中性 tint。',
  'gw.what-colors-make-black.i2':
    '两个值得记住的机制：三原色合起来是三层吸收的叠加，互补色对（红绿、蓝橙）以同样方式抵消色相。商业答案——炭黑、马斯黑颜料——是研进油里的烟灰，这就是为什么它真正中性又真正便宜。',
  'gw.what-colors-make-black.listH': '各条路线，全部实算',
  'gw.what-colors-make-black.m1n': '三原色全上',
  'gw.what-colors-make-black.m1s': '红 + 黄 + 蓝：课堂答案，落在暖紫灰上。',
  'gw.what-colors-make-black.m1c1': '红',
  'gw.what-colors-make-black.m1c2': '黄',
  'gw.what-colors-make-black.m1c3': '蓝',
  'gw.what-colors-make-black.m1o':
    '它可行，也最难控制——比例的小变化会摆动冷暖。实算落点是灰紫驼色，比多数人预期的暖一档。',
  'gw.what-colors-make-black.m2n': '红 + 绿（暖近黑）',
  'gw.what-colors-make-black.m2s': '互补色对抵消色相，留下偏橄榄的暖深色。',
  'gw.what-colors-make-black.m2c1': '红',
  'gw.what-colors-make-black.m2c2': '绿',
  'gw.what-colors-make-black.m2o':
    '因为绿里已经含黄，这条路线落点偏暖——棕土巧克力的地界而不是灰。当你的"黑"要挨着大地色系坐下时用这条。',
  'gw.what-colors-make-black.m3n': '红 + 绿 + 蓝（最深的混合）',
  'gw.what-colors-make-black.m3s': '把黄换成蓝：本页最深、最中性的混合。',
  'gw.what-colors-make-black.m3c1': '红',
  'gw.what-colors-make-black.m3c2': '绿',
  'gw.what-colors-make-black.m3c3': '蓝',
  'gw.what-colors-make-black.m3o':
    '蓝把黄漏掉的那部分吸收掉了。这是实用的"混出来的黑"——带冷倾向的柔炭灰，也是本页所有混合里最接近中性的。',
  'gw.what-colors-make-black.t1t': '什么时候调，什么时候买。',
  'gw.what-colors-make-black.t1b':
    '当黑需要和画面协调时就调——轻微的冷暖倾向把影子粘进场景。需要覆盖力和中性时就买炭黑：它是货架最便宜的颜料之一。',
  'gw.what-colors-make-black.t2t': '灰就是本页加白。',
  'gw.what-colors-make-black.t2b':
    '上面每个近黑加白都得到同温度的灰——红绿路线给暖灰，三色调和给冷灰。比例走查在黑与白页。',
  'gw.what-colors-make-black.t3t': '黑糖霜有自己的物理。',
  'gw.what-colors-make-black.t3b':
    '奶油霜从白起步，所以黑糖霜意味着往白里灌凝胶——从巧克力起步而不是白，否则滴数会变得残酷。完整方法在黑糖霜页。',
  'gw.what-colors-make-black.f1q': '什么颜色调出黑？',
  'gw.what-colors-make-black.f1a':
    '三原色（红、黄、蓝）调和出暖炭灰，互补色对如红加绿给更深更暖的版本。本页最深的混合是红、绿、蓝一起。真正的中性黑来自碳颜料，不是混合。',
  'gw.what-colors-make-black.f2q': '什么颜色调出黑色颜料？',
  'gw.what-colors-make-black.f2a':
    '丙烯或油画：红绿蓝混合给可控的柔黑；商品管装用炭黑或马斯黑颜料，中性不透明。混出来的黑当阴影色最出彩，因为轻微的色偏能把画面统一。',
  'gw.what-colors-make-black.f3q': '什么颜色调出灰？',
  'gw.what-colors-make-black.f3a':
    '任选上面一条近黑路线加白——黑白等量给中灰。暖灰来自红绿路线，冷灰来自三色路线。',
  'gw.what-colors-make-black.f4q': '什么颜色调出黑糖霜？',
  'gw.what-colors-make-black.f4a':
    '从巧克力奶油霜起步而不是白——深色基底意味着黑凝胶少用得多。加黑凝胶，然后静置：黑糖霜在一小时内持续变深。完整方法在黑糖霜页。',
  'gw.what-colors-make-black.r1': '黑配白调出灰',
  'gw.what-colors-make-black.r2': '怎么调黑糖霜',
  'gw.what-colors-make-black.r3': '红配绿：互补抵消',
  'gw.what-colors-make-black.r4': '全部配色指南',

  /* ---------- what-colors-make-maroon ---------- */
  'gw.what-colors-make-maroon.lead':
    '褐红是被加深并稍微调浑的红——官方说法是棕红，所以最简单的配方就是红加棕。按你想要哪种风味的褐红，有三条有用的路线：砖红、正褐红，或偏紫的酒红一侧。三条下面全部实算。',
  'gw.what-colors-make-maroon.ans': '深褐红',
  'gw.what-colors-make-maroon.introH': '褐红到底是什么',
  'gw.what-colors-make-maroon.i1':
    '在纸面上，褐红是深的棕调红——想想砖红、牛血红、大学连帽衫的颜色。它坐在红与棕之间的加深轴上，所以用红自己的家族（棕，或一点黑）加深红是最干净的路线。把它拉向紫就滑进酒红，褐红更冷的表亲。',
  'gw.what-colors-make-maroon.i2':
    '下面三条路线的差别就在那个倾向上。按目的地挑：砖红铁锈走棕侧，深路线走连帽衫褐红，紫路线走酒色调。',
  'gw.what-colors-make-maroon.listH': '三条路线，全部实算',
  'gw.what-colors-make-maroon.m1n': '红 + 棕（直达路线）',
  'gw.what-colors-make-maroon.m1s': '等量落在砖红——褐红里明亮带锈的那端。',
  'gw.what-colors-make-maroon.m1c1': '红',
  'gw.what-colors-make-maroon.m1c2': '棕',
  'gw.what-colors-make-maroon.m1o':
    '因为棕是深橙，这一步同时把红加暖加深。等量给砖红；这是本页所有其他褐红的起步比例。',
  'gw.what-colors-make-maroon.m2n': '红 + 棕 + 黑（深路线）',
  'gw.what-colors-make-maroon.m2s': '一点点黑把砖红压到真正的连帽衫褐红。',
  'gw.what-colors-make-maroon.m2c1': '红',
  'gw.what-colors-make-maroon.m2c2': '棕',
  'gw.what-colors-make-maroon.m2c3': '黑',
  'gw.what-colors-make-maroon.m2o':
    '实算落点是人们说褐红时心里想的那种褐红——深、微棕、毫无疑问是红族。黑最后加，小份多次。',
  'gw.what-colors-make-maroon.m3n': '红 + 紫（酒红路线）',
  'gw.what-colors-make-maroon.m3s': '同样的深度从紫侧到达——酒色的地界。',
  'gw.what-colors-make-maroon.m3c1': '红',
  'gw.what-colors-make-maroon.m3c2': '紫',
  'gw.what-colors-make-maroon.m3o':
    '需求写的是酒红或牛血红而不是褐红时用这条：等量读作带冷调的浓郁浆果褐红。严格说是另一种颜色；实际是同一个搜索。',
  'gw.what-colors-make-maroon.t1t': '一句话分清褐红和酒红。',
  'gw.what-colors-make-maroon.t1b':
    '褐红是红被棕加深（暖）；酒红是红被紫加深（冷）。同样的深度，不同的倾向——据此挑上面的路线。',
  'gw.what-colors-make-maroon.t2t': '褐红调过深的补救。',
  'gw.what-colors-make-maroon.t2b':
    '用红拉回来，永远别用白——白会把它粉掉，杀死本色。如果是变浑而不是变深，少量红橙能救回暖意。',
  'gw.what-colors-make-maroon.t3t': '褐红糖霜从巧克力起步。',
  'gw.what-colors-make-maroon.t3b':
    '糖霜和奶油霜都从巧克力基底起步再滴红凝胶——从白糖霜搭褐红费滴数也费耐心。基底部分奶油霜表讲清楚了。',
  'gw.what-colors-make-maroon.f1q': '什么颜色调出褐红？',
  'gw.what-colors-make-maroon.f1a':
    '红棕等量给砖红褐红；加少量黑加深到经典褐红。要偏紫的酒红版本，改用红加紫。三条上面都有实算。',
  'gw.what-colors-make-maroon.f2q': '褐红和酒红有什么区别？',
  'gw.what-colors-make-maroon.f2a':
    '都是深红。褐红偏棕（暖、像砖），酒红偏紫（冷、像酒）——所以褐红来自红加棕，酒红来自红加紫。上面的路线把两个落点都摆出来了。',
  'gw.what-colors-make-maroon.f3q': '什么颜色调出深红？',
  'gw.what-colors-make-maroon.f3a':
    '深红是同家族里比褐红浅一档的色：红加一点棕或黑，保持红占主导。大约两份红配一份棕，读作深红，再往下才是褐红。',
  'gw.what-colors-make-maroon.f4q': '什么颜色调出褐红颜料？',
  'gw.what-colors-make-maroon.f4a':
    '丙烯或油画里红棕路线最好控：镉红加熟褐，需要再用一点黑加深。红紫路线对应喹吖啶酮红加二噁嗪紫，走酒红那一侧。',
  'gw.what-colors-make-maroon.r1': '什么颜色调出红（原色真相）',
  'gw.what-colors-make-maroon.r2': '红配紫：酒红混合',
  'gw.what-colors-make-maroon.r3': '怎么调棕色糖霜',
  'gw.what-colors-make-maroon.r4': '全部配色指南',

  /* ---------- what-colors-make-peach ---------- */
  'gw.what-colors-make-peach.lead':
    '桃色是被向肤色柔化的橙——这让它成为最容易调的自定义色之一，因为整个配方就是橙加白，再按喜好偏粉或偏黄。下面三条路线，从经典款到玫瑰款，每个色样都实算。',
  'gw.what-colors-make-peach.ans': '柔桃色',
  'gw.what-colors-make-peach.introH': '为什么桃色好调',
  'gw.what-colors-make-peach.i1':
    '桃色坐在橙与粉之间的高亮度区——正式说法是浅的、微偏粉的橙。因为没有任何东西需要被抵消（没有互补色打架），路线全是简单浅化：用白提亮橙，再把结果按口味偏粉或偏黄。这里的路线没有一条会糟到发浑。',
  'gw.what-colors-make-peach.i2':
    '那个亮度也是需要保护的东西：桃色一变深就死了。如果混合滑向鲑鱼或杏色，用白拉回来，不是加橙。',
  'gw.what-colors-make-peach.listH': '三条路线，全部实算',
  'gw.what-colors-make-peach.m1n': '橙 + 白（直达路线）',
  'gw.what-colors-make-peach.m1s': '等量落在经典桃色——浅、暖、接近肤色。',
  'gw.what-colors-make-peach.m1c1': '橙',
  'gw.what-colors-make-peach.m1c2': '白',
  'gw.what-colors-make-peach.m1o':
    '这是教科书桃色，也是值得记住的比例。白更多推向奶油色；橙更多拉向杏色——都是好邻居，不是错误。',
  'gw.what-colors-make-peach.m2n': '粉 + 黄（玫瑰路线）',
  'gw.what-colors-make-peach.m2s': '混橙的两个"父母"得到带粉调的桃色。',
  'gw.what-colors-make-peach.m2c1': '粉',
  'gw.what-colors-make-peach.m2c2': '黄',
  'gw.what-colors-make-peach.m2o':
    '粉本身就是浅红，所以这条路线从零件搭桃色，落点比直达路线更偏粉——腮红盘的桃而不是水果盘的桃。',
  'gw.what-colors-make-peach.m3n': '橙 + 白 + 一点粉（肤色路线）',
  'gw.what-colors-make-peach.m3s': '直达桃色轻推一点粉——肖像画家认识的那种混合。',
  'gw.what-colors-make-peach.m3c1': '橙',
  'gw.what-colors-make-peach.m3c2': '白',
  'gw.what-colors-make-peach.m3c3': '粉',
  'gw.what-colors-make-peach.m3o':
    '一点点粉正是让桃色读作肤色而不是水果的东西。粉要少——在这个亮度上一点点走很远。',
  'gw.what-colors-make-peach.t1t': '桃色、杏色、鲑鱼粉。',
  'gw.what-colors-make-peach.t1b':
    '同一家族，不同倾向：桃色居中，杏色偏黄橙侧，鲑鱼粉是更深偏粉侧。你的旋钮就是粉黄平衡和白量——没有别的。',
  'gw.what-colors-make-peach.t2t': '桃色糖霜是滴数问题。',
  'gw.what-colors-make-peach.t2b':
    '白奶油霜加一点橙凝胶、再碰一点粉，就是桃色糖霜——每杯两滴橙一滴粉是工作配方。基底滴数表在奶油霜配色表。',
  'gw.what-colors-make-peach.t3t': '保住浅，否则失去它。',
  'gw.what-colors-make-peach.t3b':
    '桃色一变深就塌进鲑鱼粉和陶土。调整时先摸白；需要暖意时，橙的量比你以为的再少些。',
  'gw.what-colors-make-peach.f1q': '什么颜色调出桃色？',
  'gw.what-colors-make-peach.f1a':
    '橙白等量——整个经典配方就这些。要更玫瑰的桃，改混粉和黄，或在橙白混合里加一点粉得到肤色版。',
  'gw.what-colors-make-peach.f2q': '什么颜色调出桃色颜料？',
  'gw.what-colors-make-peach.f2a':
    '白颜料加少量橙，再用一点粉或黄微调。因为桃色是浅色系，从大部分白起步逐渐加橙——变深容易，拉回来难。',
  'gw.what-colors-make-peach.f3q': '桃色和橙色有什么区别？',
  'gw.what-colors-make-peach.f3a':
    '桃色是提亮又微偏粉的橙——同色相家族，更浅更柔。橙加白能弥合大部分差距；剩下的差别就是那一小点粉调。',
  'gw.what-colors-make-peach.f4q': '什么颜色调出粉？',
  'gw.what-colors-make-peach.f4a':
    '红和白——粉是红的浅化。然后往粉里加一点橙或黄就到桃色，这就是上面粉加黄落在桃色的原因。',
  'gw.what-colors-make-peach.r1': '橙配白：基底混合',
  'gw.what-colors-make-peach.r2': '粉配黄：玫瑰路线',
  'gw.what-colors-make-peach.r3': '红配白调出粉',
  'gw.what-colors-make-peach.r4': '全部配色指南',

  /* ---------- what-colors-make-turquoise ---------- */
  'gw.what-colors-make-turquoise.lead':
    '绿松石是蓝和绿达成一致——但默认的等量混合其实落在水鸭色上，那个更深的表亲。要人们想象中的亮绿松石（泳池水、加勒比浅滩），配方要偏绿再用白提亮。三条路线下面逐色样实算。',
  'gw.what-colors-make-turquoise.ans': '亮绿松石色',
  'gw.what-colors-make-turquoise.introH': '绿松石、水鸭和绿的倾向',
  'gw.what-colors-make-turquoise.i1':
    '绿松石坐在蓝和绿之间但更靠近绿，亮度很高——想想宝石和热带海水。水鸭是同一个概念更深更蓝的版本，这就是为什么天真的蓝绿五五开给你的是水鸭不是绿松石。修正靠两个旋钮：推绿，然后加白拿光。',
  'gw.what-colors-make-turquoise.i2':
    '这一切不需要你没有的颜色。蓝、绿、白——下面调色器里这三样——覆盖从深水鸭到亮绿松石的整段旅程。',
  'gw.what-colors-make-turquoise.listH': '三条路线，全部实算',
  'gw.what-colors-make-turquoise.m1n': '蓝 + 绿（基底混合——落在水鸭色）',
  'gw.what-colors-make-turquoise.m1s': '等量给出那种正式名称叫水鸭色的深蓝绿。',
  'gw.what-colors-make-turquoise.m1c1': '蓝',
  'gw.what-colors-make-turquoise.m1c2': '绿',
  'gw.what-colors-make-turquoise.m1o':
    '从这里开始看清问题：实算落点是深海军蓝绿——好看，但它是水鸭。本页每条绿松石配方都是这个混合加两步修正。',
  'gw.what-colors-make-turquoise.m2n': '偏绿的混合（真绿松石路线）',
  'gw.what-colors-make-turquoise.m2s': '两份绿配一份蓝，把混合转到绿松石色相上。',
  'gw.what-colors-make-turquoise.m2c1': '绿',
  'gw.what-colors-make-turquoise.m2c2': '蓝',
  'gw.what-colors-make-turquoise.m2o':
    '这就是绿松石的色相——绿的倾向做了全部工作。实算结果是深绿松石，这个颜色的宝石档。',
  'gw.what-colors-make-turquoise.m3n': '绿 + 蓝 + 白（亮绿松石路线）',
  'gw.what-colors-make-turquoise.m3s': '用白提亮偏绿混合，得到泳池水的绿松石。',
  'gw.what-colors-make-turquoise.m3c1': '绿',
  'gw.what-colors-make-turquoise.m3c2': '蓝',
  'gw.what-colors-make-turquoise.m3c3': '白',
  'gw.what-colors-make-turquoise.m3o':
    '白补上了把绿松石和水鸭分开的亮度。白再多走向水色和粉彩泳池调；少一点保持饱和的宝石感。',
  'gw.what-colors-make-turquoise.t1t': '一句话分清绿松石和水鸭。',
  'gw.what-colors-make-turquoise.t1b':
    '水鸭是更深偏蓝的那位；绿松石更亮偏绿。同样两种母色——差别在绿的比例和白提亮。',
  'gw.what-colors-make-turquoise.t2t': '如果它退回水鸭色。',
  'gw.what-colors-make-turquoise.t2b':
    '加绿，不是加黄——黄会把混合推向春绿和青柠。如果是变浑而不是变蓝，说明蓝在称王：拉掉一些蓝，别往上面堆绿。',
  'gw.what-colors-make-turquoise.t3t': '绿松石糖霜很宽容。',
  'gw.what-colors-make-turquoise.t3b':
    '白奶油霜里天蓝凝胶加一点柠檬黄就是绿松石糖霜，奶油霜的黄底替你完成一半的偏移。滴数在奶油霜配色表。',
  'gw.what-colors-make-turquoise.f1q': '什么颜色调出绿松石色？',
  'gw.what-colors-make-turquoise.f1a':
    '蓝和绿——但要偏绿，两份配一份，否则混合落在水鸭上。要亮绿松石，往偏绿混合里加白，提向泳池水的调子。',
  'gw.what-colors-make-turquoise.f2q': '绿松石和水鸭色有什么区别？',
  'gw.what-colors-make-turquoise.f2a':
    '水鸭更深偏蓝；绿松石更亮偏绿。都来自蓝和绿——等量混合给水鸭，偏绿混合给绿松石。',
  'gw.what-colors-make-turquoise.f3q': '什么颜色调出水鸭色？',
  'gw.what-colors-make-turquoise.f3a':
    '蓝绿等量——本页第一条实算混合。从水鸭到绿松石的完整比例走查在蓝与绿页。',
  'gw.what-colors-make-turquoise.f4q': '什么颜色调出绿松石颜料？',
  'gw.what-colors-make-turquoise.f4a':
    '酞菁蓝或天蓝配偏绿的酞菁绿，大约一份蓝两份绿，然后加白提亮。绿颜料的选择有讲究：偏蓝的绿如酞菁保持混合干净。',
  'gw.what-colors-make-turquoise.r1': '蓝配绿调出水鸭：完整比例走查',
  'gw.what-colors-make-turquoise.r2': '什么颜色调出蓝',
  'gw.what-colors-make-turquoise.r3': '绿配白调出薄荷色',
  'gw.what-colors-make-turquoise.r4': '全部配色指南',
};
