import { DataTypes, Model,Optional } from 'sequelize';
import db from '../config/db.config';
import User from './User'; 
import ExpenseCategory from './ExpenseType'; 

interface ExpenseAttributes {
  id: number;
  userId: number;
  expenseTypeId: number;
  amount: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
}

interface ExpenseCreationAttributes extends Optional<ExpenseAttributes, 'id'|'notes'|'createdAt'| 'updatedAt' |'deleted'> {}

export class Expense extends Model<ExpenseAttributes, ExpenseCreationAttributes> implements ExpenseAttributes {
  public id!: number;
  public userId!: number;
  public expenseTypeId!: number;
  public amount!: number;
  public notes?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deleted!: boolean;
}

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
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
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
