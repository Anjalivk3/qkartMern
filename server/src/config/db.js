const mongoose = require("mongoose");

    const connectDB = async ()=> {
        try {

                const conn = await mongoose.connect(process.env.MONGODB_URI);
                
                console.log("MongoDB Connected", conn.connection.host);
                } 

        catch (error) {
                console.error("Error during connection with mongoDB Database", error.message);
                
                process.exit(1);
            }

      } 

      module.exports = connectDB;

  



