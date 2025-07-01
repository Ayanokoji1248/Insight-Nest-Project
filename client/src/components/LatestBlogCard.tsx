import { Bookmark, Heart, MessageCircle } from "lucide-react"

const LatestBlogCard = () => {
    return (
        <div className=" md:w-full h-[520px] md:h-[550px] mt-5 md:flex rounded-2xl md:overflow-auto overflow-hidden  ">
            <div className="md:w-[60%] h-full">
                <img src="https://images.unsplash.com/photo-1750173588085-895136c6e0a5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""
                    className="object-cover w-full h-full object-center" />
            </div>
            <div className="md:w-[40%] h-full p-5 bg-zinc-800 flex flex-col gap-3" >
                <div className="flex items-center justify-between md:my-3">
                    <p className="text-black font-medium font-[Clash_Display] text-xs md:text-sm p-3 py-1 rounded-full bg-amber-500 w-fit">Creative</p>
                    <p className="font-[Albert_Sans] italic text-xs md:text-sm text-blue-500 font-semibold">@username</p>
                </div>
                <h1 className="text-4xl md:text-6xl font-semibold font-[Clash_Display] text-white">Getting Started with Photography</h1>
                <p className="text-sm text-zinc-300 font-[Albert_Sans]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos ab aliquam, rerum velit veritatis sequi iusto quasi amet? Hic modi numquam doloremque delectus impedit reiciendis architecto officia eum alias sed ipsam voluptates ullam maiores, magni, non id omnis excepturi dolorem nisi asperiores. Inventore voluptas magnam voluptates dolorem itaque quibusdam ab.</p>
                <div className="flex gap-3 mt-2">
                    <p className="text-zinc-500 bg-slate-50 w-fit rounded-full text-sm px-2 py-1 font-medium font-[Albert_Sans]">#nextJs</p>
                    <p className="text-zinc-500 bg-slate-50 w-fit rounded-full text-sm px-2 py-1 font-medium font-[Albert_Sans]">#nextJs</p>
                    <p className="text-zinc-500 bg-slate-50 w-fit rounded-full text-sm px-2 py-1 font-medium font-[Albert_Sans]">#nextJs</p>
                    <p className="text-zinc-500 bg-slate-50 w-fit rounded-full text-sm px-2 py-1 font-medium font-[Albert_Sans]">#nextJs</p>
                </div>
                <div className="flex items-center text-white gap-5 mt-5">
                    <div className="flex items-center gap-4 hover:bg-red-500 transition-all duration-300 cursor-pointer rounded-md px-2 py-1"><Heart size={20} /> <p>23</p></div>
                    <div className="flex items-center gap-4 hover:bg-blue-400 transition-all duration-300 rounded-md cursor-pointer px-2 py-1"><MessageCircle size={20} /><p>12</p></div>
                    <div className="flex items-center gap-4 px-2 py-1 hover:bg-amber-400 rounded-md cursor-pointer"><Bookmark size={20} /></div>
                </div>
            </div>
        </div>
    )
}

export default LatestBlogCard