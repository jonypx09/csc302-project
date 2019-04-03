# Testing
## Introduction
For the CSC302 project, we will be employing a TDD approach. Since most of the services are already split up and largely independent of one another, it makes it extremely easy to apply continuous integration with each service. 

## Continuous Integration and TravisCI
We plan to set up a TravisCI that will facilitate the unit testing and regression tests for the project. Linting is also another feature that TravisCI brings, which allows us to standardize how the code is formatted and ensures that the best practices are being used to develop the code. Another benefit that TravisCI brings is that Docker is fully integrated and the images themselves can be tested for any flaws or compatibility issues with the code.

We intend to use PyLint for Python related code, and JSLint for JavaScript related code.

The image below outlines how the CI deployment will occur in Travis, on a high level this is how it would ensure that the application is well tested and ready for deployment.
![This figure did not load](https://i.imgur.com/JSPaCiL.png)

## Unit Testing and Regression Testing
Unit testing is essential in software development, while we’re aiming to get 100% code coverage in corner cases and normal cases, there are cases when having to write complicated tests to cover a single rare case is not worthwhile and for that we’ve decided to approach it using the [Ostritch Algorithm](https://en.wikipedia.org/wiki/Ostrich_algorithm).

For front-end code written in JavaScript with React and Redux, we plan on using Jest (essentially Jasmine on steroids) which will help us test functions and state management within our program.

We’ve collectively decided as a group that when we’re developing our own microservices we need to keep in mind that prior to a merge request being opened we need to write the tests that are related to our microservice, and ensure that existing tests are passing (regression tests) and if any need to be changed, a comment must be made to clarify the changes.

## Conclusion
All-in-all the way we’ve structured our tests and services allow us to use continuous deployment to deploy without downtime and automate the entire pipeline from start to finish.


