interface TagProp {
    text: string,

}

const Tag = ({ text }: TagProp) => {
    return (
        <p
            className="text-zinc-600 bg-slate-200 w-fit rounded-full text-xs px-2 py-1 font-semibold font-[Albert_Sans]"
        >
            #{text}
        </p>
    )
}

export default Tag