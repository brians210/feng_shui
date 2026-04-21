// ============================================================
// 八字輸入表單元件
// ============================================================
(function() {
function BirthForm({ onSubmit, loading }) {
  const now = new Date();
  const [gender, setGender] = React.useState('male');
  const [calendar, setCalendar] = React.useState('solar');
  const [name, setName] = React.useState('');
  const [year, setYear] = React.useState(1990);
  const [month, setMonth] = React.useState(3);
  const [day, setDay] = React.useState(15);
  const [hour, setHour] = React.useState(9);
  const [minute, setMinute] = React.useState(30);

  const years = React.useMemo(() => {
    const arr = [];
    for (let y = now.getFullYear(); y >= 1900; y--) arr.push(y);
    return arr;
  }, []);
  const months = Array.from({length: 12}, (_, i) => i + 1);
  const daysInMonth = (() => {
    const d = new Date(year, month, 0).getDate();
    return Array.from({length: d}, (_, i) => i + 1);
  })();
  const hours = Array.from({length: 24}, (_, i) => i);
  const minutes = Array.from({length: 60}, (_, i) => i);

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ name, gender, calendar, year, month, day, hour, minute });
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <form className="form-card" onSubmit={submit}>
      <h2 className="form-title">命盤資訊</h2>

      <div className="form-row">
        <div className="field" style={{flex: '1 1 100%'}}>
          <label>姓名（選填）</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="請輸入姓名" />
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label>性別</label>
          <div className="toggle-group">
            <button type="button" className={gender === 'male' ? 'active' : ''} onClick={() => setGender('male')}>乾造（男）</button>
            <button type="button" className={gender === 'female' ? 'active' : ''} onClick={() => setGender('female')}>坤造（女）</button>
          </div>
        </div>
        <div className="field">
          <label>曆法</label>
          <div className="toggle-group">
            <button type="button" className={calendar === 'solar' ? 'active' : ''} onClick={() => setCalendar('solar')}>陽曆</button>
            <button type="button" className={calendar === 'lunar' ? 'active' : ''} onClick={() => setCalendar('lunar')}>農曆</button>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="field">
          <label>年</label>
          <select value={year} onChange={e => setYear(+e.target.value)}>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
        <div className="field">
          <label>月</label>
          <select value={month} onChange={e => setMonth(+e.target.value)}>
            {months.map(m => <option key={m} value={m}>{pad(m)}</option>)}
          </select>
        </div>
        <div className="field">
          <label>日</label>
          <select value={day} onChange={e => setDay(+e.target.value)}>
            {daysInMonth.map(d => <option key={d} value={d}>{pad(d)}</option>)}
          </select>
        </div>
        <div className="field">
          <label>時</label>
          <select value={hour} onChange={e => setHour(+e.target.value)}>
            {hours.map(h => <option key={h} value={h}>{pad(h)}</option>)}
          </select>
        </div>
        <div className="field">
          <label>分</label>
          <select value={minute} onChange={e => setMinute(+e.target.value)}>
            {minutes.map(m => <option key={m} value={m}>{pad(m)}</option>)}
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

window.BirthForm = BirthForm;
})();
