const HistoryFilterItem = ({ state, setFilteredState, filteredState, content, color }) => {
    return (
        <div className={`w-full px-2 py-4 rounded-2xl border border-${color} text-center ` + `${(filteredState == state) ? `bg-${color} text-white` : `text-${color}`}`} onClick={() => setFilteredState(state)}><p>{content}</p></div>
    )
}

export default HistoryFilterItem