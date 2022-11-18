# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

Token in Header
`Authorization   Bearer <token>`
#### Products
- Index 
`http://localhost:3000/api/products/all [GET]`
- Show
`http://localhost:3000/api/products/:id [GET]`
- Create [token required]
`http://localhost:3000/api/products/create [POST]`
```
Request body
{
    "name": "Test product",
    "price": 500,
    "category": "Test category"
}
```
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
`http://localhost:3000/api/users/all [GET]`
- Show [token required]
`http://localhost:3000/api/users/:id [GET]`
- Create N[token required]
`http://localhost:3000/api/users/create [POST]`
```
Request body example
{
    "userName": "quanth21",
    "firstName": "Quan",
    "lastName": "Tran",
    "password": "123zxc"
}
```

#### Orders
- Create order [token required]
`http://localhost:3000/api/orders/create [POST]`
```
Request body example
{
    "userId": 2,
    "status": "active"
}
```
- Current Order by user (args: user id)[token required]
`http://localhost:3000/api/orders/all [GET]`
```
Request body example
{
    "userId": 2,
    "status": "active"
}
```
- [OPTIONAL] Completed Orders by user (args: user id)[token required]
`http://localhost:3000/api/orders/all [GET]`
```
Request body example
{
    "userId": 2,
    "status": "completed"
}
```
- [OPTIONAL] Add product to order [token required]
`http://localhost:3000/api/orderProducts/addProduct/order/:orderId [POST]`
```
Request body example
{
    "productId": 1,
    "quantity": 10
}
```
- [OPTIONAL] Show order product by order [token required]
`http://localhost:3000/api/orderProducts/:orderId [GET]`


## Data Shapes
#### Product
-  id `INTEGER`
- name `TEXT`
- price `NUMBER`
- [OPTIONAL] category `TEXT`

#### User
- id `INTEGER`
- firstName `TEXT`
- lastName `TEXT`
- password `TEXT`

#### Orders
- id `INTEGER`
- user_id `INTEGER`
- status `TEXT`

#### Orders Products
- order_id `INTEGER`
- product_id `INTEGER`
- quantity `NUMBER`