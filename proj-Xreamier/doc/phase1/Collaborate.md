# XReamier - Collaboration
---

**Team Roster**

| Name      |                            Skills                                  |
|-----------|--------------------------------------------------------------------|
|Raymond Gao| DB, Model Design, Video Editing, Artifact Creation, Markdown master|
|Daniel Chan|React, Flask, NodeJS, Docker, PostgreSQL                   |
|Patrick    | CSS, Python, React, NodeJS, Ruby
|Nick       | CSS, Python, Ruby
|Jonathan   | CSS, React, Bootstrap, Python, Postgres SQL
|Matthew    | CSS, Python, NodeJS, Bootstrap, PostgreSQL

Based on the roster, our team has a very solid foundation in many of the technologies popular in both front end and backend development. However, we are lacking a UI expert.

This evaluation was taken into account in our scoping decision in Scope.md.



---

**Meetings**

We have had several meetings in person thus far. In these meetings we acquainted ourselves with the other memebers of the team, evaluated our strengths and weaknesses, discussed learning goals and APIs, and shared interesting work stories. The following is a detailed breakdown of our meetings.

| Meeting Time | Members Present | Purpose                                             |
|--------------|-----------------|-----------------------------------------------------|
| Feb 6th      | All             | Met the members of the team. Evaluated our strengths and weaknesses |
| Feb 10th     | All             | Discussed architecture and scope. Decided on learning goals |
| Feb 14th     | All             | Discussed deliverable. |

The artifacts created during these meetings is included in the directory entitled "Meeting Artifacts".

In moving forward we have decided on the following schedule and methods of communication.

| Communication Method      |   Time        | Purpose                                             |
|---------------------------|---------------|-----------------------------------------------------|
| Discord                   |  Anytime      | Ping other members. Discuss roadblocks and progress |
| In Person                 |  Fri 5-6      | Evaluate work-week. Plan for next work-week.        |

Discord is an excellent multichannel chat and voice service that's completely free. We will be using it to keep track of links to important documents which will be on google-docs. We also have a plugin that connects to our git repository and notifies us of changes (pull-requests, branches, etc...)

---

**Team Organization**

We have adapted the popular Scrum method to fit better within an academic schedule as well as to support higher quality code reviews.

As per usual of scrum, we will be working on the product in iterations attempting to get a minimum MVP as fast as possible. In addition we will break up the work into several task groups. Before explaining what a task group is it will be helpful to understand our vision for the design of the application.  Below is a figure of the microservices that will be needed.

![This figure did not load](https://github.com/FreakingBarbarians/FreakingBarbarians_Images/blob/master/MicroservicesDiagram.png?raw=true)

**WebPage**:
-- User Endpoint
-- Dashboards and the interfaces that facilitate the interactions with our services

**Authentication**:
-- Validates user identity, forwards request to requested services

**Ticketing Server**:
-- Handles ticket creation, delete, update and manages the notifies the relevant parties within a ticket.
-- Tightly coupled with the Email Notification Service.

**Email Notification Service**:
-- Handles notifications when ticket status gets updated

**PostgresDB**:
-- Handles queries for information
-- Serves as a base for the application model

**CSV Exporter**:
-- Exports ticketing information in a CSV file as required by clients

As can be seen, all routes must be authorized through the authentication service, and from there the routes will be resolved and the user will see feedback on the web-interface.

We have thus decided to break down the work into parallelizable task groups. They correspond with each service. Each member of our team will be a member of two task groups and within these groups a small instance of scrum will be run. That is, each task group will have iterations (sprints) within itself.

| Task Group | Member |
|------------|--------|
| WebPage | Jonathan, Daniel|
| Authentication | Ray,  Matthew
| Ticketing Server | Nick, Matthew, Patrick
| Email Notification Service | Jonathan, Patrick  
| PostgresDB | Ray, Daniel
| CSV Exporter | Patrick, Nick 
---

**Tasks/Workflow**

Continuing with our task group mini-scrum, each group will be responsible for creating their own tasks and managing their own iterations. Apart from that it will be fairly laissez-faire with the emphasis on getting something working as fast as possible. We will try to use Github issues to track tasks.

In regards to workflow, it will follow this flowchart.

![The Stuff Didn't Load :c](https://github.com/FreakingBarbarians/FreakingBarbarians_Images/blob/master/CSC302-Workflow.png?raw=true)

>> In general we want a 1:1 ratio between issues and fork requests.

Because we have two people per task group, a group member with good contextual understanding of the problem can conduct a higher quality code review.

To track progress we will be using milestones.

|WebPage| Authentication | Ticketing Server | Email Notification Service | PostgresDB |CSV Exporter|
|---------| ---- | ---- | ---- | ---- | ---- |
|Landing Page Setup| Credentials Setup | Ticket Creation | Notifications Complete | Setup SQL Scehma | Exportable CSV|
| Dashboards | Authentication for Different Users | Ticket Status Changes | Notifications Tested | Setup DB | Tested & Verified CSV Format|
|To Do Lists | Operation Support for Different Users | Ticket Notes | | DB Tested | |
|Web Pages Tested | Authentication Tested | Tickets Tested | | | |

In the event that certain task-groups proceed very far ahead of others, and there is some dependancy issues between the task-groups, then it is up to the ahead task-group to create dummy data and scaffold their own interfaces.

---

**Roles**

>> Scrum Master

There is no scrum master, as each task group team will manage their tasks internally.

>> Sub-Team Master - Nick

Responsible for reviewing interfaces of each microservice and coordinating the teams.

>> Grad-Office Minion (Product Manager) - Ray

Responsible for ensuring the product produces value to the customer and that the development team's model and the ground truth are aligned.

>> TDD/CI - Daniel

Responsible for creating guidelines for test driven development and getting CI set up.

>> Repository Manager- Daniel

Responsible for the github repo in case problems arise.
