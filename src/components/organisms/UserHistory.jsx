import { useState } from "react"
import ShipmentItem from "../molecules/ShipmentItem"



const UserHistory = () => {
    // filters:
    // 0 => all
    // 1 => pending
    // 2 => done
    // 3 => rejected

    const [filteredState, setFilteredState] = useState(0)
    return (
        <section className="flex flex-col gap-5 my-8">

            <div className="flex flex-col items-center justify-center w-full gap-2">
                <p className="text-lg text-center mb-2">فیلتر</p>
                <div className={"w-full px-2 py-4 rounded-2xl border border-neutral-600 text-center " + `${(filteredState == 0) ? "bg-neutral-600 text-white" : "text-neutral-600"}`} onClick={() => setFilteredState(0)}><p>تمام سوابق شما</p></div>
                <div className="flex w-full gap-2">
                    <div className={"w-full px-2 py-4 rounded-2xl border border-green text-center " + `${(filteredState == 2) ? "bg-green text-white" : "text-green"}`} onClick={() => setFilteredState(2)}><p>تکمیل شده</p></div>
                    <div className={"w-full px-2 py-4 rounded-2xl border border-yellow text-center " + `${(filteredState == 1) ? "bg-yellow text-white" : "text-yellow"}`} onClick={() => setFilteredState(1)}><p>در انتظارتایید</p></div>
                    <div className={"w-full px-2 py-4 rounded-2xl border border-red text-center " + `${(filteredState == 3) ? "bg-red text-white" : "text-red"}`} onClick={() => setFilteredState(3)}><p>رد شده</p></div>
                </div>
            </div>
            <ShipmentItem state={1} />
            <ShipmentItem state={2} />
            <ShipmentItem state={3} />
        </section>
    )
}

export default UserHistory