type Category =
    | "Technology"
    | "Health"
    | "Lifestyle"
    | "Education"
    | "Travel"
    | "Finance"
    | "Entertainment"
    | "Business"
    | "Development";

interface BadgeProp {
    category: string; // Allow string from anywhere
}

const styleBage: Record<Category, string> = {
    Technology: "bg-blue-500 text-white",
    Health: "bg-green-500 text-white",
    Lifestyle: "bg-pink-500 text-white",
    Education: "bg-yellow-500 text-black",
    Travel: "bg-teal-500 text-white",
    Finance: "bg-indigo-500 text-white",
    Entertainment: "bg-red-500 text-white",
    Business: "bg-gray-500 text-white",
    Development: "bg-purple-500 text-white",
};

const Badge = ({ category }: BadgeProp) => {
    const isValidCategory = (cat: string): cat is Category =>
        Object.keys(styleBage).includes(cat);

    const style = isValidCategory(category)
        ? styleBage[category]
        : "bg-gray-300 text-black";

    return (
        <p
            className={`font-medium font-[Clash_Display] text-xs md:text-sm p-3 py-1 rounded-full w-fit ${style}`}
        >
            {category || "Uncategorized"}
        </p>
    );
};
export default Badge