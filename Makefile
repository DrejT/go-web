.DEFAULT_GOAL := run
.PHONY: fmt vet clean build run

# format server code
fmt:
	go fmt ./main.go

# find for gotchas in server code
vet: fmt
	go vet ./main.go

# clean previous builds of server and client
# if present
clean: vet
	rm -rf ./web/dist
	go clean

# build server and client
build: clean
	cd web && npm install && npm run build && cd .. && go build -o main ./main.go

# build server only
server: clean
	go build -o main && ./main

# build client only
client: clean
	cd web && npm run dev

# run the server binary
run:
	./main
