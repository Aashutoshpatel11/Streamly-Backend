import dotenv from 'dotenv'

dotenv.config({ path: './.env' })
import {app} from './app.js'

let isConneted = false

const connectDb = async ()=>{
    try {
        const dbConnectioninstance = await mongoose.connect( `${process.env.DATABASE_URI}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } );
        isConneted = true
        console.log( '\nDB Connected :: Hosted At : ', dbConnectioninstance.connection.host, '\n' );
    } catch (error) {
        console.log('DB Connection :: ERROR :: ',error)
    }
}

app.use((req, res, next) => {
    if(!isConneted){
        connectDb()
    }
    next()
})


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

export default app;
































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