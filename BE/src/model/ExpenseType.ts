import { DataTypes, Model } from 'sequelize';
import db from '../config/db.config';

interface ExpenseTypeAttributes {
  id: number;
  name: string;
}

export class ExpenseType extends Model<ExpenseTypeAttributes> {}

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
  },
  {
    sequelize: db,
    tableName: 'ExpenseType', 
    timestamps: false, 
    freezeTableName: true, 
  }
);

export default ExpenseType;
