# TSM_server

TSM_server is a backend project implemented in JavaScript, designed to manage core data and operations for a transportation or fleet management system. The backend provides RESTful APIs to handle entities such as trailers, drivers, and clients, facilitating CRUD operations and authentication for users.

## Main Features

- **User Authentication**: Uses JWT tokens to securely authenticate and authorize users for API access.
- **Trailer Management**: Endpoints for creating, updating, listing, and deleting trailers with detailed attributes like number, brand, model, VIN, plate, type, and door style.
- **Driver Management**: APIs to manage driver information, including personal and contact details, address, and employee numbers.
- **Client Management**: Handles client data such as names, contact information, billing details, credit status, and address.
- **Database Connection**: Integrates with MongoDB, using Mongoose for modeling and queries. Includes seeders for initial data setup.
- **Modular Structure**: Organized into controllers, models, routes, and middlewares for scalability and maintainability.
- **CORS and File Upload**: Middleware support for cross-origin requests and file uploads.

## Getting Started

The server loads environment variables, connects to a MongoDB database, and exposes various endpoints via Express. To start the project, ensure you have a `.env` file with the necessary configuration and run:

```bash
npm install
node server.js
```

## Technologies Used

- JavaScript (Node.js)
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- CORS, file uploads, and other essential middlewares

## License

This project is licensed under the MIT License.

---

**Note:** This backend is intended for private use and is not publicly available. For further details, refer to the source code and controllers for each module.
