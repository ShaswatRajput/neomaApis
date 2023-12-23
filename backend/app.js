const express = require("express")
const app = express()
const router = require("./routes/propertyRoutes")
const Location = require("./models/propertyModel")
const morgan = require('morgan')
const cors = require('cors');

// Middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('tiny'))
app.use("/", router)


// Default Route
app.get("/", async (req, res) => {
    try {
        const preData = await Location.find({})
        if (preData.length === 0) {

            // Third Party API data 
            const response = await fetch(`https://realestateapi-1knh.onrender.com/properties`);
            if (!response.ok) {
                throw new Error(`Real Estate API request failed with status ${response.status}`);
            }
            const data = await response.json();
            await Location.insertMany(data.data);
        }

        res.status(200).send(`<h1>Welcome to the Neoma Real Estate Marketplace</h1>`)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "failed",
            error
        })
    }

})

module.exports = app
