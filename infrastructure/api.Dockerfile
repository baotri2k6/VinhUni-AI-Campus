FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
COPY apps/api/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY apps/api/campus_api ./campus_api
USER 10001:10001
EXPOSE 8000
CMD ["uvicorn", "campus_api.main:app", "--host", "0.0.0.0", "--port", "8000"]
