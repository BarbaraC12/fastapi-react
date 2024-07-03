from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/applications",
    tags=["applications"],
    responses={404: {"description": "Not found"}},
)


@router.post("/", response_model=schemas.Application)
def create_application(
    application: schemas.ApplicationCreate, db: Session = Depends(get_db)
):
    return crud.create_application(db=db, application=application)


@router.get("/", response_model=list[schemas.Application])
def read_applications(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    applications = crud.get_applications(db, skip=skip, limit=limit)
    return applications


@router.get("/{application_id}", response_model=schemas.Application)
def read_application(application_id: int, db: Session = Depends(get_db)):
    db_application = crud.get_application(db, application_id=application_id)
    if db_application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return db_application
