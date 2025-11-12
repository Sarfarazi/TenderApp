

const BoxLayout = ({ children, state }) => {
    return (
        <div className={"border px-8 py-6 rounded-2xl flex flex-col gap-5 items-center " + `${(state == 1) ? "border-yellow" : (state == 2) ? "border-green" : (state == 3) ? "border-red" : "border-black"}`}>
            {children}
        </div>

    )
}

export default BoxLayout