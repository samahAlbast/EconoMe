import { DataTypes, Model } from 'sequelize';
import db from '../config/db.config';
import User from './User'; 
import IncomeSource from './IncomeSource'; 
import ExpenseCategory from './ExpenseCategory'; 

interface ExpenseTransactionAttributes {
  userId: number;
  incomeSourceId: number;
  categoryId: number;
  amount: number;
  date: Date;
  notes?: string;
  created?: Date;
}

export class ExpenseTransaction extends Model<ExpenseTransactionAttributes> {}

ExpenseTransaction.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    incomeSourceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: IncomeSource,
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
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
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    tableName: 'ExpenseTransaction', 
    timestamps: false, 
    freezeTableName: true, 
  }
);

export default ExpenseTransaction;
