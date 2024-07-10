import { DataTypes, Model, Optional} from 'sequelize';
import db from '../config/db.config';

interface IncomeTypeAttributes {
  id: number;
  name: string;
  deleted: boolean;
}


interface IncomeTypeCreationAttributes extends Optional<IncomeTypeAttributes, 'id'| 'deleted'> {}

export class IncomeType extends Model<IncomeTypeAttributes, IncomeTypeCreationAttributes> implements IncomeTypeAttributes {
  public id!: number;
  public name!: string;
  public deleted!: boolean; 
}

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
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
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
