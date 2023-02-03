from fastapi import APIRouter, HTTPException
from app.dependencies import responses
from app.user.models import UserModel, WriteUserModel, RoleEnum
from app.db import mongo
from passlib.context import CryptContext
from app.auth.models import SignupModel, SigninModel
from datetime import datetime, timedelta
from jose import jwt
from app import secret_key, algorithm, access_token_expire_minutes


router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
    responses=responses
)

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return password_context.verify(plain_password, hashed_password)


def authenticate_user(data: SigninModel):
    user = UserModel(**mongo.find_user(data.email))
    if not user:
        return False
    if not user.verified:
        return False
    if not verify_password(data.password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=algorithm)
    return encoded_jwt


@router.post("/signup")
async def signup(data: SignupModel):
    user = mongo.find_user(data.email)
    if user:
        return {"message": "User exists"}
    data.password = password_context.hash(data.password)
    data = data.dict()
    data["role"] = RoleEnum.User
    data["verified"] = False
    mongo.create_user(WriteUserModel(**data))
    return {"message": "User created"}


@router.post("/signin")
async def signin(data: SigninModel):
    user = authenticate_user(data)
    if not user:
        raise HTTPException(status_code=401)
    access_token_expires = timedelta(minutes=float(access_token_expire_minutes))
    access_token = create_access_token(data={"sub": user.email}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}
