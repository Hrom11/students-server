// should be good === create project to collect DTO 

export interface Student {
    id: number;
    name: string;
    secondname: string;
    surname: string;
    birthdate: string;
    personalscore: number;
}

export type AddStudent = Omit<Student, 'id'>;
export interface EditStudent extends Partial<Student> {
    id: number;
}