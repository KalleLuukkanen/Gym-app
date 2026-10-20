import React, { useState } from "react";
import type { WorkoutInput } from "../../types/types";
import WorkoutForm from "../../features/workouts/WorkoutForm";
import { Plus } from "lucide-react";
import { createProgram } from "../../api/programApi";

function ProgramForm() {

    const [workouts, setWorkouts] = useState<WorkoutInput[]>([{ name: "", day: "monday", exercises: [{ name: "", target_sets: 3, min_reps: 8, max_reps: 12, }] }]);

    const updateWorkout = (index: number, updated: WorkoutInput) =>
        setWorkouts(prev => prev.map((w, i) => (i === index ? updated : w)));
    const addWorkout = () => setWorkouts(prev => [...prev, { name: "", day: "monday", exercises: [{ name: "", target_sets: 3, min_reps: 8, max_reps: 12, }] }]);
    const removeWorkout = (index: number) =>
        setWorkouts(prev => prev.filter((_, i) => i !== index));

    const [active, setActive] = useState<boolean>(true);
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");

        try {
            await createProgram({ name, active, isPublic }, workouts);
            setSuccessMessage("Program created successfully!")
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="flex flex-col p-4 rounded shadow-lg space-y-4">
            <p className="text-2xl">Create a new program:</p>
            <form className="sm:grid sm:grid-cols-[3fr_1fr] gap-2 flex flex-col" onSubmit={handleForm}>
                <ul className="flex flex-wrap gap-2">
                    {workouts.map((w, i) => (
                        <li key={i}>
                            <WorkoutForm
                                position={i + 1}
                                workout={w}
                                onChange={(updated) => updateWorkout(i, updated)}
                                onRemove={() => removeWorkout(i)}
                            />
                        </li>
                    ))}
                    <li className="flex items-center justify-center w-64 h-64 rounded border border-gray-500">
                        <button type="button" className="cursor-pointer" onClick={addWorkout} title="New workout">
                            <Plus size={50} />
                        </button>
                    </li>
                </ul>
                <div className="flex flex-col space-y-4">
                    <label className="flex flex-col space-y-1">
                        <span>What's the name of your program?</span>
                        <input
                            type="text"
                            className=" p-0.5 border border-gray-300 rounded"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <fieldset className="flex flex-col space-y-1">
                        <legend>Do you wish to make this your active program?</legend>
                        <div className="flex mx-auto space-x-4 justify-center items-center">
                            <label className="flex justify-center items-center space-x-1">
                                <input
                                    type="radio"
                                    name="active"
                                    value="false"
                                    required
                                    onChange={(e) => setActive(false)}
                                    checked={!active}
                                />
                                <span>No</span>
                            </label>
                            <label className="flex justify-center items-center space-x-1">
                                <input
                                    type="radio"
                                    name="active"
                                    value="true"
                                    required
                                    onChange={(e) => setActive(true)}
                                    checked={active}
                                />
                                <span>Yes</span>
                            </label>
                        </div>
                    </fieldset>
                    <fieldset className="flex flex-col space-y-1">
                        <legend>Do you wish to make this program public?</legend>
                        <div className="flex mx-auto space-x-4 justify-center items-center">
                            <label className="flex justify-center items-center space-x-1">
                                <input
                                    type="radio"
                                    name="public"
                                    value="false"
                                    required
                                    onChange={(e) => setIsPublic(false)}
                                    checked={!isPublic}
                                />
                                <span>No</span>
                            </label>
                            <label className="flex justify-center items-center space-x-1">
                                <input
                                    type="radio"
                                    name="public"
                                    value="true"
                                    required
                                    onChange={(e) => setIsPublic(true)}
                                    checked={isPublic}
                                />
                                <span>Yes</span>
                            </label>
                        </div>
                    </fieldset>
                    <button type="submit" className="cursor-pointer border rounded-lg text-xl mt-auto bg-gray-300">
                        Save
                    </button>
                    {errorMessage ? <p className="text-red-500 text-xl">{errorMessage}</p> : <p className="text-2xl">{successMessage}</p>}
                </div >
            </form >
        </div >
    )
}

export default ProgramForm;