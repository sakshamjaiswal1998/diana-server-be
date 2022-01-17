const User = require('../models/User');
const Order = require('../models/Order');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const getAllOrders = async(req, res) => {
    console.log('Get all Orders');
    try {
        const orders = await Order.find({});
        // .populate('user');
        res.json(orders);
    } catch (error) {
        console.log('ERR: getAllOrders', error);
        res.status(500).json({message: "Server error"})
    }
};

const getOrderById = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('roles');
        res.json(order);
    } catch (error) {
        console.log('ERR: getOrderById', error);
        res.status(500).json({message: "Server error"})
    }
};

const createOrder = async(req, res) => {
    console.log(req.file, req.body, req.files, 'FILE/BODY/FILES')
    let temp = req.body;
    if(req.files.image) {
        console.log('files.img', req.files.image)
        temp.image = req.files.image[0].filename;
    }
    try {
        console.log('temp', temp);
        let inputRoles = req.body.roles;
        delete req.body.roles;
        const newOrder = await Order.create(temp);

        if (inputRoles) {
            let tempRoles = JSON.parse(inputRoles);
            console.log('tempRoles', tempRoles);
            if (tempRoles && tempRoles.length > 0) {
                Role.find(
                    {
                    name: { $in: tempRoles }
                    },
                    (err, roles) => {
                    if (err) {
                        res.status(500).json({ message: err });
                    }

                    newOrder.roles = roles.map(role => role._id);
                    newOrder.save(err => {
                        if (err) {
                        res.status(500).json({ message: err });
                        }

                        // res.status(200).json(newOrder);
                    });
                    }
                );
            }
            else {
                console.log('non role / default');
                // fro below
                Role.findOne({ name: "order" }, (err, role) => {
                    if (err) {
                    res.status(500).json({ message: err });
                    }
                    else {
                        newOrder.roles = [role._id];
                        newOrder.save(err => {
                            if (err) {
                                res.status(500).json({ message: err });
                                return;
                            }
                            else {
                                res.status(200).json(newOrder);
                            }
                        });
                    }
                });
            }
        }
        else {
            console.log('non role args');
            Role.findOne({ name: "order" }, (err, role) => {
                if (err) {
                res.status(500).json({ message: err });
                }
                else {
                    newOrder.roles = [role._id];
                    newOrder.save(err => {
                    if (err) {
                        res.status(500).json({ message: err });
                    }
                    else {
                        res.status(200).json(newOrder);
                    }
                    });
                }

            });

        }
        // res.json(newOrder);
    } catch (error) {
        console.log('ERR: createOrder', error);
        res.status(500).json({message: "Server error"})
    }
};

const updateOrderById = async(req, res) => {
    try {
        console.log('REQ', req.body);
        let newUser = await User.findOneAndUpdate({_id: req.params.id}, {$set: {
            username: req.body.username,
            email: req.body.email,
            // password: req.body.password,
            // roles: req.body.JSON,
        }});
        
        if(req.files.image) {
            await User.findOneAndUpdate({_id: req.params.id}, {$set: {
                image: req.files.image[0].filename,
            }});
        }


        if (req.body.roles) {
            let tempRoles = JSON.parse(req.body.roles);
            console.log('tempRoles', tempRoles);
            if (tempRoles && tempRoles.length > 0) {
                Role.find(
                    {
                    name: { $in: tempRoles }
                    },
                    (err, roles) => {
                        console.log('cb : err, roles', err, roles)
                    if (err) {
                        res.status(500).json({ message: err });
                    }

                    newUser.roles = roles.map(role => role._id);
                    newUser.save(err => {
                        if (err) {
                            res.status(500).json({ message: err });
                        }
                        else {
                            res.status(200).json(newUser);
                        }
                    });
                    }
                );
            }
            else {
                console.log('non role / default');
                // fro below
                Role.findOne({ name: "user" }, (err, role) => {
                    if (err) {
                    res.status(500).json({ message: err });
                    }
                    else {
                        newUser.roles = [role._id];
                        newUser.save(err => {
                            if (err) {
                                res.status(500).json({ message: err });
                                return;
                            }
                            else {
                                res.status(200).json(newUser);
                            }
                        });
                    }
                });
            }
        }
        else {
            console.log('non role args');
            Role.findOne({ name: "user" }, (err, role) => {
                if (err) {
                res.status(500).json({ message: err });
                }
                else {
                    newUser.roles = [role._id];
                    newUser.save(err => {
                    if (err) {
                        res.status(500).json({ message: err });
                    }
                    else {
                        res.status(200).json(newUser);
                    }
                    });
                }

            });

        }
        



        // const user = await User.findOne({_id: req.params.id});
        // res.json(user);
    } catch (error) {
        console.log('ERR: updateUserById', error);
        res.status(500).json({message: "Server error"})
    }
};

const removeOrder = async(req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        res.json(user);
    } catch (error) {
        console.log('ERR: removeUser', error);
        res.status(500).json({message: "Server error"})
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderById,
    removeOrder
}