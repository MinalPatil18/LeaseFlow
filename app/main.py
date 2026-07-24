from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
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
from app.features.property_image.router import (
    router as property_image_router,
)
from app.features.tenant.router import router as tenant_router


# ==========================================
# Configuration
# ==========================================

ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]


# ==========================================
# FastAPI App
# ==========================================

app = FastAPI(
    title="LeaseFlow API",
    description="LeaseFlow - Property Management System API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)


# ==========================================
# Middleware
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.middleware("http")(log_requests)


# ==========================================
# Startup / Shutdown
# ==========================================

@app.on_event("startup")
def startup():
    print("===================================")
    print("LeaseFlow API Started Successfully")
    print("Swagger: http://localhost:8000/docs")
    print("===================================")


@app.on_event("shutdown")
def shutdown():
    print("LeaseFlow API Stopped")


# ==========================================
# Register Routers
# ==========================================

app.include_router(auth_router)
app.include_router(property_router)
app.include_router(property_image_router)
app.include_router(flat_router)
app.include_router(tenant_router)
app.include_router(lease_router)
app.include_router(payment_router)
app.include_router(dashboard_router)


# ==========================================
# Root
# ==========================================

@app.get(
    "/",
    tags=["System"],
)
def root():
    return {
        "application": "LeaseFlow API",
        "version": "1.0.0",
        "status": "Running",
        "documentation": "/docs",
        "redoc": "/redoc",
        "health": "/health",
    }


# ==========================================
# Health Check
# ==========================================

@app.get(
    "/health",
    tags=["System"],
)
def health_check():
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        return {
            "status": "healthy",
            "database": "Connected",
        }

    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "Disconnected",
            "error": str(e),
        }


# ==========================================
# Protected Admin Route
# ==========================================

@app.get(
    "/admin",
    tags=["Admin"],
)
def admin_only(
    current_user=Depends(require_roles("admin")),
):
    return {
        "message": f"Welcome {current_user.full_name}",
        "role": "Admin",
    }