# Transcribing Notes
“Transcribing Notes“ is a web application designed to assist with studying and note-taking. Users would be able to sign in and take notes for a given class or subject, then be able to share them via a cloud. Anybody could use the app to view published notes, but one must be logged in as a user in order to create and share them. Users can create notes with a specific tag that reflects various common subjects, For example, a user could create a note based on science, or a note based on math.
The main audience this application is designed for is students. Being a note taking app at its core, students can take notes on their own class material, while also being able to share them with the public. This functionality of sharing also helps other students who may be taking the same class, to either catch up on a missed class or gain a different understanding of the concepts.
“Transposing Notes” is primarily developed using a flexible React frontend, and a backend consisting of Express and NodeJS, with MongoDB and Mongoose making up the actual database components of the app, while using docker compose to easily start the server without any hassle.


### Team Members
- Nathan Mill - Backend
- Joseph Gallucci - Frontend components
- Kaiden Matuskiewicz - Wiring between backend and frontend; Management; Docker

### Technologies
- React
- React Router
- Vite
- Node.js
- Express.js
- Mongoose
- MongoDB
- Docker
- Docker Compose

### MVPs
- Create, edit, and delete your notes
- View all your notes
- Share your notes
- View everyone's notes

### Stretch features
Not enough time for any

### Video
I asked at the presentation and was told that since we did the presentation didn't need the video.

## Setup and Run
Requirements:
- Docker
- Docker Compose

The Dockerfiles and docker-compose are set up such that all you have to do to run is run the command `docker compose up -d`.
The default port is `5173`. Access the site by going to `localhost:5173`.

# REST API Documentation

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
