FROM golang:1.15.3 AS build

WORKDIR /opt/src
COPY . .
WORKDIR /opt/src/driver

RUN go get -d -v ./...
RUN go build -o main

FROM gcr.io/distroless/base-debian10
#FROM gcr.io/distroless/base-debian10:debug
# FROM debian:buster

COPY --from=build /opt/src/driver/main /

go mod init github.com/qweliant/forum

EXPOSE 8080
ENTRYPOINT ["/main"]