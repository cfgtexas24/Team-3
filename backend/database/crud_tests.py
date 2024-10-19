import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from . import tables, crud


@pytest.fixture(scope='module')
def db_session():
    engine = create_engine('sqlite:///:memory:')
    tables.Base.metadata.create_all(bind=engine)
    Session = sessionmaker(bind=engine)
    session = Session()

    yield session

    session.close()
    tables.Base.metadata.drop_all(bind=engine)

def test_mentor_create(db_session):
    mentor = tables.Mentor(
        name="Test Mentor", 
        phone_num="1234567890", 
        ssn="987654321", 
        username="test_mentor", 
        password="password", 
        screened=True
    )
    
    created_mentor = crud.mentor_create(db_session, mentor)
    
    assert created_mentor.name == "Test Mentor"
    assert created_mentor.phone_num == "1234567890"

def test_mentor_get_all(db_session):
    mentor1 = tables.Mentor(
        name="Mentor One", 
        phone_num="1111111111", 
        ssn="111111111", 
        username="mentor_one", 
        password="password1", 
        screened=True
    )
    mentor2 = tables.Mentor(
        name="Mentor Two", 
        phone_num="2222222222", 
        ssn="222222222", 
        username="mentor_two", 
        password="password2", 
        screened=False
    )

    db_session.add(mentor1)
    db_session.add(mentor2)
    db_session.commit()

    mentors = crud.mentor_get_all(db_session)
    assert len(mentors) == 2

def test_mentor_get_one(db_session):
    mentor = tables.Mentor(
        name="Mentor One", 
        phone_num="1111111111", 
        ssn="111111111", 
        username="mentor_one", 
        password="password1", 
        screened=True
    )

    db_session.add(mentor)
    db_session.commit()

    fetched_mentor = crud.mentor_get_one(db_session, mentor.id)
    assert fetched_mentor.name == "Mentor One"

def test_mentor_update(db_session):
    mentor = tables.Mentor(
        name="Mentor One", 
        phone_num="1111111111", 
        ssn="111111111", 
        username="mentor_one", 
        password="password1", 
        screened=True
    )

    db_session.add(mentor)
    db_session.commit()

   
    updated_mentor_data = tables.Mentor(
        name="Updated Mentor", 
        phone_num="9999999999", 
        ssn="111111111", 
        username="updated_mentor", 
        password="new_password", 
        screened=False
    )

    updated_mentor = crud.mentor_update(db_session, mentor.id, updated_mentor_data)
    
    assert updated_mentor.name == "Updated Mentor"
    assert updated_mentor.phone_num == "9999999999"


def test_mentor_delete(db_session):
    mentor = tables.Mentor(
        name="Mentor to Delete", 
        phone_num="4444444444", 
        ssn="444444444", 
        username="delete_me", 
        password="password", 
        screened=True
    )

    db_session.add(mentor)
    db_session.commit()

    deleted_mentor = crud.mentor_delete(db_session, mentor.id)
    
    assert deleted_mentor is not None
    assert deleted_mentor.name == "Mentor to Delete"


def test_admin_create(db_session):
    admin = tables.Admin(
        name="Admin One", 
        phone_num="5555555555", 
        email_id="admin_one@example.com", 
        username="admin_one", 
        password="admin_password"
    )

    created_admin = crud.admin_create(db_session, admin)
    
    assert created_admin.name == "Admin One"
    assert created_admin.email_id == "admin_one@example.com"


def test_admin_get_one(db_session):
    admin = tables.Admin(
        name="Admin One", 
        phone_num="5555555555", 
        email_id="admin_one@example.com", 
        username="admin_one", 
        password="admin_password"
    )

    db_session.add(admin)
    db_session.commit()

    fetched_admin = crud.admin_get_one(db_session, admin.id)
    assert fetched_admin.name == "Admin One"

# Test for creating a chat
def test_chat_create(db_session):
    chat = tables.Chat(
        chat_id=1,
        mentor_id=1,
        mentee_id=1
    )

    created_chat = crud.chat_create(db_session, chat)
    
    assert created_chat.chat_id == 1
    assert created_chat.mentor_id == 1
    assert created_chat.mentee_id == 1

# Test for getting one chat
def test_chat_get_one(db_session):
    chat = tables.Chat(
        chat_id=1,
        mentor_id=1,
        mentee_id=1
    )

    db_session.add(chat)
    db_session.commit()

    fetched_chat = crud.chat_get_one(db_session, chat.chat_id)
    assert fetched_chat.chat_id == 1

# Test for updating a chat
def test_chat_update(db_session):
    chat = tables.Chat(
        chat_id=1,
        mentor_id=1,
        mentee_id=1
    )

    db_session.add(chat)
    db_session.commit()

    updated_chat_data = tables.Chat(
        chat_id=1,
        mentor_id=2,
        mentee_id=3
    )

    updated_chat = crud.chat_update(db_session, chat.chat_id, updated_chat_data)
    
    assert updated_chat.mentor_id == 2
    assert updated_chat.mentee_id == 3

# Test for deleting a chat
def test_chat_delete(db_session):
    chat = tables.Chat(
        chat_id=1,
        mentor_id=1,
        mentee_id=1
    )

    db_session.add(chat)
    db_session.commit()

    deleted_chat = crud.chat_delete(db_session, chat.chat_id)
    
    assert deleted_chat is not None
    assert deleted_chat.chat_id == 1

# Test for creating an emergency
def test_emergency_create(db_session):
    emergency = tables.Emergency(
        name="Fire",
        caller_phone_num="1234567890",
        staff_phone_num="0987654321",
        message="There is a fire"
    )

    created_emergency = crud.emergency_create(db_session, emergency)
    
    assert created_emergency.name == "Fire"
    assert created_emergency.message == "There is a fire"

# Test for getting one emergency
def test_emergency_get_one(db_session):
    emergency = tables.Emergency(
        name="Fire",
        caller_phone_num="1234567890",
        staff_phone_num="0987654321",
        message="There is a fire"
    )

    db_session.add(emergency)
    db_session.commit()

    fetched_emergency = crud.emergency_get_one(db_session, emergency.id)
    assert fetched_emergency.name == "Fire"

# Test for updating an emergency
def test_emergency_update(db_session):
    emergency = tables.Emergency(
        name="Fire",
        caller_phone_num="1234567890",
        staff_phone_num="0987654321",
        message="There is a fire"
    )

    db_session.add(emergency)
    db_session.commit()

    updated_emergency_data = tables.Emergency(
        name="Flood",
        caller_phone_num="5555555555",
        staff_phone_num="6666666666",
        message="There is a flood"
    )

    updated_emergency = crud.emergency_update(db_session, emergency.id, updated_emergency_data)
    
    assert updated_emergency.name == "Flood"
    assert updated_emergency.message == "There is a flood"

# Test for deleting an emergency
def test_emergency_delete(db_session):
    emergency = tables.Emergency(
        name="Fire",
        caller_phone_num="1234567890",
        staff_phone_num="0987654321",
        message="There is a fire"
    )

    db_session.add(emergency)
    db_session.commit()

    deleted_emergency = crud.emergency_delete(db_session, emergency.id)
    
    assert deleted_emergency is not None
    assert deleted_emergency.name == "Fire"

# Test for creating a mentee
def test_mentee_create(db_session):
    mentee = tables.Mentee(
        name="Mentee One",
        mentored=True,
        sheltered=True,
        email="mentee_one@example.com",
        age=20,
        username="mentee_one",
        password="password",
        screened=True
    )

    created_mentee = crud.mentee_create(db_session, mentee)
    
    assert created_mentee.name == "Mentee One"
    assert created_mentee.email == "mentee_one@example.com"

# Test for getting one mentee
def test_mentee_get_one(db_session):
    mentee = tables.Mentee(
        name="Mentee One",
        mentored=True,
        sheltered=True,
        email="mentee_one@example.com",
        age=20,
        username="mentee_one",
        password="password",
        screened=True
    )

    db_session.add(mentee)
    db_session.commit()

    fetched_mentee = crud.mentee_get_one(db_session, mentee.id)
    assert fetched_mentee.name == "Mentee One"

# Test for updating a mentee
def test_mentee_update(db_session):
    mentee = tables.Mentee(
        name="Mentee One",
        mentored=True,
        sheltered=True,
        email="mentee_one@example.com",
        age=20,
        username="mentee_one",
        password="password",
        screened=True
    )

    db_session.add(mentee)
    db_session.commit()

    updated_mentee_data = tables.Mentee(
        name="Mentee Updated",
        mentored=False,
        sheltered=False,
        email="mentee_updated@example.com",
        age=21,
        username="mentee_updated",
        password="new_password",
        screened=False
    )

    updated_mentee = crud.mentee_update(db_session, mentee.id, updated_mentee_data)
    
    assert updated_mentee.name == "Mentee Updated"
    assert updated_mentee.email == "mentee_updated@example.com"

# Test for deleting a mentee
def test_mentee_delete(db_session):
    mentee = tables.Mentee(
        name="Mentee One",
        mentored=True,
        sheltered=True,
        email="mentee_one@example.com",
        age=20,
        username="mentee_one",
        password="password",
        screened=True
    )

    db_session.add(mentee)
    db_session.commit()

    deleted_mentee = crud.mentee_delete(db_session, mentee.id)
    
    assert deleted_mentee is not None
    assert deleted_mentee.name == "Mentee One"

# Test for creating an email
def test_email_create(db_session):
    email = tables.Email(
        emailID="email_1",
        subject="Test Subject",
        message="Test Message"
    )

    created_email = crud.email_create(db_session, email)
    
    assert created_email.subject == "Test Subject"
    assert created_email.message == "Test Message"

# Test for getting one email
def test_email_get_one(db_session):
    email = tables.Email(
        emailID="email_1",
        subject="Test Subject",
        message="Test Message"
    )

    db_session.add(email)
    db_session.commit()

    fetched_email = crud.email_get_one(db_session, email.emailID)
    assert fetched_email.subject == "Test Subject"

# Test for updating an email
def test_email_update(db_session):
    email = tables.Email(
        emailID="email_1",
        subject="Test Subject",
        message="Test Message"
    )

    db_session.add(email)
    db_session.commit()

    updated_email_data = tables.Email(
        emailID="email_1",
        subject="Updated Subject",
        message="Updated Message"
    )

    updated_email = crud.email_update(db_session, email.emailID, updated_email_data)
    
    assert updated_email.subject == "Updated Subject"
    assert updated_email.message == "Updated Message"

# Test for deleting an email
def test_email_delete(db_session):
    email = tables.Email(
        emailID="email_1",
        subject="Test Subject",
        message="Test Message"
    )

    db_session.add(email)
    db_session.commit()

    deleted_email = crud.email_delete(db_session, email.emailID)
    
    assert deleted_email is not None
    assert deleted_email.subject == "Test Subject"

# Test for creating a notification
def test_notification_create(db_session):
    notification = tables.Notification(
        notification_id=1,
        message="Test Notification"
    )

    created_notification = crud.notification_create(db_session, notification)
    
    assert created_notification.notification_id == 1
    assert created_notification.message == "Test Notification"


def test_notification_get_one(db_session):
    notification = tables.Notification(
        notification_id=1,
        message="Test Notification"
    )

    db_session.add(notification)
    db_session.commit()

    fetched_notification = crud.notification_get_one(db_session, notification.notification_id)
    assert fetched_notification.message == "Test Notification"


def test_notification_update(db_session):
    notification = tables.Notification(
        notification_id=1,
        message="Test Notification"
    )

    db_session.add(notification)
    db_session.commit()

    updated_notification_data = tables.Notification(
        notification_id=1,
        message="Updated Notification"
    )

    updated_notification = crud.notification_update(db_session, notification.notification_id, updated_notification_data)
    
    assert updated_notification.message == "Updated Notification"


def test_notification_delete(db_session):
    notification = tables.Notification(
        notification_id=1,
        message="Test Notification"
    )

    db_session.add(notification)
    db_session.commit()

    deleted_notification = crud.notification_delete(db_session, notification.notification_id)
    
    assert deleted_notification is not None
    assert deleted_notification.message == "Test Notification"


def test_bulletin_create(db_session):
    bulletin = tables.Bulletin(
        id=1,
        message="Bulletin Message",
        img_src="http://example.com/image.jpg",
        link="http://example.com"
    )

    created_bulletin = crud.bulletin_create(db_session, bulletin)
    
    assert created_bulletin.message == "Bulletin Message"
    assert created_bulletin.img_src == "http://example.com/image.jpg"


def test_bulletin_get_one(db_session):
    bulletin = tables.Bulletin(
        id=1,
        message="Bulletin Message",
        img_src="http://example.com/image.jpg",
        link="http://example.com"
    )

    db_session.add(bulletin)
    db_session.commit()

    fetched_bulletin = crud.bulletin_get_one(db_session, bulletin.id)
    assert fetched_bulletin.message == "Bulletin Message"


def test_bulletin_update(db_session):
    bulletin = tables.Bulletin(
        id=1,
        message="Bulletin Message",
        img_src="http://example.com/image.jpg",
        link="http://example.com"
    )

    db_session.add(bulletin)
    db_session.commit()

    updated_bulletin_data = tables.Bulletin(
        id=1,
        message="Updated Bulletin Message",
        img_src="http://example.com/updated_image.jpg",
        link="http://updated_example.com"
    )

    updated_bulletin = crud.bulletin_update(db_session, bulletin.id, updated_bulletin_data)
    
    assert updated_bulletin.message == "Updated Bulletin Message"
    assert updated_bulletin.img_src == "http://example.com/updated_image.jpg"


def test_bulletin_delete(db_session):
    bulletin = tables.Bulletin(
        id=1,
        message="Bulletin Message",
        img_src="http://example.com/image.jpg",
        link="http://example.com"
    )

    db_session.add(bulletin)
    db_session.commit()

    deleted_bulletin = crud.bulletin_delete(db_session, bulletin.id)
    
    assert deleted_bulletin is not None
    assert deleted_bulletin.message == "Bulletin Message"



