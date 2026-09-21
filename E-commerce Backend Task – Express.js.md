  
## Objective  
The goal is to build a simple e-commerce backend API using Express.js, Prisma, and SQLite. The focus is on understanding project structure, routing, authentication, file uploads, validation, and error handling.  
  
## Technologies  
- **Express.js**  
- **Prisma + SQLite**  
- **JWT** for authentication  
- **bcrypt** for password hashing  
- **Multer** for file uploads  
- **express-validator** for input validation  
- **dotenv**, **nodemon**  
  
## Backend Overview  
The backend should include the following high-level features:  
  
- **User:** Registration, login, and JWT-based authentication. A user can have multiple images (a list of user images).  
- **Category:** Products are organized into categories.  
- **Product:** Belongs to a category, with an image, price, and stock.  
- **Favorite:** Each user can have a list of favorite products.  
- **File Upload:** For user images and product images.  
- **Authentication:** Some routes require a logged-in user. Certain actions are restricted to admin users only.  
  
## General Expectations  
- Clean and modular project structure (routes, controllers, middlewares, validators separated).  
- Input validation using express-validator.  
- Centralized error handling with a custom error class and error handler middleware.  
- Consistent response format: `{ success, data, message }`.  
- Static serving of uploaded files.  
- Complete Postman Collection covering all requests.  
- `.env` and `.env.example` files.  
- README with setup instructions and a general description of endpoints.  
- Meaningful Git commits.  
  
## Roadmap  
  
### Week 1 – Deliver Half of the Work  
- Project setup, folder structure, and Prisma + SQLite configuration.  
- Design models and run migrations.  
- Authentication module (register, login, JWT middleware).  
- Basic error handling and validation.  
- CRUD for categories.  
- CRUD for products with image upload.  
  
📌 **End of Week 1:** Auth + Categories + Products should be ready and tested in Postman.  
  
### Week 2 – Completion and Final Delivery  
- User images (upload, list, delete).  
- Favorites (add, remove, list).  
- Complete Postman Collection.  
- Test all endpoints and fix bugs.  
- Write README and final code cleanup.  
  
## Notes  
- Clean, readable code is more important than implementing every feature.  
- If anything is unclear, ask before proceeding.  
- Commit your work daily.  
  
⏳ **Final Deadline:** 2 weeks  
📍 **Midpoint Checkpoint:** End of Week 1 (half of the work)  
  
Good luck 🚀