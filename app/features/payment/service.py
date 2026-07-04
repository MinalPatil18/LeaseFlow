from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.features.lease.repository import LeaseRepository
from app.features.payment.models import Payment
from app.features.payment.repository import PaymentRepository
from app.features.payment.schemas import (
    PaymentCreate,
    PaymentUpdate,
)


class PaymentService:

    @staticmethod
    def create_payment(
        db: Session,
        payment_data: PaymentCreate,
    ):
        lease = LeaseRepository.get_by_id(
            db,
            payment_data.lease_id,
        )

        if lease is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lease not found",
            )

        payment = Payment(
            lease_id=payment_data.lease_id,
            amount=payment_data.amount,
            payment_date=payment_data.payment_date,
            payment_method=payment_data.payment_method,
            receipt_number=payment_data.receipt_number,
        )

        return PaymentRepository.create(
            db,
            payment,
        )

    @staticmethod
    def get_payment(
        db: Session,
        payment_id: UUID,
    ):
        payment = PaymentRepository.get_by_id(
            db,
            payment_id,
        )

        if payment is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Payment not found",
            )

        return payment

    @staticmethod
    def get_payments_by_lease(
        db: Session,
        lease_id: UUID,
    ):
        return PaymentRepository.get_by_lease(
            db,
            lease_id,
        )

    @staticmethod
    def update_payment(
        db: Session,
        payment_id: UUID,
        payment_data: PaymentUpdate,
    ):
        payment = PaymentRepository.get_by_id(
            db,
            payment_id,
        )

        if payment is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Payment not found",
            )

        payment.amount = payment_data.amount
        payment.payment_date = payment_data.payment_date
        payment.payment_method = payment_data.payment_method
        payment.receipt_number = payment_data.receipt_number
        payment.status = payment_data.status

        PaymentRepository.update(db)

        return payment

    @staticmethod
    def delete_payment(
        db: Session,
        payment_id: UUID,
    ):
        payment = PaymentRepository.get_by_id(
            db,
            payment_id,
        )

        if payment is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Payment not found",
            )

        PaymentRepository.delete(
            db,
            payment,
        )

        return {
            "message": "Payment deleted successfully"
        }