


const RadioItem = ({ label, id, setSelectedItem, selectedItem }) => {
    return (
        <div className="flex items-center gap-1" onClick={() => setSelectedItem(id)}>
            <label htmlFor={id}>{label}</label>
            <div className={"w-4 h-4 rounded-full " + `${(selectedItem == id) ? "bg-red" : "bg-none border"}`}></div>
        </div>
    )
}

export default RadioItem