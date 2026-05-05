# Notes API Documentation

Base URL: `/API`

---

## Authentication

Some endpoints require authorization. Include a valid JWT in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## Endpoints

### Notes

#### Get All Notes
```
GET /notes
```
Returns a list of all notes.

**Auth required:** No

**Response `200 OK`:**
```json
[
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "owner": "string",
    "tag": "string"
  }
]
```

---

#### Get Note by ID
```
GET /notes/:id
```
Returns a single note by its ID.

**Auth required:** No

**URL Parameters:**

| Parameter | Type   | Description       |
|-----------|--------|-------------------|
| `id`      | string | The note's ID     |

**Response `200 OK`:**
```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "owner": "string",
  "tag": "string"
}
```

**Response `404 Not Found`:**
```json
{
  "error": "Note not found"
}
```

---

#### Create a Note
```
POST /notes
```
Creates a new note owned by the authenticated user.

**Auth required:** Yes

**Request Body:**
```json
{
  "title": "string",
  "content": "string",
  "tag": "string"
}
```

**Response `201 Created`:**
```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "owner": "string",
  "tag": "string"
}
```

---

#### Update a Note
```
PATCH /notes/:id
```
Updates one or more fields of a note by its ID. Only the note's owner can update it.

**Auth required:** Yes

**URL Parameters:**

| Parameter | Type   | Description   |
|-----------|--------|---------------|
| `id`      | string | The note's ID |

**Request Body:**  
Partial or full note fields to update (`title`, `content`, or `tag`). At least one field is required.

```json
{
  "title": "string",
  "content": "string",
  "tag": "string"
}
```

**Response `200 OK`:**
```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "owner": "string",
  "tag": "string"
}
```

**Response `403 Forbidden`:**
```json
{
  "error": "You do not have permission to update this note"
}
```

**Response `404 Not Found`:**
```json
{
  "error": "Note not found"
}
```

---

#### Delete a Note
```
DELETE /notes/:id
```
Deletes a note by its ID. Only the note's owner can delete it.

**Auth required:** Yes

**URL Parameters:**

| Parameter | Type   | Description   |
|-----------|--------|---------------|
| `id`      | string | The note's ID |

**Response `200 OK`:**
```json
{
  "message": "Note deleted successfully"
}
```

**Response `403 Forbidden`:**
```json
{
  "error": "You do not have permission to delete this note"
}
```

---

### User

#### Get Notes for Authenticated User
```
GET /user/notes
```
Returns all notes owned by the authenticated user.

**Auth required:** Yes

**Response `200 OK`:**
```json
[
  {
    "id": "string",
    "title": "string",
    "content": "string",
    "owner": "string",
    "tag": "string"
  }
]
```

---

#### Login
```
POST /user/login
```
Authenticates a user and returns a JWT.

**Auth required:** No

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response `200 OK`:**
```json
{
  "token": "string"
}
```

**Response `401 Unauthorized`:**
```json
{
  "error": "Invalid username or password"
}
```

---

#### Register
```
POST /user/register
```
Creates a new user account.

**Auth required:** No

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response `201 Created`:**
```json
{
  "message": "User registered successfully"
}
```

**Response `409 Conflict`:**
```json
{
  "error": "Username already exists"
}
```

---

## Summary Table

| Method   | Endpoint         | Auth | Description                    |
|----------|------------------|------|--------------------------------|
| `GET`    | `/notes`         | No   | Get all notes                  |
| `GET`    | `/notes/:id`     | No   | Get a note by ID               |
| `POST`   | `/notes`         | Yes  | Create a new note              |
| `PATCH`  | `/notes/:id`     | Yes  | Update a note by ID            |
| `DELETE` | `/notes/:id`     | Yes  | Delete a note by ID            |
| `GET`    | `/user/notes`    | Yes  | Get notes for current user     |
| `POST`   | `/user/login`    | No   | Login and receive a token      |
| `POST`   | `/user/register` | No   | Register a new user            |
