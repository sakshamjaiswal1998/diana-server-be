require('dotenv').config();

const mongoose = require("mongoose");
module.exports = app => {
    mongoose.connect('mongodb://127.0.0.1:27017/diana', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        // useFindAndModify: false
    }).then(res => console.log("connected")).catch(err => console.log(err))
    mongoose.Promise = global.Promise;
    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGHUP", cleanup);
    if (app) {
        app.set("mongoose", mongoose);
    }
};
function cleanup() {
    mongoose.connection.close(function () {
        process.exit(0);
    });
}



// const mongoose = require('mongoose');

// const connectDB = async() => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })
//         console.log('DB Connection success');
//     } catch (error) {
//         console.log('ERR : DB Connection fail');
//         process.exit(1);
//     }
// }

// module.exports = connectDB;