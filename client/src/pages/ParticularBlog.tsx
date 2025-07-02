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
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ParticularBlog = () => {

    const { id } = useParams();
    const { isOpen } = userModalStore()

    const [blog, setBlog] = useState<BlogProp>();

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

    useEffect(() => {
        getBlog()
    }, [id])

    if (!blog) return <div>{id} Blog Not Found</div>

    return (
        <>
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
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-5">
                            <p className="font-medium font-[Albert_Sans]">By <span className="text-blue-500 font-semibold">@{blog.user.username}</span></p>
                            <button className="bg-amber-300 font-[Albert_Sans] font-semibold tracking-tight px-3 rounded-full">Follow</button>
                        </div>
                        <div className="font-semibold font-[Albert_Sans] text-sm">
                            12 FEB 2025
                        </div>
                    </div>
                    <div className="flex items-center mt-2 gap-5">
                        <p className="flex items-center font-[Albert_Sans] font-semibold gap-2"><HeartIcon size={22} className="text-red-500" /> 40 likes</p>
                        <p className="flex items-center font-[Albert_Sans] font-semibold gap-2"><MessageCircle size={22} className="text-blue-500" /> 40 comments</p>
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
            </div>
        </>
    )
}

export default ParticularBlog