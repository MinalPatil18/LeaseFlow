import uuid

from sqlalchemy import Date, DateTime, ForeignKey, Numeric, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class Lease(Base):
    __tablename__ = "leases"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    tenant_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("tenants.id", ondelete="CASCADE"),
        nullable=False,
    )

    flat_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("flats.id", ondelete="CASCADE"),
        nullable=False,
    )

    lease_start: Mapped[Date] = mapped_column(
        Date,
        nullable=False,
    )

    lease_end: Mapped[Date] = mapped_column(
        Date,
        nullable=False,
    )

    monthly_rent: Mapped[float] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    security_deposit: Mapped[float] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    due_day: Mapped[int] = mapped_column(
        nullable=False,
    )

    status: Mapped[str] = mapped_column(
        String(20),
        default="Active",
        nullable=False,
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    tenant = relationship(
        "Tenant",
        back_populates="leases",
    )

    flat = relationship(
        "Flat",
        back_populates="leases",
    )