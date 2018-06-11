# [Exercise Tracker](https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/exercise-tracker)

Part of the [freecodecamp](https://www.freecodecamp.com) curriculum.

## Objective

Build a full stack JavaScript app that is functionally similar to this: https://fuschia-custard.glitch.me/

## Solution

- Implemented using the [express](http://expressjs.com/) and [pg](https://github.com/brianc/node-postgres) libraries.
- Two tables (`users` and `exercise`) are used to hold data inside a PostgreSQL database.
- Usernames in the `users` table are checked for duplicates.
- Three routes are created to handle creation of new users, creation of new log entries and retrieval of user / exercise information.
