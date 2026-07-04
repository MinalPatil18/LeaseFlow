from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.features.lease.schemas import (
    LeaseCreate,
    LeaseUpdate,
    LeaseResponse,
)
from app.features.lease.service import LeaseService

router = APIRouter(
    prefix="/leases",
    tags=["Leases"],
)


@router.post(
    "",
    response_model=LeaseResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_lease(
    lease_data: LeaseCreate,
    db: Session = Depends(get_db),
):
    return LeaseService.create_lease(
        db,
        lease_data,
    )


@router.get(
    "/tenant/{tenant_id}",
    response_model=list[LeaseResponse],
)
def get_leases_by_tenant(
    tenant_id: UUID,
    db: Session = Depends(get_db),
):
    return LeaseService.get_leases_by_tenant(
        db,
        tenant_id,
    )


@router.get(
    "/{lease_id}",
    response_model=LeaseResponse,
)
def get_lease(
    lease_id: UUID,
    db: Session = Depends(get_db),
):
    return LeaseService.get_lease(
        db,
        lease_id,
    )


@router.patch(
    "/{lease_id}",
    response_model=LeaseResponse,
)
def update_lease(
    lease_id: UUID,
    lease_data: LeaseUpdate,
    db: Session = Depends(get_db),
):
    return LeaseService.update_lease(
        db,
        lease_id,
        lease_data,
    )


@router.delete(
    "/{lease_id}",
)
def delete_lease(
    lease_id: UUID,
    db: Session = Depends(get_db),
):
    return LeaseService.delete_lease(
        db,
        lease_id,
    )