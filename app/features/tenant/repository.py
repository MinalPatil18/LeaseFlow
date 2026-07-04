from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.features.tenant.models import Tenant


class TenantRepository:

    @staticmethod
    def create(db: Session, tenant: Tenant):
        db.add(tenant)
        db.commit()
        db.refresh(tenant)
        return tenant

    @staticmethod
    def get_by_id(
        db: Session,
        tenant_id: UUID,
    ):
        stmt = select(Tenant).where(
            Tenant.id == tenant_id
        )
        return db.scalar(stmt)

    @staticmethod
    def get_by_flat(
        db: Session,
        flat_id: UUID,
    ):
        stmt = select(Tenant).where(
            Tenant.flat_id == flat_id
        )
        return db.scalars(stmt).all()

    @staticmethod
    def update(db: Session):
        db.commit()

    @staticmethod
    def delete(
        db: Session,
        tenant: Tenant,
    ):
        db.delete(tenant)
        db.commit()