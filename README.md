# Quizzy Backend

Welcome to Quizzy Backend! This Node.js application serves as the backend for a quiz-related platform, providing user authentication, question management, and user statistics. Utilizing various packages such as bcryptjs, cookie-parser, cors, dotenv, express, express-async-handler, jsonwebtoken, and mongoose, it offers a robust foundation for the quiz application.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with the following variables:

```env
MONGO_URI=your_mongo_database_uri
SESSION_SECRET=your_session_secret
NODE_ENV=development
PORT=8800
```

## Usage

To start the server, use the command:

```bash
node server.js
```

The server will be accessible at `localhost:8800/api`.

## User Routes

### Register a New User

```http
POST /users
```

### Authenticate and Authorize User

```http
POST /users/auth
```

### Logout and Clear Cookies

```http
POST /users/logout
```

### Get User Data (Protected)

```http
GET /users/profile
```

### Update User Data (Protected)

```http
PUT /users/profile
```

### Update User Points and Proficiency (Protected)

```http
PUT /users/updatePoints
```

### Reset User Stats (Protected)

```http
PUT /users/resetStats
```

### Get User Stats (Protected)

```http
GET /users/stats
```

## Question Routes

### Get Questions by Language Parameter

```http
GET /questions/:language
```

### Fetch All Questions in All Languages

```http
GET /questions
```

### Create a New Question

```http
POST /questions
```

## Database

- Users are stored in the `users` collection.
- Questions are stored in the `questiondb` collection.

## Token Generation

- JSON Web Tokens (JWT) are used for token generation.

## Dependencies

- bcryptjs
- cookie-parser
- cors
- dotenv
- express
- express-async-handler
- jsonwebtoken
- mongoose

## Showcase Quizzy Frontend

To showcase the use of this backend, you can use the [Quizzy Frontend](https://github.com/Shubhankar-12/quizzy-frontend). It complements this backend, providing a feature-rich interface for seamless user authentication, profile management, and engaging quizzes. Follow the frontend's README for setup and usage instructions.

### Thank you for choosing Quizzy! If you have any questions or suggestions, feel free to reach out. Happy quizzing!
