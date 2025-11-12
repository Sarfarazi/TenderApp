

const ShipmentItemLoading = () => {
    return (
        <div className="loader border border-black/10 px-8 py-6 rounded-2xl flex flex-col gap-5 items-center">
            <div className="loader w-40 h-4 rounded-full bg-black/10"></div>
            <div className="loader w-full border-b border-black/10 pb-5">
                <div className="loader flex items-center justify-between w-full px-4 mb-1 h-4 rounded-full bg-black/10"></div>
                <div className="loader flex justify-between w-full">
                    <div className="loader flex flex-col items-center justify-center">
                        <div className='loader w-20 h-4 rounded-full bg-black/10'></div>
                        <div className='loader text-center text-sm h-4 rounded-full w-10 mt-1 bg-black/10'></div>
                    </div>
                    <div className="loader flex flex-col items-center justify-center">
                        <div className='loader w-20 h-4 rounded-full bg-black/10'></div>
                        <div className='loader text-center text-sm h-4 rounded-full w-10 mt-1 bg-black/10'></div>
                    </div>
                </div>
            </div>

            <div className="loader w-full border-b border-black/10 pb-5 flex flex-col gap-1">
                <div className="loader flex items-center gap-3">
                    <div className="loader w-5 h-5 rounded-md bg-black/10"></div>
                    <div className='loader w-full h-4 rounded-full bg-black/10'></div>
                </div>
                <div className="loader flex items-center gap-3">
                    <div className="loader w-5 h-5 rounded-md bg-black/10"></div>
                    <div className='loader w-full h-4 rounded-full bg-black/10'></div>
                </div>
            </div>

            <div className="loader w-full flex flex-col items-center justify-center gap-4">
                <div className="loader w-40 h-4 rounded-full bg-black/10"></div>
                <div className="loader w-20 h-4 rounded-full bg-black/10 mt-5"></div>
                <div className="loader rounded-2xl w-full overflow-hidden text-center h-14 text-white bg-black/10"></div>
                <div className="loader w-20 h-4 rounded-full bg-black/10"></div>
                <div className="loader rounded-2xl w-full overflow-hidden text-center h-12 text-white bg-black/10"></div>
            </div>
        </div>
    )
}

export default ShipmentItemLoading