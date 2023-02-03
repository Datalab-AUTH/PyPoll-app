# API
The API must have the following env variables

```
MONGODB_HOST=
MONGODB_PORT=
MONGODB_USERNAME=
MONGODB_PASSWORD=
SECRET_KEY=
ALGORITHM=
ACCESS_TOKEN_EXPIRE_MINUTES=
```

Create the SECRET_KEY with the command:
```commandline
openssl rand -hex 32
```

The ALGORITHM must be the ```HS256```
