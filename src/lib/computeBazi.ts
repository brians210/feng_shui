import { BaziCalculator } from '@aharris02/bazi-calculator-by-alvamind';
import { toDate } from 'date-fns-tz';
import {
  TIAN_GAN,
  DI_ZHI,
  ELEMENT_TO_WUXING,
  LIFE_CYCLE_TO_CHINESE,
  WUXING_ORDER,
  computeShensha,
  computeShishen,
  nayinFor,
  kongwangFor,
  type TianGan,
  type DiZhi,
  type Wuxing,
  type YinYang,
} from '../data/baziConstants';

export type Gender = 'male' | 'female';
export type Calendar = 'solar' | 'lunar';

export interface FormInput {
  name: string;
  gender: Gender;
  calendar: Calendar;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  timezone: string;
}

export interface Pillar {
  name: string;
  gan: TianGan;
  zhi: DiZhi;
  zhuxing: string;
  fuxing: string[];
  canggan: Array<[TianGan, Wuxing]>;
  nayin: string;
  xingyun: string;
  kongwang: string;
  shensha: string[];
}

export interface Rizhu {
  gan: TianGan;
  wuxing: Wuxing;
  yinyang: YinYang;
}

export interface StrengthInfo {
  level: string;
  score: number;
  summary: string;
  favorable: Wuxing[];
  unfavorable: Wuxing[];
}

export interface DayunEntry {
  age: number;
  ganZhi: string;
  gan: TianGan;
  zhi: DiZhi;
  shishen: string;
  year: number;
}

export interface BaziResult {
  input: FormInput;
  pillars: {
    year: Pillar;
    month: Pillar;
    day: Pillar;
    hour: Pillar;
  };
  rizhu: Rizhu;
  wuxingCount: Record<Wuxing, number>;
  strength: StrengthInfo;
  overview: string;
  dayun: DayunEntry[];
}

const STRENGTH_LEVEL: Record<string, string> = {
  Strong: '身強',
  Weak: '身弱',
  Balanced: '中和',
};

function pickFirstChar<T extends string>(s: string | undefined, fallback: T): T {
  if (!s) return fallback;
  return s.charAt(0) as T;
}

function toWuxing(elementType: string | undefined): Wuxing | undefined {
  if (!elementType) return undefined;
  const key = elementType.toUpperCase() as keyof typeof ELEMENT_TO_WUXING;
  return ELEMENT_TO_WUXING[key];
}

function buildStrengthSummary(p: {
  dayGan: TianGan;
  rizhuWuxing: Wuxing;
  monthZhi: DiZhi;
  level: string;
  favorable: Wuxing[];
  unfavorable: Wuxing[];
  wuxingCount: Record<Wuxing, number>;
}): string {
  const { dayGan, rizhuWuxing, monthZhi, level, favorable, unfavorable, wuxingCount } = p;
  const monthWuxing = DI_ZHI[monthZhi]?.wuxing ?? '';
  const entries = Object.entries(wuxingCount) as Array<[Wuxing, number]>;
  const max = entries.reduce((a, e) => (e[1] > a[1] ? e : a), ['木', 0] as [Wuxing, number]);
  const min = entries.reduce((a, e) => (e[1] < a[1] ? e : a), ['木', Infinity] as [Wuxing, number]);
  const favStr = favorable.length ? favorable.join('、') : '五行調和';
  const unfStr = unfavorable.length ? unfavorable.join('、') : '無明顯忌神';
  const monthDesc = monthWuxing
    ? `月令${monthZhi}為${monthWuxing}`
    : `月令${monthZhi}`;
  const leveling =
    level === '身弱'
      ? '月令洩身，命局整體偏弱。'
      : level === '身強'
        ? '月令扶身，命局氣勢旺盛。'
        : '月令調停，五行平衡中和。';
  const extremes = max[1] > 0
    ? `其中${max[0]}氣最旺（${max[1]}），${min[0]}氣最弱（${min[1]}）。`
    : '';
  return `日主${dayGan}${rizhuWuxing}，${monthDesc}。${leveling}${extremes}整體喜${favStr}，忌${unfStr}。`;
}

function composeOverview(
  rizhuGan: TianGan,
  rizhuWuxing: Wuxing,
  monthZhi: DiZhi,
  level: string,
  favorable: Wuxing[],
  unfavorable: Wuxing[],
): string {
  const favStr = favorable.length ? favorable.join('、') : '五行調和';
  const unfStr = unfavorable.length ? unfavorable.join('、') : '無明顯忌神';
  const monthWuxing = DI_ZHI[monthZhi]?.wuxing ?? '';
  const monthPart = monthWuxing ? `月令${monthZhi}（${monthWuxing}）` : `月令${monthZhi}`;
  const body =
    level === '身弱'
      ? `日主氣勢偏弱，喜${favStr}扶身助旺，忌${unfStr}再行耗洩。`
      : level === '身強'
        ? `日主氣勢旺盛，喜${favStr}疏洩調候，忌${unfStr}過盛助旺。`
        : `日主五行得位，喜${favStr}為用，忌${unfStr}過重。`;
  return `日主${rizhuGan}${rizhuWuxing}，生於${monthPart}當令之時。${body}整體格局以調候扶抑為要，參酌大運流年之氣勢，趨吉避凶，知命修身。`;
}

function buildPillar(params: {
  name: string;
  detailed: any;
  isDay: boolean;
  dayGan: TianGan;
  dayZhi: DiZhi;
  yearZhi: DiZhi;
  monthZhi: DiZhi;
}): Pillar {
  const { name, detailed, isDay, dayGan, dayZhi, yearZhi, monthZhi } = params;
  const ganChar = detailed?.heavenlyStem?.character as TianGan;
  const zhiChar = detailed?.earthlyBranch?.character as DiZhi;

  const hiddenStems = (detailed?.earthlyBranch?.hiddenStems ?? []) as Array<{
    character: string;
    elementType: string;
    tenGod?: { chinese?: string } | null;
  }>;
  const canggan: Array<[TianGan, Wuxing]> = hiddenStems
    .map((h) => {
      const g = h.character as TianGan;
      const w = toWuxing(h.elementType);
      return g && w ? ([g, w] as [TianGan, Wuxing]) : null;
    })
    .filter((x): x is [TianGan, Wuxing] => x !== null);

  const fuxing = hiddenStems
    .map((h) => {
      if (h.tenGod?.chinese) return h.tenGod.chinese;
      // library omits tenGod when the hidden stem matches day master — derive it
      return h.character ? computeShishen(dayGan, h.character as TianGan) : '';
    })
    .filter((v): v is string => Boolean(v));

  const zhuxing = isDay
    ? '日主'
    : detailed?.heavenlyStemTenGod?.chinese ?? computeShishen(dayGan, ganChar);

  const rawLifeCycle: string = detailed?.lifeCycle ?? '';
  const xingyun = LIFE_CYCLE_TO_CHINESE[rawLifeCycle] ?? rawLifeCycle;

  const shensha = computeShensha({
    dayGan,
    dayZhi,
    yearZhi,
    monthZhi,
    pillarGan: ganChar,
    pillarZhi: zhiChar,
    isDay,
  });

  return {
    name,
    gan: ganChar,
    zhi: zhiChar,
    zhuxing,
    fuxing,
    canggan: canggan.length ? canggan : (DI_ZHI[zhiChar]?.canggan ?? []),
    nayin: nayinFor(ganChar, zhiChar),
    xingyun,
    kongwang: kongwangFor(ganChar, zhiChar),
    shensha,
  };
}

export function computeBazi(input: FormInput): BaziResult {
  const pad = (n: number) => String(n).padStart(2, '0');
  const dateTimeString = `${input.year}-${pad(input.month)}-${pad(input.day)}T${pad(input.hour)}:${pad(input.minute)}:00`;
  const birthDate = toDate(dateTimeString, { timeZone: input.timezone });

  // NOTE: the underlying library operates on solar dates. Lunar support would
  // require a separate lunar→solar conversion; for now both toggles feed the
  // same date (documented behaviour).
  const calc = new BaziCalculator(birthDate, input.gender, input.timezone, true);
  const analysis = calc.getCompleteAnalysis() as any;

  const detailed = analysis.detailedPillars;
  const basic = analysis.basicAnalysis;

  const dayGan = pickFirstChar<TianGan>(detailed?.day?.chinese, '甲');
  const dayZhi = (detailed?.day?.chinese ?? '甲子').charAt(1) as DiZhi;
  const yearZhi = (detailed?.year?.chinese ?? '甲子').charAt(1) as DiZhi;
  const monthZhi = (detailed?.month?.chinese ?? '甲子').charAt(1) as DiZhi;

  const ganInfo = TIAN_GAN[dayGan];

  const yearPillar = buildPillar({
    name: '年柱', detailed: detailed?.year, isDay: false,
    dayGan, dayZhi, yearZhi, monthZhi,
  });
  const monthPillar = buildPillar({
    name: '月柱', detailed: detailed?.month, isDay: false,
    dayGan, dayZhi, yearZhi, monthZhi,
  });
  const dayPillar = buildPillar({
    name: '日柱', detailed: detailed?.day, isDay: true,
    dayGan, dayZhi, yearZhi, monthZhi,
  });
  const hourPillar = buildPillar({
    name: '時柱', detailed: detailed?.hour, isDay: false,
    dayGan, dayZhi, yearZhi, monthZhi,
  });

  // 五行分佈
  const five = (basic?.fiveFactors ?? {}) as Record<string, number>;
  const wuxingCount: Record<Wuxing, number> = {
    木: five.WOOD ?? 0,
    火: five.FIRE ?? 0,
    土: five.EARTH ?? 0,
    金: five.METAL ?? 0,
    水: five.WATER ?? 0,
  };

  // 日主強弱
  const rawStrength = basic?.dayMasterStrength?.strength as string | undefined;
  const level = STRENGTH_LEVEL[rawStrength ?? ''] ?? '中和';
  const rawScore = basic?.dayMasterStrength?.score;
  const score = typeof rawScore === 'number'
    ? Math.max(2, Math.min(98, Math.round(rawScore >= 0 && rawScore <= 100 ? rawScore : 50 + rawScore / 2)))
    : 50;

  const favorable: Wuxing[] = ((basic?.favorableElements?.primary ?? []) as string[])
    .map((e) => toWuxing(e))
    .filter((w): w is Wuxing => Boolean(w));
  const unfavorable: Wuxing[] = ((basic?.favorableElements?.unfavorable ?? []) as string[])
    .map((e) => toWuxing(e))
    .filter((w): w is Wuxing => Boolean(w));

  const summary = buildStrengthSummary({
    dayGan,
    rizhuWuxing: ganInfo?.wuxing ?? '木',
    monthZhi,
    level,
    favorable,
    unfavorable,
    wuxingCount,
  });

  // 大運
  const rawDayun = (analysis.luckPillars?.pillars ?? []) as any[];
  const dayun: DayunEntry[] = rawDayun
    .filter((p) => p?.heavenlyStem?.character && p?.earthlyBranch?.character)
    .filter((p) => (p.ageStart ?? 0) > 0)
    .map((p) => {
      const gan = p.heavenlyStem.character as TianGan;
      const zhi = p.earthlyBranch.character as DiZhi;
      return {
        age: p.ageStart ?? 0,
        ganZhi: `${gan}${zhi}`,
        gan,
        zhi,
        shishen: p.heavenlyStemTenGod?.chinese ?? computeShishen(dayGan, gan),
        year: p.yearStart ?? 0,
      };
    });

  return {
    input,
    pillars: {
      year: yearPillar,
      month: monthPillar,
      day: dayPillar,
      hour: hourPillar,
    },
    rizhu: {
      gan: dayGan,
      wuxing: ganInfo?.wuxing ?? '木',
      yinyang: ganInfo?.yinyang ?? '陽',
    },
    wuxingCount,
    strength: {
      level,
      score,
      summary,
      favorable,
      unfavorable,
    },
    overview: composeOverview(
      dayGan,
      ganInfo?.wuxing ?? '木',
      monthZhi,
      level,
      favorable,
      unfavorable,
    ),
    dayun,
  };
}

export { WUXING_ORDER };
