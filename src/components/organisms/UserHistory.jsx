import { useContext, useEffect, useState } from "react"
import ShipmentItem from "../molecules/ShipmentItem"
import HistoryFilter from "../molecules/HistoryFilter"
import { useFetch } from "../../hooks/useFetch"
import AuthContext from "../../context/AuthContext"
import ShipmentItemLoading from "../molecules/loading/ShipmentItemLoading"
import BaseUrl from "../../BaseUrl"



const UserHistory = () => {
    // filters:
    // 0 => all
    // 1 => done
    // 2 => pending
    // 3 => rejected

    const [filteredState, setFilteredState] = useState(0)
    const { phone, token } = useContext(AuthContext)
    const { refetch, data, error, loading, setData } = useFetch(
        `${BaseUrl}/api/Main/GetBarHistoryTender/GetBarHistoryTenderAsync`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "mobile": phone,
                "status": filteredState
            }),
        }
    );


    useEffect(() => {
        setData(null)
        refetch()
    }, [filteredState, token, phone])


    return (
        <section className="flex flex-col gap-5 my-8">
            <HistoryFilter filteredState={filteredState} setFilteredState={setFilteredState} />
            {loading && <>
                <ShipmentItemLoading key={1} />
                <ShipmentItemLoading key={2} />
            </>}

            {error && <p className="text-center mt-5 px-2 font-bold text-Red">{error}</p>}

            {!loading && !error && data && (
                <>
                    {data.map(item => {
                        return <ShipmentItem state={item.Status} data={item} key={item.Id} />
                    })}
                </>
            )}

        </section>
    )
}

export default UserHistory