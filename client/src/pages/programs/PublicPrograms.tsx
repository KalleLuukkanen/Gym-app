import { getPublic } from "../../api/programApi";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import type { ProgramData } from "../../types/types";
import PublicProgram from "../../features/programs/PublicProgram";

function PublicPrograms() {

    const [programs, setPrograms] = useState<ProgramData[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            try {
                const publicPrograms = await getPublic();
                if (cancelled) return;
                setPrograms(publicPrograms);
            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                } else {
                    alert("Unknown error in the system, please try again later")
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => { cancelled = true };
    }, []);


    if (loading) return <Loading />

    return (
        <div className="flex flex-col space-y-6">
            <div className="flex">
                <span className="text-2xl">Public programs</span>
            </div>
            <ul>
                {programs.map((p) => (
                    <li key={p.id}>
                        <PublicProgram program={p} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PublicPrograms;