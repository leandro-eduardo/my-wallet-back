import db from '../database/db.js';

export async function checkExistingUser(req, res, next) {
    const { email } = req.body;

    try {
        const existingUser = await db.collection('users').findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'E-mail indisponível' });
        }

        next();
    } catch (error) {
        console.log('Error while trying to check if user exists', error);
        res.sendStatus(500);
    }
}
