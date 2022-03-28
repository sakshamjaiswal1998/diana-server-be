const Post = require('../models/press');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const getAllPress = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.json(posts);
    } catch (error) {
        console.log('ERR: getAllPosts', error);
        res.status(500).json({ message: "Server error" })
    }
};

const getPressById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (error) {
        console.log('ERR: getPostById', error);
        res.status(500).json({ message: "Server error" })
    }
};

const createPress = async (req, res) => {
    // console.log(req.file, req.body, req.files, 'FILE/BODY/FILES')
    let temp = req.body;
    if (req.files.image) {
        console.log('files.img', req.files.image)
        temp.image = req.files.image[0].filename;
    }
    if (req.files.galleryimages) {
        temp.galleryimages = [];
        req.files.galleryimages.map(async (rFile) => {
            await temp.galleryimages.push({ path: rFile.filename });
        });
    }
    try {
        const newPost = await Post.create(temp);
        res.json(newPost);
    } catch (error) {
        console.log('ERR: createPost', error);
        res.status(500).json({ message: "Server error" })
    }
};

const updatePressById = async (req, res) => {
    // console.log(req.file, req.body, req.files, 'FILE/BODY/FILES')
    // let temp = req.body;
    try {
        // console.log('REQ', req.params, req.body);
        let model = await Post.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                title: req.body.title,
                body: req.body.body,
                category: req.body.category,
            }
        });
        if (req.files.image) {
            await Post.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    image: req.files.image[0].filename,
                }
            });
        }

        if (req.body.deletions || req.files.galleryimages) {
            let stack = JSON.parse(JSON.stringify(model.galleryimages));
            console.log('orig', stack);
            console.log('deletions', req.body.deletions)
            if (req.body.deletions) {
                let dArr = req.body.deletions.split(',');
                console.log('dArr', dArr);
                dArr.map(deletion => {
                    console.log('deleting: ', deletion);
                    let pos = stack.findIndex(s => s._id == deletion);
                    console.log('pos', pos, pos == -1);
                    if (pos !== -1) {
                        console.log('splice at ' + pos);
                        stack.splice(pos, 1);
                    }
                });
                console.log('del res', stack)
            }
            if (req.files.galleryimages) {
                // temp.galleryimages = [];
                req.files.galleryimages.map(async (rFile) => {
                    await stack.push({ path: rFile.filename });
                    // await temp.galleryimages.push({path: rFile.filename});
                });
            }

            await Post.findOneAndUpdate({ _id: req.params.id }, {
                $set: {
                    galleryimages: stack,
                }
            });

        }

        // if(req.file) {
        //     const post = await Product.findOneAndUpdate({id: req.params.id}, {$set: {
        //         image: req.file.filename,
        //     }});
        //     res.json(product);
        // }

        const post = await Post.findOne({ _id: req.params.id });
        res.json(post);
    } catch (error) {
        console.log('ERR: updatePostById', error);
        res.status(500).json({ message: "Server error" })
    }
};

const removePress = async (req, res) => {
    try {
        const post = await Post.findByIdAndRemove(req.params.id);
        res.json(post);
    } catch (error) {
        console.log('ERR: removePost', error);
        res.status(500).json({ message: "Server error" })
    }
};

module.exports = {
    getAllPress,
    getPressById,
    createPress,
    updatePressById,
    removePress
}