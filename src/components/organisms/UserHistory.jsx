import { useState } from "react"
import ShipmentItem from "../molecules/ShipmentItem"
import HistoryFilter from "../molecules/HistoryFilter"



const UserHistory = () => {
    // filters:
    // 0 => all
    // 1 => pending
    // 2 => done
    // 3 => rejected

    const [filteredState, setFilteredState] = useState(0)
    return (
        <section className="flex flex-col gap-5 my-8">
            <HistoryFilter filteredState={filteredState} setFilteredState={setFilteredState} />
            <ShipmentItem state={1} />
            <ShipmentItem state={2} />
            <ShipmentItem state={3} />
        </section>
    )
}

export default UserHistory