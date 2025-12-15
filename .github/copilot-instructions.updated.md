<!-- Copilot / AI agent instructions for this repo -->

# Quick Onboarding (for AI coding agents)

Purpose: concisely capture the project architecture, developer workflows, and repo-specific patterns so an AI agent can make safe, correct edits.

- **Big picture**
  - **Backend**: Feathers v4 app at [nodejs-backend/src/app.js](nodejs-backend/src/app.js#L1). REST + Socket.IO, Mongoose for MongoDB ([src/mongoose.js](nodejs-backend/src/mongoose.js#L1)), Redis caching (`cbServices/redis`), and background workers in `src/workersQue` (Bull/BullMQ). Config files: [nodejs-backend/config/*.json](nodejs-backend/config/default.json#L1).
  - **Frontend**: Create React App at [react-frontend](react-frontend/package.json#L1) (React 18 + Redux/Rematch). Router and auth-aware UI live under [react-frontend/src/MyRouter](react-frontend/src/MyRouter/MyRouter.js#L1) and [react-frontend/src/App.js](react-frontend/src/App.js#L1).

- **How to run (explicit, reproducible)**
  - Backend (dev):
    ```powershell
    cd nodejs-backend
    npm install
    npm run dev
    ```
  - Backend (launch/scripted): `npm run launch` (runs helper `moveCMD`/`movePS` to rename `.env_example` → `.env`, installs deps, formats and starts). See [nodejs-backend/package.json](nodejs-backend/package.json#L1).
  - Frontend (dev):
    ```powershell
    cd react-frontend
    npm install
    npm start
    ```
  - Frontend environment builds use `env-cmd -f .env_<env>` (see `build:sit`, `build:stg`, `build:prod` in [react-frontend/package.json](react-frontend/package.json#L1)).

- **Critical env & config rules**
  - `MONGODB_URL` is required at runtime (thrown in [nodejs-backend/src/mongoose.js](nodejs-backend/src/mongoose.js#L1)). Tests/servers will fail without it.
  - `.env_example` is often renamed to `.env` by `moveCMD`/`movePS` scripts; CI/automation should set env files explicitly rather than relying on `move*` helpers.
  - Frontend uses `.env_prd`, `.env_stg`, `.env_sit`, etc.; builds use `env-cmd` to inject them.

- **Repo-specific conventions to preserve**
  - Order of `app.configure(...)` in [src/app.js](nodejs-backend/src/app.js#L1) matters (mongoose → middleware → auth → services → channels → workers → routes → error handlers). Do not reorder without verifying startup sequence.
  - Models live in `src/cbModels/*.model.js`. Services split: `src/cbServices` for custom logic, `src/services` for standard registrations.
  - Ad-hoc endpoints (AI, upload, email validation, recaptcha, fcm) live in `src/routes/` and sometimes bypass Feathers service patterns—check route files before refactoring logic into services.
  - Socket middleware sets `socket.feathers.referrer` — socket-aware hooks expect that field (see [src/app.js](nodejs-backend/src/app.js#L1)).
  - Redis cache configured with path prefix `/cache` via `feathers-redis-cache` (see [src/app.js](nodejs-backend/src/app.js#L1)).

- **Integration & runtime points to check when editing**
  - Workers: `src/workersQue` bootstraps workers — changing job payloads or queue names requires updating any enqueueing code.
  - S3 uploads: route in `src/routes/upload` uses `multer-s3` / `@aws-sdk/client-s3` — ensure AWS env vars and IAM-compatible config in deployments.
  - Socket.io: middleware in [src/app.js](nodejs-backend/src/app.js#L1) and client code using `socket.io-client` in frontend must match namespace and auth expectations.

- **Tests, linting, and common scripts**
  - Backend tests: `npm test` runs `eslint` then Mocha; Mocha is invoked with `-r dotenv/config` (see [nodejs-backend/package.json](nodejs-backend/package.json#L1)). If tests fail locally, confirm `MONGODB_URL` and DB availability.
  - Lint/Format: `npm run lint` and `npm run format` exist in both subprojects; follow existing ESLint/Prettier configs.

- **Quick examples & how to add common items**
  - New Feathers service: register via `src/services/index.js` and keep the Mongoose schema in `src/cbModels/YourModel.model.js`.
  - Add socket-aware logic: consult the socket middleware in [src/app.js](nodejs-backend/src/app.js#L1) to ensure required `socket.feathers` fields are present.
  - Start point: backend bootstrap is [nodejs-backend/src/index.js](nodejs-backend/src/index.js#L1).

- **Troubleshooting pointers**
  - Backend test failures: verify `MONGODB_URL`, ensure required env files exist, and run `npm run mocha` locally with `-r dotenv/config`.
  - Frontend build errors: ensure `.env_<env>` exists, `env-cmd` is installed, and `GENERATE_SOURCEMAP` is set per scripts.

If you want, I can: generate a small service template, add a PR checklist, or make a CI job that sets required envs. Which would help most?
