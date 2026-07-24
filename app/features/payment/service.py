from decimal import Decimal
from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy.orm import Session

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
        lease = PaymentRepository.get_lease(
            db,
            payment_data.lease_id,
        )

        if lease is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lease not found",
            )

        if lease.status != "Active":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Payments can only be made for active leases.",
            )

        if Decimal(payment_data.amount) <= 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Payment amount must be greater than zero.",
            )

        if PaymentRepository.receipt_exists(
            db,
            payment_data.receipt_number,
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Receipt number already exists.",
            )

        month = payment_data.payment_date.month
        year = payment_data.payment_date.year

        already_paid = PaymentRepository.get_monthly_paid_amount(
            db,
            payment_data.lease_id,
            month,
            year,
        )

        monthly_rent = Decimal(lease.monthly_rent)

        if already_paid + Decimal(payment_data.amount) > monthly_rent:
            remaining = monthly_rent - already_paid

            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Payment exceeds monthly rent. Remaining payable amount is {remaining}.",
            )

        total_paid = already_paid + Decimal(payment_data.amount)

        payment_status = (
            "Paid"
            if total_paid >= monthly_rent
            else "Partial"
        )

        payment = Payment(
            lease_id=payment_data.lease_id,
            amount=payment_data.amount,
            payment_date=payment_data.payment_date,
            payment_month=month,
            payment_year=year,
            payment_method=payment_data.payment_method,
            remarks=payment_data.remarks,
            receipt_number=payment_data.receipt_number,
            status=payment_status,
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
    def get_payment_summary(
        db: Session,
        lease_id: UUID,
        month: int,
        year: int,
    ):
        summary = PaymentRepository.get_payment_summary(
            db,
            lease_id,
            month,
            year,
        )

        if summary is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Lease not found.",
            )

        return summary

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
        payment.payment_month = payment_data.payment_date.month
        payment.payment_year = payment_data.payment_date.year
        payment.payment_method = payment_data.payment_method
        payment.remarks = payment_data.remarks
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