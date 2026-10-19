import postgres from "postgres";
import * as types from "../types/types.js";

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

const getPublic = async () => {
    const result = await sql`
        SELECT *
        FROM program
        WHERE public = true;
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

// creates also workouts and exercises
const createProgram = async (
    user_id: string,
    input: {
        name: string;
        active?: boolean;
        isPublic?: boolean;
        workouts: types.WorkoutInput[];
    }
) => {
    const { name, active = false, isPublic = false, workouts } = input;

    return await sql.begin(async (sql) => {
        if (active) {
            await sql`
                UPDATE program
                SET active = false
                WHERE user_id = ${user_id} AND active`;
        }

        const [program] = await sql`
            INSERT INTO program (name, user_id, active, public)
            VALUES (${name}, ${user_id}, ${active}, ${isPublic})
            RETURNING *`;

        for (const w of workouts) {
            const [workout] = await sql`
                INSERT INTO workout (name, user_id, program_id, day)
                VALUES (${w.name}, ${user_id}, ${program.id}, ${w.day})
                RETURNING id`;

            for (const [ei, e] of w.exercises.entries()) {
                await sql`
                    INSERT INTO exercise
                        (name, workout_id, user_id, position, target_sets, min_reps, max_reps)
                    VALUES
                        (${e.name.trim()}, ${workout.id}, ${user_id}, ${ei + 1},
                        ${e.target_sets}, ${e.min_reps}, ${e.max_reps})`;
            }
        }
        return program;
    });
};

const makePublic = async (user_id: string, id: number) => {
    const result = await sql`
        UPDATE program
        SET public = true
        WHERE user_id = ${user_id} AND = id = ${id}
        RETURNING *;
        `;
    return result[0];
};

const makePrivate = async (user_id: string, id: number) => {
    const result = await sql`
        UPDATE program
        SET public = false
        WHERE user_id = ${user_id} AND = id = ${id}
        RETURNING *;
        `;
    return result[0];
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

export { getAll, getOne, getCurrent, getArchived, getNonArchived, create, updateName, setActive, setInactive, archive, deleteOne, deleteAll, getPublic, makePublic, makePrivate, createProgram };