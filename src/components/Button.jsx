/* eslint-disable react/prop-types */
export default function Button({
    text,
    className = "",
    type = "button",
    ...props
}) {
    

    return (
        <button type={type} className={`px-4 py-2 rounded-lg bg-blue-600 text-white ${className}`} {...props}>
            {text}
        </button>
    )
}
