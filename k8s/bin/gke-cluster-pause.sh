#!/bin/sh

# Stop all Kubernetes Nodes
gcloud container clusters resize askme-cluster --size=0

# Delete the Ingress
kubectl delete -f k8s/ingress.yml
