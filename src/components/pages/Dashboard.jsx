import { useState } from "react"
import OverviewBox from "../organisms/OverviewBox"
import UserHistory from "../organisms/UserHistory"
import AvailableShipments from "../organisms/AvailableShipments"

const Dashboard = () => {
    const [currentTab, setCurrentTab] = useState("todo")
    return (
        <>
            <h1 className="text-2xl text-center my-8">اطلاعات بارها</h1>

            {(currentTab == "overview") && <OverviewBox />}

            <div className={"flex items-center w-full justify-around " + `${(currentTab == "overview") && "mt-8"}`}>
                <p className={"text-center py-3 mx-3 text-xl " + `${(currentTab == "todo") && "text-red border-b-3"}`} onClick={() => setCurrentTab("todo")}>بارهای موجود</p>
                <p className={"text-center py-3 mx-3 text-xl " + `${(currentTab == "overview") && "text-red border-b-3"}`} onClick={() => setCurrentTab("overview")}>سوابق شما</p>
            </div>

            {(currentTab == "overview") && <UserHistory />}
            {(currentTab == "todo") && <AvailableShipments />}
        </>
    )
}

export default Dashboard