const db = require('_helpers/db');  // Importing database helper

module.exports = {
    getAllIncome,
    getIncomeById,
    createIncome,
    deleteIncome,
    getAllExpenses,
    getExpenseById,
    createExpense,
    deleteExpense,
    getSummaryForMonth,
    setBudget,
};

// Income Entries Functions

async function getAllIncome() {
    const incomeEntries = await db.IncomeEntry.findAll();
    return incomeEntries.map(x => basicDetails(x));
}

async function getIncomeById(id) { 
    const incomeEntry = await getIncomeEntry(id);
    return basicDetails(incomeEntry);
}

async function createIncome(params) {
    const incomeEntry = new db.IncomeEntry(params);
    await incomeEntry.save();
    return basicDetails(incomeEntry);
}

async function deleteIncome(id) {
    const incomeEntry = await getIncomeEntry(id);
    await incomeEntry.destroy();
}

// Expense Entries Functions

async function getAllExpenses() {
    const expenseEntries = await db.ExpenseEntry.findAll();
    return expenseEntries.map(x => basicDetails(x));
}

async function getExpenseById(id) { 
    const expenseEntry = await getExpenseEntry(id);
    return basicDetails(expenseEntry);
}

async function createExpense(params) {
    const expenseEntry = new db.ExpenseEntry(params);
    await expenseEntry.save();
    return basicDetails(expenseEntry);
}

async function deleteExpense(id) {
    const expenseEntry = await getExpenseEntry(id);
    await expenseEntry.destroy();
}

// Summary Function

async function getSummaryForMonth(month) {
    const summary = await db.Summary.findOne({ where: { month } });
    if (!summary) throw 'Summary not found for this month';
    return summary;
}

async function setBudget(params) {
    const { month, initialBudget } = params;
    let summary = await db.Summary.findOne({ where: { month } });

    if (!summary) {
        summary = new db.Summary({ month, initialBudget, totalIncome: 0, totalExpenses: 0, totalSavings: initialBudget });
    } else {
        summary.initialBudget = initialBudget;
        summary.totalSavings = summary.totalIncome - summary.totalExpenses + initialBudget;
    }

    await summary.save();
    return summary;
}

// Helper functions

async function getIncomeEntry(id) {
    const incomeEntry = await db.IncomeEntry.findByPk(id);
    if (!incomeEntry) throw 'Income entry not found';
    return incomeEntry;
}

async function getExpenseEntry(id) {
    const expenseEntry = await db.ExpenseEntry.findByPk(id);
    if (!expenseEntry) throw 'Expense entry not found';
    return expenseEntry;
}

function basicDetails(entry) {
    const { id, description, amount, date, created, updated } = entry;
    return { id, description, amount, date, created, updated };
}
