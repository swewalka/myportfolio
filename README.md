# My Portfolio (React + TypeScript + Vite)

## Prerequisites
- Node.js **22.x** (or >=20.19)
- npm **10+**

Check versions:

```bash
node -v
npm -v
```

## Setup

```bash
npm install
npm run dev
```

## Common setup errors and how to fix them

### 1) `ERESOLVE could not resolve` during install

You may hit a peer-dependency conflict between `vite` and `@tailwindcss/vite`.

**Fix options (pick one):**

1. Use npm's compatibility mode:

```bash
npm install --legacy-peer-deps
```

2. Or keep package versions aligned in `package.json`:
   - `vite` should match the peer range required by `@tailwindcss/vite`
   - `@vitejs/plugin-react` should also be compatible with that Vite version

After changing versions:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

### 2) `Cannot find type definition file for 'vite/client'` or `'node'`

This usually means dependencies were not installed correctly.

**Fix:**

```bash
npm install
```

Then verify that these directories exist:

- `node_modules/vite`
- `node_modules/@types/node`

If install partially failed, clean and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

### 3) `vite: not found` when running `npm run dev`

This means `node_modules/.bin/vite` is missing due an incomplete install.

**Fix:** reinstall dependencies (same as above), then run:

```bash
npm run dev
```

---

### 4) ESLint error: `Cannot find package '@eslint/js'`

This indicates dev dependencies are missing or blocked by your registry/proxy policy.

**Fixes:**

1. Verify registry access:

```bash
npm config get registry
npm ping
```

2. If your environment requires an internal registry, set it explicitly:

```bash
npm config set registry <your-internal-registry-url>
npm install
```

3. If a proxy is required, configure valid `HTTP_PROXY`/`HTTPS_PROXY` values (or unset invalid ones).

---

### 5) `403 Forbidden` from `registry.npmjs.org`

Your environment is blocking direct npmjs access.

**Fix:**
- Use your company/artifact proxy registry (Nexus/Artifactory/Verdaccio/GitHub Packages).
- Ensure your npm auth token is configured if the proxy requires it.

Example:

```bash
npm config set registry https://<internal-registry>/
npm config set // <internal-registry>/:_authToken <token>
npm install
```

## Validate setup

```bash
npm run build
npm run lint
npm run dev
```
