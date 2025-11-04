

const ValidationErrorToast = ({ error, success }) => {
    return (
        <div className="w-full flex items-center justify-center">
            <div className={"absolute top-3/12 px-8 py-6 text-white rounded-2xl w-4/5 text-center " + `${error ? "bg-red/80" : (success) ? "bg-green/80" : ""}`}>
                <p>{error || success}</p>
            </div>
        </div>
    )
}

export default ValidationErrorToast