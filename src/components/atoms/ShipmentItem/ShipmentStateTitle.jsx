

const ShipmentStateTitle = ({ state }) => {
    const stateTitles = {
        1: "در حال بررسی پیشنهاد",
        2: "تکمیل شده !",
        3: "پیشنهاد شما رد شد.",
    }
    return (
        <p className={`text-xl text-${(state == 1) ? "yellow" : (state == 2) ? "green" : (state == 3) ? "red" : ""}`}>{stateTitles[state]}</p>
    )
}

export default ShipmentStateTitle