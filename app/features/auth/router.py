from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.features.auth.dependencies import get_current_user
from app.features.auth.models import User
from app.features.auth.schemas import (
    ChangePasswordRequest,
    LoginRequest,
    TokenResponse,
    UserCreate,
    UserResponse,
)
from app.features.auth.service import AuthService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

from app.features.auth.schemas import (
    ChangePasswordRequest,
    LoginRequest,
    TokenResponse,
    UpdateProfileRequest,
    UserCreate,
    UserResponse,
)
@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    return AuthService.register(db, user)


@router.post(
    "/login",
    response_model=TokenResponse,
)
def login(
    credentials: LoginRequest,
    db: Session = Depends(get_db),
):
    return AuthService.login(db, credentials)


@router.get(
    "/me",
    response_model=UserResponse,
)
def get_me(
    current_user: User = Depends(get_current_user),
):
    return current_user


@router.patch("/change-password")
def change_password(
    request: ChangePasswordRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return AuthService.change_password(
        db=db,
        current_user=current_user,
        request=request,
    )
@router.patch(
    "/profile",
    response_model=UserResponse,
)
def update_profile(
    request: UpdateProfileRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return AuthService.update_profile(
        db=db,
        current_user=current_user,
        full_name=request.full_name,
    )