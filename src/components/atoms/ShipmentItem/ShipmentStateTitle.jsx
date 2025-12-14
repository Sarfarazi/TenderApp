

const ShipmentStateTitle = ({ state }) => {
    const stateTitles = {
        1: "تکمیل شده !",
        2: "در حال بررسی پیشنهاد",
        3: "پیشنهاد شما رد شد.",
    }
    return (
        <p className={`text-xl ${(state == 2) ? "text-Yellow" : (state == 1) ? "text-Green" : (state == 3) ? "text-Red" : ""}`}>{stateTitles[state]}</p>
    )
}

export default ShipmentStateTitle