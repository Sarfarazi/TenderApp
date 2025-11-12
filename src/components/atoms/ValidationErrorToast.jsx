import { useEffect, useState } from "react"


const ValidationErrorToast = ({ error, success }) => {
    const [isToastVisible, setIsToastVisible] = useState(true)

    useEffect(() => {
        if (isToastVisible) {
            setTimeout(() => {
                setIsToastVisible(false)
            }, 3000)
        }
        return () => { }
    }, [isToastVisible])

    return (
        <>
            {isToastVisible && <div className="w-full flex items-center justify-center fixed left-0 top-3/12">
                <div className={"px-8 py-6 text-white rounded-2xl w-4/5 text-center " + `${error ? "bg-red" : (success) ? "bg-green" : ""}`}>
                    <p>{error || success}</p>
                </div>
            </div>}
        </>
    )
}

export default ValidationErrorToast