# Setting up Cypress on your system

## Before setting up Cypress

Ensure you have already set up your backend services with postgraphile or Docker by following the README.md located in the mealplanner-ui folder.

### Setting up population database

Once you have set up postgraphile or Docker, follow the instructions within the same README.md file in mealplanner-ui to populate your sample data. The data will look something like the following.

```
BEGIN
psql:<stdin>:114: NOTICE:     Admin login: admin@example.com        676538dc8285f2c
psql:<stdin>:114: NOTICE:  Designer login: mealdesigner@example.com bd99ff9537fdc63
psql:<stdin>:114: NOTICE:     User1 login: user1@example.com        8fc76f1a89d08cb
psql:<stdin>:114: NOTICE:     User2 login: user2@example.com        10d3b4cba908d72
DO
COMMIT
```

Open up your **sample-testdata.json** located in the following path MEALPLANNER/MealPlannerCypress/Cypress/e2e/utils/sample-testdata.json and replace the "ADMIN PASSWORD GOES HERE" using the password generated on your local machine. For this example I will use the password in the previous data. Your **sample-testdata.json** should look like the following example.

```
{
 "username": "admin@example.com",
 "password": "676538dc8285f2c"
}

```

Save the file and follow the steps bellow.

### Downloading dependencies

To download your dependencies, open your terminal in the MealPlannerCypress folder. This can be done by right clickling the MealPlannerCypress folder and select "Open in Terminal" and type npm install. This will create your Package-Lock.json file and download any Node Modules (if needed).

## Using Cypress

Before starting Cypress, ensure you have your docker images running.
If they are not running, consult the README.md within the mealplanner-ui folder.

To use Cypress, open your terminal in the MealPlannerCypress folder and run the following command.

```
npm run cy:open
```

This will open up the Cypress client and allow you to start testing your application.

Happy testing :)
