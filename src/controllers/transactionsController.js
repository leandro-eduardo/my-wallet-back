import db from '../database/db.js';
import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';

export async function getTransactions(req, res) {
    const { user } = res.locals;

    try {
        const userTransactions = await db
            .collection('transactions')
            .find({ userId: user._id })
            .toArray();

        res.status(200).send(userTransactions);
    } catch (error) {
        console.log('Error while trying to get user transactions', error);
        res.sendStatus(500);
    }
}

export async function createTransaction(req, res) {
    const { description, type, amount } = req.body;
    const { user } = res.locals;

    try {
        await db.collection('transactions').insertOne({
            date: dayjs().format('DD/MM'),
            description,
            type,
            amount,
            userId: user._id,
        });

        res.sendStatus(201);
    } catch (error) {
        console.log('Error while trying to create transaction', error);
        res.sendStatus(500);
    }
}

export async function deleteTransaction(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    try {
        const transactionToBeDeleted = await db
            .collection('transactions')
            .findOne({ _id: ObjectId(id) });

        if (!transactionToBeDeleted) {
            return res.status(404).json({ message: 'Transação não encontrada' });
        }
        console.log(transactionToBeDeleted.userId.toString());
        console.log(user._id.toString());
        if (transactionToBeDeleted.userId.toString() !== user._id.toString()) {
            return res.sendStatus(401);
        }

        await db.collection('transactions').deleteOne({ _id: ObjectId(id) });

        res.sendStatus(200);
    } catch (error) {
        console.log('Error while trying to delete transaction', error);
        res.sendStatus(500);
    }
}
