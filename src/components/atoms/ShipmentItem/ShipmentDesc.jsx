


const ShipmentDesc = ({ state, desc }) => {
    return (
        <div className="w-full border-b pb-5 flex flex-col gap-1">
            <div className="flex items-center gap-3">
                <div className={"w-5 h-5 rounded-md " + `${(state == 2) ? "bg-Yellow" : (state == 1) ? "bg-Green" : (state == 3) ? "bg-Red" : "bg-Red"}`}></div>
                <p>10 تن موکت تافتینگ</p>
            </div>
            <div className="flex items-center gap-3">
                <div className={"w-5 h-5 rounded-md " + `${(state == 2) ? "bg-Yellow" : (state == 1) ? "bg-Green" : (state == 3) ? "bg-Red" : "bg-Red"}`}></div>
                <p>4 تن اس پی سی</p>
            </div>
        </div>
    )
}

export default ShipmentDesc