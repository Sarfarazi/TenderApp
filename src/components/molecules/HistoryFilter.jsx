import HistoryFilterItem from "../atoms/HistoryFilterItem"


const HistoryFilter = ({ filteredState, setFilteredState }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-2">
            <p className="text-lg text-center mb-2">فیلتر</p>
            <HistoryFilterItem filteredState={filteredState} setFilteredState={setFilteredState} state={0}content={"تمام سوابق شما"} />
            <div className="flex w-full gap-2">
                <HistoryFilterItem filteredState={filteredState} setFilteredState={setFilteredState} state={1} content={"تکمیل شده"} />
                <HistoryFilterItem filteredState={filteredState} setFilteredState={setFilteredState} state={2} content={"در انتظارتایید"} />
                <HistoryFilterItem filteredState={filteredState} setFilteredState={setFilteredState} state={3} content={"رد شده"} />
            </div>
        </div>
    )
}

export default HistoryFilter