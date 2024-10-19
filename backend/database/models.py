from pydantic import BaseModel

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


