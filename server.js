const express = require('express');
const mongodb = require('mongodb');
const cors = require('cors');

const app = express();
const jsonParser = express.json();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
require('dotenv').config();

const uri = "mongodb+srv://nick:654321qwerty@cluster0.k6qcv.mongodb.net/peopleList?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  const port = process.env.PORT || 5000;
  try {
    await client.connect();
    const collection = await client.db("peopleList").collection("people");

    app.get('/people', async (req, res) => {
      try {
        await collection.find({}).toArray(function(err, people) {
          console.log(people);
          res.send(people);
        });
      } catch (err) {
        console.log(err)
      }
    });

    app.post('/people', jsonParser, async (req, res) => {
      try {
        if (!req.body) return res.sendStatus(400);
        const person = {_id, name, company, eMail, phoneNumber, status, categories, textArea} = req.body;
        collection.insertOne(person, (err) => {
          if (err) return console.log(err);
          res.send(person);
        });
      } catch (err) {
        console.log(err)
      }
    });

    app.put('/people', jsonParser, async (req, res) => {
      try {
        if(!req.body) return res.status(400);
        const { _id: id, name, company, eMail, phoneNumber, status, categories, textArea } = req.body;
        collection.findOneAndUpdate(
          {_id: id},
          {$set: {name, company, eMail, phoneNumber, status, categories, textArea}},
          {returnOriginal: false},
          (err, person) => {
            if(err) console.log(err);
            res.send(person.value);
          });
      } catch (err) {
        console.log(err)
      }
    });

    app.delete('/people/:id', async (req, res) => {
      try {
        const id = req.params.id;
        collection.deleteOne({"_id": id}, (err, person) => {
          if(err) return console.log(err);
          res.send(person.value);
        });
      } catch (err) {
        console.log(err)
      }
    });

    app.listen(port, () => console.log(`We live on ${port} port`));
  } catch (e) {
    console.log(e);
  } finally {
    process.on('SIGINT', () => {
      client.close();
      process.exit();
    });
  }
}

main().catch(console.error);