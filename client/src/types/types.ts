export type ProgramData = {
    id: number;
    name: string;
    active: boolean;
    public: boolean;
    archived_at: string | null;
    created_at: string;
};

export type ProgramInput = {
    name: string;
    active: boolean;
    isPublic: boolean;
};

export type WorkoutData = {
    id: number;
    name: string;
    program_id: number;
    day: string;
    archived_at: string | null;
};

export type WorkoutInput = {
    name: string;
    day: string;
    exercises: ExerciseInput[];
};

export type SessionData = {
    id: number;
    workout_id: number;
    date: string;
    notes: string | null;
};

export type SessionInput = {
    workout_id: number;
    date: string;
    notes: string | null;
};

export type ExerciseData = {
    id: number;
    name: string;
    workout_id: number;
    position: number;
    target_sets: number;
    min_reps: number;
    max_reps: number;
};

export type ExerciseInput = {
    name: string;
    target_sets: number;
    min_reps: number;
    max_reps: number;
};

export type LogData = {
    id: number;
    session_id: number;
    exercise_id: number;
    set_number: number;
    reps: number;
    weight: number;
};

export type LogInput = {
    session_id: number;
    exercise_id: number;
    set_number: number;
    reps: number;
    weight: number;
};