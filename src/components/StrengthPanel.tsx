import { WUXING_COLORS, WUXING_CLASS } from '../data/baziConstants';
import type { Rizhu, StrengthInfo } from '../lib/computeBazi';

interface StrengthPanelProps {
  strength: StrengthInfo;
  rizhu: Rizhu;
}

function StrengthPanel({ strength, rizhu }: StrengthPanelProps) {
  const pos = Math.max(2, Math.min(98, strength.score));
  const cls = WUXING_CLASS[rizhu.wuxing];

  return (
    <div className="strength-panel">
      <div className="strength-top">
        <div className={`rizhu-mark ${cls}`}>{rizhu.gan}</div>
        <div className="level-block">
          <div className="rizhu-sub">
            日主 · {rizhu.yinyang}
            {rizhu.wuxing}
          </div>
          <div className="level">
            {strength.level}
            <span className="pct">分數 {strength.score} / 100</span>
          </div>
        </div>
      </div>

      <div className="strength-meter">
        <div className="needle" style={{ left: `calc(${pos}% - 1.5px)` }} />
        <div className="ticks">
          <span>極弱</span>
          <span>偏弱</span>
          <span>中和</span>
          <span>偏強</span>
          <span>極旺</span>
        </div>
      </div>

      <div className="strength-summary">{strength.summary}</div>

      <div className="favor-row">
        <div className="f-item">
          <span className="lbl">喜用</span>
          {strength.favorable.length === 0 && (
            <span style={{ color: 'var(--ink-muted)' }}>—</span>
          )}
          {strength.favorable.map((k) => (
            <span key={k} className="chip" style={{ background: WUXING_COLORS[k] }}>
              {k}
            </span>
          ))}
        </div>
        <div className="f-item">
          <span className="lbl">忌神</span>
          {strength.unfavorable.length === 0 && (
            <span style={{ color: 'var(--ink-muted)' }}>—</span>
          )}
          {strength.unfavorable.map((k) => (
            <span
              key={k}
              className="chip"
              style={{ background: WUXING_COLORS[k], opacity: 0.55 }}
            >
              {k}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StrengthPanel;
