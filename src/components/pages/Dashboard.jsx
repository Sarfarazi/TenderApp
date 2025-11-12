import { useState } from "react"
import OverviewBox from "../organisms/OverviewBox"
import UserHistory from "../organisms/UserHistory"
import AvailableShipments from "../organisms/AvailableShipments"
import DashboardTabs from "../molecules/DashboardTabs"

const Dashboard = () => {
    const [currentTab, setCurrentTab] = useState("todo")
    return (
        <>
            <h1 className="text-2xl text-center my-8">اطلاعات بارها</h1>

            {(currentTab == "overview") && <OverviewBox />}

            <DashboardTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />

            {(currentTab == "overview") && <UserHistory />}
            {(currentTab == "todo") && <AvailableShipments />}
        </>
    )
}

export default Dashboard