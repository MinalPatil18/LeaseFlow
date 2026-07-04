from datetime import date
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class LeaseCreate(BaseModel):
    tenant_id: UUID
    flat_id: UUID
    lease_start: date
    lease_end: date
    monthly_rent: Decimal
    security_deposit: Decimal
    due_day: int


class LeaseUpdate(BaseModel):
    lease_start: date
    lease_end: date
    monthly_rent: Decimal
    security_deposit: Decimal
    due_day: int
    status: str


class LeaseResponse(BaseModel):
    id: UUID
    tenant_id: UUID
    flat_id: UUID
    lease_start: date
    lease_end: date
    monthly_rent: Decimal
    security_deposit: Decimal
    due_day: int
    status: str

    model_config = ConfigDict(from_attributes=True)