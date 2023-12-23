const express = require("express")
const router = express.Router()
const { getPropertyByID, deletePropertyByID, updatePropertyByID, addProperty, getAllProperties, searchAndFilterProperties} = require("../controllers/propertyControllers")

//Single route for both search and filter. This will help with filtering within specific location. Works like normal filter if you dont pass location.
router.route("/property/search").get(searchAndFilterProperties)
// Get property by ID, delete property, update property
router.route("/property/:id").get(getPropertyByID).delete(deletePropertyByID).put(updatePropertyByID)
// Add a new property, get all properties
router.route("/property").post(addProperty).get(getAllProperties)




module.exports = router