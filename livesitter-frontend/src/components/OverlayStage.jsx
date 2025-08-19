import { Rnd } from 'react-rnd'
import { useOverlayStore } from '../store/overlayStore'

export default function OverlayStage({ children }) {
  const { overlays, update, remove } = useOverlayStore()

  return (
    <div className="relative w-full">
      {children}
      <div className="pointer-events-none absolute inset-0 select-none">
        {overlays.map(o => (
          <Rnd
            key={o.id}
            size={{ width: o.width, height: o.height }}
            position={{ x: o.x, y: o.y }}
            bounds="parent"
            onDragStop={(_, d) => update(o.id, { x: d.x, y: d.y })}
            onResizeStop={(_, __, ref, ___, pos) => update(o.id, {
              width: parseFloat(ref.style.width),
              height: parseFloat(ref.style.height),
              x: pos.x, y: pos.y
            })}
            className="pointer-events-auto"
          >
            <div
              className="h-full w-full flex items-center justify-center rounded-md bg-transparent"
              style={{ opacity: o.opacity, transform: `rotate(${o.rotation||0}deg)` }}
            >
              {o.type === 'text' ? (
                <div
                  className="w-full h-full p-2 flex items-center justify-center text-center"
                  style={{ color: o.color, fontSize: o.fontSize }}
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) => update(o.id, { text: e.currentTarget.textContent })}
                >
                  {o.text}
                </div>
              ) : (
                <img src={o.src} alt="overlay" className="h-full w-full object-contain" />
              )}
            </div>

            <div className="absolute -top-8 right-0 flex gap-2">
              <button
                className="px-2 py-1 text-xs rounded bg-white/80 hover:bg-white"
                onClick={() => update(o.id, { opacity: Math.max(0, (o.opacity ?? 1) - 0.1) })}
              >-opacity</button>
              <button
                className="px-2 py-1 text-xs rounded bg-white/80 hover:bg-white"
                onClick={() => update(o.id, { opacity: Math.min(1, (o.opacity ?? 1) + 0.1) })}
              >+opacity</button>
              <button
                className="px-2 py-1 text-xs rounded bg-rose-500 text-white"
                onClick={() => remove(o.id)}
              >Delete</button>
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  )
}