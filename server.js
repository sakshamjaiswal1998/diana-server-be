require('dotenv').config();
const express = require('express');
// const connectDB = require('./config/db');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const morgan = require('morgan');

var util = require('util');
var encoder = new util.TextEncoder('utf-8');

const AuthRoutes = require('./routes/auth.routes')
const OrderWebRoutes = require('./routes/order.routes')
const AuthUserRoutes = require('./routes/user.routes')
const ProductRoutes = require('./routes/ProductRoutes')
const PostRoutes = require('./routes/PostRoutes')
const pressRoutes = require('./routes/pressRoutes')
const press1Routes = require('./routes/press1Routes')
const EventRoutes = require('./routes/EventRoutes')
const UserRoutes = require('./routes/UserRoutes')
const OrderRoutes = require('./routes/OrderRoutes')
const EventPageRoutes = require('./routes/EventPageRoutes')
const homeRoutes = require('./routes/homeRoutes')
const userEmail = require("./routes/userEmail")
const authenticEmail= require('./routes/authenticEmail')

const { createProduct, updateProductById } = require('./controller/productController');
const { createPost, updatePostById } = require('./controller/postController');
const { createPress, updatePressById } = require('./controller/pressController');
const { createPress1, updatePress1ById, } = require('./controller/press1Controller');
const { createEvent, updateEventById } = require('./controller/eventController');
const { createUser, updateUserById } = require('./controller/userController');

const { getArtProducts, getExclusiveProducts, getSoldoutProducts, getProduct } = require('./controller/GalleryController');
const { cwd } = require('process');




// App

const app = express();

require("./config/db")(app);

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));



// app.use(express.json());

app.use(morgan('dev'));

// var corsOptions = {
//   origin: ["http://localhost:3001", "http://localhost:4001", "http://dianam.art", "http://admin.dianam.art"],
//   optionsSuccessStatus: 200 // For legacy browser support
// };
// app.use(cors(corsOptions));

app.use(cors());
app.options('*', cors());

var storageProduct = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(process.cwd())
    cb(null,process.cwd()+'/backend/public/products')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + (file.mimetype == 'image/png' ? '.png' : '.jpg'))
  }
})
var uploadProduct = multer({ storage: storageProduct })

var storagePost = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/backend/public/posts')
    console.log(process.cwd())
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + (file.mimetype == 'image/png' ? '.png' : '.jpg'))
  }
})
var uploadPost = multer({ storage: storagePost })


var storageEvent = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/public/events')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + (file.mimetype == 'image/png' ? '.png' : '.jpg'))
  }
})
var uploadEvent = multer({ storage: storageEvent })



var storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/backend/public/users')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + (file.mimetype == 'image/png' ? '.png' : '.jpg'))
  }
})
var uploadUser = multer({ storage: storageUser })







// configure the app to use bodyParser()
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  limit: '10mb',
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
  uploadProduct.fields([{ name: 'image', maxCount: 1, }, { name: 'galleryimages', maxCount: 10, }]),
  createProduct);
// Product - Update
app.put('/products/:id',
  uploadProduct.fields([{ name: 'image', maxCount: 1, }, { name: 'galleryimages', maxCount: 10, }]),
  updateProductById);
// Products - General


// Post - Create
app.post('/posts',
  uploadPost.fields([{ name: 'image', maxCount: 1, }]),
  createPost);
// Post - Update
app.put('/posts/:id',
  uploadPost.fields([{ name: 'image', maxCount: 1, }]),
  updatePostById);
// Posts - General
app.use('/posts', PostRoutes);

app.get('/artwork/:id', getProduct);


// Post - Create
app.post('/press',
  uploadPost.fields([{ name: 'image', maxCount: 1, }]),
  createPress);
// Post - Update
app.put('/press/:id',
  uploadPost.fields([{ name: 'image', maxCount: 1, }]),
  updatePressById);
// Posts - General
app.use('/press', pressRoutes);




// Event - Create
app.post('/events',
  uploadEvent.fields([{ name: 'image', maxCount: 1, }]),
  createEvent);
// Event - Update
app.put('/events/:id',
  uploadEvent.fields([{ name: 'image', maxCount: 1, }]),
  updateEventById);
// Events - General
app.use('/events', EventRoutes);

// Event - Create
app.post('/press1',
  uploadEvent.fields([{ name: 'image', maxCount: 1, }]),
  createPress1);
// Event - Update
app.put('/press1/:id',
  uploadEvent.fields([{ name: 'image', maxCount: 1, }]),
  updatePress1ById);
// Events - General
app.use('/press1', press1Routes);


// User - Create
app.post('/users',
  uploadUser.fields([{ name: 'image', maxCount: 1, }]),
  createUser);
// User - Update
app.put('/users/:id',
  uploadUser.fields([{ name: 'image', maxCount: 1, }]),
  updateUserById);
// Users - General
app.use('/users', UserRoutes);
app.use('/userEmail', userEmail);
// authenticMail routes
app.use('/soldEmail',authenticEmail)
// // User - Create
// app.post('/users', 
//     uploadUser.fields([ {name: 'image', maxCount: 1,}]), 
//     createUser);
// // User - Update
// app.put('/users/:id', 
//     uploadUser.fields([ {name: 'image', maxCount: 1,}]), 
//     updateUserById);
// Users - General
app.use('/orders', OrderRoutes);


// Auth routes
app.use('/', AuthRoutes);
app.use('/', AuthUserRoutes);

app.use('/', OrderWebRoutes);



const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))
