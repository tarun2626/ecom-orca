from pydantic import BaseModel, EmailStr, Field, BeforeValidator
from typing import Optional, Annotated

# Helper for ObjectId handling in Pydantic v2
PyObjectId = Annotated[str, BeforeValidator(str)]

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    disabled: Optional[bool] = False

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    hashed_password: str

class User(UserBase):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)

    class Config:
        populate_by_name = True
