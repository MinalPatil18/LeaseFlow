from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.features.auth.dependencies import get_current_user
from app.features.auth.models import User
from app.features.flats.schemas import (
    FlatCreate,
    FlatResponse,
    FlatUpdate,
)
from app.features.flats.service import FlatService

router = APIRouter(
    prefix="/flats",
    tags=["Flats"],
)


@router.post(
    "",
    response_model=FlatResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_flat(
    flat_data: FlatCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return FlatService.create_flat(
        db,
        current_user,
        flat_data,
    )


@router.get(
    "/property/{property_id}",
    response_model=list[FlatResponse],
)
def get_flats_by_property(
    property_id: UUID,
    db: Session = Depends(get_db),
):
    return FlatService.get_flats_by_property(
        db,
        property_id,
    )


@router.get(
    "/{flat_id}",
    response_model=FlatResponse,
)
def get_flat(
    flat_id: UUID,
    db: Session = Depends(get_db),
):
    return FlatService.get_flat(
        db,
        flat_id,
    )


@router.patch(
    "/{flat_id}",
    response_model=FlatResponse,
)
def update_flat(
    flat_id: UUID,
    flat_data: FlatUpdate,
    db: Session = Depends(get_db),
):
    return FlatService.update_flat(
        db,
        flat_id,
        flat_data,
    )


@router.delete(
    "/{flat_id}",
)
def delete_flat(
    flat_id: UUID,
    db: Session = Depends(get_db),
):
    return FlatService.delete_flat(
        db,
        flat_id,
    )