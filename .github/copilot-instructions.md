<!-- Copilot instructions for Code Bridge deployer300AppTest repo -->
# Copilot / AI agent instructions

Purpose: give an AI coding assistant the minimal, actionable context to be productive in this repo (backend: Feathers + Mongoose; frontend: React + Redux).

- Big picture
  - Backend: `nodejs-backend` is a Feathers v4 app (see `nodejs-backend/src/app.js`) with REST + Socket.IO, Mongoose for MongoDB (`src/mongoose.js`), Redis caching (`cbServices/redis`), and job queues (`workersQue`). Config lives in `nodejs-backend/config/*.json` (default port 3030).
  - Frontend: `react-frontend` is a Create React App-based React + Redux UI (`src/App.js`, `src/MyRouter`) that uses Feathers client libraries for auth and socket integration.

- How to run (explicit commands)
  - Backend (dev):
    - cd nodejs-backend
    - npm install
    - npm run dev (uses `nodemon src/`)
  - Backend (production-ish / launch): `npm run launch` — this runs `cmd`/`moveCMD` to copy `.env_example` → `.env` (Windows), installs deps, formats and starts.
  - Frontend (dev):
    - cd react-frontend
    - npm install
    - npm start (hosted on 0.0.0.0 via `react-scripts start --host 0.0.0.0`)
  - Frontend builds per environment use `env-cmd -f .env_<env>` (see `package.json` scripts `build:sit`, `build:stg`, `build:prod`).

- Important environment & config patterns
  - Backend loads `dotenv` and expects `MONGODB_URL` (see `src/mongoose.js`). Default config values are in `nodejs-backend/config/default.json` (port 3030, host `localhost`).
  - `.env_example` is moved/renamed by `moveCMD`/`movePS` helper scripts; many npm `launch` scripts call this pattern — respect that when setting envs in automation.
  - Frontend expects `.env_*` files (`.env_prd`, `.env_stg`, etc.) and uses `env-cmd` to inject them during builds.

- Notable integrations & runtime pieces
  - Socket.IO: configured in `src/app.js` — middleware attaches `socket.feathers.referrer` and increases listeners; services may rely on socket context.
  - Redis caching: `feathers-redis-cache` is configured with a `pathPrefix` of `/cache` (see `src/app.js`).
  - Jobs/Workers: `src/workersQue` creates background workers (Bull/BullMQ) — inspect this when modifying job logic.
  - File uploads: S3 upload route present (`src/routes/upload`) using `multer-s3` / AWS SDK.

- Project conventions and patterns (do not change without checking tests/runs)
  - Feathers service registration order matters — `app.configure(...)` order in `src/app.js` reflects required initialization (mongoose, middleware, authentication, services, channels, workers, routes, error handlers).
  - Models live in `src/cbModels/*.model.js` and follow Mongoose patterns used across services; prefer updating model files there rather than scattering schema logic.
  - Custom service code is in `src/cbServices` while generated/standard services are under `src/services`.
  - Routes for ad-hoc endpoints (AI, upload, fcm, recaptcha, email validation) live in `src/routes/*.js` — those often bypass typical service patterns.

- Testing and linting
  - Backend tests use Mocha and expect `dotenv/config` (see `package.json` test/ mocha script). Run `npm test` in `nodejs-backend`.
  - Lint / format: `npm run lint` and `npm run format` available in both subprojects (uses ESLint + Prettier). Frontend has a `format` targeting `./src/components`.

- Code examples (use these when editing or generating changes)
  - Start backend server: `nodejs-backend/src/index.js` → uses `app.get('port')` from `config/default.json` (3030).
  - Add a new Feathers service: follow `src/services/index.js` registration pattern and add any Mongoose models to `src/cbModels`.
  - Add socket-aware logic: read the socket middleware in `src/app.js` to ensure `socket.feathers` fields are present.

- Quick diagnostics for pull requests
  - If tests fail on backend: confirm `MONGODB_URL` is set and the test DB is reachable; tests run with `-r dotenv/config`.
  - If frontend build fails for environment builds: ensure the correct `.env_<env>` file is present and `env-cmd` is installed.

- Where to look first for context
  - Backend bootstrap: `nodejs-backend/src/app.js`, `nodejs-backend/src/index.js`, `nodejs-backend/config/default.json`.
  - Backend models & services: `nodejs-backend/src/cbModels/` and `nodejs-backend/src/cbServices/` and `nodejs-backend/src/services/`.
  - Frontend entry: `react-frontend/src/App.js`, router `react-frontend/src/MyRouter`, and `react-frontend/package.json` scripts for build patterns.

If any of these sections are unclear or you'd like additional examples (service template, worker example, or a recommended PR checklist), tell me which area and I'll iterate.
