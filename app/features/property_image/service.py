import os
import shutil
import uuid
from uuid import UUID

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.features.auth.models import User
from app.features.property.models import Property
from app.features.property_image.models import PropertyImage
from app.features.property_image.repository import PropertyImageRepository


class PropertyImageService:

    @staticmethod
    async def upload_images(
        db: Session,
        current_user: User,
        property_id: UUID,
        files: list[UploadFile],
        image_category: str,
    ):
        property_obj = (
            db.query(Property)
            .filter(Property.id == property_id)
            .first()
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

        upload_folder = os.path.join(
            "uploads",
            "properties",
            str(property_id),
        )

        os.makedirs(upload_folder, exist_ok=True)

        existing_images = (
            PropertyImageRepository.get_images_by_property(
                db,
                property_id,
            )
        )

        uploaded_images = []

        allowed_extensions = {
            ".jpg",
            ".jpeg",
            ".png",
            ".webp",
        }

        for file in files:

            extension = os.path.splitext(
                file.filename
            )[1].lower()

            if extension not in allowed_extensions:
                raise HTTPException(
                    status_code=400,
                    detail=f"{file.filename} is not a valid image.",
                )

            filename = f"{uuid.uuid4()}{extension}"

            filepath = os.path.join(
                upload_folder,
                filename,
            )

            with open(filepath, "wb") as buffer:
                shutil.copyfileobj(
                    file.file,
                    buffer,
                )

            image = PropertyImage(
                property_id=property_id,
                image_name=file.filename,
                image_url=f"/uploads/properties/{property_id}/{filename}",
                image_category=image_category,
                is_primary=len(existing_images) == 0,
            )

            uploaded_images.append(
                PropertyImageRepository.create_image(
                    db,
                    image,
                )
            )

            existing_images.append(image)

        return uploaded_images

    @staticmethod
    def get_images(
        db: Session,
        current_user: User,
        property_id: UUID,
    ):
        return PropertyImageRepository.get_images_by_property(
            db,
            property_id,
        )

    @staticmethod
    def delete_image(
        db: Session,
        current_user: User,
        image_id: UUID,
    ):
        image = PropertyImageRepository.get_image_by_id(
            db,
            image_id,
        )

        if image is None:
            raise HTTPException(
                status_code=404,
                detail="Image not found",
            )

        file_path = image.image_url.lstrip("/")
import os
import shutil
import uuid
from uuid import UUID

from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.features.auth.models import User
from app.features.property.models import Property
from app.features.property_image.models import PropertyImage
from app.features.property_image.repository import PropertyImageRepository


class PropertyImageService:

    @staticmethod
    async def upload_images(
        db: Session,
        current_user: User,
        property_id: UUID,
        files: list[UploadFile],
        image_category: str,
    ):
        property_obj = (
            db.query(Property)
            .filter(Property.id == property_id)
            .first()
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

        upload_folder = os.path.join(
            "uploads",
            "properties",
            str(property_id),
        )

        os.makedirs(upload_folder, exist_ok=True)

        existing_images = (
            PropertyImageRepository.get_images_by_property(
                db,
                property_id,
            )
        )

        uploaded_images = []

        allowed_extensions = {
            ".jpg",
            ".jpeg",
            ".png",
            ".webp",
        }

        for file in files:

            extension = os.path.splitext(
                file.filename
            )[1].lower()

            if extension not in allowed_extensions:
                raise HTTPException(
                    status_code=400,
                    detail=f"{file.filename} is not a valid image.",
                )

            filename = f"{uuid.uuid4()}{extension}"

            filepath = os.path.join(
                upload_folder,
                filename,
            )

            with open(filepath, "wb") as buffer:
                shutil.copyfileobj(
                    file.file,
                    buffer,
                )

            image = PropertyImage(
                property_id=property_id,
                image_name=file.filename,
                image_url=f"/uploads/properties/{property_id}/{filename}",
                image_category=image_category,
                is_primary=len(existing_images) == 0,
            )

            uploaded_images.append(
                PropertyImageRepository.create_image(
                    db,
                    image,
                )
            )

            existing_images.append(image)

        return uploaded_images

    @staticmethod
    def get_images(
        db: Session,
        current_user: User,
        property_id: UUID,
    ):
        return PropertyImageRepository.get_images_by_property(
            db,
            property_id,
        )

    @staticmethod
    def delete_image(
        db: Session,
        current_user: User,
        image_id: UUID,
    ):
        image = PropertyImageRepository.get_image_by_id(
            db,
            image_id,
        )

        if image is None:
            raise HTTPException(
                status_code=404,
                detail="Image not found",
            )

        file_path = image.image_url.lstrip("/")

        if os.path.exists(file_path):
            os.remove(file_path)

        PropertyImageRepository.delete_image(
            db,
            image,
        )

        return {
            "message": "Image deleted successfully"
        }

    @staticmethod
    def set_primary_image(
        db: Session,
        current_user: User,
        image_id: UUID,
    ):
        image = PropertyImageRepository.get_image_by_id(
            db,
            image_id,
        )

        if image is None:
            raise HTTPException(
                status_code=404,
                detail="Image not found",
            )

        property_obj = (
            db.query(Property)
            .filter(Property.id == image.property_id)
            .first()
        )

        if (
            current_user.role != "admin"
            and property_obj.owner_id != current_user.id
        ):
            raise HTTPException(
                status_code=403,
                detail="Access denied",
            )

        PropertyImageRepository.remove_primary_flags(
            db,
            image.property_id,
        )

        image.is_primary = True

        PropertyImageRepository.update(db)

        return image
        if os.path.exists(file_path):
            os.remove(file_path)

        PropertyImageRepository.delete_image(
            db,
            image,
        )

        return {
            "message": "Image deleted successfully"
        }
        @staticmethod
        def set_primary_image(
            db: Session,
            current_user: User,
            image_id: UUID,
        ):
            image = PropertyImageRepository.get_image_by_id(
            db,
            image_id,
        )

        if image is None:
            raise HTTPException(
                status_code=404,
                detail="Image not found",
            )

        property_obj = (
            db.query(Property)
            .filter(Property.id == image.property_id)
            .first()
        )

        if (
            current_user.role != "admin"
            and property_obj.owner_id != current_user.id
        ):
            raise HTTPException(
                status_code=403,
                detail="Access denied",
            )

        PropertyImageRepository.remove_primary_flags(
            db,
            image.property_id,
        )

        image.is_primary = True

        PropertyImageRepository.update(db)

        return image