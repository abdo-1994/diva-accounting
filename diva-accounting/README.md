# Diva Accounting

نظام متكامل لإدارة خدمات الأظافر والشعر.

## المميزات
- إدارة الخدمات، الباقات، العملاء، الفواتير، المصروفات، وبطاقات الهدايا  
- الأصدار ثنائي اللغة (عربي/إنجليزي)  
- توليد PDF للفاتورة  
- صلاحيات مبنية على الأدوار  

## المتطلبات
- PHP 8.1+, Composer, MySQL  
- Node.js 16+, npm  
- (اختياري) Docker & Docker Compose  

## الإعداد محلياً

1. استنساخ المستودع  
   ```bash
   git clone https://github.com/your-repo/diva-accounting.git
   cd diva-accounting
   ```

2. إعداد Backend  
   ```bash
   cp .env.example .env
   composer install
   php artisan key:generate
   php artisan migrate --seed
   ```

3. إعداد Frontend  
   ```bash
   cd frontend
   npm ci
   npm start
   ```

4. تشغيل التطبيق  
   - Backend: `php artisan serve` (http://127.0.0.1:8000)  
   - Frontend: `npm start` (http://localhost:3000)

## Docker (اختياري)

```bash
docker-compose up -d --build
```

## الاختبارات

- Backend: `php artisan test`  
- Frontend: من مجلد `frontend`: `npm test`
