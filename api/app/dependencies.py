from fastapi import Depends, HTTPException, WebSocket
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.db import mongo
from app.auth.models import TokenDataModel
from app.user.models import UserModel
from app import secret_key, algorithm


responses = {
    401: {"description": "Unauthorized"},
    403: {"description": "Forbidden"},
    404: {"description": "Not found"}
}


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(status_code=401)
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenDataModel(email=email)
    except JWTError:
        raise credentials_exception
    user = UserModel(**mongo.find_user(token_data.email))
    if user is None or not user.verified:
        raise credentials_exception
    return user


class RoleChecker:
    def __init__(self, allowed_roles):
        self.allowed_roles = allowed_roles

    def __call__(self, user: UserModel = Depends(get_current_user)):
        if user.role not in self.allowed_roles:
            raise HTTPException(status_code=403)
