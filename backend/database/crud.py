from . import tables
from sqlalchemy.orm import Session

# CRUD operations for mentor table creating a mentor
def mentor_create(db: Session, mentor: tables.Mentor):
    db_mentor = tables.Mentor(name=mentor.name, phone_num=mentor.phone_num, ssn=mentor.ssn, username=mentor.username, password=mentor.password, screened=mentor.screened)
    db.add(db_mentor)
    db.commit()
    db.refresh(db_mentor)
    return mentor

# CRUD operations for mentor table getting all mentors
def mentor_get_all(db: Session):
    return db.query(tables.Mentor).all()

# CRUD operations for mentor table getting one mentor
def mentor_get_one(db: Session, mentor_id: int):
    return db.query(tables.Mentor).filter(tables.Mentor.id == mentor_id).one()

# CRUD operations for mentor table updating a mentor
def mentor_update(db: Session, mentor_id: int, mentor: tables.Mentor):
    update_query = {tables.Mentor.name: mentor.name, tables.Mentor.phone_num: mentor.phone_num, tables.Mentor.ssn: mentor.ssn, tables.Mentor.username: mentor.username, tables.Mentor.password: mentor.password, tables.Mentor.screened: mentor.screened}
    db.query(tables.Mentor).filter(tables.Mentor.id == mentor.id).update(update_query)
    db.commit()
    return db.query(tables.Mentor).filter(tables.Mentor.id == mentor.id).one()

# CRUD operations for mentor table deleting a mentor
def mentor_delete(db: Session, mentor_id: int):
    mentor = db.query(tables.Mentor).filter(tables.Mentor.id == mentor_id).first()
    if not mentor:
        return None
    db.delete(mentor)
    db.commit()
    return mentor

# CRUD operations for admin table creating an admin
def admin_create(db: Session, admin: tables.Admin):
    db_admin = tables.Admin(name=admin.name, phone_num=admin.phone_num, email_id=admin.email_id, username=admin.username, password=admin.password)
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return admin

# CRUD operations for admin table getting all admins
def admin_get_all(db: Session):
    return db.query(tables.Admin).all()

# CRUD operations for admin table getting one admin
def admin_get_one(db: Session, admin_id: int):
    return db.query(tables.Admin).filter(tables.Admin.id == admin_id).one()

# CRUD operations for admin table updating an admin
def admin_update(db: Session, admin_id: int, admin: tables.Admin):
    update_query = {tables.Admin.name: admin.name, tables.Admin.phone_num: admin.phone_num, tables.Admin.email_id: admin.email_id, tables.Admin.username: admin.username, tables.Admin.password: admin.password}
    db.query(tables.Admin).filter(tables.Admin.id == admin.id).update(update_query)
    db.commit()
    return db.query(tables.Admin).filter(tables.Admin.id == admin.id).one()

# CRUD operations for admin table deleting an admin
def admin_delete(db: Session, admin_id: int):
    admin = db.query(tables.Admin).filter(tables.Admin.id == admin_id).first()
    if not admin:
        return None
    db.delete(admin)
    db.commit()
    return admin

# CRUD operations for chat table creating a chat
def chat_create(db: Session, chat: tables.Chat):
    db_chat = tables.Chat(chat_id=chat.chat_id, mentor_id=chat.mentor_id, mentee_id=chat.mentee_id)
    db.add(db_chat)
    db.commit()
    db.refresh(db_chat)
    return chat

# CRUD operations for chat table getting all chats
def chat_get_all(db: Session):
    return db.query(tables.Chat).all()

# CRUD operations for chat table getting one chat
def chat_get_one(db: Session, chat_id: int):
    return db.query(tables.Chat).filter(tables.Chat.chat_id == chat_id).one()

# CRUD operations for chat table updating a chat
def chat_update(db: Session, chat_id: int, chat: tables.Chat):
    update_query = {tables.Chat.chat_id: chat.chat_id, tables.Chat.mentor_id: chat.mentor_id, tables.Chat.mentee_id: chat.mentee_id}
    db.query(tables.Chat).filter(tables.Chat.chat_id == chat.chat_id).update(update_query)
    db.commit()
    return db.query(tables.Chat).filter(tables.Chat.chat_id == chat.chat_id).one()

# CRUD operations for chat table deleting a chat
def chat_delete(db: Session, chat_id: int):
    chat = db.query(tables.Chat).filter(tables.Chat.chat_id == chat_id).first()
    if not chat:
        return None
    db.delete(chat)
    db.commit()
    return chat

# Create new emergency instance with input attributes
def emergency_create(db: Session, emergency: tables.Emergency):
    db_emergency = tables.Emergency(name=emergency.name, caller_phone_num=emergency.caller_phone_num, staff_phone_num=emergency.staff_phone_num, message=emergency.message)
    db.add(db_emergency)
    db.commit()
    db.refresh(db_emergency)
    return emergency

# Return all emergencies from table 
def emergency_get_all(db: Session):
    return db.query(tables.Emergency).all()

# Return specific emergency from searched ID
def emergency_get_one(db: Session, emergency_id: int):
    return db.query(tables.Emergency).filter(tables.Emergency.id == emergency_id).one()

# Return updated emergency, searched by emergency ID
def emergency_update(db: Session, emergency_id: int, emergency: tables.Emergency):
    update_query = {tables.Emergency.name: emergency.name, tables.Emergency.caller_phone_num: emergency.caller_phone_num, tables.Emergency.staff_phone_num: emergency.staff_phone_num, tables.Emergency.message: emergency.message}
    db.query(tables.Emergency).filter(tables.Emergency.id == emergency.id).update(update_query)
    db.commit()
    return db.query(tables.Emergency).filter(tables.Emergency.id == emergency.id).one()

# Deletes emergency searched by emergency ID
def emergency_delete(db: Session, emergency_id: int):
    emergency = db.query(tables.Emergency).filter(tables.Emergency.id == emergency_id).first()
    if not emergency:
        return None
    db.delete(emergency)
    db.commit()
    return emergency

# Create mentee with inputed attributes
def mentee_create(db: Session, mentee: tables.Mentee):
    db_mentee = tables.Mentee(name=mentee.name, mentored=mentee.mentored, sheltered=mentee.sheltered, email=mentee.email, age=mentee.age, username=mentee.username, password=mentee.password, screened=mentee.screened)
    db.add(db_mentee)
    db.commit()
    db.refresh(db_mentee)
    return mentee

# Return all mentees
def mentee_get_all(db: Session):
    return db.query(tables.Mentee).all()

# Return mentee searched by specific ID
def mentee_get_one(db: Session, mentee_id: int):
    return db.query(tables.Mentee).filter(tables.Mentee.id == mentee_id).one()

# Update mentee by input attributes
def mentee_update(db: Session, mentee_id: int, mentee: tables.Mentee):
    update_query = {tables.Mentee.name: mentee.name, tables.Mentee.mentored: mentee.mentored, tables.Mentee.sheltered: mentee.sheltered, tables.Mentee.email: mentee.email, tables.Mentee.age:
                    mentee.age, tables.Mentee.username: mentee.username, tables.Mentee.password: mentee.password, tables.Mentee.screened: mentee.screened}
    db.query(tables.Mentee).filter(tables.Mentee.id == mentee.id).update(update_query)
    db.commit()
    return db.query(tables.Mentee).filter(tables.Mentee.id == mentee.id).one()

# Delete mentee searched by mentee ID
def mentee_delete(db: Session, mentee_id: int):
    mentee = db.query(tables.Mentee).filter(tables.Mentee.id == mentee_id).first()
    if not mentee:
        return None
    db.delete(mentee)
    db.commit()
    return mentee

# CRUD operations for email table creating an email
def email_create(db: Session, email: tables.Email):
    db_email = tables.Email(emailID=email.emailID, subject=email.subject, message=email.message)
    db.add(db_email)
    db.commit()
    db.refresh(db_email)
    return email

# CRUD operations for email table getting all emails
def email_get_all(db: Session):
    return db.query(tables.Email).all()

# CRUD operations for email table getting one email
def email_get_one(db: Session, email_id: int):
    return db.query(tables.Email).filter(tables.Email.emailID == email_id).one()

# CRUD operations for email table updating an email
def email_update(db: Session, email_id: int, email: tables.Email):
    update_query = {tables.Email.emailID: email.emailID, tables.Email.subject: email.subject, tables.Email.message: email.message}
    db.query(tables.Email).filter(tables.Email.emailID == email.emailID).update(update_query)
    db.commit()
    return db.query(tables.Email).filter(tables.Email.emailID == email.emailID).one()

# CRUD operations for email table deleting an email
def email_delete(db: Session, email_id: int):
    email = db.query(tables.Email).filter(tables.Email.emailID == email_id).first()
    if not email:
        return None
    db.delete(email)
    db.commit()
    return email


# CRUD operations for notification table creating a notification
def notification_create(db: Session, notification: tables.Notification):
    db_notification = tables.Notification(notification_id=notification.notification_id, message=notification.message)
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return notification

# CRUD operations for notification table getting all notifications
def notification_get_all(db: Session):
    return db.query(tables.Notification).all()

# CRUD operations for notification table getting one notification
def notification_get_one(db: Session, notification_id: int):
    return db.query(tables.Notification).filter(tables.Notification.notification_id == notification_id).one()

# CRUD operations for notification table updating a notification
def notification_update(db: Session, notification_id: int, notification: tables.Notification):
    update_query = {tables.Notification.notification_id: notification.notification_id, tables.Notification.message: notification.message}
    db.query(tables.Notification).filter(tables.Notification.notification_id == notification.notification_id).update(update_query)
    db.commit()
    return db.query(tables.Notification).filter(tables.Notification.notification_id == notification.notification_id).one()

# CRUD operations for notification table deleting a notification
def notification_delete(db: Session, notification_id: int):
    notification = db.query(tables.Notification).filter(tables.Notification.notification_id == notification_id).first()
    if not notification:
        return None
    db.delete(notification)
    db.commit()
    return notification


# CRUD operations for bulletin table creating a bulletin
def bulletin_create(db: Session, bulletin: tables.Bulletin):
    db_bulletin = tables.Bulletin(id=bulletin.id, message=bulletin.message, img_src=bulletin.img_src, link=bulletin.link)
    db.add(db_bulletin)
    db.commit()
    db.refresh(db_bulletin)
    return bulletin

# CRUD operations for bulletin table getting all bulletins
def bulletin_get_all(db: Session):
    return db.query(tables.Bulletin).all()

# CRUD operations for bulletin table getting one bulletin
def bulletin_get_one(db: Session, id: int):
    return db.query(tables.Bulletin).filter(tables.Bulletin.id == id).one()

# CRUD operations for bulletin table updating a bulletin
def bulletin_update(db: Session, id: int, bulletin: tables.Bulletin):
    update_query = {tables.Bulletin.id: bulletin.id, tables.Bulletin.message: bulletin.message, tables.Bulletin.img_src: bulletin.img_src, tables.Bulletin.link: bulletin.link}
    db.query(tables.Bulletin).filter(tables.Bulletin.id == bulletin.id).update(update_query)
    db.commit()
    return db.query(tables.Bulletin).filter(tables.Bulletin.id == bulletin.id).one()

# CRUD operations for bulletin table deleting a bulletin
def bulletin_delete(db: Session, id: int):
    bulletin = db.query(tables.Bulletin).filter(tables.Bulletin.id == id).first()
    if not bulletin:
        return None
    db.delete(bulletin)
    db.commit()
    return bulletin

# CRUD operations to get mentees by mentor
def mentees_by_mentor(db: Session, mentor_id: int):
    chats = db.query(tables.Chat).filter(tables.Chat.mentorID == mentor_id).all()
    if not chats:
        return []
    menteeIDs = [chat.menteeID for chat in chats]
    mentees = []
    for menteeID in menteeIDs:
        mentees.append(db.query(tables.Mentee).filter(tables.Menteee.id == menteeID).first())
    return mentees

# CRUD operations to get mentors by mentee
def mentors_by_menteee(db: Session, mentee_id: int):
    chats = db.query(tables.Chat).filter(tables.Chat.menteeID == mentee_id).all()
    if not chats:
        return []
    mentorIDs = [chat.mentorID for chat in chats]
    mentors = []
    for mentorID in mentorIDs:
        mentors.append(db.query(tables.Mentor).filter(tables.Mentor.id == mentorID).first())
    return mentors
        
# CRUD operations for mentor table getting a mentor by username
def mentor_get_by_username(db: Session, username: str):
    return db.query(tables.Mentor).filter(tables.Mentor.username == username).first()

# CRUD operations for mentee table getting a mentee by username
def mentee_get_by_username(db: Session, username: str):
    return db.query(tables.Mentee).filter(tables.Mentee.username == username).first()

# CRUD operations for admin table getting an admin by username
def admin_get_by_username(db: Session, username: str):
    return db.query(tables.Admin).filter(tables.Admin.username == username).first()