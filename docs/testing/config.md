File môi trường dành cho testing

`.env.testing`

Load config test
```
php artisan config:cache --env=testing
```

Chạy database test
```
php artisan migrate --env=testing
```