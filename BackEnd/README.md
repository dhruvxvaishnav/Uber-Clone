# Uber Clone Backend API Documentation

## User Registration

### POST /users/register

Register a new user in the system.

#### Request Body

```json
{
  "fullname": {
    "firstname": "string",    // Required, minimum 3 characters
    "lastname": "string"      // Optional, minimum 3 characters if provided
  },
  "email": "string",         // Required, valid email format
  "password": "string"       // Required, minimum 6 characters
}
```

#### Validation Rules
- `firstname`: Must be at least 3 characters long
- `email`: Must be a valid email format
- `password`: Must be at least 6 characters long

#### Success Response

**Code**: 201 CREATED

**Response Body**:
```json
{
  "user": {
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "_id": "string",
    // Note: Password is not included in response
  },
  "token": "JWT_TOKEN"
}
```

#### Error Responses

**Code**: 400 BAD REQUEST

This occurs when validation fails. The response will include an array of validation errors:

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

Common validation errors:
- Invalid email format
- First name too short (minimum 3 characters)
- Password too short (minimum 6 characters)
- Missing required fields
