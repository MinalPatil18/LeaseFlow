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

        total_properties = db.query(func.count(Property.id)).scalar()

        total_flats = db.query(func.count(Flat.id)).scalar()

        occupied_flats = (
            db.query(func.count(Flat.id))
            .filter(Flat.status == "Occupied")
            .scalar()
        )

        vacant_flats = (
            db.query(func.count(Flat.id))
            .filter(Flat.status == "Available")
            .scalar()
        )

        total_tenants = db.query(func.count(Tenant.id)).scalar()

        active_leases = (
            db.query(func.count(Lease.id))
            .filter(Lease.status == "Active")
            .scalar()
        )

        total_payments = db.query(func.count(Payment.id)).scalar()

        total_rent_collected = (
            db.query(func.sum(Payment.amount)).scalar()
            or 0
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