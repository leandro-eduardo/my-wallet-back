import joi from 'joi';

export const transactionSchema = joi.object({
    description: joi.string().min(3).required(),
    type: joi.string().valid('income', 'expense').required(),
    amount: joi.number().min(0.01).required(),
});
