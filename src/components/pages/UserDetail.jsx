import { useState } from 'react'
import OverviewBox from '../organisms/OverviewBox'
import SignUpForm from '../organisms/SignUpForm'
import LogOutBtn from '../atoms/LogOutBtn'
import { useNavigate } from 'react-router-dom'
import SubmitBtn from '../atoms/SubmitBtn'




const UserDetail = () => {
    const [userInfo, setUserInfo] = useState({
        name: "علی اکرمی",
        mobile: "09121234567",
        carID: "373",
        vehicleBrand: "بنز 10 تن",
        cargoCapacity: "10",
        carNo: "12س43434"
    })
    const [isEditable, setIsEditable] = useState(false)
    const nav = useNavigate()
    return (
        <>
            <h1 className="text-2xl text-center my-8">اطلاعات شما</h1>
            <OverviewBox />
            <SignUpForm isAccountPage isEditable={isEditable} userInfo={userInfo} setIsEditable={setIsEditable} />
            {!isEditable &&
                <div className='mt-8'>
                    <SubmitBtn context={"ویرایش اطلاعات شخصی"} onClick={() => setIsEditable(true)} color={"red"} />
                </div>
            }

            <p className='text-center text-blue-900 cursor-pointer p-1 my-1 mt-8' onClick={() => nav('/dashboard')}>مشاهده سوابق بارهای حمل شده</p>
            <p className='text-center text-blue-900 cursor-pointer p-1 my-1' onClick={() => nav('/dashboard')}>مشاهده اطلاعات بارها</p>

            <LogOutBtn />
        </>
    )
}

export default UserDetail