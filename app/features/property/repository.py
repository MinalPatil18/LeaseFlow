from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.features.property.models import Property


class PropertyRepository:

    @staticmethod
    def create_property(
        db: Session,
        property_obj: Property,
    ):
        db.add(property_obj)
        db.commit()
        db.refresh(property_obj)
        return property_obj

    @staticmethod
    def get_properties_by_owner(
        db: Session,
        owner_id: UUID,
    ):
        stmt = select(Property).where(
            Property.owner_id == owner_id
        )
        return db.scalars(stmt).all()

    @staticmethod
    def get_property_by_id(
        db: Session,
        property_id: UUID,
    ):
        stmt = select(Property).where(
            Property.id == property_id
        )
        return db.scalar(stmt)

    @staticmethod
    def update_property(db: Session):
        db.commit()

    @staticmethod
    def delete_property(
        db: Session,
        property_obj: Property,
    ):
        db.delete(property_obj)
        db.commit()

    @staticmethod
    def get_properties_paginated(
        db: Session,
        owner_id,
    ):
        return (
            db.query(Property)
            .filter(Property.owner_id == owner_id)
        )

    @staticmethod
    def search_properties(
        db: Session,
        owner_id,
        city: str | None = None,
        property_type: str | None = None,
    ):
        query = (
            db.query(Property)
            .filter(Property.owner_id == owner_id)
        )

        if city:
            query = query.filter(
                Property.city.ilike(f"%{city}%")
            )

        if property_type:
            query = query.filter(
                Property.property_type.ilike(
                    f"%{property_type}%"
                )
            )

        return query.all()

    @staticmethod
    def get_sorted_properties(
        db: Session,
        owner_id,
        sort: str,
    ):
        query = (
            db.query(Property)
            .filter(Property.owner_id == owner_id)
        )

        sort_fields = {
            "property_name": Property.property_name,
            "city": Property.city,
            "property_type": Property.property_type,
            "created_at": Property.created_at,
        }

        descending = sort.startswith("-")
        field = sort.lstrip("-")

        if field in sort_fields:
            column = sort_fields[field]
            query = query.order_by(
                column.desc() if descending else column.asc()
            )

        return query.all()