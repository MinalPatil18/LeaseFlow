from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.features.property.models import Property


class PropertyRepository:

    @staticmethod
    def create_property(db: Session, property_obj: Property):
        db.add(property_obj)
        db.commit()
        db.refresh(property_obj)
        return property_obj

    @staticmethod
    def get_properties_by_owner(db: Session, owner_id: UUID):
        stmt = select(Property).where(Property.owner_id == owner_id)
        return db.scalars(stmt).all()

    @staticmethod
    def get_property_by_id(db: Session, property_id: UUID):
        stmt = select(Property).where(Property.id == property_id)
        return db.scalar(stmt)

    @staticmethod
    def update_property(db: Session):
        db.commit()

    @staticmethod
    def delete_property(db: Session, property_obj: Property):
        db.delete(property_obj)
        db.commit()