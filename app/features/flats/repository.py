from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.features.flats.models import Flat


class FlatRepository:

    @staticmethod
    def create_flat(
        db: Session,
        flat: Flat,
    ):
        db.add(flat)
        db.commit()
        db.refresh(flat)
        return flat

    @staticmethod
    def get_flat_by_id(
        db: Session,
        flat_id: UUID,
    ):
        stmt = select(Flat).where(
            Flat.id == flat_id
        )
        return db.scalar(stmt)

    @staticmethod
    def get_flats_by_property(
        db: Session,
        property_id: UUID,
    ):
        stmt = select(Flat).where(
            Flat.property_id == property_id
        )
        return db.scalars(stmt).all()

    @staticmethod
    def update(db: Session):
        db.commit()

    @staticmethod
    def delete(
        db: Session,
        flat: Flat,
    ):
        db.delete(flat)
        db.commit()