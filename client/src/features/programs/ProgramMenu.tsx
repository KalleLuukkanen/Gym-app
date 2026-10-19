function ProgramMenu() {
    return (
        <div className="absolute z-50 top-full flex flex-col left-0 min-w-max items-center justify-center space-y-2 bg-white my-2 shadow-lg rounded-b p-1">
            <a href="/programs" className="w-fit hover:text-blue-500 hover:underline">My programs</a>
            <span className="border-1 border-gray-300 w-48" />
            <a href="/programs/new" className="w-fit hover:text-blue-500 hover:underline">Create new</a>
            <span className="border-1 border-gray-300 w-48" />
            <a href="programs/public" className="w-fit hover:text-blue-500 hover:underline">Public programs</a>
        </div>
    )
}
export default ProgramMenu;