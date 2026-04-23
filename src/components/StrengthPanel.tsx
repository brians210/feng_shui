import { WUXING_CLASS } from '../data/baziConstants';
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
    </div>
  );
}

export default StrengthPanel;
