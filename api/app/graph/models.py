from pydantic import BaseModel
from datetime import datetime


class RawUploadModel(BaseModel):
    date: str
    source: str
    graph_properties: str
    options: str


class UploadModel(BaseModel):
    users: dict[str, dict[str, str | dict[str, int]]]
    date: dict[str, datetime]
    source: dict[str, float | str]
    graph_properties: dict[str, float | dict[str, float]]


class FindInPage(BaseModel):
    page: int
    items: int

