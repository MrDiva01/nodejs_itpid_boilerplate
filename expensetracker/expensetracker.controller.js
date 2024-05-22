const express = require('express');
const router = express.Router();
const expensetrackerService = require('./expensetracker.service');

// Routes
router.get('/income', getAllIncome);
router.get('/income/:id', getIncomeById);
router.post('/income', createIncome);
router.delete('/income/:id', deleteIncome);

router.get('/expenses', getAllExpenses);
router.get('/expenses/:id', getExpenseById);
router.post('/expenses', createExpense);
router.delete('/expenses/:id', deleteExpense);

router.get('/summary/:month', getSummaryForMonth);
router.post('/set-budget', setBudget);

module.exports = router;

// Route Functions
async function getAllIncome(req, res, next) {
    try {
        const result = await expensetrackerService.getAllIncome();
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function getIncomeById(req, res, next) {
    try {
        const result = await expensetrackerService.getIncomeById(req.params.id);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function createIncome(req, res, next) {
    try {
        const result = await expensetrackerService.createIncome(req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function deleteIncome(req, res, next) {
    try {
        await expensetrackerService.deleteIncome(req.params.id);
        res.json({ message: 'Income entry deleted' });
    } catch (err) {
        next(err);
    }
}

async function getAllExpenses(req, res, next) {
    try {
        const result = await expensetrackerService.getAllExpenses();
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function getExpenseById(req, res, next) {
    try {
        const result = await expensetrackerService.getExpenseById(req.params.id);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function createExpense(req, res, next) {
    try {
        const result = await expensetrackerService.createExpense(req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function deleteExpense(req, res, next) {
    try {
        await expensetrackerService.deleteExpense(req.params.id);
        res.json({ message: 'Expense entry deleted' });
    } catch (err) {
        next(err);
    }
}

async function getSummaryForMonth(req, res, next) {
    try {
        const result = await expensetrackerService.getSummaryForMonth(req.params.month);
        res.json(result);
    } catch (err) {
        next(err);
    }
}

async function setBudget(req, res, next) {
    try {
        const result = await expensetrackerService.setBudget(req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
}
