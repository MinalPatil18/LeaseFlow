from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.features.auth.models import User
from app.features.flats.models import Flat
from app.features.flats.repository import FlatRepository
from app.features.flats.schemas import FlatCreate, FlatUpdate
from app.features.property.repository import PropertyRepository


class FlatService:

    @staticmethod
    def create_flat(
        db: Session,
        current_user: User,
        flat_data: FlatCreate,
    ):
        property_obj = PropertyRepository.get_property_by_id(
            db,
            flat_data.property_id,
        )

        if property_obj is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Property not found",
            )

        if (
            current_user.role != "admin"
            and property_obj.owner_id != current_user.id
        ):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied",
            )

        flat = Flat(
            property_id=flat_data.property_id,
            flat_number=flat_data.flat_number,
            floor=flat_data.floor,
            bedrooms=flat_data.bedrooms,
            bathrooms=flat_data.bathrooms,
            rent_amount=flat_data.rent_amount,
            deposit_amount=flat_data.deposit_amount,
        )

        return FlatRepository.create_flat(
            db,
            flat,
        )

    @staticmethod
    def get_flats_by_property(
        db: Session,
        property_id: UUID,
    ):
        return FlatRepository.get_flats_by_property(
            db,
            property_id,
        )

    @staticmethod
    def get_flat(
        db: Session,
        flat_id: UUID,
    ):
        flat = FlatRepository.get_flat_by_id(
            db,
            flat_id,
        )

        if flat is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Flat not found",
            )

        return flat

    @staticmethod
    def update_flat(
        db: Session,
        flat_id: UUID,
        flat_data: FlatUpdate,
    ):
        flat = FlatRepository.get_flat_by_id(
            db,
            flat_id,
        )

        if flat is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Flat not found",
            )

        flat.flat_number = flat_data.flat_number
        flat.floor = flat_data.floor
        flat.bedrooms = flat_data.bedrooms
        flat.bathrooms = flat_data.bathrooms
        flat.rent_amount = flat_data.rent_amount
        flat.deposit_amount = flat_data.deposit_amount
        flat.status = flat_data.status

        FlatRepository.update(db)

        return flat

    @staticmethod
    def delete_flat(
        db: Session,
        flat_id: UUID,
    ):
        flat = FlatRepository.get_flat_by_id(
            db,
            flat_id,
        )

        if flat is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Flat not found",
            )

        FlatRepository.delete(
            db,
            flat,
        )

        return {
            "message": "Flat deleted successfully"
        }