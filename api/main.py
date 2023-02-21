from fastapi import FastAPI
from app.db import mongo
from app import mongodb_host, mongodb_port, mongodb_username, mongodb_password
from fastapi.middleware.cors import CORSMiddleware
from app.router import router
import uvicorn


origins = [
    # "http://127.0.0.1:8080",
    "*"
]


app = FastAPI()
# app.add_middleware(HTTPSRedirectMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(router)


@app.on_event("startup")
async def startup():
    mongo.connect(mongodb_host, "pypoll", mongodb_port, mongodb_username, mongodb_password)


@app.on_event("shutdown")
async def shutdown():
    mongo.close()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
