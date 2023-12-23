
# Neoma Real Estate API

Welcome to the Neoma Real Estate API project! This API provides endpoints to manage properties in a real estate marketplace.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
 


## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node.js package manager)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/ShaswatRajput/neomaApis.git
Navigate to the project directory:


cd neomaApis
Install dependencies:
npm install

### Usage
Running the Server
Start the server:

npm start
The server will run on http://localhost:4000 by default. You can change the port in the configuration.

# Endpoints
GET /properties
Retrieve all properties.

GET /properties/:id
Retrieve a property by ID.

POST /properties
Add a new property.

PUT /properties/:id
Update a property by ID.

DELETE /properties/:id
Delete a property by ID.

GET /properties/search
Search and filter properties based on location, price range, and property type.
