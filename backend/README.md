```markdown
# Notes App — Backend (Spring Boot)

Requirements:
- Java 21 (or compatible)
- Maven
- PostgreSQL (database)

Database:
- Create database and user or adjust application.properties.
- Example SQL:
  CREATE DATABASE notesdb;
  CREATE USER kgum WITH PASSWORD '12345';
  GRANT ALL PRIVILEGES ON DATABASE notesdb TO kgum;

Run:
1. cd backend
2. mvn clean package
3. mvn spring-boot:run
   - Backend will run on http://localhost:8080 and expose /api/notes
```