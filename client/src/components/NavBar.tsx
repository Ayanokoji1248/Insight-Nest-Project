import { useState, useRef, useEffect } from "react";
import userModalStore from "../store/userModalStore";
import userStore from "../store/userStore";
import NavigationLink from "./NavigationLink";
import { Bell } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const NavBar = () => {
    const navigate = useNavigate()
    const { openModal } = userModalStore();
    const { user, setUser } = userStore();
    const [visible, setVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setVisible(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const logoutUser = async () => {

        try {
            await axios.post(`${BACKEND_URL}/auth/logout`, {}, {
                withCredentials: true
            })
            setUser(null)
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-full h-16 bg-white fixed flex items-center justify-between px-5 md:px-32 border-b-[1px] border-zinc-200 z-100">
            <div>
                <h1 className="font-black text-2xl md:text-4xl font-[EB_Garamond] text-[#003566]">Insight Nest</h1>
            </div>

            <div className="md:flex gap-3 md:gap-12 items-center hidden">
                {user ? (
                    <>
                        <NavigationLink to="/blog" text="Blogs" />
                        <NavigationLink to="/search" text="Search" />
                        <NavigationLink to="/write" text="Write" />
                    </>
                ) : (
                    <>
                        <NavigationLink to="/" text="Home" />
                        <NavigationLink to="/blog" text="Blogs" />
                        <button className="font-[Clash_Display] text-sm font-medium text-[#003566] cursor-pointer" onClick={openModal}>Write</button>
                        <button className="font-[Clash_Display] text-sm font-medium text-[#003566] cursor-pointer" onClick={openModal}>Sign-In</button>
                    </>
                )}
            </div>

            <div>
                {user ? (
                    <div className="flex items-center gap-4 relative" ref={menuRef}>
                        <div className="p-2 hover:bg-zinc-100 transition-all duration-300 cursor-pointer rounded-md">
                            <Bell strokeWidth={1} size={20} />
                        </div>
                        <div style={{
                            backgroundImage: `url(${user.avatar})`
                        }} className="w-8 h-8 rounded-full cursor-pointer bg-center bg-cover" onClick={() => setVisible((prev) => !prev)}></div>
                        {visible && (
                            <div className="absolute top-12 left-1 md:left-8 bg-white p-2 flex flex-col gap-2 items-center rounded-md transition-all duration-300 ease-in-out shadow-2xl shadow-black">
                                <NavigationLink to="/profile" text="Profile" />
                                <hr className="w-full border-zinc-400" />
                                <NavigationLink to="/blog" text="Blogs" />
                                <hr className="w-full border-zinc-400" />
                                <NavigationLink to="/write" text="Write" />
                                <hr className="w-full border-zinc-400" />
                                <Button
                                    text="Logout"
                                    variant="danger"
                                    size="sm"
                                    onClick={logoutUser}
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <Button
                        text="Get Started"
                        variant="secondary"
                        onClick={openModal} />
                )}
            </div>
        </div >
    );
};

export default NavBar;
