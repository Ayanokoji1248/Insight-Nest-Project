import userModalStore from "../store/userModalStore"
import userStore from "../store/userStore"
import NavigationLink from "./NavigationLink"
import { Bell } from "lucide-react"

const NavBar = () => {
    const { openModal } = userModalStore()
    const { user } = userStore()
    return (
        <div className="w-full h-16 bg-white fixed flex items-center justify-between px-32">

            <div>
                <h1 className="font-black text-4xl font-[EB_Garamond] text-[#003566]">Insight Nest</h1>
            </div>

            <div className="flex gap-12 items-center">
                {user ?
                    <>
                        <NavigationLink to="/blog" text="Blogs" />
                        <NavigationLink to="/search" text="Search" />
                        <NavigationLink to="/write" text="Write" />
                    </>
                    :
                    <>
                        <NavigationLink to="/" text="Home" />
                        <NavigationLink to="/about" text="About Us" />
                        <button className="font-[Clash_Display] text-sm font-medium text-[#003566] cursor-pointer" onClick={openModal}>Write</button>
                        <button className="font-[Clash_Display] text-sm font-medium text-[#003566] cursor-pointer" onClick={openModal}>Sign-In</button>
                    </>
                }
            </div>

            <div>
                {user ?
                    <div className="flex items-center gap-4">
                        <div className="p-2 hover:bg-zinc-100 transition-all duration-300 cursor-pointer rounded-md">
                            <Bell strokeWidth={1} size={20} />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-amber-400"></div>
                    </div > :
                    <button className="font-[Clash_Display] font-bold bg-amber-400 p-1.5 px-3 rounded-md cursor-pointer ring-blue-950 hover:ring-2 transition-all duration-300 ease-in-out" onClick={openModal}>Get Started</button>
                }
            </div>

        </div>
    )
}

export default NavBar