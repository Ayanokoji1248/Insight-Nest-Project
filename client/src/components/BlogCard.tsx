import { Bookmark, Heart, MessageCircle } from "lucide-react"
import type { BlogProp } from "./LatestBlogCard"
import { NavLink } from "react-router-dom"
import Tag from "./Tag"



const BlogCard = ({ _id, title, image, content, category, tags, user, likes, comments }: BlogProp) => {
    return (
        <div className="border-[1px] border-zinc-300 shadow-xl md:w-96 min-h-[520px] rounded-xl overflow-hidden">
            <div>
                <img className="w-full h-72 object-center object-cover" src={image} alt="" />
            </div>
            <div className="flex flex-col gap-3 p-5 pt-2">
                <div className="flex items-center justify-between">
                    <p className="text-black font-medium font-[Clash_Display] text-xs md:text-sm p-3 py-1 rounded-full bg-amber-500 w-fit">{category}</p>
                    <NavLink to={`/user/${user._id}`} className="font-[Albert_Sans] italic text-xs md:text-sm text-blue-500 font-semibold">@{user.username}</NavLink>
                </div>
                <NavLink to={`/blog/${_id}`} className="text-4xl md:text-3xl font-semibold font-[Clash_Display] ">{title.substring(0, 40)}...</NavLink>
                <p className="text-sm font-[Albert_Sans]">{content.replace(/<[^>]*>?/gm, "").substring(0, 200)} <NavLink to={`/blog/${_id}`} className={"font-bold cursor-pointer"}>...Read More</NavLink></p>
                <div className="flex gap-3 mt-2">
                    {tags.length > 0 &&
                        tags.map((tag, idx) =>
                            idx < 3 && (
                                <Tag text={tag} />
                            )
                        )
                    }

                </div>
                <div className="flex items-center  gap-5 mt-2 border-t-[1px] border-zinc-200 pt-2">
                    <div className="flex items-center gap-4 hover:bg-red-500 hover:text-white transition-all duration-300 cursor-pointer rounded-md px-3 py-1"><Heart size={20} /> <p>{likes.length}</p></div>
                    <NavLink to={`/blog/${_id}`} className="flex items-center gap-4 hover:bg-blue-400 hover:text-white transition-all duration-300 rounded-md cursor-pointer px-3 py-1"><MessageCircle size={20} /><p>{comments.length}</p></NavLink>
                    <div className="flex items-center gap-4 px-2 py-1 hover:bg-amber-400 hover:text-white rounded-md cursor-pointer"><Bookmark size={20} /></div>
                </div>
            </div>
        </div>
    )
}

export default BlogCard