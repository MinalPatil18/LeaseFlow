from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.common.pagination import paginate
from app.features.auth.models import User
from app.features.property.models import Property
from app.features.property.repository import PropertyRepository
from app.features.property.schemas import (
    PropertyCreate,
    PropertyUpdate,
)


class PropertyService:

    @staticmethod
    def create_property(
        db: Session,
        current_user: User,
        property_data: PropertyCreate,
    ):
        property_obj = Property(
            owner_id=current_user.id,
            property_name=property_data.property_name,
            property_type=property_data.property_type,
            address=property_data.address,
            city=property_data.city,
            state=property_data.state,
            pincode=property_data.pincode,
            description=property_data.description,
        )

        return PropertyRepository.create_property(
            db,
            property_obj,
        )

    @staticmethod
    def get_my_properties(
        db: Session,
        current_user: User,
    ):
        return PropertyRepository.get_properties_by_owner(
            db,
            current_user.id,
        )

    @staticmethod
    def get_my_properties_paginated(
        db: Session,
        current_user: User,
        page: int = 1,
        size: int = 10,
    ):
        query = PropertyRepository.get_properties_paginated(
            db,
            current_user.id,
        )

        return paginate(
            query,
            page,
            size,
        )

    @staticmethod
    def search_properties(
        db: Session,
        current_user: User,
        city: str | None = None,
        property_type: str | None = None,
    ):
        return PropertyRepository.search_properties(
            db,
            current_user.id,
            city,
            property_type,
        )

    @staticmethod
    def get_sorted_properties(
        db: Session,
        current_user: User,
        sort: str,
    ):
        return PropertyRepository.get_sorted_properties(
            db,
            current_user.id,
            sort,
        )

    @staticmethod
    def get_property(
        db: Session,
        current_user: User,
        property_id: UUID,
    ):
        property_obj = PropertyRepository.get_property_by_id(
            db,
            property_id,
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

        return property_obj

    @staticmethod
    def update_property(
        db: Session,
        current_user: User,
        property_id: UUID,
        property_data: PropertyUpdate,
    ):
        property_obj = PropertyRepository.get_property_by_id(
            db,
            property_id,
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

        property_obj.property_name = property_data.property_name
        property_obj.property_type = property_data.property_type
        property_obj.address = property_data.address
        property_obj.city = property_data.city
        property_obj.state = property_data.state
        property_obj.pincode = property_data.pincode
        property_obj.description = property_data.description
        property_obj.is_active = property_data.is_active

        PropertyRepository.update_property(db)

        return property_obj

    @staticmethod
    def delete_property(
        db: Session,
        current_user: User,
        property_id: UUID,
    ):
        property_obj = PropertyRepository.get_property_by_id(
            db,
            property_id,
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

        PropertyRepository.delete_property(
            db,
            property_obj,
        )

        return {
            "message": "Property deleted successfully"
        }