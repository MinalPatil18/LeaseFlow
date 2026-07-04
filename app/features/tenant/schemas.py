from datetime import date
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr


class TenantCreate(BaseModel):
    flat_id: UUID
    full_name: str
    email: EmailStr
    phone: str
    aadhaar_number: str
    occupation: str
    emergency_contact: str
    move_in_date: date


class TenantUpdate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    aadhaar_number: str
    occupation: str
    emergency_contact: str
    move_in_date: date
    move_out_date: date | None = None
    is_active: bool


class TenantResponse(BaseModel):
    id: UUID
    flat_id: UUID
    full_name: str
    email: EmailStr
    phone: str
    aadhaar_number: str
    occupation: str
    emergency_contact: str
    move_in_date: date
    move_out_date: date | None
    is_active: bool

    model_config = ConfigDict(from_attributes=True)