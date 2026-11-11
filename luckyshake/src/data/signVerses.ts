/**
 * The verse layer — the artifact the stick actually carries (👤 11/08 拍板
 * "100 签一次过"). Each record: the SOURCE poem (七言四句, kept verbatim for
 * the zh review layer + audit) and the EN verse — hand-translated, no machine
 * rhythm, doom words softened per house rules (no-凶 red line), deity names
 * universalized. src = deck + number + traditional grade, audit trail for
 * docs/fortune-draw/d02-shen88-linqian-teardown.md. Rendered via lib/reading.
 */

export interface SignVerse {
  /** deck + original number + traditional grade (audit only, never rendered) */
  src: string;
  /** the source poem, verbatim (zh review layer / launch-deleted) */
  zh: string[];
  /** the English verse (production) */
  en: string[];
}

export const SIGN_VERSES: Record<number, SignVerse> = {
  1: {
    src: '黄大仙1 上上',
    zh: ['灵签求得第一枝', '龙虎风云际会时', '一旦凌霄扬自乐', '任君来往赴瑶池'],
    en: [
      'The first branch of the jar falls to your hand:',
      'dragon and tiger meet in wind and cloud.',
      'One morning you rise into open sky, rejoicing —',
      'and every high place opens its gates to you.',
    ],
  },
  2: {
    src: '黄大仙2 上吉',
    zh: ['枯木逢春尽发新', '花看叶茂蝶来频', '桃源竞斗千红紫', '一叶渔舟误入津'],
    en: [
      'Dead wood, meeting spring, breaks into leaf;',
      'blossoms thicken, and butterflies keep arriving.',
      'A thousand colors race in the peach-blossom spring —',
      'and one small boat drifts in, by happy accident, to the ford.',
    ],
  },
  3: {
    src: '黄大仙3 中平',
    zh: ['牛山之木皆常美', '独惜斧工尽伐他', '大器大材无足用', '规矩不准怎为搓'],
    en: [
      'The trees of Ox Mountain were always beautiful —',
      'then the axes came, and none were spared.',
      'Great timber, wasted before its use was found:',
      'without a true measure, how can anything be squared?',
    ],
  },
  4: {
    src: '黄大仙4 中吉',
    zh: ['调雏紫燕在檐前', '对语呢喃近午天', '或往或来低复起', '有时剪破绿杨烟'],
    en: [
      'Swallows teach their young beneath the eaves,',
      'murmuring to each other near midday;',
      'now out, now back, now low, now high —',
      'their wings sometimes cut clean through the willow haze.',
    ],
  },
  5: {
    src: '黄大仙5 中吉',
    zh: ['东园昨夜狂风急', '万紫千红亦尽倾', '幸有惜花人早起', '培回根本复栽生'],
    en: [
      'Last night a wild wind tore through the east garden',
      'and every purple and red was beaten down.',
      'But someone who loves flowers rose early,',
      'mended the roots, and planted them alive again.',
    ],
  },
  6: {
    src: '黄大仙6 上吉',
    zh: ['一片孤帆万里回', '管弦呕哑且停杯', '如云胜友谈风月', '畅叙幽情极乐哉'],
    en: [
      'A single sail comes home from ten thousand miles;',
      'set down the cup while the pipes and strings play on.',
      'Friends gather like clouds to talk of wind and moonlight —',
      'what old friends pour out between them is pure joy.',
    ],
  },
  7: {
    src: '黄大仙7 中吉',
    zh: ['秋来征雁向南归', '红叶纷纷满院飞', '砧捣城头声切耳', '江枫如火在渔矶'],
    en: [
      'When autumn comes, the wild geese turn south for home;',
      'red leaves fly until the courtyard is full of them;',
      'laundry-mallets ring sharp from the city wall,',
      'and maples by the river burn like fire on the fishing rocks.',
    ],
  },
  8: {
    src: '黄大仙9 上吉',
    zh: ['瑶琴一曲奏新腔', '明月清风枕蕈凉', '咸集嘉宾同赏菊', '或歌或舞或飞觞'],
    en: [
      'A jade-stringed zither plays a new air;',
      'bright moon, cool wind, a pillow in the pines.',
      'Good guests gather to admire the chrysanthemums —',
      'some singing, some dancing, some raising their cups.',
    ],
  },
  9: {
    src: '黄大仙10 中平',
    zh: ['一轮月镜挂空中', '偶被浮云障迭重', '玉匣何时光气吐', '谁人借我一狂风'],
    en: [
      'A mirror of moon hangs in the middle of the sky,',
      'then drifting clouds fold over it, layer on layer.',
      'When will the jade case give out its light again?',
      'Someone lend me one wild wind.',
    ],
  },
  10: {
    src: '黄大仙11 上吉',
    zh: ['杨柳垂堤锁绿烟', '日长三起又三眠', '往来紫燕纷飞舞', '袅娜迎风倩我怜'],
    en: [
      'Willows lean over the levee, wrapping green mist;',
      'the days grow long — they rise and rest and rise again;',
      'purple swallows cross and cross in scattered dances,',
      'graceful in the wind, asking to be admired.',
    ],
  },
  11: {
    src: '黄大仙13 中平',
    zh: ['岭南初放一枝梅', '片片晶莹入酒杯', '却遇骑驴人早至', '如意背负占春魁'],
    en: [
      'In the southern hills the first plum branch opens;',
      'its bright petals fall one by one into the wine cup.',
      'And one who rides a donkey arrives early —',
      'carrying the first honor of spring home on his back.',
    ],
  },
  12: {
    src: '黄大仙14 中吉',
    zh: ['为爱幽闲多种竹', '买春赏雨在茅屋', '醉时卧倒杏花边', '怕听莺儿惊梦熟'],
    en: [
      'For love of quiet I planted bamboo thick,',
      'bought the spring, watched rain from the thatched hut;',
      'when drunk I lie down at the apricot blossom’s edge',
      'and dread the oriole waking me too soon from a good dream.',
    ],
  },
  13: {
    src: '黄大仙15 上吉',
    zh: ['仙槎一叶泛中流', '月殿蟾宫任尔游', '盈耳霓裳声暂歇', '酒诗吟饮几时休'],
    en: [
      'A single raft floats free in midstream;',
      'the palace of the moon lies open to your wandering.',
      'Silk-skirt music fills your ears, pauses —',
      'wine and poems and song — when would you ever stop?',
    ],
  },
  14: {
    src: '黄大仙16 中吉',
    zh: ['天边鸦背夕阳回', '陇外儿童跨犊来', '羌笛频吹声切耳', '短长腔调乐何哉'],
    en: [
      'Sunset comes home on the backs of the crows;',
      'beyond the ridges a child comes riding a calf.',
      'A reed flute plays, again and again, at your ear —',
      'short tune, long tune — where does such joy come from?',
    ],
  },
  15: {
    src: '黄大仙17 中吉',
    zh: ['秋水蒹葭白露盈', '盈庭月色浸阶清', '清风吹动马铃响', '响接晨钟不断声'],
    en: [
      'Autumn water, reed banks, white dew brimming;',
      'moonlight floods the court, soaking the clean steps.',
      'A fresh wind stirs the bells on a horse’s bridle —',
      'the sound runs on to meet the morning bell, unbroken.',
    ],
  },
  16: {
    src: '黄大仙19 中吉',
    zh: ['干卦三连号太阳', '潜龙勿用第一章', '其中爻象能参透', '百福骈臻大吉昌'],
    en: [
      'Three unbroken lines — the figure named Heaven;',
      'its first words: the hidden dragon, do not act yet.',
      'Read the changes through, line by patient line,',
      'and a hundred blessings arrive together, bright and full.',
    ],
  },
  17: {
    src: '黄大仙27 中平',
    zh: ['天晴粉蝶翻衣晒', '又看庭前蚁阵排', '队伍整齐趋或退', '时开时合思何佳'],
    en: [
      'On a clear day white butterflies turn their wings to the sun;',
      'in the courtyard, ants file into ordered ranks.',
      'Advance or withdraw, their line holds perfectly —',
      'now opening, now closing. Consider how well that is done.',
    ],
  },
  18: {
    src: '黄大仙70 中平',
    zh: ['可比当年一塞翁', '虽然失马半途中', '不知祸福真何事', '到底方明事始终'],
    en: [
      'Remember the old man at the frontier who lost his horse —',
      'it ran off halfway through the journey, and yet.',
      'No one can tell fortune from loss while it is happening;',
      'only at the end does the whole story become clear.',
    ],
  },
  19: {
    src: '观音69 中签',
    zh: ['冬来岭上一枝梅', '叶落枝枯终不摧', '但得阳春悄急至', '依然还我作花魁'],
    en: [
      'Winter comes to the ridge; one plum branch —',
      'leaves dropped, twigs withered, yet never broken.',
      'Let the warm spring arrive, even in sudden haste:',
      'it will still make me queen of the flowers again.',
    ],
  },
  20: {
    src: '观音4 上签',
    zh: ['千年古镜复重圆', '女再求夫男再婚', '自此门庭重改换', '更添福禄在儿孙'],
    en: [
      'A mirror a thousand years old comes round and whole again;',
      'the wife seeks her husband; the husband weds again.',
      'From here the whole doorway changes its light,',
      'and luck and blessing gather in the children’s children.',
    ],
  },
  21: {
    src: '关帝75 中吉',
    zh: ['生前结得好姻缘', '一笑相逢情自亲', '相当人物无高下', '得意休论富与贫'],
    en: [
      'A good match was formed before either of you arrived;',
      'one meeting, one laugh, and the affection is already kin.',
      'Two people of equal worth, neither above the other —',
      'in what you have found, do not weigh rich against poor.',
    ],
  },
  22: {
    src: '关帝9 大吉',
    zh: ['见说文书将入境', '今朝喜色上眉端', '问事业或财利', '恐怕虚名虚利'],
    en: [
      'Word arrives that the letter is crossing the border;',
      'this morning, gladness climbs to the edge of your brow.',
      'But if you ask after business or gain —',
      'much of it may prove fame that fades, profit that slips away.',
    ],
  },
  23: {
    src: '关帝51 上吉',
    zh: ['君今百事且随缘', '水到渠成听自然', '莫叹年来不如意', '喜逢新运称心田'],
    en: [
      'For now let all things follow their own grain;',
      'water finds the channel once the channel is cut.',
      'Do not sigh over the years that did not go your way —',
      'a new current has arrived that suits your ground.',
    ],
  },
  24: {
    src: '观音96 上签',
    zh: ['巍峨宝塔不寻常', '八面玲珑尽放光', '劝君立志勤顶礼', '作善苍天降福祥'],
    en: [
      'A tower rises, unlike any other,',
      'light pouring from each of its eight faces.',
      'Hold your purpose steady, keep the small devotions —',
      'good done openly, good done quietly, comes back as blessing.',
    ],
  },
  25: {
    src: '黄大仙90 中平',
    zh: ['细整残妆夜欲奔', '座中李靖更何人', '那知虬髯情钟处', '拔剑三回未敢陈'],
    en: [
      'She repairs her travel-worn face by night, ready to run;',
      'among the guests at that table, which one is hers?',
      'Who could have guessed where the stranger’s heart would fix —',
      'three times his hand goes to his sword, three times he does not speak.',
    ],
  },
  26: {
    src: '黄大仙48 中平',
    zh: ['绣阁听琴自起思', '改妆夤夜最欢时', '可怜沽酒临邛市', '才子佳人两下厨'],
    en: [
      'In the embroidered tower she hears the zither and begins to think;',
      'changing her dress in the dark was the happiest hour.',
      'And then the two of them, in a far market town, selling wine —',
      'the gifted man and the great lady, both in the same small kitchen.',
    ],
  },
  27: {
    src: '观音61 中签',
    zh: ['日上吟诗月下歌', '逢场作戏笑呵呵', '相逢会遇难藏避', '唱彩齐唱连理罗'],
    en: [
      'Poems in daylight, songs beneath the moon;',
      'wherever the scene is set, you play it with laughter.',
      'Meeting and parting cannot be hidden from or dodged —',
      'so join the chorus, and cheer the two branches tied as one.',
    ],
  },
  28: {
    src: '观音84 下签',
    zh: ['因名丧德如何事', '切恐吉中变化凶', '酒醉不知何处去', '青松影里梦朦胧'],
    en: [
      'To trade your good name for noise — what kind of bargain is that?',
      'Watch the moment when luck begins to turn inside itself.',
      'Drunk, you no longer know where you are going;',
      'you dream half-dreams in the shadow of the green pines.',
    ],
  },
  29: {
    src: '黄大仙80 中吉',
    zh: ['飞觞对舞几时赊', '弓影横杯误作蛇', '猜透诗中玄妙诀', '泰来否极事无差'],
    en: [
      'Cups fly and dancers turn — how long can it last?',
      'A bow’s shadow across the cup, mistaken for a snake.',
      'See through the trick the poem is playing on you:',
      'when the worst has turned, the best arrives, and nothing fails.',
    ],
  },
  30: {
    src: '观音34 中签',
    zh: ['行藏出入礼义恭', '言必忠良信必聪', '心不了然且静澈', '光明红日正当空'],
    en: [
      'In going out and keeping in, be courteous and true;',
      'let words be loyal; let trust run clear.',
      'Where the heart is clouded, let it still until transparent —',
      'the bright red sun stands at the center of the sky.',
    ],
  },
  31: {
    src: '观音32 中签',
    zh: ['前程杳杳定无疑', '石中藏玉有谁知', '一朝良匠分明剖', '始觉安然碧玉期'],
    en: [
      'The road ahead is dim — that much is certain;',
      'who could tell there is jade inside the stone?',
      'One morning a master cutter splits it clean open,',
      'and what seemed ordinary shows its green-white light.',
    ],
  },
  32: {
    src: '关帝1 大吉',
    zh: ['巍巍独步向云间', '玉殿千官第一班', '富贵荣华天付汝', '福如东海寿如山'],
    en: [
      'Walking alone, head high, into the clouds;',
      'in the jade hall, first of all the ranked officials.',
      'Honor and plenty are handed to you outright —',
      'fortune deep as the eastern sea, endurance like a mountain.',
    ],
  },
  33: {
    src: '关帝15 中平',
    zh: ['两家门户各相当', '不是姻缘莫较量', '直待春风好消息', '却请琴瑟向兰房'],
    en: [
      'Two households evenly matched;',
      'if the bond is not there, do not force the count.',
      'Wait quietly for the spring wind’s good news —',
      'then zither and harp together into the orchid room.',
    ],
  },
  34: {
    src: '关帝42 中吉',
    zh: ['我曾许汝事和谐', '谁料修为汝自乖', '但改新图莫依旧', '营谋应得称心怀'],
    en: [
      'I promised you a settled and harmonious affair —',
      'who expected your own doing to go against it?',
      'Change the plan; do not keep to the old drawing,',
      'and what you undertake will finally satisfy the heart.',
    ],
  },
  35: {
    src: '黄大仙84 中吉',
    zh: ['满腹奇才志未冲', '铁鸡难举意无容', '张良指示身投汉', '项羽乌江命自穷'],
    en: [
      'A belly full of rare talent, ambition not yet airborne;',
      'an iron rooster cannot be lifted — the will has nowhere to stand.',
      'Shown the right door, he crossed to the rising side;',
      'the other army ended where its river ran out.',
    ],
  },
  36: {
    src: '关帝93 中吉',
    zh: ['春来雨水太连绵', '入夏晴干雨又愆', '节气直交三伏始', '喜逢滂沛足田园'],
    en: [
      'Spring’s rain falls longer than it should;',
      'summer turns dry, and the rain keeps missing.',
      'Then the season turns, past the hottest weeks —',
      'a joyful downpour fills the fields at last.',
    ],
  },
  37: {
    src: '关帝89 中吉',
    zh: ['樽前无事且高歌', '时未来时奈若何', '白马渡江嘶日暮', '虎头城里看巍峨'],
    en: [
      'While the cup is full and nothing presses, sing loudly;',
      'when the hour has not come, what can you do but wait?',
      'A white horse crosses the river, neighing at sunset —',
      'then in the Tiger-Head city, watch it stand tall.',
    ],
  },
  38: {
    src: '关帝65 上上',
    zh: ['更入新春人事后', '衷言方得信先容', '否极泰来', '化凶为吉是也'],
    en: [
      'Deeper into the new spring, after the bustle of people,',
      'the honest word finally gets its hearing first.',
      'The far end of “no” bends and becomes “yes” —',
      'the unlucky turns itself into the lucky. So it reads.',
    ],
  },
  39: {
    src: '关帝63 中吉',
    zh: ['曩时败北且图南', '筋力虽衰尚一堪', '欲识生前君大数', '前三三与后三三'],
    en: [
      'Defeated once, you turned and plotted southward;',
      'strength worn, yet there is one more round in you.',
      'If you would know the great count of your life:',
      'three times three before, three times three after.',
    ],
  },
  40: {
    src: '观音73 上签',
    zh: ['春来雷震百虫鸣', '番身一转离泥中', '始知出入还来往', '一朝变化便成龙'],
    en: [
      'Spring thunder wakes the hundred insects to sing;',
      'one turn of the body and you are out of the mud.',
      'Then you learn what coming and going can mean —',
      'in one morning of change, you become the dragon.',
    ],
  },
  41: {
    src: '观音86 上签',
    zh: ['春来花发映阳台', '万里车来进宝财', '若得禹门三级浪', '恰如平地一声雷'],
    en: [
      'Spring flowers open and light up the terrace;',
      'from ten thousand miles the carts arrive with treasure.',
      'Catch the third wave at the Dragon Gate —',
      'as startling as thunder out of level ground.',
    ],
  },
  42: {
    src: '关帝99 上上',
    zh: ['贵人遭遇水云卿', '冷淡交情滋味长', '黄阁开时延故客', '骅溜应得骤康庄'],
    en: [
      'A noble guest dwells quietly among water and cloud;',
      'a plain, unhurried friendship keeps its taste the longest.',
      'When the gate opens again, the old friends are called in —',
      'the fine horse suddenly finds the broad high road.',
    ],
  },
  43: {
    src: '观音76 中签',
    zh: ['鱼龙混杂意相同', '耐守深潭待运通', '不觉一朝头耸出', '禹门一跳过龙宫'],
    en: [
      'Fish and dragons mingle, outwardly the same;',
      'keep to the deep pool and wait for the current to turn.',
      'No one notices the morning your head rises above them —',
      'one leap at the Dragon Gate, and you are past the palace.',
    ],
  },
  44: {
    src: '观音9 中签',
    zh: ['烦君勿作私心事', '此意偏宜说问公', '一片明心光皎洁', '宛如皎月正天心'],
    en: [
      'Please do not turn this into a private intrigue;',
      'a matter like this does best brought into the open.',
      'One clear heart gives off clean white light —',
      'exactly like the bright moon at the center of the sky.',
    ],
  },
  45: {
    src: '黄大仙57 中吉',
    zh: ['小楼春雨声初歇', '徘徊街头屐不停', '忽听卖花人入巷', '一枝买得慢慢行'],
    en: [
      'The spring rain on the small tower has just stopped;',
      'you pace the street, wooden shoes never still.',
      'Suddenly a flower-seller’s call comes up the lane —',
      'you buy one branch and walk on slowly.',
    ],
  },
  46: {
    src: '关帝36 上吉',
    zh: ['万里鹏程君有分', '吴山顶上好钻龟', '不可躁进', '欲速则不达'],
    en: [
      'A journey of ten thousand miles carries your name;',
      'atop the highest hill, the diviner’s shell reads kind.',
      'Still, do not lunge ahead —',
      'what is hurried never arrives.',
    ],
  },
  47: {
    src: '黄大仙21 中吉',
    zh: ['天外红霞如抹锦', '槛边桃杏斗新妆', '盈眸烟熳谁居首', '美酒频斟且酌量'],
    en: [
      'Red clouds beyond the sky, brushed on like brocade;',
      'by the railing, peach and apricot compete in fresh dress.',
      'In all that blaze of color, who stands first?',
      'Pour the good wine often — but measure the pour.',
    ],
  },
  48: {
    src: '黄大仙29 中吉',
    zh: ['鲈鱼作脍菊花黄', '美酒盈樽近晚凉', '泛棹正当潮上候', '这般往景乐无央'],
    en: [
      'Fresh perch, chrysanthemums yellowing,',
      'the cup brimming in the evening cool;',
      'the boat is put out exactly as the tide begins —',
      'a scene like this, a joy without end.',
    ],
  },
  49: {
    src: '关帝2 上吉',
    zh: ['盈虚消息总天时', '自此君当百事宜', '若问前程归宿地', '更须方寸好修为'],
    en: [
      'Waxing, waning, advance, retreat — all belong to the season;',
      'from here, a hundred undertakings go right for you.',
      'And if you ask where this road finally settles:',
      'keep the square inch of your heart in good order.',
    ],
  },
  50: {
    src: '观音50 中签',
    zh: ['五湖四海任君行', '高挂帆蓬自在撑', '若得顺风随即至', '满船宝贝喜层层'],
    en: [
      'The five lakes and four seas are open to your sailing;',
      'hoist the canvas high and pole along freely.',
      'Get one fair wind and you arrive almost at once —',
      'a boatload of treasures, joy stacked on joy.',
    ],
  },
  51: {
    src: '关帝24 中吉',
    zh: ['更遇秋成冬至后', '恰如骑鹤与腰缠', '凡事夏秋冬都遂意', '惟春天则不利'],
    en: [
      'Harvest, then the turn past the winter solstice —',
      'like riding the crane with gold wrapped at your waist.',
      'Summer, autumn, winter: all things go your way;',
      'it is spring that asks you to wait.',
    ],
  },
  52: {
    src: '观音8 上签',
    zh: ['茂林松柏正兴旺', '雨雪风霜总莫为', '异日忽然成大用', '功名成就栋梁材'],
    en: [
      'In the deep woods the pines and cypress are thriving;',
      'rain, snow, wind, frost — none of it can stop that.',
      'One day, suddenly, they are wanted for great use:',
      'the beam-and-pillar timber that achievement is built from.',
    ],
  },
  53: {
    src: '黄大仙98 中平',
    zh: ['入山种玉嫌田狭', '掘地寻金厌客多', '富贵贫穷天注定', '世人何苦力奔波'],
    en: [
      'He goes to the hills to plant jade, and complains the field is small;',
      'digs the ground for gold, and complains of the crowds.',
      'Some seasons give, some seasons withhold —',
      'so why wear yourself out running in circles?',
    ],
  },
  54: {
    src: '黄大仙53 中吉',
    zh: ['珠履三千客孟尝', '谁人识得有鹰扬', '其中弹铗归来者', '便是英雄志莫当'],
    en: [
      'Three thousand pearl-sandaled guests at that famous gate —',
      'who could tell which one carried the hawk’s rise?',
      'The one who tapped his sword and asked for better, and returned:',
      'that is the one whose ambition none can match.',
    ],
  },
  55: {
    src: '关帝82 上吉',
    zh: ['此时宾主欢相会', '他日王侯却并肩', '多与贤人君子亲近', '则他日必多有贵人提拔'],
    en: [
      'Now host and guest delight in one meeting;',
      'someday you will stand shoulder to shoulder with the mighty.',
      'Keep close to the worthy and the honest —',
      'the day will come, and many hands will raise you.',
    ],
  },
  56: {
    src: '关帝3 中吉',
    zh: ['但能孝悌存忠信', '福禄来成祸不侵', '命里有时终须有', '命里无时莫强求'],
    en: [
      'Hold care for family, loyalty, and good faith,',
      'and blessing comes to stay while harm passes by.',
      'What your portion holds will arrive in its own hour;',
      'what it does not hold, do not seize by force.',
    ],
  },
  57: {
    src: '关帝74 上吉',
    zh: ['崔巍崔巍复崔巍', '履险如夷去复来', '身似菩提心似镜', '长安一道放春回'],
    en: [
      'Crag on crag, and crag again;',
      'you cross the perilous ground as if it were flat, going and coming.',
      'Body steady as an old tree, heart clear as a mirror —',
      'one open road into the capital, letting spring back in.',
    ],
  },
  58: {
    src: '关帝31 中吉',
    zh: ['秋冬作事只寻常', '春到门庭渐吉昌', '千里信音符远望', '萱堂快乐未渠央'],
    en: [
      'What you do through autumn and winter is ordinary work;',
      'when spring reaches your gate, the luck brightens by degrees.',
      'A letter carried a thousand miles, worth watching for —',
      'in the family hall, happiness without measure.',
    ],
  },
  59: {
    src: '关帝16 下下',
    zh: ['官事悠悠难辨明', '不如息了且归耕', '傍人煽惑君休信', '此事当谋亲兄弟'],
    en: [
      'A quarrel dragged on and on can never be untangled cleanly;',
      'better to let it rest and go back to your own fields.',
      'Do not trust the strangers who stir the pot —',
      'in this matter, take counsel with your own kin.',
    ],
  },
  60: {
    src: '关帝37 中吉',
    zh: ['焚香来告复何辞', '善恶平分汝自知', '屏却昧公心里事', '出门无碍是通时'],
    en: [
      'You come asking — what answer is there to give?',
      'Good and bad split evenly; you know your own share.',
      'Set down the thing you have been hiding in your heart,',
      'and the road out will open with nothing in your way.',
    ],
  },
  61: {
    src: '黄大仙54 中平',
    zh: ['庄子酣眠成蝶梦', '翩翩飞入百花丛', '天香采得归来后', '犹在高床暖枕中'],
    en: [
      'He sleeps deep and dreams he is a butterfly,',
      'fluttering far into the thickets of a hundred flowers;',
      'having gathered their fragrance, he returns —',
      'and is still in his high bed, on the warm pillow.',
    ],
  },
  62: {
    src: '关帝88 上吉',
    zh: ['从前作事总徒劳', '才见新春时渐遭', '百计营求都得意', '更须守己莫心高'],
    en: [
      'Everything you attempted before seemed wasted labor;',
      'then the new spring arrives, and the season starts to turn.',
      'A hundred plans at last find their way —',
      'still, keep to your measure, and do not let the heart climb too high.',
    ],
  },
  63: {
    src: '关帝100 上上',
    zh: ['我本天仙雷雨师', '吉凶祸福我先知', '至诚祷祝皆灵应', '抽得终签百事宜'],
    en: [
      'I am of the thunder-and-rain company, who see',
      'fortune and misfortune before they arrive.',
      'What is asked in earnest sincerity is answered —',
      'and a hundred undertakings fall into place.',
    ],
  },
  64: {
    src: '观音58 中签',
    zh: ['直言说话君须记', '莫在他乡求别艺', '切须守己旧生涯', '除此其余都不利'],
    en: [
      'Take the plain speaking to heart and remember it:',
      'do not go hunting a new trade in some far place.',
      'Keep to the craft and course that are already yours —',
      'apart from this, nearly everything runs against you.',
    ],
  },
  65: {
    src: '黄大仙56 中吉',
    zh: ['安知此剑不成龙', '见水都应出袖中', '他日飞腾千万里', '上空妖娇有云从'],
    en: [
      'Who says this sword will not become a dragon?',
      'Let it touch water — it leaps from the sleeve at once.',
      'Someday it will fly ten thousand miles and more,',
      'with graceful clouds attending its high flight.',
    ],
  },
  66: {
    src: '黄大仙69 中吉',
    zh: ['忠义存心官十载', '年丰民乐惠难忘', '鳄鱼毒害都能息', '祷告长江北海王'],
    en: [
      'A loyal heart kept in office for ten years;',
      'harvest years, a contented people, kindness hard to forget.',
      'Even the crocodile’s poison-harm is settled down —',
      'one plain word read aloud to the river, and it obeys.',
    ],
  },
  67: {
    src: '黄大仙92 中吉',
    zh: ['至圣周游列国行', '在齐得听奏韶乐', '三月不知嘉肉味', '善哉大道可功成'],
    en: [
      'The great teacher traveled kingdom after kingdom;',
      'in one court he heard the old music performed.',
      'For three months he never noticed the taste of his food —',
      'how good it is: on this great road, the work completes itself.',
    ],
  },
  68: {
    src: '黄大仙78 上吉',
    zh: ['瑟希铿尔尚留声', '春暮时刚春服成', '冠五六人童六七', '舞雩归咏畅幽情'],
    en: [
      'The zither’s last note still hangs in the room;',
      'late spring, and the spring clothes are newly sewn.',
      'Five or six grown friends, six or seven boys —',
      'bathing in the river, singing all the way home. What ease.',
    ],
  },
  69: {
    src: '关帝17 下下',
    zh: ['纵使机关图得胜', '定为后世子孙殃', '一人卜米价', '是年米不贵'],
    en: [
      'Even if scheming wins, the win plants a debt',
      'your children’s children will be paying.',
      'Let one man simply ask the fair price of grain:',
      'that year the price stays gentle for everyone.',
    ],
  },
  70: {
    src: '观音17 中签',
    zh: ['莫听闲言说是非', '晨昏只好念弥陀', '若将狂话为真实', '画饼如何止得饥'],
    en: [
      'Do not listen to idle talk and its tale-bearing;',
      'mornings and evenings, keep to your own steady practice.',
      'If you take wild words for solid fact —',
      'a painted cake: how would it stop hunger?',
    ],
  },
  71: {
    src: '关帝23 下下',
    zh: ['羡子荣华今已矣', '到头万事总成空', '花无百日红', '人无千日好'],
    en: [
      'The splendor you envied is over and done;',
      'in the long run nothing keeps its shape forever.',
      'No flower stays red a hundred days;',
      'no one stays in their prime a thousand.',
    ],
  },
  72: {
    src: '关帝14 下下',
    zh: ['一见佳人便喜欢', '谁知去后有多般', '人情冷暖君休讶', '历涉应知行路难'],
    en: [
      'You liked her the moment you saw her —',
      'who knew how many changes would follow the parting?',
      'Warm faces, cold faces: do not be astonished.',
      'The long road teaches every traveler the same lesson.',
    ],
  },
  73: {
    src: '黄大仙45 中平',
    zh: ['采樵不意到云天', '闲年敲棋二老仙', '柯烂也思归故里', '出中七日世千年'],
    en: [
      'Gathering firewood, he wandered up into the clouds,',
      'where two old immortals played chess through the idle years.',
      'His axe-handle rotted away before he thought of home —',
      'seven days in the mountains, a thousand years in the world.',
    ],
  },
  74: {
    src: '黄大仙12 下下',
    zh: ['蜃楼海市幻无边', '万丈擎空接上天', '或被狂风忽吹散', '有时仍聚结青烟'],
    en: [
      'A mirage over the sea, illusion without border,',
      'ten thousand feet of towers propping up the sky.',
      'One gust of wild wind and the whole city scatters —',
      'then regathers, sometimes, as a wisp of blue smoke.',
    ],
  },
  75: {
    src: '观音64 下签',
    zh: ['游鱼却在碧波池', '撞遭罗网四边围', '思量无计翻身出', '事到头来惹事非'],
    en: [
      'A fish at ease in the jade-green pool',
      'runs suddenly into nets drawn on every side.',
      'It turns and turns and finds no gap to slip through —',
      'the thing it never planned for brings it to grief.',
    ],
  },
  76: {
    src: '黄大仙51 中平',
    zh: ['剪桐虽是作儿泾', '封北成圭语不移', '何以伪为成实事', '言因无戏故如斯'],
    en: [
      'He cut a paulownia leaf — a child’s game —',
      'yet the token land-grant was never taken back.',
      'How does a mock thing become a matter of state?',
      'Because that seat does not speak in jest.',
    ],
  },
  77: {
    src: '关帝50 上吉',
    zh: ['人说今年胜旧年', '也须步步要周旋', '一家和气多生福', '萋菲谗言莫听偏'],
    en: [
      'They say this year will beat the last —',
      'still, take each step with care and tact.',
      'A household at ease with itself multiplies its luck;',
      'turn a deaf ear to whispers dressed as warnings.',
    ],
  },
  78: {
    src: '黄大仙77 中平',
    zh: ['鸟语能通公冶长', '南山有个虎拖羊', '其身虽在于缧绁', '到底非关自己殃'],
    en: [
      'He understood the speech of birds, that man of long ago:',
      '“In the south mountain a tiger has carried off a sheep.”',
      'Though he wore chains for it, in the end',
      'the trouble was never of his own making.',
    ],
  },
  79: {
    src: '黄大仙79 中平',
    zh: ['富贵有如春梦熟', '世人何苦力争求', '任他秉笏当朝立', '到死惟留土一杯'],
    en: [
      'Riches and rank are a spring dream at its ripest —',
      'why do people fight so hard to hold them?',
      'Let others stand at court with their tablets in hand:',
      'at the end, each keeps exactly one handful of earth.',
    ],
  },
  80: {
    src: '黄大仙73 上上',
    zh: ['夹道花香衬马蹄', '蓝袍改换锦衣归', '满街红粉皆争羡', '翘首芳名雁塔题'],
    en: [
      'Flower scent lines the road, under the horse’s hooves;',
      'the plain blue gown exchanged, he comes home in brocade.',
      'The whole street cranes to see him, and to envy —',
      'his name, in bright ink, on the Wild Goose Pagoda.',
    ],
  },
  81: {
    src: '关帝71 中吉',
    zh: ['绣帏重结鸳鸯带', '叶落霜飞寒色侵', '问考试求功名', '好好努力有希望'],
    en: [
      'The embroidered curtains tie their mandarin-duck knot again;',
      'leaves fall, frost flies, the cold presses in.',
      'For examinations and advancement:',
      'honest effort from here has every hope.',
    ],
  },
  82: {
    src: '观音53 中签',
    zh: ['失意反成得意时', '龙呤虎啸两相宜', '青天自有通霄路', '许我功名再有期'],
    en: [
      'The moment of losing turns into the moment of winning;',
      'dragon’s cry and tiger’s roar answer each other well.',
      'The blue sky holds its own road through the clouds —',
      'the promise stands: your name will have its day yet.',
    ],
  },
  83: {
    src: '观音92 上签',
    zh: ['自幼为商任设谋', '财禄盈丰不用求', '若是双身谋望事', '秀才出去状元回'],
    en: [
      'In trade since youth, planning as he pleased,',
      'wealth filling up without once having to chase it.',
      'And for the one who sets out on the long hope:',
      'he leaves a student and returns at the top of the list.',
    ],
  },
  84: {
    src: '观音77 中签',
    zh: ['梦中说得是多财', '声名云外总虚来', '水远山遥难信实', '贵人指点笑颜开'],
    en: [
      'In the dream they tell you of riches upon riches;',
      'fame from beyond the clouds is empty coming in.',
      'News from far water and farther mountains is hard to trust —',
      'until one steady person points the way, and you laugh.',
    ],
  },
  85: {
    src: '观音22 中签',
    zh: ['旱时田里皆枯藁', '谢天甘雨落淋淋', '花果草木皆润泽', '始知一雨值千金'],
    en: [
      'In drought the fields stood withered to the root;',
      'then the sweet rain came down and down, in earnest.',
      'Flowers, fruit, grass and trees — everything drinks —',
      'and you learn one rain is worth a thousand gold.',
    ],
  },
  86: {
    src: '观音78 上签',
    zh: ['冷水未烧白涕汤', '不寒不热有温凉', '要行天下无他事', '为有身中百艺强'],
    en: [
      'Cold water, unboiled, is just a thin white broth;',
      'neither hot nor cold — it keeps its mild middle.',
      'To walk the whole world without trouble:',
      'nothing serves like a hundred crafts kept strong in you.',
    ],
  },
  87: {
    src: '关帝62 中吉',
    zh: ['百千人面虎狼心', '赖汝干戈用力深', '得胜回时秋渐老', '虎头城里喜相寻'],
    en: [
      'A thousand faces with tiger-and-wolf hearts,',
      'and your two hands carried you through all of it.',
      'You come back in victory as the autumn deepens —',
      'in the Tiger-Head city, joy comes looking for you.',
    ],
  },
  88: {
    src: '关帝40 上吉',
    zh: ['新来换得好规模', '何用随他步与趋', '只听耳边消息到', '崎岖历尽见亨衢'],
    en: [
      'A new and better order has been put in place;',
      'no need to follow anyone else’s steps anymore.',
      'Let only the right word arrive at your ear —',
      'after all the rough ground, the broad open road.',
    ],
  },
  89: {
    src: '关帝44 中吉',
    zh: ['汝是人中最吉人', '误为误作损精神', '坚牢一念酬香愿', '富贵荣华萃汝身'],
    en: [
      'You are the luckiest one among your peers —',
      'missteps and false starts have been wearing you thin.',
      'Hold one firm intention all the way through,',
      'and honor and plenty gather into your hands.',
    ],
  },
  90: {
    src: '黄大仙88 中吉',
    zh: ['替父从军胆气雄', '须眉巾帼几人同', '以身报国忠而孝', '笑煞当时众臣公'],
    en: [
      'She took her father’s place in the army, great of heart;',
      'how many bearded men could match her?',
      'She gave herself for home and family, loyal and devoted both —',
      'and put the whole court’s ministers to shame.',
    ],
  },
  91: {
    src: '黄大仙95 中平',
    zh: ['功勤一篑可成山', '由少而多莫惮烦', '作事畏辛今汝画', '补天炼石亦无难'],
    en: [
      'One basket of earth at a time can build the mountain;',
      'from little to much — do not dread the tedium.',
      'If you shrink from the toil, you draw your own limit;',
      'but even mending the sky is not hard for patient hands.',
    ],
  },
  92: {
    src: '黄大仙52 中平',
    zh: ['上清下浊成天地', '清浊相凝便作人', '尔欲多求明白事', '且将三等细分明'],
    en: [
      'The clear rising, the heavy settling: that made sky and earth;',
      'where clear and heavy meet and hold, that made people.',
      'If you want your affairs sorted and plain,',
      'take the three grades and sort them finely first.',
    ],
  },
  93: {
    src: '观音12 上签',
    zh: ['否去泰来咫尺间', '暂交君子出于山', '若逢虎兔佳音信', '立志忙中事即闲'],
    en: [
      'The bad departing, the good arriving — a hand’s width apart;',
      'presently the worthy one comes down from the mountain.',
      'When the appointed season brings its good news,',
      'hold your purpose: in the middle of the rush, things go quiet and smooth.',
    ],
  },
  94: {
    src: '观音1 上签',
    zh: ['开天辟地作良缘', '吉日良时万物全', '若得此签非小可', '人行忠正帝王宣'],
    en: [
      'A beginning like the first opening of sky and earth;',
      'a lucky day, a right hour, and every condition complete.',
      'This branch is no small thing to be holding:',
      'the upright and loyal are summoned to the high seat.',
    ],
  },
  95: {
    src: '黄大仙35 中吉',
    zh: ['天将降任此其人', '筋骨先劳苦彼身', '莫谓佳景来可易', '贫穷富贵有前因'],
    en: [
      'The sky sets its great task on this particular person,',
      'and first puts that body’s bones and sinews to work.',
      'Do not say the good view arrives easily —',
      'plenty and poverty both grow from what was planted.',
    ],
  },
  96: {
    src: '观音19 中签',
    zh: ['急水滩头放船归', '风波作浪欲何为', '若要安然求稳静', '等待浪静道此危'],
    en: [
      'The boat slips home through the head of the rapids;',
      'what good to wrestle every wave that rises?',
      'If what you want is safe passage, choose calm:',
      'wait for the water to still, and the hazard passes.',
    ],
  },
  97: {
    src: '关帝98 中吉',
    zh: ['经营百出费精神', '南北奔驰运未新', '玉兔交时当得意', '恰如枯木再逢春'],
    en: [
      'A hundred ventures run, each draining your spirit;',
      'racing north and south, the luck has not yet turned.',
      'When your season takes its turn, it will be your hour —',
      'exactly like dead wood meeting spring again.',
    ],
  },
  98: {
    src: '黄大仙34 中吉',
    zh: ['大舜虽耕在历山', '心常孝顺两嚣顽', '田中之象同家象', '善恶分明即此间'],
    en: [
      'He plowed the fields on the far mountain,',
      'yet kept a devoted heart between two hard-tempered kin.',
      'The wild elephant plowed beside him as if tame —',
      'good and ill will stand clearly separate, right here.',
    ],
  },
  99: {
    src: '黄大仙39 中吉',
    zh: ['夷齐不忍食周粟', '兄弟心甘采蕨餐', '让国名应垂万古', '可怜饿倒首阳山'],
    en: [
      'The two brothers could not stomach the new court’s grain',
      'and gladly gathered ferns for their meals instead.',
      'For yielding a kingdom their name runs down ten thousand ages —',
      'though they grew faint on the slopes of the far hill.',
    ],
  },
  100: {
    src: '关帝60 上上',
    zh: ['羡君兄弟好名声', '只管谦伪莫自矜', '丹诏槐黄相逼近', '巍巍科甲两同登'],
    en: [
      'People admire the two of you — siblings of good name;',
      'keep to modesty, and never boast of it yourselves.',
      'The vermilion summons is already drawing near:',
      'high on the rolls, the two of you ascend together.',
    ],
  },
};

/** Sanity helper (used by tests): every sign id 1..100 must have a verse record. */
export const SIGN_VERSE_COUNT = Object.keys(SIGN_VERSES).length;
