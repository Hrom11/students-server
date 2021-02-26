import { query } from "../database";
import { AddStudent, Student } from "./types";

export async function addStudent(params: AddStudent): Promise<number | undefined> {
    const sql = `
        INSERT INTO student (name, surname, secondname, birthdate, personalscore) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING id, name, surname, secondname, birthdate, personalscore`;

    const res = await query<Student>(sql, [
        params.name, 
        params.surname, 
        params.secondname, 
        params.birthdate, 
        params.personalscore,
    ]);

    if (!res.rowCount) {
        throw new Error('Internal server error');
    }
    return res.rows[0]
}