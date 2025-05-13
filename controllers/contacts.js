const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async(req, res) => {
    const results = await mongodb.getDatabase().db().collection('contacts').find();
    results.toArray().then((contacts) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(contacts);

    });

};

const getSingle = async(req, res) => {
    const userId = new ObjectId(req.params.id);
    const results = await mongodb.getDatabase().db().collection('contacts').find({_id: userId});
    results.toArray().then((contacts) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(contacts[0]);

    });
};

module.exports = {
    getAll,
    getSingle
};