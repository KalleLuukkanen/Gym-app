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

export { getAll, getOne, getByWorkout, create, changeDate, addNotes, deleteAll, deleteOne };