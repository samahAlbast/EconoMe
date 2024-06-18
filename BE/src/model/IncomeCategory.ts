import { DataTypes, Model } from 'sequelize';
import db from '../config/db.config';

interface IncomeCategoryAttributes {
  id: number;
  name: string;
}

export class IncomeCategory extends Model<IncomeCategoryAttributes> {}

IncomeCategory.init(
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
    tableName: 'IncomeCategory', 
    timestamps: false,
    freezeTableName: true, // Optionally freeze table name (prevent pluralization)
  }
);

export default IncomeCategory;
