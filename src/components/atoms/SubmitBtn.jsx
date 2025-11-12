

const SubmitBtn = ({ onClick, context, color, loading }) => {
    return (
        <>
            <div className={"w-full p-4 text-center rounded-2xl text-white " + `bg-${color}`} onClick={onClick}>
                {loading ?
                    <>
                        <p>loading</p>
                    </>
                    :
                    <p>
                        {context}
                    </p>
                }


            </div>
        </>
    )
}

export default SubmitBtn