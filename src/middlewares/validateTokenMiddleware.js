import db from '../database/db.js';

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    console.log(authorization);
    const token = authorization?.replace('Bearer ', '');
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'Missing authorization token' });
    }

    try {
        const session = await db.collection('sessions').findOne({ token });

        if (!session) {
            return res.status(401).json({ message: 'No session found' });
        }

        const user = await db.collection('users').findOne({ _id: session.userId });

        if (!user) {
            return res.status(401).json({ message: 'No user found' });
        }

        delete user.password;

        res.locals.user = user;
        res.locals.token = token;

        next();
    } catch (error) {
        console.log('Error while trying to validate user token', error);
        res.sendStatus(500);
    }
}
