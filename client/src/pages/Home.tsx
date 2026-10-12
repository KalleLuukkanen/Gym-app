import { useToday } from "../hooks/useToday";

export default function Home() {
    const today = useToday();

    return (
        <div className="sm:grid sm:grid-cols-2 gap-2 flex flex-col">
            <div className="flex flex-col rounded shadow p-2">
                <p className="text-2xl">Todays workout:</p>
            </div>
            <div className="flex flex-col rounded shadow p-2">
                <p className="text-2xl">Current program:</p>
            </div>
        </div>
    )
}