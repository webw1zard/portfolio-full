// import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI as string;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// export async function connectDB() {
//   if (mongoose.connection.readyState >= 1) {
//     return mongoose.connection;
//   }

//   return mongoose.connect(MONGODB_URI, {
//     dbName: "portfolio",
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   } as mongoose.ConnectOptions);
// }
