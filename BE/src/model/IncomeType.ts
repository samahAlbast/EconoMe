import { DataTypes, Model } from 'sequelize';
import db from '../config/db.config';

interface IncomeTypeAttributes {
  id: number;
  name: string;
}

export class IncomeType extends Model<IncomeTypeAttributes> {}

IncomeType.init(
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
    tableName: 'IncomeType', 
    timestamps: false,
    freezeTableName: true, // Optionally freeze table name (prevent pluralization)
  }
);

export default IncomeType;
