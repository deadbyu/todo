# Punch List — Todo App

A full-stack to-do list app built with **Spring Boot (Java, Gradle)** on the
backend and **vanilla HTML/CSS/JavaScript** on the frontend. Built as a
learning project to understand how a REST API, an ORM-backed database, and a
plain JS frontend talk to each other — no frameworks, no shortcuts.

## Stack

- **Backend:** Java 17, Spring Boot, Spring Web, Spring Data JPA
- **Database:** H2 (in-memory, auto-configured)
- **Frontend:** HTML, CSS, JavaScript (`fetch` API, no framework)

## Features

- Create, view, update, and delete to-do items
- Mark tasks as complete/incomplete
- REST API backing the UI, testable independently via HTTP requests

## API Endpoints

| Method | Endpoint          | Description         |
|--------|-------------------|----------------------|
| GET    | `/api/todos`      | List all todos       |
| POST   | `/api/todos`      | Create a new todo     |
| PUT    | `/api/todos/{id}` | Update a todo         |
| DELETE | `/api/todos/{id}` | Delete a todo         |

## Running locally

after running visit `http://localhost:8080`.

## What I learned building this

- How Spring's dependency injection wires controllers, services, and
  repositories together
- How Spring Data JPA generates repository implementations at runtime via
  reflection, without writing SQL
- How `@RestController` and `@RequestBody` handle JSON serialization
- How a frontend talks to a backend purely over HTTP, with no shared code
