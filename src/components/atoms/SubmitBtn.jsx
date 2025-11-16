

const SubmitBtn = ({ onClick, context, color, loading }) => {
    return (
        <>
            <div className={"w-full p-4 text-center rounded-2xl text-white flex items-center justify-center " + `bg-${color} ${loading && "pointer-events-none"}`} onClick={onClick}>
                {loading ?
                    <>
                        <span className="loading m-0"></span>
                    </>
                    :
                    <p className="text-center">
                        {context}
                    </p>
                }


            </div>
        </>
    )
}

export default SubmitBtn