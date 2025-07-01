import { create } from "zustand";

type User = {
    fullName: string,
    username: string,
    email: string,
    avatar: string,
    blog: string[],
    follower: string[],
    following: string[]
}

type userType = {
    user: User | null
    setUser: (newUser: User | null) => void;
}

const userStore = create<userType>((set) => ({
    user: null,
    setUser: (newUser) => set({ user: newUser })
}))

export default userStore;