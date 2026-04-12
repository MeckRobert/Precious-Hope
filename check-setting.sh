#!/bin/bash
# check-setup.sh

echo "🔍 Checking Next.js setup..."

# Check current directory
echo "📁 Current directory: $(pwd)"

# Check if .env exists
if [ -f .env ]; then
  echo "✅ .env file exists"
else
  echo "❌ .env file missing"
fi

# Check Prisma
if [ -d prisma ]; then
  echo "✅ Prisma folder exists"
  npx prisma validate
else
  echo "❌ Prisma not initialized"
fi

# Check PostgreSQL
if systemctl is-active --quiet postgresql; then
  echo "✅ PostgreSQL is running"
else
  echo "❌ PostgreSQL is not running"
fi

echo "🚀 Run: npm run dev"
