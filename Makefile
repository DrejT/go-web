.DEFAULT_GOAL := run
.PHONY: fmt vet clean build run

# format server code
fmt:
	go fmt ./main.go

# find for gotchas in server code
vet: fmt
	go vet ./main.go

# clean previous builds of  client
# if present
clean-client:
	rm -rf ./web/dist

# clean previous builds of server
# if present
clean-server: vet
	go clean

# build server and client
build: clean-server clean-client
	cd web && npm install && npm run build && cd .. && go build -o main ./main.go

# build server only
server: clean-server
	go build -o main && ./main

# build client only
client: clean-client
	cd web && npm run dev

# run the server binary
run:
	./main
