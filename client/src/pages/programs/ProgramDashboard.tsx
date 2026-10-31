import { useState, useEffect } from "react";
import * as programApi from "../../api/programApi";
import type { ProgramData } from "../../types/types";
import Loading from "../../components/Loading";
import Program from "../../features/programs/Program";
import ProgramInfo from "../../features/programs/ProgramInfo";

function ProgramDashboard() {

    const [loading, setLoading] = useState(true);

    const [programs, setPrograms] = useState<ProgramData[] | null>(null);
    const [currentProgram, setCurrentProgram] = useState<ProgramData | null>(null);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const programs = await programApi.getAll();
                if (cancelled) return;
                setPrograms(programs);
                if (programs.length > 0) {
                    const current = programs.find((p) => p.active);
                    if (current) setCurrentProgram(current);
                }
            } catch (error) {
                if (!cancelled) {
                    if (error instanceof Error) {
                        alert(error.message);
                    } else {
                        alert("Unknown error in the system, please try again later")
                    }
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
    }, []);



    if (loading) return <Loading />

    return (
        <div className="sm:grid sm:grid-cols-2">
            <div className="flex flex-col space-y-6 rounded shadow p-4">
                <span className="text-2xl font-bold">Current program:</span>
                {currentProgram ? <Program program={currentProgram} />
                    : <p>You don't have an active program.</p>
                }
            </div>
            <ul className="flex flex-col space-y-6 rounded shadow p-4">
                <span className="text-2xl font-bold">All my programs:</span>
                <span className="border flex my-4" />
                {programs?.map((p) => (
                    <li>
                        <ProgramInfo program={p} />
                        <span className="border flex my-4" />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProgramDashboard;