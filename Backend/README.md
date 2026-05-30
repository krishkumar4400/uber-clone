# Backend API Documentation

## `POST /api/user/register`

Registers a new user and returns an authentication token.

### Description

This endpoint creates a new user account using the provided email, password, and fullname details. It validates the input, hashes the password, stores the user in the database, and returns a JWT token on success.

### Request URL

`POST /api/user/register`

### Request Headers

- `Content-Type: application/json`

### Request Body

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Required fields

- `fullname.firstname` (string): minimum 3 characters
- `email` (string): must be a valid email format
- `password` (string): minimum 6 characters

#### Optional fields

- `fullname.lastname` (string)

### Success Response

- Status: `201 Created`

#### Example response

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

### Error Responses

- `400 Bad Request`
  - Invalid request body format
  - Validation errors for email, fullname.firstname, or password
  - Email already exists

Example:

```json
{
  "error": [
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ],
  "success": false
}
```

- `401 Unauthorized`
  - Not used for registration, but may be returned by other auth endpoints

## `GET /api/user/profile`

Returns the authenticated user's profile. This endpoint requires a valid JWT in the `Authorization` header.

### Request

- Method: `GET`
- URL: `/api/user/profile`
- Headers:
  - `Authorization: Bearer <jwt-token>`

### Success Response

- Status: `200 OK`

#### Example response

```json
{
  "user": {
    "_id": "<user-id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null,
    "__v": 0
  }
}
```

### Error Responses

- `401 Unauthorized` - Missing or invalid `Authorization` header / token
- `404 Not Found` - User not found

## `POST /api/user/logout`

Logs out the authenticated user. Implementation may vary (token revocation, session deletion), but the client must send the user's JWT.

### Request

- Method: `POST`
- URL: `/api/user/logout`
- Headers:
  - `Authorization: Bearer <jwt-token>`

### Request Body

- None

### Success Response

- Status: `200 OK`

#### Example response

```json
{
  "message": "Logged out successfully",
  "success": true
}
```

### Error Responses

- `401 Unauthorized` - Missing or invalid `Authorization` header / token

### Notes

- Ensure `JWT_SECRET` is set in the backend environment variables.
- Passwords are hashed before storing in the database.
