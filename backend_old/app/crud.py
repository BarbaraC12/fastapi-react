from sqlalchemy.orm import Session
from . import models, schemas

# #Application CRUD functions
def get_application(db: Session, application_id: int):
    return db.query(models.Application).filter(models.Application.id == application_id).first()

def get_applications(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Application).offset(skip).limit(limit).all()

def create_application(db: Session, application: schemas.ApplicationCreate):
    db_application = models.Application(**application.dict())
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application

# # User CRUD functions
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# # Change CRUD functions
def get_change(db: Session, change_id: int):
    return db.query(models.Change).filter(models.Change.id == change_id).first()

def get_changes(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Change).offset(skip).limit(limit).all()

def create_change(db: Session, change: schemas.ChangeCreate):
    db_change = models.Change(**change.dict())
    db.add(db_change)
    db.commit()
    db.refresh(db_change)
    return db_change
