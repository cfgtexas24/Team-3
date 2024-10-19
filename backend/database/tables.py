from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Table, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship


Base = declarative_base()

mentor_chat_association = Table(
    'mentor_chat', Base.metadata,
    Column('mentor_id', Integer, ForeignKey('mentors.id'), primary_key=True),
    Column('chat_id', Integer, ForeignKey('chats.id'), primary_key=True)
)

mentee_chat_association = Table(
    'mentee_chat', Base.metadata,
    Column('mentee_id', Integer, ForeignKey('mentees.id'), primary_key=True),
    Column('chat_id', Integer, ForeignKey('chats.id'), primary_key=True)
)

mentor_email_association = Table(
    'mentor_email', Base.metadata,
    Column('mentor_id', Integer, ForeignKey('mentors.id'), primary_key=True),
    Column('emailID', String, ForeignKey('emails.emailID'), primary_key=True)
)

class Mentor(Base):
    __tablename__ = 'mentors'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    phone_num = Column(Integer)
    ssn = Column(Integer)
    username = Column(String, unique = True)
    password = Column(String, unique = True)
    screened = Column(Boolean) 
    email = relationship(
        'Email',
        secondary = mentor_email_association,
        back_populates='mentors'
    )
    chats = relationship(
        'Chat',
        secondary=mentor_chat_association,
        back_populates='mentors'
    )


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
    password = Column(String, unique=True)
    screened = Column(Boolean)

    chats = relationship(
        'Chat',
        secondary=mentee_chat_association,
        back_populates='mentees'
    )

class Chat(Base):
    __tablename__ = 'chats'
    id = Column(Integer, primary_key=True)
    topic = Column(String)

    mentors = relationship(
        'Mentor',
        secondary=mentor_chat_association,
        back_populates='chats'
    )

    mentees = relationship(
        'Mentee',
        secondary=mentee_chat_association,
        back_populates='chats'
    )

class Email(Base):
    __tablename__ = 'emails'
    emailID = Column(String, primary_key=True)
    
    user_id = relationship(
        'Mentor',
        secondary=mentor_email_association,
        backpopulates='email'
    )

