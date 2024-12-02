const express = require('express');
const { createCart, getCartById, addProductToCart, removeProductFromCart } = require('../controllers/cartsController');

const router = express.Router();

router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', addProductToCart);
router.delete('/:cid/product/:pid', removeProductFromCart); //eliminar producto de un carrito 

module.exports = router;
