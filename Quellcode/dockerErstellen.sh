#!/bin/bash

docker build -t image_backend . -f Dockerfile_backend
docker image save image_backend -o docker_image_backend.tar
docker build -t image_frontend . -f Dockerfile_frontend
docker image save image_frontend -o docker_image_frontend.tar
