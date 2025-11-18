export default function News({ items }) {
  if (!items || !items.length) return null
  return (
    <div className="space-y-3">
      <div className="text-slate-300 font-semibold">Latest News</div>
      <div className="grid md:grid-cols-2 gap-3">
        {items.map((n, idx) => (
          <a key={idx} href={n.url} target="_blank" rel="noreferrer" className="group block bg-slate-900/60 border border-white/10 rounded-xl p-4 hover:border-blue-500/40 transition">
            <div className="text-xs text-slate-400 flex items-center justify-between">
              <span>{n.source || 'News'}</span>
              {n.published && <span>{new Date(n.published).toLocaleString()}</span>}
            </div>
            <div className="mt-2 text-white font-semibold group-hover:text-blue-300">{n.title}</div>
            {n.summary && <div className="mt-2 text-sm text-slate-300/90 line-clamp-3">{n.summary}</div>}
          </a>
        ))}
      </div>
    </div>
  )
}
