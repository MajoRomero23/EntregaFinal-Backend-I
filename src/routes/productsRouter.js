const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductsById,
    addProduct,
    updateProduct,
    deleteProduct,
    generateTestProducts,
    deleteAllProducts
} = require('../controllers/productsController');

router.get('/', getProducts);
router.get('/:pid', getProductsById);
router.post('/', addProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);
router.post('/generate', generateTestProducts);
router.delete('/deleteAll', deleteAllProducts);

module.exports = router;  // Exportando correctamente el router


