import { useState } from 'react';
import {
  TIAN_GAN,
  DI_ZHI,
  WUXING_CLASS,
  SHISHEN_DESC,
  CHANGSHENG_DESC,
  SHENSHA_DESC,
  zhiColorClass,
  type TianGan,
  type DiZhi,
} from '../data/baziConstants';
import type { BaziResult, LuckColumn, Pillar } from '../lib/computeBazi';

type PillarKey = 'hour' | 'day' | 'month' | 'year';
type ColumnKey = PillarKey | 'dayun' | 'liunian';
const PILLAR_ORDER: PillarKey[] = ['hour', 'day', 'month', 'year'];

interface Selection {
  type: 'gan' | 'zhi';
  pillar: ColumnKey;
}

function GanCell({
  gan,
  active,
  onClick,
}: {
  gan: TianGan;
  active: boolean;
  onClick: () => void;
}) {
  const info = TIAN_GAN[gan];
  const cls = info ? WUXING_CLASS[info.wuxing] : '';
  return (
    <td
      className={`gan-cell ${cls} ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {gan}
    </td>
  );
}

function ZhiCell({
  zhi,
  active,
  onClick,
}: {
  zhi: DiZhi;
  active: boolean;
  onClick: () => void;
}) {
  const cls = zhiColorClass(zhi);
  return (
    <td
      className={`zhi-cell ${cls} ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      {zhi}
    </td>
  );
}

function CangGanCell({ pillar }: { pillar: Pillar }) {
  return (
    <td className="canggan-cell">
      {pillar.canggan.map(([g, w], i) => (
        <div className="cg-line" key={i}>
          <span className={`gan-char ${WUXING_CLASS[TIAN_GAN[g]?.wuxing ?? '木']}`}>{g}</span>
          <span className={WUXING_CLASS[w]} style={{ opacity: 0.9 }}>
            {w}
          </span>
        </div>
      ))}
    </td>
  );
}

function GanExplanation({
  gan,
  pillarName,
  shishen,
}: {
  gan: TianGan;
  pillarName: string;
  shishen: string;
}) {
  const info = TIAN_GAN[gan];
  const cls = WUXING_CLASS[info.wuxing];
  return (
    <div className="explanation">
      <h4>
        <span className="tag">{pillarName}天干</span>
        <span className={cls} style={{ fontSize: 24 }}>
          {gan}
        </span>
      </h4>
      <div className="attrs">
        <div className="kv">
          <span className="k">五行</span>
          <span className={cls}>
            <b>{info.wuxing}</b>
          </span>
        </div>
        <div className="kv">
          <span className="k">陰陽</span>
          <b>{info.yinyang}</b>
        </div>
        {shishen && (
          <div className="kv">
            <span className="k">十神</span>
            <b>{shishen}</b>
          </div>
        )}
      </div>
      <div className="desc">
        {gan}為{info.yinyang}
        {info.wuxing}之干。
        {shishen === '日主'
          ? '此為日主本元，代表命主自身的核心特質與能量源頭。'
          : SHISHEN_DESC[shishen] ?? ''}
      </div>
    </div>
  );
}

function ZhiExplanation({
  zhi,
  pillarName,
  xingyun,
  shensha,
}: {
  zhi: DiZhi;
  pillarName: string;
  xingyun: string;
  shensha: string[];
}) {
  const info = DI_ZHI[zhi];
  const cls = zhiColorClass(zhi);
  return (
    <div className="explanation">
      <h4>
        <span className="tag">{pillarName}地支</span>
        <span className={cls} style={{ fontSize: 24 }}>
          {zhi}
        </span>
      </h4>
      <div className="attrs">
        <div className="kv">
          <span className="k">五行</span>
          <span className={cls}>
            <b>{info.wuxing}</b>
          </span>
        </div>
        <div className="kv">
          <span className="k">生肖</span>
          <b>{info.zodiac}</b>
        </div>
        <div className="kv">
          <span className="k">藏干</span>
          <b>{info.canggan.map((c) => c[0]).join('、')}</b>
        </div>
        {xingyun && (
          <div className="kv">
            <span className="k">星運</span>
            <b>{xingyun}</b>
          </div>
        )}
      </div>
      <div className="desc">
        {zhi}為{info.wuxing}支，生肖屬{info.zodiac}。藏干三元：
        {info.canggan.map(([g, w]) => `${g}(${w})`).join('、')}。
      </div>
      {xingyun && CHANGSHENG_DESC[xingyun] && (
        <div className="desc">
          <b>十二長生「{xingyun}」：</b>
          {CHANGSHENG_DESC[xingyun]}
        </div>
      )}
      {shensha.length > 0 && (
        <div className="desc">
          <b>本柱神煞：</b>
          {shensha.map((s, i) => (
            <span key={i} style={{ display: 'inline-block', marginRight: 10 }}>
              <b>{s}</b>
              {SHENSHA_DESC[s] ? ` — ${SHENSHA_DESC[s]}` : ''}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function BaziTable({ data }: { data: BaziResult }) {
  const [selected, setSelected] = useState<Selection | null>(null);

  const pillars = PILLAR_ORDER.map((key) => ({
    key,
    ...data.pillars[key],
  }));

  const luck = data.currentLuck;
  const luckCols: Array<{ key: 'dayun' | 'liunian' } & LuckColumn> = luck
    ? [
        { key: 'dayun', ...luck.dayun },
        { key: 'liunian', ...luck.liunian },
      ]
    : [];

  const toggle = (type: 'gan' | 'zhi', pillar: ColumnKey) => {
    setSelected((prev) =>
      prev && prev.type === type && prev.pillar === pillar
        ? null
        : { type, pillar },
    );
  };

  const isActive = (type: 'gan' | 'zhi', pillar: ColumnKey) =>
    selected?.type === type && selected.pillar === pillar;

  const selectedColumn: { name: string; gan: TianGan; zhi: DiZhi; zhuxing: string; xingyun: string; shensha: string[] } | null =
    selected === null
      ? null
      : selected.pillar === 'dayun' || selected.pillar === 'liunian'
        ? luck
          ? luck[selected.pillar]
          : null
        : data.pillars[selected.pillar];

  return (
    <>
      <div className="bazi-hint">點擊天干或地支查看詳細解釋</div>
      <div className="bazi-table-wrap">
        <table className="bazi-table">
          <thead>
            <tr>
              <th>日期</th>
              {pillars.map((p) => (
                <th key={p.key}>{p.name}</th>
              ))}
              {luckCols.map((c) => (
                <th key={c.key} className="luck-head">
                  <div>{c.name}</div>
                  <div className="luck-sub">{c.label}</div>
                  <div className="luck-sub">{c.subLabel}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="row-label">主星</td>
              {pillars.map((p) => (
                <td key={p.key}>{p.zhuxing || <span className="muted-cell">—</span>}</td>
              ))}
              {luckCols.map((c) => (
                <td key={c.key} className="luck-col">{c.zhuxing || <span className="muted-cell">—</span>}</td>
              ))}
            </tr>
            <tr className="shade">
              <td className="row-label">天干</td>
              {pillars.map((p) => (
                <GanCell
                  key={p.key}
                  gan={p.gan}
                  active={isActive('gan', p.key)}
                  onClick={() => toggle('gan', p.key)}
                />
              ))}
              {luckCols.map((c) => (
                <GanCell
                  key={c.key}
                  gan={c.gan}
                  active={isActive('gan', c.key)}
                  onClick={() => toggle('gan', c.key)}
                />
              ))}
            </tr>
            <tr>
              <td className="row-label">地支</td>
              {pillars.map((p) => (
                <ZhiCell
                  key={p.key}
                  zhi={p.zhi}
                  active={isActive('zhi', p.key)}
                  onClick={() => toggle('zhi', p.key)}
                />
              ))}
              {luckCols.map((c) => (
                <ZhiCell
                  key={c.key}
                  zhi={c.zhi}
                  active={isActive('zhi', c.key)}
                  onClick={() => toggle('zhi', c.key)}
                />
              ))}
            </tr>
            <tr className="shade">
              <td className="row-label">藏干</td>
              {pillars.map((p) => (
                <CangGanCell key={p.key} pillar={p} />
              ))}
              {luckCols.map((c) => (
                <CangGanCell
                  key={c.key}
                  pillar={{
                    name: c.name,
                    gan: c.gan,
                    zhi: c.zhi,
                    zhuxing: c.zhuxing,
                    fuxing: c.fuxing,
                    canggan: DI_ZHI[c.zhi]?.canggan ?? [],
                    nayin: '',
                    xingyun: c.xingyun,
                    kongwang: c.kongwang,
                    shensha: c.shensha,
                  }}
                />
              ))}
            </tr>
            <tr>
              <td className="row-label">副星</td>
              {pillars.map((p) => (
                <td key={p.key} className="fuxing-cell">
                  {p.fuxing.length
                    ? p.fuxing.map((s, i) => <div key={i}>{s}</div>)
                    : <span className="muted-cell">—</span>}
                </td>
              ))}
              {luckCols.map((c) => (
                <td key={c.key} className="fuxing-cell luck-col">
                  {c.fuxing.length
                    ? c.fuxing.map((s, i) => <div key={i}>{s}</div>)
                    : <span className="muted-cell">—</span>}
                </td>
              ))}
            </tr>
            <tr className="shade">
              <td className="row-label">納音</td>
              {pillars.map((p) => (
                <td key={p.key}>{p.nayin || <span className="muted-cell">—</span>}</td>
              ))}
              {luckCols.map((c) => (
                <td key={c.key} className="luck-col">—</td>
              ))}
            </tr>
            <tr>
              <td className="row-label">星運</td>
              {pillars.map((p) => (
                <td key={p.key}>{p.xingyun || <span className="muted-cell">—</span>}</td>
              ))}
              {luckCols.map((c) => (
                <td key={c.key} className="luck-col">{c.xingyun || <span className="muted-cell">—</span>}</td>
              ))}
            </tr>
            <tr className="shade">
              <td className="row-label">空亡</td>
              {pillars.map((p) => (
                <td key={p.key}>{p.kongwang || <span className="muted-cell">—</span>}</td>
              ))}
              {luckCols.map((c) => (
                <td key={c.key} className="luck-col">{c.kongwang || <span className="muted-cell">—</span>}</td>
              ))}
            </tr>
            <tr>
              <td className="row-label">神煞</td>
              {pillars.map((p) => (
                <td key={p.key} className="shensha-cell">
                  {p.shensha.length
                    ? p.shensha.map((s, i) => <div key={i}>{s}</div>)
                    : <span className="muted-cell">—</span>}
                </td>
              ))}
              {luckCols.map((c) => (
                <td key={c.key} className="shensha-cell luck-col">
                  {c.shensha.length
                    ? c.shensha.map((s, i) => <div key={i}>{s}</div>)
                    : <span className="muted-cell">—</span>}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {selected && selectedColumn && selected.type === 'gan' && (
        <GanExplanation
          gan={selectedColumn.gan}
          pillarName={selectedColumn.name}
          shishen={selectedColumn.zhuxing}
        />
      )}
      {selected && selectedColumn && selected.type === 'zhi' && (
        <ZhiExplanation
          zhi={selectedColumn.zhi}
          pillarName={selectedColumn.name}
          xingyun={selectedColumn.xingyun}
          shensha={selectedColumn.shensha}
        />
      )}
    </>
  );
}

export default BaziTable;
