import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuid } from 'uuid'

export const useOverlayStore = create(persist(
  (set, get) => ({
    overlays: [],
    addText: (text) => set(s => ({
      overlays: [...s.overlays, {
        id: uuid(), type: 'text', text,
        x: 40, y: 40, width: 220, height: 60,
        fontSize: 28, color: '#ffffff', opacity: 1, rotation: 0
      }]
    })),
    addImage: (src) => set(s => ({
      overlays: [...s.overlays, {
        id: uuid(), type: 'image', src,
        x: 80, y: 80, width: 160, height: 90, opacity: 1, rotation: 0
      }]
    })),
    update: (id, patch) => set(s => ({
      overlays: s.overlays.map(o => o.id === id ? { ...o, ...patch } : o)
    })),
    remove: (id) => set(s => ({ overlays: s.overlays.filter(o => o.id !== id) })),
    clear: () => set({ overlays: [] }),
  }),
  { name: 'livesitter-overlays' }
))