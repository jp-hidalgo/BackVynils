# Render.com Deployment Guide

This guide will help you deploy your NestJS application to Render.com with PostgreSQL.

## Prerequisites

1. A GitHub account
2. Your code pushed to a GitHub repository
3. A Render.com account (sign up at https://render.com)

## Step 1: Create a PostgreSQL Database on Render

1. Log in to your Render dashboard
2. Click "New +" and select "PostgreSQL"
3. Configure your database:
   - **Name**: `vinyls-db` (or any name you prefer)
   - **Database**: `vinyls`
   - **User**: `vinyls_user` (or any username)
   - **Region**: Choose the region closest to your users
   - **Plan**: Start with Free plan for testing
4. Click "Create Database"
5. Wait for the database to be provisioned (takes a few minutes)

## Step 2: Create a Web Service on Render

1. In your Render dashboard, click "New +" and select "Web Service"
2. Connect your GitHub repository:
   - Select the repository containing this code
   - Choose the branch (usually `main` or `master`)
3. Configure the service:
   - **Name**: `vinyls-backend` (or any name you prefer)
   - **Environment**: `Node`
   - **Region**: Same region as your database
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: Leave empty (or `.` if your app is in a subdirectory)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: Free (for testing)
4. Add Environment Variables:
   - **NODE_ENV**: `production`
   - **PORT**: Render will set this automatically
   - **DATABASE_URL**: 
     - Go to your PostgreSQL database dashboard
     - Copy the "Internal Database URL" (recommended) or "External Connection String"
     - Paste it as the `DATABASE_URL` value
5. Click "Create Web Service"

## Step 3: Link Database to Web Service

1. In your Web Service dashboard, go to "Environment" tab
2. Click "Link Database"
3. Select your PostgreSQL database
4. Render will automatically set the `DATABASE_URL` environment variable

## Step 4: Deploy

1. Your service will start building automatically
2. Monitor the build logs in the Render dashboard
3. Once deployed, your app will be available at: `https://your-service-name.onrender.com`

## Environment Variables Reference

The application supports the following environment variables:

- `DATABASE_URL`: PostgreSQL connection string (automatically provided by Render when database is linked)
- `PORT`: Server port (automatically set by Render)
- `NODE_ENV`: Environment (set to `production` for Render)

For local development, you can use:
- `DB_HOST`: Database host (default: `localhost`)
- `DB_PORT`: Database port (default: `5432`)
- `DB_USER`: Database username (default: `postgres`)
- `DB_PASS`: Database password (default: `postgres`)
- `DB_NAME`: Database name (default: `vinyls`)
- `USE_SSL`: Enable SSL for database connection (default: `false`)

## Using render.yaml (Alternative Method)

If you prefer to use the `render.yaml` file:

1. Make sure your repository has the `render.yaml` file in the root
2. In Render dashboard, click "New +" and select "Blueprint"
3. Connect your GitHub repository
4. Render will read the `render.yaml` and create the services automatically

## Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` is set correctly in your Web Service environment
- Make sure your database is in the same region as your web service
- Check that you're using the "Internal Database URL" for better performance and security

### Build Failures

- Check the build logs in Render dashboard
- Verify all dependencies are in `package.json`
- Make sure Node.js version is compatible (the Dockerfile uses Node 18)

### Application Crashes

- Check the application logs in Render dashboard
- Verify database migrations ran successfully
- Ensure all environment variables are set correctly

## Notes

- The free tier services spin down after 15 minutes of inactivity
- Database connections may timeout; the app is configured to keep connections alive
- SSL is automatically enabled when using Render's DATABASE_URL

