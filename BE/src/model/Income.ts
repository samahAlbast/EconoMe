import { DataTypes, Model, Optional } from 'sequelize';
import db from '../config/db.config';
import User from './User'; 
import IncomeCategory, { IncomeType } from './IncomeType'; 

interface IncomeAttributes {
  id: number;
  userId: number;
  incomeTypeId: number;
  initialAmount: number;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted: boolean;
}

interface IncomeCreationAttributes extends Optional<IncomeAttributes, 'id'|'notes'|'createdAt'| 'updatedAt' |'deleted'> {}

export class Income extends Model<IncomeAttributes, IncomeCreationAttributes> implements IncomeAttributes {
  public id!: number;
  public userId!: number;
  public incomeTypeId!: number;
  public initialAmount!: number;
  public notes?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public deleted!: boolean;
}

Income.init(
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
    incomeTypeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: IncomeType,
        key: 'id'
      }
    },
    initialAmount: {
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
    tableName: 'Income', 
    timestamps: false, 
    freezeTableName: true, 
  }
);

export default Income;
