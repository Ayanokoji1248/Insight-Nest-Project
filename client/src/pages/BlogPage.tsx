import BlogCard from "../components/BLogCard"
import LatestBlogCard from "../components/LatestBlogCard"
import NavBar from "../components/NavBar"


const BlogPage = () => {
    return (
        <>
            <NavBar />
            <div className="max-w-7xl mx-auto min-h-screen pt-24 pb-6">
                <div className="w-full flex justify-start px-5 md:px-0">

                    <h1 className="text-3xl w-fit font-semibold font-[Clash_Display] pl-4 border-l-8 border-amber-300">Lastest Blog</h1>
                </div>
                <div className=" flex flex-col items-center pb-6">
                    <LatestBlogCard />
                </div>

                <div className="flex flex-wrap justify-center md:justify-between items-center space-y-8">
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                </div>
            </div>
        </>
    )
}

export default BlogPage