#!/bin/bash
set -e

# 1. تثبيت تبعيات الـ PHP (Backend)
echo "Installing PHP dependencies..."
composer install

# 2. إعداد ملف البيئة
if [ ! -f .env ]; then
  echo "Copying .env.example to .env"
  cp .env.example .env
fi

# 3. توليد مفتاح التطبيق
echo "Generating application key..."
php artisan key:generate

# 4. تشغيل الهجرات والـ Seeders
echo "Running database migrations and seeders..."
php artisan migrate --seed --force

# 5. تثبيت تبعيات الواجهة الأمامية (Frontend)
echo "Installing Node dependencies..."
cd frontend
npm ci

# 6. بناء الواجهة الأمامية
echo "Building frontend..."
npm run build
cd ..

# 7. تشغيل Docker Compose (إن كان مستخدمًا)
if [ -f docker-compose.yml ]; then
  echo "Starting services with Docker Compose..."
  docker-compose up -d --build
fi

echo "Setup and activation complete."
