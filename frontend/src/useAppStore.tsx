import { create } from 'zustand'
const useAppStore = create((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user: user }))
}))

export default useAppStore;