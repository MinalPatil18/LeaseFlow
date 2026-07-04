from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.features.auth.dependencies import get_current_user
from app.features.auth.models import User
from app.features.tenant.schemas import (
    TenantCreate,
    TenantUpdate,
    TenantResponse,
)
from app.features.tenant.service import TenantService

router = APIRouter(
    prefix="/tenants",
    tags=["Tenants"],
)


@router.post(
    "",
    response_model=TenantResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_tenant(
    tenant_data: TenantCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return TenantService.create_tenant(
        db,
        current_user,
        tenant_data,
    )


@router.get(
    "/flat/{flat_id}",
    response_model=list[TenantResponse],
)
def get_tenants_by_flat(
    flat_id: UUID,
    db: Session = Depends(get_db),
):
    return TenantService.get_tenants_by_flat(
        db,
        flat_id,
    )


@router.get(
    "/{tenant_id}",
    response_model=TenantResponse,
)
def get_tenant(
    tenant_id: UUID,
    db: Session = Depends(get_db),
):
    return TenantService.get_tenant(
        db,
        tenant_id,
    )


@router.patch(
    "/{tenant_id}",
    response_model=TenantResponse,
)
def update_tenant(
    tenant_id: UUID,
    tenant_data: TenantUpdate,
    db: Session = Depends(get_db),
):
    return TenantService.update_tenant(
        db,
        tenant_id,
        tenant_data,
    )


@router.delete(
    "/{tenant_id}",
)
def delete_tenant(
    tenant_id: UUID,
    db: Session = Depends(get_db),
):
    return TenantService.delete_tenant(
        db,
        tenant_id,
    )