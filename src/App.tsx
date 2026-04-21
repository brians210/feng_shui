import { useState } from 'react';
import BirthForm from './components/BirthForm';
import BaziTable from './components/BaziTable';
import WuxingChart from './components/WuxingChart';
import StrengthPanel from './components/StrengthPanel';
import OverviewCard from './components/OverviewCard';
import DayunTable from './components/DayunTable';
import { WUXING_CLASS } from './data/baziConstants';
import { computeBazi, type BaziResult, type FormInput } from './lib/computeBazi';

const pad = (n: number) => String(n).padStart(2, '0');

function formatInputSummary(d: FormInput): string {
  const cal = d.calendar === 'solar' ? '陽曆' : '農曆';
  const gen = d.gender === 'male' ? '乾造' : '坤造';
  return `${cal} ${d.year}年${pad(d.month)}月${pad(d.day)}日 ${pad(d.hour)}:${pad(d.minute)} · ${gen}`;
}

interface SectionHeaderProps {
  num: string;
  title: string;
}

function SectionHeader({ num, title }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <span className="num">{num}</span>
      <span className="title">{title}</span>
      <span className="rule" />
    </div>
  );
}

function App() {
  const [input, setInput] = useState<FormInput | null>(null);
  const [result, setResult] = useState<BaziResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (data: FormInput) => {
    setLoading(true);
    setError(null);
    setInput(data);

    // 微小延遲讓「排盤中…」有感覺
    setTimeout(() => {
      try {
        const r = computeBazi(data);
        setResult(r);
      } catch (err) {
        console.error('[computeBazi] failed', err);
        setError('排盤失敗，請確認輸入的日期時間是否正確。');
        setResult(null);
      } finally {
        setLoading(false);
        setTimeout(() => {
          const el = document.getElementById('result-anchor');
          if (el) window.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
        }, 50);
      }
    }, 400);
  };

  return (
    <div className="app">
      <header className="masthead">
        <h1 className="title-zh">
          八 字 命 盤
          <span className="seal">排盤</span>
        </h1>
        <div className="subtitle">四柱八字 · 十神神煞 · 五行喜忌 · 大運流年</div>
      </header>

      <BirthForm onSubmit={handleSubmit} loading={loading} />

      {error && (
        <div
          style={{
            background: '#fbf0ec',
            border: '1px solid var(--accent-red)',
            color: 'var(--accent-red)',
            padding: '12px 16px',
            borderRadius: 2,
            fontFamily: 'var(--serif)',
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      {!result && !loading && !error && (
        <div className="empty-state">
          <div className="big">盤</div>
          <div>請輸入出生資訊，點擊「起盤」以生成命盤</div>
        </div>
      )}

      {result && input && (
        <>
          <div id="result-anchor" />

          <SectionHeader num="ONE" title="命主資訊" />
          <div className="person-card">
            {input.name && (
              <div className="field-item">
                <div className="lbl">姓名</div>
                <div className="val">{input.name}</div>
              </div>
            )}
            <div className="field-item">
              <div className="lbl">性別</div>
              <div className="val">{input.gender === 'male' ? '乾造（男）' : '坤造（女）'}</div>
            </div>
            <div className="field-item">
              <div className="lbl">出生</div>
              <div className="val">{formatInputSummary(input)}</div>
            </div>
            <div className="field-item">
              <div className="lbl">日主</div>
              <div className="val">
                <span
                  className={WUXING_CLASS[result.rizhu.wuxing]}
                  style={{ fontSize: 20, fontWeight: 900, marginRight: 8 }}
                >
                  {result.rizhu.gan}
                </span>
                {result.rizhu.yinyang}
                {result.rizhu.wuxing}
              </div>
            </div>
          </div>

          <SectionHeader num="TWO" title="四柱八字" />
          <BaziTable data={result} />

          <SectionHeader num="THREE" title="五行分佈" />
          <WuxingChart counts={result.wuxingCount} rizhuWuxing={result.rizhu.wuxing} />

          <SectionHeader num="FOUR" title="日主強弱" />
          <StrengthPanel strength={result.strength} rizhu={result.rizhu} />

          <SectionHeader num="FIVE" title="命格概述" />
          <OverviewCard text={result.overview} />

          <SectionHeader num="SIX" title="大運流程" />
          <DayunTable dayun={result.dayun} />
        </>
      )}

      <div className="site-foot">© 八字排盤 · 僅供命理研究參考</div>
    </div>
  );
}

export default App;
