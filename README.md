# Body Quest

## [Body Quest Website](https://bodyquest.azurewebsites.net/)

## My Role

Using Agile methodology, I acted as the leader of our team composed of 5 developers listed in the [Authors](#authors) section below. <br> I took on the responsibility in creating our issues board pre our next sprint where during our pre-sprint-meetings we could review the issues and assign them to each other taking preference into account as well as task time estimates.<br> I also took the intiative to ensure that everyone isn't afraid to ask for help if they were ever stuck or did not understand something. <br> I worked on all the parts of our project: from nodeJs-express backend to frontend React logic aswell as some design aspects. However, I would like to credit to [Sophia](#authors) for our amazing design. My personal responsibilities also included creating our CI/CD pipeline (created on gitlab) to ensure our tests pass and our website gets deployed to Azure web service. <br> I was also responsible in creating our importer tool to create and populate our exercise dataset into our MongoDb Atlas database with Java. <br> As the leader, I took the intiative to introduce typescript to our project for the whole team to improve their skill set. <br> I was also reposnible for code ducmentation, specifically swagger documentation for our routes.

## Description

Bodyquest is a web appication where users are able to track the progress of the exercises available on the website.
They can favourite their exercises for easier access and create a goal to help them reach their goals faster and in a timeline.
By setting up goals and acheving them they are able to show their commitment to healthy lifestyle by their level.
The users are also able to post images of themselves for the community to support them by liking their post or see their profile.

## Set Up The Importer Tool

Follow the ReadMe in Importer-tool folder for more infomration. <br>
This tools allows to seed the database with the required exercises.

### [ReadMe](./Importer-tool/ReadMe.md)

## Envrionment Variables

- ATLAS_URI=**Atlas connection string**
- DATABASE_NAME=**database name from mongo**
- GOOGLE_CLIENT_ID=**Google Client Id generate by https://console.cloud.google.com Oauth2**
- SECRET=**Secret string for session - generate a secure string**
- NEED_GOOGLE=**This was a variable to turn off google auth during test stage**
- AZURE_STORAGE_RESOURCE_NAME=**Azure Resource name for the blob storage**
- AZURE_STORAGE_SAS_TOKEN=**Azure blob storage SAS token to store feed pictures**
- AZURE_STORAGE_USER_PROFILE_SAS_TOKEN = **Azure blob storage SAS token to store user profile pictures**

### Features

- Google Authentication
- Multi-Language Support
- Dark/Light mode
- Accessbile Website Design
- Search through the list of exercises to track
- Filter throught the list of exercises to track
- Create a goal to track a certain exercises
- View your profile
  - goals
  - favourites
  - infomration
- Able To add and remove an exercise to your favourites
- Able to add a goal of an exercise
- Able to see other users profile pages.
- Able to edit your profile information

## Authors

- Davit Voskerchyan
- Raphaël Canciani
- Wanting Huang
- Santiago Luna Gonzalez
- Sophia Marshment
