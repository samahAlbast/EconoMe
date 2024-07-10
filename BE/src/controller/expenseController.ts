import { Request, Response } from 'express';
import { Expense } from '../model/Expense';
import { Income } from '../model/Income';

import { Op } from 'sequelize';

class ExpenseController {
    async addExpense(req: Request, res: Response) {
        try {
            const { userId, expenseTypeId, amount, notes } = req.body;

            const totalExpenseResult = await Expense.sum('amount', {
                where: { deleted: false, userId: userId },
            });
            const totalIncomeResult = await Income.sum('initialAmount', {
                where: { deleted: false, userId: userId },
            });

            const totalExpense = totalExpenseResult || 0;
            const totalIncome = totalIncomeResult || 0;

            const remainingIncomeAmount = totalIncome - totalExpense;

            if (remainingIncomeAmount < amount) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'Transaction cannot be performed. Not enough income!',
                });
            }

            const newExpense = await Expense.create({
                userId,
                expenseTypeId,
                amount,
                notes,
            });

            res.status(201).json({
                status: 201,
                success: true,
                message: 'Expense added successfully',
                expense: newExpense,
            });
        } catch (error: any) {
            console.error(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async updateExpense(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { userId, expenseTypeId, amount, date, notes } = req.body;

            const expense = await Expense.findByPk(id);

            if (!expense) {
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: 'Expense not found',
                });
            }

            expense.userId = userId;
            expense.expenseTypeId = expenseTypeId;
            expense.amount = amount;
            expense.notes = notes;

            await expense.save();

            res.status(200).json({
                status: 200,
                success: true,
                message: 'Expense updated successfully',
                expense,
            });
        } catch (error: any) {
            console.error(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async deleteExpense(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const expense = await Expense.findByPk(id);

            if (!expense) {
                return res.status(404).json({
                    status: 404,
                    success: false,
                    message: 'Expense not found',
                });
            }

            expense.deleted = true;

            await expense.save();

            res.status(200).json({
                status: 200,
                success: true,
                message: 'Expense marked as deleted successfully',
            });
        } catch (error: any) {
            console.error(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async getAllExpenses(req: Request, res: Response) {
        try {
            const expenses = await Expense.findAll({
                where: { deleted: false },
            });

            res.status(200).json({
                status: 200,
                success: true,
                expenses,
            });
        } catch (error: any) {
            console.error(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }
}

export default new ExpenseController();
