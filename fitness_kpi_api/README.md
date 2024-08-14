## Configuration
Edit file .env, this parameters with correct configuration use db and cors.

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=fitness_kpi_db
DB_USERNAME=root
DB_PASSWORD=
SESSION_DOMAIN=localhost
SANCTUM_STATEFUL_DOMAINS=http://localhost:8000

## DB
Once completed configuration you will have to do this to view the database locally
and use these commands:

  ·php artisan migrate: if yes is selected it will create the database with all the tables

After doing this you can start it locally using the following command:

  · php artisan serve