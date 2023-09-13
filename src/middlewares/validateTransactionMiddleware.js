import { transactionSchema } from '../schemas/transactionSchema.js';

export function validateTransaction(req, res, next) {
    const transaction = req.body;

    const validation = transactionSchema.validate(transaction, { abortEarly: false });

    if (validation.error) {
        console.log(validation.error);
        return res.status(422).json(validation.error.details);
    }

    next();
}
