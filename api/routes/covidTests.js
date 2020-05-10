// Express Package
const express = require('express');
const router = express.Router();

// CovidTest Model
const model = require('../models/CovidTest');

// Middlewares
const authorize = require('../middlewares/authorize');
const filters = require('../middlewares/filters');
const sort = require('../middlewares/sort');

// Controllers
const {
	create,
	getAll,
	getById,
	getOneAndUpdate,
	getOneAndDelete,
} = require('../controllers/GenericController')(model);

router.use(filters);

router.use(sort);

router.post('/', authorize(['--create-all']), create);

router.post('/', create);

router.get('/', authorize(['--view-all']), getAll);

router.get('/:id', authorize(['--view-all']), getById);

router.put('/:id', authorize(['--edit-all']), getOneAndUpdate);

router.delete('/:id', authorize(['--delete-all']), getOneAndDelete);

module.exports = router;
