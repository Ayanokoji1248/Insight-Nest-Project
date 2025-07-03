import { create } from "zustand";
import type { CommentProp } from "../pages/ParticularBlog";

interface CommentStoreProp {
    comments: CommentProp[],
    addComment: (newComment: CommentProp) => void;
    deleteComment: (commentId: string) => void;
    setComments: (comments: CommentProp[]) => void;
}

const commentStore = create<CommentStoreProp>((set) => ({
    comments: [],

    addComment: (newComment) => set((state) => ({ comments: [newComment, ...state.comments] })),

    deleteComment: (commentId) => set((state) => ({
        comments: state.comments.filter((comment) => comment._id !== commentId)
    })),

    setComments: (comments) => set({ comments })
}))
export default commentStore