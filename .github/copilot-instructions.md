# BhatEyeClinic workspace guidance

- Keep the Angular application in `Web/` and the ASP.NET Core API in `WebApi/BhatEyeClinic.Api/`.
- Use standalone Angular components and the existing Angular CLI scripts.
- Keep API persistence behind Entity Framework Core in the API project.
- Treat `Data/clinic-services.json` as initial mock data; runtime records are stored in the ignored local SQLite database.
- The Angular development server runs on port 4200 and the API HTTP profile runs on port 5021. Preserve the matching API URL and CORS origin when changing either port.
- Build the solution with `dotnet build BhatEyeClinic.sln` and the frontend with `npm --prefix Web run build`.