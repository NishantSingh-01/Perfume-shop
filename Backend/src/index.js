import app from '../src/app.js'
import dotenv from "dotenv"
import connectdb from './db/db.js';
 dotenv.config({
    path: './.env'
})
connectdb()
    .then(() => {
        app.listen(process.env.PORT || 7000, () => {
            console.log(`server is ready at ${process.env.PORT}`);
        });
        app.on("error", (error) => {
            console.error("ERROR:", error)
            throw error
        })
    })
    .catch((error) => {
        console.log("Mongo_DB connection failed", error);
    });
    
    app.get('/api/v1',(_,res)=>{
        res.send('Welcome to the Perfume Shop')
    })
    