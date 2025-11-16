

const ShipmentStateTitle = ({ state }) => {
    const stateTitles = {
        1: "تکمیل شده !",
        2: "در حال بررسی پیشنهاد",
        3: "پیشنهاد شما رد شد.",
    }
    return (
        <p className={`text-xl text-${(state == 2) ? "Yellow" : (state == 1) ? "Green" : (state == 3) ? "Red" : ""}`}>{stateTitles[state]}</p>
    )
}

export default ShipmentStateTitle