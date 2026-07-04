import uuid

from sqlalchemy import Boolean, DateTime, Date, ForeignKey, String, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.session import Base


class Tenant(Base):
    __tablename__ = "tenants"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    flat_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("flats.id", ondelete="CASCADE"),
        nullable=False,
    )

    full_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        unique=True,
    )

    phone: Mapped[str] = mapped_column(
        String(15),
        nullable=False,
    )

    aadhaar_number: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    occupation: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    emergency_contact: Mapped[str] = mapped_column(
        String(15),
        nullable=False,
    )

    move_in_date: Mapped[Date] = mapped_column(
        Date,
        nullable=False,
    )

    move_out_date: Mapped[Date | None] = mapped_column(
        Date,
        nullable=True,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
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

    flat = relationship(
        "Flat",
        back_populates="tenants",
    )
    leases = relationship(
    "Lease",
    back_populates="tenant",
    cascade="all, delete-orphan",
    )