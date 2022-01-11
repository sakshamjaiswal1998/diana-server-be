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
const getProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        // const related = await Product.find(req.params.id);

        const max = await Product.count();
        console.log('*max', max);
        var random1 = Math.floor(Math.random() * max)+1
        var random2 = Math.floor(Math.random() * max)+1
        var random3 = Math.floor(Math.random() * max)+1
        // console.log('*random', random1, random2, random3);
        let ids = [random1, random2, random3];
        let related = await Product.find({id: {
            $in: ids
        }}).limit(3)
        // console.log('*related', related.length);

        // Get the count of all users
        // Product.count().exec(function (err, count) {

        //     // Get a random entry
        //     var random = Math.floor(Math.random() * count)
        
        //     // Again query all users but only fetch one offset by our random #
        //     Product.findOne().skip(random).exec(
        //     function (err, result) {
        //         // Tada! random user
        //         console.log(result) 
        //     })
        // })


        res.json({product: product, related: related});
    } catch (error) {
        console.log('ERR: getProductById', error);
        res.status(500).json({message: "Server error"})
    }
};


module.exports = {
    getArtProducts,
    getExclusiveProducts,
    getSoldoutProducts,
    getProduct,
}