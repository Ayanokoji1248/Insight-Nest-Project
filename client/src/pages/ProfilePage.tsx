import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import BlogCard from "../components/BlogCard";
import { type BlogProp } from "../components/LatestBlogCard";
import FormModal from "../components/FormModal";
import userModalStore from "../store/userModalStore";
import Button from "../components/Button";
import userStore from "../store/userStore";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface UserProp {
    _id: string;
    fullName: string;
    username: string;
    avatar: string;
    bio?: string;
    following: string[];
    follower: string[];
    Blog: BlogProp[];
}

const ProfilePage = () => {
    const { id } = useParams();
    const currentUser = userStore().user
    const { isOpen } = userModalStore()
    const [user, setUser] = useState<UserProp | null>(null);
    const [latestBlog, setLatestBlog] = useState<BlogProp | null>(null);
    const [regularBlogs, setRegularBlogs] = useState<BlogProp[]>([]);

    const getUserInfo = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/${id}`, { withCredentials: true });
            const fetchedUser = response.data.user;
            setUser(fetchedUser);
            if (fetchedUser.Blog && fetchedUser.Blog.length > 0) {
                // Sort blogs by createdAt (latest first)
                const sortedBlogs = [...fetchedUser.Blog].sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );

                setLatestBlog(sortedBlogs[0]);
                setRegularBlogs(sortedBlogs.slice(1));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, [id]);

    if (!user) {
        return <div className="text-center pt-20">User Not Found</div>;
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
            <div className="max-w-7xl pt-20 mx-auto p-4">
                <div className="flex flex-col md:flex-row items-center gap-2 w-full h-full pt-3">
                    {/* Profile Left */}
                    <div className="w-full md:w-[50%] flex flex-col items-center justify-center gap-5 p-3">
                        <div className="w-full">
                            <h1 className="pl-3 border-l-8 border-amber-500 text-2xl font-[Clash_Display] font-semibold">
                                Profile
                            </h1>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div
                                className="w-62 h-62 rounded-full bg-cover bg-center relative"
                                style={{ backgroundImage: `url(${user.avatar || "/default-avatar.png"})` }}
                            >
                            </div>
                            <div className="flex flex-col items-center leading-4 gap-1">
                                <h1 className="text-3xl font-[Clash_Display] font-medium">{user.fullName}</h1>
                                <p className="font-[Albert_Sans] font-semibold italic text-blue-600">@{user.username}</p>

                                <div className="flex gap-10 mt-2">
                                    <div className="flex font-[Clash_Display] font-semibold gap-2">
                                        <span className="text-blue-700 font-bold">{user.following.length}</span>
                                        Following
                                    </div>
                                    <div className="flex font-[Clash_Display] font-semibold gap-2">
                                        <span className="text-blue-700">{user.follower.length}</span>
                                        Followers
                                    </div>
                                    <div className="flex font-[Clash_Display] font-semibold gap-2">
                                        <span className="text-blue-700">{user.Blog.length}</span>
                                        Blogs
                                    </div>
                                </div>
                            </div>
                            {user._id !== currentUser?._id &&
                                <div className="mt-2">
                                    <Button variant="secondary" text="Follow" />
                                </div>
                            }
                        </div>
                        <div className="p-2">
                            <h2 className="text-2xl font-[Albert_Sans] font-black">Bio</h2>
                            <p className="font-[Albert_Sans] leading-5 font-medium">
                                {user.bio || "No bio available."}
                            </p>
                        </div>
                    </div>

                    {/* Profile Right */}
                    <div className="w-full md:w-[50%] flex flex-col p-2 gap-3 items-center">
                        <div className="w-full">
                            <h1 className="text-xl font-bold font-[Clash_Display] pl-2 border-l-8 border-amber-500">New Blog</h1>
                        </div>
                        {latestBlog && (
                            <BlogCard
                                _id={latestBlog._id}
                                user={latestBlog.user}
                                image={latestBlog.image}
                                title={latestBlog.title}
                                content={latestBlog.content}
                                category={latestBlog.category}
                                tags={latestBlog.tags}
                                likes={latestBlog.likes}
                                comments={latestBlog.comments}
                                createdAt={latestBlog.createdAt}
                            />
                        )}
                    </div>
                </div>

                {/* Other Blogs */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 mt-10">
                    {regularBlogs.length > 0 ? (
                        regularBlogs.map((blog) => (
                            <BlogCard
                                key={blog._id}
                                _id={blog._id}
                                user={blog.user}
                                image={blog.image}
                                title={blog.title}
                                content={blog.content}
                                category={blog.category}
                                tags={blog.tags}
                                likes={blog.likes}
                                comments={blog.comments}
                                createdAt={blog.createdAt}
                            />
                        ))
                    ) : (
                        <p className="font-[Albert_Sans] text-zinc-500">No other blogs yet.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
