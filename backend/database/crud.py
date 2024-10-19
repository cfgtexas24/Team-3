import tables
from sqlalchemy.orm import Session


def mentor_create(db: Session, mentor: tables.Mentor):
    db_mentor = tables.Mentor(name=mentor.name, phone_num=mentor.phone_num, ssn=mentor.ssn, username=mentor.username, password=mentor.password, screened=mentor.screened)
    db.add(db_mentor)
    db.commit()
    db.refresh(db_mentor)
    return mentor

def mentor_get_all(db: Session):
    return db.query(tables.Mentor).all()

def mentor_get_one(db: Session, mentor_id: int):
    return db.query(tables.Mentor).filter(tables.Mentor.id == mentor_id).one()

def mentor_update(db: Session, mentor_id: int, mentor: tables.Mentor):
    update_query = {tables.Mentor.name: mentor.name, tables.Mentor.phone_num: mentor.phone_num, tables.Mentor.ssn: mentor.ssn, tables.Mentor.username: mentor.username, tables.Mentor.password: mentor.password, tables.Mentor.screened: mentor.screened}
    db.query(tables.Mentor).filter(tables.Mentor.id == mentor.id).update(update_query)
    db.commit()
    return db.query(tables.Mentor).filter(tables.Mentor.id == mentor.id).one()

def mentor_delete(db: Session, mentor_id: int):
    mentor = db.query(tables.Mentor).filter(tables.Mentor.id == mentor_id).first()
    if not mentor:
        return None
    db.delete(mentor)
    db.commit()
    return mentor


def admin_create(db: Session, admin: tables.Admin):
    db_admin = tables.Admin(name=admin.name, phone_num=admin.phone_num, email_id=admin.email_id, username=admin.username, password=admin.password)
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return admin

def admin_get_all(db: Session):
    return db.query(tables.Admin).all()

def admin_get_one(db: Session, admin_id: int):
    return db.query(tables.Admin).filter(tables.Admin.id == admin_id).one()

def admin_update(db: Session, admin_id: int, admin: tables.Admin):
    update_query = {tables.Admin.name: admin.name, tables.Admin.phone_num: admin.phone_num, tables.Admin.email_id: admin.email_id, tables.Admin.username: admin.username, tables.Admin.password: admin.password}
    db.query(tables.Admin).filter(tables.Admin.id == admin.id).update(update_query)
    db.commit()
    return db.query(tables.Admin).filter(tables.Admin.id == admin.id).one()

def admin_delete(db: Session, admin_id: int):
    admin = db.query(tables.Admin).filter(tables.Admin.id == admin_id).first()
    if not admin:
        return None
    db.delete(admin)
    db.commit()
    return admin

def chat_create(db: Session, chat: tables.Chat):
    db_chat = tables.Chat(chat_id=chat.chat_id, mentor_id=chat.mentor_id, mentee_id=chat.mentee_id)
    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)
    return chat

def chat_get_all(db: Session):
    return db.query(tables.Chat).all()

def chat_get_one(db: Session, chat_id: int):
    return db.query(tables.Chat).filter(tables.Chat.chat_id == chat_id).one()

def chat_update(db: Session, chat_id: int, chat: tables.Chat):
    update_query = {tables.Chat.chat_id: chat.chat_id, tables.Chat.mentor_id: chat.mentor_id, tables.Chat.mentee_id: chat.mentee_id}
    db.query(tables.Chat).filter(tables.Chat.chat_id == chat.chat_id).update(update_query)
    db.commit()
    return db.query(tables.Chat).filter(tables.Chat.chat_id == chat.chat_id).one()

def chat_delete(db: Session, chat_id: int):
    chat = db.query(tables.Chat).filter(tables.Chat.chat_id == chat_id).first()
    if not chat:
        return None
    db.delete(chat)
    db.commit()
    return chat

def emergency_create(db: Session, emergency: tables.Emergency):
    db_emergency = tables.Emergency(name=emergency.name, caller_phone_num=emergency.caller_phone_num, staff_phone_num=emergency.staff_phone_num, message=emergency.message)
    db.add(db_emergency)
    db.commit()
    db.refresh(db_emergency)
    return emergency


def emergency_get_all(db: Session):
    return db.query(tables.Emergency).all()


def emergency_get_one(db: Session, emergency_id: int):
    return db.query(tables.Emergency).filter(tables.Emergency.id == emergency_id).one()


def emergency_update(db: Session, emergency_id: int, emergency: tables.Emergency):
    update_query = {tables.Emergency.name: emergency.name, tables.Emergency.caller_phone_num: emergency.caller_phone_num, tables.Emergency.staff_phone_num: emergency.staff_phone_num, tables.Emergency.message: emergency.message}
    db.query(tables.Emergency).filter(tables.Emergency.id == emergency.id).update(update_query)
    db.commit()
    return db.query(tables.Emergency).filter(tables.Emergency.id == emergency.id).one()


def emergency_delete(db: Session, emergency_id: int):
    emergency = db.query(tables.Emergency).filter(tables.Emergency.id == emergency_id).first()
    if not emergency:
        return None
    db.delete(emergency)
    db.commit()
    return emergency


def mentee_create(db: Session, mentee: tables.Mentee):
    db_mentee = tables.Mentee(name=mentee.name, mentored=mentee.mentored, sheltered=mentee.sheltered, email=mentee.email, age=mentee.age, username=mentee.username, password=mentee.password, screened=mentee.screened)
    db.add(db_mentee)
    db.commit()
    db.refresh(db_mentee)
    return mentee


def mentee_get_all(db: Session):
    return db.query(tables.Mentee).all()


def mentee_get_one(db: Session, mentee_id: int):
    return db.query(tables.Mentee).filter(tables.Mentee.id == mentee_id).one()


def mentee_update(db: Session, mentee_id: int, mentee: tables.Mentee):
    update_query = {tables.Mentee.name: mentee.name, tables.Mentee.mentored: mentee.mentored, tables.Mentee.sheltered: mentee.sheltered, tables.Mentee.email: mentee.email, tables.Mentee.age:
                    mentee.age, tables.Mentee.username: mentee.username, tables.Mentee.password: mentee.password, tables.Mentee.screened: mentee.screened}
    db.query(tables.Mentee).filter(tables.Mentee.id == mentee.id).update(update_query)
    db.commit()
    return db.query(tables.Mentee).filter(tables.Mentee.id == mentee.id).one()


def mentee_delete(db: Session, mentee_id: int):
    mentee = db.query(tables.Mentee).filter(tables.Mentee.id == mentee_id).first()
    if not mentee:
        return None
    db.delete(mentee)
    db.commit()
    return mentee
