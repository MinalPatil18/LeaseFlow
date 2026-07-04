from pydantic import BaseModel


class DashboardSummary(BaseModel):
    total_properties: int
    total_flats: int
    occupied_flats: int
    vacant_flats: int
    total_tenants: int
    active_leases: int
    total_payments: int
    total_rent_collected: float