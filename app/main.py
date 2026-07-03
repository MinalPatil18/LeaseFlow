from fastapi import FastAPI
from sqlalchemy import text

from app.db.session import engine

app = FastAPI(
    title="LeaseFlow API",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "message": "Welcome to LeaseFlow API"
    }


@app.get("/health")
def health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
        return {
            "status": "success",
            "database": "Connected"
        }
    except Exception as e:
        return {
            "status": "error",
            "database": str(e)
        }