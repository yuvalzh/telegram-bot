process.env.DATABASE_URL =
  // process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/mern";
  process.env.DATABASE_URL ||
  "mongodb://mongouser:yalmo@cluster0-shard-00-00.omr1b.mongodb.net:27017,cluster0-shard-00-01.omr1b.mongodb.net:27017,cluster0-shard-00-02.omr1b.mongodb.net:27017/yalmo?ssl=true&replicaSet=atlas-davbkh-shard-0&authSource=admin&retryWrites=true&w=majority";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.PORT = process.env.PORT || 3001;
process.env.ORIGIN = process.env.ORIGIN || "http://localhost:8080";
process.env.DOMAIN = process.env.DOMAIN || "localhost";
process.env.SESSION_SECRET = process.env.SESSION_SECRET || "mern";
