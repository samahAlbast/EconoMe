
import { DataTypes, Model , Optional} from 'sequelize';
import db from '../config/db.config';

interface SavingTypeAttributes {
  id: number;
  name: string;
  deleted: boolean;
}

interface SavingTypeCreationAttributes extends Optional<SavingTypeAttributes, 'id'| 'deleted'> {}

export class SavingType extends Model<SavingTypeAttributes, SavingTypeCreationAttributes> implements SavingTypeAttributes {
  public id!: number;
  public name!: string;
  public deleted!: boolean; 
}

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
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, 
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
