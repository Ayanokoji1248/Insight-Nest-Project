import { useState } from "react"
import NavBar from "../components/NavBar"
import "highlight.js/styles/github.css";
import ReactQuill from "react-quill-new"
import 'react-quill-new/dist/quill.snow.css';

const modules = {

    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }], // ✅ add this line
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"], // ✅ code block
        ["link", "image"],
        ["clean"],
    ],
};



const WritePage = () => {
    const [category, setCategory] = useState("")

    const [value, setValue] = useState("");

    return (
        <>
            <NavBar />
            <div className="pt-24 max-w-7xl mx-auto min-h-screen  px-2">
                <div>
                    <h1 className="text-3xl font-[Clash_Display] font-semibold text-black pl-4 border-l-8 border-amber-400">Share your story</h1>
                </div>

                <div className="mt-5 p-5 flex flex-col gap-5">
                    <div className="flex flex-col md:flex-row md:w-full gap-5">
                        <div className="flex flex-col md:w-full gap-1">
                            <label htmlFor="title" className="font-[Albert_Sans] font-semibold tracking-tight">Title:</label>
                            <input type="text" placeholder="Enter your title" className="font-[Albert_Sans] outline-none font-medium tracking-tight border-[1px] p-3 text-sm rounded-md border-indigo-950 focus:ring-[1px] transition-all duration-300" />
                        </div>
                        <div className="flex flex-col md:w-full gap-1">
                            <label htmlFor="category" className="font-[Albert_Sans] font-semibold tracking-tight">Select category:</label>
                            <select name="category" id="category" className="p-3 border-[1px] rounded-md border-sky-950 text-sm text-zinc-500 outline-none focus:ring-[1px] transition-all duration-300" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="" disabled hidden>Select your Category</option>
                                <option value="health" className="text-[Albert_Sans] text-sm">Health</option>
                                <option value="development" className="text-[Albert_Sans] text-sm">Development</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 md:block md:space-x-4">
                        <label htmlFor="image" className="font-[Albert_Sans] font-semibold tracking-tight">Select Cover Image:</label>
                        <input type="file" className="font-[Albert_Sans] outline-none font-semibold tracking-tight border-[1px] p-3 text-sm rounded-md border-indigo-950  cursor-pointer focus:ring-[1px] transition-all duration-300" />
                    </div>
                    <div className="hidden">
                        Preview of CoverImage
                    </div>

                    <div>
                        <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} />
                    </div>

                    <button className="px-4 py-2 w-fit bg-amber-300 rounded-lg font-[Clash_Display] font-semibold text-md cursor-pointer hover:ring-[1px] transition-all duration-300">Submit</button>

                </div>
            </div>
        </>
    )
}

export default WritePage
