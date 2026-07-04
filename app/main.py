from fastapi import Depends, FastAPI
from sqlalchemy import text
from app.features.property.router import router as property_router
from app.db.session import engine
from app.features.auth.router import router as auth_router
from app.features.flats.router import router as flat_router
from app.features.tenant.router import router as tenant_router
from app.features.lease.router import router as lease_router
from app.features.payment.router import router as payment_router
from app.features.dashboard.router import router as dashboard_router

app = FastAPI(
    title="LeaseFlow API",
    version="1.0.0",
)

app.include_router(auth_router)

app.include_router(property_router)
app.include_router(flat_router)
app.include_router(tenant_router)
app.include_router(lease_router)
app.include_router(payment_router)
app.include_router(dashboard_router)

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