

const BoxLayout = ({ children, state }) => {
    const borderColor = (state == 1) ? "oklch(68.1% 0.162 75.834)" : (state == 2) ? "green" : (state == 3) ? "red" : "black"
    return (
        <div className="border px-8 py-6 rounded-2xl flex flex-col gap-5 items-center" style={{ borderColor: borderColor }}>
            {children}
        </div>

    )
}

export default BoxLayout