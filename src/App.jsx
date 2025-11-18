import { useState } from 'react'
import Hero from './components/Hero'
import TickerForm from './components/TickerForm'
import Indicators from './components/Indicators'
import News from './components/News'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function App() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [news, setNews] = useState([])
  const [lastTicker, setLastTicker] = useState('AAPL')

  const fetchIndicators = async (ticker) => {
    const res = await fetch(`${API_BASE}/api/analyze?ticker=${encodeURIComponent(ticker)}`)
    if (!res.ok) throw new Error('Failed indicators')
    return await res.json()
  }

  const fetchNews = async (ticker) => {
    const res = await fetch(`${API_BASE}/api/news?ticker=${encodeURIComponent(ticker)}`)
    if (!res.ok) throw new Error('Failed news')
    return await res.json()
  }

  const analyze = async (ticker) => {
    setLoading(true)
    setLastTicker(ticker)
    try {
      const [ind, nw] = await Promise.all([
        fetchIndicators(ticker),
        fetchNews(ticker)
      ])
      setData(ind)
      setNews(nw)
    } catch (e) {
      console.error(e)
      alert('Unable to analyze ticker. Please try another symbol.')
    } finally {
      setLoading(false)
    }
  }

  const refresh = () => analyze(lastTicker)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
        <Hero />
        <div className="bg-slate-800/30 backdrop-blur border border-white/10 rounded-2xl p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-slate-300 font-semibold">Enter a stock ticker</div>
              <div className="text-slate-400 text-sm">We will fetch price, compute indicators, and summarize the latest news.</div>
            </div>
            <TickerForm onAnalyze={analyze} loading={loading} defaultTicker={lastTicker} />
          </div>
        </div>

        {data && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <Indicators data={data} />
              <button onClick={refresh} disabled={loading} className="w-full rounded-xl bg-slate-900/60 border border-white/10 hover:border-blue-500/40 px-4 py-3 font-semibold text-slate-200 disabled:opacity-50">{loading ? 'Refreshing...' : 'Refresh Analysis'}</button>
            </div>
            <div>
              <News items={news} />
            </div>
          </div>
        )}

        {!data && (
          <div className="text-center text-slate-400">Type a ticker like AAPL or TSLA and press Analyze.</div>
        )}
      </div>
    </div>
  )
}

export default App
