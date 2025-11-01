# Connecting to Render PostgreSQL Database

## Your Database Connection String

Your Render PostgreSQL connection string is:
```
postgresql://postgres_backend_g6tm_user:9DUNY3SDPOJlKJ7lnw6UeyOYOmR81Blf@dpg-d42nb0a4d50c739t52tg-a/postgres_backend_g6tm
```

## Setting Up the Connection

### Option 1: Using Render Dashboard (Recommended)

1. Go to your Render Web Service dashboard
2. Navigate to the "Environment" tab
3. Add or update the environment variable:
   - **Key**: `DATABASE_URL`
   - **Value**: `postgresql://postgres_backend_g6tm_user:9DUNY3SDPOJlKJ7lnw6UeyOYOmR81Blf@dpg-d42nb0a4d50c739t52tg-a/postgres_backend_g6tm`
4. If your database is in the same Render account, click "Link Database" instead - Render will automatically set the DATABASE_URL
5. Save the changes - your service will automatically redeploy

### Option 2: Manual Environment Variable

If you're deploying manually or need to set it via command line:

```bash
export DATABASE_URL=postgresql://postgres_backend_g6tm_user:9DUNY3SDPOJlKJ7lnw6UeyOYOmR81Blf@dpg-d42nb0a4d50c739t52tg-a/postgres_backend_g6tm
```

## Connection Details (Parsed)

- **Host**: `dpg-d42nb0a4d50c739t52tg-a`
- **Port**: `5432` (default)
- **Username**: `postgres_backend_g6tm_user`
- **Password**: `9DUNY3SDPOJlKJ7lnw6UeyOYOmR81Blf`
- **Database**: `postgres_backend_g6tm`
- **SSL**: Enabled (required for Render)

## Testing the Connection Locally (Optional)

If you want to test the connection from your local machine, you'll need to:

1. Get the **External Connection String** from your Render database dashboard (different from the internal one)
2. Set it as an environment variable:
   ```powershell
   $env:DATABASE_URL="postgresql://postgres_backend_g6tm_user:9DUNY3SDPOJlKJ7lnw6UeyOYOmR81Blf@dpg-d42nb0a4d50c739t52tg-a.oregon-postgres.render.com:5432/postgres_backend_g6tm"
   ```
   Note: External connections usually have a different hostname with `.oregon-postgres.render.com` (or your region).

3. Run your app:
   ```powershell
   npm run start:dev
   ```

## Important Notes

1. **SSL Required**: Render PostgreSQL requires SSL connections. The application automatically enables SSL when `DATABASE_URL` is provided.

2. **Internal vs External URLs**: 
   - **Internal URL** (what you have): Use this when your web service is on Render in the same region
   - **External URL**: Use this for local development or external connections (check your database dashboard)

3. **Connection Pooler**: If you see connection limits, you might want to use Render's connection pooler endpoint (usually has `-pooler` in the hostname).

4. **Security**: Never commit your database credentials to version control. Always use environment variables.

## Verifying the Connection

Once deployed, check your application logs in Render. You should see:
- No database connection errors
- Successful migration runs (if any)
- Application starts successfully

If you see connection errors:
1. Verify `DATABASE_URL` is set correctly
2. Check that your database is running (green status in Render dashboard)
3. Ensure SSL is enabled (it should be automatic with DATABASE_URL)
4. Verify the database name, username, and password are correct

