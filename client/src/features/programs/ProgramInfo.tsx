import { useState } from "react";
import type { ProgramData } from "../../types/types";
import Program from "./Program";

function ProgramInfo({ program }: { program: ProgramData }) {

    const [showingAll, setShowingAll] = useState(false);

    if (!showingAll) {
        return (
            <div>
                <>
                    <p className="text-xl">{program.name}</p>
                    <p className="text-lg">Created on: {new Date(program.created_at).toLocaleDateString("fi-FI")}</p>
                    <p className="text-lg">Your current active program? {program.active ? "Yes" : "No"}</p>
                    <p className="text-lg">Public or private? {program.public ? "Public" : "Private"}</p>
                    <p className="text-lg">Archived? {program.archived_at ? `Yes, on ${new Date(program.archived_at).toLocaleDateString("fi-FI")}` : "No"} </p>
                </>
                <button type="button" className="mt-6 text-lg cursor-pointer" onClick={() => setShowingAll(true)}>See workout details</button>
            </div>
        )
    } else {
        <Program program={program} />
    }

}

export default ProgramInfo;