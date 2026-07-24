from datetime import date
from decimal import Decimal
from uuid import UUID

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.features.lease.models import Lease
from app.features.payment.models import Payment


class PaymentRepository:

    @staticmethod
    def create(
        db: Session,
        payment: Payment,
    ):
        db.add(payment)
        db.commit()
        db.refresh(payment)
        return payment

    @staticmethod
    def get_by_id(
        db: Session,
        payment_id: UUID,
    ):
        stmt = select(Payment).where(
            Payment.id == payment_id
        )
        return db.scalar(stmt)

    @staticmethod
    def get_by_lease(
        db: Session,
        lease_id: UUID,
    ):
        stmt = (
            select(Payment)
            .where(Payment.lease_id == lease_id)
            .order_by(Payment.payment_date.desc())
        )

        return db.scalars(stmt).all()

    @staticmethod
    def get_monthly_paid_amount(
        db: Session,
        lease_id: UUID,
        month: int,
        year: int,
    ) -> Decimal:

        total = (
            db.query(
                func.coalesce(func.sum(Payment.amount), 0)
            )
            .filter(
                Payment.lease_id == lease_id,
                Payment.payment_month == month,
                Payment.payment_year == year,
            )
            .scalar()
        )

        return Decimal(total)

    @staticmethod
    def get_payment_summary(
        db: Session,
        lease_id: UUID,
        month: int,
        year: int,
    ):
        lease = (
            db.query(Lease)
            .filter(Lease.id == lease_id)
            .first()
        )

        if lease is None:
            return None

        paid = PaymentRepository.get_monthly_paid_amount(
            db,
            lease_id,
            month,
            year,
        )

        remaining = Decimal(lease.monthly_rent) - paid

        if paid == 0:
            status = "Pending"
        elif remaining <= 0:
            status = "Paid"
        else:
            status = "Partial"

        return {
            "monthly_rent": Decimal(lease.monthly_rent),
            "paid": paid,
            "remaining": remaining,
            "status": status,
        }

    @staticmethod
    def receipt_exists(
        db: Session,
        receipt_number: str,
    ) -> bool:

        stmt = select(Payment).where(
            Payment.receipt_number == receipt_number
        )

        return db.scalar(stmt) is not None

    @staticmethod
    def get_lease(
        db: Session,
        lease_id: UUID,
    ):
        stmt = select(Lease).where(
            Lease.id == lease_id
        )

        return db.scalar(stmt)

    @staticmethod
    def update(
        db: Session,
    ):
        db.commit()

    @staticmethod
    def delete(
        db: Session,
        payment: Payment,
    ):
        db.delete(payment)
        db.commit()