import { useState } from "react"
import { CircleUserRound, Mail, Lock } from "lucide-react"
import userModalStore from "../store/userModalStore";

const FormModal = () => {

    const [type, setType] = useState("login");
    const { closeModal } = userModalStore()

    const toggleState = () => {
        if (type === "login") {
            setType("register")
        }
        else if (type === 'register') {
            setType("login")
        }
    }

    return (
        <div className="absolute bg-white w-96 rounded-xl z-40 backdrop-opacity-70 flex flex-col justify-between p-6 pt-3">
            <div className="w-full flex justify-end mb-3">
                <button className="w-fit h-fit flex justify-end text-xl font-[Clash_Display] text-zinc-500 p-1 px-3 hover:bg-black transition-all hover:text-white duration-500 rounded-full  cursor-pointer"
                    onClick={closeModal}
                >X</button>
            </div>

            <div className="flex flex-col gap-2 px-3">

                <div className="mb-3">
                    <h1 className="text-4xl text-[#003566] font-medium font-[Clash_Display] text-center">
                        {type === "register" ?
                            "Join InsightNest" : "Welcome Back"
                        }
                    </h1>
                </div>
                <div>
                    <form action="" className="flex flex-col gap-5">
                        {type === "register" &&
                            <div className="w-full rounded-full border-zinc-500 bg-[#F1F1F1] flex items-center px-3">
                                <CircleUserRound strokeWidth={1} />
                                <input className="w-full p-3 text-sm font-[Clash_Display] rounded-full outline-none bg-[#F1F1F1]" placeholder="Username" />
                            </div>
                        }
                        <div className="w-full rounded-full border-zinc-500 bg-[#F1F1F1] flex items-center px-3">
                            <Mail strokeWidth={1} />
                            <input className="w-full p-3 text-sm font-[Clash_Display] rounded-full outline-none bg-[#F1F1F1]" placeholder="Email" />
                        </div>
                        <div className="w-full rounded-full border-zinc-500 bg-[#F1F1F1] flex items-center px-3">
                            <Lock strokeWidth={1} />
                            <input className="w-full p-3 text-sm font-[Clash_Display] rounded-full outline-none bg-[#F1F1F1]" placeholder="Password" />
                        </div>
                        <button type="submit" className="w-full font-[Clash_Display] bg-[#003566] text-white p-3 rounded-full cursor-pointer hover:bg-[#003566e8] transition-all duration-300"> Create an Account</button>
                    </form>

                </div>

                <div>
                    {type === "register"
                        ?
                        <p className="text-sm px-3">Already have an account? <button className="text-[#003566] font-bold cursor-pointer" onClick={toggleState}>Login</button></p>
                        :
                        <p className="text-sm px-3">Don't have an account? <button className="text-[#003566] font-bold cursor-pointer" onClick={toggleState}>Create an Account</button></p>
                    }
                </div>
            </div>

        </div>
    )
}

export default FormModal