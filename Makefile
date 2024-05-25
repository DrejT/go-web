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

run: build
	./main

server: clean
	go build -o main ./main.go

dev: vet
	./main