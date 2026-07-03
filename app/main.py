from fastapi import Depends, FastAPI
from sqlalchemy import text

from app.db.session import engine
from app.features.auth.router import router as auth_router

app = FastAPI(
    title="LeaseFlow API",
    version="1.0.0",
)

app.include_router(auth_router)


@app.get("/")
def root():
    return {
        "message": "Welcome to LeaseFlow API"
    }


@app.get("/health")
def health_check():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "status": "success",
        "database": "Connected"
    }
from app.features.auth.dependencies import require_roles


@app.get("/admin")
def admin_only(
    current_user=Depends(require_roles("admin")),
):
    return {
        "message": "Welcome Admin"
    }