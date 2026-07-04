from uuid import UUID

from sqlalchemy import select
from sqlalchemy.orm import Session

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
        stmt = select(Payment).where(
            Payment.lease_id == lease_id
        )
        return db.scalars(stmt).all()

    @staticmethod
    def update(db: Session):
        db.commit()

    @staticmethod
    def delete(
        db: Session,
        payment: Payment,
    ):
        db.delete(payment)
        db.commit()