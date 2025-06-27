import FormModal from "../components/FormModal"
import NavBar from "../components/NavBar"

const HomePage = () => {
    return (
        <div className="mx-auto">
            <div className="w-full h-screen absolute flex justify-center items-center">

                <FormModal />
                <div className="w-full h-screen bg-gray-500 absolute z-10 opacity-60"></div>
            </div>
            <NavBar />
            <div className="pt-20 px-32 w-full h-screen bg-[#FFC300]">HomePage</div>
        </div>
    )
}

export default HomePage