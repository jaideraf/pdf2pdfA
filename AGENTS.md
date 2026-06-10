# AGENTS.md - pdf2pdfA

## Quick Start

- **Language**: JavaScript (Node.js v24, ES modules)
- **Framework**: Express.js
- **Key Tool**: OCRmyPDF v17.2.0 (runs PDF to PDF/A conversion via CLI)
- **Formatter/Linter**: Biome 2.4.4

## Setup

```bash
npm install              # Install dependencies
npm run dev             # Run with nodemon (local development)
npm test                # Run Jest tests
npx biome check .       # Lint check
npx biome format .      # Format code
```

## Critical: Tests Require Experimental Node Flag

The test script `npm test` uses `--experimental-vm-modules` for Jest with ES modules. If the npm script fails:

```bash
node --experimental-vm-modules node_modules/jest/bin/jest.js
```

The npm script may have pathing issues; use the direct command above if needed.

## Project Structure

- **bin/www.js** - Entry point (app.js:1). Uses Node cluster module for multi-core workers. Listens on port 8080.
- **app.js** - Express setup: compression, helmet, static files, EJS views, routes.
- **routes/** - HTTP endpoint handlers (home, download, check, error).
- **controllers/** - Business logic:
  - `ConvertPdfToPdfA.js` - PDF to PDF/A conversion class; wraps ocrmypdf CLI execution.
  - `AppController.js`, `HomeController.js`, etc. - HTTP handlers.
- **utils/** - `logger.js` (debug module), `deleteOldPDFs.js` (cleanup utility).
- **tests/** - Jest tests; only 1 file (ConvertPdfToPdfA.test.js).
- **public/** - Static assets, EJS templates in **views/**.
- **uploads/** - Temporary storage for PDFs during conversion.

## Key Constraints

- **File size limit**: 32 MB (enforced in ConvertPdfToPdfA).
- **Digital signatures**: Not allowed.
- **OCRmyPDF integration**: Executed as subprocess; runs in Docker only (relies on OCRmyPDF container).

## Docker

- **Production**: `Dockerfile` - Minimal, runs as `node` user.
- **Development**: `Dockerfile-dev` - Exposes `npm run dev`; mounts source at `/usr/src/app` for hot reload.
- **Base image**: `jbarlow83/ocrmypdf:v17.2.0` (Ubuntu-based).
- **Timezone**: `America/Sao_Paulo` (hardcoded in both).

Build: `docker build --pull --no-cache --progress plain -f Dockerfile-dev -t pdf2pdfa:latest . 2>&1 | tee build.log`

Run: `docker run --rm -p 8080:8080 -v ./:/usr/src/app pdf2pdfa:latest`

## CI/CD

GitLab CI (`.gitlab-ci.yml`):
- Triggers on `main` branch only.
- **Build stage**: Pushes Docker image to registry.
- **Deploy stage** (Portainer): Requires `WEBHOOK_PORTAINER` secret variable in project settings.

## Biome Configuration

- **Indentation**: 2 spaces, LF line endings.
- **Line width**: 80 characters.
- **Quotes**: Single (JS); double (JSX).
- **Trailing commas**: All.
- **Semicolons**: Always.
- **Arrow parentheses**: Always.
- Custom rule: `useBlockStatements`, `useConsistentArrowReturn` disabled.

## Command Workflow

1. **Before commit**: Automated via pre-commit hooks (husky + lint-staged):
   - Runs `npx biome format --write` and `npx biome check` on staged files.
   - Runs tests on staged test files.
   - Hooks are installed automatically on `npm install` (via `prepare` script).
2. **Manual checks**: `npx biome format .` and `npx biome check .` (full codebase).
3. **Build/deploy**: `docker build` (main branch triggers GitLab CI).

## Type Checking

No TypeScript. JSDoc type hints in `@types/` packages listed but not actively used. Project is untyped (run-time only).

## Debugging

Debug output controlled by `DEBUG=pdf2pdfA` environment variable (set in `npm start` / `npm run dev`). Uses `debug` npm module with logger.js wrapper.

## Known Quirks

- Jest test script path may fail; use direct node + jest.js call.
- OCRmyPDF subprocess depends on Docker container setup; won't work outside Docker.
