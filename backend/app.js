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

        res.status(200).send(`<center>
        <h1>Welcome to the Neoma Real Estate Apis</h1>
        <ul>
        <li> GET /properties    ---Retrieve all properties.</li>
        <li>GET /properties/:id    ---Retrieve a property by ID.</li>
        <li>POST /properties    ---Add a new property.</li>
        <li>PUT /properties/:id    ---Update a property by ID.</li>
        <li>DELETE /properties/:id    ---Delete a property by ID.</li>
        <li>GET /properties/search    ---Search and filter properties based on location, price range, and property type.</li>
        </ul>
        <iframe width="1280" height="720" src="https://www.youtube.com/embed/O-tmHDm45Ao?si=qM4_2xaFAsD7J8h3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </center>`)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "failed",
            error
        })
    }

})

module.exports = app
