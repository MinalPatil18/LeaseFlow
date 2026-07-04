from uuid import UUID

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.features.payment.schemas import (
    PaymentCreate,
    PaymentUpdate,
    PaymentResponse,
)
from app.features.payment.service import PaymentService

router = APIRouter(
    prefix="/payments",
    tags=["Payments"],
)


@router.post(
    "",
    response_model=PaymentResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_payment(
    payment_data: PaymentCreate,
    db: Session = Depends(get_db),
):
    return PaymentService.create_payment(
        db,
        payment_data,
    )


@router.get(
    "/lease/{lease_id}",
    response_model=list[PaymentResponse],
)
def get_payments_by_lease(
    lease_id: UUID,
    db: Session = Depends(get_db),
):
    return PaymentService.get_payments_by_lease(
        db,
        lease_id,
    )


@router.get(
    "/{payment_id}",
    response_model=PaymentResponse,
)
def get_payment(
    payment_id: UUID,
    db: Session = Depends(get_db),
):
    return PaymentService.get_payment(
        db,
        payment_id,
    )


@router.patch(
    "/{payment_id}",
    response_model=PaymentResponse,
)
def update_payment(
    payment_id: UUID,
    payment_data: PaymentUpdate,
    db: Session = Depends(get_db),
):
    return PaymentService.update_payment(
        db,
        payment_id,
        payment_data,
    )


@router.delete(
    "/{payment_id}",
)
def delete_payment(
    payment_id: UUID,
    db: Session = Depends(get_db),
):
    return PaymentService.delete_payment(
        db,
        payment_id,
    )