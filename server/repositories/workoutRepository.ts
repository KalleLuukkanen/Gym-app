import postgres from "postgres";

const sql = postgres();

const getAll = async (user_id: string) => {
    const result = await sql`
        SELECT *
        FROM workout
        WHERE user_id = ${user_id};
    `;
    return result;
};

const getOne = async (user_id: string, id: number) => {
    const result = await sql`
        SELECT *
        FROM workout
        WHERE user_id = ${user_id} AND id = ${id};
    `;
    return result[0];
};

const getByProgram = async (user_id: string, program_id: number) => {
    const result = await sql`
        SELECT *
        FROM workout
        WHERE user_id = ${user_id} AND program_id = ${program_id};
    `;
    return result;
};

const getByDay = async (user_id: string, day: string, program_id: number) => {
    const result = await sql`
        SELECT *
        FROM workout
        WHERE user_id = ${user_id} AND program_id = ${program_id} AND day = ${day};
    `;
    return result[0];
};

const create = async (user_id: string, name: string, day: string, program_id: number) => {
    const result = await sql`
        INSERT INTO workout (name, user_id, program_id, day)
        VALUES (${name}, ${user_id}, ${program_id}, ${day})
        RETURNING *;
    `;
    return result[0];
};

const deleteOne = async (user_id: string, id: number) => {
    const result = await sql`
        DELETE
        FROM workout
        WHERE user_id = ${user_id} AND id = ${id}
        RETURNING *;
    `;
    return result[0];
};

const deleteAll = async (user_id: string) => {
    const result = await sql`
        DELETE
        FROM workout
        WHERE user_id = ${user_id}
        RETURNING *;
    `;
    return result;
};

export { getAll, getOne, getByProgram, getByDay, create, deleteAll, deleteOne };