from fastapi import Depends, FastAPI
from sqlalchemy import text

from app.core.middleware import log_requests
from app.db.session import engine
from app.features.auth.dependencies import require_roles
from app.features.auth.router import router as auth_router
from app.features.dashboard.router import router as dashboard_router
from app.features.flats.router import router as flat_router
from app.features.lease.router import router as lease_router
from app.features.payment.router import router as payment_router
from app.features.property.router import router as property_router
from app.features.tenant.router import router as tenant_router
from app.features.property_image.router import (
    router as property_image_router,
)
app = FastAPI(
    title="LeaseFlow API",
    version="1.0.0",
)

# Register Middleware
app.middleware("http")(log_requests)

# Register Routers
app.include_router(auth_router)
app.include_router(property_router)
app.include_router(flat_router)
app.include_router(tenant_router)
app.include_router(lease_router)
app.include_router(payment_router)
app.include_router(dashboard_router)
app.include_router(property_image_router)


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


@app.get("/admin")
def admin_only(
    current_user=Depends(require_roles("admin")),
):
    return {
        "message": "Welcome Admin"
    }