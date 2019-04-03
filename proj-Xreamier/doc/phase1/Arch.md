# Architecture

### Introduction
----------
Architecturally-wise the entire web application will be split up into modular and scalable microservices. The microservices architecture allows us to structure the application which allows for continuous integration and continuous deployment, since each microservice is not tightly coupled with another, allowing each microservice to be deployed at their own pace.


### High-level Overview
---------

![This figure did not load](https://github.com/FreakingBarbarians/FreakingBarbarians_Images/blob/master/MicroservicesDiagram.png?raw=true)


This architecture will include a total of 5 services, refer to the image above for a high level overview of how each microservice will interact with along with which service is externally facing to the user. The languages and frameworks chosen for each microservice compliments well with what each member of our group is looking to get out of this project; whether it be more exposure to front end development, database interaction or back end development, there’s at least something that a member of our group is proficient in and can help familiarize another member with the framework/skill.

To facilitate the deployment and the use of a microservice architecture, we’ll be using Docker and potentially Docker Swarm if we need to scale the microservices within a cluster.

The front-end for the entire web application will be written in JavaScript, using Node, React and Redux to facilitate the routing and client side rendering. 

## The Authentication Microservice
This microservice is the only one that is externally facing towards the user. All requests and interactions will go through this service and forward the request internally. Since the majority of the interactions with the application will require the client to be authenticated it makes sense that this will be the first chain in their requests.

The backend for this service will be written in Python using Flask and SQLAlchemy to facilitate the communication with the PostgreSQL database. This service will also serve as the initial entry point to the React client.

## The Ticketing Microservice
This microservice will act as the controller within the MVC design pattern, manipulating the database and listening to the authorized users’ requests from the authentication service to create/update/delete/retrieve tickets. This service alone will be the one that communicates with the database the most.

The backend for this service will be written in Python using Flask and SQLAlchemy and will share the same docker image as the authentication microservice.

## The CSV Exporter Microservice
This microservice will handle the conversion of a ticket's information into an excel-compatible file format as required by the specifications from the client. This service will expose its disk/storage to the ticketing microservice so the files can be accessed by the users.

The backend for this service will be written in Python using Flask and SQLAlchemy and will share the same docker image as the ticketing and authentication services.

## The Database Microservice
This microservice will serve PostgreSQL which will house all the information that needs to be stored for the web application. PostgreSQL is the database that we’re all familiar with, given that it’s the database of choice for CSC343 which we’ve all taken.

Alongside PostgreSQL we’ll be using SQLAlchemy as our Object Relational Mapping (ORM) to facilitate the interactions with tables and fields. ORMs allow ease of maintainability (no complex queries) and rapid development since it’s essentially interacting and modifying objects and the ORM converts them into SQL syntax.

Additionally with SQLAlchemy, there’s a nifty plugin called Alembic that can help with the generation of database migrations to create our schemas and alter the database as we discover we need additional tables and fields.

This service will be written in Python using SQLAlchemy and Alembic.

## The Email Notification Microservice
This microservice will handle sending email notifications to users of our application. The email notifications allow users to be quickly notified of any changes to their tickets and have the ability to respond quickly. 

The email notification service simply interacts with the SendGrid API to send out emails. An example use case of this would be when a ticket gets approved, the application can notify the relevant Professor/Department to start the hiring process.

This service will be written in Python using Flask and SQLAlchemy, and will share the same Docker image as the first 3.