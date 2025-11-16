

const CustomPriceTitle = ({ state }) => {
    const stateTitles = {
        0: "پیشنهاد قیمت (تومان)",
        1: "کرایه پرداخت شده",
        2: "کرایه پیشنهاد شده",
        3: "کرایه پیشنهاد شده"
    }
    return (
        <p className="text-lg">{stateTitles[state]}</p>
    )
}

export default CustomPriceTitle