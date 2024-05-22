const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const IncomeEntry = sequelize.define('IncomeEntry', {
        description: { type: DataTypes.STRING, allowNull: false },
        amount: { type: DataTypes.FLOAT, allowNull: false },
        date: { type: DataTypes.DATE, allowNull: false },
        created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated: { type: DataTypes.DATE }
    }, {
        timestamps: false,
    });

    const ExpenseEntry = sequelize.define('ExpenseEntry', {
        description: { type: DataTypes.STRING, allowNull: false },
        amount: { type: DataTypes.FLOAT, allowNull: false },
        date: { type: DataTypes.DATE, allowNull: false },
        created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated: { type: DataTypes.DATE }
    }, {
        timestamps: false,
    });

    const Summary = sequelize.define('Summary', {
        month: { type: DataTypes.STRING, allowNull: false },
        initialBudget: { type: DataTypes.FLOAT, allowNull: false },
        totalIncome: { type: DataTypes.FLOAT, allowNull: false },
        totalExpenses: { type: DataTypes.FLOAT, allowNull: false },
        totalSavings: { type: DataTypes.FLOAT, allowNull: false },
    }, {
        timestamps: false,
    });

    return { IncomeEntry, ExpenseEntry, Summary };
}
