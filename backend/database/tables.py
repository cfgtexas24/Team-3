from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Table, Boolean
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from database.connections import engine, Base

# Initializing all relationships in schema
mentor_chat_association = Table(
    'mentor_chat', Base.metadata,
    Column('mentor_id', Integer, ForeignKey('mentors.id'), primary_key=True),
    Column('chat_id', Integer, ForeignKey('chats.chat_id'), primary_key=True)  # Corrected ForeignKey reference
)

mentee_chat_association = Table(
    'mentee_chat', Base.metadata,
    Column('mentee_id', Integer, ForeignKey('mentees.id'), primary_key=True),
    Column('chat_id', Integer, ForeignKey('chats.chat_id'), primary_key=True)  # Corrected ForeignKey reference
)

mentor_email_association = Table(
    'mentor_email', Base.metadata,
    Column('mentor_id', Integer, ForeignKey('mentors.id'), primary_key=True),
    Column('emailID', String, ForeignKey('emails.emailID'), primary_key=True)
)

# Creating tables for database
class Admin(Base):
    __tablename__ = 'admins'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    phone_num = Column(Integer)
    email_id = Column(String, ForeignKey('emails.emailID'))
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    
    email = relationship('Email', back_populates='admins')
    notifications_id = Column(Integer, ForeignKey('notifications.id'))

class Mentor(Base):
    __tablename__ = 'mentors'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    phone_num = Column(Integer)
    ssn = Column(Integer)
    username = Column(String, unique=True)
    password = Column(String)
    screened = Column(Boolean) 
    
    chats = relationship('Chat', back_populates='mentor_rel') 
    emails = relationship('Email', secondary=mentor_email_association)  # Added relationship for emails

class Emergency(Base):
    __tablename__ = 'emergency'
    id = Column(Integer, primary_key= True)
    name = Column(String)
    caller_phone_num = Column(Integer)
    staff_phone_num = Column(Integer)
    message = Column(String)

class Mentee(Base):
    __tablename__ = 'mentees'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    mentored = Column(Boolean)
    sheltered = Column(Boolean)
    email = Column(String)
    age = Column(Integer)
    username = Column(String, unique=True)
    password = Column(String)
    screened = Column(Boolean)

    chats = relationship('Chat', back_populates='mentee_rel')  

class Chat(Base):
    __tablename__ = 'chats'
    
    chat_id = Column(Integer, primary_key=True)  
    menteeID = Column(Integer, ForeignKey('mentees.id'), nullable=False) 
    mentorID = Column(Integer, ForeignKey('mentors.id'), nullable=False) 
    chat_log = Column(JSONB, nullable=False)  

    mentee_rel = relationship('Mentee', back_populates='chats')  
    mentor_rel = relationship('Mentor', back_populates='chats') 

class Email(Base):
    __tablename__ = 'emails'
    
    emailID = Column(String, primary_key=True)
    admins = relationship('Admin', back_populates='email')

class Notification(Base):
    __tablename__ = 'notifications'
    id = Column(Integer, primary_key=True)
    message = Column(String)


Base.metadata.create_all(engine)
