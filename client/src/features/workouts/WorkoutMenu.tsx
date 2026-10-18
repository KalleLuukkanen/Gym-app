function WorkoutMenu() {
    return (
        <div className="absolute z-50 top-full flex flex-col left-0 min-w-max items-center justify-center space-y-2 bg-white my-2 shadow-lg rounded-b p-1">
            <button className="w-fit cursor-pointer">Past</button>
            <span className="border-1 border-gray-300 w-32" />
            <button className="w-fit cursor-pointer">Upcoming</button>
        </div>
    )

}
export default WorkoutMenu;