#!/bin/bash
docker-compose -f docker-compose.dev.yml up -d --build
kubectl apply -f kubes.yaml