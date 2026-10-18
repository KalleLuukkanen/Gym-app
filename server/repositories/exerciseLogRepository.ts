import postgres from "postgres";

const sql = postgres();

const getAll = async (user_id: string) => {
    const result = await sql`
        SELECT *
        FROM exercise_log
        WHERE user_id = ${user_id};
    `;
    return result;
};

const getOne = async (user_id: string, id: number) => {
    const result = await sql`
        SELECT *
        FROM exercise_log
        WHERE user_id = ${user_id} AND id = ${id};
    `;
    return result[0];
};

const getBySession = async (user_id: string, session_id: number) => {
    const result = await sql`
        SELECT *
        FROM exercise_log
        WHERE user_id = ${user_id} AND session_id = ${session_id};
    `;
    return result;
};

const getByExercise = async (user_id: string, exercise_id: number) => {
    const result = await sql`
        SELECT *
        FROM exercise_log
        WHERE user_id = ${user_id} AND exercise_id = ${exercise_id};
    `;
    return result;
};

const create = async (user_id: string, exercise_id: number, session_id: number, set_number: number, reps: number, weight: number) => {
    const result = await sql`
        INSERT INTO exercise_log (user_id, exercise_id, session_id, set_number, reps, weight)
        VALUES (${user_id}, ${exercise_id}, ${session_id}, ${set_number}, ${reps}, ${weight})
        RETURNING *;
    `;
    return result[0];
};

const modify = async (user_id: string, set_number: number, reps: number, weight: number) => {
    const result = await sql`
        UPDATE exercise_log
        SET set_number = ${set_number}, reps = ${reps}, weight = ${weight}
        RETURNING *
    `;
    return result[0];
};

const deleteOne = async (user_id: string, id: number) => {
    const result = await sql`
        DELETE
        FROM exercise_log
        WHERE user_id = ${user_id} AND id = ${id}
        RETURNING *;
    `;
    return result[0];
};

const deleteAll = async (user_id: string) => {
    const result = await sql`
        DELETE
        FROM exercise_log
        WHERE user_id = ${user_id}
        RETURNING *;
    `;
    return result;
};

export { getAll, getOne, getBySession, getByExercise, create, modify, deleteOne, deleteAll };