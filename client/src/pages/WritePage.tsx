import { useState } from "react"
import NavBar from "../components/NavBar"
import "highlight.js/styles/github.css";
import ReactQuill from "react-quill-new"
import 'react-quill-new/dist/quill.snow.css';
import { uploadImage } from "../utils/uploadImage";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import userStore from "../store/userStore";
import Button from "../components/Button";


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
    // Error in quill upload image in text editor
    // imageUploader: {
    //     upload: async (file: File) => {
    //         try {
    //             setTimeout(async () => {
    //                 const url = await uploadImage(file as File);
    //                 console.log(url)
    //                 return url // this url will be inserted into quill automatic
    //             }, 3000)
    //         } catch (error) {
    //             console.log(error)
    //             throw error;
    //         }
    //     }
    // }
};

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const WritePage = () => {

    const navigate = useNavigate();

    const { user } = userStore()

    const [category, setCategory] = useState("")
    const [title, setTitle] = useState("");
    const [image, setImage] = useState<File | undefined>();
    const [value, setValue] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tag, setTag] = useState("")


    const handleSubmit = async () => {
        const imageUrl = await uploadImage(image as File);
        try {
            const response = await axios.post(`${BACKEND_URL}/blog/create`, {
                title,
                content: value,
                image: imageUrl,
                category: category,
                tags
            }, { withCredentials: true })
            setTitle("");
            setCategory("");
            setValue("")
            setImage(undefined)
            toast.success(response.data.message);
            navigate('/blog')
        } catch (error) {
            console.log(error);
        }
    }

    const addTag = () => {
        if (tag.trim() !== "") {
            setTags((prevTags) => [...prevTags, tag.trim()]);
            setTag("");
        }
    }

    const deleteTag = (t: string) => {
        const tempTag = tags.filter((tag) => tag !== t)
        setTags(tempTag);
    }
    console.log(user)
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
                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Enter your title" className="font-[Albert_Sans] outline-none font-medium tracking-tight border-[1px] p-3 text-sm rounded-md border-indigo-950 focus:ring-[1px] transition-all duration-300" />
                        </div>
                        <div className="flex flex-col md:w-full gap-1">
                            <label htmlFor="category" className="font-[Albert_Sans] font-semibold tracking-tight">Select category:</label>
                            <select name="category" id="category" className="p-3 border-[1px] rounded-md border-sky-950 text-sm text-zinc-500 outline-none focus:ring-[1px] transition-all duration-300" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="" disabled hidden>Select your Category</option>
                                <option value="Technology" className="text-[Albert_Sans] text-sm">Technology</option>
                                <option value="Health" className="text-[Albert_Sans] text-sm">Health</option>
                                <option value="Lifestyle" className="text-[Albert_Sans] text-sm">Lifestyle</option>
                                <option value="Education" className="text-[Albert_Sans] text-sm">Education</option>
                                <option value="Travel" className="text-[Albert_Sans] text-sm">Travel</option>
                                <option value="Finance" className="text-[Albert_Sans] text-sm">Finance</option>
                                <option value="Entertainment" className="text-[Albert_Sans] text-sm">Entertainment</option>
                                <option value="Business" className="text-[Albert_Sans] text-sm">Business</option>
                                <option value="Development" className="text-[Albert_Sans] text-sm">Development</option>

                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 md:block md:space-x-4">
                        <label htmlFor="image" className="font-[Albert_Sans] font-semibold tracking-tight">Select Cover Image:</label>
                        <input onChange={(e) => {
                            const image = e.target.files?.[0]
                            if (image) {
                                setImage(image)
                            }
                        }} type="file" className="font-[Albert_Sans] outline-none font-semibold tracking-tight border-[1px] p-3 text-sm rounded-md border-indigo-950  cursor-pointer focus:ring-[1px] transition-all duration-300" />
                    </div>
                    <div className="hidden">
                        Preview of CoverImage
                    </div>

                    <div className="flex items-center gap-5">
                        <label htmlFor="tags" className="font-[Albert_Sans] font-semibold tracking-tight">Add Tags:</label>
                        <input value={tag} onChange={(e) => setTag(e.target.value)} type="text" className="font-[Albert_Sans] outline-none font-semibold tracking-tight border-[1px] p-3 text-sm rounded-md border-indigo-950  focus:ring-[1px] transition-all duration-300" placeholder="Enter tag" onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                e.preventDefault()
                                addTag()
                            }
                        }} />
                        <button onClick={addTag} className="py-1 px-3 bg-blue-500 text-white rounded-full text-sm">Add</button>
                    </div>
                    {tags?.length > 0 &&
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span className="text-sm px-2 py-1 rounded-full text-zinc-700 bg-zinc-200 flex items-center w-fit gap-2">#{tag} <button onClick={() => deleteTag(tag)} className="cursor-pointer bg-red-500 rounded-full px-1.5 text-white font-medium">x</button></span>

                            ))}
                        </div>
                    }

                    <div>
                        <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} />
                    </div>

                    {/* <button onClick={handleSubmit} className="px-4 py-2 w-fit bg-amber-300 rounded-lg font-[Clash_Display] font-semibold text-md cursor-pointer hover:ring-[1px] transition-all duration-300">Submit</button> */}
                    <Button
                        text="Submit"
                        variant="secondary"
                        widthFull={false}
                        onClick={handleSubmit}
                    />

                </div>
            </div>
        </>
    )
}

export default WritePage
