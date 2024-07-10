import { Request, Response } from 'express';
import { SavingType } from '../model/SavingType';
import { Op } from 'sequelize';

class SavingTypeController {
    async addSavingType(req: Request, res: Response) {
        try {
            const savingType = req.body;
            const { savingTypeName } = savingType;

            const isNameAlreadyExist = await SavingType.findOne({ where: { name: savingTypeName } });

            if (isNameAlreadyExist) {
                res.status(400).json({
                    status: 400,
                    message: "The saving type already exists.",
                });
                return;
            }

            const newSavingType = await SavingType.create({
                name: savingTypeName
            });

            res.status(201).json({
                status: 201,
                success: true,
                message: "Saving Type created successfully",
                savingType: newSavingType,
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }
    
    async updateSavingType(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { savingTypeName } = req.body;

            const savingType = await SavingType.findByPk(id);

            if (!savingType) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: 'Saving Type not found',
                });
                return;
            }

            const isNameAlreadyExist = await SavingType.findOne({ where: { name: savingTypeName, id: { [Op.ne]: id } } });

            if (isNameAlreadyExist) {
                res.status(400).json({
                    status: 400,
                    success: false,
                    message: 'The saving type already exists.',
                });
                return;
            }

            savingType.name = savingTypeName;

            await savingType.save();

            res.status(200).json({
                status: 200,
                success: true,
                message: 'Saving Type updated successfully',
                savingType,
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async deleteSavingType(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const savingType = await SavingType.findByPk(id);

            if (!savingType) {
                res.status(404).json({
                    status: 404,
                    success: false,
                    message: 'Saving Type not found',
                });
                return;
            }
            
            savingType.deleted = true;

            await savingType.save();
            res.status(200).json({
                status: 200,
                success: true,
                message: 'Saving Type marked as deleted successfully',
            });
        } catch (error: any) {
            console.log(error);
            res.status(400).json({
                status: 400,
                message: error.message.toString(),
            });
        }
    }

    async getAllNonDeletedSavingTypes(req: Request, res: Response) {
        try {
            const savingTypes = await SavingType.findAll({ where: { deleted: false } });

            res.status(200).json({
                status: 200,
                success: true,
                savingTypes,
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

export default new SavingTypeController();
