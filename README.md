# Social Media App

The app allows users to post, like, and comment on posts. The backend consists of User and Post models, and several API routes have been implemented to provide the required functionality.
This is the backend repository for a Social Media App, the backend is built using Node.js, Express.js, and MongoDB as the stack.

## Features

1. User Registration: Allow users to register by providing their name, email, and password. Hash the password before storing it.

2. User Login: Allow registered users to log in by providing their email and password. Return a JWT (JSON Web Token) upon successful login.

3. Get List of Users: Retrieve a list of all registered users.

4. Get User's Friends: Retrieve a list of all friends of a specific user identified by their ID.

5. Send Friend Request: Allow a user to send a friend request to another user identified by their ID.

6. Accept/Reject Friend Request: Allow users to accept or reject friend requests sent to them by another user identified by their ID.

7. Get List of Posts: Retrieve a list of all posts.

8. Create a Post: Allow a user to create a new post by providing the post text and optional image.

9. Update a Post: Allow users to update the text or image of a specific post identified by its ID.

10. Delete a Post: Allow users to delete a specific post identified by its ID.

11. Like a Post: Allow users to like a specific post identified by its ID.

12. Comment on a Post: Allow users to comment on a specific post identified by its ID.

13. Get Post Details: Retrieve the details of a specific post identified by its ID.

## Tech Stack Used

Node.js, Express.js, Mongoose

Database: MongoDB

## Run Locally

Install dependencies- npm install
Start the server- npm run server

## Environment Variables

To run the project, you will need to add a .env file

`mongoURL`
`PORT`
`salt`
`secret`

## API's endpoint:

1. POST - /api/register:
   Description: This endpoint allows users to register. The user can provide their registration information, and the password should be hashed before storing it.
   Status Code: 201

2. POST - /api/login:
   Description: This endpoint allows users to login. Users can provide their login credentials, and upon successful login, a JWT (JSON Web Token) should be returned.
   Status Code: 201

3. GET - /api/users:
   Description: This endpoint returns a list of all registered users.
   Status Code: 200

4. GET - /api/users/:id/friends:
   Description: This endpoint returns a list of all friends of a specific user identified by their ID.
   Status Code: 200

5. POST - /api/users/:id/friends:
   Description: This endpoint allows a user to send a friend request to another user identified by their ID. This is a protected route that requires authentication.
   Status Code: 201

6. PATCH - /api/users/:id/friends/:friendId:
   Description: This endpoint allows users to accept or reject friend requests sent to them by another user identified by their ID. This is a protected route that requires authentication.
   Status Code: 204

7. GET - /api/posts:
   Description: This endpoint returns a list of all posts.
   Status Code: 200

8. POST - /api/posts:
   Description: This endpoint allows the user to create a new post. This is a protected route that requires authentication.
   Status Code: 201

9. PUT/PATCH - /api/posts/:id:
   Description: This endpoint allows users to update the text or image of a specific post identified by its ID. This is a protected route that requires authentication.
   Status Code: 204

10. DELETE - /api/posts/:id:
    Description: This endpoint allows users to delete a specific post identified by its ID. This is a protected route that requires authentication.
    Status Code: 202

11. POST - /api/posts/:id/like:
    Description: This endpoint allows users to like a specific post identified by its ID. This is a protected route that requires authentication.
    Status Code: 201

12. POST - /api/posts/:id/comment:
    Description: This endpoint allows users to comment on a specific post identified by its ID. This is a protected route that requires authentication.
    Status Code: 201

13. GET - /api/posts/:id:
    Description: This endpoint returns the details of a specific post identified by its ID.
    Status Code: 200

## Backend Deployed Link:
