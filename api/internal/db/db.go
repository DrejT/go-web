package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/drejt/api/internal/models"
	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
)

// creates a connection to a pg db using a url
func connectDB(url string) (*pgx.Conn, *context.Context) {
	ctx := context.Background()
	conn, err := pgx.Connect(ctx, url)
	fmt.Println(url)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	return conn, &ctx
}

// connects to pg db using url from env variable
func GetDbConn() (*models.Queries, *context.Context) {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("please setup a .env file in root folder")
		os.Exit(1)
	}
	url := os.Getenv("DATABASE_URL")
	conn, ctx := connectDB(url)
	q := models.New(conn)
	// defer conn.Close(*ctx)
	return q, ctx
}
