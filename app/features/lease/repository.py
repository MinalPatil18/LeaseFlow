from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.features.lease.models import Lease


class LeaseRepository:

    @staticmethod
    def create(db: Session, lease: Lease):
        db.add(lease)
        db.commit()
        db.refresh(lease)
        return lease

    @staticmethod
    def get_by_id(db: Session, lease_id: UUID):
        stmt = select(Lease).where(Lease.id == lease_id)
        return db.scalar(stmt)

    @staticmethod
    def get_by_tenant(db: Session, tenant_id: UUID):
        stmt = select(Lease).where(Lease.tenant_id == tenant_id)
        return db.scalars(stmt).all()

    @staticmethod
    def update(db: Session):
        db.commit()

    @staticmethod
    def delete(db: Session, lease: Lease):
        db.delete(lease)
        db.commit()