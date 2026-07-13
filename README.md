# JNTUH-tatkal
A university navigation web application

## Useful Git Commands

* `git add .` - Add all files
* `git commit -m "some message"` - Commit changes
* `git push origin branch_name` - Push to desired branch
* `git checkout -b branch_name origin/branch_name` - Create a branch locally and track that specific one from GitHub
* `git switch branch_name` - Switch to a branch
* `git branch` - Shows all the local branches
* `git fetch origin` - Update all the info locally from GitHub
* `git pull origin branch_name` - Update the changes (which are made directly in the GitHub) locally

## Terminal Commands to Run the Project Locally

```
cd ./main/server/
npm install
# Copy .env.example to .env and edit as needed:
cp .env.example .env # (or create manually)
# Then edit .env to set your PostgreSQL credentials
npm start # or: node server.js
```

## Security Notice

- Ensure your PostgreSQL credentials are kept secure and not committed to public repositories.
- Use environment variables for sensitive configuration (e.g., database password) in production. See [dotenv](https://www.npmjs.com/package/dotenv).
- The backend validates sector input to prevent SQL injection.
- **.env and node_modules/ are now gitignored. See `.gitignore`.**
- See `.env.example` for required environment variables.
- **Always run your production server with `NODE_ENV=production` (see below) to enable best-practice security and performance settings.**

## Development Best Practices

- Add unit tests for API endpoints. See `main/server/server.test.js` as a starting point.
- Use code comments for maintainability. See `main/hh.js`.
- Review and update dependencies regularly for security.
- Document any architectural decisions or changes in this README.
- When deploying to production, set the `NODE_ENV` environment variable to `production` to enable security-related HTTP headers and production optimizations.
  - Example (UNIX): `NODE_ENV=production node server.js`
  - Example (Windows): `set NODE_ENV=production && node server.js`

## Environment Variables Setup

Create a `.env` file in `main/server/` (see `.env.example`). Example:

```
PGUSER=your_db_user
PGPASSWORD=your_db_password
PGDATABASE=your_db_name
PGHOST=localhost
PGPORT=5432
```
