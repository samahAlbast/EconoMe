import { DataTypes, Model } from 'sequelize';
import db from '../config/db.config';
import User from './User'; 
import IncomeCategory from './IncomeCategory'; 

interface IncomeSourceAttributes {
  userId: number;
  categoryId: number;
  currency: string;
  initialAmount: number;
  notes?: string;
  created: Date;
}

export class IncomeSource extends Model<IncomeSourceAttributes> {}

IncomeSource.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: IncomeCategory,
        key: 'id'
      }
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    initialAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: db,
    tableName: 'IncomeSource', 
    timestamps: false, 
    freezeTableName: true, 
  }
);

export default IncomeSource;
