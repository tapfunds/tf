FROM  golang:1.15.5-alpine AS build

WORKDIR /opt/src
COPY . .
WORKDIR /opt/src/go

RUN go get -d -v ./...
RUN go build -o tf

FROM gcr.io/distroless/base-debian10
#FROM gcr.io/distroless/base-debian10:debug
COPY --from=build /opt/src/go/tf /

EXPOSE 8000
ENTRYPOINT ["/tf"]