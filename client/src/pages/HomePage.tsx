import { Navigate, useNavigate } from "react-router-dom"
import FormModal from "../components/FormModal"
import NavBar from "../components/NavBar"
import userModalStore from "../store/userModalStore"

const HomePage = () => {

    const navigate = useNavigate();
    const { isOpen } = userModalStore()

    return (
        <div className="mx-auto">
            {isOpen &&
                <div className="w-full h-screen absolute flex justify-center items-center">

                    <FormModal />
                    <div className="w-full h-screen bg-gray-500 absolute z-10 opacity-60"></div>
                </div>
            }
            <NavBar />
            <div className="pt-20 px-32 w-full h-screen bg-radial from-yellow-100 to-amber-400 flex justify-center items-center">
                <div className="w-[800px] flex flex-col items-center justify-center gap-5">
                    <h1 className="text-[#003566] text-center font-bold text-6xl md:text-[90px] leading-none tracking-tighter font-[Albert_Sans]">Nesting Knowledge, Crafting Perspective</h1>

                    <p className="text-[#003566] text-center font-[Albert_Sans] font-medium tracking-tighter text-xl">Explore ideas, inspiring creativity & sharing perspectives </p>

                    <button onClick={() => navigate('/blog')} className="cursor-pointer text-[#003566] font-[Albert_Sans] mt-3 tracking-tight font-bold border-2 text-base border-[#003566] text-md p-3 px-6 bg-white">Start Reading</button>
                </div>
            </div>
        </div >
    )
}

export default HomePage