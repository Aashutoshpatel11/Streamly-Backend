import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

import { app } from "../app.js";

let isConnected = false

async function connectDB(){
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect( `${process.env.DATABASE_URI}/${DB_NAME}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } );

    isConnected = true
    console.log("DB Connected :: Hosted At:", db.connection.host);

  } catch (error) {
    console.log("DB Connection Error:", error);
    throw error;
  }
};

app.use( (req, res, next) => {
  if(!isConnected){
    connectDB()
  }
  next()
} )

export default app



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