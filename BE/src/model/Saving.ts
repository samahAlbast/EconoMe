import { DataTypes, Model, Optional } from 'sequelize';
import db from '../config/db.config';
import User from './User'; 
import SavingType from './SavingType'; 

interface SavingAttributes {
  id: number;
  userId: number;
  savingTypeId: number;
  goalAmount: number;
  targetDate: Date;
  savedAmount: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Saving extends Model<SavingAttributes> {}

Saving.init(
  {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    savingTypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: SavingType,
        key: 'id'
      }
    },
    goalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    targetDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    savedAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE
    },
  },
  {
    sequelize: db,
    tableName: 'Saving', 
    timestamps: true, 
    freezeTableName: true, 
  }
);

export default Saving;
