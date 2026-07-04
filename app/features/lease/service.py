from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.features.lease.models import Lease
from app.features.lease.repository import LeaseRepository
from app.features.lease.schemas import LeaseCreate, LeaseUpdate
from app.features.tenant.repository import TenantRepository
from app.features.flats.repository import FlatRepository


class LeaseService:

    @staticmethod
    def create_lease(
        db: Session,
        lease_data: LeaseCreate,
    ):
        tenant = TenantRepository.get_by_id(
            db,
            lease_data.tenant_id,
        )

        if tenant is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tenant not found",
            )

        flat = FlatRepository.get_flat_by_id(
            db,
            lease_data.flat_id,
        )

        if flat is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Flat not found",
            )

        lease = Lease(
            tenant_id=lease_data.tenant_id,
            flat_id=lease_data.flat_id,
            lease_start=lease_data.lease_start,
            lease_end=lease_data.lease_end,
            monthly_rent=lease_data.monthly_rent,
            security_deposit=lease_data.security_deposit,
            due_day=lease_data.due_day,
        )

        return LeaseRepository.create(
            db,
            lease,
        )

    @staticmethod
    def get_lease(
        db: Session,
        lease_id: UUID,
    ):
        lease = LeaseRepository.get_by_id(
            db,
            lease_id,
        )

        if lease is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lease not found",
            )

        return lease

    @staticmethod
    def get_leases_by_tenant(
        db: Session,
        tenant_id: UUID,
    ):
        return LeaseRepository.get_by_tenant(
            db,
            tenant_id,
        )

    @staticmethod
    def update_lease(
        db: Session,
        lease_id: UUID,
        lease_data: LeaseUpdate,
    ):
        lease = LeaseRepository.get_by_id(
            db,
            lease_id,
        )

        if lease is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lease not found",
            )

        lease.lease_start = lease_data.lease_start
        lease.lease_end = lease_data.lease_end
        lease.monthly_rent = lease_data.monthly_rent
        lease.security_deposit = lease_data.security_deposit
        lease.due_day = lease_data.due_day
        lease.status = lease_data.status

        LeaseRepository.update(db)

        return lease

    @staticmethod
    def delete_lease(
        db: Session,
        lease_id: UUID,
    ):
        lease = LeaseRepository.get_by_id(
            db,
            lease_id,
        )

        if lease is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lease not found",
            )

        LeaseRepository.delete(
            db,
            lease,
        )

        return {
            "message": "Lease deleted successfully"
        }