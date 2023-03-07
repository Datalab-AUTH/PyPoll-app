from pydantic import BaseModel
from datetime import datetime


class RawUploadModel(BaseModel):
    source: str
    description: str
    graph_properties: str
    options: str


class UploadModel(BaseModel):
    users: dict[str, dict[str, str | dict[str, int]]]
    source: str
    description: str
    graph_properties: dict[str, float | dict[str, float]]


class FindInPage(BaseModel):
    page: int
    items: int

