import asyncio
from app.database import connect_to_mongo, close_mongo_connection, get_database
from app.models.user import UserInDB
from app.auth import get_password_hash

async def create_test_user():
    await connect_to_mongo()
    db = get_database()
    
    email = "test@example.com"
    password = "password123"
    
    existing_user = await db["users"].find_one({"email": email})
    if existing_user:
        print(f"User {email} already exists.")
    else:
        hashed_password = get_password_hash(password)
        user_in_db = UserInDB(
            email=email,
            hashed_password=hashed_password,
            full_name="Test User"
        )
        await db["users"].insert_one(user_in_db.model_dump(by_alias=True, exclude={"id"}))
        print(f"Created user: {email} with password: {password}")
    
    await close_mongo_connection()

if __name__ == "__main__":
    asyncio.run(create_test_user())
