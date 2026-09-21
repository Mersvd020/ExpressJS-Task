# E-commerce Task

REST-full E-commerce backend API built with **Express.js**, **Prisma**, and **SQLite**. It provides user authentication, product and category management, image uploads, and a favorites system. The project has no UI — all endpoints are documented in the in Postman.

(sorry for didn't send half of task,i started the task too late(Thursday))

## Features

- User registration and login with **JWT** authentication
- Password hashing with **bcrypt**
- Role-based access control (`user` / `admin`)
- Product CRUD with pagination and search
- Category CRUD and product-category
- Image uploads for users and products with **Multer**
- Favorites system (add / list / remove favorite products)
- Input validation with **express-validator**
- Custom error handling and global error handling

### Static files

- `GET /uploads/user/...` — served user images
- `GET /uploads/product/...` — served product images

## structure and resource

---- in Design.md file ------


