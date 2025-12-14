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
            {isToastVisible && <div className="w-full flex items-center justify-center fixed left-0 top-3/12 z-50">
                <div className={"px-8 py-6 text-white rounded-2xl w-4/5 max-w-xl text-center " + `${error ? "bg-Red" : (success) ? "bg-Green" : ""}`}>
                    <p>{error || success}</p>
                </div>
            </div>}
        </>
    )
}

export default ValidationErrorToast