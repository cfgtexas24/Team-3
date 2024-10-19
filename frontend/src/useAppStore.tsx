import { create } from 'zustand'
const useAppStore = create((set) => ({
    user: null,
    setUser: (user) => set(() => {
        return ({ user: user })
    })
}))

export default useAppStore;