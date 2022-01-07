const Product = require('../models/Product');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const getAllProducts = async(req, res) => {
    console.log('Get PRODucts');
    try {
        const products = await Product.find({});
        // productsRes = await products.map(async(item, index)=>({slno: index+1, ...item}));
        console.log('retrieved', products);
        res.json(products);
    } catch (error) {
        console.log('ERR: getAllProducts', error);
        res.status(500).json({message: "Server error"})
    }
};

const getProductById = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        console.log('ERR: getProductById', error);
        res.status(500).json({message: "Server error"})
    }
};

const createProduct = async(req, res) => {
    // console.log(req.file, req.body, req.files, 'FILE/BODY/FILES')
    let temp = req.body;
    if(req.files.image) {
        console.log('files.img', req.files.image)
        temp.image = req.files.image[0].filename;
    }
    if(req.files.galleryimages) {
        temp.galleryimages = [];
        req.files.galleryimages.map(async (rFile) => {
                await temp.galleryimages.push({path: rFile.filename});
        });
    }
    try {
        const newProduct = await Product.create(temp);
        res.json(newProduct);
    } catch (error) {
        console.log('ERR: createProduct', error);
        res.status(500).json({message: "Server error"})
    }
};

const updateProductById = async(req, res) => {
    // console.log(req.file, req.body, req.files, 'FILE/BODY/FILES')
    // let temp = req.body;
    try {
        // console.log('REQ', req.params, req.body);
        let model = await Product.findOneAndUpdate({_id: req.params.id}, {$set: {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            paint: req.body.paint,
            medium: req.body.medium,
            framed: req.body.framed,
            width: req.body.width,
            height: req.body.height,
            unit: req.body.unit,
            // image: req.body.image,
        }});
        if(req.files.image) {
            await Product.findOneAndUpdate({_id: req.params.id}, {$set: {
                image: req.files.image[0].filename,
            }});
        }
        
        if(req.body.deletions || req.files.galleryimages) {
            let stack = JSON.parse(JSON.stringify(model.galleryimages));
            console.log('orig', stack);
            console.log('deletions', req.body.deletions)
            if(req.body.deletions) {
                let dArr = req.body.deletions.split(',');
                console.log('dArr', dArr);
                dArr.map(deletion => {
                    console.log('deleting: ', deletion);
                    let pos = stack.findIndex(s => s._id == deletion);
                    console.log('pos', pos, pos == -1);
                    if(pos !== -1) {
                        console.log('splice at '+pos);
                        stack.splice(pos, 1);
                    }
                });
                console.log('del res', stack)
            }
            if(req.files.galleryimages) {
                // temp.galleryimages = [];
                req.files.galleryimages.map(async (rFile) => {
                    await stack.push({path: rFile.filename});
                        // await temp.galleryimages.push({path: rFile.filename});
                });
            }

            await Product.findOneAndUpdate({_id: req.params.id}, {$set: {
                galleryimages: stack,
            }});

        }

        // if(req.file) {
        //     const product = await Product.findOneAndUpdate({id: req.params.id}, {$set: {
        //         image: req.file.filename,
        //     }});
        //     res.json(product);
        // }
        
        const product = await Product.findOne({_id: req.params.id});
        res.json(product);
    } catch (error) {
        console.log('ERR: updateProductById', error);
        res.status(500).json({message: "Server error"})
    }
};

const removeProduct = async(req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.id);
        res.json(product);
    } catch (error) {
        console.log('ERR: removeProduct', error);
        res.status(500).json({message: "Server error"})
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    removeProduct
}