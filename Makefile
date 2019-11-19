frontend:
	docker-compose up --build -d --force-recreate frontend

backend:
	docker-compose up -d --force-recreate backend

db:
	docker-compose up --build -d --force-recreate db

leones: 
	docker-compose up -d

leones-down:
	docker-compose down --volumes --remove-orphan

leones-dev:
	docker-compose -f docker-compose-dev.yml up -d

leones-dev-down:
	docker-compose -f docker-compose-dev.yml down --volumes --remove-orphan
