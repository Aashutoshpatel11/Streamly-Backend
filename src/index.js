import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

import { app } from "../app.js";

let isConnected = false

connectDB = async () => {
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

app.use( async(req, res, next) => {
  if(!isConnected){
    await connectDB()
  }
  next()
} )



// connectDb()
// .then( ()=>{
//     app.listen( process.env.PORT,  ()=>{
//         console.log('Listening at PORT: ', process.env.PORT);
//     } )
// } )
// .catch( (error)=>{
//     console.log('DB Connection Failed :: ERROR :: ',error);
//     throw(error);
// } )

































// import express from 'express'
// const app = express()
// const connectDb = async function(){
//     try {
//         await mongoose.connect( `${process.env.DATABASE_URI}/${DB_NAME}` )

//         app.on( error, ()=>{
//             console.log(error);
//             throw error;
//         } )

//         app.listen( process.env.PORT , ()=>{
//             console.log( `Listening at Port ${process.env.PORT}` );
//         } )
//     } catch (error) {
//         console.log(error);
//         throw(error)
//     }
// }

// connectDb();