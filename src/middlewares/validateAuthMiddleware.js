import { authSignUpSchema, authSignInSchema } from '../schemas/authSchemas.js';

export function validateSignUp(req, res, next) {
    const user = req.body;

    const validation = authSignUpSchema.validate(user, { abortEarly: false });

    if (validation.error) {
        return res.status(422).json(validation.error.details);
    }

    next();
}

export function validateSignIn(req, res, next) {
    const user = req.body;

    const validation = authSignInSchema.validate(user, { abortEarly: false });

    if (validation.error) {
        return res.status(422).json(validation.error.details);
    }

    next();
}
