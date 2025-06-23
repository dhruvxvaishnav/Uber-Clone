# Uber Clone Backend API Documentation

## 🚀 User Authentication Endpoints

### POST /users/register

Register a new user in the system.

#### 📝 Request Body

```json
{
  "fullname": {
    "firstname": "string", // Required, minimum 3 characters
    "lastname": "string" // Optional, minimum 3 characters if provided
  },
  "email": "string", // Required, valid email format
  "password": "string" // Required, minimum 6 characters
}
```

#### ✅ Validation Rules

- **firstname**: Must be at least 3 characters long
- **email**: Must be a valid email format
- **password**: Must be at least 6 characters long

#### ✅ Success Response

**Code**: `201 CREATED`

```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string"
    // Note: Password is not included in response
  },
  "token": "JWT_TOKEN"
}
```

#### ❌ Error Responses

**Code**: `400 BAD REQUEST`

```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

**Common validation errors:**

- Invalid email format
- First name too short (minimum 3 characters)
- Password too short (minimum 6 characters)
- Missing required fields

---

### POST /users/login

Authenticate an existing user and get access token.

#### 📝 Request Body

```json
{
  "email": "string", // Required, valid email format
  "password": "string" // Required, minimum 6 characters
}
```

#### ✅ Validation Rules

- **email**: Must be a valid email format
- **password**: Must be at least 6 characters long

#### ✅ Success Response

**Code**: `200 OK`

```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string"
    // Note: Password is not included in response
  },
  "token": "JWT_TOKEN"
}
```

**Note**: The login endpoint also sets the token as a cookie named `token` for convenience.

#### ❌ Error Responses

**Code**: `400 BAD REQUEST` (Validation errors)

```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

**Code**: `401 UNAUTHORIZED` (Invalid email)

```json
{
  "message": "Invalid Email or Password"
}
```

**Code**: `400 BAD REQUEST` (Wrong password)

```json
{
  "message": "Invalid credentials"
}
```

---

### GET /users/profile

Get the profile information of the currently authenticated user.

#### 🔐 Authentication Required

This endpoint requires a valid JWT token. Include the token in one of these ways:

1. **Authorization Header** (Recommended):

   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

2. **Cookie** (if set during login):
   ```
   Cookie: token=YOUR_JWT_TOKEN
   ```

#### 📝 Request Body

No request body required.

#### ✅ Success Response

**Code**: `200 OK`

```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string"
    // Note: Password is not included in response
  }
}
```

#### ❌ Error Responses

**Code**: `401 UNAUTHORIZED`

```json
{
  "message": "Unauthorized"
}
```

**This error occurs when:**

- No token is provided
- Token is invalid or expired
- Token format is incorrect

---

## 📋 Example Usage

### Registration Example

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

### Login Example

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securepassword123"
  }'
```

### Profile Example

```bash
# Using Authorization header
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Using cookie (if token was set as cookie during login)
curl -X GET http://localhost:3000/users/profile \
  --cookie "token=YOUR_JWT_TOKEN"
```

---

## 🔐 Authentication

Both registration and login endpoints return a JWT token upon successful operation. The login endpoint also sets this token as a cookie named `token`.

**For protected routes like `/users/profile`, include the token using either:**

1. **Authorization Header** (preferred method):

   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

2. **Cookie** (automatically sent if set during login):
   ```
   Cookie: token=YOUR_JWT_TOKEN
   ```

---

## 📊 Response Status Codes

| Code | Description                                               |
| ---- | --------------------------------------------------------- |
| 200  | ✅ Login successful                                       |
| 201  | ✅ Registration successful                                |
| 400  | ❌ Bad Request (validation failed or invalid credentials) |
| 401  | ❌ Unauthorized (invalid email/password combination)      |
