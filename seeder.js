require('dotenv').config();

// const productsData = require('./data/products');
// const postsData = require('./data/posts');
// const eventsData = require('./data/events');
const featuredData = require('./data/featured');

const connectDB = require('./config/db');
// const Product = require('./models/Product');
// const Post = require('./models/Post');
// const Event = require('./models/Event');
const Featured = require('./models/Featured');

connectDB();

const importData = async() => {
    try {
        // await Product.deleteMany({});
        // await Product.insertMany(productsData);
        // console.log('Products imported');
        // await Post.deleteMany({});
        // await Post.insertMany(postsData);
        // console.log('Posts imported');
        // await Event.deleteMany({});
        // await Event.insertMany(eventsData);
        // console.log('Events imported');
        await Featured.deleteMany({});
        await Featured.insertMany(featuredData);
        console.log('Featured art imported');
        process.exit();
    } catch (error) {
        console.log('Post Import Error : ', error);
        process.exit(1);
    }
}

importData();