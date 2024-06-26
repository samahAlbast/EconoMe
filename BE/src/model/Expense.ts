import { DataTypes, Model } from 'sequelize';
import db from '../config/db.config';
import User from './User'; 
import ExpenseCategory from './ExpenseType'; 

interface ExpenseAttributes {
  id: number;
  userId: number;
  expenseTypeId: number;
  amount: number;
  date: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Expense extends Model<ExpenseAttributes> {}

Expense.init(
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
    expenseTypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: ExpenseCategory,
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
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
    updatedAt: {
      type: DataTypes.DATE
    },
  },
  {
    sequelize: db,
    tableName: 'Expense', 
    timestamps: false, 
    freezeTableName: true, 
  }
);

export default Expense;
