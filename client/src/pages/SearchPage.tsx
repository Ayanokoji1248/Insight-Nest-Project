import { useState } from "react"
import FormModal from "../components/FormModal"
import NavBar from "../components/NavBar"
import userModalStore from "../store/userModalStore"
import axios from "axios"
import BlogCard from "../components/BlogCard"
import type { BlogProp } from "../components/LatestBlogCard"
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const SearchPage = () => {
    const { isOpen } = userModalStore()
    const [search, setSearch] = useState("")
    const [result, setResult] = useState<BlogProp[]>([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/blog/search?query=${search}`, {
                withCredentials: true
            });
            console.log(response.data.blogs)
            setResult(response.data.blogs)
        } catch (error) {
            console.log(error)
        }
    }


    return (

        <>
            <NavBar />
            {isOpen &&
                <div className="w-full h-screen flex justify-center items-center fixed z-20">

                    <FormModal />
                    <div className="w-full h-screen bg-gray-500 absolute z-10 opacity-60"></div>
                </div>
            }

            <div className="max-w-7xl mx-auto p-4 pt-20">
                <h1 className="font-semibold border-l-8 border-amber-400 pl-3 font-[Clash_Display] text-2xl ">Search</h1>

                <div className="mt-5 w-108 flex gap-2">

                    <input value={search} onChange={(e) => setSearch(e.target.value)} className="border-2 w-108 font-[Albert_Sans] text-sm tracking-tight font-medium p-2 rounded-md"
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                e.preventDefault()
                                handleSearch()
                            }
                        }
                        } placeholder="Search any blog" />
                    <button onClick={handleSearch} className="p-2 bg-blue-500 text-white font-[Albert_Sans] rounded-md">Search</button>
                </div>
                {
                    result.length > 0 &&
                    <div className="mt-3">
                        <p className="text-zinc-500 font-bold font-[Albert_Sans] text-sm tracking-tight">Results Found: {result.length}</p>
                    </div>
                }

                <div id="posts" className="flex flex-wrap justify-start mt-5 gap-10">
                    {result.map((res) => (
                        <BlogCard
                            user={res.user}
                            _id={res._id}
                            image={res.image}
                            title={res.title}
                            content={res.content}
                            category={res.category}
                            tags={res.tags}
                            likes={res.likes}
                            comments={res.comments}
                            createdAt={res.createdAt}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default SearchPage