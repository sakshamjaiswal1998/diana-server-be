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
const EventPageRoutes = require('./routes/EventPageRoutes')
const homeRoutes = require('./routes/homeRoutes')

const { createProduct, updateProductById } = require('./controller/productController');
const { createPost, updatePostById } = require('./controller/postController');
const { createEvent, updateEventById } = require('./controller/eventController');

const { getArtProducts, getExclusiveProducts, getSoldoutProducts } = require('./controller/GalleryController');


// connectDB();

const app = express();

require("./config/db")(app);

app.use(express.limit('4M'));

var storageProduct = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.cwd()+'/backend/public/products')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9)+(file.mimetype == 'image/png' ? '.png' : '.jpg'))
    }
})
var uploadProduct = multer({ storage: storageProduct })

var storagePost = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd()+'/backend/public/posts')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9)+(file.mimetype == 'image/png' ? '.png' : '.jpg'))
  }
})
var uploadPost = multer({ storage: storagePost })

var storageEvent = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd()+'/backend/public/events')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9)+(file.mimetype == 'image/png' ? '.png' : '.jpg'))
  }
})
var uploadEvent = multer({ storage: storageEvent })


// var upload = multer({ dest: 'public/products' })

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));



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

app.use('/events', EventPageRoutes);
app.use('/home', homeRoutes);


// Product - Create
app.use('/products', ProductRoutes);
app.post('/products', 
    uploadProduct.fields([ {name: 'image', maxCount: 1,}, { name: 'galleryimages', maxCount: 10, }]), 
    createProduct);
// Product - Update
app.put('/products/:id', 
    uploadProduct.fields([ {name: 'image', maxCount: 1,}, { name: 'galleryimages', maxCount: 10, }]), 
    updateProductById);
// Products - General


// Post - Create
app.post('/posts', 
    uploadPost.fields([ {name: 'image', maxCount: 1,}]), 
    createPost);
// Post - Update
app.put('/posts/:id', 
    uploadPost.fields([ {name: 'image', maxCount: 1,}]), 
    updatePostById);
// Posts - General
app.use('/posts', PostRoutes);


// Event - Create
app.post('/events', 
    uploadEvent.fields([ {name: 'image', maxCount: 1,}]), 
    createEvent);
// Event - Update
app.put('/events/:id', 
    uploadEvent.fields([ {name: 'image', maxCount: 1,}]), 
    updateEventById);
// Events - General
app.use('/events', EventRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))