# AskMe

AskMe is a simple Q&A application, that supports asking questions, posting 
answers and up- or down-voting answers.

The source code is available on 
[GitLab](https://gitlab.com/GiorgiaAuroraAdorni/askme/).

#### Contributors
This project has been developed by Giorgia Adorni (806787) and Elia Cereda (807539).


## Architecture
The application has a distributed architecture composed of three main components:
* **web interface:** a client-side web application built with React, through which the users interact with the platform.
* **API server:** we designed a RESTful web service API using Python and the Flask microframework.
* **database:** we used PostgreSQL, an object-relational database management system.


## Containerization
We use Docker to containerize each of the three components. This allows us to 
simplify the setup process of the development environment and to create deployable 
images that contain all dependencies needed by a component. 



`Dockerfile` `docker-compose.yml`

## Continuous Integration
