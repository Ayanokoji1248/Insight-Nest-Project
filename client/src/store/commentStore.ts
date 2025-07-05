import { create } from "zustand";
import type { CommentProp } from "../pages/ParticularBlog";

interface CommentStoreProp {
    commentsByBlog: { [blogId: string]: CommentProp[] };
    setComments: (blogId: string, comments: CommentProp[]) => void;
    addComment: (blogId: string, comment: CommentProp) => void;
    deleteComment: (blogId: string, commentId: string) => void;
}

const commentStore = create<CommentStoreProp>((set) => ({
    commentsByBlog: {},

    setComments: (blogId, comments) =>
        set((state) => ({
            commentsByBlog: {
                ...state.commentsByBlog,
                [blogId]: comments,
            },
        })),

    addComment: (blogId, comment) =>
        set((state) => ({
            commentsByBlog: {
                ...state.commentsByBlog,
                [blogId]: [comment, ...(state.commentsByBlog[blogId] || [])],
            },
        })),

    deleteComment: (blogId, commentId) =>
        set((state) => ({
            commentsByBlog: {
                ...state.commentsByBlog,
                [blogId]: state.commentsByBlog[blogId].filter((c) => c._id !== commentId),
            },
        })),
}));

export default commentStore;
