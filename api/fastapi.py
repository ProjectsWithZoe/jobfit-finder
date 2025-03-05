from fastapi import FastAPI
import uvicorn
from app import app

def handler(event, context):
    return app(event, context)