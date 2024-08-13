#!/bin/bash
EXTRA_OPTION=$1
docker-compose down
sleep 3
if [ -n "$EXTRA_OPTION" ] && [ "$EXTRA_OPTION" = "build" ]
then
docker-compose up --build -d
else
docker-compose up -d
fi