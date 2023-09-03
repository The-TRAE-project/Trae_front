build-dev:
	docker build -f Dockerfile.dev -t dev-image .
build-prod:
	docker build -f Dockerfile.prod -t eld11ar/trae-front .
run:
	docker run -e CHOKIDAR_USEPOLLING=true -v "%cd%\src:/app/src:ro" -d -p 3000:3000 --name trae image
run-dev:
	docker-compose -f docker-compose-dev.yml up 
run-prod:
	docker-compose -f docker-compose-prod.yml up