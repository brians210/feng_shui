// ============================================================
// 五行統計 / 日主強弱 / 命格概述 / 大運表
// ============================================================
(function() {
const { WUXING_COLORS: WC, TIAN_GAN: TG, DI_ZHI: DZ } = window.BaziConstants;
const WX_ORDER = ['木', '火', '土', '金', '水'];

function WuxingChart({ counts, rizhuWuxing }) {
  const total = WX_ORDER.reduce((a, k) => a + (counts[k] || 0), 0) || 1;
  const max = Math.max(...WX_ORDER.map(k => counts[k] || 0)) || 1;

  // Pentagon positions — 5 points starting at top
  const cx = 160, cy = 160, r = 110;
  const points = WX_ORDER.map((_, i) => {
    const angle = -Math.PI / 2 + i * (2 * Math.PI / 5);
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), angle };
  });
  // scale each axis by count ratio
  const valPoints = WX_ORDER.map((k, i) => {
    const ratio = (counts[k] || 0) / max;
    const angle = points[i].angle;
    const rr = r * Math.max(0.08, ratio);
    return { x: cx + rr * Math.cos(angle), y: cy + rr * Math.sin(angle) };
  });
  const valPath = valPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';
  const outerPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z';

  // label positions slightly outside
  const labelPoints = points.map((p) => {
    const dx = p.x - cx, dy = p.y - cy;
    const len = Math.hypot(dx, dy);
    return { x: cx + (dx / len) * (r + 22), y: cy + (dy / len) * (r + 22) };
  });

  return (
    <div className="wuxing-panel">
      <div className="wx-pentagon">
        <svg viewBox="0 0 320 320" style={{width: '100%', height: '100%'}}>
          {/* grid rings */}
          {[0.25, 0.5, 0.75, 1].map((s, i) => (
            <polygon key={i}
              points={points.map(p => `${cx + (p.x - cx) * s},${cy + (p.y - cy) * s}`).join(' ')}
              fill="none" stroke="#c4b8a0" strokeWidth="1" strokeDasharray={i === 3 ? '' : '2 3'}
              opacity="0.6"
            />
          ))}
          {/* axes */}
          {points.map((p, i) => (
            <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#c4b8a0" strokeWidth="1" opacity="0.5" />
          ))}
          {/* value polygon */}
          <path d={valPath} fill="rgba(179,58,44,0.18)" stroke="#b33a2c" strokeWidth="2" />
          {/* value dots */}
          {valPoints.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill={WC[WX_ORDER[i]]} stroke="#fff" strokeWidth="1.5" />
          ))}
          {/* labels */}
          {WX_ORDER.map((k, i) => (
            <text key={k} x={labelPoints[i].x} y={labelPoints[i].y}
              fill={WC[k]} fontFamily="'Noto Serif TC', serif" fontSize="22" fontWeight="900"
              textAnchor="middle" dominantBaseline="middle"
              style={{textShadow: rizhuWuxing === k ? '0 0 2px #fff' : 'none'}}
            >
              {k}
            </text>
          ))}
          {/* rizhu marker: small ring around the label */}
          {rizhuWuxing && (() => {
            const i = WX_ORDER.indexOf(rizhuWuxing);
            return <circle cx={labelPoints[i].x} cy={labelPoints[i].y} r="18" fill="none" stroke="#b33a2c" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.7" />;
          })()}
        </svg>
      </div>

      <div className="wx-bars">
        {WX_ORDER.map(k => {
          const v = counts[k] || 0;
          const pct = (v / total) * 100;
          return (
            <div key={k} className="wx-bar">
              <div className="wx-name" style={{color: WC[k]}}>{k}</div>
              <div className="wx-track">
                <div className="wx-fill" style={{width: `${pct}%`, background: WC[k]}} />
              </div>
              <div className="wx-count">{v} · {pct.toFixed(0)}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StrengthPanel({ strength, rizhu }) {
  const ganInfo = TG[rizhu.gan];
  const pos = Math.max(2, Math.min(98, strength.score));

  return (
    <div className="strength-panel">
      <div className="strength-top">
        <div className="rizhu-mark" style={{color: WC[rizhu.wuxing]}}>
          {rizhu.gan}
        </div>
        <div className="level-block">
          <div style={{fontFamily: 'var(--serif)', fontSize: 13, color: 'var(--ink-muted)', letterSpacing: '0.2em'}}>
            日主 · {rizhu.yinyang}{rizhu.wuxing}
          </div>
          <div className="level">
            {strength.level}<span className="pct">分數 {strength.score} / 100</span>
          </div>
        </div>
      </div>

      <div className="strength-meter">
        <div className="needle" style={{left: `calc(${pos}% - 1.5px)`}} />
        <div className="ticks">
          <span>極弱</span><span>偏弱</span><span>中和</span><span>偏強</span><span>極旺</span>
        </div>
      </div>

      <div className="strength-summary">{strength.summary}</div>

      <div className="favor-row">
        <div className="f-item">
          <span className="lbl">喜用</span>
          {strength.favorable.map(k => (
            <span key={k} className="chip" style={{background: WC[k]}}>{k}</span>
          ))}
        </div>
        <div className="f-item">
          <span className="lbl">忌神</span>
          {strength.unfavorable.map(k => (
            <span key={k} className="chip" style={{background: WC[k], opacity: 0.55}}>{k}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function OverviewCard({ text }) {
  return <div className="overview-card">{text}</div>;
}

function DayunTable({ dayun }) {
  return (
    <div className="dayun-table-wrap">
      <table className="dayun-table">
        <thead>
          <tr>
            <th>起運年齡</th>
            {dayun.map(d => <th key={d.age}>{d.age}歲</th>)}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="row-label" style={{background: '#ada397', color: 'var(--table-text)'}}>西元年</td>
            {dayun.map(d => <td key={d.age}>{d.year}</td>)}
          </tr>
          <tr>
            <td className="row-label" style={{background: '#ada397', color: 'var(--table-text)'}}>十神</td>
            {dayun.map(d => <td key={d.age}>{d.shishen}</td>)}
          </tr>
          <tr>
            <td className="row-label" style={{background: '#ada397', color: 'var(--table-text)'}}>天干</td>
            {dayun.map(d => (
              <td key={d.age} className={`du-gan ${WX_CLASS_MAP[TG[d.gan].wuxing]}`}>{d.gan}</td>
            ))}
          </tr>
          <tr>
            <td className="row-label" style={{background: '#ada397', color: 'var(--table-text)'}}>地支</td>
            {dayun.map(d => (
              <td key={d.age} className={`du-zhi ${WX_CLASS_MAP[DZ[d.zhi].wuxing]}`}>{d.zhi}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
const WX_CLASS_MAP = { '木': 'w-mu', '火': 'w-huo', '土': 'w-tu', '金': 'w-jin', '水': 'w-shui' };

Object.assign(window, { WuxingChart, StrengthPanel, OverviewCard, DayunTable });
})();
