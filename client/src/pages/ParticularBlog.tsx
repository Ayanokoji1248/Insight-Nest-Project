import { useParams } from "react-router-dom"
import NavBar from "../components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import FormModal from "../components/FormModal";
import userModalStore from "../store/userModalStore";
import { type BlogProp } from "../components/LatestBlogCard";
import { Parser } from "html-to-react"
import DOMPurify from "dompurify"
import { BookmarkIcon, HeartIcon, MessageCircle } from "lucide-react";
import userStore from "../store/userStore";
import commentStore from "../store/commentStore";
import { toast, ToastContainer } from "react-toastify";
import Button from "../components/Button";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface CommentProp {
    _id: string,
    comment: string,
    user: {
        _id: string,
        fullName: string,
        username: string,
        avatar: string,
    }
    blog: string
}

const ParticularBlog = () => {

    const { id } = useParams();
    const { isOpen, openModal } = userModalStore()
    const { user } = userStore();
    const { comments, setComments, addComment, deleteComment } = commentStore();

    const [userComment, setUserComment] = useState("")
    const [blog, setBlog] = useState<BlogProp>();
    // const [comment, setComment] = useState<CommentProp[]>([]);

    const getBlog = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/blog/${id}`, {
                withCredentials: true
            })
            // console.log(response.data)
            setBlog(response.data.blog)
        } catch (error) {
            console.log(error)
        }
    }

    const getComment = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/comment/${id}`,
                {
                    withCredentials: true,
                }
            )
            console.log(response.data.comments)
            // Zustand Variable
            setComments(response.data.comments);
        } catch (error) {
            console.log(error)
        }
    }

    const checkSubmitComment = () => {
        if (!user) {
            openModal()
            return;
        }
    }

    const createComment = async () => {
        checkSubmitComment()
        try {
            const response = await axios.post(`${BACKEND_URL}/comment/${id}`, {
                comment: userComment
            }, { withCredentials: true })
            console.log(response.data.comment)
            addComment(response.data.comment)

            setUserComment("")
        } catch (error) {
            console.log(error)
        }
    }

    const removeComment = async (commentId: string) => {
        try {
            const response = await axios.delete(`${BACKEND_URL}/comment/${commentId}`, {
                withCredentials: true
            })

            console.log(response)
            toast.success(response.data.message);
            deleteComment(commentId);

        } catch (error) {
            console.log(error)
        }
    }


    // Dk know how to like/unlike post
    // const likeBlog = async (blogId: string) => {
    //     try {
    //         const response = await axios.post(`${BACKEND_URL}/blog/like/${blogId}`, {}, {
    //             withCredentials: true
    //         });
    //         console.log(response)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        getBlog()
        getComment()
    }, [id])



    if (!blog) return <div>{id} Blog Not Found</div>

    return (
        <>
            <ToastContainer position={"top-right"} />
            <NavBar />

            {isOpen &&
                <div className="w-full h-screen flex justify-center items-center fixed">

                    <FormModal />
                    <div className="w-full h-screen bg-gray-500 absolute z-10 opacity-60"></div>
                </div>
            }
            <div className="max-w-[900px] mx-auto p-5 pt-24">
                <div id="head" className="flex flex-col gap-2">
                    <div>
                        <p className="w-fit text-sm font-[Clash_Display] font-medium bg-amber-400 px-2 py-1 rounded-full">{blog.category}</p>
                    </div>

                    <div>
                        <h1 className="text-5xl md:text-7xl leading-none font-semibold font-[Clash_Display]">{blog.title}</h1>
                    </div>
                    <div className="flex items-center mt-2 justify-between">
                        <div className="flex items-center gap-5">
                            <p className="font-medium font-[Albert_Sans]">By <span className="text-blue-500 font-semibold">@{blog.user.username}</span></p>
                            <Button
                                text="Follow"
                                variant="secondary"
                                size="sm"
                            />
                        </div>
                        <div className="font-semibold font-[Albert_Sans] text-sm">
                            {blog.createdAt.slice(0, 10)}
                        </div>
                    </div>
                    <div className="flex items-center mt-2 gap-5">
                        <p className="flex items-center font-[Albert_Sans] font-semibold gap-2">
                            <button >
                                <HeartIcon size={22} className="text-red-400 hover:fill-red-500 transition-all duration-300 cursor-pointer" />
                            </button>
                            {blog.likes.length} likes
                        </p>
                        <p className="flex items-center font-[Albert_Sans] font-semibold gap-2">
                            <MessageCircle size={22} className="text-blue-500" />{blog.comments.length} {blog.comments.length > 1 ? "comments" : "comment"} </p>
                        <p className="flex items-center font-[Albert_Sans] gap-2"><BookmarkIcon size={22} className="text-yellow-500" /> </p>
                    </div>
                </div>
                <div id="mid" className="flex flex-col gap-5 mt-6">
                    <div className="w-full h-full">
                        <img className=" object-cover object-center" src={blog.image} alt="" />
                    </div>
                    <div>
                        <p className="font-medium font-[Albert_Sans] text-lg">{Parser().parse(DOMPurify.sanitize(blog.content))}</p></div>
                </div>
                <hr className="text-zinc-300" />
                <div className="w-full mt-5 flex flex-col gap-3">
                    {/* Input for Comment */}
                    {/* <label htmlFor="comment" className="">Enter Comment</label> */}
                    <textarea value={userComment} onChange={(e) => setUserComment(e.target.value)} name="comment" id="comment" className="w-full h-32 p-2 font-[Albert_Sans] outline-none border-[1px] border-zinc-500 rounded-md resize-none" placeholder="Enter your opinion..."></textarea>
                    {/*                     
                    <button onClick={createComment} className="bg-blue-500 w-fit text-white px-4 py-2 rounded-md">Submit</button> */}
                    <Button
                        variant="blueButton"
                        size="md"
                        text="Submit"
                        widthFull={false}
                        onClick={createComment}
                    />
                </div>
                <div className="mt-3">
                    <div>
                        <h1 className="text-xl text-zinc-700 font-[Albert_Sans] font-bold tracking-tighter">Comments:</h1>
                    </div>
                    <div className="flex flex-col gap-10  p-5">
                        {comments.length === 0 &&
                            <p className="text-sm text-zinc-500 font-bold font-[Albert_Sans]">Be first one to comment</p>
                        }
                        {/* Comment Card With edit and delete button */}
                        {comments.map((c) => (
                            <div key={c._id} className="flex gap-3 items-center">
                                <div className="w-12 h-12 shrink-0 bg-black rounded-full"></div>
                                <div className="flex flex-col leading-none">
                                    <h1 className="font-[Albert_Sans] font-semibold text-lg">{c.user.username}</h1>
                                    <p className="font-[Albert_Sans] tracking-tight text-zinc-500">{c.comment}</p>

                                    {c.user._id === user?._id &&
                                        <div className="flex gap-3 mt-3">
                                            <Button
                                                text="Edit"
                                                variant="blueButton"
                                                size="sm"
                                            />

                                            <Button
                                                variant="danger"
                                                text="Delete"
                                                size="sm"
                                                onClick={() => removeComment(c._id)}
                                            />
                                        </div>
                                    }
                                </div>
                            </div>
                        ))}

                    </div>


                </div>
            </div >
        </>
    )
}

export default ParticularBlog