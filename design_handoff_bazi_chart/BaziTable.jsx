// ============================================================
// 八字排盤主表格 + 點擊互動
// ============================================================
(function() {
const { TIAN_GAN, DI_ZHI, WUXING_COLORS, SHISHEN_DESC, CHANGSHENG_DESC, SHENSHA_DESC } = window.BaziConstants;

const WX_CLASS = { '木': 'w-mu', '火': 'w-huo', '土': 'w-tu', '金': 'w-jin', '水': 'w-shui' };

function GanChar({ gan, isRizhu, active, onClick }) {
  const info = TIAN_GAN[gan];
  return (
    <td className={`gan-cell ${WX_CLASS[info.wuxing]} ${active ? 'active' : ''}`} onClick={onClick}>
      {gan}
    </td>
  );
}

function ZhiChar({ zhi, active, onClick }) {
  const info = DI_ZHI[zhi];
  return (
    <td className={`zhi-cell ${WX_CLASS[info.wuxing]} ${active ? 'active' : ''}`} onClick={onClick}>
      {zhi}
    </td>
  );
}

function CangGanCell({ zhi }) {
  const info = DI_ZHI[zhi];
  return (
    <td className="canggan-cell">
      {info.canggan.map(([g, w], i) => (
        <div className="cg-line" key={i}>
          <span className={`gan-char ${WX_CLASS[TIAN_GAN[g].wuxing]}`}>{g}</span>
          <span className={WX_CLASS[w]} style={{opacity: 0.9}}>{w}</span>
        </div>
      ))}
    </td>
  );
}

function FuxingCell({ list }) {
  return (
    <td className="fuxing-cell">
      {list.map((s, i) => <div key={i}>{s}</div>)}
    </td>
  );
}

function ShenshaCell({ list }) {
  return (
    <td className="shensha-cell">
      {list.map((s, i) => <div key={i}>{s}</div>)}
    </td>
  );
}

function GanExplanation({ gan, pillarName, shishen }) {
  const info = TIAN_GAN[gan];
  return (
    <div className="explanation">
      <h4>
        <span className="tag">{pillarName}天干</span>
        <span className={WX_CLASS[info.wuxing]} style={{fontSize: 24}}>{gan}</span>
      </h4>
      <div className="attrs">
        <div className="kv"><span className="k">五行</span><span className={WX_CLASS[info.wuxing]}><b>{info.wuxing}</b></span></div>
        <div className="kv"><span className="k">陰陽</span><b>{info.yinyang}</b></div>
        {shishen && <div className="kv"><span className="k">十神</span><b>{shishen}</b></div>}
      </div>
      <div className="desc">
        {gan}為{info.yinyang}{info.wuxing}之干。{shishen && shishen !== '日主' ? SHISHEN_DESC[shishen] : (shishen === '日主' ? '此為日主本元，代表命主自身的核心特質與能量源頭。' : '')}
      </div>
    </div>
  );
}

function ZhiExplanation({ zhi, pillarName, xingyun, shensha }) {
  const info = DI_ZHI[zhi];
  return (
    <div className="explanation">
      <h4>
        <span className="tag">{pillarName}地支</span>
        <span className={WX_CLASS[info.wuxing]} style={{fontSize: 24}}>{zhi}</span>
      </h4>
      <div className="attrs">
        <div className="kv"><span className="k">五行</span><span className={WX_CLASS[info.wuxing]}><b>{info.wuxing}</b></span></div>
        <div className="kv"><span className="k">生肖</span><b>{info.zodiac}</b></div>
        <div className="kv"><span className="k">藏干</span><b>{info.canggan.map(c => c[0]).join('、')}</b></div>
        {xingyun && <div className="kv"><span className="k">星運</span><b>{xingyun}</b></div>}
      </div>
      <div className="desc" style={{marginBottom: 10}}>
        {zhi}為{info.wuxing}支，生肖屬{info.zodiac}。藏干三元：{info.canggan.map(([g, w]) => `${g}(${w})`).join('、')}。
      </div>
      {xingyun && CHANGSHENG_DESC[xingyun] && (
        <div className="desc" style={{marginBottom: 8}}>
          <b>十二長生「{xingyun}」：</b>{CHANGSHENG_DESC[xingyun]}
        </div>
      )}
      {shensha && shensha.length > 0 && (
        <div className="desc">
          <b>本柱神煞：</b>
          {shensha.map((s, i) => (
            <span key={i} style={{display: 'inline-block', marginRight: 10}}>
              <b>{s}</b>{SHENSHA_DESC[s] ? ` — ${SHENSHA_DESC[s]}` : ''}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function BaziTable({ data }) {
  const [selected, setSelected] = React.useState(null); // {type: 'gan'|'zhi', pillar: 'year'|'month'|'day'|'hour'}

  const pillarOrder = ['hour', 'day', 'month', 'year']; // 時/日/月/年 — matches the reference image order
  const pillars = pillarOrder.map(k => ({ key: k, ...data.pillars[k] }));

  const toggle = (type, pillar) => {
    if (selected && selected.type === type && selected.pillar === pillar) setSelected(null);
    else setSelected({ type, pillar });
  };

  const selPillar = selected ? data.pillars[selected.pillar] : null;

  return (
    <>
      <div className="bazi-table-wrap">
        <table className="bazi-table">
          <thead>
            <tr>
              <th>日期</th>
              {pillars.map(p => <th key={p.key}>{p.name}</th>)}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="row-label">主星</td>
              {pillars.map(p => <td key={p.key}>{p.zhuxing}</td>)}
            </tr>
            <tr className="shade">
              <td className="row-label">天干</td>
              {pillars.map(p => (
                <GanChar
                  key={p.key}
                  gan={p.gan}
                  isRizhu={p.key === 'day'}
                  active={selected && selected.type === 'gan' && selected.pillar === p.key}
                  onClick={() => toggle('gan', p.key)}
                />
              ))}
            </tr>
            <tr>
              <td className="row-label">地支</td>
              {pillars.map(p => (
                <ZhiChar
                  key={p.key}
                  zhi={p.zhi}
                  active={selected && selected.type === 'zhi' && selected.pillar === p.key}
                  onClick={() => toggle('zhi', p.key)}
                />
              ))}
            </tr>
            <tr className="shade">
              <td className="row-label">藏干</td>
              {pillars.map(p => <CangGanCell key={p.key} zhi={p.zhi} />)}
            </tr>
            <tr>
              <td className="row-label">副星</td>
              {pillars.map(p => <FuxingCell key={p.key} list={p.fuxing} />)}
            </tr>
            <tr className="shade">
              <td className="row-label">納音</td>
              {pillars.map(p => <td key={p.key}>{p.nayin}</td>)}
            </tr>
            <tr>
              <td className="row-label">星運</td>
              {pillars.map(p => <td key={p.key}>{p.xingyun}</td>)}
            </tr>
            <tr className="shade">
              <td className="row-label">空亡</td>
              {pillars.map(p => <td key={p.key}>{p.kongwang}</td>)}
            </tr>
            <tr>
              <td className="row-label">神煞</td>
              {pillars.map(p => <ShenshaCell key={p.key} list={p.shensha} />)}
            </tr>
          </tbody>
        </table>
      </div>

      {selected && selPillar && selected.type === 'gan' && (
        <GanExplanation gan={selPillar.gan} pillarName={selPillar.name} shishen={selPillar.zhuxing} />
      )}
      {selected && selPillar && selected.type === 'zhi' && (
        <ZhiExplanation zhi={selPillar.zhi} pillarName={selPillar.name} xingyun={selPillar.xingyun} shensha={selPillar.shensha} />
      )}
    </>
  );
}

window.BaziTable = BaziTable;
})();
