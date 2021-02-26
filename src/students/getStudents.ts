import { query } from "../database";
import { Student } from "./types";

export async function getStudents() {
    const sql = `SELECT id, name, surname, secondname, birthdate, personalscore FROM student`;

    const res = await query<Student>(sql);

    return res.rows;

}