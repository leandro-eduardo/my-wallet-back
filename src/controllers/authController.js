import db from '../database/db.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const passwordHash = bcrypt.hashSync(password, 10);
        const user = await db.collection('users').insertOne({
            name,
            email,
            password: passwordHash,
        });

        const createdUser = await db
            .collection('users')
            .findOne({ _id: user.insertedId });

        delete createdUser.password;
        res.status(201).send(createdUser);
    } catch (error) {
        console.log('Error while trying to create new user', error);
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await db.collection('users').findOne({ email });

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            await db.collection('sessions').insertOne({
                token,
                userId: user._id,
            });

            return res.status(200).send({
                name: user.name,
                token,
            });
        }

        res.status(401).json({ message: 'E-mail ou senha incorretos...' });
    } catch (error) {
        console.log('Error while trying to sign in', error);
        res.sendStatus(500);
    }
}

export async function signOut(req, res) {
    const { token } = res.locals;

    try {
        await db.collection('sessions').deleteOne({ token });
        res.sendStatus(200);
    } catch (error) {
        console.log('Error while trying to sign out', error);
        res.sendStatus(500);
    }
}
