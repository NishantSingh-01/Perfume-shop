import mongoose, { connect } from "mongoose"


 const  connectdb = async()=> {
    try{
         const connectionIntence= await mongoose.connect(`${process.env.MONGODB_URI}`)
         console.log(`\n MongoDB connected Successfully:: DB_HOST: ${connectionIntence.connection.host}`
    );
        }catch (error){
            console.error("Mongo_DB connection error:", error);
            process.exit(1)
      }
 }
 export default connectdb