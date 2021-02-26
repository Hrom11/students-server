import { query, updateBuilder } from "../database";
import { EditStudent, Student } from "./types";

export async function updateStudent(params: EditStudent) {

    const columns = {
        name: 'name = ?',
        surname: 'surname = ?',
        secondname: 'secondname = ?',
        birthdate: 'birthdate = ?',
        personalscore: 'personalscore = ?',
    };
    
    const {names, values} = updateBuilder(columns, [params]);

    console.log(names, values);
    if (!names.length) {
        return;
    }

    const sql = `UPDATE student SET ${names} WHERE id = ${params.id} RETURNING name, surname, secondname, birthdate, personalscore, id`;

    const res = await query<Student>(sql, values);

    if (!res.rowCount) {
        throw new Error('Internal server error')
    }
    return res.rows[0];
}

