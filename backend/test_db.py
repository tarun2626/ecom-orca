import asyncio
import asyncpg
import sys

async def main():
    print("Attempting to connect to DB...")
    try:
        conn = await asyncpg.connect(
            user='postgres',
            password='mysecretpassword',
            database='ecommerce_db',
            host='127.0.0.1',
            port='5433'
        )
        print("SUCCESS: Connected to database!")
        await conn.close()
    except Exception as e:
        print(f"FAILURE: {type(e).__name__}: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(main())
