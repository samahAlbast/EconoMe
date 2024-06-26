
import { DataTypes, Model } from 'sequelize';
import db from '../config/db.config';

interface SavingTypeAttributes {
  id: number;
  name: string;
}

export class SavingType extends Model<SavingTypeAttributes> {}

SavingType.init(
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
    tableName: 'SavingType', 
    timestamps: false, 
    freezeTableName: true, 
  }
);

export default SavingType;
