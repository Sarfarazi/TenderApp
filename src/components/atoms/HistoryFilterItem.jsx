const HistoryFilterItem = ({ state, setFilteredState, filteredState, content }) => {
    const colors = ["Gray", "Green", "Yellow", "Red"]
    return (
        <div className={`w-full px-2 py-4 rounded-2xl border ${(state == 2) ? "border-Yellow" : (state == 1) ? "border-Green" : (state == 3) ? "border-Red" : "border-Gray"} cursor-pointer text-center `
            +
            `${(filteredState == state) ? `${(state == 2) ? "bg-Yellow" : (state == 1) ? "bg-Green" : (state == 3) ? "bg-Red" : "bg-Gray"}` : ""}`}
            onClick={() => setFilteredState(state)}>
            <p className={`${(filteredState == state) ? `text-white` : `${(state == 2) ? "text-Yellow" : (state == 1) ? "text-Green" : (state == 3) ? "text-Red" : "text-Gray"}`}`}>
                {content}
            </p>
        </div>
    )
}

export default HistoryFilterItem