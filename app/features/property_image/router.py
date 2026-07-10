from typing import Annotated
from uuid import UUID

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    UploadFile,
)
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.features.auth.dependencies import get_current_user
from app.features.auth.models import User
from app.features.property_image.schemas import PropertyImageResponse
from app.features.property_image.service import PropertyImageService

router = APIRouter(
    prefix="/property-images",
    tags=["Property Images"],
)


@router.post(
    "/{property_id}",
    response_model=list[PropertyImageResponse],
)
async def upload_images(
    property_id: UUID,
    files: Annotated[list[UploadFile], File(...)],
    image_category: Annotated[str, Form()] = "Other",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return await PropertyImageService.upload_images(
        db=db,
        current_user=current_user,
        property_id=property_id,
        files=files,
        image_category=image_category,
    )


@router.get(
    "/{property_id}",
    response_model=list[PropertyImageResponse],
)
def get_images(
    property_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return PropertyImageService.get_images(
        db,
        current_user,
        property_id,
    )


@router.delete(
    "/{image_id}",
)
def delete_image(
    image_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return PropertyImageService.delete_image(
        db,
        current_user,
        image_id,
    )


@router.patch(
    "/{image_id}/primary",
    response_model=PropertyImageResponse,
)
def set_primary_image(
    image_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return PropertyImageService.set_primary_image(
        db,
        current_user,
        image_id,
    )