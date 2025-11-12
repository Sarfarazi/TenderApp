import WayArrow from "../icons/WayArrow"


const DestinationArrow = ({ state, from, to }) => {
    return (
        <div className="w-full border-b pb-5">
            <div className="flex items-center justify-between w-full px-4 mb-1">
                <div className="w-4.5 h-4.5 rounded-full shrink-0 bg-green"></div>

                <WayArrow state={state} />

                <div className="w-4.5 h-4.5 rounded-full shrink-0 bg-red mr-1"></div>
            </div>
            <div className="flex justify-between w-full">
                <div className="flex flex-col items-center justify-center">
                    <p className='text-center text-red text-lg'>{from}</p>
                    <p className='text-center text-sm'>انبار پالاز</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className='text-center text-red text-lg'>{to}</p>
                    <p className='text-center text-sm'>خانه پالاز</p>
                </div>
            </div>
        </div>

    )
}

export default DestinationArrow