from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, Date, String

Base = declarative_base()

class Ticket(Base):
    __tablename__ = 'Tickets'
    id = Column(Integer, primary_key=True)
    status = Column(Integer)
    createdAt = Column(Date, nullable=False)
    updatedAt = Column(Date, nullable=False)

class Note(Base):
    __tablename__ = 'Notes'
    id = Column(Integer, primary_key=True)
    poster_id = Column(Integer)
    ticket_id = Column(Integer)
    message = Column(String(255))
    status = Column(Integer)
    type = Column(Integer)
    createdAt = Column(Date, nullable=False)
    updatedAt = Column(Date, nullable=False)

class Ownership(Base):
    __tablename__ = 'Ownerships'
    id = Column(Integer, primary_key=True)
    owner_id = Column(Integer)
    ticket_id = Column(Integer)
    createdAt = Column(Date, nullable=False)
    updatedAt = Column(Date, nullable=False)

class User(Base):
    __tablename__ = 'Users'
    id = Column(Integer, primary_key=True)
    username = Column(String(255))
    password = Column(String(255))
    createdAt = Column(Date, nullable=False)
    updatedAt = Column(Date, nullable=False)

