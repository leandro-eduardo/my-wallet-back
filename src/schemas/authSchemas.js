import joi from 'joi';

const passwordRules =
    /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export const authSignUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().regex(passwordRules).required().messages({
        'string.pattern.base':
            'the password length must be greater than or equal to 8 / must contain one or more uppercase characters / must contain one or more lowercase characters / must contain one or more numeric values / must contain one or more special characters',
    }),
});

export const authSignInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
});
