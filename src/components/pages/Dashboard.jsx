import { useContext, useEffect, useState } from "react"
import OverviewBox from "../organisms/OverviewBox"
import UserHistory from "../organisms/UserHistory"
import AvailableShipments from "../organisms/AvailableShipments"
import DashboardTabs from "../molecules/DashboardTabs"
import { useFetch } from "../../hooks/useFetch"
import BaseUrl from "../../BaseUrl"
import AuthContext from "../../context/AuthContext"

const Dashboard = () => {
    const [currentTab, setCurrentTab] = useState("todo")
    const { phone, token } = useContext(AuthContext);


    const { refetch, data, error, loading } = useFetch(
        `${BaseUrl}/api/Main/GetInfoDriverTenderByMobile/GetInfoDriverTenderByMobileAsync`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "mobile": phone,
            }),
        }
    );


    useEffect(() => {
        refetch()
    }, [])

    useEffect(() => {
        const typeDriver = data?.typeDriver
        if (typeDriver == 1) {
            localStorage.setItem("isCompany", false);
        }
        if (typeDriver == 2) {
            localStorage.setItem("isCompany", true);
        }
    }, [data])

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