from fastapi import APIRouter, HTTPException, Depends
from app.dependencies import responses, get_current_user, RoleChecker
from app.user.models import UserModel, RoleEnum


router = APIRouter(
    prefix="/user",
    tags=["User"],
    responses=responses
)


# @router.get("/get", dependencies=[Depends(RoleChecker([RoleEnum.Admin]))])
# async def get_user(user: UserModel = Depends(get_current_user)):
#     return user.json()


@router.get("/get")
async def get_user(user: UserModel = Depends(get_current_user)):
    return {
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "role": user.role
    }
