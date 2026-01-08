# 🧪 Full-Stack Evaluator – Technical Exam Simple Documentation

As mentioned in README.md, this file contains a summary of the implementations I did for this project.

## Frontend

- Created CRUD Functionalities for User and TaskItems
- Install TailwindCSS to streamline the styling
- Organize CSS to manageable components
- Create api files to follow the SRP

## Backend

- Created Controllers to handle CRUD operations for User and TaskItems
- Configure application startup
- Included DTOs to easily manager input and output of data
- Created Service and Repository classes to follow the SRP
- Manage Dependencies

## What's missing

- This project does not include any automated tests

## Setup

1. Install dependencies for both projects
2. Create .env file for frontend and backend
3. Frontend env should contain something like:

   - VITE_API_BASE_URL=https://localhost:7144
     - for the backend api address

4. Backend env should contain something like:

   - ConnectionStrings\_\_DefaultConnection=Host=localhost;Port=5432;Database=mydb;Username=postgres;Password=admin;
     - for postgreSQL address
   - Cors\_\_AllowedOrigins\_\_0=http://localhost:5173
     - for allowed origins where where 0 is the index on the array

5. Run this command inside the backend folder to create or update the database: dotnet ef database update
6. Run both application
