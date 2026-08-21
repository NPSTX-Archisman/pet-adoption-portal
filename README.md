# 19 - Pet Adoption Portal

A full-stack Pet Adoption Portal that allows users to browse pets, submit adoption requests, and track their requests throughout the adoption process. Administrators can manage pets and review adoption requests through a controlled approval workflow.

---

# Technology Stack

## Frontend

- React.js
- TypeScript
- Tailwind CSS
- Formik
- Zod
- Axios
- React Router DOM

## Backend

- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- Maven

## Database

- PostgreSQL

---

# Features

## Authentication & Authorization

- User Registration
- User Login
- User Logout
- JWT-based Authentication
- HttpOnly Cookie-based Security
- Role Based Access Control (RBAC)
- User and Admin Roles

---

## Pet Management

### Users

- View all pets
- Search pets
- View pet details

### Admins

- Add a new pet
- Update pet details
- Delete pets
- View requests for a pet

---

## Adoption Requests

### Users

- Create adoption requests
- Search pets by tag before applying
- View personal adoption requests
- Track application status

### Admins

- View all adoption requests
- View requests against a specific pet
- Delete requests
- Update request status
- Manage adoption workflow

---

# Adoption Workflow

```text
PENDING
    ↓
CHECKIN
    ↓
PAYMENT_PENDING
    ↓
APPROVED
```

Requests can also be rejected during the process.

```text
CHECKIN
    ↓
REJECTED

PAYMENT_PENDING
    ↓
REJECTED
```

---

# Business Rules

- A pet cannot be adopted more than once.
- Once a request is approved, the pet status changes to `ADOPTED`.
- Remaining requests for the same pet are automatically rejected.
- Invalid workflow transitions are prevented.
- Adoption requests can only be updated by administrators.
- If all requests for a pet are deleted and the pet is not adopted, its status reverts back to `AVAILABLE`.

---

# Entities

## User

```text
User
├── Full Name
├── Email
├── Password
└── Role
```

---

## Pet

```text
Pet
├── Tag
├── Name
├── Species
├── Age
├── Breed
├── Gender
├── Weight
├── Color
├── Description
├── Vaccinated
├── Neutered
└── Status
```

---

## Adoption Request

```text
Adoption Request
├── Applicant
├── Pet
├── Status
├── Requested At
└── Updated At
```

---

# API Overview

## Authentication

```http
POST /auth/register
POST /auth/login
POST /auth/logout
GET  /auth/me
```

---

## Pets

```http
GET    /pets
GET    /pets/{tag}
POST   /pets/add
PATCH  /pets/{tag}
DELETE /pets/{tag}
POST   /pets/search
```

---

## Adoption Requests

```http
POST   /adoptions/request
GET    /adoptions/my
GET    /adoptions
GET    /pets/{tag}/requests
PATCH  /adoptions/{id}/status
DELETE /adoptions/{id}
```

---

# Pagination

Pagination is implemented for:

- Pet Listings
- User Adoption Requests
- Administrative Adoption Requests

Supported query parameters:

```http
?page=0&pageSize=10
```

Example:

```http
GET /adoptions?page=0&pageSize=5
```

---

# Security

Authentication is implemented using:

```text
JWT
↓
Stored in HttpOnly Cookie
↓
Spring Security
↓
RBAC Authorization
```

The frontend never accesses the JWT directly.

---

# Validation

## Frontend

- Formik
- Zod

## Backend

- Bean Validation
- Service Layer Validation
- Business Rule Validation

---

# Error Handling

The application provides meaningful responses for:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```

Examples include:

- Duplicate adoption requests
- Invalid workflow transitions
- Pet not found
- Adoption request not found
- Attempting to adopt an already adopted pet

---

# Running the Application

## Clone Repository

```bash
git clone <repository-url>
```

---
# Docker Setup

Run the entire application:

```bash
docker compose up --build -d
```

Use the -d for detached mode only.

After the docker build completes, the application is accessible from [Localhost port 5173](http://localhost:5173).
The backend starts up at [Localhost port 8080 with base path /api](http://localhost:8080/api).
The pgAdmin requires additional setup and is accesible at [Localhost port 4321](http://localhost:4321). It can be used to add the server and connect to the database in a GUI for easier access.

---

# Backend Setup

## Create PostgreSQL Database

```sql
CREATE DATABASE pet_adoption_portal;
```

---

## Configure application.properties

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/petstoreportal
spring.datasource.username=postgres
spring.datasource.password=postgres

spring.jpa.hibernate.ddl-auto=update
```

---

## Run Backend

```bash
cd backend/pet-adoption-portal

mvn clean install

mvn spring-boot:run
```

Backend will start on:

```text
http://localhost:8080
```

---

# Frontend Setup

Navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

### JWT SECERET GENERATION

I made use of the built-in OpenSSL tool to generate the secret key

```bash
$ openssl rand -base64 32
```



# Project Structure

```text
backend
└── pet-adoption-portal
    ├── auth
    ├── pets
    ├── adoptions
    ├── security
    └── exceptions

frontend
└── src
    ├── api
    ├── components
    ├── context
    ├── pages
    ├── routes
    ├── schemas
    ├── types
    └── assets
```

---

# Future Enhancements

- Email Notifications
- Pet Image Uploads
- Dashboard Analytics
- Docker Support
- Unit Tests
- Integration Tests
- CI/CD Pipeline
- Audit Logging

---

# Author

**Archisman Chakraborty**

Project #19 – Pet Adoption Portal