/**
 * Guide long-copy dictionary, zh — scenario pages, first half
 * (what-colors-make brown/purple/green/orange + how-to-make black-frosting /
 * brown-icing). Keys mirror the en generator in i18n.test.ts exactly
 * (`gw.<slug>.<field>`); a guard test fails if either side drifts.
 */
export const SCENARIO_ZH_A: Record<string, string> = {
  /* ---------- what-colors-make-brown ---------- */
  'gw.what-colors-make-brown.lead':
    '棕色不是颜色调浑时的意外——它就是深橙色，而且有五条干净的调法：两对互补色、一条经黑色的加深路线，以及三原色调和。每条路线落点略有不同，下面每个色样都是计算出的混合结果，不是照片。',
  'gw.what-colors-make-brown.ans': '暖栗棕色',
  'gw.what-colors-make-brown.introH': '为什么这么多颜色都能调出棕色',
  'gw.what-colors-make-brown.i1':
    '在色环上，棕色并不占一个位置——它是一种又深又灰的橙色。这就是为什么几乎任何一对互补色混起来都会得到它：每种颜料吸收对方反射的光，你眼睛收到的那一点昏暗暖色剩余就是棕色。红配绿、橙配蓝、黄配紫：三对都落在同一家族里，只是冷暖略有不同。',
  'gw.what-colors-make-brown.i2':
    '同样的逻辑解释了学生食堂版的现象：把三种颜料三原色（红、黄、蓝）混在一起也会得到棕色，因为它们合起来几乎吸收所有光。又因为棕色本质上就是橙色，用黑色加深橙色可以直接到达——这就是加深路线。颜料、糖霜还是史莱姆：下面的算法都一样，变的只是介质。',
  'gw.what-colors-make-brown.listH': '五条路线，全部实算',
  'gw.what-colors-make-brown.m1n': '红 + 绿',
  'gw.what-colors-make-brown.m1s': '经典答案：红和绿互为补色，彼此抵消。',
  'gw.what-colors-make-brown.m1c1': '红',
  'gw.what-colors-make-brown.m1c2': '绿',
  'gw.what-colors-make-brown.m1o':
    '主力棕色。两色大致等量；偏红出暖调赤褐，偏绿出橄榄灰调。',
  'gw.what-colors-make-brown.m2n': '橙 + 蓝',
  'gw.what-colors-make-brown.m2s': '另一对互补色——通常调出最干净、最不浑的棕。',
  'gw.what-colors-make-brown.m2c1': '橙',
  'gw.what-colors-make-brown.m2c2': '蓝',
  'gw.what-colors-make-brown.m2o':
    '因为橙色本身就是"随时会变棕的颜色"（同一个色相，只是更亮），这条路线最不费劲就能到自然的巧克力色。蓝色少放一点，防止发灰。',
  'gw.what-colors-make-brown.m3n': '黄 + 紫',
  'gw.what-colors-make-brown.m3s': '第三对互补色：偏芥末的土棕色。',
  'gw.what-colors-make-brown.m3c1': '黄',
  'gw.what-colors-make-brown.m3c2': '紫',
  'gw.what-colors-make-brown.m3o':
    '黄是最亮的颜料、紫是这几对里最暗的，所以混出来比前两条路线更暖更灰。适合赭石和泥土色调。',
  'gw.what-colors-make-brown.m4n': '三原色全上',
  'gw.what-colors-make-brown.m4s': '红 + 黄 + 蓝一起：每个孩子在颜料盘里都发现过的事。',
  'gw.what-colors-make-brown.m4c1': '红',
  'gw.what-colors-make-brown.m4c2': '黄',
  'gw.what-colors-make-brown.m4c3': '蓝',
  'gw.what-colors-make-brown.m4o':
    '可行，但最难控制——三种颜料抵消得太彻底，比例稍有变化结果就在暖、冷、灰之间摆动。适合用来理解颜色，不适合对着目标色打。',
  'gw.what-colors-make-brown.m5n': '橙 + 黑（加深路线）',
  'gw.what-colors-make-brown.m5s': '不用调互补色：直接加深橙色就行，因为棕色本来就是深橙。',
  'gw.what-colors-make-brown.m5c1': '橙',
  'gw.what-colors-make-brown.m5c2': '黑',
  'gw.what-colors-make-brown.m5o':
    '手头已有橙色时最可预测的路线。按重量四分之一的黑出栗棕；再加深就是巧克力色。这也解释了"什么颜色调出深棕"和"什么颜色调出棕色"为什么是同一族答案。',
  'gw.what-colors-make-brown.t1t': '暖棕与冷棕。',
  'gw.what-colors-make-brown.t1b':
    '任何路线偏红或偏橙就变暖（栗色、陶土色），偏蓝或偏绿就变冷（棕土色、灰褐色）。同一条路线，只差一点倾向。',
  'gw.what-colors-make-brown.t2t': '浅棕和日晒棕就是同样路线加白。',
  'gw.what-colors-make-brown.t2b':
    '日晒棕、米色、浅棕都不是新颜色——往你的棕色里加白延展。拉进四分之一的白就读作日晒棕；差别就这么多。',
  'gw.what-colors-make-brown.t3t': '介质会改变落点。',
  'gw.what-colors-make-brown.t3b':
    '丙烯干后变深，水彩干后变浅，糖霜从白色基底起步。计算混合对调色逻辑成立；实物版本深浅差一档是正常的。',
  'gw.what-colors-make-brown.t4t': '互补色要一点一点加。',
  'gw.what-colors-make-brown.t4b':
    '互补棕在最后阶段加深很快。互补色分多次微量加，提前一档收手——搅匀的过程里它还会继续变深。',
  'gw.what-colors-make-brown.f1q': '哪两种颜色能调出棕色？',
  'gw.what-colors-make-brown.f1a':
    '任何一对互补色：红配绿、橙配蓝、或黄配紫。每一对落点略不同——橙配蓝通常最干净，红配绿最经典。用黑直接加深橙色也可以，因为棕色字面上就是深橙。',
  'gw.what-colors-make-brown.f2q': '什么颜色调出棕色颜料？',
  'gw.what-colors-make-brown.f2a':
    '同样的互补路线：在丙烯或油画颜料里，橙加一点蓝最好控制，红配绿最传统。从主色起步，互补色分小份加，直到棕色看起来对为止。',
  'gw.what-colors-make-brown.f3q': '怎么调深棕色？',
  'gw.what-colors-make-brown.f3a':
    '任选一条棕色路线再往下压：多加互补色会加深，或直接加一点黑。颜料里的经典做法是往赭石里调一点群青，同样的原理。',
  'gw.what-colors-make-brown.f4q': '怎么调浅棕或日晒棕？',
  'gw.what-colors-make-brown.f4a':
    '加白。日晒棕、米色、浅棕都是上面的棕色拉向白——凭手感四分之一的白已经读作日晒棕。用糖霜的话，这正是用棕色凝胶调出日晒棕糖霜的方法。',
  'gw.what-colors-make-brown.f5q': '为什么混色会变棕而不是出新颜色？',
  'gw.what-colors-make-brown.f5a':
    '颜料做减法：每种颜料吸收一段波长，叠起来吸收得越来越多。重度混合后幸存的是红到黄之间一段昏暗的波段——你的眼睛把它报告为棕色。屏幕上同样的混合表现不同，因为屏幕加光而不是吸光。',
  'gw.what-colors-make-brown.r1': '红配绿：经典棕色，每种比例',
  'gw.what-colors-make-brown.r2': '棕加白调出日晒棕',
  'gw.what-colors-make-brown.r3': '怎么调棕色糖霜：五种方法',
  'gw.what-colors-make-brown.r4': '全部配色指南',

  /* ---------- what-colors-make-purple ---------- */
  'gw.what-colors-make-purple.lead':
    '紫色在色环上是个异类：它没有属于自己的波长。颜料里红加蓝能调出，品红加蓝更鲜艳，加白或加黑变成薰衣草紫或茄紫。下面每个色样都是计算出的混合，挤颜料之前就能看到每条路线的确切落点。',
  'gw.what-colors-make-purple.ans': '红蓝等量',
  'gw.what-colors-make-purple.introH': '为什么紫色是最难调的经典混色',
  'gw.what-colors-make-purple.i1':
    '与红、绿、蓝不同，紫色不是屏幕能用单一通道发出的颜色——也不是眼睛能独立看到的波长。紫色住在光谱红端与蓝端之间的空档里，所以它只能以混合物的形式存在。这让它既是课堂标准答案（红加蓝），也是实践中最经典的失望：混出的颜料往往比预想的更灰更暗。',
  'gw.what-colors-make-purple.i2':
    '原因是减法。红颜料吸收大部分蓝光，蓝颜料吸收大部分红光——两者叠起来只剩一点昏暗的紫罗兰剩余。画家绕开这点的办法是把红换成品红——一种同时反射红光和蓝光的颜料。同一思路，紫得鲜活得多。下面的路线两者都有，每条都标了确切落点。',
  'gw.what-colors-make-purple.listH': '五条路线，全部实算',
  'gw.what-colors-make-purple.m1n': '红 + 蓝（课堂答案）',
  'gw.what-colors-make-purple.m1s': '经典：等量红蓝落在一个偏灰的纯正紫色上。',
  'gw.what-colors-make-purple.m1c1': '红',
  'gw.what-colors-make-purple.m1c2': '蓝',
  'gw.what-colors-make-purple.m1o':
    '这是人人都学的答案，也确实管用——但注意结果比你脑海里的紫更暗。红吸蓝、蓝吸红，混出来先天偏暗。多数场合够用；想要惊艳就看下一条路线。',
  'gw.what-colors-make-purple.m2n': '品红 + 蓝（鲜艳路线）',
  'gw.what-colors-make-purple.m2s': '把红换成品红，同样的混合立刻带电。',
  'gw.what-colors-make-purple.m2c1': '品红',
  'gw.what-colors-make-purple.m2c2': '蓝',
  'gw.what-colors-make-purple.m2o':
    '品红是印刷原色——它反射红光和蓝光而不是吃掉一半。在颜料语境里就是喹吖啶酮品红加群青，干净宝紫的标准配方。红蓝混合令人失望时，升级到这条。',
  'gw.what-colors-make-purple.m3n': '偏蓝出紫罗兰',
  'gw.what-colors-make-purple.m3s': '蓝是红的两倍，把混合推向蓝紫和靛蓝。',
  'gw.what-colors-make-purple.m3c1': '红',
  'gw.what-colors-make-purple.m3c2': '蓝',
  'gw.what-colors-make-purple.m3o':
    '紫罗兰就是多加了蓝的紫色。这是鸢尾紫、偏薰衣草的蓝、黄昏深空的赛道。颜料里往紫色加一点群青做的是同一件事。',
  'gw.what-colors-make-purple.m4n': '偏红出李子紫',
  'gw.what-colors-make-purple.m4s': '比例反过来就暖起来，进入李子紫和酒红紫的地界。',
  'gw.what-colors-make-purple.m4c1': '红',
  'gw.what-colors-make-purple.m4c2': '蓝',
  'gw.what-colors-make-purple.m4o':
    '多加的红把混合推向红紫：李子紫、酒红紫、偏品红的紫。这一族读起来温暖而不是冷感，也是紫红（fuchsia）这类偏粉紫色的起点。',
  'gw.what-colors-make-purple.m5n': '紫 + 黑（加深路线）',
  'gw.what-colors-make-purple.m5s': '调好的紫加四分之一黑，得到茄紫色。',
  'gw.what-colors-make-purple.m5c1': '紫',
  'gw.what-colors-make-purple.m5c2': '黑',
  'gw.what-colors-make-purple.m5o':
    '到达深茄紫最可预测的路。黑要一点一点加——紫色在最后阶段加深很快，而且没法退。反方向用白就行：见下面薰衣草紫 FAQ。',
  'gw.what-colors-make-purple.t1t': '紫的鲜活得看你的红。',
  'gw.what-colors-make-purple.t1b':
    '偏黄的红（镉红、朱红）会把混合拖向泥浆，因为黄和蓝往相反方向拉。如果你的紫总是发灰，换成品红、玫瑰红或喹吖啶酮——爱蓝的红。',
  'gw.what-colors-make-purple.t2t': '薰衣草紫是浅化，不是新颜色。',
  'gw.what-colors-make-purple.t2b':
    '薰衣草紫、丁香紫、浅紫都是紫加白。四分之一的白已经读作薰衣草紫；继续加就到丁香紫。糖霜里白色的基底免费替你做了这一步。',
  'gw.what-colors-make-purple.t3t': '别让黄靠近你的紫。',
  'gw.what-colors-make-purple.t3b':
    '黄是紫的互补色：它一混进来（脏笔刷、被污染的凝胶），混合就塌向灰和棕。如果你要的正是这种效果，那叫降饱和——完整地图见"什么颜色调出棕色"。',
  'gw.what-colors-make-purple.t4t': '屏幕作弊，颜料做减法。',
  'gw.what-colors-make-purple.t4b':
    '显示器直接混合红光和蓝光，所以数字紫比任何颜料混合都干净。管装版本比屏幕色样深一档灰一档是正常的。',
  'gw.what-colors-make-purple.f1q': '哪两种颜色调出紫色？',
  'gw.what-colors-make-purple.f1a':
    '红和蓝——经典答案，等量混合落在偏灰的紫罗兰上。更干净的混合是品红加蓝，因为品红同时反射红光蓝光而不是吸收一半。偏蓝得紫罗兰，偏红得李子紫。',
  'gw.what-colors-make-purple.f2q': '怎么调深紫？',
  'gw.what-colors-make-purple.f2a':
    '两条路：往混合里加蓝（加深且变冷），或给调好的紫加少量黑，得到茄紫和深紫。慢一点——两条路的最后一段紫色都加深得很快。',
  'gw.what-colors-make-purple.f3q': '怎么调薰衣草紫或浅紫？',
  'gw.what-colors-make-purple.f3a':
    '加白。薰衣草紫、丁香紫、长春花紫都是紫的浅化：大约一份白配四份紫已经读作薰衣草紫，更多白走向丁香紫。在奶油霜或糖霜里，白基底自动完成这一步。',
  'gw.what-colors-make-purple.f4q': '为什么我的红蓝混出来是灰或棕而不是紫？',
  'gw.what-colors-make-purple.f4a':
    '几乎总是红的锅。偏黄的红（镉红、朱红）把杀死紫的那种颜色带进了混合。换品红或玫瑰红，并把笔刷洗净——之前混色残留的微量黄破坏力相同。',
  'gw.what-colors-make-purple.f5q': '紫色和紫罗兰色有什么区别？',
  'gw.what-colors-make-purple.f5a':
    '日常使用里可以互换。严格说，紫罗兰是家族里更偏蓝的成员——靠近靛蓝——而紫偏红靠向李子和品红。艺术家用紫罗兰指偏蓝混合、紫指偏红混合；上面两条比例路线并排展示了差别。',
  'gw.what-colors-make-purple.r1': '红配蓝：每种比例的确切颜色',
  'gw.what-colors-make-purple.r2': '蓝配紫调出紫罗兰',
  'gw.what-colors-make-purple.r3': '紫配红调出品红',
  'gw.what-colors-make-purple.r4': '什么颜色调出棕色（互补色为何相撞）',
  'gw.what-colors-make-purple.r5': '在线调一个你自己的紫',

  /* ---------- what-colors-make-green ---------- */
  'gw.what-colors-make-green.lead':
    '蓝加黄调出绿——人人学会的第一个混色，也是蓝色选择悄悄决定一切的地方。偏紫的蓝调出灰暗自然的绿；偏青的蓝调出鲜艳的绿；黄多滑向黄绿，蓝多滑向水鸭色。下面每个色样都是计算出的混合，不是照片。',
  'gw.what-colors-make-green.ans': '颜料里的蓝加黄',
  'gw.what-colors-make-green.introH': '蓝和黄到底为什么调出绿',
  'gw.what-colors-make-green.i1':
    '绿是光的三原色之一——屏幕不混合它，直接点亮绿色像素。颜料没有这种捷径：绿色素必须来自混合，蓝加黄就是那条路。它靠减法工作：蓝色素吸收光谱的红橙端，黄色素吸收紫蓝端，两者都放过的那段就是绿。幸存的那段就是你看到的颜色。',
  'gw.what-colors-make-green.i2':
    '因为混合取决于每种颜料放过什么，具体的蓝比比例更重要。偏紫的蓝（群青）漏一点红，绿来得灰暗自然——想想鼠尾草和苔藓。偏青的蓝（酞菁）不漏暖色，绿就鲜艳冷冽。下面的路线从画家起步的地方开始：蓝一点点揉进黄基底得到经典混合，然后以绿为中心，黄、蓝、黑、白把它带向黄绿、水鸭、森林和鼠尾草。',
  'gw.what-colors-make-green.listH': '五条路线，全部实算',
  'gw.what-colors-make-green.m1n': '蓝揉进黄（画家路线）',
  'gw.what-colors-make-green.m1s': '把蓝揉进两倍量的黄基底——经典的新鲜绿。',
  'gw.what-colors-make-green.m1c1': '天蓝',
  'gw.what-colors-make-green.m1c2': '黄',
  'gw.what-colors-make-green.m1o':
    '调色盘上实际的做法：蓝一点点加进黄，永远不反过来。等量在多数颜料上会过冲成暗灰的中间色——而屏幕上 50/50 的蓝黄混光会冲成浅蓝而不是绿，因为光相加趋白。颜料才是造绿的工序。',
  'gw.what-colors-make-green.m2n': '绿 + 黄（黄绿路线）',
  'gw.what-colors-make-green.m2s': '从绿起步偏黄，得到青柠、黄绿和春绿。',
  'gw.what-colors-make-green.m2c1': '绿',
  'gw.what-colors-make-green.m2c2': '黄',
  'gw.what-colors-make-green.m2o':
    '到鲜艳黄绿最干净的路：绿已经坐在你要的位置上，黄只是把它往青柠方向带。蓝黄混合怎么都亮不起来时，这也是解法——从绿色素重新开始，别跟发灰较劲。',
  'gw.what-colors-make-green.m3n': '绿 + 蓝（水鸭路线）',
  'gw.what-colors-make-green.m3s': '往另一头偏，得到水鸭绿、海绿和云杉绿。',
  'gw.what-colors-make-green.m3c1': '绿',
  'gw.what-colors-make-green.m3c2': '天蓝',
  'gw.what-colors-make-green.m3o':
    '蓝多的绿读起来冷静沉稳——家族里水疗和深林的那一端。真实颜料管里，偏青的蓝（酞菁）给最脆的水鸭绿，偏紫的（群青）给更沉更灰的云杉绿。',
  'gw.what-colors-make-green.m4n': '绿 + 黑（森林路线）',
  'gw.what-colors-make-green.m4s': '调好的绿加四分之一黑，得到森林绿和松绿。',
  'gw.what-colors-make-green.m4c1': '绿',
  'gw.what-colors-make-green.m4c2': '黑',
  'gw.what-colors-make-green.m4o':
    '到深绿的加深路线。黑加深的同时会压平，在它变得风格化之前收手——要自然的深度，用额外的蓝加深，黑留作最后的微调。',
  'gw.what-colors-make-green.m5n': '绿 + 白（鼠尾草路线）',
  'gw.what-colors-make-green.m5s': '调好的绿拉向白，得到鼠尾草绿、薄荷绿和粉彩绿。',
  'gw.what-colors-make-green.m5c1': '绿',
  'gw.what-colors-make-green.m5c2': '白',
  'gw.what-colors-make-green.m5o':
    '鼠尾草绿是被拉到半途的绿加白，也是室内设计最想要的绿，理由充分：白把它吵闹的部分全部软化。等量已经读作鼠尾草；薄荷绿是从偏蓝的绿出发的同一段路。',
  'gw.what-colors-make-green.t1t': '蓝决定气质。',
  'gw.what-colors-make-green.t1b':
    '群青（偏紫）给灰暗自然的绿；酞菁（偏青）给鲜艳冷冽的绿。绿混色一再失望时，换蓝，别调比例。',
  'gw.what-colors-make-green.t2t': '自然用蓝加深，风格用黑。',
  'gw.what-colors-make-green.t2b':
    '多加蓝让绿加深同时保持鲜活——自然的松绿和苔藓就是这么来的。黑加深更快但更平，适合图形化的森林绿和风格化创作。',
  'gw.what-colors-make-green.t3t': '橄榄绿是碰伤的绿。',
  'gw.what-colors-make-green.t3b':
    '一点红——绿的互补色——把绿拖向橄榄和苔藓。和调出棕是同一场相撞，只是停得早。大地色系很好用，想要鲜艳就是灾难。',
  'gw.what-colors-make-green.t4t': '屏幕不混合绿。',
  'gw.what-colors-make-green.t4b':
    '绿是光的原色：显示器直接点亮它，没有混合。这就是数字绿在任何颜料旁边都显得荧光的原因——而蓝光加黄光趋白，屏幕上两者 50/50 看起来发白而不是绿，和颜料完全相反。',
  'gw.what-colors-make-green.f1q': '哪两种颜色调出绿？',
  'gw.what-colors-make-green.f1a':
    '蓝和黄。混合靠减法：蓝吸收光谱暖端，黄吸收冷端，中间的绿带幸存。等量给中间绿；黄多成黄绿，蓝多成水鸭。',
  'gw.what-colors-make-green.f2q': '怎么调深绿或森林绿？',
  'gw.what-colors-make-green.f2a':
    '两条路：加蓝加深同时保住绿的活性（自然的松绿、苔藓），或给调好的绿加少量黑（图形化森林绿）。蓝温和加深；黑来得猛且压平，分小份加。',
  'gw.what-colors-make-green.f3q': '怎么调浅绿、薄荷绿或鼠尾草绿？',
  'gw.what-colors-make-green.f3a':
    '加白。鼠尾草绿大约是等量绿加白；薄荷绿是从偏蓝的绿出发的同一个浅化。糖霜里白基底替你打底——一滴绿凝胶已经落在粉彩区。',
  'gw.what-colors-make-green.f4q': '怎么调橄榄绿？',
  'gw.what-colors-make-green.f4a':
    '加一点红。红是绿的互补色，少量就能把绿碰伤成橄榄和苔藓而不一路到棕。一撮橙或棕做同样的事，更暖。',
  'gw.what-colors-make-green.f5q': '为什么蓝黄混出绿而不是单纯变深？',
  'gw.what-colors-make-green.f5a':
    '因为两种颜料挡住光谱的不同半边。蓝吸收红和橙；黄吸收紫和蓝。叠起来之后两边都还在反射的只剩中间的绿带——到达你眼睛的就是它。',
  'gw.what-colors-make-green.r1': '蓝配黄：每种比例的确切颜色',
  'gw.what-colors-make-green.r2': '黄配绿调出黄绿色',
  'gw.what-colors-make-green.r3': '绿配黑调出森林绿',
  'gw.what-colors-make-green.r4': '什么颜色调出棕色（橄榄与棕的边界）',
  'gw.what-colors-make-green.r5': '全部配色指南',

  /* ---------- what-colors-make-orange ---------- */
  'gw.what-colors-make-orange.lead':
    '红加黄调出橙——色环上最友善的混色，因为两色是邻居，融合得干净。比例决定其余：黄多出金色琥珀，红多出朱红，白给出桃色，黑把它带向焦橙。下面每个色样都是算出来的，不是拍出来的。',
  'gw.what-colors-make-orange.ans': '红黄等量',
  'gw.what-colors-make-orange.introH': '为什么橙色这么好调',
  'gw.what-colors-make-orange.i1':
    '橙是唯一以水果命名的大颜色——橙子传到欧洲之前，英语没有它的词，叫它"黄红"（geoluread）。在色环上它坐在红和黄的正中间，两者是邻居而不是对家，混合时不会出现紫和棕那种浑浊。无论选什么比例，落点都有用。',
  'gw.what-colors-make-orange.i2':
    '屏幕上橙是纯加法：红光加绿光，相加。你的电视没有橙色像素——它同时点亮红和绿画出水果碗的橙，这也是数字照片里橙和棕挨得这么近的原因：棕就是暗橙，同一套算法把亮度调低而已。',
  'gw.what-colors-make-orange.listH': '五条路线，全部实算',
  'gw.what-colors-make-orange.m1n': '红 + 黄（经典）',
  'gw.what-colors-make-orange.m1s': '等量红黄落在干净的纯正橙上。',
  'gw.what-colors-make-orange.m1c1': '红',
  'gw.what-colors-make-orange.m1c2': '黄',
  'gw.what-colors-make-orange.m1o':
    '课堂答案，也是颜料里最宽容的混色。红黄在色环上是邻居，这里没有任何比例会变浑——你只是在两者之间的坡道上滑动。这个混合是下面所有变体的锚点。',
  'gw.what-colors-make-orange.m2n': '黄多出琥珀',
  'gw.what-colors-make-orange.m2s': '两倍黄把混合带向金色和琥珀。',
  'gw.what-colors-make-orange.m2c1': '红',
  'gw.what-colors-make-orange.m2c2': '黄',
  'gw.what-colors-make-orange.m2o':
    '黄多的橙读作金色、琥珀和万寿菊——家族里阳光的那端。多数颜料里黄是更强的一方，追坡道上某个具体点时量红而不是量黄。',
  'gw.what-colors-make-orange.m3n': '红多出朱红',
  'gw.what-colors-make-orange.m3s': '比例反过来，混合升温奔向朱红和橙红。',
  'gw.what-colors-make-orange.m3c1': '红',
  'gw.what-colors-make-orange.m3c2': '黄',
  'gw.what-colors-make-orange.m3o':
    '红多的橙是朱红和猩红的领地——火、罂粟、珊瑚。历史上朱红是独立的汞颜料，但混合用你已有的两种原色就能到同一个区间。',
  'gw.what-colors-make-orange.m4n': '橙 + 白（桃色路线）',
  'gw.what-colors-make-orange.m4s': '调好的橙浅化，得到桃色、杏色和粉彩珊瑚。',
  'gw.what-colors-make-orange.m4c1': '橙',
  'gw.what-colors-make-orange.m4c2': '白',
  'gw.what-colors-make-orange.m4o':
    '桃色是拉向白的橙，就像粉是拉向白的红。四分之一白已经读作桃色；继续走是杏色和粉彩珊瑚。糖霜的白基底意味着你默认就从这个位置起步。',
  'gw.what-colors-make-orange.m5n': '橙 + 黑（焦橙路线）',
  'gw.what-colors-make-orange.m5s': '调好的橙加深到焦橙——再往前就是棕。',
  'gw.what-colors-make-orange.m5c1': '橙',
  'gw.what-colors-make-orange.m5c2': '黑',
  'gw.what-colors-make-orange.m5o':
    '四分之一黑给焦橙和铁锈红。再推进就跨进棕的国境——因为棕就是深橙，这也是我们"什么颜色调出棕色"整篇的前提。一条坡道，三个颜色。',
  'gw.what-colors-make-orange.t1t': '挑一个暖红。',
  'gw.what-colors-make-orange.t1b':
    '偏蓝的红（茜素红、品红）调出灰扑扑的铁锈橙；暖红（镉红、猩红、朱红）保持混合明亮。橙一再变砖色时，嫌疑犯是红。',
  'gw.what-colors-make-orange.t2t': '金色是比例，不是颜料。',
  'gw.what-colors-make-orange.t2b':
    '金—琥珀—万寿菊区间就是黄多一点的橙。不需要金色颜料管；需要的是把坡道偏过去。反方向的火焰色同理——红多一点，热多一点。',
  'gw.what-colors-make-orange.t3t': '桃色和焦橙是同一个旋钮。',
  'gw.what-colors-make-orange.t3b':
    '白把橙带向桃和杏；黑把它带向焦橙和铁锈。调色盘里的其他橙离中心混合都只差这两步之一。',
  'gw.what-colors-make-orange.t4t': '橙加蓝会变棕。',
  'gw.what-colors-make-orange.t4b':
    '蓝是橙的互补色：混起来落进铁锈、日晒棕和棕。想把橙降成大地色时完美——想保住干净橙时是最快的翻车方式。',
  'gw.what-colors-make-orange.f1q': '哪两种颜色调出橙？',
  'gw.what-colors-make-orange.f1a':
    '红和黄，任何比例。它们是色环邻居，任何比例都干净：等量是纯正橙，黄多偏金和琥珀，红多偏朱红。',
  'gw.what-colors-make-orange.f2q': '怎么调深橙或焦橙？',
  'gw.what-colors-make-orange.f2a':
    '给调好的橙加少量黑——四分之一落在焦橙和铁锈。一点蓝（橙的互补色）加深同时保持更暖更土；任一推过头都到棕，因为棕就是深橙。',
  'gw.what-colors-make-orange.f3q': '怎么调桃色或浅橙？',
  'gw.what-colors-make-orange.f3a':
    '加白。桃色大约一份白配三份橙；更多白走向杏色和粉彩珊瑚。和把红变粉是同一个动作。',
  'gw.what-colors-make-orange.f4q': '没有红怎么调橙？',
  'gw.what-colors-make-orange.f4a':
    '黄混品红。品红是油墨和颜料混合的原色，黄加品红合起来覆盖了红通道——打印机印的每个橙都来自这一对。',
  'gw.what-colors-make-orange.f5q': '什么颜色调出橙色颜料？',
  'gw.what-colors-make-orange.f5a':
    '镉红加镉黄是经典管装配方，干净不透明。猩红或朱红配柠檬黄更火热；换茜素红，同样的混合变得土气带铁锈。',
  'gw.what-colors-make-orange.r1': '红配黄：每种比例的确切颜色',
  'gw.what-colors-make-orange.r2': '橙配黄调出金色',
  'gw.what-colors-make-orange.r3': '橙配红调出朱红',
  'gw.what-colors-make-orange.r4': '什么颜色调出棕色（深橙讲解版）',
  'gw.what-colors-make-orange.r5': '在线调一个你自己的橙',

  /* ---------- how-to-make-black-frosting ---------- */
  'gw.how-to-make-black-frosting.lead':
    '黑是家庭烘焙师最头疼的颜色。往白奶油霜里加黑凝胶，得到的是灰，然后是苦味，很久之后才是黑。解法是别从白起步：从巧克力开始，用凝胶不用液体，再让颜色过夜发展。只花一小部分色素就能到深邃的上镜黑。',
  'gw.how-to-make-black-frosting.ans': '深炭黑',
  'gw.how-to-make-black-frosting.introH': '黑色糖霜为什么难调',
  'gw.how-to-make-black-frosting.i1':
    '糖霜看起来是白的，因为糖和脂肪把每种波长的光都散射回你眼睛。食用色素只能减光不能加光，所以黑糖霜必须吸收照上来的几乎所有光。从白起步需要多得吓人的色素，而重色素发苦。整个问题就这一段话。',
  'gw.how-to-make-black-frosting.i2':
    '第二个问题是色素本身。液体色素大部分是水；要接近黑得加几汤匙，奶油霜变成汤。凝胶色素（Americolor、Wilton、Chefmaster）是浓缩膏：四分之一茶匙做到四分之一杯液体做不到的事，稠度保住了。',
  'gw.how-to-make-black-frosting.listH': '四条路到达',
  'gw.how-to-make-black-frosting.m1n': '巧克力基底 + 黑凝胶（面包店做法）',
  'gw.how-to-make-black-frosting.m1s': '从深巧克力奶油霜起步再加黑凝胶。棕色已经替你吸收了大部分光。',
  'gw.how-to-make-black-frosting.m1c1': '巧克力奶油霜',
  'gw.how-to-make-black-frosting.m1c2': '黑凝胶',
  'gw.how-to-make-black-frosting.m1o':
    '面包店实际就这么做。巧克力糖霜在你打开凝胶瓶之前已经完成了八成，所以色素只需五分之一，没有苦味边缘，味道是巧克力不是化学品。',
  'gw.how-to-make-black-frosting.m2n': '黑可可奶油霜',
  'gw.how-to-make-black-frosting.m2s': '玛瑙（黑）可可粉边调色边调味：不靠色素做出奥利奥级的深色糖霜。',
  'gw.how-to-make-black-frosting.m2c1': '黑可可奶油霜',
  'gw.how-to-make-black-frosting.m2c2': '黑凝胶',
  'gw.how-to-make-black-frosting.m2o':
    '黑可可就是让奥利奥夹心尝起来像奥利奥夹心的原料。把四分之一普通可可换成它，糖霜自己就接近黑；拍照前一点凝胶收尾。',
  'gw.how-to-make-black-frosting.m3n': '白基底 + 重黑凝胶',
  'gw.how-to-make-black-frosting.m3s': '必须保持香草味的路线：往白奶油霜里重下凝胶。',
  'gw.how-to-make-black-frosting.m3c1': '香草奶油霜',
  'gw.how-to-make-black-frosting.m3c2': '黑凝胶',
  'gw.how-to-make-black-frosting.m3o':
    '计算色样是这条路线的诚实天花板：炭灰，不是黑。过夜会加深，但要照片级纯黑的话，这就是专业人士悄悄从巧克力起步的原因。',
  'gw.how-to-make-black-frosting.m4n': '没有黑凝胶？红蓝绿合体',
  'gw.how-to-make-black-frosting.m4s': '应急混合：三原色加进白糖霜互相抵消光线。',
  'gw.how-to-make-black-frosting.m4c1': '香草奶油霜',
  'gw.how-to-make-black-frosting.m4c2': '红凝胶',
  'gw.how-to-make-black-frosting.m4c3': '蓝凝胶',
  'gw.how-to-make-black-frosting.m4c4': '绿凝胶',
  'gw.how-to-make-black-frosting.m4o':
    '每种颜料吸收别人反射的，合起来几乎什么都不剩：一碗减色法。结果偏土且吃味道，当救援用，别当方案。',
  'gw.how-to-make-black-frosting.t1t': '评判前先过夜。',
  'gw.how-to-make-black-frosting.t1b':
    '黑凝胶在水化过程中会变深。晚上八点看是深灰，早上读作黑。静置免费；多加色素费味道。',
  'gw.how-to-make-black-frosting.t2t': '按杯计量。',
  'gw.how-to-make-black-frosting.t2b':
    '巧克力基底起步，每杯奶油霜从八分之一茶匙凝胶开始，封顶四分之一左右。白基底起步，预算到每杯半茶匙，预期是炭灰级不是墨级。',
  'gw.how-to-make-black-frosting.t3t': '镜头黑不是眼睛黑。',
  'gw.how-to-make-black-frosting.t3b':
    '照片里读作黑的通常是深炭灰。最黑的糖霜现场看反而死板且明显染色，所以目标定得比你以为的浅一档。',
  'gw.how-to-make-black-frosting.t4t': '裱花前重新打发。',
  'gw.how-to-make-black-frosting.t4b':
    '静置过的黑奶油霜表面看起来灰而有纹。快速重新打发 15 秒，颜色就重新聚拢。',
  'gw.how-to-make-black-frosting.f1q': '调黑糖霜要多少黑色食用色素？',
  'gw.how-to-make-black-frosting.f1a':
    '巧克力基底起步：每杯奶油霜八分之一到四分之一茶匙凝胶。白基底起步：每杯半茶匙以上，并且不静置过夜就接受炭灰结果。黑色永远别用液体色素：需要的量会先把糖霜冲稀，然后才轮到变深。',
  'gw.how-to-make-black-frosting.f2q': '为什么我的黑糖霜变灰了？',
  'gw.how-to-make-black-frosting.f2a':
    '几乎总是三件事之一：从白起步（最难的路）、没静置（凝胶会继续加深几小时）、或凝胶加到顶了。可靠的修复是从巧克力糖霜重来，棕色免费完成大部分加深。',
  'gw.how-to-make-black-frosting.f3q': '不用黑色色素怎么调黑糖霜？',
  'gw.how-to-make-black-frosting.f3a':
    '用黑可可粉，也叫玛瑙可可。它边调味边把糖霜染成极深的棕黑，零色素。只有在摄影灯下需要纯黑时再补少量黑凝胶。',
  'gw.how-to-make-black-frosting.f4q': '黑糖霜难吃吗？',
  'gw.how-to-make-black-frosting.f4a':
    '只有靠大量凝胶硬堆的时候。重黑凝胶读作苦和化学味。巧克力基底法正是为绕开它而生：色素更少，味道由巧克力扛。',
  'gw.how-to-make-black-frosting.f5q': '皇家糖霜也适用吗？',
  'gw.how-to-make-black-frosting.f5a':
    '适用，两处调整。皇家糖霜比奶油霜更白，要显一样深需要更多凝胶；而且它必须保持硬度，这是凝胶优于液体的又一个理由。过夜静置的招在皇家糖霜里效果更强。',
  'gw.how-to-make-black-frosting.r1': '红绿为什么调出棕（应急混合背后的原理）',
  'gw.how-to-make-black-frosting.r2': '怎么调棕色糖霜：五种方法',
  'gw.how-to-make-black-frosting.r3': '糖霜配色表：每种凝胶按滴数',
  'gw.how-to-make-black-frosting.r4': '在线调你自己的糖霜色',

  /* ---------- how-to-make-brown-icing ---------- */
  'gw.how-to-make-brown-icing.lead':
    '棕是厨房里最友善的"难"色，因为有五条入口：可可粉、棕色凝胶、红加绿、橙加蓝、或一份浓缩咖啡。每条落在不同的棕上，从烘焙巧克力到暖焦糖，下面的色样是计算混合而不是目测照片。',
  'gw.how-to-make-brown-icing.ans': '温暖的烘焙棕',
  'gw.how-to-make-brown-icing.introH': '棕色到底是什么',
  'gw.how-to-make-brown-icing.i1':
    '棕是深橙。任何把红黄色系亮度压下去的路线都能到，这就是为什么那么多"不同"的方法落进同一家族。颜料里红配绿出棕，因为各自吸收对方的光，幸存的是一点昏暗的暖色剩余。',
  'gw.how-to-make-brown-icing.i2':
    '日晒棕和米色是同一个故事调小音量：棕拉向白。要日晒棕糖霜，用下面任意方法加四分之一的量，你已经到了。',
  'gw.how-to-make-brown-icing.listH': '五条路到达',
  'gw.how-to-make-brown-icing.m1n': '可可粉（颜色加味道）',
  'gw.how-to-make-brown-icing.m1s': '可可搅进白糖霜：颜色和巧克力味一起到，零色素。',
  'gw.how-to-make-brown-icing.m1c1': '白糖霜',
  'gw.how-to-make-brown-icing.m1c2': '可可粉',
  'gw.how-to-make-brown-icing.m1o':
    '每杯糖霜 1~2 汤匙起色；要更浓就再加，同时把糖粉稍微减一点补偿。',
  'gw.how-to-make-brown-icing.m2n': '棕色凝胶色素',
  'gw.how-to-make-brown-icing.m2s': '最好控制的路线：白糖霜里加棕凝胶，逐滴可调。',
  'gw.how-to-make-brown-icing.m2c1': '白糖霜',
  'gw.how-to-make-brown-icing.m2c2': '棕色凝胶',
  'gw.how-to-make-brown-icing.m2o':
    '每杯一滴落焦糖色；两到三滴到巧克力色。Wilton Brown 和 Americolor Chocolate Brown 是常见管装。荷兰碱化可可和棕凝胶可以同用，融合干净。',
  'gw.how-to-make-brown-icing.m3n': '红加绿凝胶',
  'gw.how-to-make-brown-icing.m3s': '色彩理论答案：两种互补凝胶互相抵消成棕。',
  'gw.how-to-make-brown-icing.m3c1': '白糖霜',
  'gw.how-to-make-brown-icing.m3c2': '红凝胶',
  'gw.how-to-make-brown-icing.m3c3': '绿凝胶',
  'gw.how-to-make-brown-icing.m3o':
    '红颜料吸收绿光，绿颜料吸收红光；反射回来的是柔和的暖棕。两胶大致等量，否则混合偏砖或偏橄榄。',
  'gw.how-to-make-brown-icing.m4n': '橙加蓝凝胶',
  'gw.how-to-make-brown-icing.m4s': '另一对互补色：橙配少量蓝，得到核桃棕。',
  'gw.how-to-make-brown-icing.m4c1': '白糖霜',
  'gw.how-to-make-brown-icing.m4c2': '橙凝胶',
  'gw.how-to-make-brown-icing.m4c3': '蓝凝胶',
  'gw.how-to-make-brown-icing.m4o':
    '蓝色很强，所以只用橙一半的量。偏蓝滑向灰；偏橙读作焦糖。',
  'gw.how-to-make-brown-icing.m5n': '浓缩咖啡（摩卡路线）',
  'gw.how-to-make-brown-icing.m5s': '速溶浓缩咖啡溶进白糖霜：味道优先的棕，适合大人系甜品。',
  'gw.how-to-make-brown-icing.m5c1': '白糖霜',
  'gw.how-to-make-brown-icing.m5c2': '浓缩咖啡',
  'gw.how-to-make-brown-icing.m5o':
    '速溶粉先化在几滴水里，不容易结条痕。每杯两茶匙给摩卡日晒棕；与可可法叠加得到认真的咖啡棕。',
  'gw.how-to-make-brown-icing.t1t': '日晒棕就是没到位的棕。',
  'gw.how-to-make-brown-icing.t1b':
    '要日晒棕糖霜，任选上面方法用四分之一量，或用干净白糖霜延展你的棕。日晒棕、米色、棕色是一家；只有含白量在变。',
  'gw.how-to-make-brown-icing.t2t': '皇家糖霜干后变深。',
  'gw.how-to-make-brown-icing.t2b':
    '在油纸上挤一道测试，等 20 分钟再评判颜色。干后的皇家糖霜比碗里看起来明显更深更暖。',
  'gw.how-to-make-brown-icing.t3t': '按用途选棕。',
  'gw.how-to-make-brown-icing.t3b':
    '姜饼人要偏红的暖棕（多加红凝胶）；巧克力夹心饼干要深可可端。先按味道选方法，再用凝胶微调。',
  'gw.how-to-make-brown-icing.f1q': '哪两种颜色调出棕色糖霜？',
  'gw.how-to-make-brown-icing.f1a':
    '红加绿，或橙加蓝：互补颜料互相吸收对方的光，剩下的就是棕。无色素答案是可可粉。每条路线落点略不同，从焦糖到烘焙巧克力。',
  'gw.how-to-make-brown-icing.f2q': '没有棕色色素怎么调棕色糖霜？',
  'gw.how-to-make-brown-icing.f2a':
    '可可粉是标准答案：每杯 1~2 汤匙同时上色和调味。备选是等量红加绿凝胶，用减法混出棕。',
  'gw.how-to-make-brown-icing.f3q': '什么颜色调出日晒棕糖霜？',
  'gw.how-to-make-brown-icing.f3a':
    '和棕同样的颜色，减量用：棕是深橙，日晒棕是同一个棕拉向白。凝胶用四分之一量，或把调好的棕糖霜和更多白酱混合到读作日晒棕。',
  'gw.how-to-make-brown-icing.f4q': '为什么我的棕糖霜发灰？',
  'gw.how-to-make-brown-icing.f4a':
    '叠了太多颜料：蓝、绿、红一堆积就吸收一切，混合死灰。从白基底重来，用一条路线搭出棕，别三条一起补。',
  'gw.how-to-make-brown-icing.f5q': '每杯糖霜该加多少可可？',
  'gw.how-to-make-brown-icing.f5a':
    '每杯一汤匙给牛奶巧克力棕，两汤匙给深色。再多糖霜变稠变渣；用一勺糖粉换掉多余的可可，别加液体。',
  'gw.how-to-make-brown-icing.r1': '什么颜色调出棕色：五条路线实算',
  'gw.how-to-make-brown-icing.r2': '红配绿调出棕——看确切颜色',
  'gw.how-to-make-brown-icing.r3': '棕加白调出日晒棕（日晒棕糖霜的诀窍）',
  'gw.how-to-make-brown-icing.r4': '怎么调黑糖霜',
  'gw.how-to-make-brown-icing.r5': '糖霜配色表：每种凝胶按滴数',
};
