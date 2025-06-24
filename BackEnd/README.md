# Backend API Documentation

A Node.js/Express backend API with user authentication, built for learning purposes.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB database
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/your-database-name

# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-here

# Server Port
PORT=3000
```

### Running the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:3000`

## 📁 Project Structure

```
BackEnd/
├── controllers/          # Request handlers
│   └── user.controller.js
├── models/              # Database models
│   ├── user.model.js
│   └── blacklistToken.model.js
├── routes/              # API routes
│   └── user.routes.js
├── middlewares/         # Custom middleware
│   └── auth.middleware.js
├── services/            # Business logic
│   └── user.service.js
├── db/                  # Database connection
│   └── db.js
├── app.js              # Express app configuration
├── server.js           # Server entry point
└── package.json        # Dependencies
```

## 🔐 Authentication Flow

1. **Register** → Get JWT token
2. **Login** → Get JWT token + cookie
3. **Access protected routes** → Include token in header or cookie
4. **Logout** → Token gets blacklisted

## 📋 API Endpoints

### Authentication Endpoints

#### POST `/users/register`

Register a new user account.

**Request Body:**

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**

- `firstname`: Required, min 3 characters
- `lastname`: Optional, min 3 characters if provided
- `email`: Required, valid email format
- `password`: Required, min 6 characters

**Success Response (201):**

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "_id": "user_id_here"
  },
  "token": "jwt_token_here"
}
```

**Error Response (400):**

```json
{
  "errors": [
    {
      "msg": "Invalid email format",
      "param": "email",
      "location": "body"
    }
  ]
}
```

---

#### POST `/users/login`

Login with existing credentials.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "_id": "user_id_here"
  },
  "token": "jwt_token_here"
}
```

**Error Responses:**

- `400`: Validation errors
- `401`: Invalid email
- `400`: Wrong password

---

#### GET `/users/profile`

Get current user's profile information.

**Authentication Required:** Yes

**Headers:**

```
Authorization: Bearer your_jwt_token
```

**Success Response (200):**

```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "_id": "user_id_here"
  }
}
```

**Error Response (401):**

```json
{
  "message": "Unauthorized"
}
```

---

#### GET `/users/logout`

Logout current user and blacklist token.

**Authentication Required:** Yes

**Success Response (200):**

```json
{
  "message": "Logged out successfully"
}
```

## 🛠️ How Authentication Works

### JWT Token Generation

- Tokens expire in 24 hours
- Contains user ID for identification
- Used for protecting routes

### Token Blacklisting

- Logout adds token to blacklist
- Blacklisted tokens auto-expire in 24 hours
- Prevents token reuse after logout

### Password Security

- Passwords hashed using bcryptjs (10 rounds)
- Never returned in API responses
- Secure comparison for login

## 📝 Usage Examples

### Using cURL

**Register:**

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {"firstname": "John", "lastname": "Doe"},
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Login:**

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Profile:**

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Logout:**

```bash
curl -X GET http://localhost:3000/users/logout \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using JavaScript/Fetch

**Register:**

```javascript
const response = await fetch("http://localhost:3000/users/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    fullname: { firstname: "John", lastname: "Doe" },
    email: "john@example.com",
    password: "password123",
  }),
});

const data = await response.json();
console.log(data);
```

**Login and Store Token:**

```javascript
const response = await fetch("http://localhost:3000/users/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "john@example.com",
    password: "password123",
  }),
});

const data = await response.json();
// Store token for future requests
localStorage.setItem("token", data.token);
```

**Get Profile:**

```javascript
const token = localStorage.getItem("token");
const response = await fetch("http://localhost:3000/users/profile", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const userData = await response.json();
```

## ⚡ Key Technologies

- **Express.js 5.1.0** - Web framework
- **MongoDB + Mongoose** - Database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **CORS** - Cross-origin requests
- **cookie-parser** - Cookie handling

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Token blacklisting on logout
- Input validation and sanitization
- CORS protection
- Secure cookie handling

## 📊 Status Codes

| Code | Meaning                                         |
| ---- | ----------------------------------------------- |
| 200  | Success (Login, Profile, Logout)                |
| 201  | Created (Registration)                          |
| 400  | Bad Request (Validation errors, Wrong password) |
| 401  | Unauthorized (Invalid credentials, No token)    |

## 🚀 Next Steps for Learning

1. **Add more endpoints** - CRUD operations
2. **Database relationships** - User profiles, posts
3. **File uploads** - Profile pictures
4. **Email verification** - Confirm accounts
5. **Password reset** - Forgot password flow
6. **Rate limiting** - Prevent abuse
7. **API documentation** - Swagger/OpenAPI
8. **Testing** - Unit and integration tests

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

ISC License - see package.json for details.
