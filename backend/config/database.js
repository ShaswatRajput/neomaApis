const mongoose = require("mongoose")

const connectDatabase = ()=>{
    mongoose.connect(process.env.URI)
    .then(() => {
        console.log(`MongoDB connected with server: ${mongoose.connection.host}`);
    })
    .catch((error) => {
        console.error(`MongoDB connection error: ${error}`);
        process.exit(1); 
    });
}
module.exports = connectDatabase