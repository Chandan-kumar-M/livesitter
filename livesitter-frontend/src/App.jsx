import { useState } from 'react'
import VideoPlayer from './components/VideoPlayer'
import OverlayStage from './components/OverlayStage'
import OverlayToolbar from './components/OverlayToolbar'

export default function App() {
  const [url, setUrl] = useState('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8')

  return (
    <div className="mx-auto max-w-5xl p-4 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Livesitter – Livestream with Overlays</h1>
      </header>

      <div className="rounded-2xl border p-3 flex gap-2">
        <input
          className="flex-1 rounded-lg border px-3 py-2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste HLS (.m3u8) for now"
        />
        <button
          className="rounded-lg bg-black text-white px-3 py-2"
          onClick={() => setUrl(url.trim())}
        >
          Load
        </button>
      </div>

      <OverlayStage>
        <VideoPlayer src={url} />
      </OverlayStage>

      <OverlayToolbar />

      <footer className="text-xs text-gray-500">
        Tip: Use an HLS URL for now. Backend will provide RTSP→HLS/WebRTC later.
      </footer>
    </div>
  )
}