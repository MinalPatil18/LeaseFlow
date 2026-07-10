from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class PropertyImageResponse(BaseModel):
    id: UUID
    property_id: UUID
    image_name: str
    image_url: str
    image_category: str
    is_primary: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class SetPrimaryImageRequest(BaseModel):
    image_id: UUID