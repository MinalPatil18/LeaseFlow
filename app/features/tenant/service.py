from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.features.auth.models import User
from app.features.flats.repository import FlatRepository
from app.features.tenant.models import Tenant
from app.features.tenant.repository import TenantRepository
from app.features.tenant.schemas import TenantCreate, TenantUpdate
from app.features.property.repository import PropertyRepository


class TenantService:

    @staticmethod
    def create_tenant(
        db: Session,
        current_user: User,
        tenant_data: TenantCreate,
    ):
        flat = FlatRepository.get_flat_by_id(
            db,
            tenant_data.flat_id,
        )

        if flat is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Flat not found",
            )

        property_obj = PropertyRepository.get_property_by_id(
            db,
            flat.property_id,
        )

        if (
            current_user.role != "admin"
            and property_obj.owner_id != current_user.id
        ):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied",
            )

        tenant = Tenant(
            flat_id=tenant_data.flat_id,
            full_name=tenant_data.full_name,
            email=tenant_data.email,
            phone=tenant_data.phone,
            aadhaar_number=tenant_data.aadhaar_number,
            occupation=tenant_data.occupation,
            emergency_contact=tenant_data.emergency_contact,
            move_in_date=tenant_data.move_in_date,
        )

        return TenantRepository.create(
            db,
            tenant,
        )

    @staticmethod
    def get_tenant(
        db: Session,
        tenant_id: UUID,
    ):
        tenant = TenantRepository.get_by_id(
            db,
            tenant_id,
        )

        if tenant is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tenant not found",
            )

        return tenant

    @staticmethod
    def get_tenants_by_flat(
        db: Session,
        flat_id: UUID,
    ):
        return TenantRepository.get_by_flat(
            db,
            flat_id,
        )

    @staticmethod
    def update_tenant(
        db: Session,
        tenant_id: UUID,
        tenant_data: TenantUpdate,
    ):
        tenant = TenantRepository.get_by_id(
            db,
            tenant_id,
        )

        if tenant is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tenant not found",
            )

        tenant.full_name = tenant_data.full_name
        tenant.email = tenant_data.email
        tenant.phone = tenant_data.phone
        tenant.aadhaar_number = tenant_data.aadhaar_number
        tenant.occupation = tenant_data.occupation
        tenant.emergency_contact = tenant_data.emergency_contact
        tenant.move_in_date = tenant_data.move_in_date
        tenant.move_out_date = tenant_data.move_out_date
        tenant.is_active = tenant_data.is_active

        TenantRepository.update(db)

        return tenant

    @staticmethod
    def delete_tenant(
        db: Session,
        tenant_id: UUID,
    ):
        tenant = TenantRepository.get_by_id(
            db,
            tenant_id,
        )

        if tenant is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Tenant not found",
            )

        TenantRepository.delete(
            db,
            tenant,
        )

        return {
            "message": "Tenant deleted successfully"
        }