import { useState } from 'react'

export default function TickerForm({ onAnalyze, loading, defaultTicker = 'AAPL' }) {
  const [ticker, setTicker] = useState(defaultTicker)

  const submit = (e) => {
    e.preventDefault()
    if (!ticker) return
    onAnalyze(ticker.trim().toUpperCase())
  }

  return (
    <form onSubmit={submit} className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value.toUpperCase())}
        placeholder="Enter ticker (e.g., AAPL, TSLA)"
        className="flex-1 rounded-xl bg-slate-900/70 border border-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        maxLength={10}
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 text-white font-semibold shadow-lg shadow-blue-500/20 transition"
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
    </form>
  )
}
