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
3. Frontend env should contain: VITE_API_BASE_URL=https://localhost:7144 or wherever the backend api is running
4. Backend env should contain: ConnectionStrings__DefaultConnection=postgresqlConnectionString
6. Run this command inside the backend folder to create or update the database: dotnet ef database update
7. Run both application
