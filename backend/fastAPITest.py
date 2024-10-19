from fastapi import FastAPI
from database import crud
from database.connections import get_db
from sqlalchemy.orm import Session
from fastapi import Depends
from database.models import Mentor, Mentee, Chat, Admin, Emergency, Notification, Bulletin

app = FastAPI()

@app.post('/mentors')
async def create_mentor(mentor: Mentor, db: Session = Depends(get_db)):
    return crud.mentor_create(db=db, mentor=mentor)

@app.get('/mentors')
async def get_mentor(db: Session = Depends(get_db)):
    return crud.mentor_get_all(db=db)

@app.get('/mentors/{mentor_id}')
async def get_monter_by_id(mentor_id: int, db: Session = Depends(get_db)):
    return crud.mentor_get_one(db=db, mentor_id=mentor_id)

@app.post('/mentees')
async def create_mentee(mentee: Mentee, db: Session = Depends(get_db)):
    return crud.mentee_create(db=db, mentee=mentee)

@app.get('/mentees')
async def get_mentees(db: Session = Depends(get_db)):
    return crud.mentee_get_all(db=db)

@app.get('/mentees/{mentee_id}')
async def get_mentee_by_id(mentee_id: int, db: Session = Depends(get_db)):
    return crud.mentee_get_one(db=db, mentee_id=mentee_id)

@app.post('/admin')
async def create_admin(admin: Admin, db: Session = Depends(get_db)):
    return crud.admin_create(db=db, admin=admin)

@app.get('/admin')
async def get_admins(db: Session = Depends(get_db)):
    return crud.admin_get_all(db=db)

@app.get('/admin/{admin_id}')
async def get_admin_by_id(admin_id: int, db: Session = Depends(get_db)):
    return crud.admin_get_one(db=db, admin_id=admin_id)

@app.get('/chat')
async def get_chats(db: Session = Depends(get_db)):
    return crud.chat_get_all(db=db)

@app.get('/chat/{chat_id}')
async def get_chat_by_id(chat_id: int, db: Session = Depends(get_db)):
    return crud.chat_get_one(db=db, chat_id=chat_id)

@app.get('/email')
async def get_email(email: str, db: Session = Depends(get_db)):
    return crud.get_email(db=db, email=email)

@app.get('/email/{email}')
async def get_email_by_id(email: str, db: Session = Depends(get_db)):
    return crud.get_email_by_id(db=db, email=email)

@app.post('/email')
async def create_email(email: str, db: Session = Depends(get_db)):
    return crud.create_email(db=db, email=email)

@app.post('/emergency')
async def create_emergency(emergency: Emergency, db: Session = Depends(get_db)):
   return crud.emergency_create(db=db, emergency=emergency)


@app.get('/emergency')
async def get_emergencies(db: Session = Depends(get_db)):
   return crud.emergency_get_all(db= db)


@app.get('/emergency{emergency_id}')
async def get_emergency_by_id(emergency_id: int, db: Session = Depends(get_db)):
   return crud.emergency_get_one(db=db, emergency_id=emergency_id)

@app.post('/chat')
async def create_chat(chat: Chat, db: Session = Depends(get_db)):
    return crud.chat_create(db=db, chat=chat)

@app.post('/notifications')
async def create_notification(notification: Notification, db: Session = Depends(get_db)):
    return crud.notification_create(db=db, notification=notification)

@app.get('/notifications')
async def get_notifications(db: Session = Depends(get_db)):
    return crud.notification_get_all(db=db)

@app.get('/notifications/{notification_id}')
async def get_notification_by_id(notification_id: int, db: Session = Depends(get_db)):
    return crud.notification_get_one(db=db, notification_id=notification_id)

@app.get('/mentors/byusername/{username}')
async def get_mentors_by_username(username: str, db: Session = Depends(get_db)):
    return crud.mentor_get_by_username(db=db, username=username)

@app.get('/mentees/byusername/{username}')
async def get_mentees_by_username(username: str, db: Session = Depends(get_db)):
    return crud.mentee_get_by_username(db=db, username=username)

@app.get('/admins/byusername/{username}')
async def get_admins_by_username(username: str, db: Session = Depends(get_db)):
    return crud.admin_get_by_username(db=db, username=username)

@app.get('/bulletin')
async def get_bulletin(db: Session = Depends(get_db)):
    return crud.get_bulletin(db=db)

@app.post('/bulletin')
async def create_bulletin(bulletin: Bulletin, db: Session = Depends(get_db)):
    return crud.create_bulletin(db=db, bulletin=bulletin)

@app.delete('/bulletin/{bulletin_id}')
async def delete_bulletin(bulletin_id: int, db: Session = Depends(get_db)):
    return crud.delete_bulletin(db=db, bulletin_id=bulletin_id)
