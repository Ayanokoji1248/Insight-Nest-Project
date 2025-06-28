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
    user: User
    setUser: (newUser: User) => void;
}

const userStore = create<userType>((set) => ({
    user: {
        fullName: "",
        username: "",
        email: "",
        avatar: "",
        blog: [],
        follower: [],
        following: []

    },
    setUser: (newUser) => set({ user: newUser })
}))

export default userStore;