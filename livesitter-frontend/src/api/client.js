import axios from 'axios'
const baseURL = import.meta.env.VITE_API_BASE_URL || ''
export const api = axios.create({ baseURL })

export const OverlayAPI = {
  list: () => api.get('/overlays'),
  create: (data) => api.post('/overlays', data),
  update: (id, data) => api.put(`/overlays/${id}`, data),
  remove: (id) => api.delete(`/overlays/${id}`),
}