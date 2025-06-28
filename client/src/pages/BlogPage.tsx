import LatestBlogCard from "../components/LatestBlogCard"
import NavBar from "../components/NavBar"


const BlogPage = () => {
    return (
        <>
            <NavBar />
            <div className="w-7xl mx-auto min-h-screen pt-28 ">
                <h1 className="text-3xl font-semibold font-[Clash_Display] pl-4 border-l-8 border-amber-300">Lastest Blog</h1>
                <LatestBlogCard />

                <div>
                    
                </div>
            </div>
        </>
    )
}

export default BlogPage