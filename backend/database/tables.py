from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Table
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

class Mentor(Base):
    __tablename__ = 'mentors'
    id = Column(Integer, primary_key=True)
    name = Column(String)

    chats = relationship(
        'Chat',
        secondary=mentor_chat_association,
        back_populates='mentors'
    )

class Mentee(Base):
    __tablename__ = 'mentees'
    id = Column(Integer, primary_key=True)
    name = Column(String)

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

