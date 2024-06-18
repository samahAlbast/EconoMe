import { DataTypes, Model } from 'sequelize';
import db from '../config/db.config';

interface ExpenseCategoryAttributes {
  id: number;
  name: string;
}

export class ExpenseCategory extends Model<ExpenseCategoryAttributes> {}

ExpenseCategory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'ExpenseCategory', 
    timestamps: false, 
    freezeTableName: true, // Optionally freeze table name (prevent pluralization)
  }
);

export default ExpenseCategory;
