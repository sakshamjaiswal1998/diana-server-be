const User = require('../models/User');
const Role = require('../models/Role');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const getAllUsers = async(req, res) => {
    console.log('Get all Users');
    try {
        const users = await User.find({}).populate('roles');
        res.json(users);
    } catch (error) {
        console.log('ERR: getAllUsers', error);
        res.status(500).json({message: "Server error"})
    }
};

const getUserById = async(req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('roles');
        res.json(user);
    } catch (error) {
        console.log('ERR: getUserById', error);
        res.status(500).json({message: "Server error"})
    }
};

const createUser = async(req, res) => {
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
        const newUser = await User.create(temp);

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

                    newUser.roles = roles.map(role => role._id);
                    newUser.save(err => {
                        if (err) {
                        res.status(500).json({ message: err });
                        }

                        // res.status(200).json(newUser);
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
        // res.json(newUser);
    } catch (error) {
        console.log('ERR: createUser', error);
        res.status(500).json({message: "Server error"})
    }
};

const updateUserById = async(req, res) => {
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

const removeUser = async(req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        res.json(user);
    } catch (error) {
        console.log('ERR: removeUser', error);
        res.status(500).json({message: "Server error"})
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    removeUser
}