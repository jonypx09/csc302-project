import routes
import unittest
import psycopg2
import datetime
from models import Base, Ticket, User, Ownership, Note
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from flask import json

# Warning: these tests empty the database on the tearDown method. They assume an empty
# database at the beginning. Don't run these tests on a database for which you want
# content persisted.

"""
A test class that tests the ticket routes in the routes.py file.
"""
class RouteTicketTests(unittest.TestCase):
    
    # Adds 2 users to the db for testing.
    def add_users_to_db(self):
        user1 = User(username="oompa", password="loopma", createdAt=datetime.date.today(),
                updatedAt=datetime.date.today())
        user2 = User(username="loompa", password="ooma", createdAt=datetime.date.today(),
                updatedAt=datetime.date.today())
        self.session.add(user1)
        self.session.add(user2)
        self.session.commit()

    # Adds the note with message msg by the username user to the ticket whose id is tick_id.
    def add_notes_to_ticket(self, user, tick_id, msg):
        user = self.session.query(User).filter_by(username=user).first()
        user_id = user.id
        note = Note(poster_id=user_id, ticket_id=tick_id, message=msg, status=0,
                type=0, createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        self.session.add(note)
        self.session.commit()

    # Removes all notes in the db.
    def delete_all_notes(self):
        notes = self.session.query(Note).all()
        if len(notes) > 0:
            for n in notes:
                self.session.delete(n)
            self.session.commit()

    # Removes all tickets in the db.
    def delete_all_tickets(self):
        tickets = self.session.query(Ticket).all()
        if len(tickets) > 0:
            for tick in tickets:
                self.session.delete(tick)
            self.session.commit()

    # Removes all users in the db.
    def delete_all_users(self):
        users = self.session.query(User).all()
        if len(users) > 0:
            for u in users:
                self.session.delete(u)
            self.session.commit()

    # Removes all ownerships in the db.
    def delete_all_ownerships(self):
        ownerships = self.session.query(Ownership).all()
        if len(ownerships) > 0:
            for owner in ownerships:
                self.session.delete(owner)
            self.session.commit()
    
    """ <---------------------helpers above------------------------> """

    # Any necessary doings before each test begins.
    def setUp(self):
        routes.app.config['TESTING'] = True
        self.app = routes.app.test_client()
        self.connectDB("csc302", "csc302isfun", "gradapp")
    
    # Restore the database back to an empty slate.
    def tearDown(self):
        self.delete_all_notes()
        self.delete_all_tickets()
        self.delete_all_users()
        self.delete_all_ownerships()
    
    # Connect to the database.
    def connectDB(self, username, password, database, host="localhost", port=5432):
        url = 'postgresql://{}:{}@{}:{}/{}'
        url = url.format(username, password, host, port, database)
        engine = create_engine(url)
        Base.metadata.bind = engine
        DBSession = sessionmaker()
        DBSession.bind = engine
        self.session = DBSession()
    
    # Set the ticket id to a non-integer type and make the request.
    def test_get_ticket_with_non_int_arg(self):
        response = self.app.get('/portal/ticket/jumanji')
        assert response.status == "404 NOT FOUND"
        response = self.app.get('/portal/ticket/-41')
        assert response.status == "404 NOT FOUND"

    # Request a ticket id that does not exist in the system.
    def test_get_ticket_that_does_not_exist(self):
        # Verify the ticket is not in the db.
        check = self.session.query(Ticket).filter_by(id=4).first()
        assert check is None
        response = self.app.get('/portal/ticket/4')
        assert response.status == "204 NO CONTENT"

    # Request a ticket id that does exist in the system.
    def test_get_ticket_that_exists(self):
        ticket = Ticket(id=3, status=7, createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        self.session.add(ticket)
        self.session.commit()

        # Verify the ticket was added to the db.
        check = self.session.query(Ticket).filter_by(id=3).first()
        assert check is not None

        response = self.app.get('/portal/ticket/3')
        assert response.status == "200 OK"

    # Try to update the status of the ticket.
    def test_update_ticket_status(self):
        ticket = Ticket(id=2, status=0, createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        self.session.add(ticket)
        self.session.commit()

        result = self.app.put('/portal/ticket', data=dict(ticket_id=2, status=17), 
                follow_redirects=True)
        assert result.status == "200 OK"

        modified_ticket = self.session.query(Ticket).filter_by(id=2).first()
        assert modified_ticket.status == 17

    # Try to update the status of a ticket that does not exist in the system.
    def test_update_ticket_does_not_exist(self):
        result = self.app.put('/portal/ticket', data=dict(ticket_id=1, status=4),
                follow_redirects=True)
        assert result.status == "204 NO CONTENT"

    # Try to update the status of a ticket using a string as the ticket id.
    def test_update_ticket_bad_ticket_id_arg(self):
        result = self.app.put('/portal/ticket', data=dict(ticket_id="greg", status=3),
                follow_redirects=True)
        assert result.status == "400 BAD REQUEST"

    # Try to update the status of a ticket using a string as the status number.
    def test_update_ticket_bad_status_arg(self):
        result = self.app.put('/portal/ticket', data=dict(ticket_id=3, status="greg"),
                follow_redirects=True)
        assert result.status == "400 BAD REQUEST"

    # Try to create a ticket using an invalid assignee id.
    def test_create_ticket_bad_assignee(self):
        self.add_users_to_db()
        result = self.app.post('/portal/ticket', data=dict(assigner="oompa", assignee="whoami"),
                follow_redirects=True)
        assert result.status == "400 BAD REQUEST"

    # Try to create a ticket using an invalid assigner id.
    def test_create_ticket_bad_assigner(self):
        self.add_users_to_db()
        result = self.app.post('/portal/ticket', data=dict(assigner="whoami", assignee="loompa"),
                follow_redirects=True)
        assert result.status == "400 BAD REQUEST"

    # Try to create a valid ticket: we expect this ticket to get created.
    def test_create_ticket_valid(self):
        self.add_users_to_db()
        result = self.app.post('/portal/ticket', data=dict(assigner="oompa", assignee="loompa"),
                follow_redirects=True)
        assert result.status == "201 CREATED"

        # We should have exactly 2 new accounts and both should be linked to tick_id ticket id.
        ticket = self.session.query(Ticket).first()
        owners = self.session.query(Ownership).all()
        users = self.session.query(User).all()

        assert len(owners) == 2
        assert len(users) == 2
        tick_id = ticket.id

        # Verify the 2 new accounts both own the same and correct ticket id and that they are the
        # two owners oompa and loompa that we expect to see.
        found_oompa = False
        found_loompa = False
        for owner in owners:
            assert owner.ticket_id == tick_id
            if owner.owner_id == users[0].id:
                if not found_oompa and users[0].username == "oompa":
                    found_oompa = True
                elif not found_loompa and users[0].username == "loompa":
                    found_loompa = True
            elif owner.owner_id == users[1].id:
                if not found_oompa and users[1].username == "oompa":
                    found_oompa = True
                elif not found_loompa and users[1].username == "loompa":
                    found_loompa = True
            else:
                # Then we found someone else.
                assert False
        assert found_oompa and found_loompa

    # Try to get a note using a string as the ticket id.
    def test_get_ticket_note_bad_arg(self):
        result = self.app.get('/portal/ticket/note/huh')
        assert result.status == "404 NOT FOUND"

    # Try to get a note for a ticket where the ticket itself does not exist.
    def test_get_ticket_notes_where_ticket_does_not_exist(self):
        result = self.app.get('/portal/ticket/note/14')
        assert result.status == "204 NO CONTENT"

    # Try to get notes for a ticket that does not have any notes associated with it.
    def test_get_ticket_notes_where_note_does_not_exist(self):
        ticket = Ticket(id=2, status=2, createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        self.session.add(ticket)
        self.session.commit()

        result = self.app.get('/portal/ticket/note/2')
        assert result.status == "204 NO CONTENT"

    # Try to get notes for a ticket using invalid arguments for the request.
    def test_get_ticket_notes_bad_args(self):
        response = self.app.get('/portal/ticket/jumanji')
        assert response.status == "404 NOT FOUND"
        response = self.app.get('/portal/ticket/-41')
        assert response.status == "404 NOT FOUND"

    # Try to get notes for a ticket that does not have notes associated with it.
    def test_get_ticket_notes_when_no_notes(self):
        result = self.app.get('/portal/ticket/note/3')
        assert result.status == "204 NO CONTENT"

    # Try to get notes for a ticket that has notes associated with it.
    def test_get_ticket_notes(self):
        # Add users and a ticket so that we can add some notes.
        self.add_users_to_db()
        ticket = Ticket(id=8, status=3, createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        self.session.add(ticket)
        self.session.commit()

        msg1 = "hello world! "
        msg2 = "i can talk! "
        msg3 = "me too"
        self.add_notes_to_ticket("oompa", 8, msg1)
        self.add_notes_to_ticket("oompa", 8, msg2)
        self.add_notes_to_ticket("loompa", 8, msg3)

        result = self.app.get('/portal/ticket/note/8')
        assert result.status == "200 OK"

    # Try to update the message, status and type of a note that does not exist.
    def test_update_ticket_note_where_ticket_has_no_notes(self):
        result = self.app.put('/portal/ticket/note/message/12', data=dict(message="idontexist"))
        assert result.status == "400 BAD REQUEST"
        result = self.app.put('/portal/ticket/note/status/13', data=dict(status=1))
        assert result.status == "400 BAD REQUEST"
        result = self.app.put('/portal/ticket/note/type/14', data=dict(type=1))
        assert result.status == "400 BAD REQUEST"

    # Try to update a note's status and type using strings as the update type.
    def test_update_ticket_note_using_bad_args(self):
        note = Note(id=3, poster_id=1, ticket_id=2, message="not updated", status=0, type=1,
                createdAt=datetime.date.today(), updatedAt=datetime.date.today()) 
        self.session.add(note)
        self.session.commit()
        result = self.app.put('/portal/ticket/note/status/3', data=dict(status="willy"))
        assert result.status == "400 BAD REQUEST"
        result = self.app.put('/portal/ticket/note/type/3', data=dict(type="nilly"))
        assert result.status == "400 BAD REQUEST"

    # Try to update the message component of a note.
    def test_update_ticket_note_message(self):
        note = Note(id=3, poster_id=1, ticket_id=2, message="not updated", status=0, type=1,
                createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        self.session.add(note)
        self.session.commit()
        result = self.app.put('/portal/ticket/note/message/3', data=dict(message="updated"))
        assert result.status == "200 OK"
        updated_note = self.session.query(Note).first()
        assert updated_note.message == "updated"

    # Try to update the status component of a note.
    def test_update_ticket_note_status(self):
        note = Note(id=2, poster_id=1, ticket_id=3, message="willy", status=0, type=1,
                createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        self.session.add(note)
        self.session.commit()
        result = self.app.put('/portal/ticket/note/status/2', data=dict(status=4))
        assert result.status == "200 OK"
        updated_note = self.session.query(Note).first()
        assert updated_note.status == 4

    # Try to update the type component of a note.
    def test_update_ticket_note_type(self):
        note = Note(id=5, poster_id=2, ticket_id=2, message="nilly", status=0, type=0,
                createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        self.session.add(note)
        self.session.commit()
        result = self.app.put('/portal/ticket/note/type/5', data=dict(type=7))
        assert result.status == "200 OK"
        updated_note = self.session.query(Note).first()
        assert updated_note.type == 7

    # Try to add a note to a ticket where the user posting the note does not exist.
    def test_add_ticket_note_where_poster_does_not_exist(self):
        result = self.app.post('/portal/ticket/note/4', data=dict(poster="ghost",
            message="i don't actually exist", status=0, type=1), follow_redirects=True)
        assert result.status == "400 BAD REQUEST"

    # Try to add a note to a ticket where the ticket itself does not exist.
    def test_add_ticket_note_where_ticket_does_not_exist(self):
        self.add_users_to_db()
        result = self.app.post('/portal/ticket/note/88', data=dict(poster="loompa",
            message="this aint even a ticket", status=2, type=3), follow_redirects=True)
        assert result.status == "400 BAD REQUEST"

    # Try to add a note using a string in place of a status number.
    def test_add_ticket_note_using_bad_status_arg(self):
        self.add_users_to_db()
        ticket = Ticket(id=4, status=1, createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        self.session.add(ticket)
        self.session.commit()
        result = self.app.post('/portal/ticket/note/4', data=dict(poster="oompa",
            message="hello", status="greg", type=3), follow_redirects=True)
        assert result.status == "400 BAD REQUEST"

    # Try to add the empty sring as the message of a ticket. This should not add a note.
    def test_add_ticket_note_with_empty_message(self):
        self.add_users_to_db()
        ticket = Ticket(id=3, status=2, createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        self.session.add(ticket)
        self.session.commit()

        result = self.app.post('/portal/ticket/note/3', data=dict(poster="oompa",
            message="", status=0, type=0), follow_redirects=True)
        assert result.status == "400 BAD REQUEST"

        # Verify the note was actually not added.
        notes = self.session.query(Note).all()
        assert len(notes) == 0

    # Try to add a note to a ticket for a valid ticket using the proper arguments to do so.
    # This note should be created.
    def test_add_ticket_note(self):
        # Add users and a ticket so that we can add some notes.
        self.add_users_to_db()
        ticket = Ticket(id=9, status=1, createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        self.session.add(ticket)
        self.session.commit()

        # Create the note.
        result = self.app.post('/portal/ticket/note/9', data=dict(poster="oompa",
            message="my message to the world", status=1, type=2), follow_redirects=True)
        assert result.status == "200 OK"

        # Verify the note is actually in the db.
        note = self.session.query(Note).filter_by(ticket_id=9,
                message="my message to the world", status=1, type=2).first()
        assert note is not None

        ticket = self.session.query(Ticket).first()

    # Try to delete a note from a ticket where the ticket exists but the note doesn't.
    def test_delete_ticket_note_where_note_does_not_exist(self):
        response = self.app.delete('/portal/ticket/note/5')
        assert response.status == "400 BAD REQUEST"

    # Try to delete a note from a ticket using improper arguments to do so.
    def test_delete_ticket_note_bad_args(self):
        response = self.app.delete('/portal/ticket/note/jumbo')
        assert response.status == "404 NOT FOUND"

    # Try to delete a note from a ticket for a valid ticket and valid note using a valid
    # approach, this should actually delete it.
    def test_delete_ticket_note(self):
        # Create our two users and make them owners of the same ticket.
        self.add_users_to_db()
        ticket = Ticket(id=3, status=0, createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        self.session.add(ticket)
        users = self.session.query(User).all()
        for user in users:
            owner = Ownership(owner_id=user.id, ticket_id=3, 
                    createdAt=datetime.date.today(), updatedAt=datetime.date.today())
            self.session.add(owner)
        note = Note(id=6, poster_id=users[0].id, ticket_id=3, message="My message to the world", status=2,
                type=3, createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        self.session.add(note)
        self.session.commit()

        # Now delete the note and verify it is gone.
        response = self.app.delete('/portal/ticket/note/6')
        response.status == "200 OK"
        result = self.session.query(Note).first()
        assert result is None

    # Try to delete a ticket using a string as the ticket id.
    def test_delete_ticket_bad_args(self):
        response = self.app.delete('/portal/ticket/oompa')
        assert response.status == "404 NOT FOUND"

    # Try to delete a ticket where the ticket itself does not exist.
    def test_delete_ticket_that_does_not_exist(self):
        # Verify the ticket is not in the db.
        check = self.session.query(Ticket).filter_by(id=5).first()
        assert check is None
        
        response = self.app.delete('/portal/ticket/5')
        assert response.status == "400 BAD REQUEST"

    # Try to delete a ticket that does exist.
    def test_delete_ticket_that_does_exist(self):
        ticket = Ticket(id=3, status=7, createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        self.session.add(ticket)
        self.session.commit()

        # Verify the ticket has been added to the db
        check = self.session.query(Ticket).filter_by(id=3).first()
        assert check is not None

        response = self.app.delete('/portal/ticket/3')
        assert response.status == "200 OK"

        # Verify the ticket is no longer in the db
        check = self.session.query(Ticket).filter_by(id=3).first()
        assert check is None
    
if __name__ == '__main__':
    unittest.main()
