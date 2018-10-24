# A Course Rating API Built With Express
The back end for a "Course Rating Application" which lets users create, edit and rate courses.  
The API will provide a way for users to review educational courses: users can see a list of courses in a database; add courses to the database; and add reviews for a specific course.  
Built using Express and MongoDB.  

Treehouse Full Stack JavaScript Techdegree - Project 11

## Main Project Goals
* Set up a connection to your MongoDB database using Mongoose
* Create a Mongoose schema and models
* Create the user and course routes
* Update any POST and PUT routes to return Mongoose validation errors
* Update the User model to store the user's password as a hashed value
* Create an authentication method on the user model to return the user document based on their credentials
* Set up permissions to require users to be signed in
* Add validation to prevent a user from reviewing their own course
* Write tests for stated user stories
* Use Mongoose deep population to return only user's name and hide user's other private details

**Project Completed:** 10/23/2018  
**Grade:** Exceeds Expectations

---
## Installation Instructions:
1. git clone https://github.com/jordanmor/course-rating-api

2. npm install

---

## Usage Instructions:
1. In your terminal, start MongoDB with the command: `mongod`

2. Open up a new tab in your terminal

3. If you would like to populate your database with some seed data, run the command: `npm run import`

4. Run this program using the command: `npm start`

5. Use Postman to add at least one user to the database. All users entered into the database with this app will have a hashed password. This is necessary in order to test routes that require user authorization. For more information, see "Postman Usage and Installation Instructions" below.

---

## Postman Usage and Installation Instructions:  
If you would like to use Postman to explore and test this app's REST API, follow these steps:

1. If you do not have Postman installed:
    - go to https://www.getpostman.com/apps to download and install Postman on your computer

2. Click on the "Import" button in the top left hand corner of the applications window

3. In the opened dialog, click the "Choose Files" button and browse to the folder that contains your project files

4. Select the **CourseAPI.postman_collection.json** file

5. You should now see the **Course API** collection in the left hand pane of the main Postman window

6. Be sure that your REST API is currently running. Click on one of the available requests to load it into a tab. Click on the **Request** button to issue the request to the local server.

7. When testing routes that require user authorization, make sure to set Authorization Type in postman to Basic Auth to enter the user's email and password

---

## Unit Testing with Mocha and Chai Instructions:
1. Make sure MongoDB is running in your terminal. If not, start MongoDB with the command: `mongod`

2. Open up a new tab in your terminal

3. Test the user route GET /api/users using the command: `npm test`