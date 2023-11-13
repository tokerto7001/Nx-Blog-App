This project has 2 apps as client and server.

For server app:
1- Download Nodejs for the server and Postgresql for database.
2- Install required dependencies with npm install.
3- Check the ./apps/server/drizzle folder. If there is you won't need to generate a migration folder. If not, run the script npm generate-dev.
4- After drizzle folder is created, run the script npm migrate-dev to sync the db.
5- Check env.config file to fill the necessary environment variables with their types.
6- Start the project with the script of npm run dev-server.
