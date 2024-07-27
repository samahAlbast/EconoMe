import { Request, Response } from 'express';
import Income from '../model/Income';
import Expense from '../model/Expense';

class IncomeController {
    async addIncome(req: Request, res: Response) {
        try {
            const { userId, incomeTypeId, initialAmount, notes } = req.body;

            if (!userId || isNaN(Number(userId))) {
                return res.status(400).json({ status: 400, message: "Valid userId is required." });
            }
            if (!incomeTypeId || isNaN(Number(incomeTypeId))) {
                return res.status(400).json({ status: 400, message: "Valid incomeTypeId is required." });
            }
            if (!initialAmount || isNaN(Number(initialAmount))) {
                return res.status(400).json({ status: 400, message: "Valid initialAmount is required." });
            }
            if (notes && typeof notes !== 'string') {
                return res.status(400).json({ status: 400, message: "Notes must be a string." });
            }


            const existingIncome = await Income.findOne({
                where: {
                    userId,
                    incomeTypeId,
                },
            });

            if (existingIncome) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'An income with the same income type already exists.',
                });
            }

            const newIncome = await Income.create({
                userId,
                incomeTypeId,
                initialAmount,
                notes,
            });

            res.status(201).json({
                status: 201,
                success: true,
                message: 'Income added successfully',
                income: newIncome,
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async updateIncome(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { initialAmount, notes } = req.body;
            
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ status: 400, message: "Valid id is required." });
            }
            if (!initialAmount || isNaN(Number(initialAmount))) {
                return res.status(400).json({ status: 400, message: "Valid initialAmount is required." });
            }
            if (notes && typeof notes !== 'string') {
                return res.status(400).json({ status: 400, message: "Notes must be a string." });
            }
            const income = await Income.findByPk(id);

            if (!income) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: 'Income not found',
                });
                return;
            }

            income.initialAmount = initialAmount;
            income.notes = notes;
            income.updatedAt = new Date();

            await income.save();

            res.status(200).json({
                status: 200,
                success: true,
                message: 'Income updated successfully',
                income,
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async deleteIncome(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ status: 400, message: "Valid id is required." });
            }
            const income = await Income.findByPk(id);

            if (!income) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: 'Income not found',
                });
                return;
            }

            income.deleted = true;
            await income.save();

            res.status(200).json({
                status: 200,
                success: true,
                message: 'Income deleted successfully',
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async getIncome(req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ status: 400, message: "Valid id is required." });
            }
            const income = await Income.findByPk(id);

            if (!income) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: 'Income not found',
                });
                return;
            }

            res.status(200).json({
                status: 200,
                success: true,
                income,
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async getAllNonDeletedIncomes(req: Request, res: Response) {
        try {
            const incomes = await Income.findAll({ where: { deleted: false } });

            res.status(200).json({
                status: 200,
                success: true,
                incomes,
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async getTotalAvailableIncome(req: Request, res: Response) {
        try {
            const initialAmount = await Income.sum('initialAmount', {
                where: { deleted: false }
            });
            const usedAmount = await Expense.sum('amount', {
                where: { deleted: false }
            });
            const availableIncome =  Math.max(initialAmount - usedAmount, 0);

            res.status(200).json({
                status: 200,
                success: true,
                totalAvailableIncome: availableIncome || 0,
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }
}

export default new IncomeController();
