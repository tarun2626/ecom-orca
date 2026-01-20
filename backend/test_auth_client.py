import asyncio
import httpx
from app.core.config import settings

BASE_URL = "http://127.0.0.1:8000" + settings.API_V1_STR

async def test_auth():
    async with httpx.AsyncClient() as client:
        # 1. Create User
        email = "test@example.com"
        password = "password123"
        print(f"Creating user {email}...")
        response = await client.post(f"{BASE_URL}/users/", json={
            "email": email,
            "password": password,
            "role": "admin"
        })
        if response.status_code == 400:
            print("User already exists (that's fine)")
        elif response.status_code != 200:
            print(f"Failed to create user: {response.text}")
            return
        else:
            print("User created successfully")

        # 2. Login
        print("Logging in...")
        response = await client.post(f"{BASE_URL}/login/access-token", data={
            "username": email,
            "password": password
        })
        if response.status_code != 200:
            print(f"Login failed: {response.text}")
            return
        token = response.json()["access_token"]
        print(f"Got token: {token[:10]}...")

        # 3. Get Me
        print("Getting current user...")
        response = await client.get(f"{BASE_URL}/users/me", headers={
            "Authorization": f"Bearer {token}"
        })
        if response.status_code != 200:
            print(f"Failed to get user: {response.text}")
            return
        print(f"User info: {response.json()}")
        print("TEST PASSED")

if __name__ == "__main__":
    print("This script requires the server to be running on port 8000.")
    asyncio.run(test_auth())
