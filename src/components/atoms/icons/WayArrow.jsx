import StateIcon from "../ShipmentItem/StateIcon"


const WayArrow = ({ state = 0 }) => {
    return (
        <div className="w-full flex items-center relative justify-center">
            {(state !== 0) && <StateIcon state={state} />}
            <div className="h-0.5 bg-black w-full"></div>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
                <path d="M9 6.77344C9.55228 6.77344 10 6.32572 10 5.77344C10 5.22115 9.55228 4.77344 9 4.77344V5.77344V6.77344ZM0 5.77344L10 11.5469V-6.51919e-05L0 5.77344Z" fill="black" />
            </svg>
        </div>

    )
}

export default WayArrow