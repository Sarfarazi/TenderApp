const HistoryFilterItem = ({ state, setFilteredState, filteredState, content}) => {
    const colors = ["Gray" , "Green" , "Yellow" , "Red"]
    return (
        <div className={`w-full px-2 py-4 rounded-2xl border border-${colors[state]} cursor-pointer text-center ` + `${(filteredState == state) ? `bg-${colors[state]}` : ""}`} onClick={() => setFilteredState(state)}>
            <p className={`${(filteredState == state) ? `text-white` : `text-${colors[state]}`}`}>{content}</p>
        </div>
    )
}

export default HistoryFilterItem