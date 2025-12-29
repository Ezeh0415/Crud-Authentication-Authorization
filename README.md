# Crud-Authentication-Authorization

this is a crud asignment with authentication and authorization

This project follows a clean MVC-based architecture with a Service layer, designed to keep the codebase modular, maintainable, and scalable.

Architecture Overview

Client → Router → Controller → Service → Model → Database

ApiKey = fab79d7a9ca80b241b29ab237797ed6c44d0ada725b9ff57ee389f4079311e68  
this is done for the Teach to have access to

📌 Router Layer

Purpose:
The router maps HTTP requests to controller methods.

Responsibilities:

Defines API endpoints (GET, POST, PUT, DELETE)

Applies middleware (authentication, etc.)

Forwards requests to controllers

Does NOT:

Validate request data

Contain business logic

Access the database

Example:

router.post("/register", Require_Api_key, Require_jwt_key, userController.createUser);

📌 Controller Layer

Purpose:
Controllers handle HTTP-related logic and act as the bridge between the client and the service layer.

Responsibilities:

Extract data from req

Validate inputs

Call service methods

Return HTTP responses

Handle status codes and errors

Does NOT:

Access the database directly

Contain complex business logic

Example:

const { name, email, password } = req.body;
const user = await userService.createUser({ name, email, password });

📌 Service Layer

Purpose:
The service layer contains business logic and communicates with models.

Responsibilities:

Database operations

Business rules

Data transformation

Reusable logic across controllers

Does NOT:

Use req or res

Return HTTP responses

Example:

async createUser(data) {
const user = new UserModel(data);
return await user.save();
}

📌 Model Layer

Purpose:
Models define the database schema and structure.

Responsibilities:

Define data shape

Enforce validation rules

Communicate with the database

Does NOT:

Handle HTTP logic

Contain business rules

Example:

const UserSchema = new mongoose.Schema({
name: String,
email: String,
password: String,
});

🔁 Request Lifecycle

Client sends an HTTP request

Router matches the endpoint

Controller validates input

Service executes business logic

Model interacts with the database

Controller returns a response

✅ Benefits of This Architecture

Clear separation of concerns

Easy debugging and testing

Scalable for large applications

Reusable business logic

Cleaner, readable codebase

📂 Recommended Folder Structure
src/
├── models/
├── services/
├── controllers/
├── routes/
├── middlewares/
├── utils/
└── app.js
