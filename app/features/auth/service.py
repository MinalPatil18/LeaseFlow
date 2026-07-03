from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import (
    create_access_token,
    hash_password,
    verify_password,
)
from app.features.auth.models import User
from app.features.auth.repository import AuthRepository
from app.features.auth.schemas import (
    ChangePasswordRequest,
    LoginRequest,
    TokenResponse,
    UserCreate,
)


class AuthService:
    
    

    @staticmethod
    def register(db: Session, user_data: UserCreate):

        existing_user = AuthRepository.get_user_by_email(
            db,
            user_data.email,
        )

        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already exists",
            )

        user = User(
    full_name=user_data.full_name,
    email=user_data.email,
    hashed_password=hash_password(user_data.password),
    role=user_data.role,
)

        return AuthRepository.create_user(db, user)

    @staticmethod
    def login(db: Session, login_data: LoginRequest) -> TokenResponse:

        user = AuthRepository.get_user_by_email(
            db,
            login_data.email,
        )

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        if not verify_password(
            login_data.password,
            user.hashed_password,
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )

        token = create_access_token(
            {
                "sub": str(user.id),
                "email": user.email,
                "role": user.role,
            }
        )

        return TokenResponse(
            access_token=token,
            token_type="bearer",
        )

    @staticmethod
    def change_password(
        db: Session,
        current_user: User,
        request: ChangePasswordRequest,
    ):

        if not verify_password(
            request.current_password,
            current_user.hashed_password,
        ):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Current password is incorrect",
            )

        current_user.hashed_password = hash_password(
            request.new_password
        )

        db.commit()
        db.refresh(current_user)

        return {
            "message": "Password changed successfully"
        }
    @staticmethod
    def update_profile(
        db: Session,
        current_user: User,
        full_name: str,
):
        current_user.full_name = full_name

        db.commit()
        db.refresh(current_user)

        return current_user