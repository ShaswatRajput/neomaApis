const app = require("./app")
const dotenv = require("dotenv")
const database = require("./config/database")

//Config
dotenv.config({
    path: "backend/config/config.env"
})
//Connecting to Database
database()

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(`We encountered an error: ${err}`)
        process.exit(1);
    }
    console.log(`App is listening on PORT: ${process.env.PORT}`)
})
