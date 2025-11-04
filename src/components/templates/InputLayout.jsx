import ValidationError from "../atoms/ValidationError"



const InputLayout = ({ children, label, error }) => {
    return (
        <div className="flex flex-col items-center gap-4 w-full">
            {label && <p>{label}</p>}

            <div className="border rounded-2xl w-full overflow-hidden" dir="ltr">
                {children}
            </div>
            {error && <ValidationError error={error} />}
        </div>
    )
}

export default InputLayout 