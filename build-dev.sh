#!/bin/bash
docker-compose -f docker-compose.dev.yml up -d --build
docker tag tfapi_go qweliant/tfapi_go:latest