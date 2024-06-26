import { DataTypes, Model } from 'sequelize';
import db from '../config/db.config';
import User from './User'; 
import IncomeCategory, { IncomeType } from './IncomeType'; 

interface IncomeAttributes {
  id: number;
  userId: number;
  incomeTypeId: number;
  currency: string;
  initialAmount: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Income extends Model<IncomeAttributes> {}

Income.init(
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
    incomeTypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: IncomeType,
        key: 'id'
      }
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    initialAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    tableName: 'Income', 
    timestamps: false, 
    freezeTableName: true, 
  }
);

export default Income;
