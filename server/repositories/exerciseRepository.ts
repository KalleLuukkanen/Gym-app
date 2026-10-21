import postgres from "postgres";

const sql = postgres();

const getAll = async (user_id: string) => {
    const result = await sql`
        SELECT *
        FROM exercise
        WHERE user_id = ${user_id};
    `;
    return result;
};

const getOne = async (user_id: string, id: number) => {
    const result = await sql`
        SELECT *
        FROM exercise
        WHERE user_id = ${user_id} AND id = ${id};
    `;
    return result[0];
};

const getByWorkout = async (user_id: string, workout_id: number) => {
    const result = await sql`
        SELECT *
        FROM exercise
        WHERE user_id = ${user_id} AND workout_id = ${workout_id}
        ORDER BY position ASC;
    `;
    return result;
};

const create = async (user_id: string, name: string, position: number, target_sets: number, min_reps: number, max_reps: number, workout_id: number) => {
    const result = await sql`
        INSERT INTO exercise (user_id, name, position, target_sets, min_reps, max_reps, workout_id)
        VALUES (${user_id}, ${position}, ${name}, ${target_sets}, ${min_reps}, ${max_reps}, ${workout_id})
        RETURNING *;
    `;
    return result[0];
};

const modify = async (user_id: string, id: number, target_sets: number, min_reps: number, max_reps: number) => {
    const result = await sql`
        UPDATE exercise
        SET target_sets = ${target_sets}, min_reps = ${min_reps}, max_reps = ${max_reps}
        WHERE id = ${id} AND user_id = ${user_id}
        RETURNING *;
    `;
    return result[0];
};

const changeName = async (user_id: string, id: number, name: string) => {
    const result = await sql`
        UPDATE exercise
        SET name = ${name}
        WHERE user_id = ${user_id} AND id = ${id}
        RETURNING *;
    `;
    return result[0];
};

const changePosition = async (user_id: string, id: number, position: number) => {
    const result = await sql`
        UPDATE exercise
        SET position = ${position}
        WHERE user_id = ${user_id} AND id = ${id}
        RETURNING *;
    `;
    return result[0];
};

const deleteOne = async (user_id: string, id: number) => {
    const result = await sql`
        DELETE
        FROM exercise
        WHERE user_id = ${user_id} AND id = ${id}
        RETURNING *;
    `;
    return result[0];
};

const deleteAll = async (user_id: string) => {
    const result = await sql`
        DELETE
        FROM exercise
        WHERE user_id = ${user_id}
        RETURNING *;
    `;
    return result[0];
};

export { getAll, getOne, getByWorkout, create, modify, changeName, changePosition, deleteOne, deleteAll };