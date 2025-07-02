import { Bookmark, Heart, MessageCircle } from "lucide-react"
import { NavLink } from "react-router-dom"

export interface BlogProp {
    user: {
        username: string
    }
    _id: string,
    image: string,
    title: string,
    content: string,
    category: string,
    tags: string[],
    likes: string[],
    comments: string[],

}

const LatestBlogCard = ({ _id, image, title, content, category, tags, user, likes, comments }: BlogProp) => {
    return (
        <div className=" md:w-full min-h-[520px] md:h-[550px] mt-5 md:flex rounded-2xl md:overflow-auto overflow-hidden  ">
            <div className="md:w-[60%] h-[400px] md:h-full">
                <img src={image} alt=""
                    className="object-cover w-full h-full object-center" />
            </div>
            <div className="md:w-[40%] h-full p-5 bg-zinc-800 flex flex-col gap-3" >
                <div className="flex items-center justify-between md:my-3">
                    <p className="text-black font-medium font-[Clash_Display] text-xs md:text-sm p-3 py-1 rounded-full bg-amber-500 w-fit">{category}</p>
                    <p className="font-[Albert_Sans] italic text-xs md:text-sm text-blue-500 font-semibold">@{user.username}</p>
                </div>
                <NavLink to={`/blog/${_id}`} className="text-4xl md:text-6xl font-semibold font-[Clash_Display] text-white">{title.substring(0, 30)} ...</NavLink>
                <p className="text-sm text-zinc-300 font-[Albert_Sans]">{content.replace(/<[^>]*>?/gm, "").substring(0, 450)}<NavLink to={`/blog/${_id}`} className="font-black font-[Albert_Sans] text-white"> Read More...</NavLink></p>
                <div className="flex gap-3 mt-2">
                    {tags.length > 0 &&
                        tags.map((tag) =>
                            <p className="text-zinc-500 bg-slate-50 w-fit rounded-full text-sm px-2 py-1 font-medium font-[Albert_Sans]">#{tag}</p>
                        )}

                </div>
                <div className="flex items-center text-white gap-5 mt-5">
                    <div className="flex items-center gap-4 hover:bg-red-500 transition-all duration-300 cursor-pointer rounded-md px-2 py-1"><Heart size={20} /> <p>{likes.length}</p></div>
                    <div className="flex items-center gap-4 hover:bg-blue-400 transition-all duration-300 rounded-md cursor-pointer px-2 py-1"><MessageCircle size={20} /><p>{comments.length}</p></div>
                    <div className="flex items-center gap-4 px-2 py-1 hover:bg-amber-400 rounded-md cursor-pointer"><Bookmark size={20} /></div>
                </div>
            </div>
        </div>
    )
}

export default LatestBlogCard