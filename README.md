# AskMe

AskMe is a simple Q&A application, that supports asking questions, posting 
answers and up- or down-voting answers.

The source code is available on 
[GitLab](https://gitlab.com/GiorgiaAuroraAdorni/askme/).

#### Contributors
This project has been developed by Giorgia Adorni (806787) and Elia Cereda (807539).


## Architecture
The application has a distributed architecture composed of three main components:
* **web interface:** a client-side web application built with React, through which 
the users interact with the platform.
* **API server:** a web service built using Python and the Flask microframework 
that exposes the REST API used by the frontend.
* **database:** a PostgreSQL istance to store the user data.

## Containerization
We use Docker to containerize each of the three components. This allows us to 
simplify the setup process of the development environment and to create deployable 
images that contain all dependencies needed by a component. 

`Dockerfile` `docker-compose.yml`

## Continuous Integration
We added tests to the API with pytest and to the web interface with the tools
provided by React.

Using GitLab CI, we have set up a pipeline of Continuous Integration that
builds Docker images and runs the tests after every commit.

## Deployment and Provisioning
We plan to implement the automation for deploying the application/containers 
to a Kubernetes cluster hosted on GARR Cloud.
Through Gitlab integration with Kubernetes ...
