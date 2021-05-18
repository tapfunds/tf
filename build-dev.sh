#!/bin/bash
docker-compose -f docker-compose.dev.yml up -d --build
# docker exec rabbitmq rabbitmq-plugins enable rabbitmq_management