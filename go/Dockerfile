FROM  golang:1.15.5-alpine AS build

WORKDIR /opt/src
COPY /go .
WORKDIR /opt/src/go

RUN go get -d -v ./...
RUN go build -o quickstart

FROM gcr.io/distroless/base-debian10
#FROM gcr.io/distroless/base-debian10:debug
COPY --from=build /opt/src/go/quickstart /

EXPOSE 8000
ENTRYPOINT ["/quickstart"]