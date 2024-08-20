# User Post Management

## Project Overview

User Post Management is a CRUD-based application built using Laravel 11, providing role-based access control (RBAC) with MySQL as the database. This project allows users to create, view, update, and delete posts, with specific access restrictions based on their roles. The project features two types of users: **Normal User** and **Admin**.

### Features

- **CRUD Operations for Posts:** 
  - Users can create, view, update, and delete their own posts.
  - Admins have the additional ability to view, update, and delete posts created by any user.
- **Role-Based Access Control:** 
  - Normal Users can only manage their own posts.
  - Admins can manage all users and their posts.
- **User Management:** 
  - Admins can view, update, and delete any user.
- **Authentication:** 
  - Implemented using Laravel Sanctum with token-based APIs for secure authentication.
- **Mail Notifications:** 
  - A mail is sent upon successful registration.
- **Frontend:** 
  - The frontend is developed using React.js for a modern and responsive UI.

## Technology Stack

- **Backend:**
  - PHP (Laravel 11)
- **Frontend:**
  - React.js
- **Database:**
  - MySQL
- **Authentication:**
  - Laravel Sanctum
- **Tools Used:**
  - Postman for API testing
  - VS Code for development

## Database Structure

- **Users Table:**
  - Stores user data; Laravel’s default user table is utilized.
- **Personal Access Tokens Table:**
  - Provided by Laravel Sanctum for token management.
- **Posts Table:**
  - Stores all the posts created by users.

## Setup and Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/user-post-management.git
   cd user-post-management
