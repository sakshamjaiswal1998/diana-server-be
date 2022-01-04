const Product = require('../models/Product');

const getArtProducts = async(req, res) => {
    console.log('ART/');
    try {
        const products = await Product.find({category: 'art'});
        // productsRes = await products.map(async(item, index)=>({slno: index+1, ...item}));
        res.json(products);
    } catch (error) {
        console.log('ERR: getAllProducts', error);
        res.status(500).json({message: "Server error"})
    }
};

const getExclusiveProducts = async(req, res) => {
    console.log('EXCL/');
    try {
        const products = await Product.find({category: 'Exclusive'});
        res.json(products);
    } catch (error) {
        console.log('ERR: getAllProducts', error);
        res.status(500).json({message: "Server error"})
    }
};

const getSoldoutProducts = async(req, res) => {
    console.log('SOLDOUT/');
    try {
        const products = await Product.find({stock: 0});
        res.json(products);
    } catch (error) {
        console.log('ERR: getAllProducts', error);
        res.status(500).json({message: "Server error"})
    }
};


module.exports = {
    getArtProducts,
    getExclusiveProducts,
    getSoldoutProducts,
}