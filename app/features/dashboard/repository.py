from sqlalchemy import func
from sqlalchemy.orm import Session

from app.features.property.models import Property
from app.features.flats.models import Flat
from app.features.tenant.models import Tenant
from app.features.lease.models import Lease
from app.features.payment.models import Payment


class DashboardRepository:

    @staticmethod
    def get_summary(db: Session):

        # Total Properties
        total_properties = (
            db.query(func.count(Property.id)).scalar() or 0
        )

        # Total Flats
        total_flats = (
            db.query(func.count(Flat.id)).scalar() or 0
        )

        # Total Tenants
        total_tenants = (
            db.query(func.count(Tenant.id)).scalar() or 0
        )

        # Active Leases
        active_leases = (
            db.query(func.count(Lease.id))
            .filter(Lease.status == "Active")
            .scalar()
            or 0
        )

        # Occupied Flats (unique flats having an active lease)
        occupied_flats = (
            db.query(func.count(func.distinct(Lease.flat_id)))
            .filter(Lease.status == "Active")
            .scalar()
            or 0
        )

        # Vacant Flats
        vacant_flats = max(total_flats - occupied_flats, 0)

        # Total Payments
        total_payments = (
            db.query(func.count(Payment.id)).scalar() or 0
        )

        # Total Rent Collected
        total_rent_collected = (
            db.query(func.coalesce(func.sum(Payment.amount), 0)).scalar() or 0
        )

        return {
            "total_properties": total_properties,
            "total_flats": total_flats,
            "occupied_flats": occupied_flats,
            "vacant_flats": vacant_flats,
            "total_tenants": total_tenants,
            "active_leases": active_leases,
            "total_payments": total_payments,
            "total_rent_collected": float(total_rent_collected),
        }