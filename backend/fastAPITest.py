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