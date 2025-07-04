interface ButtonProp {
    text: string,
    variant: "primary" | "secondary" | "danger" | "outline" | "blueButton",
    size?: "sm" | "md" | "lg"
    roundedFull?: boolean
    widthFull?: boolean
    onClick?: () => void
    addtionalStyle?: string,
}

const variantStyle = {
    primary: "w-full font-[Clash_Display] bg-[#003566] text-white cursor-pointer hover:bg-[#003566e8] transition-all duration-300",
    secondary: "font-[Clash_Display] font-bold bg-amber-400 p-1.5 px-3 rounded-md cursor-pointer ring-blue-950 hover:ring-2 transition-all duration-300 ease-in-out",
    danger: "font-[Clash_Display] bg-red-600 text-white cursor-pointer hover:bg-red-500 transition-all duration-300 rounded-md",
    outline: "",
    blueButton: "font-[Clash_Display] bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-all duration-300 rounded-md"
}
const sizeStyle = {
    sm: "p-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "p-3"
}

const Button = ({ text, variant, size = "sm", roundedFull, widthFull, onClick }: ButtonProp) => {
    return (
        <button onClick={onClick} className={`${variantStyle[variant]} ${widthFull ? "w-full" : "w-fit"} ${roundedFull && "rounded-full"} ${sizeStyle[size]}`}>{text}</button>
    )
}

export default Button