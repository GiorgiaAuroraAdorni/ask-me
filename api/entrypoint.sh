#!/bin/sh

# Exit if any command fails
set -e

# Ensure that the database schema is up-to-date
flask db upgrade

# If DEBUG is not set
if [ -z ${DEBUG} ]
then
    # Start the production server
    exec uwsgi uwsgi.ini
else
    # Start the development server
    exec python api.py
fi