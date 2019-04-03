import os
import sqlite3
import psycopg2
import datetime
from models import Base, Ticket, Note, Ownership, User
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from flask import Flask, json, jsonify, Response, request, session, g, redirect, url_for, abort, \
     render_template, flash

app = Flask(__name__)
app.config.from_object(__name__)

""" Need some JSON converters since datetime objects are not JSON serializable. """

# Converts a single Ticket object to JSON.
def ticket_json_converter(ticket):
    ticket_dict = {}
    ticket_dict['id'] = ticket.id
    ticket_dict['status'] = ticket.status
    ticket_dict['createdAt'] = ticket.createdAt.isoformat()
    ticket_dict['updatedAt'] = ticket.updatedAt.isoformat()
    return json.dumps(ticket_dict)

# Converts a list of Note objects to JSON.
def notes_json_converter(notes):
    note_list = []
    for note in notes:
        note_dict = {}
        note_dict['id'] = note.id
        note_dict['poster_id'] = note.poster_id
        note_dict['ticket_id'] = note.ticket_id
        note_dict['message'] = note.message
        note_dict['status'] = note.status
        note_dict['type'] = note.type
        note_dict['createdAt'] = note.createdAt.isoformat()
        note_dict['updatedAt'] = note.updatedAt.isoformat()
        note_list.append(note_dict)
    return json.dumps(note_list)


# Produces error codes to return to user upon requests. Convenient for codes that
# flask doesn't recognize itself, like many of the 2xx success codes.
def produce_status_code(code):
    return Response("{'a':'b'}", status=code, mimetype='application/json')

# Returns a connection to the database.
def connect_db(username="csc302", password="csc302isfun", database="gradapp", host="localhost", port=5432):
    url = 'postgresql://{}:{}@{}:{}/{}'
    url = url.format(username, password, host, port, database)
    engine = create_engine(url)
    Base.metadata.bind = engine
    DBSession = sessionmaker()
    DBSession.bind = engine
    session = DBSession()
    return session

# The connected session.
sess = connect_db()


""" <---------------------- ticket routes below --------------------------> """

# Route for fetching an existing ticket.
@app.route('/portal/ticket/<int:ticket_id>', methods=['GET'])
def get_ticket(ticket_id):
    try:
        result = sess.query(Ticket).filter_by(id=ticket_id).first()
        if result is None:
            return produce_status_code(204)
        else:
            return ticket_json_converter(result)
    except:
        abort(500)


# Route for updating the status of an existing ticket.
@app.route('/portal/ticket', methods=['PUT'])
def update_ticket():
    try:
        ticket_id = request.form['ticket_id']
        new_status = request.form['status']
        try:
            t_id = int(ticket_id)
            ns = int(new_status)
        except:
            return produce_status_code(400)

        ticket = sess.query(Ticket).filter_by(id=t_id).first()
        if ticket is None:
            return produce_status_code(204)
        else:
            # Update the status of the ticket.
            setattr(ticket, 'status', ns)
            setattr(ticket, 'updatedAt', datetime.date.today())
            try:
                sess.commit()
                return produce_status_code(200)
            except exc.SQLAlchemyError:
                return produce_status_code(503)
    except:
        abort(500)


# Route for creating a new ticket.
@app.route('/portal/ticket', methods=['POST'])
def create_ticket():
    try:
        assigner = request.form['assigner']
        assignee = request.form['assignee']
        
        # First make the ticket.
        ticket = Ticket(status=0, createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        sess.add(ticket)
        try:
            sess.commit()
        except exc.SQLAlchemyError:
            return produce_status_code(503)

        # Now reference the assigner and assignee to it.
        assigner_user = sess.query(User).filter_by(username=assigner).first()
        assignee_user = sess.query(User).filter_by(username=assignee).first()
        
        if assigner_user is None or assignee_user is None:
            return produce_status_code(400)

        assigner_owner = Ownership(owner_id=assigner_user.id, ticket_id=ticket.id,
                createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        assignee_owner = Ownership(owner_id=assignee_user.id, ticket_id=ticket.id,
                createdAt=datetime.date.today(), updatedAt=datetime.date.today())
        sess.add(assigner_owner)
        sess.add(assignee_owner)

        try:
            sess.commit()
        except exc.SQLAlchemyError:
            sess.delete(ticket)
            sess.commit()
            return produce_status_code(503)
        try:
            sess.commit()
        except exc.SQLAlchemyError:
            sess.delete(ticket)
            sess.commit()
            return produce_status_code(503)
        return produce_status_code(201)
    except:
        abort(500)


# Route for deleting an existing ticket.
@app.route('/portal/ticket/<int:ticket_id>', methods=['DELETE'])
def delete_ticket(ticket_id):
    try:
        result = sess.query(Ticket).filter_by(id=ticket_id).first()
        if result is None:
            return produce_status_code(400)
        else:
            sess.delete(result)
            try:
                sess.commit()
                return produce_status_code(200)
            except exc.SQLAlchemyError:
                return produce_status_code(503)
    except:
        abort(500)


""" <----------------- note routes below ---------------------> """

# Route for fetching a note for an existing ticket.
@app.route('/portal/ticket/note/<int:tick_id>', methods=['GET'])
def get_note(tick_id):
    try:
        result = sess.query(Note).filter_by(ticket_id=tick_id).all()
        size = len(result)
        if size == 0:
            return produce_status_code(204)
        else:
            return notes_json_converter(result)
    except:
        abort(500)


# Route for deleting an existing note from an existing ticket.
@app.route('/portal/ticket/note/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    try:
        result = sess.query(Note).filter_by(id=note_id).first()
        if result is None:
            return produce_status_code(400)
        else:
            sess.delete(result)
            try:
                sess.commit()
                return produce_status_code(200)
            except exc.SQLAlchemyError:
                return produce_status_code(503)
    except:
        abort(500)


# Route for updating the message of an existent note.
@app.route('/portal/ticket/note/message/<int:note_id>', methods=['PUT'])
def update_note_message(note_id):
    try:
        note = sess.query(Note).filter_by(id=note_id).first()
        if note is None:
            return produce_status_code(400)
 
        msg = request.form['message']
        setattr(note, 'message', msg)
        setattr(note, 'updatedAt', datetime.date.today())
        try:
            sess.commit()
            return produce_status_code(200)
        except exc.SQLAlchemyError:
            return produce_status_code(503)
    except:
        abort(500)


# Route for updating the status of an existent note.
@app.route('/portal/ticket/note/status/<int:note_id>', methods=['PUT'])
def update_note_status(note_id):
    try:
        note = sess.query(Note).filter_by(id=note_id).first()
        if note is None:
            return produce_status_code(400)

        stat = request.form['status']
        try:
            st = int(stat)
            setattr(note, 'status', st)
            setattr(note, 'updatedAt', datetime.date.today())
        except:
            return produce_status_code(400)
        try:
            sess.commit()
            return produce_status_code(200)
        except exc.SQLAlchemyError:
            return produce_status_code(503)
    except:
        abort(500)


# Route for updating the type of an existent note.
@app.route('/portal/ticket/note/type/<int:note_id>', methods=['PUT'])
def update_note_type(note_id):
    try:
        note = sess.query(Note).filter_by(id=note_id).first()
        if note is None:
            return produce_status_code(400)

        note_type = request.form['type']
        try:
            nt = int(note_type)
            setattr(note, 'type', nt)
            setattr(note, 'updatedAt', datetime.date.today())
        except:
            return produce_status_code(400)
        try:
            sess.commit()
            return produce_status_code(200)
        except exc.SQLAlchemyError:
            return produce_status_code(503)
    except:
        abort(500)

# Route for creating a note for an existing ticket.
@app.route('/portal/ticket/note/<int:ticket_id>', methods=['POST'])
def create_note(ticket_id):
    try:
        poster = request.form['poster']
        msg = request.form['message']
        stat = request.form['status']
        note_type = request.form['type']

        if len(msg) == 0:
            # Empty message, we do not add such a note.
            return produce_status_code(400)

        # Verify the user and ticket both exist.
        user = sess.query(User).filter_by(username=poster).first()
        if user is None:
            return produce_status_code(400)
        user_id = user.id

        tick = sess.query(Ticket).filter_by(id=ticket_id).first()
        if tick is None:
            return produce_status_code(400)

        try:
            st = int(stat)
            nt = int(note_type)
            note = Note(poster_id=user_id, ticket_id=ticket_id, message=msg, status=stat,
                type=note_type, createdAt=datetime.date.today(), updatedAt=datetime.date.today())
            sess.add(note)
        except:
            return produce_status_code(400)
        try:
            sess.commit()
            return produce_status_code(200)
        except exc.SQLAlchemyError:
            return produce_status_code(503)
    except:
        abort(500)

