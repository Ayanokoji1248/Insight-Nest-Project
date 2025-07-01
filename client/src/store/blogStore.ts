import { create } from "zustand";

export type BlogType = {
    _id: string,
    title: string,
    content: string,
    image: string,
    category: string,
    user: string,
    like?: string[],
    comments?: string[],
    tags?: string[]
}

type BlogStore = {
    blogs: BlogType[],
    addBlog: (newBlog: BlogType) => void;
    deleteBlog: (blogId: string) => void;
    setBlog: (blogs: BlogType[]) => void;
}

const blogStore = create<BlogStore>((set) => ({
    blogs: [],

    addBlog: (newBlog) => set((state) => ({ blogs: [...state.blogs, newBlog] })),

    deleteBlog: (blogId) => set((state) => ({
        blogs: state.blogs.filter((blog) => blog._id !== blogId)
    })),

    setBlog: (blogs) => set({ blogs })

}))

export default blogStore