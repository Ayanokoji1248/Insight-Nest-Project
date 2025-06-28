import userModalStore from "../store/userModalStore"
import NavigationLink from "./NavigationLink"

const NavBar = () => {
    const { openModal } = userModalStore()
    return (
        <div className="w-full h-16 bg-white fixed flex items-center justify-between px-32">

            <div>
                <h1 className="font-black text-4xl font-[EB_Garamond] text-[#003566]">Insight Nest</h1>
            </div>

            <div className="flex gap-12 items-center">
                <NavigationLink to="/" text="Home" />
                <NavigationLink to="/about" text="About Us" />
                <button className="font-[Clash_Display] text-sm font-medium text-[#003566] cursor-pointer" onClick={openModal}>Write</button>
                <button className="font-[Clash_Display] text-sm font-medium text-[#003566] cursor-pointer" onClick={openModal}>Sign-In</button>
            </div>

            <div>
                <button className="font-[Clash_Display] font-bold bg-amber-400 p-1.5 px-3 rounded-md cursor-pointer ring-blue-950 hover:ring-2 transition-all duration-300 ease-in-out" onClick={openModal}>Get Started</button>
            </div>

        </div>
    )
}

export default NavBar