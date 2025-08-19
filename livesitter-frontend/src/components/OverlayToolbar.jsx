import { useForm } from 'react-hook-form'
import { useOverlayStore } from '../store/overlayStore'

export default function OverlayToolbar() {
  const { addText, addImage, clear } = useOverlayStore()
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { text: 'Live', color: '#ffffff', fontSize: 28, logoUrl: '' }
  })

  const onAddText = ({ text }) => {
    addText(text)
    reset({ text })
  }

  const onAddLogo = ({ logoUrl }) => {
    if (!logoUrl) return
    addImage(logoUrl)
    reset({ logoUrl: '' })
  }

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-2xl border p-3">
      <form className="flex items-end gap-2" onSubmit={handleSubmit(onAddText)}>
        <div>
          <label className="block text-xs">Text</label>
          <input className="input" {...register('text')} placeholder="Headline…" />
        </div>
        <button className="btn" type="submit">Add Text</button>
      </form>

      <form className="flex items-end gap-2" onSubmit={handleSubmit(onAddLogo)}>
        <div>
          <label className="block text-xs">Logo URL</label>
          <input className="input" {...register('logoUrl')} placeholder="https://…" />
        </div>
        <button className="btn" type="submit">Add Logo</button>
      </form>

      <button className="btn !bg-rose-500" onClick={clear}>Clear All</button>

      <style>{`
        .input { border: 1px solid #ccc; border-radius: 0.5rem; padding: 0.4rem; font-size: 0.875rem; }
        .btn { border-radius: 0.5rem; background: black; color: white; padding: 0.4rem 0.75rem; font-size: 0.875rem; }
        .btn:hover { opacity: 0.9; }
      `}</style>
    </div>
  )
}