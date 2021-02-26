import * as express from 'express';
import { addStudent } from './addStudent';
import { getStudents } from './getStudents';
import { removeStudent } from './removeStudent';
import { AddStudent, EditStudent } from './types';
import { updateStudent } from './updateStudent';

export const studentRouter = express.Router();

studentRouter.get('/', (req, res) => {

    getStudents()
        .then((result) => {
            res.json(result);
        })
        .catch((e) => {
            res.status(400).send({
                message: `Error: ${e}`,
            })
        });

});

studentRouter.post<any, any, AddStudent>('/', (req, res) => {

    const body = req.body;

    addStudent(body)
        .then((result) => {

            if (!result) {
                throw new Error('Cannot create user')
            }
            res.json(result);
        })
        .catch((e) => {
            res.status(400).send({
                message: `Error: ${e}`,
            })
        });
})

studentRouter.post<{ id: number }, any, EditStudent>('/:id', (req, res) => {
    const id = +req.params.id;
    const body = req.body;

    updateStudent({ ...body, id })
        .then((result) => {

            if (!result) {
                throw new Error('Cannot edit user')
            }
            res.json(result);
        })
        .catch((e) => {
            res.status(400).send({
                message: `Error: ${e}`,
            })
        });

})

studentRouter.delete<{ id: number }>('/:id', (req, res) => {
    const id = req.params.id

    removeStudent({ id })
        .then(() => {
            res.json({ message: 'Ok' });
        })
        .catch((e) => {
            res.status(400).send({
                message: `Error: ${e}`,
            })
        });
})