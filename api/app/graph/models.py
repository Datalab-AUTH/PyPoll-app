from pydantic import BaseModel
from datetime import datetime


class RawUploadModel(BaseModel):
    entities: str
    date: str
    title: str
    source: str
    graph_properties: str


class UploadModel(BaseModel):
    entities: list[dict[str, str | dict[str, float]]]
    date: dict[str, datetime]
    title: str
    source: dict[str, float | str]
    graph_properties: dict[str, float | dict[str, float]]


class FindInPage(BaseModel):
    page: int
    items: int

