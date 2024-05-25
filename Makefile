.DEFAULT_GOAL := run
.PHONY: fmt vet clean build run dev

fmt:
	go fmt ./main.go

vet: fmt
	go vet ./main.go

clean: vet
	rm -rf ./web/dist
	go clean

build: clean
	cd web && npm run build && cd .. && go build -o main ./main.go

server: vet
	go build -o main && ./main

client:
	cd web && npm run dev

dev:
	./main