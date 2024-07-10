import { Request, Response } from 'express';
import { ExpenseType } from '../model/ExpenseType';
import { Op } from 'sequelize';

class ExpenseTypeController {
    async addExpenseType(req: Request, res: Response) {
        try {
            const expenseType = req.body;
            const { expenseTypeName } = expenseType;

            const isNameAlreadyExist = await ExpenseType.findOne({ where: { name: expenseTypeName } });

            if (isNameAlreadyExist) {
                res.status(400).json({
                    status: 400,
                    message: "The expense type already exists.",
                });
                return;
            }

            const newExpenseType = await ExpenseType.create({
                name: expenseTypeName
            });

            res.status(201).json({
                status: 201,
                success: true,
                message: "Expense Type created successfully",
                expenseType: newExpenseType,
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }
    
    async updateExpenseType(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { expenseTypeName } = req.body;

            const expenseType = await ExpenseType.findByPk(id);

            if (!expenseType) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: 'Expense Type not found',
                });
                return;
            }

            const isNameAlreadyExist = await ExpenseType.findOne({ where: { name: expenseTypeName, id: { [Op.ne]: id } } });

            if (isNameAlreadyExist) {
                res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'The expense type already exists.',
                });
                return;
            }

            expenseType.name = expenseTypeName;

            await expenseType.save();

            res.status(200).json({
                status: 200,
                success: true,
                message: 'Expense Type updated successfully',
                expenseType,
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async deleteExpenseType(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const expenseType = await ExpenseType.findByPk(id);

            if (!expenseType) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: 'Expense Type not found',
                });
                return;
            }
            
            expenseType.deleted = true;

            await expenseType.save();
            res.status(200).json({
                status: 200,
                success: true,
                message: 'Expense Type marked as deleted successfully',
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async getAllNonDeletedExpenseTypes(req: Request, res: Response) {
        try {
            const expenseTypes = await ExpenseType.findAll({ where: { deleted: false } });

            res.status(200).json({
                status: 200,
                success: true,
                expenseTypes,
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

export default new ExpenseTypeController();
