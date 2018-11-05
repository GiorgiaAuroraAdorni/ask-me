#!/bin/sh

# Start one Kubernetes Node
gcloud container clusters resize askme-cluster --size=1

# Recreate all resources from the manifests
kubectl apply -Rf k8s/ --prune -l pruneTag=askme
