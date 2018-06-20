# Familj

Familj is an ios App that provides an interface for all family members which will guarntee their contibution within their house and strengthen their family bonds.

## Problem
In this era, families in all communites are suffering from being away from each other caused by many reasons one of them is overusing the social media networks.
that will guide to a weak family bonds which will destroy the community.

## Solution
Familj helps family members to interact with each other. 
Each family has it's own id and all family members should sign up with that id, there are two User Interfaces one for the sibilings and the other for the parents, parents have some extra authorites to monitor their kids life and teach them responsibility by envolving them with all family tasks,activites and responsibilites.

## Technologies
The app is built by using React Native framework, and it was tested on both IOS and Android, and preferred to run on IOS. We used Nodejs/Express, and MongoDB in the backend. We used Mocha, Chai, Jest for unit testing. 
    
    
## Installation

Install Back-end dependencies
Move to the server folder, then run:
npm install

Install Front-end dependencies
Move to the familyapp folder, then run:
npm install

## File Hieghrarcy  
    Avengers+
    ..../server
    ........server.js (server configuration)
    ........index.js(express middleware and routes connection)
    ......./config
    ..........dbconfig.js(mongodb configuration)
    ......./modules
    ........../family
    .............models.js
    .............routes.js
    .............controllers.js
    ......./test
    ..........serverSpec.js (integeration test signup-login)
    ..........user_model_test.js (unit test-user model )
    .......package.json (server dependencies)
    
    ..../familyApp
    .......App.js (main front-end file)
    ......./app
    ........../components
    .............SignUp.js
    .............Login.js
    .............TaskMonitor.js
    .............TaskDisplay.js
    .............Finance.js
    .............Shortage.js
    .............ShortageNote
    .............Drawer.js
    .............DrawerKids.js
    .............UserInfo.js
    .............Bar.js
    ............./_test_
    .................setupTests.js
    ................SignUp.test.js
    ................Login.test.js
    ................Finance.test.js
    ................Drawer.test.js
    ................TaskMonitor.test.js
    ................Bar.test.js
    ....README.md
    

## Features
- Different family roles registeration.
- Parent Task assignment and monitoring for their kids.
- Task display for kids.
- Kids can mark their assigned tasks as complete.
- Parents can confirm the compelation of kids tasks.
- Tasks won't be deleted until it is marked as completed by kids.
- Adding monthly payments for family, parents have a complete permission to add, edit, and delete, while kids only view the data.
- Adding Shortage/need for a family.



## Screens

![](https://i.imgur.com/wfESssm.png)      ![](https://i.imgur.com/QjV8DdC.png) ![](https://i.imgur.com/3hBthax.png)

![](https://i.imgur.com/3kvdNSO.png) ![](https://i.imgur.com/SSSLOUS.png) ![](https://i.imgur.com/daWRBhi.png)


![](https://i.imgur.com/cmlALOm.png)



