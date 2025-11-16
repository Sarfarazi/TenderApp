

const BoxLayout = ({ children, state }) => {
    return (
        <div className={"border px-8 py-6 rounded-2xl flex flex-col gap-5 items-center " + `${(state == 2) ? "border-Yellow" : (state == 1) ? "border-Green" : (state == 3) ? "border-Red" : "border-black"}`}>
            {children}
        </div>

    )
}

export default BoxLayout