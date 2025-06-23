import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/kingscart";

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI, {
    dbName: "kingscart",
  });
}

export default mongoose;
