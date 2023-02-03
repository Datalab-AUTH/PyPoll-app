from pymongo import MongoClient
from app.user.models import UserModel
from gridfs import GridFS
from bson import ObjectId


class MongoDB:
    def __init__(self):
        self.client: MongoClient | None = None
        self.db: str | None = None
        self.fs: GridFS | None = None

    def connect(self, host, db_name, port=27017, username=None, password=None):
        self.client = MongoClient(host, port, username=username, password=password)
        self.db = db_name
        self.fs = GridFS(self.client[self.db])

    def close(self):
        self.client.close()

    def create_user(self, user: UserModel):
        self.client[self.db]["users"].insert_one(user.dict())

    def find_user(self, email):
        user = self.client[self.db]["users"].find_one({"email": email})
        if user:
            return user
        return False

    def get_documents_from_page_by_user(self, collection, user_id, page, items):
        if page:
            objs = list(self.client[self.db][collection].find({"created_by": user_id}, {"created_by": 0}).skip(page * items).limit(items))
        else:
            objs = list(self.client[self.db][collection].find({"created_by": user_id}, {"created_by": 0}).limit(items))
        for i in range(len(objs)):
            objs[i]["_id"] = str(objs[i]["_id"])
        return objs

    def put_gridfs(self, data, metadata):
        self.fs.put(data, **metadata)

    def read_gridfs(self, file_id):
        return self.fs.get(ObjectId(file_id)).read()

    def delete_gridfs(self, file_id):
        self.fs.delete(ObjectId(file_id))

    def count_by_user(self, collection, user_id):
        return self.client[self.db][collection].count_documents({"created_by": user_id})

    def find_graph(self, graph_id):
        graph = self.client[self.db]["fs.files"].find_one({"_id": ObjectId(graph_id)})
        if graph:
            graph["_id"] = str(graph["_id"])
            graph["created_by"] = str(graph["created_by"])
            return graph
        return False

    def find_graph_by_user(self, graph_id, user_id):
        graph = self.client[self.db]["fs.files"].find_one({"_id": ObjectId(graph_id), "created_by": user_id})
        if graph:
            graph["_id"] = str(graph["_id"])
            graph["created_by"] = str(graph["created_by"])
            return graph
        return False
