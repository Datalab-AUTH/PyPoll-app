from dotenv import load_dotenv
import os


load_dotenv()
mongodb_host = os.getenv("MONGODB_HOST")
mongodb_port = int(os.getenv("MONGODB_PORT"))
mongodb_username = os.getenv("MONGODB_USERNAME")
mongodb_password = os.getenv("MONGODB_PASSWORD")
secret_key = os.getenv("SECRET_KEY")
algorithm = os.getenv("ALGORITHM")
access_token_expire_minutes = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
