/* eslint-disable react/prop-types */
export default function Button({
    text,
    className = "",
    type = "button",
    bgcolor = "bg-blue-600",
    ...props
}) {
    

    return (
        <button type={type} className={`px-4 py-2 rounded-lg text-white ${className} ${bgcolor}`} {...props}>
            {text}
        </button>
    )
}
