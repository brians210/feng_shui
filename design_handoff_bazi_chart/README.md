# Handoff: 八字排盤網頁 (Bazi Chart / Four Pillars)

## Overview
一個讓用戶輸入出生年月日時後，生成傳統中式八字命盤的網頁。包含四柱主表、五行分佈、日主強弱分析、命格概述、大運表等模組。整體視覺貼近傳統灰底命盤表格的風格。

## About the Design Files
This bundle contains **HTML design references** — a working prototype showing the intended look, layout, and interactions. It is **not production code to copy directly**. The task is to **recreate these designs in the target codebase's existing environment** (React, Vue, Next.js, etc.) using that codebase's established patterns, components, and styling system. If no environment exists yet, pick the best-fit framework for the project.

The prototype uses inline Babel-transpiled JSX and a `window.computeBazi()` mock function. In production these should become proper React components (or equivalent) with real API integration.

## Fidelity
**High-fidelity (hifi)** — colors, typography, spacing, and interactions are finalized. Recreate pixel-perfectly using your codebase's existing libraries/patterns. Layout, color palette, and typography choices should be carried over exactly.

## Screens / Views

### Single-page layout (no routing)
All sections stack vertically on one page, max-width 980px, centered.

---

### 1. Masthead / Header
- **Purpose**: Brand/title area.
- **Layout**: Centered text, bottom border divider.
- **Content**:
  - Title: `八 字 命 盤` (Noto Serif TC, weight 900, 44px, letter-spacing 0.35em)
  - Inline red seal badge `排盤` (accent-red background `#b33a2c`, cream text, small)
  - Subtitle: `四柱八字 · 十神神煞 · 五行喜忌 · 大運流年` (14px, muted, letter-spacing 0.3em)

### 2. BirthForm (input card)
- **Purpose**: Collect DOB + gender + calendar type.
- **Layout**: Cream card (`#fbf8f0`), 1px border `#c4b8a0`, soft shadow. Padding 24–28px.
- **Fields** (in order):
  1. 姓名 (optional text input, full width)
  2. 性別 toggle: 乾造（男）/ 坤造（女）
  3. 曆法 toggle: 陽曆 / 農曆
  4. Row of 5 selects: 年 / 月 / 日 / 時 / 分
- **Toggle groups**: segmented buttons, active state = dark (`#1a1614`) bg + cream text.
- **Submit button** `起 盤`: accent-red bg `#b33a2c`, cream text, weight 700, letter-spacing 0.3em, 2px darker bottom shadow `#8c2b1f`. Right-aligned above a dashed top border.
- **Validation**: `daysInMonth` recomputed when year/month change (handles leap years).

### 3. Empty state (before submit)
Large faded `盤` glyph (64px, 15% opacity) + hint text `請輸入出生資訊，點擊「起盤」以生成命盤`.

### 4. Section headers (repeated pattern)
Format: `ONE  命主資訊  ─────────────`
- Small red uppercase number (12px, accent-red, tracking 0.15em)
- Title (20px serif, weight 700, tracking 0.2em)
- Flex-grow hairline rule (1px `#d9cfb8`)

### 5. 命主資訊 (Person card)
Cream card with **left border 3px accent-red**. Horizontal flex row of key-value pairs: 姓名 / 性別 / 出生 / 日主. Day-master shows colored gan character.

### 6. 四柱八字 (Main Bazi table) — KEY COMPONENT
The centerpiece. Mimics the traditional dense gray table from the reference screenshot.

**Column order (left → right)**: 日期 | 時柱 | 日柱 | 月柱 | 年柱
(Note: 時柱 comes first, 年柱 last — matches the reference image, not chronological order.)

**Rows**:
| Row | Content |
|---|---|
| 主星 | 十神 (e.g. 劫財, 正官, 偏財), day pillar shows `日主` |
| 天干 | Large 38px serif char, color by wuxing, clickable |
| 地支 | Large 38px serif char, color by wuxing, clickable |
| 藏干 | Stacked list of `天干 五行` pairs per cell |
| 副星 | Stacked list of 十神 names |
| 納音 | e.g. 白臘金, 佛燈火 |
| 星運 | 十二長生 (長生/沐浴/冠帶/臨官/帝旺/衰/病/死/墓/絕/胎/養) |
| 空亡 | 2-char combo, e.g. 申酉 |
| 神煞 | Stacked list (multi-line) |

**Visual spec**:
- Table background `#948a7e` (warm gray)
- Header row `#3d3631` (dark ink) with light text
- Row labels (first column) `#ada397` slightly lighter than body
- Alternating shaded rows `#b8aea0` (stripe on even rows: 天干, 藏干, 納音, 空亡)
- Cell borders `#6a6055` 1px
- Gan/zhi cells: hover → light overlay; clicking → cream highlight + 2px accent-red outline (offset -4px)

**Wuxing colors** (applied to 天干/地支/藏干characters):
- 木 `#2f8f3e` (green)
- 火 `#d94a3d` (red-orange)
- 土 `#c98a2b` (ochre)
- 金 `#d97806` (orange)
- 水 `#1f5f8f` (blue)

**Interaction**: clicking a 天干 or 地支 expands an explanation card below the table showing:
- 五行, 陰陽 (天干) or 五行, 生肖, 藏干 (地支)
- 十神 definition (from `SHISHEN_DESC` dict)
- 十二長生 definition (from `CHANGSHENG_DESC` dict)
- 神煞 list with tooltips (from `SHENSHA_DESC` dict)

Clicking the same cell again collapses the explanation.

### 7. 五行分佈 (Wuxing chart)
Two-column panel:
- **Left**: SVG pentagon radar chart. 5 axes pointing to 木/火/土/金/水. Grid at 25/50/75/100%. Filled polygon `rgba(179,58,44,0.18)` with accent-red stroke. Labels at each vertex colored by wuxing. Day-master's wuxing gets a dashed ring around its label.
- **Right**: 5 horizontal bars, one per element. Format: `[name column 48px] [track 10px tall] [count · %]`. Fill color matches wuxing.

### 8. 日主強弱 (Strength panel)
- Top row:
  - Circular day-master mark (64px, 2px accent-seal border `#c1392b`, cream bg `#fff1e0`), day-master gan in 40px bold wuxing-colored serif.
  - Level label (e.g. `身弱`, 20px, tracking 0.2em) + `分數 38 / 100` (muted).
- **Strength meter**: 8px gradient bar (blue→green→ochre→red), absolute-positioned black needle (3×16px), with 5 tick labels `極弱 / 偏弱 / 中和 / 偏強 / 極旺`.
- Summary paragraph (serif, 14.5px, line-height 1.9).
- Dashed divider, then two rows: `喜用` + colored circular chips, `忌神` + same chips at 55% opacity.

### 9. 命格概述 (Overview card)
Cream card with Chinese opening/closing quotation marks as decorative ornaments (32px accent-red, 35% opacity, top-left and bottom-right). Paragraph uses `text-indent: 2em`, line-height 2.0.

### 10. 大運流程 (Dayun table)
Horizontal scroll on mobile. Same gray-table aesthetic as the main bazi table. Rows: 起運年齡 / 西元年 / 十神 / 天干 / 地支. Large colored serif gan/zhi chars (24px).

### 11. Footer
Single line, centered, muted: `© 八字排盤 · 僅供命理研究參考`

## Interactions & Behavior

- **Submit flow**: 400ms artificial delay → `computeBazi(input)` → smooth scroll to result anchor.
- **Cell click**: toggles explanation panel. Only one cell's explanation shown at a time. Animated slide-down on open.
- **Form validation**: daysInMonth recomputed reactively.
- **Loading state**: submit button text switches `起 盤` → `排盤中…`, disabled.
- **No routing**: single-page, all sections stack.

## State Management

```ts
// App-level
result: BaziResult | null
loading: boolean
input: FormInput | null

// BirthForm
gender: 'male' | 'female'
calendar: 'solar' | 'lunar'
name, year, month, day, hour, minute

// BaziTable
selected: { type: 'gan' | 'zhi', pillar: 'year' | 'month' | 'day' | 'hour' } | null
```

## Data Contract — `computeBazi(input)` API

Your real API must return this shape (see `bazi-data.js` → `mockBazi()`):

```ts
type Pillar = {
  name: string;            // e.g. "年柱"
  gan: TianGan;            // 甲乙丙丁戊己庚辛壬癸
  zhi: DiZhi;              // 子丑寅卯辰巳午未申酉戌亥
  zhuxing: string;         // 十神 e.g. "偏財" or "日主"
  fuxing: string[];        // 副星 list
  nayin: string;           // 納音 e.g. "白臘金"
  xingyun: string;         // 十二長生
  kongwang: string;        // 2-char 空亡
  shensha: string[];       // 神煞 list
};

type BaziResult = {
  pillars: { year: Pillar; month: Pillar; day: Pillar; hour: Pillar };
  rizhu: { gan: TianGan; wuxing: Wuxing; yinyang: '陽' | '陰' };
  wuxingCount: { 木: number; 火: number; 土: number; 金: number; 水: number };
  strength: {
    level: string;               // e.g. "身弱"
    score: number;               // 0-100
    summary: string;
    favorable: Wuxing[];         // 喜用
    unfavorable: Wuxing[];       // 忌神
  };
  overview: string;
  dayun: Array<{
    age: number;
    ganZhi: string;
    gan: TianGan;
    zhi: DiZhi;
    shishen: string;
    year: number;
  }>;
};
```

**Lookup tables** (keep them on the frontend — see `bazi-data.js`):
- `TIAN_GAN[char]` → `{wuxing, yinyang, color}`
- `DI_ZHI[char]` → `{wuxing, zodiac, canggan: [[gan, wuxing], ...]}`
- `SHISHEN_DESC[name]` → description
- `CHANGSHENG_DESC[name]` → description
- `SHENSHA_DESC[name]` → description

## Design Tokens

```css
/* Paper / ink */
--paper:        #f5f1e8;
--paper-dark:   #e8e0cd;
--ink:          #1a1614;
--ink-soft:     #3d3631;
--ink-muted:    #7a6f64;
--border:       #c4b8a0;
--border-soft:  #d9cfb8;

/* Accent */
--accent-red:   #b33a2c;
--accent-seal:  #c1392b;

/* Table */
--table-bg:     #948a7e;
--table-header: #3d3631;
--table-row-alt:#ada397;
--table-stripe: #b8aea0;

/* Five elements */
--w-mu:   #2f8f3e;
--w-huo:  #d94a3d;
--w-tu:   #c98a2b;
--w-jin:  #d97806;
--w-shui: #1f5f8f;

/* Type */
--serif: 'Noto Serif TC', 'PingFang TC', 'Songti TC', serif;
--sans:  'Noto Sans TC', 'PingFang TC', sans-serif;
```

**Spacing**: 4 / 8 / 10 / 14 / 20 / 24 / 28 / 36 / 40 / 60 / 80 px
**Border radius**: mostly 2px (traditional, squared)
**Max content width**: 980px
**Shadow (cards)**: `0 1px 0 rgba(0,0,0,0.02), 0 8px 24px -12px rgba(80,60,20,0.12)`
**Shadow (tables)**: `0 2px 0 rgba(0,0,0,0.04), 0 12px 32px -16px rgba(60,40,10,0.2)`

## Assets
- Google Fonts: Noto Serif TC (400/500/600/700/900), Noto Sans TC (400/500/700)
- No images / icons. All typography-driven.
- Background: subtle paper-grain via layered `radial-gradient` + `repeating-linear-gradient` (see `styles.css` body rule).

## Responsive
- Breakpoint at 720px: main table cells shrink (38px → 30px for gan/zhi chars), padding tightens, form fields wrap to 2-per-row (46% flex basis).
- Breakpoint at 640px: wuxing panel collapses from 2-col to 1-col stack.
- Dayun table gets horizontal scroll (min-width 640px).

## Files Included
- `index.html` — app shell + App component + routing of sections
- `styles.css` — all styles + design tokens
- `bazi-data.js` — constants (TIAN_GAN, DI_ZHI, SHISHEN_DESC etc.) + `computeBazi(input)` mock
- `BirthForm.jsx` — input form
- `BaziTable.jsx` — main 4-pillar table + click-to-explain
- `ResultPanels.jsx` — WuxingChart / StrengthPanel / OverviewCard / DayunTable

## Implementation Notes for Claude Code
1. Convert each `.jsx` file into a proper React component module (ES imports, no `window.*` globals).
2. Move `bazi-data.js` constants into a typed module (TypeScript enums/types for 天干/地支/五行 recommended).
3. Replace `mockBazi()` with a real calculation — either server-side (recommended, for correctness across solar terms / true solar time) or a client-side library like `lunar-javascript`.
4. Keep the exact return shape documented above so the UI components work unchanged.
5. Preserve the color palette and typography exactly — they're the soul of the traditional look.
6. The reversed pillar order (時→日→月→年) is intentional and matches traditional layout. Don't "fix" it.
