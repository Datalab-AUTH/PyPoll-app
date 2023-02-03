from pydantic import BaseModel


class SignupModel(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str


class SigninModel(BaseModel):
    email: str
    password: str


class TokenDataModel(BaseModel):
    email: str | None = None