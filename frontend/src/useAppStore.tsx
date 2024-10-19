import { create } from 'zustand'
const useAppStore = create((set) => ({
    userType: null,
    setUserType: () => set((userType) => ({ userType: userType }))
}))

export default useAppStore;