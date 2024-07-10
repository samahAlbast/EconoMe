import { DataTypes, Model, Optional } from 'sequelize';
import db from '../config/db.config';

interface ExpenseTypeAttributes {
  id: number;
  name: string;
  deleted: boolean;
}

interface ExpenseTypeCreationAttributes extends Optional<ExpenseTypeAttributes, 'id'| 'deleted'> {}

export class ExpenseType extends Model<ExpenseTypeAttributes, ExpenseTypeCreationAttributes> implements ExpenseTypeAttributes {
  public id!: number;
  public name!: string;
  public deleted!: boolean; 
}

ExpenseType.init(
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
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
    },
  },
  {
    sequelize: db,
    tableName: 'ExpenseType', 
    timestamps: false, 
    freezeTableName: true, 
  }
);

export default ExpenseType;
