# JNTUH-tatkal
A university navigation web application

## Some Useful Git Commands

```bash
# Add all files
git add .

# Commit changes
git commit -m "some message"

# Push to desired branch
git push origin branch_name

# Create a branch locally and track that specific one from GitHub
git checkout -b branch_name origin/branch_name

# Switch to a branch
git switch branch_name

# Shows all the local branches
git branch

# Update all the info locally from GitHub
git fetch origin

# Update the changes (which are made directly in GitHub) locally
git pull origin branch_name
```

## Terminal Commands to Make the Project Run on Your PC

```bash
cd ./main/server/
npm init -y
npm install express pg
npm install cors
node server.js
```
