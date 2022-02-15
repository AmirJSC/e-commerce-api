# E-Commerce-API

# About the project:
This API has been made for a small scale e-commerce businesses using RESTful API design and built using the following technologies:

- Node.js
- MongoDB and Mongoose
- Express
- Stripe API for payments(to be added)

## Features:

- Users can register/login.
- Users can get all products as well as retrieve products under a category.
- Users can remove, and add items to their shopping carts.
- Users can proceed to checkout with their cart items.
- Users can review their order history.
- A primary admin can give/remove authorization.
- Admin can create, archive, and update a product.
- Admin can retrieve the most popular products, total revenue, and all the orders made.

## Features to be added:

- Google Authentication
- Standard error messages and HTTP codes
- Payments through stripe API
- Confirmation of orders through email
- Logout functionality

## API Documentation:

There are endpoints for Users, Products, Carts, and Orders.

- API documenntation: [https://www.postman.com/]

## Database Schemas

### User:

| Name     | Type                             |
| -------- | -------------------------------- |
| \_id     | `mongoose.Schema.Types.ObjectId` |
| firstName| `String`                         |
| lastName | `String`                         |
| password | `String`                         |
| email    | `String`                         |
| isAdmin  | `Boolean`                        |
| mobileNo | `String`                         |
| address  | `String`                         |

### Product:

| Name        | Type                             |
| ----------- | -------------------------------- |
| \_id        | `mongoose.Schema.Types.ObjectId` |
| name        | `String`                         |
| description | `String`                         |
| category    | `String`                         |
| price       | `Number`                         |
| isActive    | `Boolean`                        |
| createdOn   | `Date`                           |
| quantity    | `Number`                         |

### Cart:

| Name       | Type                             |
| ---------- | -------------------------------- |
| \_id       | `mongoose.Schema.Types.ObjectId` |
| userId     | `mongoose.Schema.Types.ObjectId` |
| products   | `array`                          |
| bill       | `Number`                         |

### Order:

| Name       | Type                             |
| ---------- | -------------------------------- |
| \_id       | `mongoose.Schema.Types.ObjectId` |
| userId     | `mongoose.Schema.Types.ObjectId` |
| products   | `array`                          |
| bill       | `Number`                         |
| purchasedOn| `Date`                           |