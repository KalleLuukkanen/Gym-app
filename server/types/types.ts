export type WorkoutInput = {
    name: string;
    day: string;
    exercises: ExerciseInput[];
};

export type ExerciseInput = {
    name: string;
    position: number;
    target_sets: number;
    min_reps: number;
    max_reps: number;
};