from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import crud, models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/changes",
    tags=["changes"],
    responses={404: {"description": "Not found"}},
)


@router.post("/", response_model=schemas.Change)
def create_change(change: schemas.ChangeCreate, db: Session = Depends(get_db)):
    return crud.create_change(db=db, change=change)


@router.get("/", response_model=list[schemas.Change])
def read_changes(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    changes = crud.get_changes(db, skip=skip, limit=limit)
    return changes


@router.get("/{change_id}", response_model=schemas.Change)
def read_change(change_id: int, db: Session = Depends(get_db)):
    db_change = crud.get_change(db, change_id=change_id)
    if db_change is None:
        raise HTTPException(status_code=404, detail="Change not found")
    return db_change
