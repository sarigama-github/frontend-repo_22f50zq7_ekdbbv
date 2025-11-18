import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <div className="relative h-[300px] md:h-[420px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black">
      <Spline scene="https://prod.spline.design/44zrIZf-iQZhbQNQ/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow">Stock Pulse Analyzer</h1>
        <p className="mt-2 md:mt-4 text-sm md:text-base text-slate-300 max-w-2xl">Analyze any stock in seconds: price, trend, technical indicators, and the latest news — all in one clean dashboard.</p>
      </div>
    </div>
  )
}
