import { useState } from "react"


const FormModal = () => {

    const [type, setType] = useState("register")

    return (
        <div className="absolute bg-white w-108 h-96 rounded-xl z-40 backdrop-opacity-70 flex justify-center p-6 pt-3">
            <div className="w-full flex justify-end">
                <button className="w-fit h-fit flex justify-end text-3xl font-[Clash_Display] text-zinc-500 p-1 px-3 hover:bg-black transition-all hover:text-white duration-500 rounded-full  cursor-pointer">X</button>
            </div>

        </div>
    )
}

export default FormModal