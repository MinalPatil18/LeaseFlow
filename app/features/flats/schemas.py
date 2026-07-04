from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class FlatCreate(BaseModel):
    property_id: UUID
    flat_number: str
    floor: int
    bedrooms: int
    bathrooms: int
    rent_amount: Decimal
    deposit_amount: Decimal


class FlatUpdate(BaseModel):
    flat_number: str
    floor: int
    bedrooms: int
    bathrooms: int
    rent_amount: Decimal
    deposit_amount: Decimal
    status: str


class FlatResponse(BaseModel):
    id: UUID
    property_id: UUID
    flat_number: str
    floor: int
    bedrooms: int
    bathrooms: int
    rent_amount: Decimal
    deposit_amount: Decimal
    status: str

    model_config = ConfigDict(from_attributes=True)