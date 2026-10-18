export type Program = {
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
    public: boolean;
};

export type Workout = {
    id: number;
    name: string;
    program_id: number;
    day: string;
    archived_at: string | null;
};

export type WorkoutInput = {
    name: string;
    program_id: number;
    day: string;
};

export type Session = {
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

export type Exercise = {
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
    workout_id: number;
    position: number;
    target_sets: number;
    min_reps: number;
    max_reps: number;
};