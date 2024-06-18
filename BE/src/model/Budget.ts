import { DataTypes, Model } from 'sequelize';
import db from '../config/db.config';
import User from './User'; 
import ExpenseCategory from './ExpenseCategory'; 

interface BudgetAttributes {
  userId: number;
  categoryId: number;
  limit: number;
  spent: number;
  created?: Date;
}

export class Budget extends Model<BudgetAttributes> {}

Budget.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
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
    limit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    spent: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    tableName: 'Budget', 
    timestamps: false, 
    freezeTableName: true, 
  }
);

export default Budget;
