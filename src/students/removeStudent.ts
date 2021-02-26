import { query } from "../database";
import { Student } from "./types";

export async function removeStudent(params: {id: number}) {
    const sql = `DELETE FROM student WHERE id = $1`;

    await query<Student>(sql, [params.id]);
}