from fastapi import FastAPI
from database import crud
from database.connections import get_db
from sqlalchemy.orm import Session
from fastapi import Depends
from database.models import Mentor

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

@app.get('/mentees')
async def get_mentees(db: Session = Depends(get_db)):
    return crud.mentee_get_all(db=db)

@app.get('/mentees/{mentee_id}')
async def get_mentee_by_id(mentee_id: int, db: Session = Depends(get_db)):
    return crud.mentee_get_one(db=db, mentee_id=mentee_id)

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