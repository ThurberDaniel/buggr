const base = window.location.hotst.includes('localhost') ? '//localhost:3000/' : '/'

export const api = axios.create({
  baseURL: base,
  timeout: 5000,
  withCredentials: true
})
