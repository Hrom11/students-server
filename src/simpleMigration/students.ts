import { query } from "../database"

// its not good to use it without any of version, but its just a test task :)

const createTableStudents = async () => {

    const sql = `CREATE TABLE IF NOT EXISTS student(
        ID SERIAL PRIMARY KEY,
        name VARCHAR(30),
        surname VARCHAR(30),
        secondname VARCHAR(30),
        birthdate TIMESTAMP,
        personalscore integer NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT NOW()
    )`

    await query(sql);
};


const migrateAll = async () => {
    try {
        await createTableStudents();
        console.log('Migration Success');
    } catch (e) {
        console.error('Migration Failed')
        throw e;
    }
}

export default migrateAll;
