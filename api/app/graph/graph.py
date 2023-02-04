from fastapi import APIRouter, HTTPException, Depends, UploadFile
from app.dependencies import responses, get_current_user, RoleChecker
from app.user.models import UserModel, RoleEnum
from app.db import mongo
from app.graph.models import RawUploadModel, UploadModel, FindInPage
from datetime import datetime
import ast

router = APIRouter(
    prefix="/graph",
    tags=["Graph"],
    responses=responses
)


@router.get("/count")
async def count_graphs_by_user(user: UserModel = Depends(get_current_user)):
    res = mongo.count_by_user("fs.files", user.id)
    return {
        "number_of_graphs": res
    }


@router.get("/get/all")
async def get_all_graphs(data: FindInPage, user: UserModel = Depends(get_current_user)):
    res = mongo.get_documents_from_page_by_user("fs.files", user.id, data.page, data.items)
    return {
        "page": data.page,
        "items": data.items,
        "data": res
    }


@router.get("/get/{graph_id}")
async def get_graph(graph_id: str):
    metadata = mongo.find_graph(graph_id)
    if not metadata:
        raise HTTPException(status_code=404)
    res = mongo.read_gridfs(metadata["_id"])
    return {
        "metadata": metadata,
        "type": "gexf",
        "data": res
    }


@router.get("/delete/{graph_id}")
async def get_graph(graph_id: str, user: UserModel = Depends(get_current_user)):
    metadata = mongo.find_graph_by_user(graph_id, user.id)
    if not metadata:
        raise HTTPException(status_code=404)
    mongo.delete_gridfs(metadata["_id"])
    return {
        "deleted": metadata,
    }


@router.post("/upload")
async def upload_graph(file: UploadFile, data: RawUploadModel = Depends(), user: UserModel = Depends(get_current_user)):
    date = ast.literal_eval(data.date)
    for key in date:
        date[key] = datetime.strptime(date[key], "%Y-%m-%d")
    data = UploadModel(**{
        "users": ast.literal_eval(data.options)["users"],
        "date": date,
        "source": ast.literal_eval(data.source),
        "graph_properties": ast.literal_eval(data.graph_properties)
    })

    mongo.put_gridfs(file.file, {
        **{
            "filename": file.filename,
            "created_by": user.id
        },
        **data.dict()
    })
    return {"file": file.filename, "data": data}
