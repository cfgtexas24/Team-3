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
