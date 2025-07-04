import { useEffect, useState } from 'react'

import userStore from '../store/userStore';
import axios from 'axios';
import NavBar from '../components/NavBar';

import { type BlogProp } from '../components/LatestBlogCard';
import BlogCard from '../components/BlogCard';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UserProfilePage = () => {
    const { user } = userStore();

    const [latestBlog, setLatestBlog] = useState<BlogProp>();
    const [regularBlog, setRegularBlog] = useState<BlogProp[]>([])

    const getUserInfo = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/user/${user?._id}`, { withCredentials: true });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getUserBlog = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/blog/myblogs`, { withCredentials: true })
            console.log(response.data.blogs)
            setLatestBlog(response.data.blogs[0])
            setRegularBlog(response.data.blogs.slice(1))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUserInfo();
        getUserBlog()
    }, []);


    return (
        <>
            <NavBar />
            <div className='max-w-7xl pt-20 mx-auto p-4'>
                <h1 className='pl-3 border-l-8 border-amber-500 text-2xl font-[Clash_Display] font-semibold'>
                    Profile
                </h1>

                <div className='flex flex-col md:flex-row items-start  gap-2 w-full h-full pt-3'>
                    <div className='w-full md:w-[50%] flex flex-col items-center justify-center gap-5 p-3'>
                        <div className='flex flex-col items-center gap-2'>
                            <div className='w-62 h-62 rounded-full bg-amber-400'></div>
                            <div className='flex flex-col items-center leading-4 gap-1'>
                                <h1 className='text-3xl font-[Clash_Display] font-medium'>
                                    {user?.fullName}
                                </h1>
                                <p className='font-[Albert_Sans] font-semibold italic text-blue-600'>@{user?.username}</p>

                                <div className='flex gap-10 mt-2'>
                                    <div className='flex font-[Clash_Display] font-semibold gap-2'>
                                        <span className='text-blue-700 font-bold font-[Clash_Display]'>
                                            {user?.following ? user.following.length : 0}
                                        </span>
                                        Following
                                    </div>
                                    <div className='flex font-[Clash_Display] font-semibold gap-2'>
                                        <span className='text-blue-700'>
                                            {user?.follower ? user.follower.length : 0}
                                        </span>
                                        Followers
                                    </div>
                                    <div className='flex font-[Clash_Display] font-semibold gap-2'>
                                        <span className='text-blue-700'>
                                            {user?.Blog ? user.Blog.length : 0}
                                        </span>
                                        Blogs
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-2'>
                            <h2 className='text-2xl font-[Albert_Sans] font-black'>Bio</h2>
                            <p className='font-[Albert_Sans] leading-5 font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eum aliquam consequatur at labore unde nobis aperiam facilis natus voluptatum...</p>
                        </div>
                    </div>

                    <div className='w-full md:w-[50%]  flex flex-col p-2 gap-3 items-center'>
                        <div className='w-full'>
                            <h1 className='text-xl font-bold font-[Clash_Display] pl-2 border-l-8 border-amber-500'>New Blog</h1>
                        </div>
                        {latestBlog &&
                            <BlogCard
                                _id={latestBlog._id}
                                user={latestBlog.user}
                                image={latestBlog?.image}
                                title={latestBlog?.title}
                                content={latestBlog?.content}
                                category={latestBlog.category}
                                tags={latestBlog.tags}
                                likes={latestBlog.likes}
                                comments={latestBlog.comments}
                                createdAt={latestBlog.createdAt}

                            />
                        }
                    </div>
                </div>
                <div className='flex flex-wrap items-center justify-center md:justify-start gap-8 mt-10'>
                    {regularBlog &&
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
                                createdAt={blog.createdAt}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default UserProfilePage;
