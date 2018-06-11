# [File Metadata Microservice](https://learn.freecodecamp.org/apis-and-microservices/apis-and-microservices-projects/url-shortener-microservice)

Part of the [freecodecamp](https://www.freecodecamp.com) curriculum.

## Objective

Build a full stack JavaScript app that is functionally similar to this: https://thread-paper.glitch.me/

## Solution

- Implemented using the [express](http://expressjs.com/) and [multer](https://github.com/expressjs/multer) libraries.
- A static `index.html` file is served from the `static` folder using express middleware.
- The `index.html` page contains a form which uploads a file to the express server.
- A single route is added to the application to deal with the incoming file.
- The multer library is first called, which is configured to expect a single file.
- Once information about the file has been populated into the request object, file details are sent back in the response.
