# AskMe

AskMe is a simple Q&A application, that supports asking questions, posting 
answers and up- or down-voting answers.

The source code is available on GitLab at
[https://gitlab.com/GiorgiaAuroraAdorni/askme/](https://gitlab.com/GiorgiaAuroraAdorni/askme/).

#### Contributors
This project has been developed by Giorgia Adorni (806787) and Elia Cereda (807539).


## Architecture
The application has a distributed architecture composed of three main components:
* **web interface:** a client-side web application built with React, through which 
the users interact with the platform.
* **API server:** a web service built using Python and the Flask microframework 
that exposes the REST API used by the frontend.
* **database:** a PostgreSQL instance responsible for persistently storing 
the users' data.

## Containerization
We use Docker to containerize each of the three components. This allows us to 
simplify the setup process of the development environment and to create deployable 
images that contain all dependencies needed by a component. 

`docker-compose.yml`

We used [multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build)
and build arguments to be able to produce two different images from a single 
`Dockerfile`: full-featured development images with compilers, debugger support
and live code reloading and slimmed down production images that include just 
the minimum required to execute the application.

For example, the web interface requires Node.js and a large number of other
dependencies during development and compilation, while only requiring a static
web server (such as Nginx) in production. Copying only the compiled files to 
production allowed us to create extremely small and efficient images.


## Continuous Integration
We wrote tests for the API server with pytest and for the web interface with the
tools provided by React.

Using GitLab CI, we have set up a pipeline of Continuous Integration that
builds Docker images and runs the tests after every commit.

## Deployment and Provisioning
We plan to complement the CI pipeline that we've already built with automation 
for deploying the containers to a Kubernetes cluster hosted on 
[GARR Cloud](https://cloud.garr.it/containers/).

GitLab's integration with Kubernetes should allow us to build an end-to-end 
DevOps process for our application, that starts from a commit pushed to the 
repository and ends with a set of containers running in production.
