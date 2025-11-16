

const DashboardTabs = ({ currentTab, setCurrentTab }) => {
    return (
        <div className={"flex items-center w-full justify-around " + `${(currentTab == "overview") && "mt-8"}`}>
            <p className={"text-center py-3 mx-3 text-xl cursor-pointer " + `${(currentTab == "todo") && "text-Red border-b-3"}`} onClick={() => setCurrentTab("todo")}>بارهای موجود</p>
            <p className={"text-center py-3 mx-3 text-xl cursor-pointer " + `${(currentTab == "overview") && "text-Red border-b-3"}`} onClick={() => setCurrentTab("overview")}>سوابق شما</p>
        </div>
    )
}

export default DashboardTabs