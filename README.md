# BhatEyeClinic

Angular frontend and ASP.NET Core Web API for Dr Bhat Eye Clinic. The API uses Entity Framework Core with a local SQLite database and seeds its initial mock clinic services from a checked-in JSON file.

## Requirements

- .NET SDK 10
- Node.js 24 or later and npm

## Run locally

From the repository root, start the API:

```sh
dotnet run --project WebApi/BhatEyeClinic.Api --launch-profile http
```

In a second terminal, start Angular:

```sh
cd Web
npm start
```

Open `http://localhost:4200`. Clinic services are available at `http://localhost:5021/api/clinic-services`; appointment requests are submitted to `http://localhost:5021/api/appointments`.

## Share with users

The GitHub Pages workflow publishes the frontend at `https://anishthali01.github.io/BhatEyeClinic/`. Hash-based routes keep direct links working on GitHub Pages:

- `https://anishthali01.github.io/BhatEyeClinic/#/appointment`
- `https://anishthali01.github.io/BhatEyeClinic/#/services`

Push to `main` or manually run the **Deploy Angular app to GitHub Pages** workflow, then share the appointment link after the deployment completes. In the repository settings, select **GitHub Actions** as the Pages build and deployment source.

GitHub Pages hosts only the Angular frontend. To accept public appointment submissions, deploy the API to an HTTPS host and set the repository variable `PUBLIC_API_BASE_URL` to its API root (for example, `https://api.example.com/api`). Without that variable and a public API host, pages load but API-backed services and appointment submission remain local-development-only.

## Data

Initial sample services are in `WebApi/BhatEyeClinic.Api/Data/clinic-services.json`. On first run, the API creates `Data/bhat-eye-clinic.db` and imports the JSON records using EF Core. Submitted appointments are stored in the same local SQLite database, and a unique appointment time can only be booked once. The SQLite file is ignored by Git. To reseed after changing the services JSON file, stop the API and remove the generated database file; the next run will create and seed it again.

## Verify

```sh
dotnet build BhatEyeClinic.sln
npm --prefix Web run build
npm --prefix Web test -- --watch=false
```

## Structure

```text
Web/                                  Angular frontend
WebApi/BhatEyeClinic.Api/             ASP.NET Core API and EF Core data access
WebApi/BhatEyeClinic.Api/Data/         JSON seed and local SQLite database
BhatEyeClinic.sln                     .NET solution
```