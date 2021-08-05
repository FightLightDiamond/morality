ifndef u
u:=laravel.test
endif

ifndef env
env:=dev
endif

OS:=$(shell uname)

docker-start:
	./vendor/bin/sail up

docker-restart:
	docker-compose down
	make docker-start
	make docker-init-db-full
	make docker-link-storage

docker-connect:
	docker-compose exec laravel.test bash

docker-db-connect:
	docker-compose exec mysql bash

init-app:
	cp .env.example .env
	composer install
	php artisan key:generate
	php artisan passport:keys
	php artisan migrate
	php artisan db:seed
	php artisan storage:link

docker-init:
	git submodule update --init
	docker-compose exec laravel.test make init-app
	rm -rf node_modules
	npm install

init-db-full:
	make autoload
	php artisan migrate:fresh
	make update-master
	php artisan db:seed

docker-init-db-full:
	docker-compose exec laravel.test make init-db-full

docker-link-storage:
	docker-compose exec laravel.test php artisan storage:link

init-db:
	make autoload
	php artisan migrate:fresh

start:
	php artisan serve

log:
	tail -f storage/logs/laravel.log

test-js:
	npm test

test-php:
	vendor/bin/phpcs --standard=phpcs.xml && vendor/bin/phpmd app text phpmd.xml

build:
	npm run dev

watch:
	npm run watch

docker-watch:
	docker-compose exec laravel.test make watch

autoload:
	composer dump-autoload

cache:
	php artisan cache:clear && php artisan view:clear

docker-cache:
	docker exec laravel.test make cache

route:
	php artisan route:list

generate-master:
	php bin/generate_master.php $(lang)

update-master:
	php artisan master:update $(lang)
	make cache
