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
npm init -y
npm install express pg
npm install cors
node server.js
```

## Security Notice

- Ensure your PostgreSQL credentials are kept secure and not committed to public repositories.
- Use environment variables for sensitive configuration (e.g., database password) in production. See [dotenv](https://www.npmjs.com/package/dotenv).
- The backend validates sector input to prevent SQL injection.

## Development Best Practices

- Add unit tests for API endpoints. See `main/server/server.test.js` as a starting point.
- Use code comments for maintainability. See `main/hh.js`.
- Review and update dependencies regularly for security.
- Document any architectural decisions or changes in this README.

---
