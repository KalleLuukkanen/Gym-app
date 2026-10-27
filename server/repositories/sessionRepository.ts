import postgres from "postgres";

const sql = postgres();

const getAll = async (user_id: string) => {
    const result = await sql`
        SELECT *
        FROM workout_session
        WHERE user_id = ${user_id};
    `;
    return result;
};

const getOne = async (user_id: string, id: number) => {
    const result = await sql`
        SELECT *
        FROM workout_session
        WHERE user_id = ${user_id} AND id = ${id};
    `;
    return result[0];
};

const getByWorkout = async (user_id: string, workout_id: number) => {
    const result = await sql`
        SELECT *
        FROM workout_session
        WHERE user_id = ${user_id} AND workout_id = ${workout_id};
    `;
    return result;
};

const create = async (user_id: string, workout_id: number, date: string, notes: string | null) => {
    const result = await sql`
        INSERT INTO workout_session (user_id, workout_id, date, notes)
        VALUES (${user_id}, ${workout_id}, ${date}, ${notes})
        RETURNING *;
    `;
    return result[0];
};

const changeDate = async (user_id: string, id: number, new_date: string) => {
    const result = await sql`
        UPDATE workout_session
        SET date = ${new_date}
        WHERE user_id = ${user_id} AND id = ${id}
        RETURNING *;
    `;
    return result[0];
};

const addNotes = async (user_id: string, id: number, notes: string) => {
    const result = await sql`
        UPDATE workout_session
        SET notes = ${notes}
        WHERE user_id = ${user_id} AND id = ${id}
        RETURNING *;
    `;
    return result[0];
};

const deleteAll = async (user_id: string) => {
    const result = await sql`
        DELETE
        FROM workout_session
        WHERE user_id = ${user_id}
        RETURNING *;
    `;
    return result;
};

const deleteOne = async (user_id: string, id: number) => {
    const result = await sql`
        DELETE
        FROM workout_session
        WHERE user_id = ${user_id} AND id = ${id}
        RETURNING *;
    `;
    return result[0];
};

const startSession = async (user_id: string, workout_id: number, date: string) => {
    const result = await sql`
        INSERT INTO workout_session (user_id, workout_id, date, started_at)
        VALUES (${user_id}, ${workout_id}, ${date}, NOW())
        RETURNING *;
    `;
    return result[0];
};

const endSession = async (user_id: string, id: number, notes: string | null) => {
    const result = await sql`
        UPDATE workout_session
        SET finished_at = NOW(), notes = ${notes}
        WHERE user_id = ${user_id} AND id = ${id}
        RETURNING *;
    `;
    return result[0];
};

// get started but unfinished sessions of workout
const getStarted = async (user_id: string, workout_id: number) => {
    const result = await sql`
        SELECT *
        FROM workout_session
        WHERE user_id = ${user_id} AND workout_id = ${workout_id} AND started_at IS NOT NULL AND finished_at IS NULL
        ORDER BY started_at DESC;
    `;
    return result;
};

// get started but unfinished session
const getStartedAll = async (user_id: string) => {
    const result = await sql`
        SELECT *
        FROM workout_session
        WHERE user_id = ${user_id} AND started_at IS NOT NULL AND finished_at IS NULL
        ORDER BY started_at DESC;
    `;
    return result;
};

const finishAll = async (user_id: string) => {
    const result = await sql`
        UPDATE workout_session
        SET finished_at = NOW()
        WHERE user_id = ${user_id} AND finished_at IS NULL
        RETURNING *;
    `;
    return result;
};

const finishAllOfWorkout = async (user_id: string, workout_id: number) => {
    const result = await sql`
        UPDATE workout_session
        SET finished_at = NOW()
        WHERE user_id = ${user_id} AND workout_id = ${workout_id} AND finished_at IS NULL
        RETURNING *;
    `;
    return result;
};

// check if workout has a finished session on given date
const finishedWorkoutOnDate = async (user_id: string, workout_id: number, date: string) => {
    const result = await sql`
        SELECT *
        FROM workout_session
        WHERE user_id = ${user_id} AND workout_id = ${workout_id} AND finished_at::DATE = ${date};
    `;
    return result;
};

export { getAll, getOne, getByWorkout, create, changeDate, addNotes, deleteAll, deleteOne, startSession, endSession, getStarted, finishAll, getStartedAll, finishAllOfWorkout, finishedWorkoutOnDate };