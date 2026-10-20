import type { ExerciseInput, WorkoutInput } from "../../types/types";
import { capitalize } from "../../utils/helpers";
import { Plus, X } from "lucide-react";

function WorkoutForm({ position, workout, onChange, onRemove }:
    { position: number, workout: WorkoutInput, onChange: (updated: WorkoutInput) => void, onRemove: () => void }) {

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    const updateExercise = (index: number, updated: ExerciseInput) => {
        onChange({ ...workout, exercises: workout.exercises.map((e, i) => i === index ? updated : e) });
    };
    const addExercise = () => {
        onChange({ ...workout, exercises: [...workout.exercises, { name: "", target_sets: 3, min_reps: 8, max_reps: 12, }] });
    };
    const removeExercise = (index: number) => {
        onChange({ ...workout, exercises: workout.exercises.filter((_, i) => i !== index) });
    };

    return (
        <div className="flex flex-col rounded border border-gray-500 p-4 space-y-6">
            <div className="flex flex-col space-y-4">
                <label className="flex space-x-2 items-center">
                    <span>Name:</span>
                    <input
                        type="text"
                        value={workout.name}
                        placeholder={`Workout ${position}`}
                        onChange={(e) => onChange({ ...workout, name: e.target.value })}
                        className="p-0.5 border border-gray-300 rounded"
                        required
                    />
                    <button className="ml-auto cursor-pointer" title="Remove workout" onClick={onRemove} type="button"><X /></button>
                </label>
                <label className="flex space-x-2 items-center">
                    <span>Day:</span>
                    <select
                        className="p-0.5 border border-gray-300 rounded"
                        value={workout.day}
                        onChange={(e) => onChange({ ...workout, day: e.target.value })}
                        required
                    >
                        {days.map((d) => (
                            <option value={d}>
                                {capitalize(d)}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <span className="border border-gray-500" />
            <ul className="flex flex-wrap gap-2">
                {workout.exercises.map((ex, i) => (
                    <li className="border border-gray-300 rounded-lg p-2" key={i}>
                        <fieldset className="flex flex-col space-y-2">
                            <div className="flex">
                                <legend>Exercise {i + 1}</legend>
                                <button className="ml-auto cursor-pointer" title="Remove exercise" onClick={() => removeExercise(i)} type="button"><X /></button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <label className="flex flex-col">
                                    <span>Name:</span>
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded p-0.5 w-fit"
                                        onChange={(e) => updateExercise(i, { ...ex, name: e.target.value })}
                                        required
                                    />
                                </label>
                                <div className="flex flex-col space-y-1">
                                    <label>
                                        <span>Set target: </span>
                                        <input
                                            type="number"
                                            className="border border-gray-300 rounded p-0.5 w-16"
                                            required
                                            min="0"
                                            placeholder={`${ex.target_sets}`}
                                            onChange={(e) => updateExercise(i, { ...ex, target_sets: Number(e.target.value) })}
                                        />
                                    </label>
                                    <label>
                                        <span>Min. reps: </span>
                                        <input
                                            type="number"
                                            className="border border-gray-300 rounded p-0.5 w-16"
                                            required
                                            min="0"
                                            placeholder={`${ex.min_reps}`}
                                            onChange={(e) => updateExercise(i, { ...ex, min_reps: Number(e.target.value) })}
                                        />
                                    </label>
                                    <label>
                                        <span>Max reps: </span>
                                        <input
                                            type="number"
                                            className="border border-gray-300 rounded p-0.5 w-16"
                                            required
                                            min="0"
                                            placeholder={`${ex.max_reps}`}
                                            onChange={(e) => updateExercise(i, { ...ex, max_reps: Number(e.target.value) })}
                                        />
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </li>
                ))}
                <li className="flex">
                    <button className="mx-auto mt-4 mb-2 flex items-center justify-center cursor-pointer" onClick={addExercise} type="button">New exercise <Plus /></button>
                </li>
            </ul>

        </div>
    )
}

export default WorkoutForm;