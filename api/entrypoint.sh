#!/bin/sh

# Ensure that the database schema is up-to-date
flask db upgrade

# Start the server
exec python api.py
