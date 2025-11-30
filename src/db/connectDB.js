import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect( `${process.env.DATABASE_URI}/${DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } );

    isConnected = db.connections[0].readyState === 1;
    console.log("DB Connected :: Hosted At:", db.connection.host);

  } catch (error) {
    console.log("DB Connection Error:", error);
    throw error;
  }
};
