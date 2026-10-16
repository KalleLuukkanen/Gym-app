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

const create = async (user_id: string, name: string) => {
    const result = await sql`
        INSERT INTO exercise (user_id, name)
        VALUES (${user_id}, ${name})
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
    return result;
};

export { getAll, getOne, create, deleteOne, deleteAll };