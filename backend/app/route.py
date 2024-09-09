from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated

from .utils.functions import get_docs

app = FastAPI()

# Middleware for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.get("/")
# def home():
#     return f"""
#             Dictionary size: {len(backendTables['dictionary'])}\n
#             Hash pairs size: {len(backendTables['hash_pairs'])}\n
#             Ctokens size: {len(backendTables['ctokens'])}
#         """
@app.post("/api/docs")
def get_docs(docs: Annotated[dict, Depends(get_docs)]):
    print("Successfully retrieved docs")
    return docs
# @app.post("/api/signup")
# def user_signup(user_token_data: Annotated[dict, Depends(sign_up)]):
#     if not user_token_data:
#         raise NotFoundException("User")
#     return user_token_data

# @app.get("/api/user")
# def post_login(get_user: Annotated[str, Depends(get_user)]):
#     print(get_user)
