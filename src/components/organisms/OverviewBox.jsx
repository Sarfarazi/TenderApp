import carpetSvg from '../../assets/icons/carpet.svg'
import truck from '../../assets/icons/truck.svg'
import dashbord from '../../assets/icons/dashbord.svg'

const OverviewBox = () => {
    return (
        <div className="w-full flex rounded-2xl shadow-2xl bg-white py-4 px-2">
            <div className='flex-1 flex items-center justify-center flex-col'>
                <img src={carpetSvg} alt="icon" className='w-4/5 h-[-webkit-fill-available] mb-1' />
                <div>
                    <p className='text-center text-Red text-lg'>20 تن بار</p>
                    <p className='text-center text-sm'>حمل شده</p>
                </div>
            </div>
            <div className='flex-1 flex items-center justify-center flex-col'>
                <img src={truck} alt="icon" className='w-4/5 h-[-webkit-fill-available] mb-1' />
                <div>
                    <p className='text-center text-Red text-lg'>56 سفر</p>
                    <p className='text-center text-sm'>با موفقیت</p>
                </div>
            </div>
            <div className='flex-1 flex items-center justify-center flex-col'>
                <img src={dashbord} alt="icon" className='w-4/5 h-[-webkit-fill-available] mb-1' />
                <div>
                    <p className='text-center text-Red text-lg'>1400 کیلومتر</p>
                    <p className='text-center text-sm'>طی شده</p>
                </div>
            </div>
        </div>
    )
}

export default OverviewBox