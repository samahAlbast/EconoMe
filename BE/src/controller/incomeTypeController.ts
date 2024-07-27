import { Request, Response } from "express";

import { IncomeType } from "../model/IncomeType";
import { Op } from 'sequelize';


class IncomeTypeController {
    async addIncomeType(req: Request, res: Response) {
        try {
            const incomeType = req.body;

            const { incomeTypeName } = incomeType;

            if (!incomeType.incomeTypeName || typeof incomeType.incomeTypeName !== 'string') {
                return res.status(400).json({ status: 400, message: "Income type name is required and must be a string." });
            }
            const isNameAllReadyExist = await IncomeType.findOne({ where: { name: incomeTypeName } });

            if (isNameAllReadyExist) {
                res.status(400).json({
                    status: 400,
                    message: "The income type already exists.",
                });
                return;
            }

            const newIncomeType = await IncomeType.create({
                name: incomeTypeName
            });

            res.status(200).json({
                status: 201,
                success: true,
                message: " Income Type created Successfully",
                user: newIncomeType,
            });
        } catch (error: any) {
            console.log(error);

            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }

    }

    async updateIncomeType(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { incomeTypeName } = req.body;
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ status: 400, message: "Valid id is required." });
            }
            if (!incomeTypeName || typeof incomeTypeName !== 'string') {
                return res.status(400).json({ status: 400, message: "Income type name is required and must be a string." });
            }
            const incomeType = await IncomeType.findByPk(id);

            if (!incomeType) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: 'Income Type not found',
                });
                return;
            }

            const isNameAlreadyExist = await IncomeType.findOne({ where: { name: incomeTypeName, id: { [Op.ne]: id } } });

            if (isNameAlreadyExist) {
                res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'The income type already exists.',
                });
                return;
            }

            incomeType.name = incomeTypeName;

            await incomeType.save();

            res.status(200).json({
                status: 200,
                success: true,
                message: 'Income Type updated successfully',
                incomeType,
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async deleteIncomeType(req: Request, res: Response) {
        try {
            const { id } = req.params;
            
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({ status: 400, message: "Valid id is required." });
            }
            const incomeType = await IncomeType.findByPk(id);

            if (!incomeType) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: 'Income Type not found',
                });
                return;
            }

            incomeType.deleted = true;

            await incomeType.save();
            res.status(200).json({
                status: 200,
                success: true,
                message: 'Income Type marked as deleted successfully',
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async getAllNonDeletedIncomeTypes(req: Request, res: Response) {
        try {
            const incomeTypes = await IncomeType.findAll({ where: { deleted: false } });

            res.status(200).json({
                status: 200,
                success: true,
                incomeTypes,
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

export default new IncomeTypeController();