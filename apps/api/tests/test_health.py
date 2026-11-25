import pytest
from fastapi.testclient import TestClient

from campus_api import main

client = TestClient(main.app)


def test_live_without_dependencies() -> None:
    response = client.get("/health/live")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


@pytest.mark.parametrize(
    ("postgres", "redis", "code", "status"),
    [(True, True, 200, "ready"), (False, True, 503, "unavailable"),
     (True, False, 503, "unavailable")],
)
def test_readiness(monkeypatch, postgres, redis, code, status) -> None:
    monkeypatch.setattr(main, "postgres_ready", lambda: postgres)
    monkeypatch.setattr(main, "redis_ready", lambda: redis)
    response = client.get("/health/ready")
    assert response.status_code == code
    assert response.json() == {"status": status}
