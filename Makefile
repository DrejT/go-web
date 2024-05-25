.DEFAULT_GOAL := run
.PHONY: fmt vet build clean

fmt:
	go fmt ./main.go

vet: fmt
	go vet ./main.go

clean: vet
	go clean

build: clean
	go build ./main.go

run: build
	./main
