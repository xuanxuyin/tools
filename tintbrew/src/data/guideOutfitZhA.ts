/**
 * Guide long-copy dictionary, zh — outfit pages, first half
 * (what-colors-go-with brown + green). Keys mirror the en generator in
 * i18n.test.ts exactly (`ow.<slug>.<field>`); a guard test fails if
 * either side drifts.
 */
export const OUTFIT_ZH_A: Record<string, string> = {
  /* ---------- what-colors-go-with-brown ---------- */
  'ow.what-colors-go-with-brown.lead':
    '棕是衣橱里最友好的"难"色：它是带暖调的深中性色，这意味着几乎每个经典中性色都听它的——奶油、白、藏青、橄榄、黑皮——失败的搭配少而具体。下面十套穿搭每次锚定一种不同的棕（日晒棕、巧克力、驼色、浓缩咖啡），每个色样带确切 HEX 和让搭配成立的可计算亮度差。',
  'ow.what-colors-go-with-brown.base': '栗棕色',
  'ow.what-colors-go-with-brown.top': '栗棕色上衣',
  'ow.what-colors-go-with-brown.introH': '为什么棕几乎和所有颜色都能配',
  'ow.what-colors-go-with-brown.i1':
    '棕是深橙。这一个事实解释了下面每一组搭配：色环上靠近橙的颜色（日晒棕、驼色、铁锈、金）与它同调融合，而远离橙的颜色（藏青、浅蓝、森林绿）提供对比，让棕不至于单调。因为棕亮度低，它也表现得像中性色——和黑、藏青一样——所以奶油和米白这样的浅中性色可以坐在旁边而不抢戏。',
  'ow.what-colors-go-with-brown.i2':
    '多数造型师收敛出的实用规则：用一件棕色单品锚定整身，伙伴色要么选同一暖家族，要么选一个安静对比色，并保证单品之间至少有一处够大的亮度差。那个差距——可测量而非凭感觉——就是每组下方 Oklab 读数报告的东西：0.3 以上的亮度差读起来利落，接近相等的亮度读起来松弛，而这是一个你可以有意拧动的旋钮。',
  'ow.what-colors-go-with-brown.combosH': '十套穿搭，锚定棕色',
  'ow.what-colors-go-with-brown.cb1n': '日晒棕休闲裤、白T、棕色乐福鞋',
  'ow.what-colors-go-with-brown.cb1sc': '日常默认',
  'ow.what-colors-go-with-brown.cb1o':
    '棕色系穿搭的制服：浅日晒棕裤子、素白上衣、深棕皮鞋打底。一年九个月不用想就能穿。',
  'ow.what-colors-go-with-brown.cb1it1': '日晒棕休闲裤',
  'ow.what-colors-go-with-brown.cb1it2': '米白T恤',
  'ow.what-colors-go-with-brown.cb1it3': '棕色乐福鞋',
  'ow.what-colors-go-with-brown.cb2n': '巧克力针织、奶油长裤、浓缩咖啡色靴子',
  'ow.what-colors-go-with-brown.cb2sc': '秋季通勤',
  'ow.what-colors-go-with-brown.cb2o':
    '上身深巧克力、下身奶油、浓缩咖啡色靴子压底——毛衣季公式，在办公室从不穿错。',
  'ow.what-colors-go-with-brown.cb2it1': '巧克力色针织',
  'ow.what-colors-go-with-brown.cb2it2': '奶油色长裤',
  'ow.what-colors-go-with-brown.cb2it3': '浓缩咖啡色短靴',
  'ow.what-colors-go-with-brown.cb3n': '棕色皮夹克、黑T、灰牛仔裤',
  'ow.what-colors-go-with-brown.cb3sc': '周末',
  'ow.what-colors-go-with-brown.cb3o':
    '棕配黑早已不算犯规——皮夹克是最容易证明这一点的地方。其余保持灰度，让夹克说话。',
  'ow.what-colors-go-with-brown.cb3it1': '棕色皮夹克',
  'ow.what-colors-go-with-brown.cb3it2': '黑色T恤',
  'ow.what-colors-go-with-brown.cb3it3': '灰色牛仔裤',
  'ow.what-colors-go-with-brown.cb3it4': '黑色靴子',
  'ow.what-colors-go-with-brown.cb4n': '驼色大衣、藏青毛衣、深色牛仔',
  'ow.what-colors-go-with-brown.cb4sc': '冬季通勤',
  'ow.what-colors-go-with-brown.cb4o':
    '驼色是棕最讲究的档位。罩在藏青和牛仔上，不用一个 logo 就读起来很贵；棕色靴子在底部收口。',
  'ow.what-colors-go-with-brown.cb4it1': '驼色大衣',
  'ow.what-colors-go-with-brown.cb4it2': '藏青毛衣',
  'ow.what-colors-go-with-brown.cb4it3': '深色牛仔裤',
  'ow.what-colors-go-with-brown.cb4it4': '棕色切尔西靴',
  'ow.what-colors-go-with-brown.cb5n': '棕灯芯绒裤、橄榄绿衬衫、白球鞋',
  'ow.what-colors-go-with-brown.cb5sc': '校园',
  'ow.what-colors-go-with-brown.cb5o':
    '棕灯芯绒和橄榄绿在色环上是邻居，这正是它们待在一起放松的原因。白球鞋防止这对低对比组合发浑。',
  'ow.what-colors-go-with-brown.cb5it1': '棕色灯芯绒裤',
  'ow.what-colors-go-with-brown.cb5it2': '橄榄绿衬衫',
  'ow.what-colors-go-with-brown.cb5it3': '白色球鞋',
  'ow.what-colors-go-with-brown.cb6n': '浓缩咖啡色长裤、腮红粉上衣、日晒棕高跟鞋',
  'ow.what-colors-go-with-brown.cb6sc': '约会夜',
  'ow.what-colors-go-with-brown.cb6o':
    '棕最让人意外的挚友是灰粉——暖度相配，亮度差干活。日晒棕高跟鞋延长腿部线条而不是打断它。',
  'ow.what-colors-go-with-brown.cb6it1': '浓缩咖啡色长裤',
  'ow.what-colors-go-with-brown.cb6it2': '腮红粉衬衫',
  'ow.what-colors-go-with-brown.cb6it3': '日晒棕高跟鞋',
  'ow.what-colors-go-with-brown.cb7n': '棕色长裙、铁锈红毛衣、金色首饰',
  'ow.what-colors-go-with-brown.cb7sc': '秋日',
  'ow.what-colors-go-with-brown.cb7o':
    '同调棕色穿搭带一度色相偏移：铁锈红是棕更热的表亲。金色五金属于这里，银色不属于。',
  'ow.what-colors-go-with-brown.cb7it1': '棕色半身长裙',
  'ow.what-colors-go-with-brown.cb7it2': '铁锈红毛衣',
  'ow.what-colors-go-with-brown.cb7it3': '棕色短靴',
  'ow.what-colors-go-with-brown.cb7it4': '金色首饰',
  'ow.what-colors-go-with-brown.cb8n': '棕色西装外套、浅蓝牛津衬衫、炭灰长裤',
  'ow.what-colors-go-with-brown.cb8sc': '商务休闲',
  'ow.what-colors-go-with-brown.cb8o':
    '浅蓝配棕是被低估的强强组合——去看任何穿得好的新闻主播。巧克力色外套读起来有权威感，不随意。',
  'ow.what-colors-go-with-brown.cb8it1': '棕色西装外套',
  'ow.what-colors-go-with-brown.cb8it2': '浅蓝牛津衬衫',
  'ow.what-colors-go-with-brown.cb8it3': '炭灰色长裤',
  'ow.what-colors-go-with-brown.cb8it4': '深棕色德比鞋',
  'ow.what-colors-go-with-brown.cb9n': '灰棕裤、酒红上衣、短靴',
  'ow.what-colors-go-with-brown.cb9sc': '想玩点颜色',
  'ow.what-colors-go-with-brown.cb9o':
    '灰棕是向灰冷却的棕，酒红是与它共享克制感的红。对穿腻了藏青配灰棕的人，这是一步升级。',
  'ow.what-colors-go-with-brown.cb9it1': '灰棕色裤子',
  'ow.what-colors-go-with-brown.cb9it2': '酒红色上衣',
  'ow.what-colors-go-with-brown.cb9it3': '棕色短靴',
  'ow.what-colors-go-with-brown.cb10n': '棕色背带裤、布列塔尼条纹、白鞋',
  'ow.what-colors-go-with-brown.cb10sc': '周末跑腿',
  'ow.what-colors-go-with-brown.cb10o':
    '法式市集组合：棕色牛仔背带裤内搭藏青白条纹上衣。很难穿难看，很容易天天穿。',
  'ow.what-colors-go-with-brown.cb10it1': '棕色背带裤',
  'ow.what-colors-go-with-brown.cb10it2': '藏青条纹上衣',
  'ow.what-colors-go-with-brown.cb10it3': '白色帆布鞋',
  'ow.what-colors-go-with-brown.dc1n': '皮革、奶油、橄榄',
  'ow.what-colors-go-with-brown.dc1o':
    '客厅默认款：皮或皮革棕沙发、奶油墙、橄榄绿靠垫、下面暖木色。',
  'ow.what-colors-go-with-brown.dc1c1': '皮革沙发',
  'ow.what-colors-go-with-brown.dc1c2': '奶油色墙',
  'ow.what-colors-go-with-brown.dc1c3': '橄榄绿靠垫',
  'ow.what-colors-go-with-brown.dc1c4': '暖色木质',
  'ow.what-colors-go-with-brown.dc2n': '胡桃木与白',
  'ow.what-colors-go-with-brown.dc2o': '厨房组合：胡桃木橱柜或料理台面，配纯白墙面和近黑台面。',
  'ow.what-colors-go-with-brown.dc2c1': '胡桃木',
  'ow.what-colors-go-with-brown.dc2c2': '白色墙面',
  'ow.what-colors-go-with-brown.dc2c3': '黑色台面',
  'ow.what-colors-go-with-brown.dc3n': '浓缩咖啡与黄铜',
  'ow.what-colors-go-with-brown.dc3o': '卧室档位：浓缩咖啡色木、黄铜灯、水洗亚麻。深、暖、静。',
  'ow.what-colors-go-with-brown.dc3c1': '浓缩咖啡色木',
  'ow.what-colors-go-with-brown.dc3c2': '黄铜',
  'ow.what-colors-go-with-brown.dc3c3': '亚麻色',
  'ow.what-colors-go-with-brown.dc4n': '日晒棕与鼠尾草',
  'ow.what-colors-go-with-brown.dc4o':
    '玄关版本：日晒棕篮子和黄麻、鼠尾草绿漆面、白色门框。棕最安静的两位伙伴聚在一处。',
  'ow.what-colors-go-with-brown.dc4c1': '日晒棕篮',
  'ow.what-colors-go-with-brown.dc4c2': '鼠尾草绿漆',
  'ow.what-colors-go-with-brown.dc4c3': '白色门框',
  'ow.what-colors-go-with-brown.av1n': '亮橙',
  'ow.what-colors-go-with-brown.av1w':
    '离棕只差一个色相档：读起来像一次失败的深浅匹配而不是刻意搭配。铁锈红可以，交通锥橙不行。',
  'ow.what-colors-go-with-brown.av2n': '霓虹青柠',
  'ow.what-colors-go-with-brown.av2w':
    '全饱和度的绿和棕的暖调正面开战。橄榄绿和鼠尾草做同样的工作，但是以协商而不是争吵的方式。',
  'ow.what-colors-go-with-brown.av3n': '冰粉',
  'ow.what-colors-go-with-brown.av3w':
    '唯一一种嘲讽棕的黄底而不是美化它的粉彩。灰粉（见第六套）才是管用的版本。',
  'ow.what-colors-go-with-brown.t1t': '每身保住一处亮度差。',
  'ow.what-colors-go-with-brown.t1b':
    '棕色穿搭的失败方式是整身均匀地半深，而不是选错色相。确保至少一件单品明显高于或低于其余——每组下方的 Oklab 读数告诉你是哪一件。',
  'ow.what-colors-go-with-brown.t2t': '皮件要同族。',
  'ow.what-colors-go-with-brown.t2b':
    '鞋、腰带、表带：保持在同一个棕色家族里，不必是同一个深浅。干邑配偏干邑的日晒棕，浓缩咖啡配浓缩咖啡。',
  'ow.what-colors-go-with-brown.t3t': '暖灰优先于冷灰。',
  'ow.what-colors-go-with-brown.t3b':
    '灰和棕能配，前提是灰偏暖（灰米、灰棕）。冷蓝灰挨着棕会让两个颜色都像失误。',
  'ow.what-colors-go-with-brown.t4t': '让材质扛起同调穿搭。',
  'ow.what-colors-go-with-brown.t4b':
    '棕色最大胆的安全动作是全棕穿搭配混合材质——麂皮、灯芯绒、皮革、针织。材质差异补上色相不肯给的对比。',
  'ow.what-colors-go-with-brown.f1q': '什么颜色配棕色衣服？',
  'ow.what-colors-go-with-brown.f1a':
    '可靠的伙伴是奶油和米白、藏青、浅蓝、橄榄、森林绿、黑皮、灰粉，以及其他棕色（日晒棕、驼色、浓缩咖啡）。两条规则覆盖几乎一切：伙伴色从暖家族选是松弛读法，从藏青/绿选是对比读法——并且单品间保住一处清晰的亮度差。',
  'ow.what-colors-go-with-brown.f2q': '黑配棕行吗？',
  'ow.what-colors-go-with-brown.f2a':
    '行——老禁令过时了。管用的版本是有纹理的棕（皮革、麂皮）配黑色基本款，让材质分开两种深色。仍然失败的版本是平整的黑布挨着平整的棕布、亮度几乎相同、整身没有任何对比件。',
  'ow.what-colors-go-with-brown.f3q': '灰配棕行吗？',
  'ow.what-colors-go-with-brown.f3a':
    '暖灰行：灰米、灰棕、石灰色。冷蓝灰和棕的黄底打架，让两个颜色都显脏。如果你的灰读起来冷，换成奶油或橄榄。',
  'ow.what-colors-go-with-brown.f4q': '棕裤子配什么颜色的鞋？',
  'ow.what-colors-go-with-brown.f4a':
    '更深的棕鞋——经典规则是裤脚以下的皮色应比裤子深一两档。日晒棕休闲裤配栗色或浓缩咖啡色；巧克力色长裤配近黑的棕。黑鞋行，前提是身上别处有黑色接应。',
  'ow.what-colors-go-with-brown.f5q': '棕色是中性色吗？',
  'ow.what-colors-go-with-brown.f5a':
    '在衣橱意义上是：棕是低亮度的深橙，像藏青或黑一样足以退后去锚定一身。这就是浅色和柔和色能如此自由地与它配对的原因——你拿到对比，却没有竞争。',
  'ow.what-colors-go-with-brown.r1': '什么颜色调出棕色（为什么它是深橙）',
  'ow.what-colors-go-with-brown.r2': '什么颜色配酒红',
  'ow.what-colors-go-with-brown.r3': '棕配白：日晒棕梯度，每种比例',
  'ow.what-colors-go-with-brown.r4': '全部配色指南',

  /* ---------- what-colors-go-with-green ---------- */
  'ow.what-colors-go-with-green.lead':
    '绿一件顶四件衣橱——橄榄、鼠尾草、森林、祖母绿——每个档位朋友不同。下面十套跨全部四档，每次锚定一件绿色单品，带确切 HEX 和能告诉你搭配为什么成立的计算亮度差，而不是只下断言。',
  'ow.what-colors-go-with-green.base': '森林绿',
  'ow.what-colors-go-with-green.top': '森林绿上衣',
  'ow.what-colors-go-with-green.introH': '为什么绿是四个不同的搭配问题',
  'ow.what-colors-go-with-green.i1':
    '绿坐在光谱正中，翻译成衣橱语言就是：所有颜色不是邻居就是对比。蓝和水鸭是邻居——共享绿的冷侧，容易融合。奶油、日晒棕和驼色是中性人群——让绿做唯一的声音。酒红和芥末是经典的深暖对比，它们管用正是因为在色环上离绿够远、又和绿共享那种柔和自然的档位。',
  'ow.what-colors-go-with-green.i2':
    '档位比色相更重要。橄榄要日晒棕、奶油和酒红；鼠尾草要奶油、灰和驼色；森林要驼色和深牛仔；祖母绿要黑和金。把下面每组当成一堂档位课而不只是配色——并用 Oklab 读数检查至少一件单品制造了真实的亮度差。',
  'ow.what-colors-go-with-green.combosH': '十套穿搭，锚定绿色',
  'ow.what-colors-go-with-green.cb1n': '橄榄绿裤、白T、日晒棕鞋',
  'ow.what-colors-go-with-green.cb1sc': '日常默认',
  'ow.what-colors-go-with-green.cb1o':
    '橄榄绿是普通人真会穿的绿。配白和日晒棕它就是默认休闲制服——军队的颜色，平民的礼貌。',
  'ow.what-colors-go-with-green.cb1it1': '橄榄绿裤子',
  'ow.what-colors-go-with-green.cb1it2': '白色T恤',
  'ow.what-colors-go-with-green.cb1it3': '日晒棕鞋',
  'ow.what-colors-go-with-green.cb2n': '鼠尾草绿毛衣、奶油长裤、棕靴',
  'ow.what-colors-go-with-green.cb2sc': '柔和通勤',
  'ow.what-colors-go-with-green.cb2o':
    '鼠尾草是拉到半途变中性的绿，所以它要安静的伙伴：下面奶油，脚上棕皮。低对比就是重点。',
  'ow.what-colors-go-with-green.cb2it1': '鼠尾草绿毛衣',
  'ow.what-colors-go-with-green.cb2it2': '奶油色长裤',
  'ow.what-colors-go-with-green.cb2it3': '棕色靴子',
  'ow.what-colors-go-with-green.cb3n': '祖母绿衬衫、黑长裤、黑高跟鞋',
  'ow.what-colors-go-with-green.cb3sc': '晚间',
  'ow.what-colors-go-with-green.cb3o':
    '宝石绿要黑，就像红宝石要天鹅绒：祖母绿出全部饱和度，黑出画框。银或金首饰，不加中间的东西。',
  'ow.what-colors-go-with-green.cb3it1': '祖母绿衬衫',
  'ow.what-colors-go-with-green.cb3it2': '黑色长裤',
  'ow.what-colors-go-with-green.cb3it3': '黑色高跟鞋',
  'ow.what-colors-go-with-green.cb4n': '森林绿大衣、驼色高领、深色牛仔',
  'ow.what-colors-go-with-green.cb4sc': '冬季通勤',
  'ow.what-colors-go-with-green.cb4o':
    '森林绿配驼色是读起来有钱的冬季组合。牛仔让它不至于太正式；靴子回应大衣。',
  'ow.what-colors-go-with-green.cb4it1': '森林绿大衣',
  'ow.what-colors-go-with-green.cb4it2': '驼色高领衫',
  'ow.what-colors-go-with-green.cb4it3': '深色牛仔裤',
  'ow.what-colors-go-with-green.cb4it4': '浓缩咖啡色靴子',
  'ow.what-colors-go-with-green.cb5n': '工装裤、黑连帽衫、白球鞋',
  'ow.what-colors-go-with-green.cb5sc': '街头',
  'ow.what-colors-go-with-green.cb5o':
    '绿色的街头默认款：功利工装裤、黑色层、白色鞋底。其余全灰度时，绿色单品出力最多。',
  'ow.what-colors-go-with-green.cb5it1': '绿色工装裤',
  'ow.what-colors-go-with-green.cb5it2': '黑色连帽衫',
  'ow.what-colors-go-with-green.cb5it3': '白色球鞋',
  'ow.what-colors-go-with-green.cb6n': '绿工装衬衫、白背心、蓝牛仔',
  'ow.what-colors-go-with-green.cb6sc': '西部默认',
  'ow.what-colors-go-with-green.cb6o':
    '绿衬衫夹克罩白背心和蓝牛仔裤，是牧区的制服。牛仔的蓝是绿色环上的邻居，这对从不打架。',
  'ow.what-colors-go-with-green.cb6it1': '绿色工装衬衫',
  'ow.what-colors-go-with-green.cb6it2': '白色背心',
  'ow.what-colors-go-with-green.cb6it3': '蓝色牛仔裤',
  'ow.what-colors-go-with-green.cb6it4': '白色帆布鞋',
  'ow.what-colors-go-with-green.cb7n': '凯利绿裙、白衬衫、日晒棕平底鞋',
  'ow.what-colors-go-with-green.cb7sc': '春日活动',
  'ow.what-colors-go-with-green.cb7o':
    '凯利绿是最大声的档位，所以它周围全安静：上白下日晒棕。一件大声的，两件耳语的。',
  'ow.what-colors-go-with-green.cb7it1': '凯利绿半身裙',
  'ow.what-colors-go-with-green.cb7it2': '白色衬衫',
  'ow.what-colors-go-with-green.cb7it3': '日晒棕平底鞋',
  'ow.what-colors-go-with-green.cb8n': '橄榄绿夹克、酒红围巾、灰长裤',
  'ow.what-colors-go-with-green.cb8sc': '秋日叠穿',
  'ow.what-colors-go-with-green.cb8o':
    '绿配酒红是男装写手年年推荐的秋季组合——理由充分：两者都深、都柔和、互不抢戏。',
  'ow.what-colors-go-with-green.cb8it1': '橄榄绿夹克',
  'ow.what-colors-go-with-green.cb8it2': '燕麦色T恤',
  'ow.what-colors-go-with-green.cb8it3': '酒红色围巾',
  'ow.what-colors-go-with-green.cb8it4': '灰色长裤',
  'ow.what-colors-go-with-green.cb8it5': '深色靴子',
  'ow.what-colors-go-with-green.cb9n': '松绿长裤、芥末针织、奶油球鞋',
  'ow.what-colors-go-with-green.cb9sc': '秋色',
  'ow.what-colors-go-with-green.cb9o':
    '绿和芥末在色环上挨得近、都读作秋色，所以这对感觉是协调而不是刻意配套。脚上奶油色防止整身变暗。',
  'ow.what-colors-go-with-green.cb9it1': '松绿色长裤',
  'ow.what-colors-go-with-green.cb9it2': '芥末色针织',
  'ow.what-colors-go-with-green.cb9it3': '奶油色球鞋',
  'ow.what-colors-go-with-green.cb10n': '薄荷绿上衣、白牛仔裤、银色平底鞋',
  'ow.what-colors-go-with-green.cb10sc': '夏日',
  'ow.what-colors-go-with-green.cb10o':
    '浅薄荷是绿的夏季档。它和白配就像春天配四月，而属于它的金属是银（不是金）。',
  'ow.what-colors-go-with-green.cb10it1': '薄荷绿上衣',
  'ow.what-colors-go-with-green.cb10it2': '白色牛仔裤',
  'ow.what-colors-go-with-green.cb10it3': '银色平底鞋',
  'ow.what-colors-go-with-green.dc1n': '鼠尾草、奶油、橡木',
  'ow.what-colors-go-with-green.dc1o':
    '安静的客厅：鼠尾草绿墙或软包、奶油织物、浅橡木地板。田园风目录的默认款，有它的道理。',
  'ow.what-colors-go-with-green.dc1c1': '鼠尾草绿',
  'ow.what-colors-go-with-green.dc1c2': '奶油色',
  'ow.what-colors-go-with-green.dc1c3': '浅橡木',
  'ow.what-colors-go-with-green.dc2n': '森林与黄铜',
  'ow.what-colors-go-with-green.dc2o': '书房组合：深森林绿柜体、黄铜五金、象牙墙。绿最显贵的档位。',
  'ow.what-colors-go-with-green.dc2c1': '森林绿',
  'ow.what-colors-go-with-green.dc2c2': '黄铜',
  'ow.what-colors-go-with-green.dc2c3': '象牙色墙',
  'ow.what-colors-go-with-green.dc3n': '橄榄与米色',
  'ow.what-colors-go-with-green.dc3o': '卧室版本：橄榄绿床品或漆面、米色亚麻、胡桃木腿。暖、柔、助眠。',
  'ow.what-colors-go-with-green.dc3c1': '橄榄绿',
  'ow.what-colors-go-with-green.dc3c2': '米色亚麻',
  'ow.what-colors-go-with-green.dc3c3': '胡桃木',
  'ow.what-colors-go-with-green.dc4n': '祖母绿与藏青',
  'ow.what-colors-go-with-green.dc4o': '餐厅：祖母绿丝绒、藏青墙、米白门框。两种共享冷底的宝石色。',
  'ow.what-colors-go-with-green.dc4c1': '祖母绿丝绒',
  'ow.what-colors-go-with-green.dc4c2': '藏青色墙',
  'ow.what-colors-go-with-green.dc4c3': '米白门框',
  'ow.what-colors-go-with-green.av1n': '亮红',
  'ow.what-colors-go-with-green.av1w':
    '默认进圣诞。如果任务就是节日派对，忽略这条；否则这对在给你没点过的戏服。',
  'ow.what-colors-go-with-green.av2n': '紫红',
  'ow.what-colors-go-with-green.av2w':
    '绿那个吵闹邻居开到全饱和——它们争夺同一眼而不是分享它。灰粉是合作完成工作的版本。',
  'ow.what-colors-go-with-green.av3n': '亮橙',
  'ow.what-colors-go-with-green.av3w':
    '两个大声暖色相争夺注意力。芥末和铁锈以合作的音量完成"暖配绿"的工作。',
  'ow.what-colors-go-with-green.t1t': '搭配前先叫出你的绿。',
  'ow.what-colors-go-with-green.t1b':
    '橄榄、鼠尾草、森林、祖母绿有不同的挚友。先确定单品在哪个档位，再为那个档位挑伙伴——不是为抽象的"绿色"。',
  'ow.what-colors-go-with-green.t2t': '柔和的绿爱暖中性色。',
  'ow.what-colors-go-with-green.t2b':
    '橄榄和鼠尾草配日晒棕、驼色、奶油和棕皮最安全。共享的低饱和度让组合读起来自然而不是季节戏服。',
  'ow.what-colors-go-with-green.t3t': '牛仔是免费答案。',
  'ow.what-colors-go-with-green.t3b':
    '蓝牛仔裤配所有绿色档位，因为牛仔是熟悉亮度上的低饱和蓝。拿不准时，绿色单品加牛仔加白或日晒棕鞋就是一整套。',
  'ow.what-colors-go-with-green.t4t': '每身一件大声的。',
  'ow.what-colors-go-with-green.t4b':
    '凯利绿和祖母绿是全音量颜色。它们周围应降到中性色——白、日晒棕、黑——否则整身变成竞赛。',
  'ow.what-colors-go-with-green.f1q': '什么颜色配绿色衣服？',
  'ow.what-colors-go-with-green.f1a':
    '跨档位：奶油和米白、日晒棕和驼色、棕皮、藏青、蓝牛仔、灰、酒红和芥末。橄榄和鼠尾草偏爱暖中性；祖母绿和森林偏爱黑、驼和牛仔。单品间一处清晰的亮度差让任何一组都利落。',
  'ow.what-colors-go-with-green.f2q': '红配绿行吗？',
  'ow.what-colors-go-with-green.f2a':
    '亮红配绿读作圣诞——那是戏服联想，不是色彩法则违规。想要红系对比就用酒红或铁锈：红那些柔和的深色版本常年与橄榄和森林配对，读作秋色而不是节日。',
  'ow.what-colors-go-with-green.f3q': '蓝配绿行吗？',
  'ow.what-colors-go-with-green.f3a':
    '行——它们是色环邻居，天生的融合伙伴。蓝牛仔配绿上衣是日常证明；森林绿配藏青是讲究版。保持一件明显比另一件浅，避免两者融成一团。',
  'ow.what-colors-go-with-green.f4q': '什么颜色配鼠尾草绿？',
  'ow.what-colors-go-with-green.f4a':
    '奶油、米白、灰米、驼色、腮红粉、柔和金和更软的棕色。鼠尾草已经是半个中性色，它要安静的陪伴；强色会压垮它。鼠尾草加奶油加棕皮是标准版。',
  'ow.what-colors-go-with-green.f5q': '什么颜色配橄榄绿？',
  'ow.what-colors-go-with-green.f5a':
    '日晒棕、奶油、白、黑、酒红、铁锈、藏青和灰。橄榄是对男装最友好的绿，正因为它表现得像大地色——把它当棕的表亲，同样的搭配全部适用。',
  'ow.what-colors-go-with-green.r1': '什么颜色调出绿（为什么蓝说了算）',
  'ow.what-colors-go-with-green.r2': '什么颜色配棕色',
  'ow.what-colors-go-with-green.r3': '绿配白：鼠尾草梯度，每种比例',
  'ow.what-colors-go-with-green.r4': '全部配色指南',
};
