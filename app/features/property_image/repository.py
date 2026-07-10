from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.features.property_image.models import PropertyImage


class PropertyImageRepository:

    @staticmethod
    def create_image(
        db: Session,
        image: PropertyImage,
    ):
        db.add(image)
        db.commit()
        db.refresh(image)
        return image

    @staticmethod
    def get_images_by_property(
        db: Session,
        property_id: UUID,
    ):
        stmt = (
            select(PropertyImage)
            .where(PropertyImage.property_id == property_id)
        )
        return db.scalars(stmt).all()

    @staticmethod
    def get_image_by_id(
        db: Session,
        image_id: UUID,
    ):
        stmt = (
            select(PropertyImage)
            .where(PropertyImage.id == image_id)
        )
        return db.scalar(stmt)

    @staticmethod
    def update(
        db: Session,
    ):
        db.commit()

    @staticmethod
    def delete_image(
        db: Session,
        image: PropertyImage,
    ):
        db.delete(image)
        db.commit()

    @staticmethod
    def remove_primary_flags(
        db: Session,
        property_id: UUID,
    ):
        (
            db.query(PropertyImage)
            .filter(
                PropertyImage.property_id == property_id
            )
            .update(
                {
                    "is_primary": False
                }
            )
        )

        db.commit()