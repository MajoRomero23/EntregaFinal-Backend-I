const Product = require('../models/Product');

// Lista de imágenes disponibles
const imageList = [
    'Ramo1.jpg', 'Ramo2.jpg', 'Ramo3.jpg', 'Ramo4.jpg', 'Ramo5.jpg',
    'Ramo6.jpg', 'Ramo7.jpg', 'Ramo8.jpg', 'Ramo9.jpg', 'Ramo10.jpg',
    'Ramo11.jpg', 'Ramo12.jpg', 'Ramo13.jpg', 'Ramo14.jpg', 'Ramo15.jpg',
    'Ramo16.jpg', 'Ramo17.jpg', 'Ramo18.jpg', 'Ramo19.jpg', 'Ramo20.jpg'
];

// Función para obtener una imagen aleatoria
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    return imageList[randomIndex];
}

// Función para obtener productos filtrados
const getFilteredProducts = async ({ limit, page, sort, query }) => {
    const filter = query ? { category: query } : {};
    const sortOption = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

    const limitNum = parseInt(limit, 10) || 10;
    const pageNum = parseInt(page, 10) || 1;

    const products = await Product.find(filter)
        .sort(sortOption)
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limitNum);

    return { products, totalPages, pageNum, limitNum };
};

// Obtener todos los productos con paginación
const getProducts = async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query;
        const { products, totalPages, pageNum } = await getFilteredProducts({ limit, page, sort, query });

        res.json({
            status: "success",
            payload: products,
            totalPages,
            prevPage: pageNum > 1 ? pageNum - 1 : null,
            nextPage: pageNum < totalPages ? pageNum + 1 : null,
            page: pageNum,
            hasPrevPage: pageNum > 1,
            hasNextPage: pageNum < totalPages,
            prevLink: pageNum > 1 ? `/api/products?limit=${limit}&page=${pageNum - 1}&sort=${sort}&query=${query}` : null,
            nextLink: pageNum < totalPages ? `/api/products?limit=${limit}&page=${pageNum + 1}&sort=${sort}&query=${query}` : null
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

// Obtener producto por ID
const getProductsById = async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await Product.findById(pid);
        if (!product) {
            return res.status(404).send('No se ha encontrado el producto');
        }
        res.render('productDetails', { product: product.toObject() });
    } catch (error) {
        console.error('Error al obtener producto', error);
        res.status(500).send('Error al mostrar producto');
    }
};

// Crear un nuevo producto
const addProduct = async (req, res) => {
    try {
        const productData = req.body;

        // Asignar imagen aleatoria al producto
        productData.thumbnails = [getRandomImage()];

        const newProduct = new Product(productData);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al añadir el producto' });
    }
};

// Actualizar producto
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.pid, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// Eliminar producto
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.pid);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

// Generar productos de prueba
const generateTestProducts = async (req, res) => {
    try {
        const testProducts = Array.from({ length: 20 }, (_, i) => ({
            title: `Ramo ${i + 1}`,
            description: `Descripción del Ramo ${i + 1}`,
            code: `CODE${i + 1}`,
            price: Math.floor(Math.random() * 1000) + 1,
            status: true,
            stock: Math.floor(Math.random() * 100) + 1,
            category: `Categoría ${['I', 'II', 'III'][i % 3]}`,
            thumbnails: [`Ramo${i + 1}.jpg`]//asignando imagen aleatoria
        }));

        await Product.insertMany(testProducts);
        res.json({ message: "Se han generado 20 ramos random correctamente" });
    } catch (error) {
        res.status(500).json({ error: 'Error al generar productos de prueba' });
    }
};

// Eliminar todos los productos
const deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.json({ message: "Todos los productos fueron eliminados exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar todos los productos" });
    }
};

module.exports = {
    getProducts,
    getProductsById,
    addProduct,
    updateProduct,
    deleteProduct,
    generateTestProducts,
    deleteAllProducts
};



