import { DataTypes, Model, Optional} from 'sequelize';
import db from '../config/db.config';
import User from './User'; 
import ExpenseCategory from './ExpenseType'; 

interface BudgetAttributes {
  id: number;
  userId: number;
  expenseTypeId: number;
  limit: number;
  spent: number;
  createdAt?: Date;
  updatedAt?:Date
}


export class Budget extends Model<BudgetAttributes> {}

Budget.init(
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
    limit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    spent: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
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
    tableName: 'Budget', 
    timestamps: false, 
    freezeTableName: true, 
  }
);

export default Budget;
