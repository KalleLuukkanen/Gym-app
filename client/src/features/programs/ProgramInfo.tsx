import { useState } from "react";
import type { ProgramData } from "../../types/types";
import Program from "./Program";

function ProgramInfo({ program }: { program: ProgramData }) {

    const [showingDetails, setShowingDetails] = useState(false);

    if (!showingDetails) {
        return (
            <div>
                <>
                    <p className="text-xl">{program.name}</p>
                    <div className="ml-2">
                        <p className="text-lg">Created on: {new Date(program.created_at).toLocaleDateString("fi-FI")}</p>
                        <p className="text-lg">Your current active program? {program.active ? "Yes" : "No"}</p>
                        <p className="text-lg">Public or private? {program.public ? "Public" : "Private"}</p>
                        <p className="text-lg">Archived? {program.archived_at ? `Yes, on ${new Date(program.archived_at).toLocaleDateString("fi-FI")}` : "No"} </p>
                    </div>
                </>
                <button type="button" className="mt-6 text-lg cursor-pointer" onClick={() => setShowingDetails(true)}>See workout details</button>
            </div>
        )
    } else {
        return (
            <div>
                <Program program={program} />
                <button type="button" className="mt-6 text-lg cursor-pointer" onClick={() => setShowingDetails(false)}>Go back</button>
            </div>
        )
    }

}

export default ProgramInfo;