import { NavLink } from "react-router-dom"

interface NavProps {
    text: string
    to: string
}

const NavigationLink = ({ to, text }: NavProps) => {
    return (
        <NavLink to={to}
            className={({ isActive }) => (isActive ? "font-bold font-[Clash_Display] text-sm text-[#003566]" : "text-[#003566] text-sm font-medium font-[Clash_Display]")}>{text}</NavLink>
    )
}

export default NavigationLink