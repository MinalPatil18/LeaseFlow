"""add payment month year remarks

Revision ID: 52857bb01399
Revises: 5e56ce2c231d
Create Date: 2026-07-22 16:08:13.989480

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "52857bb01399"
down_revision: Union[str, Sequence[str], None] = "5e56ce2c231d"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    op.add_column(
        "payments",
        sa.Column(
            "payment_month",
            sa.Integer(),
            nullable=True,
            server_default="1",
        ),
    )

    op.add_column(
        "payments",
        sa.Column(
            "payment_year",
            sa.Integer(),
            nullable=True,
            server_default="2026",
        ),
    )

    op.add_column(
        "payments",
        sa.Column(
            "remarks",
            sa.String(255),
            nullable=True,
        ),
    )

    op.alter_column(
        "payments",
        "payment_month",
        nullable=False,
        server_default=None,
    )

    op.alter_column(
        "payments",
        "payment_year",
        nullable=False,
        server_default=None,
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_column("payments", "remarks")
    op.drop_column("payments", "payment_year")
    op.drop_column("payments", "payment_month")