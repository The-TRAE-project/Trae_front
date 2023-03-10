build-dev:
	docker build -f Dockerfile.dev -t image .
build-prod:
	docker build -f Dockerfile.prod -t image1 .
run:
	docker run -e CHOKIDAR_USEPOLLING=true -v "%cd%\src:/app/src:ro" -d -p 3000:3000 --name trae image
run-dev:
	docker-compose -f docker-compose-dev.yml up 
run-prod:
	docker-compose -f docker-compose-prod.yml up