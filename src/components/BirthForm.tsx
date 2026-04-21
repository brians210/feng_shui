import { useMemo, useState } from 'react';
import type { FormInput, Gender, Calendar } from '../lib/computeBazi';

interface BirthFormProps {
  loading: boolean;
  onSubmit: (data: FormInput) => void;
}

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1900 + 1 }, (_, i) => CURRENT_YEAR - i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

const pad = (n: number) => String(n).padStart(2, '0');

const DEFAULT_TIMEZONE =
  typeof Intl !== 'undefined'
    ? Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Taipei'
    : 'Asia/Taipei';

function BirthForm({ loading, onSubmit }: BirthFormProps) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>('male');
  const [calendar, setCalendar] = useState<Calendar>('solar');
  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(3);
  const [day, setDay] = useState(15);
  const [hour, setHour] = useState(9);
  const [minute, setMinute] = useState(30);

  const daysInMonth = useMemo(() => {
    const n = new Date(year, month, 0).getDate();
    return Array.from({ length: n }, (_, i) => i + 1);
  }, [year, month]);

  // keep day valid when month/year shrink
  const safeDay = Math.min(day, daysInMonth.length);
  if (safeDay !== day) {
    // lazy-safe adjust without an effect to avoid extra render
    setDay(safeDay);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      gender,
      calendar,
      year,
      month,
      day: safeDay,
      hour,
      minute,
      timezone: DEFAULT_TIMEZONE,
    });
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <h2 className="form-title">命盤資訊</h2>

      <div className="form-row">
        <div className="field" style={{ flex: '1 1 100%' }}>
          <label>姓名（選填）</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="請輸入姓名"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label>性別</label>
          <div className="toggle-group">
            <button
              type="button"
              className={gender === 'male' ? 'active' : ''}
              onClick={() => setGender('male')}
            >
              乾造（男）
            </button>
            <button
              type="button"
              className={gender === 'female' ? 'active' : ''}
              onClick={() => setGender('female')}
            >
              坤造（女）
            </button>
          </div>
        </div>
        <div className="field">
          <label>曆法</label>
          <div className="toggle-group">
            <button
              type="button"
              className={calendar === 'solar' ? 'active' : ''}
              onClick={() => setCalendar('solar')}
            >
              陽曆
            </button>
            <button
              type="button"
              className={calendar === 'lunar' ? 'active' : ''}
              onClick={() => setCalendar('lunar')}
            >
              農曆
            </button>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label>年</label>
          <select value={year} onChange={(e) => setYear(+e.target.value)}>
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>月</label>
          <select value={month} onChange={(e) => setMonth(+e.target.value)}>
            {MONTHS.map((m) => (
              <option key={m} value={m}>
                {pad(m)}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>日</label>
          <select value={safeDay} onChange={(e) => setDay(+e.target.value)}>
            {daysInMonth.map((d) => (
              <option key={d} value={d}>
                {pad(d)}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>時</label>
          <select value={hour} onChange={(e) => setHour(+e.target.value)}>
            {HOURS.map((h) => (
              <option key={h} value={h}>
                {pad(h)}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>分</label>
          <select value={minute} onChange={(e) => setMinute(+e.target.value)}>
            {MINUTES.map((m) => (
              <option key={m} value={m}>
                {pad(m)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? '排盤中…' : '起 盤'}
        </button>
      </div>
    </form>
  );
}

export default BirthForm;
