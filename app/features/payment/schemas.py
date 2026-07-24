from datetime import date
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class PaymentCreate(BaseModel):
    lease_id: UUID
    amount: Decimal = Field(gt=0)
    payment_date: date
    payment_method: str
    receipt_number: str
    remarks: str | None = None


class PaymentUpdate(BaseModel):
    amount: Decimal = Field(gt=0)
    payment_date: date
    payment_method: str
    receipt_number: str
    remarks: str | None = None
    status: str


class PaymentResponse(BaseModel):
    id: UUID
    lease_id: UUID
    amount: Decimal
    payment_date: date
    payment_month: int
    payment_year: int
    payment_method: str
    receipt_number: str
    remarks: str | None
    status: str

    model_config = ConfigDict(from_attributes=True)


class PaymentSummary(BaseModel):
    lease_id: UUID
    monthly_rent: Decimal
    total_paid: Decimal
    remaining_balance: Decimal
    status: str

    model_config = ConfigDict(from_attributes=True)