import { useRef, useState } from "react"
import { CircleUserRound, Mail, Lock, FolderPen } from "lucide-react"
import userModalStore from "../store/userModalStore";
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from "react-router-dom";
import userStore from "../store/userStore";

const FormModal = () => {

    const navigate = useNavigate()

    const [type, setType] = useState("login");
    const { closeModal } = userModalStore()

    const { setUser } = userStore()

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fullName = useRef<HTMLInputElement>(null)
    const username = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)


    const toggleState = () => {
        if (type === "login") {
            setType("register")
        }
        else if (type === 'register') {
            setType("login")
        }
    }


    const userRegsiter = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/auth/register`, {
                fullName: fullName.current?.value,
                username: username.current?.value,
                email: email.current?.value,
                password: password.current?.value,
            }, { withCredentials: true })

            console.log(response.data)

            setTimeout(() => {
                toast.success("User Registered Successfully")
                navigate('/blog')
            }, 1500)

        } catch (error) {
            console.log(error)
            toast.error("Error in Registeration");
        }

    }
    const userLogin = async () => {
        try {
            console.log(email.current?.value)
            console.log(password.current?.value)
            const response = await axios.post(`${BACKEND_URL}/auth/login`, {
                email: email.current?.value,
                password: password.current?.value,
            }, { withCredentials: true })

            // console.log(response.data)

            setUser(response.data.user)
            setTimeout(() => {
                toast.success("Login Successfull")
                navigate('/blog')
            }, 1500)

        } catch (error) {
            console.log(error)
            toast.error("Username or Password is Wrong")
        }
    }

    return (
        <>
            <ToastContainer position="top-right" />
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
                    <div className="flex flex-col gap-5">

                        {type === "register" &&
                            <div className="flex flex-col gap-5">

                                <div className="w-full rounded-full border-zinc-500 bg-[#F1F1F1] flex items-center px-3">
                                    <FolderPen strokeWidth={1} />
                                    <input ref={fullName} className="w-full p-3 text-sm font-[Clash_Display] rounded-full outline-none bg-[#F1F1F1]" placeholder="FullName" />
                                </div>
                                <div className="w-full rounded-full border-zinc-500 bg-[#F1F1F1] flex items-center px-3">
                                    <CircleUserRound strokeWidth={1} />
                                    <input ref={username} className="w-full p-3 text-sm font-[Clash_Display] rounded-full outline-none bg-[#F1F1F1]" placeholder="Username" />
                                </div>

                            </div>
                        }
                        <div className="w-full rounded-full border-zinc-500 bg-[#F1F1F1] flex items-center px-3">
                            <Mail strokeWidth={1} />
                            <input ref={email} className="w-full p-3 text-sm font-[Clash_Display] rounded-full outline-none bg-[#F1F1F1]" placeholder="Email" />
                        </div>
                        <div className="w-full rounded-full border-zinc-500 bg-[#F1F1F1] flex items-center px-3">
                            <Lock strokeWidth={1} />
                            <input ref={password} className="w-full p-3 text-sm font-[Clash_Display] rounded-full outline-none bg-[#F1F1F1]" placeholder="Password (min 8 character)" type="password" />
                        </div>
                        {type === "register" ?
                            <button type="submit" className="w-full font-[Clash_Display] bg-[#003566] text-white p-3 rounded-full cursor-pointer hover:bg-[#003566e8] transition-all duration-300" onClick={userRegsiter}> Create an Account</button>
                            :
                            <button type="submit" className="w-full font-[Clash_Display] bg-[#003566] text-white p-3 rounded-full cursor-pointer hover:bg-[#003566e8] transition-all duration-300" onClick={userLogin}> Login</button>
                        }


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
        </>
    )
}

export default FormModal