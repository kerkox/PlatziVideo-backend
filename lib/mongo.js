const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');
const colors = require('colors');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {


  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true , useUnifiedTopology: true });
    this.dbName = DB_NAME;
    this.db = null;
  }

  async connect() {
    if (!this.db) {
      await new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
            return;
          }
          this.db = this.client.db(this.dbName)
          console.log(colors.yellow("Conencted successfuly to mongo"))
          resolve(true);
        })
      })
    }
    return this.db;
  }

  getAll(collection, query) {
    return this.connect().then(db => {
      return db.collection(collection).find(query).toArray();
    })
  }

  get(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) }).toArray();
    })
  }

  create(collection, data) {
    return this.connect().then(db => {
      return db.collection(collection).insertOne(data)
    }).then(result => result.insertedId);
  }

  update(collection, id, data) {
    return this.connect().then(db => {
      return db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
    }).then(result => result.upsertedId || id);
  }

  delete(collection, id) {
    return this.connect().then(db => {
      return db.collection(collection).deleteOne({ _id: Object(id) })
    }).then(() => id);
  }




}

module.exports = MongoLib;