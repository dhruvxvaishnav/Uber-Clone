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

---

## 🔐 Authentication

Both endpoints return a JWT token upon successful operation. This token should be included in the `Authorization` header for protected routes:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 📊 Response Status Codes

| Code | Description                                               |
| ---- | --------------------------------------------------------- |
| 200  | ✅ Login successful                                       |
| 201  | ✅ Registration successful                                |
| 400  | ❌ Bad Request (validation failed or invalid credentials) |
| 401  | ❌ Unauthorized (invalid email/password combination)      |
