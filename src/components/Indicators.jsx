import { TrendingUp, TrendingDown, Activity, Gauge, BarChart2 } from 'lucide-react'

function Stat({ label, value, hint, positive, negative }) {
  const color = positive ? 'text-emerald-400' : negative ? 'text-rose-400' : 'text-slate-200'
  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
      <div className="text-slate-400 text-xs uppercase tracking-wide">{label}</div>
      <div className={`mt-1 text-xl font-semibold ${color}`}>{value}</div>
      {hint && <div className="text-xs text-slate-400 mt-1">{hint}</div>}
    </div>
  )
}

export default function Indicators({ data }) {
  if (!data) return null
  const changePositive = data.change_percent >= 0
  return (
    <div className="space-y-4">
      <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-slate-400 text-xs">Ticker</div>
            <div className="text-2xl font-bold text-white">{data.ticker}</div>
          </div>
          <div className="flex items-end gap-6">
            <div>
              <div className="text-slate-400 text-xs">Price</div>
              <div className="text-2xl font-bold text-white">${data.price.toFixed(2)}</div>
            </div>
            <div className={`text-sm font-semibold ${changePositive ? 'text-emerald-400' : 'text-rose-400'} flex items-center gap-1`}>
              {changePositive ? <TrendingUp size={16}/> : <TrendingDown size={16}/>}
              {data.change_percent.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Support" value={`$${data.support.toFixed(2)}`} />
        <Stat label="Resistance" value={`$${data.resistance.toFixed(2)}`} />
        <Stat label="RSI(14)" value={`${data.rsi.toFixed(1)}`} hint={data.rsi_signal} positive={data.rsi_signal.includes('Bullish') || data.rsi_signal==='Oversold'} negative={data.rsi_signal.includes('Bearish') || data.rsi_signal==='Overbought'} />
        <Stat label="MACD" value={`${data.macd.toFixed(4)}`} hint={`signal ${data.macd_signal.toFixed(4)} | hist ${data.macd_hist.toFixed(4)}`} positive={data.macd_hist>0} negative={data.macd_hist<0}/>
        <Stat label="MA 50" value={`$${data.ma50.toFixed(2)}`} />
        <Stat label="MA 200" value={`$${data.ma200.toFixed(2)}`} />
        <Stat label="MA Trend" value={data.ma_trend} positive={data.ma_trend==='Bullish'} negative={data.ma_trend==='Bearish'} />
        <Stat label="Volume" value={new Intl.NumberFormat().format(Math.round(data.volume))} hint={data.volume_trend} />
      </div>

      <MiniCharts series={data.chart} vol={data.volume_series} positive={changePositive} />
    </div>
  )
}

function MiniCharts({ series, vol, positive }) {
  // Simple inline SVG sparkline
  const w = 600, h = 120, pad = 8
  const S = series || []
  const V = vol || []
  if (!S.length) return null
  const min = Math.min(...S), max = Math.max(...S)
  const pts = S.map((v, i) => {
    const x = pad + (i / (S.length - 1)) * (w - pad * 2)
    const y = pad + (1 - (v - min) / (max - min + 1e-6)) * (h - pad * 2)
    return `${x},${y}`
  }).join(' ')
  const color = positive ? '#34d399' : '#fb7185'

  // Volume bars
  const vmax = Math.max(...V, 1)
  const bars = V.map((v, i) => {
    const x = pad + (i / V.length) * (w - pad * 2)
    const barW = (w - pad * 2) / V.length - 1
    const barH = ((v / vmax) * (h/3))
    const y = h - pad - barH
    return <rect key={i} x={x} y={y} width={barW} height={barH} fill="#60a5fa" opacity="0.5"/>
  })

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4">
      <div className="text-slate-400 text-xs mb-2">Mini Charts</div>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-28">
        <polyline fill="none" stroke={color} strokeWidth="2" points={pts} />
        {bars}
      </svg>
    </div>
  )
}
