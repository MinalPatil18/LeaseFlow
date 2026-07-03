from sqlalchemy.orm import Session

from app.features.auth.models import User


class AuthRepository:

    @staticmethod
    def get_user_by_email(db: Session, email: str) -> User | None:
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def create_user(db: Session, user: User) -> User:
        db.add(user)
        db.commit()
        db.refresh(user)
        return user