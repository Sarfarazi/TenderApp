

const DriverInfoHistory = ({ driverInfo }) => {
    return (
        <>
            <div className="bg-neutral-200 w-full rounded-2xl p-3 text-sm text-neutral-900">
                <p className="text-center text-lg">مشخصات راننده</p>
                <div className="flex items-center justify-between border-b border-b-neutral-400 p-2">
                    <p>نام راننده</p>
                    <p>{driverInfo.name}</p>
                </div>
                <div className="flex items-center justify-between border-b border-b-neutral-400 p-2">
                    <p>موبایل راننده</p>
                    <p>{driverInfo.mobile}</p>
                </div>
                <div className="flex items-center justify-between border-b border-b-neutral-400 p-2">
                    <p>نام تجاری خودرو</p>
                    <p>{driverInfo.vehicleBrand}</p>
                </div>
                <div className="flex items-center justify-between border-b border-b-neutral-400 p-2">
                    <p>ظرفیت خودرو</p>
                    <p>{driverInfo.cargoCapacity} تن</p>
                </div>
                <div className="flex items-center justify-between p-2">
                    <p>پلاک خودرو</p>
                    <div className="flex flex-row-reverse items-center justify-center">
                        <p>{driverInfo.carNo?.slice(0, 2)}</p>
                        -
                        <p>{driverInfo.carNo?.[2]}</p>
                        -
                        <p>{driverInfo.carNo?.slice(3, 6)}</p>
                        -
                        <p>{driverInfo.carNo?.slice(6, 8)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DriverInfoHistory