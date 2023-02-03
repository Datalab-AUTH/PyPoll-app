from pydantic import BaseModel, Field
from enum import Enum
from bson import ObjectId


class RoleEnum(str, Enum):
    User = "user"
    Admin = "admin"


class WriteUserModel(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    role: RoleEnum
    verified: bool


class UserModel(WriteUserModel):
    id: ObjectId = Field(alias="_id")

    class Config:
        arbitrary_types_allowed = True
