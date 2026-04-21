import { TIAN_GAN, DI_ZHI, WUXING_CLASS } from '../data/baziConstants';
import type { DayunEntry } from '../lib/computeBazi';

interface DayunTableProps {
  dayun: DayunEntry[];
}

function DayunTable({ dayun }: DayunTableProps) {
  if (!dayun.length) {
    return (
      <div className="dayun-table-wrap" style={{ padding: '24px', background: '#fbf8f0' }}>
        <div style={{ textAlign: 'center', color: 'var(--ink-muted)', fontFamily: 'var(--serif)' }}>
          暫無大運資料
        </div>
      </div>
    );
  }

  return (
    <div className="dayun-table-wrap">
      <table className="dayun-table">
        <thead>
          <tr>
            <th>起運年齡</th>
            {dayun.map((d, i) => (
              <th key={i}>{d.age}歲</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="row-label">西元年</td>
            {dayun.map((d, i) => (
              <td key={i}>{d.year || '—'}</td>
            ))}
          </tr>
          <tr>
            <td className="row-label">十神</td>
            {dayun.map((d, i) => (
              <td key={i}>{d.shishen || '—'}</td>
            ))}
          </tr>
          <tr>
            <td className="row-label">天干</td>
            {dayun.map((d, i) => {
              const info = TIAN_GAN[d.gan];
              const cls = info ? WUXING_CLASS[info.wuxing] : '';
              return (
                <td key={i} className={`du-gan ${cls}`}>
                  {d.gan}
                </td>
              );
            })}
          </tr>
          <tr>
            <td className="row-label">地支</td>
            {dayun.map((d, i) => {
              const info = DI_ZHI[d.zhi];
              const cls = info ? WUXING_CLASS[info.wuxing] : '';
              return (
                <td key={i} className={`du-zhi ${cls}`}>
                  {d.zhi}
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DayunTable;
