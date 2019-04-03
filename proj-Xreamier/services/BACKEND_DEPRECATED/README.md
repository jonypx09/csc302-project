# The Ticketing Microservice
The ticketing microservice uses Flask and SQLAlchemy's ORM service for database management.
The ticketing microservice provides the ability to assign tickets to users, update existing tickets, delete tickets.
Tickets can also have zero or more notes attached and the ticketing microservice facilitates adding, updating and removing notes.

## Quickstart (Running the app)
1. Install PostgreSQL - [Click Here](https://www.postgresql.org/download/)
2. Create a database called "gradapp" with an owner called "csc302" whose password is "csc302isfun"
3. Run the database on port 5432 or alternatively set the port to your desired port number in the connect_db function in routes.py (This is often the source of 500 errors)
4. Activate the python virtual environment with `source venv/Scripts/activate`
5. Add routes.py to the path with `export FLASK_APP=routes.py`
6. To run the app do `flask run`
7. To deactivate the virtual environment do `source deactivate` or `deactivate`

## Quickstart (Testing the app)
1. Install PostgreSQL - [Click Here](https://www.postgresql.org/download/)
2. Create a database called "gradapp" with an owner called "csc302" whose password is "csc302isfun"
3. Run the database on port 5432 or alternatively set the port to your desired port number in the connectDB function in ticket_routes_tests.py (This is often the source of 500 errors)
4. Activate the python virtual environment with `source venv/Scripts/activate`
5. Do `python ticket_routes_tests.py`
6. To deactivate the virtual environment do `source deactivate` or `deactivate`

## API/RESTful Endpoints
|HTTP method|Endpoint|Description|Protected|Required Fields|Successful Response|Failed Response|Successful Return Type|
|-----------|--------|-----------|---------|---------------|-------------------|---------------|----------------------|
|GET|/portal/ticket:ticket_id|Retrieves the ticket whose id is ticket_id|Yes|ticket_id|200 OK|204 NO CONTENT if no such ticket exists|a single Ticket object as JSON|
|PUT|/portal/ticket|Updates the status of a ticket|Yes|ticket_id, status|200 OK|204 NO CONTENT if no such ticket exists, 400 BAD REQUEST if either ticket_id or status is not an int, 503 SERVICE UNAVAILABLE if database error|N/A|
|POST|/portal/ticket|Creates a new ticket|Yes|assigner, assignee|201 CREATED|400 BAD REQUEST if either assigner or assignee is None, 504 SERVICE UNAVAILABLE if database error|N/A|
|DELETE|/portal/ticket/:ticket_id|Deletes the ticket whose id is ticket_id|Yes|ticket_id|200 OK|400 BAD REQUEST if no such ticket exists, 503 SERVICE UNAVAILABLE if database error|N/A|
|GET|/portal/ticket/note/:tick_id|Retrieves a list of all notes attached to the ticket whose id is tick_id|Yes|tick_id|200 OK|204 NO CONTENT if there are no notes|a list of Note objects as JSON|
|DELETE|/portal/ticket/note/:note_id|Deletes the note whose id is note_id|Yes|note_id|200 OK|400 BAD REQUEST if no such note exists, 503 SERVICE UNAVAILABLE if database error|N/A|
|PUT|/portal/ticket/note/message/:note_id|Updates the message component of the note whose id is note_id|Yes|note_id, message|200 OK|400 BAD REQUEST if no such note exists, 503 SERVICE UNAVAILABLE if database error|N/A|
|PUT|/portal/ticket/note/status/:note_id|Updates the status component of the note whose id is note_id|Yes|note_id, status|200 OK|400 BAD REQUEST if no such note exists or if status is not an int, 503 SERVICE UNAVAILABLE if database error|N/A|
|PUT|/portal/ticket/note/type/:note_id|Updates the type component of the note whose id is note_id|Yes|note_id, type|200 OK|400 BAD REQUEST if no such note exists or if type is not an int, 503 SERVICE UNAVAILABLE if database error|N/A|
|POST|/portal/ticket/note/:ticket_id|Creates a new note for a ticket whose id is ticket_id|Yes|ticket_id, poster, message, status, type|200 OK|400 BAD REQUEST if message is empty string or status or type are not ints or no such ticket exists, 503 SERVICE UNAVAILABLE if database error|N/A|
