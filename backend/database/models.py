from pydantic import BaseModel

#model for mentor
class Mentor(BaseModel):
    id: int
    name: str
    phone_num: int
    ssn: int
    username: str
    password: str
    screened: bool
    email: str
    chats: str

    class Config:
        orm_mode = True

#model for admin
class Admin(BaseModel):
    id: int
    name: str
    phone_num: int
    email_id: str
    username: str
    password: str
    email: str
    notifications_id: int

    class Config:
        orm_mode = True

#model for chat
class Emergency(BaseModel):
    id: int
    name: str
    caller_phone_num: int
    staff_phone_num: int
    message: str

    class Config:
        orm_mode = True

#model for chat
class Mentee(BaseModel):
    id: int
    name: str
    mentored: bool
    sheltered: bool
    email: str
    age: int
    username: str
    password: str
    screened: bool
    chats: str

    class Config:
        orm_mode = True
