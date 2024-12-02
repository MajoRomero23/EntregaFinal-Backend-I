const Cart = require('../models/Cart');

//Carrito nuevo 
const createCart = async (req, res) => {
    try {
        const newCart = new Cart({ products: [] });
        await newCart.save();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
};

//Carrito por su ID
const findCartbyId = async (id) => {
    const cart = await Cart.findById(id).populate('products.product');
    if (!cart) {
        throw new Error('Carrito no encontrado');
    }
    return cart;
};

const getCartById = async (req, res) => {
    try {
        const cart = await findCartbyId(req.params.cid);
        res.json(cart)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Producto al carrito 
const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await findCartbyId(cid, res);
        if (!cart) return;

        const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity++;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
};

//Eliminando un producto del carrito
const removeProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await findCartbyId(cid, res);
        if (!cart) return;

        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        await cart.save();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar producto del carrito' });
    }
};

module.exports = {
    createCart,
    getCartById,
    addProductToCart,
    removeProductFromCart
};
