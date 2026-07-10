from math import ceil

from pydantic import BaseModel


class PaginationResponse(BaseModel):
    page: int
    size: int
    total: int
    pages: int


def paginate(query, page: int = 1, size: int = 10):
    total = query.count()

    items = (
        query.offset((page - 1) * size)
        .limit(size)
        .all()
    )

    return {
        "items": items,
        "pagination": PaginationResponse(
            page=page,
            size=size,
            total=total,
            pages=ceil(total / size) if total else 1,
        ),
    }