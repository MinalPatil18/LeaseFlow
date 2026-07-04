from uuid import UUID

from pydantic import BaseModel, ConfigDict


class PropertyCreate(BaseModel):
    property_name: str
    property_type: str
    address: str
    city: str
    state: str
    pincode: str
    description: str | None = None


class PropertyUpdate(BaseModel):
    property_name: str
    property_type: str
    address: str
    city: str
    state: str
    pincode: str
    description: str | None = None
    is_active: bool


class PropertyResponse(BaseModel):
    id: UUID
    owner_id: UUID
    property_name: str
    property_type: str
    address: str
    city: str
    state: str
    pincode: str
    description: str | None
    is_active: bool

    model_config = ConfigDict(from_attributes=True)