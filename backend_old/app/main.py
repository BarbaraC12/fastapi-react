from fastapi import FastAPI
from .routers import applications, users, changes
from .database import engine
from .models import Base

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(applications.router)
app.include_router(users.router)
app.include_router(changes.router)
