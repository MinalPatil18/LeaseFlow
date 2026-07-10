from uuid import UUID

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.features.auth.dependencies import get_current_user
from app.features.auth.models import User
from app.features.property.schemas import (
    PropertyCreate,
    PropertyResponse,
    PropertyUpdate,
)
from app.features.property.service import PropertyService

router = APIRouter(
    prefix="/properties",
    tags=["Properties"],
)


@router.post(
    "",
    response_model=PropertyResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_property(
    property_data: PropertyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return PropertyService.create_property(
        db,
        current_user,
        property_data,
    )


@router.get(
    "",
    response_model=list[PropertyResponse],
)
def get_my_properties(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return PropertyService.get_my_properties(
        db,
        current_user,
    )


@router.get("/paged")
def get_my_properties_paginated(
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return PropertyService.get_my_properties_paginated(
        db,
        current_user,
        page,
        size,
    )


@router.get(
    "/search",
    response_model=list[PropertyResponse],
)
def search_properties(
    city: str | None = None,
    property_type: str | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return PropertyService.search_properties(
        db,
        current_user,
        city,
        property_type,
    )


@router.get(
    "/sorted",
    response_model=list[PropertyResponse],
)
def get_sorted_properties(
    sort: str = "property_name",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return PropertyService.get_sorted_properties(
        db,
        current_user,
        sort,
    )


@router.get(
    "/{property_id}",
    response_model=PropertyResponse,
)
def get_property(
    property_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return PropertyService.get_property(
        db,
        current_user,
        property_id,
    )


@router.patch(
    "/{property_id}",
    response_model=PropertyResponse,
)
def update_property(
    property_id: UUID,
    property_data: PropertyUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return PropertyService.update_property(
        db,
        current_user,
        property_id,
        property_data,
    )


@router.delete(
    "/{property_id}",
    status_code=status.HTTP_200_OK,
)
def delete_property(
    property_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return PropertyService.delete_property(
        db,
        current_user,
        property_id,
    )