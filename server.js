require('dotenv').config();
const express = require('express');
// const connectDB = require('./config/db');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const morgan = require('morgan');

var util= require('util');
var encoder = new util.TextEncoder('utf-8');

const ProductRoutes = require('./routes/ProductRoutes')
const PostRoutes = require('./routes/PostRoutes')
const EventRoutes = require('./routes/EventRoutes')
// const GalleryRoutes = require('./routes/GalleryRoutes')
const { getArtProducts, getExclusiveProducts, getSoldoutProducts } = require('./controller/GalleryController');


// connectDB();

const app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/static/products')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9)+(file.mimetype == 'image/png' ? '.png' : '.jpg'))
    }
})
var upload = multer({ storage: storage })
// var upload = multer({ dest: 'public/static/products' })

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

require("./config/db")(app);

const { createProduct, updateProductById } = require('./controller/productController');

// app.use(express.json());

app.use(morgan('dev'));
app.use(cors());

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(bodyParser.json())



// Gallery
app.get('/art', getArtProducts);
app.get('/exclusive', getExclusiveProducts);
app.get('/soldout', getSoldoutProducts);

// Blog
app.use('/posts', PostRoutes);

app.use('/events', EventRoutes);


// Product - Create
app.post('/products', 
    upload.fields([ {name: 'image', maxCount: 1,}, { name: 'galleryimages', maxCount: 10, }]), 
    createProduct);
// Product - Update
app.put('/products/:id', 
    upload.fields([ {name: 'image', maxCount: 1,}, { name: 'galleryimages', maxCount: 10, }]), 
    updateProductById);
// Products - General
app.use('/products', ProductRoutes);
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))