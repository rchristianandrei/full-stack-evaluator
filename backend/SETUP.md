## Setup

1. Install dependencies

   ```
   dotnet restore
   ```

2. Create .env file

   ```
   ConnectionStrings__DefaultConnection=Host=localhost;Port=5432;Database=mydb;Username=postgres;Password=admin;
   Cors__AllowedOrigins__0=http://localhost:5173
   JwtSettings__Key=THIS_IS_A_SUPER_SECRET_KEY_CHANGE_ME
   ```

   - for postgreSQL address
   - for allowed origins where where 0 is the index on the array
   - for issuing tokens

3. Install dotnet tool if needed

   ```
   dotnet tool install --global dotnet-ef
   ```

4. Update Database

   ```
   terminal> dotnet ef database update
   ```

   or

   ```
   package-manager-console> update-database
   ```

5. Run application

   ```
   dotnet run
   ```
