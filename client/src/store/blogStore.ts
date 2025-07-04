import { create } from "zustand";

export interface BlogType {
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

interface BlogStore {
    blogs: BlogType[],
    addBlog: (newBlog: BlogType) => void;
    deleteBlog: (blogId: string) => void;
    setBlog: (blogs: BlogType[]) => void;
    // blogLike: (blogId: string) => void;
}

const blogStore = create<BlogStore>((set) => ({
    blogs: [],

    addBlog: (newBlog) => set((state) => ({ blogs: [...state.blogs, newBlog] })),

    deleteBlog: (blogId) => set((state) => ({
        blogs: state.blogs.filter((blog) => blog._id !== blogId)
    })),

    setBlog: (blogs) => set({ blogs }),

    // blogLike: (blogId) =>
    //     set((state) => ({
    //         blogs: state.blogs.map((blog) => {
    //             if (blog._id === blogId) {
    //                 const alreadyLiked = blog.like?.includes(userId);
    //                 let updatedLikes;

    //                 if (alreadyLiked) {
    //                     updatedLikes = blog.like?.filter((id) => id !== userId);
    //                 } else {
    //                     updatedLikes = blog.like ? [...blog.like, userId] : [userId];
    //                 }

    //                 return { ...blog, like: updatedLikes };
    //             }
    //             return blog;
    //         })
    //     }))

}))

export default blogStore