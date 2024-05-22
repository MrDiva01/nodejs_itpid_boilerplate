const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize');
const Role = require('_helpers/role');
const categoryService = require('./category.service');

// Routes
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createSchema, create);
router.delete('/:id/:category', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    categoryService.getAll()
        .then(categories => res.json(categories))
        .catch(next);
}

function getById(req, res, next) {
    categoryService.getById(req.params.id)
        .then(category => category ? res.json(category) : res.sendStatus(404))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        description: Joi.string().required(),
        amount: Joi.number().required(),
        date: Joi.date().required(),
        category: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    categoryService.create(req.body)
        .then(category => res.json(category))
        .catch(next);
}

function _delete(req, res, next) {
    const { id, category } = req.params;
    categoryService.delete(id, category)
        .then(() => res.json({ message: 'Expense deleted successfully' }))
        .catch(next);
}
