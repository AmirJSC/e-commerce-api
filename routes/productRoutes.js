const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../auth');

// Create a product (admin)
router.post('/', auth.verify, (req, res) => {
	const data = {
		payload: auth.decode(req.headers.authorization),
		reqBody: req.body
	};

	productController.createProduct(data).then(resultFromController => {
		res.send(resultFromController)
	})
});

// Get all active products, excluding the archived ones.
router.get('/', (req, res) => {
	productController.getAllActiveProducts().then(resultFromController => {
		res.send(resultFromController)
	})
});

// Get all products, including the archived ones (admin). 
router.get('/all', auth.verify, (req, res) => {
	const payload = auth.decode(req.headers.authorization);

	productController.getAllProducts(payload).then(resultFromController => {
		res.send(resultFromController)
	})
});

// Get products under a specified category
router.get('/category/:category', (req, res) => {
	const category = req.params.category;

	productController.categorizeProduct(category).then(resultFromController => {
		res.send(resultFromController)
	})
});

// Get a single product
router.get('/:productId', (req, res) => {
	const productId = req.params.productId;

	productController.getAProduct(productId).then(resultFromController => {
		res.send(resultFromController)
	})
});

// Update product details (admin)
router.put('/:productId', auth.verify, (req, res) => {
	const data = {
		productId: req.params.productId,
		payload: auth.decode(req.headers.authorization),
		reqBody: req.body
	};

	productController.updateProductDetails(data).then(resultFromController => {
		res.send(resultFromController)
	})
});

// Archive a product: set isActive to false (admin)
router.put('/archive/:productId', auth.verify, (req, res) => {
	const data = {
		productId: req.params.productId,
		payload: auth.decode(req.headers.authorization)
	};

	productController.archiveProduct(data).then(resultFromController => {
		res.send(resultFromController)
	})
});

module.exports = router;