import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'

export default function VideoPlayer({ src }) {
  const videoRef = useRef(null)
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
    const video = videoRef.current
    if (!video || !src) return

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
      return
    }

    if (Hls.isSupported() && src.endsWith('.m3u8')) {
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data?.fatal) setError('Stream error.')
      })
      return () => hls.destroy()
    }

    setError('Unsupported source.')
  }, [src])

  return (
    <div className="w-full">
      <video
        ref={videoRef}
        controls
        className="w-full rounded-2xl bg-black"
        playsInline
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  )
}