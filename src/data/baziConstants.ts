export type Wuxing = '木' | '火' | '土' | '金' | '水';
export type YinYang = '陽' | '陰';
export type TianGan = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';
export type DiZhi = '子' | '丑' | '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥';

export interface GanInfo {
  wuxing: Wuxing;
  yinyang: YinYang;
  color: string;
}

export interface ZhiInfo {
  wuxing: Wuxing;
  zodiac: string;
  canggan: Array<[TianGan, Wuxing]>;
}

export const GAN_ORDER: TianGan[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
export const ZHI_ORDER: DiZhi[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
export const WUXING_ORDER: Wuxing[] = ['木', '火', '土', '金', '水'];

export const WUXING_COLORS: Record<Wuxing, string> = {
  木: '#2f8f3e',
  火: '#d94a3d',
  土: '#c98a2b',
  金: '#d97806',
  水: '#1f5f8f',
};

export const WUXING_CLASS: Record<Wuxing, string> = {
  木: 'w-mu',
  火: 'w-huo',
  土: 'w-tu',
  金: 'w-jin',
  水: 'w-shui',
};

export const TIAN_GAN: Record<TianGan, GanInfo> = {
  甲: { wuxing: '木', yinyang: '陽', color: WUXING_COLORS.木 },
  乙: { wuxing: '木', yinyang: '陰', color: WUXING_COLORS.木 },
  丙: { wuxing: '火', yinyang: '陽', color: WUXING_COLORS.火 },
  丁: { wuxing: '火', yinyang: '陰', color: WUXING_COLORS.火 },
  戊: { wuxing: '土', yinyang: '陽', color: WUXING_COLORS.土 },
  己: { wuxing: '土', yinyang: '陰', color: WUXING_COLORS.土 },
  庚: { wuxing: '金', yinyang: '陽', color: WUXING_COLORS.金 },
  辛: { wuxing: '金', yinyang: '陰', color: WUXING_COLORS.金 },
  壬: { wuxing: '水', yinyang: '陽', color: WUXING_COLORS.水 },
  癸: { wuxing: '水', yinyang: '陰', color: WUXING_COLORS.水 },
};

export const DI_ZHI: Record<DiZhi, ZhiInfo> = {
  子: { wuxing: '水', zodiac: '鼠', canggan: [['癸', '水']] },
  丑: { wuxing: '土', zodiac: '牛', canggan: [['己', '土'], ['癸', '水'], ['辛', '金']] },
  寅: { wuxing: '木', zodiac: '虎', canggan: [['甲', '木'], ['丙', '火'], ['戊', '土']] },
  卯: { wuxing: '木', zodiac: '兔', canggan: [['乙', '木']] },
  辰: { wuxing: '土', zodiac: '龍', canggan: [['戊', '土'], ['乙', '木'], ['癸', '水']] },
  巳: { wuxing: '火', zodiac: '蛇', canggan: [['丙', '火'], ['戊', '土'], ['庚', '金']] },
  午: { wuxing: '火', zodiac: '馬', canggan: [['丁', '火'], ['己', '土']] },
  未: { wuxing: '土', zodiac: '羊', canggan: [['己', '土'], ['丁', '火'], ['乙', '木']] },
  申: { wuxing: '金', zodiac: '猴', canggan: [['庚', '金'], ['壬', '水'], ['戊', '土']] },
  酉: { wuxing: '金', zodiac: '雞', canggan: [['辛', '金']] },
  戌: { wuxing: '土', zodiac: '狗', canggan: [['戊', '土'], ['辛', '金'], ['丁', '火']] },
  亥: { wuxing: '水', zodiac: '豬', canggan: [['壬', '水'], ['甲', '木']] },
};

// 日主性格 — short personality description for each 日干 (day master).
// Used for 命格概述.
export const RIZHU_PERSONALITY: Record<TianGan, string> = {
  甲: '甲代表陽木，如大樹一樣。有向上精神，性格正直、樸實，外表平靜但內心強大，有部份甲木人好財而計較。',
  乙: '乙代表陰木，如花草一樣。非常有忍耐力，善於應變。性格比較低調及陰柔，一般有同情心，有部份乙木人佔有慾較強及妒忌心重。',
  丙: '丙代表陽火，如太陽一樣。感情豐富、好客，非常積極。性格比較急燥，求勝心重，自尊心強，有部份丙火人衝動及魯莽，比較短視。',
  丁: '丁代表陰火，如燈火一樣。為人思維細膩，富同情心，有禮貌。性格比較多疑，屬內急型，數口好，有部份丁火人非常愛錢財，較孤寒。',
  戊: '戊代表陽土，如城牆一樣。容忍力強，對事物有堅持。性格沉著穩重，誠實，重名譽，有部份戊土人比較戇直呆板，食古不化。',
  己: '己代表陰土，如濕潤土壤一樣。包容力極強，多變。性格沉著文靜，做事精明，統籌能力高，有部份己土人喜歡猜疑，比較優柔寡斷。',
  庚: '庚代表陽金，如刀劍斧頭一樣。有正義感，做事大刀闊斧，好勝心重。性格急進，為人豪爽，不甘於屈服於人，有部分庚金人好面子，不聽人勸。',
  辛: '辛代表陰金，如珠寶首飾一樣。有氣質，做事圓滑，重感情。性格剛毅，有上進心，善糾纏，有部份辛金人虛榮心重，為人比較勢利。',
  壬: '壬代表陽水，如江河一樣。為人樂觀、外向坦白，衝勁十足，有責任心。性格比較粗枝大葉，容易激動，雖然聰明但任性，有部份壬水人做事不理後果，只顧自我感覺良好。',
  癸: '癸代表陰水，如寒露之水。為人主沉靜、內向，善於做輔助角色。性格一般較細膽及保守，忍耐力強，愛幻想，有部份癸水人喜鑽牛角尖，生活不切實際。',
};

export const SHISHEN_DESC: Record<string, string> = {
  比肩: '同我者為比肩，主朋友、兄弟、自我。個性獨立，有主見，易有競爭。',
  劫財: '同我異性者為劫財，主競爭、耗財。性格豪爽，但易破財。',
  食神: '我生者同性為食神，主才華、享受、子女。性情溫和，重視生活品味。',
  傷官: '我生者異性為傷官，主才華、叛逆、創造。聰明好勝，不喜拘束。',
  偏財: '我剋者同性為偏財，主橫財、父親、偏緣。善於交際，機動財源多。',
  正財: '我剋者異性為正財，主正當收入、妻財。勤儉務實，重視家庭。',
  七殺: '剋我同性為七殺，主權威、壓力、挑戰。魄力十足，事業心強。',
  正官: '剋我異性為正官，主名聲、丈夫、事業。端正守禮，有責任感。',
  偏印: '生我同性為偏印，主偏業、哲學、繼母。思想獨特，偏好冷門學問。',
  正印: '生我異性為正印，主學業、母親、貴人。重視學習，溫和有涵養。',
};

export const CHANGSHENG_DESC: Record<string, string> = {
  長生: '如嬰兒初生，充滿朝氣與潛力。',
  沐浴: '如孩童沐浴，純真但易受影響。',
  冠帶: '如成年加冠，漸入社會，根基漸穩。',
  臨官: '如仕途當官，旺氣漸盛。',
  帝旺: '如帝王當權，氣勢最旺。',
  衰: '如氣勢轉衰，由盛轉弱。',
  病: '如染病在身，元氣受損。',
  死: '如氣數已盡，能量最低。',
  墓: '如入墳墓，收藏休息。',
  絕: '如斷絕無氣，轉折之地。',
  胎: '如受胎孕育，新生將起。',
  養: '如母腹養育，蓄勢待發。',
};

export const SHENSHA_DESC: Record<string, string> = {
  天喜: '主喜慶、姻緣、添丁。遇之多有喜事。',
  紅鸞: '主桃花、姻緣，女命尤佳。',
  劫煞: '主意外、破耗、是非。需防突發變故。',
  孤辰: '主孤獨、六親緣薄。男命尤忌。',
  寡宿: '主孤寡、獨處。女命尤忌。',
  地網: '主羈絆、困頓。行事多阻礙。',
  天羅: '主困頓、束縛，發展受限。',
  天德: '主福德、貴人。遇之逢凶化吉。',
  月德: '主福德、逢凶化吉。女命尤佳。',
  天德合: '主福德深厚，逢凶化吉。',
  月德合: '主福澤深厚，助遇貴人。',
  學堂: '主聰明好學，文昌得利。',
  文昌: '主聰慧、學業、文採。遇之利於考試學業。',
  伏吟: '主重複、痛苦、嘆息。事情反覆。',
  華蓋: '主藝術、宗教、孤高。才華出眾但孤僻。',
  流霞: '主血光、手術。女命忌產厄。',
  魁罡: '主剛烈、個性極端。聰明果斷但固執。',
  六厄: '主波折、災厄。行事多險阻。',
  羊刃: '主剛強、刑傷。個性剛烈，易生是非。',
  澄霞: '主才華出眾，色彩鮮明。',
  桃花: '主感情、人緣，男女皆喜。過旺則易生桃色糾紛。',
  驛馬: '主遷移、奔波、旅行。利於外出發展。',
  天乙貴人: '主貴人、扶持，逢凶化吉之象。',
  太極貴人: '主智慧、學識，好玄學命理。',
  將星: '主領導、權威。利於事業發展。',
  金輿: '主富貴、安享。利於配偶得力。',
};

// 60 甲子納音
export const NAYIN_MAP: Record<string, string> = {
  甲子: '海中金', 乙丑: '海中金',
  丙寅: '爐中火', 丁卯: '爐中火',
  戊辰: '大林木', 己巳: '大林木',
  庚午: '路傍土', 辛未: '路傍土',
  壬申: '劍鋒金', 癸酉: '劍鋒金',
  甲戌: '山頭火', 乙亥: '山頭火',
  丙子: '澗下水', 丁丑: '澗下水',
  戊寅: '城頭土', 己卯: '城頭土',
  庚辰: '白臘金', 辛巳: '白臘金',
  壬午: '楊柳木', 癸未: '楊柳木',
  甲申: '泉中水', 乙酉: '泉中水',
  丙戌: '屋上土', 丁亥: '屋上土',
  戊子: '霹靂火', 己丑: '霹靂火',
  庚寅: '松柏木', 辛卯: '松柏木',
  壬辰: '長流水', 癸巳: '長流水',
  甲午: '沙中金', 乙未: '沙中金',
  丙申: '山下火', 丁酉: '山下火',
  戊戌: '平地木', 己亥: '平地木',
  庚子: '壁上土', 辛丑: '壁上土',
  壬寅: '金箔金', 癸卯: '金箔金',
  甲辰: '佛燈火', 乙巳: '佛燈火',
  丙午: '天河水', 丁未: '天河水',
  戊申: '大驛土', 己酉: '大驛土',
  庚戌: '釵釧金', 辛亥: '釵釧金',
  壬子: '桑柘木', 癸丑: '桑柘木',
  甲寅: '大溪水', 乙卯: '大溪水',
  丙辰: '沙中土', 丁巳: '沙中土',
  戊午: '天上火', 己未: '天上火',
  庚申: '石榴木', 辛酉: '石榴木',
  壬戌: '大海水', 癸亥: '大海水',
};

// Return the 60-jiazi position [0..59] for a given ganzhi pair
export function jiaziPosition(gan: TianGan, zhi: DiZhi): number {
  const g = GAN_ORDER.indexOf(gan);
  const z = ZHI_ORDER.indexOf(zhi);
  if (g < 0 || z < 0) return -1;
  for (let k = 0; k < 6; k++) {
    const p = g + 10 * k;
    if (p % 12 === z) return p;
  }
  return -1;
}

// Compute 空亡 (kongwang) branches for a pillar
export function kongwangFor(gan: TianGan, zhi: DiZhi): string {
  const p = jiaziPosition(gan, zhi);
  if (p < 0) return '';
  const xunIdx = Math.floor(p / 10); // 0..5
  // xun 0 (甲子): kongwang 戌亥 (10,11)
  // xun 1 (甲戌): 申酉 (8,9)
  // xun 2 (甲申): 午未 (6,7)
  // xun 3 (甲午): 辰巳 (4,5)
  // xun 4 (甲辰): 寅卯 (2,3)
  // xun 5 (甲寅): 子丑 (0,1)
  const pairs: Array<[number, number]> = [[10, 11], [8, 9], [6, 7], [4, 5], [2, 3], [0, 1]];
  const [a, b] = pairs[xunIdx];
  return ZHI_ORDER[a] + ZHI_ORDER[b];
}

export function nayinFor(gan: TianGan, zhi: DiZhi): string {
  return NAYIN_MAP[`${gan}${zhi}`] ?? '';
}

// ---- library interop ----
export type LibElement = 'WOOD' | 'FIRE' | 'EARTH' | 'METAL' | 'WATER';

export const ELEMENT_TO_WUXING: Record<LibElement, Wuxing> = {
  WOOD: '木',
  FIRE: '火',
  EARTH: '土',
  METAL: '金',
  WATER: '水',
};

export const ANIMAL_TO_CHINESE: Record<string, string> = {
  Rat: '鼠', Ox: '牛', Tiger: '虎', Rabbit: '兔',
  Dragon: '龍', Snake: '蛇', Horse: '馬', Goat: '羊',
  Monkey: '猴', Rooster: '雞', Dog: '狗', Pig: '豬',
};

export const YINYANG_TO_CHINESE: Record<string, YinYang> = {
  Yang: '陽',
  Yin: '陰',
};

// Library lifeCycle (English) → 十二長生 (Chinese)
export const LIFE_CYCLE_TO_CHINESE: Record<string, string> = {
  Birth: '長生',
  Bath: '沐浴',
  Youth: '冠帶',
  Thriving: '臨官',
  Prosperous: '帝旺',
  Weakening: '衰',
  Sick: '病',
  Death: '死',
  Grave: '墓',
  Extinction: '絕',
  Conceived: '胎',
  Nourishing: '養',
};

// Ten-god relationship table. Given day-master (gan) and target gan, returns 十神 name.
const GENERATES: Record<Wuxing, Wuxing> = {
  木: '火', 火: '土', 土: '金', 金: '水', 水: '木',
};
const CONTROLS: Record<Wuxing, Wuxing> = {
  木: '土', 土: '水', 水: '火', 火: '金', 金: '木',
};

// 五鼠遁: 子時 天干 derived from 日干
export const HOUR_GAN_FOR_ZISHI: Record<TianGan, TianGan> = {
  甲: '甲', 己: '甲',
  乙: '丙', 庚: '丙',
  丙: '戊', 辛: '戊',
  丁: '庚', 壬: '庚',
  戊: '壬', 癸: '壬',
};

// 十二長生: stage given day-master 天干 and target 地支. Yang stems run
// forward through ZHI_ORDER starting from their 長生 branch; yin stems run
// backward.
const CHANGSHENG_STAGES = [
  '長生', '沐浴', '冠帶', '臨官', '帝旺', '衰',
  '病', '死', '墓', '絕', '胎', '養',
];

const CHANGSHENG_START: Record<TianGan, DiZhi> = {
  甲: '亥', 乙: '午',
  丙: '寅', 丁: '酉',
  戊: '寅', 己: '酉',
  庚: '巳', 辛: '子',
  壬: '申', 癸: '卯',
};

export function computeXingyun(gan: TianGan, zhi: DiZhi): string {
  const start = CHANGSHENG_START[gan];
  if (!start) return '';
  const startIdx = ZHI_ORDER.indexOf(start);
  const targetIdx = ZHI_ORDER.indexOf(zhi);
  if (startIdx < 0 || targetIdx < 0) return '';
  const direction = TIAN_GAN[gan].yinyang === '陽' ? 1 : -1;
  const stage = ((((targetIdx - startIdx) * direction) % 12) + 12) % 12;
  return CHANGSHENG_STAGES[stage];
}

export function computeShishen(dayGan: TianGan, targetGan: TianGan): string {
  const d = TIAN_GAN[dayGan];
  const t = TIAN_GAN[targetGan];
  if (!d || !t) return '';
  const same = d.yinyang === t.yinyang;
  if (d.wuxing === t.wuxing) return same ? '比肩' : '劫財';
  if (GENERATES[d.wuxing] === t.wuxing) return same ? '食神' : '傷官';
  if (CONTROLS[d.wuxing] === t.wuxing) return same ? '偏財' : '正財';
  if (CONTROLS[t.wuxing] === d.wuxing) return same ? '七殺' : '正官';
  if (GENERATES[t.wuxing] === d.wuxing) return same ? '偏印' : '正印';
  return '';
}

// ---- 神煞 computation (a simplified but traditional subset) ----

// 桃花: by day/year branch triad
const PEACH_BLOSSOM: Record<DiZhi, DiZhi> = {
  申: '酉', 子: '酉', 辰: '酉',
  寅: '卯', 午: '卯', 戌: '卯',
  巳: '午', 酉: '午', 丑: '午',
  亥: '子', 卯: '子', 未: '子',
};

// 驛馬: by day/year branch triad
const SKY_HORSE: Record<DiZhi, DiZhi> = {
  申: '寅', 子: '寅', 辰: '寅',
  寅: '申', 午: '申', 戌: '申',
  巳: '亥', 酉: '亥', 丑: '亥',
  亥: '巳', 卯: '巳', 未: '巳',
};

// 華蓋: by day/year branch triad
const FLOWER_CANOPY: Record<DiZhi, DiZhi> = {
  申: '辰', 子: '辰', 辰: '辰',
  寅: '戌', 午: '戌', 戌: '戌',
  巳: '丑', 酉: '丑', 丑: '丑',
  亥: '未', 卯: '未', 未: '未',
};

// 將星
const COMMANDER_STAR: Record<DiZhi, DiZhi> = {
  申: '子', 子: '子', 辰: '子',
  寅: '午', 午: '午', 戌: '午',
  巳: '酉', 酉: '酉', 丑: '酉',
  亥: '卯', 卯: '卯', 未: '卯',
};

// 天乙貴人 (two branches per day-stem)
const NOBLEMAN: Record<TianGan, DiZhi[]> = {
  甲: ['丑', '未'], 戊: ['丑', '未'], 庚: ['丑', '未'],
  乙: ['子', '申'], 己: ['子', '申'],
  丙: ['酉', '亥'], 丁: ['酉', '亥'],
  壬: ['卯', '巳'], 癸: ['卯', '巳'],
  辛: ['寅', '午'],
};

// 文昌
const WEN_CHANG: Record<TianGan, DiZhi> = {
  甲: '巳', 乙: '午', 丙: '申', 丁: '酉', 戊: '申',
  己: '酉', 庚: '亥', 辛: '子', 壬: '寅', 癸: '卯',
};

// 羊刃 (by day stem)
const YANG_REN: Record<TianGan, DiZhi | null> = {
  甲: '卯', 乙: '辰', 丙: '午', 丁: '未', 戊: '午',
  己: '未', 庚: '酉', 辛: '戌', 壬: '子', 癸: '丑',
};

// 金輿 (by day stem)
const JIN_YU: Record<TianGan, DiZhi> = {
  甲: '辰', 乙: '巳', 丙: '未', 丁: '申', 戊: '未',
  己: '申', 庚: '戌', 辛: '亥', 壬: '丑', 癸: '寅',
};

// 魁罡 (check day pillar itself)
const KUI_GANG = new Set(['庚辰', '庚戌', '壬辰', '戊戌']);

// 紅鸞 (by year branch)
const HONG_LUAN: Record<DiZhi, DiZhi> = {
  子: '卯', 丑: '寅', 寅: '丑', 卯: '子', 辰: '亥', 巳: '戌',
  午: '酉', 未: '申', 申: '未', 酉: '午', 戌: '巳', 亥: '辰',
};

// 天喜 (by year branch)
const TIAN_XI: Record<DiZhi, DiZhi> = {
  子: '酉', 丑: '申', 寅: '未', 卯: '午', 辰: '巳', 巳: '辰',
  午: '卯', 未: '寅', 申: '丑', 酉: '子', 戌: '亥', 亥: '戌',
};

// 天德 (by month branch)
const TIAN_DE: Record<DiZhi, string> = {
  寅: '丁', 卯: '申', 辰: '壬', 巳: '辛', 午: '亥', 未: '甲',
  申: '癸', 酉: '寅', 戌: '丙', 亥: '乙', 子: '巳', 丑: '庚',
};

// 月德 (by month branch)
const YUE_DE: Record<DiZhi, TianGan> = {
  寅: '丙', 午: '丙', 戌: '丙',
  申: '壬', 子: '壬', 辰: '壬',
  巳: '庚', 酉: '庚', 丑: '庚',
  亥: '甲', 卯: '甲', 未: '甲',
};

interface ShenshaContext {
  dayGan: TianGan;
  dayZhi: DiZhi;
  yearZhi: DiZhi;
  monthZhi: DiZhi;
  pillarGan: TianGan;
  pillarZhi: DiZhi;
  isDay: boolean;
}

export function computeShensha(ctx: ShenshaContext): string[] {
  const result: string[] = [];
  const { dayGan, dayZhi, yearZhi, monthZhi, pillarGan, pillarZhi, isDay } = ctx;

  // 桃花 / 驛馬 / 華蓋 / 將星: anchor from day-branch (preferred) or year-branch
  for (const anchor of [dayZhi, yearZhi]) {
    if (PEACH_BLOSSOM[anchor] === pillarZhi && !result.includes('桃花')) result.push('桃花');
    if (SKY_HORSE[anchor] === pillarZhi && !result.includes('驛馬')) result.push('驛馬');
    if (FLOWER_CANOPY[anchor] === pillarZhi && !result.includes('華蓋')) result.push('華蓋');
    if (COMMANDER_STAR[anchor] === pillarZhi && !result.includes('將星')) result.push('將星');
  }

  if (NOBLEMAN[dayGan]?.includes(pillarZhi)) result.push('天乙貴人');
  if (WEN_CHANG[dayGan] === pillarZhi) result.push('文昌');
  if (YANG_REN[dayGan] === pillarZhi) result.push('羊刃');
  if (JIN_YU[dayGan] === pillarZhi) result.push('金輿');

  if (HONG_LUAN[yearZhi] === pillarZhi) result.push('紅鸞');
  if (TIAN_XI[yearZhi] === pillarZhi) result.push('天喜');

  if (TIAN_DE[monthZhi] === pillarGan) result.push('天德');
  if (YUE_DE[monthZhi] === pillarGan) result.push('月德');

  // 魁罡 only on day pillar
  if (isDay && KUI_GANG.has(`${pillarGan}${pillarZhi}`)) result.push('魁罡');

  return result;
}
