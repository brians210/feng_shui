import { WUXING_COLORS, WUXING_ORDER, type Wuxing } from '../data/baziConstants';

interface WuxingChartProps {
  counts: Record<Wuxing, number>;
  rizhuWuxing: Wuxing;
}

function WuxingChart({ counts, rizhuWuxing }: WuxingChartProps) {
  const total = WUXING_ORDER.reduce((a, k) => a + (counts[k] || 0), 0) || 1;
  const max = Math.max(...WUXING_ORDER.map((k) => counts[k] || 0)) || 1;

  const cx = 160;
  const cy = 160;
  const r = 110;

  const points = WUXING_ORDER.map((_, i) => {
    const angle = -Math.PI / 2 + i * (2 * Math.PI / 5);
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      angle,
    };
  });

  const valPoints = WUXING_ORDER.map((k, i) => {
    const ratio = (counts[k] || 0) / max;
    const angle = points[i].angle;
    const rr = r * Math.max(0.08, ratio);
    return {
      x: cx + rr * Math.cos(angle),
      y: cy + rr * Math.sin(angle),
    };
  });

  const valPath = valPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`)
    .join(' ') + ' Z';

  const labelPoints = points.map((p) => {
    const dx = p.x - cx;
    const dy = p.y - cy;
    const len = Math.hypot(dx, dy);
    return {
      x: cx + (dx / len) * (r + 22),
      y: cy + (dy / len) * (r + 22),
    };
  });

  const rizhuIdx = WUXING_ORDER.indexOf(rizhuWuxing);

  return (
    <div className="wuxing-panel">
      <div className="wx-pentagon">
        <svg viewBox="0 0 320 320" style={{ width: '100%', height: '100%' }}>
          {[0.25, 0.5, 0.75, 1].map((s, i) => (
            <polygon
              key={i}
              points={points
                .map((p) => `${cx + (p.x - cx) * s},${cy + (p.y - cy) * s}`)
                .join(' ')}
              fill="none"
              stroke="#c4b8a0"
              strokeWidth="1"
              strokeDasharray={i === 3 ? '' : '2 3'}
              opacity="0.6"
            />
          ))}
          {points.map((p, i) => (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={p.x}
              y2={p.y}
              stroke="#c4b8a0"
              strokeWidth="1"
              opacity="0.5"
            />
          ))}
          <path d={valPath} fill="rgba(179,58,44,0.18)" stroke="#b33a2c" strokeWidth="2" />
          {valPoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="4"
              fill={WUXING_COLORS[WUXING_ORDER[i]]}
              stroke="#fff"
              strokeWidth="1.5"
            />
          ))}
          {WUXING_ORDER.map((k, i) => (
            <text
              key={k}
              x={labelPoints[i].x}
              y={labelPoints[i].y}
              fill={WUXING_COLORS[k]}
              fontFamily="'Noto Serif TC', serif"
              fontSize="22"
              fontWeight="900"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ textShadow: rizhuWuxing === k ? '0 0 2px #fff' : 'none' }}
            >
              {k}
            </text>
          ))}
          {rizhuIdx >= 0 && (
            <circle
              cx={labelPoints[rizhuIdx].x}
              cy={labelPoints[rizhuIdx].y}
              r="18"
              fill="none"
              stroke="#b33a2c"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              opacity="0.7"
            />
          )}
        </svg>
      </div>

      <div className="wx-bars">
        {WUXING_ORDER.map((k) => {
          const v = counts[k] || 0;
          const pct = (v / total) * 100;
          return (
            <div key={k} className="wx-bar">
              <div className="wx-name" style={{ color: WUXING_COLORS[k] }}>
                {k}
              </div>
              <div className="wx-track">
                <div
                  className="wx-fill"
                  style={{ width: `${pct}%`, background: WUXING_COLORS[k] }}
                />
              </div>
              <div className="wx-count">
                {v} · {pct.toFixed(0)}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WuxingChart;
