import os

from fastapi import FastAPI, Response
from redis import Redis
from redis.exceptions import RedisError
from sqlalchemy import create_engine, text
from sqlalchemy.exc import SQLAlchemyError

app = FastAPI(title="VinhUni AI Campus API", version="0.1.0")

database_url = os.getenv("DATABASE_URL")
redis_url = os.getenv("REDIS_URL")
engine = create_engine(database_url, connect_args={"connect_timeout": 3}) if database_url else None
cache = Redis.from_url(redis_url, socket_connect_timeout=3, socket_timeout=3) if redis_url else None


def postgres_ready() -> bool:
    if engine is None:
        return False
    try:
        with engine.connect() as connection:
            return bool(connection.scalar(text(
                "SELECT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'vector')"
            )))
    except SQLAlchemyError:
        return False


def redis_ready() -> bool:
    if cache is None:
        return False
    try:
        return bool(cache.ping())
    except RedisError:
        return False


@app.get("/health/live")
def liveness() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/health/ready")
def readiness(response: Response) -> dict[str, str]:
    if postgres_ready() and redis_ready():
        return {"status": "ready"}
    response.status_code = 503
    return {"status": "unavailable"}
