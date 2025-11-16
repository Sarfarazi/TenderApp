const HistoryFilterItem = ({ state, setFilteredState, filteredState, content, color }) => {
    return (
        <div className={`w-full px-2 py-4 rounded-2xl border border-${color} cursor-pointer text-center ` + `${(filteredState == state) ? `bg-${color}` : ""}`} onClick={() => setFilteredState(state)}>
            <p className={`${(filteredState == state) ? `text-white` : `text-${color}`}`}>{content}</p>
        </div>
    )
}

export default HistoryFilterItem