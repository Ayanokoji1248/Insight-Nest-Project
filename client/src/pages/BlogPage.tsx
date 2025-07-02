import { useEffect, useState } from "react"
import BlogCard from "../components/BlogCard"
import FormModal from "../components/FormModal"
import LatestBlogCard, { type BlogProp } from "../components/LatestBlogCard"
import NavBar from "../components/NavBar"
import userModalStore from "../store/userModalStore"
import axios from "axios"
import blogStore from "../store/blogStore"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const BlogPage = () => {
    const { isOpen } = userModalStore();
    const { setBlog } = blogStore();

    const [latestBlog, setLatestBlog] = useState<BlogProp>();
    const [regularBlog, setRegularBlog] = useState<BlogProp[]>([]);

    const getAllBlog = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/blog/all`, {
                withCredentials: true
            });
            console.log(response.data.blogs)
            setBlog(response.data.blogs)
            setLatestBlog(response.data.blogs[0]);
            setRegularBlog(response.data.blogs.slice(1))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllBlog()
    }, [])

    return (
        <>
            <NavBar />
            {isOpen &&
                <div className="w-full h-screen flex justify-center items-center fixed">

                    <FormModal />
                    <div className="w-full h-screen bg-gray-500 absolute z-10 opacity-60"></div>
                </div>
            }
            <div className="max-w-7xl mx-auto min-h-screen pt-24 pb-6">
                <div className="w-full flex justify-start px-5 md:px-0">

                    <h1 className="text-3xl w-fit font-semibold font-[Clash_Display] pl-4 border-l-8 border-amber-300">Lastest Blog</h1>
                </div>
                <div className=" flex flex-col items-center pb-6">
                    {latestBlog ?
                        <LatestBlogCard
                            _id={latestBlog._id}
                            title={latestBlog.title}
                            image={latestBlog.image}
                            content={latestBlog.content}
                            category={latestBlog.category}
                            tags={latestBlog.tags}
                            user={latestBlog.user}
                            likes={latestBlog.likes}
                            comments={latestBlog.comments} />
                        : <h1>Loading...</h1>}
                </div>

                <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">

                    {
                        regularBlog ?
                            regularBlog.map((blog) => (
                                <BlogCard
                                    key={blog._id}
                                    _id={blog._id}
                                    title={blog.title}
                                    image={blog.image}
                                    content={blog.content}
                                    category={blog.category}
                                    tags={blog.tags}
                                    likes={blog.likes}
                                    comments={blog.comments}
                                    user={blog.user}
                                />
                            ))
                            :
                            <h1>Loading...</h1>
                    }
                </div>
            </div>
        </>
    )
}

export default BlogPage