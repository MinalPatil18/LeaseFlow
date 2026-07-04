from datetime import date
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict


class PaymentCreate(BaseModel):
    lease_id: UUID
    amount: Decimal
    payment_date: date
    payment_method: str
    receipt_number: str


class PaymentUpdate(BaseModel):
    amount: Decimal
    payment_date: date
    payment_method: str
    receipt_number: str
    status: str


class PaymentResponse(BaseModel):
    id: UUID
    lease_id: UUID
    amount: Decimal
    payment_date: date
    payment_method: str
    receipt_number: str
    status: str

    model_config = ConfigDict(from_attributes=True)