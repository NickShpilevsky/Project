const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const cors = require('cors');

const app = express();
const jsonParser = express.json();
app.use(cors());
// const port = 3000;

const mongoClient = new MongoClient('mongodb://localhost:27017/', {useNewUrlParser: true, useUnifiedTopology: true });

let dbClient;

app.use(express.static(__dirname + '/public'));

mongoClient.connect( function(err, client) {
    if(err) {
        return console.log(err);
    }
    dbClient = client;
    app.locals.collection = client.db('peopleList').collection('people');
    app.listen(5000, function() {
        console.log('We live on 5000 port');
    });
});

app.get('/people', function(req, res) {                         //GET all clients
    const collection = req.app.locals.collection;
    collection.find({}).toArray(function(err, people) {
        if(err) {
            return console.log(err);
        }
        res.send(people);
    });
});

app.get('/people/:id', function(req, res) {                     //GET certain person
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOne({_id: id}, function(err, person) {
        if(err) {
            return console.log(err);
        }
        res.send(person);
    });
});

app.post('/people', jsonParser, function(req, res) {             //INSERT person
    if(!req.body) {
        return res.sendStatus(400);
    }
    const { _id, name, company, eMail, phoneNumber, status, category, textArea } = req.body;

    const person = {
        _id,
        name,
        company,
        eMail,
        phoneNumber,
        status,
        category,
        textArea,
    };
    const collection = req.app.locals.collection;
    collection.insertOne(person, function(err, result) {
        if(err) {
            return console.log(err);
        }
        res.send(person);
    });
});

app.put('/people', jsonParser, (req, res) => {                      //CHANGE person
    if(!req.body) {
        return res.status(400);
    }
    const id = req.body._id;
    const { name, company, eMail, phoneNumber, status, category, textArea } = req.body;
    const collection = req.app.locals.collection;

    collection.findOneAndUpdate(
        {_id: id},
        {$set: {name, company, eMail, phoneNumber, status, category, textArea}},
        {returnOriginal: false},
        (err, result) => {
        if(err) {
            console.log(err);
        }
        const person = result.value;
        console.log(person);
        res.send(person);
    });
});

app.delete('/people/:id', function(req, res) {                     //DELETE person
    const id = req.params.id;
    console.log(id);
    const collection = req.app.locals.collection;
    collection.deleteOne({"_id": id}, function (err, result) {
        if(err) {
            return console.log(err);
        }
        let person = result.value;
        res.send(person);
    });
});

process.on('SIGINT', () => {
    dbClient.close();
    process.exit();
});