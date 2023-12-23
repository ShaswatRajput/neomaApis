const Property = require("../models/propertyModel")
const mongoose = require("mongoose")


exports.addProperty = async (req, res) => {
    try {
        // const { propertyName, city, address, zip, owner,price, type } = req.body
        const newProperty = await Property.create(req.body)

        res.status(201).json({
            status: "success",
            messsage: "Added Property",
            data:newProperty
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: "Failed",
            Message: `Oops! We cannot add your Property. Error: ${err} `
        })
    }
}

exports.getAllProperties = async (req, res) => {
    try {
        const allProperty = await Property.find({})
        res.status(200).json({
            status: "success",
            data: allProperty
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "Failed",
            Message: `Wooops! We got an Error: ${error}`
        })
    }
}
exports.getPropertyByID = async (req, res) => {
    try {
        const { id } = req.params
        const idData = await Property.findById(id)

        if (!idData) {
            return res.status(404).json({
                status: "Failed",
                message: "No document found with the specified ID."
            });
        }


        res.status(200).json({
            status: "success",
            data: idData
        })
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid ID. Please provide a valid Id."
            });
        }
        console.log(error)
        res.status(500).json({
            status: "Failed",
            messsage: `Doopsy Daisy!!! We encountered an Error: ${error}`
        })
    }

}

exports.deletePropertyByID = async (req, res) => {
    try {
        const { id } = req.params
        const delData = await Property.findOneAndDelete({ _id: id })
        if (!delData) {
            return res.status(404).json({
                status: "Failed",
                message: "No document found with the specified ID."
            });
        }
        res.status(200).json({
            status: "success",
            data: delData
        })
    } catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid ID. Please provide a valid Id."
            });
        }
        console.log(error)
        res.status(500).json({
            status: "Failed",
            messsage: `Doopsy Daisy!!! We encountered an Error: ${error}`
        })
    }

}
exports.updatePropertyByID = async (req, res) => {
    try {
        const { id } = req.params
        const { propertyName, city, address, zip, owner, price, type } = req.body
        let updates = {};
        if (propertyName) {
            updates.propertyName = propertyName
        }
        if (city) {
            updates.city = city
        }
        if (address) {
            updates.address = address
        }
        if (zip) {
            updates.zip = zip
        }
        if (owner) {
            updates.owner = owner
        }
        if (price) {
            updates.price = price
        }
        if (type) {
            updates.type = type
        }
        const uptData = await Property.findOneAndUpdate({ _id: id }, updates)
        if (!uptData) {
            return res.status(404).json({
                status: "Failed",
                message: "No document found with the specified ID."
            });
        }
        res.status(200).json({
            status: "success",
            data: uptData
        })
    } catch (error) {


        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({
                status: "Failed",
                message: "Invalid ID. Please provide a valid Id."
            });
        }
        console.log(error)
        res.status(500).json({
            status: "Failed",
            messsage: `Doopsy Daisy!!! We encountered an Error: ${error}`
        })
    }

}

exports.searchAndFilterProperties = async (req, res) => {
    const location = req.query.location;
    const minPrice = req.query.minPrice || 0;
    const maxPrice = req.query.maxPrice || Number.MAX_SAFE_INTEGER;
    const propertyType = req.query.type;

    let filter = {};

    if (location) {
        filter.city = { $regex: new RegExp(location, 'i') };
    }

    filter.price = { $gte: minPrice, $lte: maxPrice };

    if (propertyType) {
        filter.type = { $regex: new RegExp(propertyType, 'i') };
    }

    try {
        const properties = await Property.find(filter);
        if (!properties) {
            throw new Error("We couldn't find any documents with details provided")
        }
        res.status(200).json(properties);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: "Failed",
            messsage: `Doopsy Daisy!!! We encountered an Error: ${error}`
        })
    }
}
