import postgres from "postgres";

const sql = postgres();

const getAll = async (user_id: string) => {
    const result = await sql`
        SELECT * 
        FROM program
        WHERE user_id = ${user_id}
        ORDER BY created_at DESC;
    `;
    return result;
};

const getOne = async (user_id: string, id: number) => {
    const result = await sql`
        SELECT * 
        FROM program
        WHERE user_id = ${user_id} AND id = ${id};
    `;
    return result[0];
};

const getCurrent = async (user_id: string) => {
    const result = await sql`
        SELECT * 
        FROM program
        WHERE user_id = ${user_id} AND active = true;
    `;
    return result[0];
};

const getArchived = async (user_id: string) => {
    const result = await sql`
        SELECT * 
        FROM program
        WHERE user_id = ${user_id} AND archived_at IS NOT NULL
        ORDER BY archived_at DESC;
    `;
    return result;
};

const getNonArchived = async (user_id: string) => {
    const result = await sql`
        SELECT * 
        FROM program
        WHERE user_id = ${user_id} AND archived_at IS NULL
        ORDER BY created_at DESC;
    `;
    return result;
};

const setActive = async (user_id: string, id: number) => {
    const result = await sql.begin(async (sql) => {
        await sql`
            UPDATE program
            SET active = false
            WHERE user_id = ${user_id} AND active;
        `;
        const result = await sql`
            UPDATE program
            SET active = true
            WHERE user_id = ${user_id} AND id = ${id}
            RETURNING *;
        `;
        return result;
    });
    return result[0];
};

const create = async (user_id: string, name: string, active = false) => {
    return await sql.begin(async (sql) => {
        if (active) {
            await sql`
                UPDATE program
                SET active = false
                WHERE user_id = ${user_id} AND active`;
        }

        const [program] = await sql`
            INSERT INTO program (name, user_id, active)
            VALUES (${name}, ${user_id}, ${active})
            RETURNING *`;

        return program;
    });
};

const updateName = async (user_id: string, new_name: string, id: number) => {
    const result = await sql`
        UPDATE program
        SET name = ${new_name}
        WHERE user_id = ${user_id} AND id = ${id}
        RETURNING *;
    `;
    return result[0];
};

const setInactive = async (user_id: string, id: number) => {
    const result = await sql`
        UPDATE program
        SET active = false
        WHERE user_id = ${user_id} AND id = ${id}
        RETURNING *;
    `;
    return result[0];
};

const archive = async (user_id: string, id: number) => {
    const result = await sql`
        UPDATE program
        SET archived_at = NOW(), active = false
        WHERE user_id = ${user_id} AND id = ${id} AND archived_at IS NULL
        RETURNING *;
    `;
    return result[0];
};

const deleteOne = async (user_id: string, id: number) => {
    const result = await sql`
        DELETE
        FROM program
        WHERE user_id = ${user_id} AND id = ${id}
        RETURNING *;
    `;
    return result[0];
};

const deleteAll = async (user_id: string) => {
    const result = await sql`
        DELETE
        FROM program
        WHERE user_id = ${user_id}
        RETURNING *;
    `;
    return result;
};

export { getAll, getOne, getCurrent, getArchived, getNonArchived, create, updateName, setActive, setInactive, archive, deleteOne, deleteAll };