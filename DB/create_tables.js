const { Sequelize, DataTypes } = require('sequelize');

// Create a connection to the MySQL server using Sequelize
const sequelize = new Sequelize('econome', 'root', 'samah', {
    host: 'localhost',
    dialect: 'mysql'
});

// Define the User model
const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    created: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false, 
    freezeTableName: true
});

// Define the IncomeCategory model
const IncomeCategory = sequelize.define('IncomeCategory', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    timestamps: false, 
    freezeTableName: true
});

// Define the ExpenseCategory model
const ExpenseCategory = sequelize.define('ExpenseCategory', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    timestamps: false, 
    freezeTableName: true
});

// Define the IncomeSource model
const IncomeSource = sequelize.define('IncomeSource', {
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
        allowNull: false
    },
    initialAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false, 
    freezeTableName: true
});

// Define the ExpenseTransaction model
const ExpenseTransaction = sequelize.define('ExpenseTransaction', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    incomeSourceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: IncomeSource,
            key: 'id'
        }
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ExpenseCategory,
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: false, 
    freezeTableName: true
});

// Define the Budget model
const Budget = sequelize.define('Budget', {
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
      model: ExpenseCategory,
      key: 'id'
    }
  },
  limit: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  spent: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  created: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  timestamps: false,
  freezeTableName: true
});

// Synchronize the models with the database
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await sequelize.sync({ force: true }); // This will drop existing tables and create new ones
        console.log('Database & tables created!');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
})();
