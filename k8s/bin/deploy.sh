#!/bin/sh

# Exit if any command fails
set -e

# Install curl, envsubst and kubectl
apk update  && apk add --no-cache curl gettext
curl -sL https://dl.k8s.io/v1.12.0/bin/linux/amd64/kubectl -o /usr/local/bin/kubectl
chmod +x /usr/local/bin/kubectl

cd k8s/

kubectl cluster-info

kubectl patch -f api/deployment.yml -p "$(cat api/deployment.yml.patch | envsubst)"
kubectl patch -f web/deployment.yml -p "$(cat web/deployment.yml.patch | envsubst)"
