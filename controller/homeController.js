const Event = require('../models/Event');
const multer  = require('multer');
const Featured = require('../models/Featured');
const upload = multer({ dest: 'uploads/' })


const getHome = async(req, res) => {
    try {
        const featureds = await Featured.find({});
        res.json(featureds);
    } catch (error) {
        console.log('ERR: getHome', error);
        res.status(500).json({message: "Server error"})
    }
};

const getFeatured = async(req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (error) {
        console.log('ERR: getAllEvents', error);
        res.status(500).json({message: "Server error"})
    }
};

const postFeatured = async(req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        res.json(event);
    } catch (error) {
        console.log('ERR: getEventById', error);
        res.status(500).json({message: "Server error"})
    }
};

const createEvent = async(req, res) => {
    // console.log(req.file, req.body, req.files, 'FILE/BODY/FILES')
    let temp = req.body;
    console.log('req body*', temp);
    if(req.files.image) {
        console.log('files.img', req.files.image)
        temp.image = req.files.image[0].filename;
    }
    try {
        const newEvent = await Event.create(temp);
        res.json(newEvent);
    } catch (error) {
        console.log('ERR: createEvent', error);
        res.status(500).json({message: "Server error"})
    }
};

const updateEventById = async(req, res) => {
    // console.log(req.file, req.body, req.files, 'FILE/BODY/FILES')
    // let temp = req.body;
    try {
        console.log('REQ', req.body);
        await Event.findOneAndUpdate({_id: req.params.id}, {$set: {
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            location: req.body.location,
            startdate: req.body.startdate,
            starttime: req.body.starttime,
            address: req.body.address,
            mapurl: req.body.mapurl,
        }});
        if(req.body.enddate) {
            await Event.findOneAndUpdate({_id: req.params.id}, {$set: {
                enddate: req.body.enddate,
            }});
        } 
        else {
            console.log('not pre date');
            Event.findOne({_id: req.params.id}, function(err, event){
                event.enddate = undefined;
                event.save();
              });
        }
        if(req.body.endtime) {
            await Event.findOneAndUpdate({_id: req.params.id}, {$set: {
                endtime: req.body.endtime,
            }});            
        } 
        else {
            console.log('not pre time');
            Event.findOne({_id: req.params.id}, function(err, event){
                event.endtime = undefined;
                event.save();
              });
        }
        if(req.files.image) {
            await Event.findOneAndUpdate({_id: req.params.id}, {$set: {
                image: req.files.image[0].filename,
            }});
        }        
        const event = await Event.findOne({_id: req.params.id});
        res.json(event);
    } catch (error) {
        console.log('ERR: updateEventById', error);
        res.status(500).json({message: "Server error"})
    }
};

const removeEvent = async(req, res) => {
    try {
        const event = await Event.findByIdAndRemove(req.params.id);
        res.json(event);
    } catch (error) {
        console.log('ERR: removeEvent', error);
        res.status(500).json({message: "Server error"})
    }
};

module.exports = {
    getHome,
}