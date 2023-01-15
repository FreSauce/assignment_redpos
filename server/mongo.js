const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db, _collection;

const mongoConnect = (callback) => {
  MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true })
    .then((client) => {
      console.log("Connected to database!");
      _db = client.db("db");
      _collection = _db.collection("users");
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

const getCollection = () => {
  if (_collection) {
    return _collection;
  }
  throw "No collection found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
exports.getCollection = getCollection;
