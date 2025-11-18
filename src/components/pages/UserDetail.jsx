import { useContext, useEffect, useState } from 'react'
import OverviewBox from '../organisms/OverviewBox'
import SignUpForm from '../organisms/SignUpForm'
import LogOutBtn from '../atoms/LogOutBtn'
import { useNavigate } from 'react-router-dom'
import SubmitBtn from '../atoms/SubmitBtn'
import { useFetch } from '../../hooks/useFetch'
import AuthContext from '../../context/AuthContext'
import SignUpLoading from '../molecules/loading/SingUpLoading'




const UserDetail = () => {
    const { phone, token } = useContext(AuthContext)
    const { refetch, data, error, loading } = useFetch(
        `https://tenapi.palaz.com/api/Main/GetInfoDriverTenderByMobile/GetInfoDriverTenderByMobileAsync`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "mobile": phone,
            }),
        }
    );


    useEffect(() => {
        refetch()
    }, [])

    const [isEditable, setIsEditable] = useState(false)
    const nav = useNavigate()
    return (
        <>
            <h1 className="text-2xl text-center my-8">اطلاعات شما</h1>
            <OverviewBox />

            {loading && <SignUpLoading />}

            {error && <p className="text-center mt-10 font-bold text-Red">{error}</p>}

            {!loading && !error && data && (
                <>
                    <SignUpForm
                        isAccountPage
                        isEditable={isEditable}
                        userInfo={data}
                        setIsEditable={setIsEditable}
                    />

                    {!isEditable && (
                        <div className="mt-8">
                            <SubmitBtn
                                context={"ویرایش اطلاعات شخصی"}
                                onClick={() => setIsEditable(true)}
                                color={"Red"}
                            />
                        </div>
                    )}
                </>
            )}

            <p className='text-center text-blue-900 cursor-pointer p-1 my-1 mt-8' onClick={() => nav('/dashboard')}>مشاهده سوابق بارهای حمل شده</p>
            <p className='text-center text-blue-900 cursor-pointer p-1 my-1' onClick={() => nav('/dashboard')}>مشاهده اطلاعات بارها</p>

            <LogOutBtn />
        </>
    )
}

export default UserDetail