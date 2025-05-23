const mongodb = require('../data/database');
const ObjectId  = require('mongodb').ObjectId;

//#swagger.tags=['contacts']
const getAll = async(req, res) => {
    const results = await mongodb.getDatabase().db().collection('contacts').find();
    results.toArray().then((contacts) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(contacts);

    });

};

const getSingle = async(req, res) => {
    //#swagger.tags=['contacts']
    const userId = new ObjectId(req.params.id);
    const results = await mongodb.getDatabase().db().collection('contacts').find({_id: userId});
    results.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);

    });
};

const createUser = async (req, res) =>{
    //#swagger.tags=['contacts']
    const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'some error occured while updating the user.');
    }
};

const updateUser = async (req, res) =>{
    //#swagger.tags=['contacts']
    const userId = new ObjectId(req.params.id);
    const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'some error occured while updating the user.');
    }
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['contacts']
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({_id: userId});
    if (response.deletedCount > 0){
        res.status(204).send();
    }else{
        res.status(500).json(response.error || 'Some error occured while deleting the user.')
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};